import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import type { AssetReference, FactStatus, ProductFamily, ProductRecord } from "@/types/product";

export const productFamilies = ["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils"] as const satisfies readonly ProductFamily[];
export const supportedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
export const supportedMetadataExtensions = new Set([".json", ".txt", ".html", ".htm", ".csv", ".pdf"]);

export type IntakeAsset = {
  originalFilename: string;
  archivePath: string;
  sha256: string;
  bytes: number;
  extension: string;
  reviewFlags: string[];
  width?: number;
  height?: number;
  role?: "main" | "sku" | "description" | "other";
  reusePermissionStatus?: "STORE_LEVEL_PERMISSION_INHERITED" | "PROVENANCE_EXCEPTION";
};

export type ImageReviewNote = {
  sha256: string;
  disposition: "NON_PREFERRED_PRODUCTION";
  reason: string;
};

export type HumanReviewDecision = {
  listingId: string;
  acceptedFamily?: ProductFamily;
  variationDecision?: "ONE_NORMALIZED_DRAFT_VARIATION_DETAILS_PENDING";
  disposition?: "QUARANTINE_DEFER";
  imageReviewNotes?: ImageReviewNote[];
};

export type ListingIntake = {
  listingId: string | null;
  originalZipFilename: string;
  rawArchiveSha256: string;
  sourceStorefront: string;
  permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED" | "MISSING_AUTHORIZED_STOREFRONT" | "MISSING_LISTING_PROVENANCE";
  images: IntakeAsset[];
  metadataFiles: string[];
  unsupportedFiles: string[];
  sourceMetadata?: SourceMetadata;
  sourceReviewFlags?: string[];
  humanReviewDecision?: HumanReviewDecision;
};

export type SourceMetadata = {
  storeName: string | null;
  storefrontUrl: string | null;
  listingTitle: string | null;
  listingUrl: string | null;
};

export type ProductDraft = {
  draftId: string;
  sourceListingIds: string[];
  sourceZipFilenames: string[];
  suggestedFamily: ProductFamily | null;
  suggestedProductName: string | null;
  familyConfidence: "high" | "medium" | "low" | null;
  classificationReasons: string[];
  sourceMetadata: SourceMetadata;
  sourceFacts: Array<{ field: string; value: string; status: FactStatus; source: string }>;
  unknownFields: string[];
  conflicts: string[];
  imageSummary: { references: number; uniqueBinaries: number; byRole: Record<string, number>; unsupportedFiles: number };
  candidatePrimaryImages: Array<{ sha256: string; originalFilename: string; status: "UNAPPROVED"; reasons: string[] }>;
  duplicateSummary: { exactDuplicateReferences: number; duplicateGroups: number };
  variationSummary: { skuReferences: number; uniqueSkuBinaries: number; labels: string[]; status: "EVIDENCE_ONLY" };
  imageTriage: Array<{ sha256: string; originalFilename: string; roles: string[]; disposition: "SAFE_SUPPORTING_CANDIDATE" | "DUPLICATE_LINKED" | "VARIATION_EVIDENCE_ONLY" | "RESEARCH_EVIDENCE_ONLY" | "NON_PREFERRED_PRODUCTION" | "CLEANUP_REQUIRED"; reason: string }>;
  humanGate: { classification: "HUMAN_ACCEPTED" | "PENDING_HUMAN_DECISION"; permission: "INHERITED" | "EXCEPTION"; variations: "ONE_NORMALIZED_DRAFT_VARIATION_DETAILS_PENDING" | "EVIDENCE_ONLY"; productionVisuals: "PENDING_PRODUCTION_VISUAL_REVIEW"; overall: "PENDING_REVIEW" | "QUARANTINED" };
  humanGateExceptions: string[];
  status: "PENDING_REVIEW" | "QUARANTINED";
  blockers: string[];
  imageAssetHashes: string[];
  notes: string[];
};

export type CrossListingRelationshipStatus = "KEEP_SEPARATE" | "POSSIBLE_VARIATION" | "POSSIBLE_DUPLICATE" | "HUMAN_REVIEW";

