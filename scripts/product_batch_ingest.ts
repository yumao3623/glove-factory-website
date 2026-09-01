import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import sharp from "sharp";
import { analyzeCrossListingRelationships, archivePathIsSafe, assetReviewFlags, buildDraft, collectJsonFiles, hasCompleteStorefrontProvenance, isRegularFile, listingIdFromFilename, parseSourceMetadata, productFamilies, relativeToRoot, roleForArchivePath, sha256File, sourceReviewFlags, supportedImageExtensions, supportedMetadataExtensions, triageImages, type HumanReviewDecision, type IntakeAsset, type ListingIntake, validateApprovedProduct } from "../lib/product-ingestion";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = join(root, ".product-ingestion");
const authorizedStorefront = "https://jsmeilai.1688.com/";
const maximumPilotArchives = 8;

function usage(): never {
  throw new Error("Usage: npm run ingest:batch -- <init|inspect|export-review|validate-approved> [--batch <ascii-name>] [--storefront https://jsmeilai.1688.com/]");
}

function argument(name: string): string | null {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] ?? null : null;
}

function batchName(): string {
  const value = argument("--batch");
  if (!value || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(value)) throw new Error("--batch must be 3-64 lowercase ASCII letters, digits, and hyphens.");
  return value;
}

function pathsFor(batch: string) {
  const batchRoot = join(workspaceRoot, batch);
  return {
    batchRoot,
    raw: join(batchRoot, "raw"),
    inspection: join(batchRoot, "inspection"),
    draft: join(batchRoot, "draft"),
    quarantine: join(batchRoot, "quarantine"),
    cleanup: join(batchRoot, "cleanup"),
    review: join(batchRoot, "review"),
  };
}

function writeJson(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function humanDecisions(path: string, batch: string): Map<string, HumanReviewDecision> {
  if (!isRegularFile(path)) return new Map();
  const value: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!value || typeof value !== "object" || (value as { schema?: unknown }).schema !== "product-batch-human-decisions/v1" || (value as { batch?: unknown }).batch !== batch || !Array.isArray((value as { decisions?: unknown }).decisions)) throw new Error("review/human-decisions.json must have the known schema, matching batch name, and a decisions array.");
  const decisions = (value as { decisions: HumanReviewDecision[] }).decisions;
  for (const decision of decisions) {
    if (!decision || typeof decision.listingId !== "string" || !/^\d{6,}$/.test(decision.listingId)) throw new Error("Each human review decision requires a numeric listingId.");
    if (decision.acceptedFamily && !productFamilies.includes(decision.acceptedFamily)) throw new Error(`${decision.listingId} has an unknown acceptedFamily.`);
    if (decision.variationDecision && decision.variationDecision !== "ONE_NORMALIZED_DRAFT_VARIATION_DETAILS_PENDING") throw new Error(`${decision.listingId} has an unknown variationDecision.`);
    if (decision.disposition && decision.disposition !== "QUARANTINE_DEFER") throw new Error(`${decision.listingId} has an unknown disposition.`);
    if (decision.disposition === "QUARANTINE_DEFER" && decision.acceptedFamily) throw new Error(`${decision.listingId} may not accept a family when quarantined/deferred.`);
    if (decision.imageReviewNotes?.some((note) => !note || !/^[a-f0-9]{64}$/.test(note.sha256) || note.disposition !== "NON_PREFERRED_PRODUCTION" || !note.reason.trim())) throw new Error(`${decision.listingId} has an invalid image review note.`);
  }
  if (new Set(decisions.map((decision) => decision.listingId)).size !== decisions.length) throw new Error("review/human-decisions.json must not repeat a listingId.");
  return new Map(decisions.map((decision) => [decision.listingId, decision]));
}

function init() {
  const batch = batchName();
  const paths = pathsFor(batch);
  Object.values(paths).forEach((path) => mkdirSync(path, { recursive: true }));
  writeJson(join(paths.batchRoot, "batch.json"), {
    schema: "product-batch-ingestion/v1",
    batch,
    state: "AWAITING_RAW_ZIPS",
    maximumArchives: maximumPilotArchives,
    authorizedStorefront,
    rawDirectory: relativeToRoot(root, paths.raw),
    boundaries: ["Raw ZIPs and all derived inspection/draft files stay local and are ignored by Git.", "No output is imported by the Next application.", "Only human-approved records may later be copied into data/products/approved/."]
  });
  console.log(`Initialized ${relativeToRoot(root, paths.batchRoot)}. Place untouched listing ZIPs in its raw/ directory.`);
}

function archiveEntries(zip: string): string[] {
  const output = execFileSync("tar", ["-tf", zip], { encoding: "utf8", windowsHide: true });
  const entries = output.split(/\r?\n/).filter(Boolean);
  if (!entries.length) throw new Error(`${basename(zip)} contains no entries.`);
  const unsafe = entries.filter((entry) => !archivePathIsSafe(entry));
  if (unsafe.length) throw new Error(`${basename(zip)} contains unsafe archive paths: ${unsafe.join(", ")}`);
  return entries;
}

