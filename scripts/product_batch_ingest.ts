import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import sharp from "sharp";
import { analyzeCrossBatchRelationships, analyzeCrossListingRelationships, archivePathIsSafe, assetReviewFlags, buildDraft, buildListingRelationshipFingerprint, collectJsonFiles, hasCompleteStorefrontProvenance, isRegularFile, listingIdFromFilename, listingRegistryConflicts, parseSourceMetadata, productFamilies, relativeToRoot, roleForArchivePath, sha256File, sourceReviewFlags, supportedImageExtensions, supportedMetadataExtensions, triageImages, type CrossListingRelationship, type HumanRelationshipDecision, type HumanReviewDecision, type IntakeAsset, type ListingIntake, type ListingRelationshipFingerprint, type ProductDraft, validateApprovedCatalogue, validateApprovedProduct } from "../lib/product-ingestion";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = join(root, ".product-ingestion");
const authorizedStorefront = "https://jsmeilai.1688.com/";
const maximumPilotArchives = 8;
const listingRegistryPath = join(root, "data", "ingestion", "listing-registry.json");
const relationshipFingerprintPath = join(root, "data", "ingestion", "listing-relationship-fingerprints.json");
type DurableRegistryEntry = {
  listingId: string;
  batch: string;
  rawArchiveSha256: string;
  normalizedDraftId: string;
  normalizedProductFamily: ProductDraft["suggestedFamily"];
  normalizedProductGroupId?: string;
  familyDecision: "ACCEPTED" | "PENDING_HUMAN_REVIEW" | "QUARANTINE_DEFER";
  humanGateClassification: ProductDraft["humanGate"]["classification"];
  humanGateOverall: ProductDraft["humanGate"]["overall"];
  status: ProductDraft["status"];
};