export type CrossListingRelationship = {
  sourceListingIds: [string, string];
  status: CrossListingRelationshipStatus;
  exactSharedImageHashes: string[];
  sharedEvidence: string[];
  distinguishingEvidence: string[];
  rationale: string;
  action: "DO_NOT_MERGE" | "HUMAN_DECISION_REQUIRED";
};

const factStatuses = new Set<FactStatus>(["CONFIRMED", "PENDING_CONFIRMATION", "UNKNOWN", "NOT_APPLICABLE"]);
const productStatuses = new Set<ProductRecord["status"]>(["DRAFT", "PENDING_REVIEW", "APPROVED", "ARCHIVED"]);
const assetRoles = new Set<AssetReference["role"]>(["primary", "detail", "context", "thumbnail"]);
// A marketplace or store name in a filename is not itself an asset defect. Keep
// this limited to explicit watermark/copyright or recognizable third-party/IP hints.
const suspiciousName = /watermark|copyright|frozen|elsa|disney/i;
const thirdPartyIpTitle = /冰雪艾莎|冰雪奇缘|艾莎|elsa|frozen|disney|迪士尼/i;

export function sha256File(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

export function archivePathIsSafe(entry: string): boolean {
  const normalized = entry.replace(/\\/g, "/");
  return normalized.length > 0 && !normalized.startsWith("/") && !/^[A-Za-z]:\//.test(normalized) && !normalized.split("/").includes("..");
}

export function listingIdFromFilename(filename: string): string | null {
  const matches = filename.match(/(?:^|[_\-])(\d{6,})(?=_[^_]+\.zip$|\.zip$)/i) ?? filename.match(/(\d{6,})/g);
  if (!matches) return null;
  const candidate = Array.isArray(matches) ? matches[matches.length - 1] : matches[1];
  return candidate?.replace(/\D/g, "") || null;
}

export function assetReviewFlags(filename: string): string[] {
  return suspiciousName.test(filename) ? ["MANUAL_RISK_REVIEW_REQUIRED: filename may indicate watermark, marketplace, brand, or IP context"] : [];
}

export function sourceReviewFlags(metadata: SourceMetadata | undefined): string[] {
  const title = metadata?.listingTitle ?? "";
  return thirdPartyIpTitle.test(title) ? ["THIRD_PARTY_IP_RISK: source title contains a recognizable character or brand reference; retain as non-public evidence and require Human Gate review."] : [];
}

export function parseSourceMetadata(text: string): SourceMetadata {
  const value = (label: string) => text.match(new RegExp(`^${label}\\s*:\\s*(?:\\r?\\n)?([^\\r\\n]+)$`, "m"))?.[1]?.trim() || null;
  const urls = text.split(/\r?\n/).map((line) => line.trim()).filter((line) => /^https?:\/\//i.test(line));
  return { storeName: value("店铺名称"), storefrontUrl: urls.find((url) => url.includes("jsmeilai.1688.com")) ?? null, listingTitle: value("商品标题"), listingUrl: value("商品链接") };
}

export function hasCompleteStorefrontProvenance(listingId: string | null, rawArchiveSha256: string, metadata: SourceMetadata | undefined, authorizedStorefront: string): boolean {
  if (!listingId || !/^[a-f0-9]{64}$/.test(rawArchiveSha256) || !metadata?.storefrontUrl || !metadata.listingUrl) return false;
  try {
    const storefront = new URL(metadata.storefrontUrl);
    const authorized = new URL(authorizedStorefront);
    const listing = new URL(metadata.listingUrl);
    return storefront.origin === authorized.origin && listing.origin === "https://detail.1688.com" && listing.pathname === `/offer/${listingId}.html`;
  } catch { return false; }
}

function classify(title: string) {
  const t = title;
  if (/头纱|头饰|发饰/.test(t)) return { family: "wedding-veils" as ProductFamily, name: "Lace-trim bridal veil", confidence: "high" as const, reasons: ["Title identifies a veil or bridal headpiece.", "The frozen Wedding / Bridal Veils family matches the product object."], conflicts: [] };
  if (/儿童|女孩/.test(t) && /手套/.test(t) && !/婚纱|婚礼|新娘/.test(t)) return { family: "kids-dress-gloves" as ProductFamily, name: /印花/.test(t) ? "Kids' printed satin dress gloves" : "Kids' dress gloves", confidence: "medium" as const, reasons: ["Title identifies a children’s glove product.", "The frozen Kids / Girls Dress Gloves family is the closest product-object fit."], conflicts: [] };
  if (/短款/.test(t) && /蕾丝|网纱/.test(t) && /手套|袖套/.test(t)) return { family: "bridal-gloves" as ProductFamily, name: "Short lace bridal gloves", confidence: "medium" as const, reasons: ["Title identifies a short lace or mesh glove.", "Bridal wording and the frozen Bridal / Wedding Gloves intent support this as the primary family."], conflicts: [] };
  if (/褶皱/.test(t) && /缎面|色丁/.test(t) && /手套|袖套/.test(t)) return { family: "bridal-gloves" as ProductFamily, name: "Long ruched satin bridal gloves", confidence: "medium" as const, reasons: ["Title identifies a ruched satin glove construction.", "Bridal wording is supporting evidence; marketplace event terms are not used as a family rule."], conflicts: [] };
  if (/露指|勾指|无指/.test(t) && /缎面|色丁/.test(t) && /手套|袖套/.test(t)) return { family: "bridal-gloves" as ProductFamily, name: "Long fingerless satin bridal gloves", confidence: "medium" as const, reasons: ["Title identifies a long fingerless or finger-loop satin glove construction.", "Bridal wording is supporting evidence; marketplace event terms are not used as a family rule."], conflicts: [] };
  if (/露指|勾指|无指/.test(t) && /蕾丝|网纱/.test(t) && /手套|袖套/.test(t)) return { family: "bridal-gloves" as ProductFamily, name: /绣花|钉珠/.test(t) ? "Long embellished fingerless lace bridal gloves" : "Long fingerless lace bridal gloves", confidence: "medium" as const, reasons: ["Title identifies a fingerless lace glove construction.", "Bridal wording and the frozen Bridal / Wedding Gloves intent support this as the primary family."], conflicts: [] };
  if (/蕾丝|网纱/.test(t) && /婚纱|婚礼|新娘/.test(t) && /手套|袖套/.test(t)) return { family: "bridal-gloves" as ProductFamily, name: "Lace bridal gloves", confidence: "low" as const, reasons: ["Title identifies lace or mesh gloves with bridal context.", "The exact audience and construction remain subject to Human Gate review."], conflicts: /儿童|女孩/.test(t) ? ["Source title mixes children’s and bridal audience wording; confirm the primary family from the product object before approval."] : [] };
  if (/儿童|女孩/.test(t) && /手套/.test(t)) return { family: "kids-dress-gloves" as ProductFamily, name: "Kids' dress gloves", confidence: "low" as const, reasons: ["Title identifies children or girls.", "Mixed marketplace context means the family remains a Human Gate suggestion only."], conflicts: [] };
  if (/长款|加长/.test(t) && /缎面|色丁|光滑/.test(t) && /手套/.test(t)) return { family: "opera-gloves" as ProductFamily, name: "Long satin formal gloves", confidence: "medium" as const, reasons: ["Title identifies a long satin glove construction.", "The frozen Opera / Evening / Formal Gloves family matches the product-object fit."], conflicts: [] };
  return { family: null, name: null, confidence: "low" as const, reasons: ["No frozen-family classification rule reached a reliable result."], conflicts: [] };
}

type TitleFeatures = { long: boolean; short: boolean; fullFinger: boolean; fingerless: boolean; satin: boolean; laceOrMesh: boolean; ruched: boolean; bowOrEdge: boolean; embellished: boolean; printed: boolean; kids: boolean };

function titleFeatures(title: string): TitleFeatures {
  return {
    long: /长款|加长/.test(title), short: /短款/.test(title), fullFinger: /包指/.test(title), fingerless: /露指|勾指|无指/.test(title), satin: /缎面|色丁|光滑/.test(title), laceOrMesh: /蕾丝|网纱/.test(title), ruched: /褶皱/.test(title), bowOrEdge: /蝴蝶结|花边/.test(title), embellished: /绣花|钉珠/.test(title), printed: /印花/.test(title), kids: /儿童|女孩/.test(title),
  };
}

export function analyzeCrossListingRelationships(drafts: ProductDraft[]): CrossListingRelationship[] {
  const relationships: CrossListingRelationship[] = [];
  for (let leftIndex = 0; leftIndex < drafts.length; leftIndex += 1) for (let rightIndex = leftIndex + 1; rightIndex < drafts.length; rightIndex += 1) {
    const left = drafts[leftIndex]!;
    const right = drafts[rightIndex]!;
    const leftId = left.sourceListingIds[0] ?? left.draftId;
    const rightId = right.sourceListingIds[0] ?? right.draftId;
    const leftFeatures = titleFeatures(left.sourceMetadata.listingTitle ?? "");
    const rightFeatures = titleFeatures(right.sourceMetadata.listingTitle ?? "");
    const sharedHashes = [...new Set(left.imageAssetHashes.filter((hash) => right.imageAssetHashes.includes(hash)))];
    const sharedEvidence = ([
      [leftFeatures.long && rightFeatures.long, "both titles identify a long construction"],
      [leftFeatures.short && rightFeatures.short, "both titles identify a short construction"],
      [leftFeatures.satin && rightFeatures.satin, "both titles identify satin construction"],
      [leftFeatures.laceOrMesh && rightFeatures.laceOrMesh, "both titles identify lace or mesh construction"],
      [leftFeatures.fingerless && rightFeatures.fingerless, "both titles identify fingerless construction"],
      [leftFeatures.kids && rightFeatures.kids, "both titles include children’s audience wording"],
    ] as const).filter(([matches]) => matches).map(([, evidence]) => evidence);
    const distinguishingEvidence = ([
      [leftFeatures.long !== rightFeatures.long && (leftFeatures.long || rightFeatures.long) && (leftFeatures.short || rightFeatures.short), "long-versus-short construction evidence"],
      [leftFeatures.fullFinger !== rightFeatures.fullFinger && (leftFeatures.fullFinger || rightFeatures.fullFinger) && (leftFeatures.fingerless || rightFeatures.fingerless), "full-finger versus fingerless construction evidence"],
      [leftFeatures.satin !== rightFeatures.satin && (leftFeatures.satin || rightFeatures.satin) && (leftFeatures.laceOrMesh || rightFeatures.laceOrMesh), "satin versus lace/mesh construction evidence"],
      [leftFeatures.ruched !== rightFeatures.ruched && (leftFeatures.ruched || rightFeatures.ruched), "ruched construction appears in only one title"],
      [leftFeatures.bowOrEdge !== rightFeatures.bowOrEdge && (leftFeatures.bowOrEdge || rightFeatures.bowOrEdge), "cuff or edge detail appears in only one title"],
      [leftFeatures.embellished !== rightFeatures.embellished && (leftFeatures.embellished || rightFeatures.embellished), "embellishment evidence appears in only one title"],
      [leftFeatures.printed !== rightFeatures.printed && (leftFeatures.printed || rightFeatures.printed), "printed construction appears in only one title"],
    ] as const).filter(([matches]) => matches).map(([, evidence]) => evidence);
    if (sharedHashes.length) relationships.push({ sourceListingIds: [leftId, rightId], status: "POSSIBLE_DUPLICATE", exactSharedImageHashes: sharedHashes, sharedEvidence, distinguishingEvidence, rationale: "Exact shared source binary is strong duplication evidence, but listing metadata and option evidence still require Human Gate comparison.", action: "HUMAN_DECISION_REQUIRED" });
    else if (distinguishingEvidence.length) relationships.push({ sourceListingIds: [leftId, rightId], status: "KEEP_SEPARATE", exactSharedImageHashes: [], sharedEvidence, distinguishingEvidence, rationale: "Structured construction evidence differs and no exact shared source binary exists. Preserve two drafts.", action: "DO_NOT_MERGE" });
    else if (sharedEvidence.length >= 2) relationships.push({ sourceListingIds: [leftId, rightId], status: "HUMAN_REVIEW", exactSharedImageHashes: [], sharedEvidence, distinguishingEvidence: [], rationale: "Multiple broad title cues overlap, but there is no shared binary or reliable option metadata. Do not merge automatically.", action: "HUMAN_DECISION_REQUIRED" });
    else relationships.push({ sourceListingIds: [leftId, rightId], status: "KEEP_SEPARATE", exactSharedImageHashes: [], sharedEvidence, distinguishingEvidence: [], rationale: "No combined duplicate or variation evidence exists. Preserve separate drafts rather than infer a relationship from general marketplace similarity.", action: "DO_NOT_MERGE" });
  }
  return relationships;
}

export function roleForArchivePath(path: string): IntakeAsset["role"] { if (path.includes("主图")) return "main"; if (path.includes("SKU 属性图")) return "sku"; if (path.includes("描述图")) return "description"; return "other"; }

export function triageImages(images: IntakeAsset[], notes: ImageReviewNote[] = []): ProductDraft["imageTriage"] {
  const notesByHash = new Map(notes.map((note) => [note.sha256, note]));
  return [...new Map(images.map((image) => [image.sha256, images.filter((candidate) => candidate.sha256 === image.sha256)])).entries()].map(([sha256, references]) => {
    const image = references[0]!;
    const roles = [...new Set(references.map((reference) => reference.role ?? "other"))];
    const note = notesByHash.get(sha256);
    if (note) return { sha256, originalFilename: image.originalFilename, roles, disposition: note.disposition, reason: note.reason };
    if (references.some((reference) => reference.reviewFlags.length)) return { sha256, originalFilename: image.originalFilename, roles, disposition: "CLEANUP_REQUIRED", reason: references.flatMap((reference) => reference.reviewFlags).join(" ") };
    if (roles.includes("main")) return { sha256, originalFilename: image.originalFilename, roles, disposition: "SAFE_SUPPORTING_CANDIDATE", reason: "Main-image source role; visual approval remains separate." };
    if (roles.includes("sku")) return { sha256, originalFilename: image.originalFilename, roles, disposition: "VARIATION_EVIDENCE_ONLY", reason: "SKU-image source role without machine-readable option labels." };
    if (references.length > 1) return { sha256, originalFilename: image.originalFilename, roles, disposition: "DUPLICATE_LINKED", reason: "Exact duplicate retained as source linkage, not a separate cleanup task." };
    return { sha256, originalFilename: image.originalFilename, roles, disposition: "RESEARCH_EVIDENCE_ONLY", reason: "Description-only source evidence; omitted from production selection without follow-up work." };
  });
}

export function buildDraft(intake: ListingIntake): ProductDraft {
  const metadata = intake.sourceMetadata ?? { storeName: null, storefrontUrl: null, listingTitle: null, listingUrl: null };
  const classification = classify(metadata.listingTitle ?? intake.originalZipFilename);
  const decision = intake.humanReviewDecision;
  const suggestedFamily = decision?.acceptedFamily ?? classification.family;
  const conflicts = decision?.acceptedFamily ? [] : classification.conflicts;
  const hashes = intake.images.map((image) => image.sha256);
  const counts = new Map(hashes.map((hash) => [hash, 0])); hashes.forEach((hash) => counts.set(hash, (counts.get(hash) ?? 0) + 1));
  const duplicateGroups = [...counts.values()].filter((count) => count > 1).length;
  const blockers = [
    "No draft or source image may enter the application before a separate approved ProductRecord and production-visual review.",
    "No material, dimensions, colour, size, commercial, or performance claim may be inferred from the archive.",
  ];
  if (!intake.listingId) blockers.push("Listing ID was not found in the original ZIP filename; record the listing URL or ID before approval.");
  if (intake.permissionStatus !== "STORE_LEVEL_PERMISSION_INHERITED") blockers.push("Source provenance is incomplete or the storefront does not match the documented authorized 1688 storefront.");
  if (!intake.images.length) blockers.push("No supported product image was found in the source archive.");
  if (intake.images.some((image) => image.reviewFlags.length)) blockers.push("At least one extracted image requires manual risk review; do not select it automatically.");
  if (intake.sourceReviewFlags?.length) blockers.push("Source listing contains a third-party IP or brand risk indication; do not select or approve it until Human Gate review.");
  if (decision?.disposition === "QUARANTINE_DEFER") blockers.push("Human Decision: QUARANTINE / DEFER. Keep this listing excluded from the approved catalogue unless new independent evidence resolves the exception.");
  const imageTriage = triageImages(intake.images, decision?.imageReviewNotes);
  const candidatePrimaryImages = imageTriage.filter((image) => image.disposition === "SAFE_SUPPORTING_CANDIDATE").slice(0, 6).map((image) => ({ sha256: image.sha256, originalFilename: image.originalFilename, status: "UNAPPROVED" as const, reasons: [image.reason] }));
  const source = metadata.listingUrl ?? metadata.storefrontUrl ?? intake.originalZipFilename;
  const sourceFacts: ProductDraft["sourceFacts"] = [];
  if (metadata.listingTitle) sourceFacts.push({ field: "source_title", value: metadata.listingTitle, status: "CONFIRMED", source });
  if (/55CM/i.test(metadata.listingTitle ?? "")) sourceFacts.push({ field: "length", value: "55 cm (title evidence; confirm before publication)", status: "PENDING_CONFIRMATION", source });
  for (const [field, pattern, value] of [["material", /缎面/, "satin (title evidence)"], ["material", /网纱/, "mesh (title evidence)"], ["style", /蕾丝/, "lace (title/image evidence)"], ["decoration", /蝴蝶结/, "bow (title/image evidence)"], ["age_group", /儿童|女孩/, "kids/girls (title evidence)"], ["color", /黑色/, "black (title/image evidence)"]] as const) if (pattern.test(metadata.listingTitle ?? "")) sourceFacts.push({ field, value, status: field === "material" ? "PENDING_CONFIRMATION" : "CONFIRMED", source });
  const unknownFields = ["composition", "exact colours", "size range", "MOQ", "lead time", "performance claims", "customization fields"];
  const humanGateExceptions = [...conflicts, ...(intake.sourceReviewFlags ?? []), ...(decision?.disposition === "QUARANTINE_DEFER" ? ["Human Decision: QUARANTINE / DEFER. Keep this listing non-publishable and excluded from approved catalogue data."] : []), ...(intake.permissionStatus === "STORE_LEVEL_PERMISSION_INHERITED" ? [] : ["Source provenance exception: storefront, listing URL/ID, or archive provenance is incomplete."]), ...imageTriage.filter((image) => image.disposition === "CLEANUP_REQUIRED").map((image) => `Image cleanup exception: ${image.originalFilename}: ${image.reason}`)];
  const quarantined = decision?.disposition === "QUARANTINE_DEFER" || blockers.some((blocker) => blocker.includes("provenance") || blocker.includes("No supported"));
  return {
    draftId: `draft-${intake.listingId ?? intake.rawArchiveSha256.slice(0, 12)}`,
    sourceListingIds: intake.listingId ? [intake.listingId] : [],
    sourceZipFilenames: [intake.originalZipFilename],
    suggestedFamily,
    suggestedProductName: classification.name,
    familyConfidence: suggestedFamily ? classification.confidence : null,
    classificationReasons: classification.reasons,
    sourceMetadata: metadata,
    sourceFacts,
    unknownFields,
    conflicts,
    imageSummary: { references: intake.images.length, uniqueBinaries: new Set(hashes).size, byRole: intake.images.reduce<Record<string, number>>((out, image) => { const role = image.role ?? "other"; out[role] = (out[role] ?? 0) + 1; return out; }, {}), unsupportedFiles: intake.unsupportedFiles.length },
    candidatePrimaryImages,
    duplicateSummary: { exactDuplicateReferences: hashes.length - new Set(hashes).size, duplicateGroups },
    variationSummary: { skuReferences: intake.images.filter((image) => image.role === "sku").length, uniqueSkuBinaries: new Set(intake.images.filter((image) => image.role === "sku").map((image) => image.sha256)).size, labels: [], status: "EVIDENCE_ONLY" },
    imageTriage,
    humanGate: { classification: decision?.acceptedFamily ? "HUMAN_ACCEPTED" : "PENDING_HUMAN_DECISION", permission: intake.permissionStatus === "STORE_LEVEL_PERMISSION_INHERITED" ? "INHERITED" : "EXCEPTION", variations: decision?.variationDecision ?? "EVIDENCE_ONLY", productionVisuals: "PENDING_PRODUCTION_VISUAL_REVIEW", overall: quarantined ? "QUARANTINED" : "PENDING_REVIEW" },
    humanGateExceptions,
    status: quarantined ? "QUARANTINED" : "PENDING_REVIEW",
    blockers,
    imageAssetHashes: intake.images.map((image) => image.sha256),
    notes: ["Generated draft only. It is not application data and is not eligible for publication."],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateSourcedValue(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value) || !factStatuses.has(value.status as FactStatus) || typeof value.source !== "string" || !value.source.trim()) errors.push(`${path} must carry a known status and non-empty source.`);
}

function validateAsset(value: unknown, path: string, errors: string[]) {
  if (!isRecord(value)) {
    errors.push(`${path} must be an asset reference.`);
    return;
  }
  if (typeof value.assetId !== "string" || !value.assetId.trim()) errors.push(`${path}.assetId is required.`);
  if (!assetRoles.has(value.role as AssetReference["role"])) errors.push(`${path}.role is invalid.`);
  if (value.status !== "CONFIRMED") errors.push(`${path}.status must be CONFIRMED for an approved product.`);
  if (typeof value.source !== "string" || !value.source.trim()) errors.push(`${path}.source must retain provenance.`);
  if (typeof value.path !== "string" || !value.path.startsWith("/products/")) errors.push(`${path}.path must reference an approved product derivative under /products/.`);
  if (!Number.isInteger(value.width) || !Number.isInteger(value.height) || (value.width as number) <= 0 || (value.height as number) <= 0) errors.push(`${path} must include positive intrinsic dimensions.`);
  if (typeof value.altText !== "string" || !value.altText.trim()) errors.push(`${path}.altText is required.`);
}

export function validateApprovedProduct(value: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(value)) return ["Product record must be an object."];
  if (typeof value.id !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(value.id)) errors.push("id must be a stable lowercase ASCII identifier.");
  if (typeof value.productName !== "string" || !value.productName.trim()) errors.push("productName is required.");
  if (!productFamilies.includes(value.productFamily as ProductFamily)) errors.push("productFamily is invalid.");
  if (value.status !== "APPROVED" || !productStatuses.has(value.status as ProductRecord["status"])) errors.push("Only status APPROVED may enter approved catalogue data.");
  if (typeof value.shortDescription !== "string" || !value.shortDescription.trim()) errors.push("shortDescription is required.");
  if (typeof value.altText !== "string" || !value.altText.trim()) errors.push("altText is required.");
  if (typeof value.featured !== "boolean") errors.push("featured is required.");
  if (!Number.isInteger(value.sortOrder)) errors.push("sortOrder must be an integer.");
  validateSourcedValue(value.material, "material", errors);
  if (!Array.isArray(value.customizableFields) || !value.customizableFields.length) errors.push("customizableFields must be a non-empty status-aware list.");
  else value.customizableFields.forEach((entry, index) => validateSourcedValue(entry, `customizableFields[${index}]`, errors));
  if (!isRecord(value.specifications)) errors.push("specifications must be a status-aware map.");
  else Object.entries(value.specifications).forEach(([key, entry]) => validateSourcedValue(entry, `specifications.${key}`, errors));
  if (!Array.isArray(value.images) || !value.images.length) errors.push("images must include at least one approved asset.");
  else value.images.forEach((asset, index) => validateAsset(asset, `images[${index}]`, errors));
  validateAsset(value.thumbnail, "thumbnail", errors);
  const thumbnailId = isRecord(value.thumbnail) ? value.thumbnail.assetId : null;
  if (typeof thumbnailId === "string" && Array.isArray(value.images) && !value.images.some((asset) => isRecord(asset) && asset.assetId === thumbnailId)) errors.push("thumbnail must also appear in images.");
  return errors;
}

export function collectJsonFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectJsonFiles(path) : entry.isFile() && entry.name.endsWith(".json") ? [path] : [];
  });
}

export function relativeToRoot(root: string, path: string): string {
  return relative(resolve(root), resolve(path)).split(sep).join("/");
}

export function isRegularFile(path: string): boolean {
  return existsSync(path) && statSync(path).isFile();
}