function assertExtractedTreeIsContained(directory: string) {
  const rootPath = realpathSync(directory).replace(/[\\/]$/, "") + sep;
  const walk = (current: string) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      const resolved = realpathSync(path);
      if (!resolved.toLowerCase().startsWith(rootPath.toLowerCase())) throw new Error(`Archive entry resolves outside extraction root: ${entry.name}`);
      if (entry.isDirectory()) walk(path);
    }
  };
  walk(directory);
}

async function imageInventory(directory: string, archiveEntriesList: string[]): Promise<{ images: IntakeAsset[]; metadataFiles: string[]; unsupportedFiles: string[] }> {
  const images: IntakeAsset[] = [];
  const metadataFiles: string[] = [];
  const unsupportedFiles: string[] = [];
  for (const entry of archiveEntriesList) {
    if (entry.endsWith("/")) continue;
    const extension = extname(entry).toLowerCase();
    if (supportedMetadataExtensions.has(extension)) {
      metadataFiles.push(entry);
      continue;
    }
    if (!supportedImageExtensions.has(extension)) {
      unsupportedFiles.push(entry);
      continue;
    }
    const extracted = join(directory, ...entry.replace(/\\/g, "/").split("/"));
    if (!isRegularFile(extracted)) throw new Error(`Expected extracted image is missing: ${entry}`);
    let dimensions: { width?: number; height?: number };
    try {
      dimensions = await sharp(extracted).metadata();
    } catch {
      unsupportedFiles.push(entry);
      continue;
    }
    if (!dimensions.width || !dimensions.height) {
      unsupportedFiles.push(entry);
      continue;
    }
    images.push({ originalFilename: basename(entry), archivePath: entry, sha256: sha256File(extracted), bytes: readFileSync(extracted).byteLength, extension, reviewFlags: assetReviewFlags(basename(entry)), width: dimensions.width, height: dimensions.height, role: roleForArchivePath(entry) });
  }
  return { images, metadataFiles, unsupportedFiles };
}