function usage(): never {
  throw new Error("Usage: npm run ingest:batch -- <init|inspect|export-review|refresh-relationship-fingerprints|validate-approved> [--batch <ascii-name>] [--storefront https://jsmeilai.1688.com/]");
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

function readListingRegistry(): DurableRegistryEntry[] {
  if (!isRegularFile(listingRegistryPath)) return [];
  const value: unknown = JSON.parse(readFileSync(listingRegistryPath, "utf8"));
  if (!value || typeof value !== "object" || (value as { schema?: unknown }).schema !== "product-listing-registry/v1" || !Array.isArray((value as { entries?: unknown }).entries)) throw new Error("data/ingestion/listing-registry.json must have the known schema and an entries array.");
  const entries = (value as { entries: Array<DurableRegistryEntry & { listingId?: unknown; batch?: unknown; rawArchiveSha256?: unknown }> }).entries;
  for (const entry of entries) {
    if (!entry || typeof entry.listingId !== "string" || !/^\d{6,}$/.test(entry.listingId) || typeof entry.batch !== "string" || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(entry.batch) || typeof entry.rawArchiveSha256 !== "string" || !/^[a-f0-9]{64}$/.test(entry.rawArchiveSha256)) throw new Error("Each listing registry entry requires a valid listingId, batch, and rawArchiveSha256.");
    if (entry.normalizedProductGroupId !== undefined && (typeof entry.normalizedProductGroupId !== "string" || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(entry.normalizedProductGroupId))) throw new Error("Each normalizedProductGroupId must be a stable lowercase ASCII identifier.");
  }
  if (new Set(entries.map((entry) => entry.listingId)).size !== entries.length || new Set(entries.map((entry) => entry.rawArchiveSha256)).size !== entries.length) throw new Error("data/ingestion/listing-registry.json must not repeat a listingId or rawArchiveSha256.");
  return entries as DurableRegistryEntry[];
}

function readRelationshipFingerprints(): ListingRelationshipFingerprint[] {
  if (!isRegularFile(relationshipFingerprintPath)) throw new Error("Missing data/ingestion/listing-relationship-fingerprints.json; refresh durable historical relationship evidence before inspecting a new batch.");
  const value: unknown = JSON.parse(readFileSync(relationshipFingerprintPath, "utf8"));
  if (!value || typeof value !== "object" || (value as { schema?: unknown }).schema !== "product-listing-relationship-fingerprints/v1" || !Array.isArray((value as { entries?: unknown }).entries)) throw new Error("data/ingestion/listing-relationship-fingerprints.json must have the known schema and an entries array.");
  return (value as { entries: ListingRelationshipFingerprint[] }).entries;
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
  const registry = readListingRegistry();
  const seenListingIds = new Set<string>();
  const seenArchiveHashes = new Set<string>();
  const archiveDetails = archives.map((archive) => ({ archive, filename: basename(archive), listingId: listingIdFromFilename(basename(archive)), rawArchiveSha256: sha256File(archive) }));
  for (const detail of archiveDetails) {
    const conflicts = listingRegistryConflicts(registry, batch, detail.listingId, detail.rawArchiveSha256);
    if (conflicts.length) throw new Error(`${detail.filename} is already registered in another batch (${conflicts.map((entry) => `${entry.batch}:${entry.listingId}`).join(", ")}); do not re-ingest an existing listing or archive.`);
    if (detail.listingId && seenListingIds.has(detail.listingId)) throw new Error(`${detail.filename} repeats listing ${detail.listingId} within batch ${batch}.`);
    if (seenArchiveHashes.has(detail.rawArchiveSha256)) throw new Error(`${detail.filename} repeats an archive SHA-256 within batch ${batch}.`);
    if (detail.listingId) seenListingIds.add(detail.listingId);
    seenArchiveHashes.add(detail.rawArchiveSha256);
  }
  rmSync(paths.inspection, { recursive: true, force: true });
  mkdirSync(paths.inspection, { recursive: true });
  const decisions = humanDecisions(join(paths.review, "human-decisions.json"), batch);
  const intakes: ListingIntake[] = [];
  for (const detail of archiveDetails) {
    const { archive, filename, listingId, rawArchiveSha256 } = detail;
    const extractRoot = join(paths.inspection, rawArchiveSha256.slice(0, 16));
    mkdirSync(extractRoot, { recursive: true });
    const entries = archiveEntries(archive);
    execFileSync("tar", ["-xf", archive, "-C", extractRoot], { encoding: "utf8", windowsHide: true });
    assertExtractedTreeIsContained(extractRoot);
    const inventory = await imageInventory(extractRoot, entries);
    const urlFile = entries.find((entry) => basename(entry).toLowerCase() === "_url.txt");
    const sourceMetadata = urlFile ? parseSourceMetadata(readFileSync(join(extractRoot, ...urlFile.replace(/\\/g, "/").split("/")), "utf8")) : undefined;
    const sourceStorefront = sourceMetadata?.storefrontUrl ?? storefront;
    const permissionStatus = hasCompleteStorefrontProvenance(listingId, rawArchiveSha256, sourceMetadata, authorizedStorefront) ? "STORE_LEVEL_PERMISSION_INHERITED" : sourceMetadata?.storefrontUrl ? "MISSING_LISTING_PROVENANCE" : "MISSING_AUTHORIZED_STOREFRONT";
    const images = inventory.images.map((image) => ({ ...image, reusePermissionStatus: permissionStatus === "STORE_LEVEL_PERMISSION_INHERITED" && !image.reviewFlags.length ? "STORE_LEVEL_PERMISSION_INHERITED" as const : "PROVENANCE_EXCEPTION" as const }));
    intakes.push({ listingId, originalZipFilename: filename, rawArchiveSha256, sourceStorefront, permissionStatus, sourceMetadata, sourceReviewFlags: sourceReviewFlags(sourceMetadata), humanReviewDecision: listingId ? decisions.get(listingId) : undefined, ...inventory, images });
  }
  const drafts = intakes.map(buildDraft);
  const relationships = analyzeCrossListingRelationships(drafts);
  const historicalFingerprints = readRelationshipFingerprints();
  const relationshipDecisions = humanRelationshipDecisions(join(paths.review, "human-decisions.json"), batch);
  const priorBatchFingerprints = historicalFingerprints.filter((fingerprint) => fingerprint.batch !== batch);
  const crossBatchRelationships = applyHumanRelationshipDecisions(analyzeCrossBatchRelationships(drafts, priorBatchFingerprints), relationshipDecisions);
  const quarantined = drafts.filter((draft) => draft.status === "QUARANTINED");
  const cleanup = intakes.flatMap((intake) => triageImages(intake.images, intake.humanReviewDecision?.imageReviewNotes).filter((image) => image.disposition === "CLEANUP_REQUIRED").map((image) => ({ sourceZipFilename: intake.originalZipFilename, imageSha256: image.sha256, originalFilename: image.originalFilename, roles: image.roles, reason: image.reason })));
  writeJson(join(paths.draft, "drafts.json"), { schema: "product-batch-drafts/v1", batch, records: drafts.filter((draft) => draft.status === "PENDING_REVIEW") });
  writeJson(join(paths.quarantine, "quarantine.json"), { schema: "product-batch-quarantine/v1", batch, records: quarantined });
  writeJson(join(paths.cleanup, "cleanup-queue.json"), { schema: "product-batch-cleanup/v1", batch, records: cleanup });
  writeJson(join(paths.review, "intake-ledger.json"), { schema: "product-batch-intake-ledger/v1", batch, authorizedStorefront, permissionGrant: "Verified authorized storefront plus listing URL/ID, raw archive hash and image hash automatically inherit the documented store-level reuse permission. This does not approve production visual suitability.", listings: intakes });
  writeJson(join(paths.review, "cross-listing-analysis.json"), { schema: "product-batch-cross-listing-analysis/v1", batch, relationshipCount: relationships.length, automaticMerges: 0, relationships });
  writeJson(join(paths.review, "cross-batch-analysis.json"), { schema: "product-batch-cross-batch-analysis/v1", batch, historicalFingerprintCount: priorBatchFingerprints.length, relationshipCount: crossBatchRelationships.length, humanDecisionCount: relationshipDecisions.length, automaticMerges: 0, relationships: crossBatchRelationships });
  writeJson(join(paths.review, "review-summary.json"), { schema: "product-batch-review-summary/v1", batch, archiveCount: intakes.length, draftCount: drafts.filter((draft) => draft.status === "PENDING_REVIEW").length, quarantineCount: quarantined.length, cleanupCount: cleanup.length, permissionInheritedImageCount: intakes.flatMap((intake) => intake.images).filter((image) => image.reusePermissionStatus === "STORE_LEVEL_PERMISSION_INHERITED").length, provenanceExceptionCount: drafts.flatMap((draft) => draft.humanGateExceptions).filter((exception) => exception.includes("provenance")).length, humanGateExceptionCount: drafts.flatMap((draft) => draft.humanGateExceptions).length, crossListingRelationshipCount: relationships.length, crossListingHumanReviewCount: relationships.filter((relationship) => relationship.status === "HUMAN_REVIEW" || relationship.status === "POSSIBLE_DUPLICATE" || relationship.status === "POSSIBLE_VARIATION").length, crossBatchRelationshipCount: crossBatchRelationships.length, crossBatchHumanReviewCount: crossBatchRelationships.filter((relationship) => !relationship.humanDecision && (relationship.status === "HUMAN_REVIEW" || relationship.status === "POSSIBLE_DUPLICATE" || relationship.status === "POSSIBLE_VARIATION")).length, crossBatchHumanDecisionCount: relationshipDecisions.length, automaticMerges: 0, publicationState: "NO_DRAFT_OR_ASSET_IS_PUBLISHABLE", requiredHumanGate: ["Resolve only provenance, IP/third-party, product-mapping, or image-cleanup exceptions.", "Review cross-batch relationships before normalizing multiple listings into one website product.", "Confirm claims only when the intended website record needs them.", "Create approved ProductRecord data separately; inspection output never becomes application data."] });
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
  const relationshipDecisions = humanRelationshipDecisions(join(paths.review, "human-decisions.json"), batch);
  updateListingRegistry(batch, paths, relationshipDecisions);
  refreshRelationshipFingerprints();
  console.log(`Exported checksum-based review evidence to ${relativeToRoot(root, destination)}. Do not export raw ZIPs, extraction, drafts, or quarantines.`);
}

function relationshipDecisionKey(ids: [string, string]): string {
  return [...ids].sort().join("::");
}

function humanRelationshipDecisions(path: string, batch: string): HumanRelationshipDecision[] {
  if (!isRegularFile(path)) return [];
  const value: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!value || typeof value !== "object" || (value as { schema?: unknown }).schema !== "product-batch-human-decisions/v1" || (value as { batch?: unknown }).batch !== batch) throw new Error("review/human-decisions.json relationshipDecisions must use the known schema and matching batch name.");
  const rawDecisions = (value as { relationshipDecisions?: unknown }).relationshipDecisions;
  if (rawDecisions === undefined) return [];
  if (!Array.isArray(rawDecisions)) throw new Error("review/human-decisions.json relationshipDecisions must be an array.");
  const decisions = rawDecisions as HumanRelationshipDecision[];
  for (const decision of decisions) {
    if (!Array.isArray(decision.sourceListingIds) || decision.sourceListingIds.length !== 2 || decision.sourceListingIds.some((id) => typeof id !== "string" || !/^\d{6,}$/.test(id))) throw new Error("Each relationship decision requires two numeric sourceListingIds.");
    if (!["SAME_PRODUCT_DIFFERENT_LISTING", "POSSIBLE_VARIATION", "KEEP_SEPARATE"].includes(decision.decision)) throw new Error(`Relationship ${decision.sourceListingIds.join("/")} has an unknown decision.`);
    if (!["DUPLICATE_MARKETPLACE_PRESENTATION", "RELATED_LISTING", "KEEP_SEPARATE"].includes(decision.relationshipLabel)) throw new Error(`Relationship ${decision.sourceListingIds.join("/")} has an unknown relationshipLabel.`);
    if (decision.decision === "SAME_PRODUCT_DIFFERENT_LISTING" && (decision.relationshipLabel !== "DUPLICATE_MARKETPLACE_PRESENTATION" || !decision.normalizedProductGroupId || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(decision.normalizedProductGroupId))) throw new Error(`Relationship ${decision.sourceListingIds.join("/")} requires a stable normalizedProductGroupId.`);
    if (decision.decision === "POSSIBLE_VARIATION" && decision.relationshipLabel !== "RELATED_LISTING") throw new Error(`Relationship ${decision.sourceListingIds.join("/")} must use RELATED_LISTING.`);
    if (decision.decision === "KEEP_SEPARATE" && decision.relationshipLabel !== "KEEP_SEPARATE") throw new Error(`Relationship ${decision.sourceListingIds.join("/")} must use KEEP_SEPARATE.`);
  }
  if (new Set(decisions.map((decision) => relationshipDecisionKey(decision.sourceListingIds))).size !== decisions.length) throw new Error("review/human-decisions.json must not repeat a relationship pair.");
  return decisions;
}

function applyHumanRelationshipDecisions(relationships: CrossListingRelationship[], decisions: HumanRelationshipDecision[]): CrossListingRelationship[] {
  const byPair = new Map(decisions.map((decision) => [relationshipDecisionKey(decision.sourceListingIds), decision]));
  for (const decision of decisions) if (!relationships.some((relationship) => relationshipDecisionKey(relationship.sourceListingIds) === relationshipDecisionKey(decision.sourceListingIds))) throw new Error(`Human relationship decision ${decision.sourceListingIds.join("/")} has no matching analyzed relationship.`);
  return relationships.map((relationship) => {
    const decision = byPair.get(relationshipDecisionKey(relationship.sourceListingIds));
    if (!decision) return relationship;
    const status = decision.decision === "SAME_PRODUCT_DIFFERENT_LISTING" ? "POSSIBLE_DUPLICATE" : decision.decision;
    const recommendation = decision.decision === "SAME_PRODUCT_DIFFERENT_LISTING" ? "SAME_PRODUCT_DIFFERENT_LISTING" : decision.decision === "POSSIBLE_VARIATION" ? "SAME_PRODUCT_WITH_DIFFERENT_VARIATION_SET" : "KEEP_SEPARATE";
    return { ...relationship, status, recommendation, action: "DO_NOT_MERGE", humanDecision: decision.decision, relationshipLabel: decision.relationshipLabel, normalizedProductGroupId: decision.normalizedProductGroupId, rationale: `${relationship.rationale} Human Gate decision recorded: ${decision.decision}.` };
  });
}