async function inspect() {
  const batch = batchName();
  const paths = pathsFor(batch);
  const storefront = argument("--storefront") ?? authorizedStorefront;
  if (!existsSync(join(paths.batchRoot, "batch.json"))) throw new Error(`Unknown batch ${batch}; run init first.`);
  const archives = readdirSync(paths.raw, { withFileTypes: true }).filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".zip").map((entry) => join(paths.raw, entry.name)).sort((left, right) => left.localeCompare(right, "en"));
  if (!archives.length) throw new Error(`No .zip archives found in ${relativeToRoot(root, paths.raw)}.`);
  if (archives.length > maximumPilotArchives) throw new Error(`Pilot batches are bounded to ${maximumPilotArchives} ZIPs; found ${archives.length}.`);
  rmSync(paths.inspection, { recursive: true, force: true });
  mkdirSync(paths.inspection, { recursive: true });
  const decisions = humanDecisions(join(paths.review, "human-decisions.json"), batch);
  const intakes: ListingIntake[] = [];
  for (const archive of archives) {
    const filename = basename(archive);
    const extractRoot = join(paths.inspection, sha256File(archive).slice(0, 16));
    mkdirSync(extractRoot, { recursive: true });
    const entries = archiveEntries(archive);
    execFileSync("tar", ["-xf", archive, "-C", extractRoot], { encoding: "utf8", windowsHide: true });
    assertExtractedTreeIsContained(extractRoot);
    const inventory = await imageInventory(extractRoot, entries);
    const urlFile = entries.find((entry) => basename(entry).toLowerCase() === "_url.txt");
    const sourceMetadata = urlFile ? parseSourceMetadata(readFileSync(join(extractRoot, ...urlFile.replace(/\\/g, "/").split("/")), "utf8")) : undefined;
    const listingId = listingIdFromFilename(filename);
    const rawArchiveSha256 = sha256File(archive);
    const sourceStorefront = sourceMetadata?.storefrontUrl ?? storefront;
    const permissionStatus = hasCompleteStorefrontProvenance(listingId, rawArchiveSha256, sourceMetadata, authorizedStorefront) ? "STORE_LEVEL_PERMISSION_INHERITED" : sourceMetadata?.storefrontUrl ? "MISSING_LISTING_PROVENANCE" : "MISSING_AUTHORIZED_STOREFRONT";
    const images = inventory.images.map((image) => ({ ...image, reusePermissionStatus: permissionStatus === "STORE_LEVEL_PERMISSION_INHERITED" && !image.reviewFlags.length ? "STORE_LEVEL_PERMISSION_INHERITED" as const : "PROVENANCE_EXCEPTION" as const }));
    intakes.push({ listingId, originalZipFilename: filename, rawArchiveSha256, sourceStorefront, permissionStatus, sourceMetadata, sourceReviewFlags: sourceReviewFlags(sourceMetadata), humanReviewDecision: listingId ? decisions.get(listingId) : undefined, ...inventory, images });
  }
  const drafts = intakes.map(buildDraft);
  const relationships = analyzeCrossListingRelationships(drafts);
  const quarantined = drafts.filter((draft) => draft.status === "QUARANTINED");
  const cleanup = intakes.flatMap((intake) => triageImages(intake.images, intake.humanReviewDecision?.imageReviewNotes).filter((image) => image.disposition === "CLEANUP_REQUIRED").map((image) => ({ sourceZipFilename: intake.originalZipFilename, imageSha256: image.sha256, originalFilename: image.originalFilename, roles: image.roles, reason: image.reason })));
  writeJson(join(paths.draft, "drafts.json"), { schema: "product-batch-drafts/v1", batch, records: drafts.filter((draft) => draft.status === "PENDING_REVIEW") });
  writeJson(join(paths.quarantine, "quarantine.json"), { schema: "product-batch-quarantine/v1", batch, records: quarantined });
  writeJson(join(paths.cleanup, "cleanup-queue.json"), { schema: "product-batch-cleanup/v1", batch, records: cleanup });
  writeJson(join(paths.review, "intake-ledger.json"), { schema: "product-batch-intake-ledger/v1", batch, authorizedStorefront, permissionGrant: "Verified authorized storefront plus listing URL/ID, raw archive hash and image hash automatically inherit the documented store-level reuse permission. This does not approve production visual suitability.", listings: intakes });
  writeJson(join(paths.review, "cross-listing-analysis.json"), { schema: "product-batch-cross-listing-analysis/v1", batch, relationshipCount: relationships.length, automaticMerges: 0, relationships });
  writeJson(join(paths.review, "review-summary.json"), { schema: "product-batch-review-summary/v1", batch, archiveCount: intakes.length, draftCount: drafts.filter((draft) => draft.status === "PENDING_REVIEW").length, quarantineCount: quarantined.length, cleanupCount: cleanup.length, permissionInheritedImageCount: intakes.flatMap((intake) => intake.images).filter((image) => image.reusePermissionStatus === "STORE_LEVEL_PERMISSION_INHERITED").length, provenanceExceptionCount: drafts.flatMap((draft) => draft.humanGateExceptions).filter((exception) => exception.includes("provenance")).length, humanGateExceptionCount: drafts.flatMap((draft) => draft.humanGateExceptions).length, crossListingRelationshipCount: relationships.length, crossListingHumanReviewCount: relationships.filter((relationship) => relationship.status === "HUMAN_REVIEW" || relationship.status === "POSSIBLE_DUPLICATE" || relationship.status === "POSSIBLE_VARIATION").length, automaticMerges: 0, publicationState: "NO_DRAFT_OR_ASSET_IS_PUBLISHABLE", requiredHumanGate: ["Resolve only provenance, IP/third-party, product-mapping, or image-cleanup exceptions.", "Confirm claims only when the intended website record needs them.", "Create approved ProductRecord data separately; inspection output never becomes application data."] });
  console.log(`Inspected ${intakes.length} archive(s). Draft and quarantine outputs remain local under ${relativeToRoot(root, paths.batchRoot)}.`);
}

function exportReview() {
  const batch = batchName();
  const paths = pathsFor(batch);
  const destination = join(root, "data", "ingestion", "batch-reviews", batch);
  for (const filename of ["intake-ledger.json", "review-summary.json"]) {
    const source = join(paths.review, filename);
    if (!isRegularFile(source)) throw new Error(`Missing ${filename}; run inspect first.`);
  }
  mkdirSync(destination, { recursive: true });
  cpSync(paths.review, destination, { recursive: true, force: true });
  console.log(`Exported checksum-based review evidence to ${relativeToRoot(root, destination)}. Do not export raw ZIPs, extraction, drafts, or quarantines.`);
}

function validateApproved() {
  const directory = join(root, "data", "products", "approved");
  const files = collectJsonFiles(directory);
  const errors = files.flatMap((file) => {
    let records: unknown;
    try { records = JSON.parse(readFileSync(file, "utf8")); } catch { return [`${relativeToRoot(root, file)} is not valid JSON.`]; }
    const list = Array.isArray(records) ? records : [records];
    return list.flatMap((record, index) => validateApprovedProduct(record).map((error) => `${relativeToRoot(root, file)}${list.length > 1 ? `[${index}]` : ""}: ${error}`));
  });
  if (errors.length) throw new Error(`Approved product validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  console.log(`Approved product validation passed for ${files.length} JSON file(s).`);
}

async function main() {
  const command = process.argv[2];
  if (command === "init") init();
  else if (command === "inspect") await inspect();
  else if (command === "export-review") exportReview();
  else if (command === "validate-approved") validateApproved();
  else usage();
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