function refreshRelationshipFingerprints() {
  const registry = readListingRegistry();
  const entries: ListingRelationshipFingerprint[] = [];
  for (const registryEntry of registry) {
    const batchRoot = pathsFor(registryEntry.batch);
    const sources = [join(batchRoot.draft, "drafts.json"), join(batchRoot.quarantine, "quarantine.json")];
    const drafts = sources.flatMap((source) => isRegularFile(source) ? ((JSON.parse(readFileSync(source, "utf8")) as { records?: ProductDraft[] }).records ?? []) : []);
    const draft = drafts.find((candidate) => candidate.draftId === registryEntry.normalizedDraftId);
    if (!draft) throw new Error(`Missing local normalized draft ${registryEntry.normalizedDraftId} for registry listing ${registryEntry.listingId}.`);
    entries.push(buildListingRelationshipFingerprint(draft, registryEntry.batch, registryEntry.rawArchiveSha256, registryEntry.normalizedProductFamily));
  }
  mkdirSync(dirname(relationshipFingerprintPath), { recursive: true });
  writeJson(relationshipFingerprintPath, { schema: "product-listing-relationship-fingerprints/v1", purpose: "Lightweight tracked historical image/SKU hash and title evidence for cross-batch relationship review. Raw images remain Git-ignored.", entries: entries.sort((left, right) => left.batch.localeCompare(right.batch) || left.listingId.localeCompare(right.listingId)) });
  console.log(`Refreshed ${entries.length} durable relationship fingerprint(s).`);
}

function updateListingRegistry(batch: string, paths: ReturnType<typeof pathsFor>, relationshipDecisions: HumanRelationshipDecision[]) {
  const ledger = JSON.parse(readFileSync(join(paths.review, "intake-ledger.json"), "utf8")) as { listings?: ListingIntake[] };
  const drafts = [
    ...(JSON.parse(readFileSync(join(paths.draft, "drafts.json"), "utf8")) as { records?: ProductDraft[] }).records ?? [],
    ...(JSON.parse(readFileSync(join(paths.quarantine, "quarantine.json"), "utf8")) as { records?: ProductDraft[] }).records ?? [],
  ];
  if (!Array.isArray(ledger.listings) || drafts.length !== ledger.listings.length) throw new Error(`Cannot update listing registry for ${batch}: ledger and normalized draft counts do not match.`);
  const additions: DurableRegistryEntry[] = ledger.listings.map((intake) => {
    if (!intake.listingId) throw new Error(`Cannot update listing registry for ${batch}: an intake has no listingId.`);
    const draft = drafts.find((candidate) => candidate.sourceListingIds.includes(intake.listingId!));
    if (!draft) throw new Error(`Cannot update listing registry for ${batch}: missing normalized draft for ${intake.listingId}.`);
    const decision = intake.humanReviewDecision;
    const group = relationshipDecisions.find((relationship) => relationship.decision === "SAME_PRODUCT_DIFFERENT_LISTING" && relationship.sourceListingIds.includes(intake.listingId!));
    return { listingId: intake.listingId, batch, rawArchiveSha256: intake.rawArchiveSha256, normalizedDraftId: draft.draftId, normalizedProductFamily: draft.suggestedFamily, ...(group?.normalizedProductGroupId ? { normalizedProductGroupId: group.normalizedProductGroupId } : {}), familyDecision: decision?.disposition === "QUARANTINE_DEFER" ? "QUARANTINE_DEFER" : decision?.acceptedFamily ? "ACCEPTED" : "PENDING_HUMAN_REVIEW", humanGateClassification: draft.humanGate.classification, humanGateOverall: draft.humanGate.overall, status: draft.status };
  });
  if (new Set(additions.map((entry) => entry.listingId)).size !== additions.length || new Set(additions.map((entry) => entry.rawArchiveSha256)).size !== additions.length) throw new Error(`Cannot update listing registry for ${batch}: normalized entries repeat a listingId or rawArchiveSha256.`);
  const existing = readListingRegistry();
  const conflicts = additions.flatMap((entry) => listingRegistryConflicts(existing, batch, entry.listingId, entry.rawArchiveSha256));
  if (conflicts.length) throw new Error(`Cannot update listing registry for ${batch}: an entry conflicts with another batch (${conflicts.map((entry) => `${entry.batch}:${entry.listingId}`).join(", ")}).`);
  const otherBatches = existing.filter((entry) => entry.batch !== batch);
  const combined = [...otherBatches, ...additions];
  for (const relationship of relationshipDecisions) {
    if (relationship.decision !== "SAME_PRODUCT_DIFFERENT_LISTING") continue;
    const members = combined.filter((entry) => relationship.sourceListingIds.includes(entry.listingId));
    if (members.length !== 2) throw new Error(`Cannot update listing registry for ${batch}: relationship ${relationship.sourceListingIds.join("/")} does not resolve to two registered listings.`);
    members.forEach((entry) => { entry.normalizedProductGroupId = relationship.normalizedProductGroupId; });
  }
  writeJson(listingRegistryPath, { schema: "product-listing-registry/v1", purpose: "Durable cumulative identity and Human Gate state for processed real source listings. Raw archives and derived local files remain Git-ignored.", entries: combined.sort((left, right) => left.batch.localeCompare(right.batch) || left.listingId.localeCompare(right.listingId)) });
}

async function validateApproved() {
  const directory = join(root, "data", "products", "approved");
  const files = collectJsonFiles(directory);
  const approvedRecords: unknown[] = [];
  const errors = files.flatMap((file) => {
    let parsed: unknown;
    try { parsed = JSON.parse(readFileSync(file, "utf8")); } catch { return [`${relativeToRoot(root, file)} is not valid JSON.`]; }
    const list = Array.isArray(parsed) ? parsed : [parsed];
    approvedRecords.push(...list);
    return list.flatMap((record, index) => validateApprovedProduct(record).map((error) => `${relativeToRoot(root, file)}${list.length > 1 ? `[${index}]` : ""}: ${error}`));
  });
  const registry = JSON.parse(readFileSync(listingRegistryPath, "utf8"));
  const manifest = JSON.parse(readFileSync(join(root, "assets", "asset-manifest.json"), "utf8"));
  const fingerprints = readFileSync(join(root, "data", "ingestion", "listing-relationship-fingerprints.json"), "utf8");
  errors.push(...validateApprovedCatalogue(approvedRecords, { registryEntries: registry.entries ?? [], productionAssets: manifest.productionAssets ?? [], durableEvidenceText: fingerprints }));
  for (const asset of manifest.productionAssets ?? []) {
    const originalPath = join(root, asset.original.path);
    if (!isRegularFile(originalPath)) errors.push(`${asset.assetId}: original file is missing.`);
    else if (sha256File(originalPath) !== asset.sourceHash) errors.push(`${asset.assetId}: original hash does not match sourceHash.`);
    for (const derivative of asset.derivatives ?? []) {
      const derivativePath = derivative.path.startsWith("/products/media/")
        ? join(root, "public", derivative.path.slice(1))
        : join(root, "assets", derivative.path.slice(1));
      if (!isRegularFile(derivativePath)) errors.push(`${derivative.assetId}: derivative file is missing.`);
      else if (sha256File(derivativePath) !== derivative.sha256) errors.push(`${derivative.assetId}: derivative hash does not match manifest.`);
      else {
        const metadata = await sharp(derivativePath).metadata();
        if (metadata.width !== derivative.width || metadata.height !== derivative.height || metadata.format !== derivative.format) errors.push(`${derivative.assetId}: derivative dimensions or format do not match manifest.`);
      }
    }
  }
  if (errors.length) throw new Error(`Approved product validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  console.log(`Approved product validation passed for ${files.length} JSON file(s).`);
}

async function main() {
  const command = process.argv[2];
  if (command === "init") init();
  else if (command === "inspect") await inspect();
  else if (command === "export-review") exportReview();
  else if (command === "refresh-relationship-fingerprints") refreshRelationshipFingerprints();
  else if (command === "validate-approved") await validateApproved();
  else usage();
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
