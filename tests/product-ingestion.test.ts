import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeCrossBatchRelationships, analyzeCrossListingRelationships, archivePathIsSafe, buildDraft, buildListingRelationshipFingerprint, hasCompleteStorefrontProvenance, listingIdFromFilename, listingRegistryConflicts, parseSourceMetadata, roleForArchivePath, sourceReviewFlags, triageImages, validateApprovedCatalogue, validateApprovedProduct } from "../lib/product-ingestion";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("keeps raw and derived ingestion state outside Git while retaining an explicit approved-data location", () => {
  const gitignore = readFileSync(resolve(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\.product-ingestion\/$/m);
  assert.ok(existsSync(resolve(root, "data/products/approved/.gitkeep")));
});

test("keeps a durable cumulative registry for the reviewed real listings", () => {
  const registry = JSON.parse(readFileSync(resolve(root, "data/ingestion/listing-registry.json"), "utf8")) as { schema: string; entries: Array<{ listingId: string; rawArchiveSha256: string; batch: string; normalizedDraftId: string; normalizedProductFamily: string | null; normalizedProductGroupId?: string; familyDecision: string; status: string }> };
  assert.equal(registry.schema, "product-listing-registry/v1");
  assert.ok(registry.entries.length >= 24);
  assert.equal(new Set(registry.entries.map((entry) => entry.listingId)).size, registry.entries.length);
  assert.equal(registry.entries.find((entry) => entry.listingId === "776815144156")?.status, "QUARANTINED");
  assert.equal(registry.entries.find((entry) => entry.listingId === "728772172182")?.status, "PENDING_REVIEW");
  assert.equal(registry.entries.find((entry) => entry.listingId === "730186552239")?.familyDecision, "ACCEPTED");
  assert.equal(registry.entries.find((entry) => entry.listingId === "730186552239")?.normalizedProductFamily, "opera-gloves");
  assert.equal(registry.entries.find((entry) => entry.listingId === "737751870967")?.normalizedProductGroupId, "kids-dress-gloves-group-737751870967");
  assert.equal(registry.entries.find((entry) => entry.listingId === "814984964565")?.normalizedProductGroupId, "kids-dress-gloves-group-737751870967");
  assert.ok(registry.entries.every((entry) => entry.normalizedDraftId.startsWith("draft-")));
  assert.ok(registry.entries.every((entry) => /^\d{6,}$/.test(entry.listingId) && /^[a-f0-9]{64}$/.test(entry.rawArchiveSha256)));
});

test("keeps cross-batch relationship fingerprints recoverable without raw binaries", () => {
  const fingerprints = JSON.parse(readFileSync(resolve(root, "data/ingestion/listing-relationship-fingerprints.json"), "utf8")) as { schema: string; entries: Array<{ listingId: string; batch: string; rawArchiveSha256: string; imageSha256s: string[]; imageReferenceCounts: Record<string, number> }> };
  assert.equal(fingerprints.schema, "product-listing-relationship-fingerprints/v1");
  assert.ok(fingerprints.entries.length >= 24);
  assert.equal(new Set(fingerprints.entries.map((entry) => entry.listingId)).size, fingerprints.entries.length);
  assert.ok(fingerprints.entries.every((entry) => /^\d{6,}$/.test(entry.listingId) && /^[a-f0-9]{64}$/.test(entry.rawArchiveSha256) && entry.imageSha256s.length > 0));
  assert.ok(fingerprints.entries.every((entry) => Object.values(entry.imageReferenceCounts).every((count) => Number.isInteger(count) && count > 0)));
  assert.equal(JSON.stringify(fingerprints).includes("rawImageBytes"), false);
});

test("exports the reviewed batch relationship decisions without public catalogue data", () => {
  const review = JSON.parse(readFileSync(resolve(root, "data/ingestion/batch-reviews/tranche-1-batch-01/cross-batch-analysis.json"), "utf8")) as { relationshipCount: number; humanDecisionCount: number; automaticMerges: number; relationships: Array<{ sourceListingIds: string[]; humanDecision?: string; relationshipLabel?: string; normalizedProductGroupId?: string; action: string }> };
  assert.equal(review.relationshipCount, 4);
  assert.equal(review.humanDecisionCount, 4);
  assert.equal(review.automaticMerges, 0);
  assert.equal(review.relationships.find((relationship) => relationship.sourceListingIds.includes("814984964565"))?.humanDecision, "SAME_PRODUCT_DIFFERENT_LISTING");
  assert.equal(review.relationships.find((relationship) => relationship.sourceListingIds.includes("814984964565"))?.relationshipLabel, "DUPLICATE_MARKETPLACE_PRESENTATION");
  assert.equal(review.relationships.find((relationship) => relationship.sourceListingIds.includes("814984964565"))?.normalizedProductGroupId, "kids-dress-gloves-group-737751870967");
  assert.ok(review.relationships.filter((relationship) => relationship.humanDecision === "POSSIBLE_VARIATION").every((relationship) => relationship.action === "DO_NOT_MERGE"));
  assert.equal(existsSync(resolve(root, "data/products/approved/.gitkeep")), true);
});

test("records the completed tranche-2 batch-02 Human Gate without publishing catalogue data", () => {
  const registry = JSON.parse(readFileSync(resolve(root, "data/ingestion/listing-registry.json"), "utf8")) as { entries: Array<{ listingId: string; normalizedProductFamily: string | null; familyDecision: string; humanGateClassification: string; status: string; normalizedProductGroupId?: string }> };
  const batchIds = ["775921736857", "728194389811", "728592614367", "732561509757", "776820765686", "728659873446", "732419024504", "741321749838"];
  const batchEntries = registry.entries.filter((entry) => batchIds.includes(entry.listingId));
  assert.equal(batchEntries.length, 8);
  assert.ok(batchEntries.every((entry) => entry.familyDecision === "ACCEPTED" && entry.humanGateClassification === "HUMAN_ACCEPTED" && entry.status === "PENDING_REVIEW"));
  assert.deepEqual(Object.fromEntries(batchEntries.map((entry) => [entry.listingId, entry.normalizedProductFamily])), {
    "775921736857": "kids-dress-gloves",
    "728194389811": "opera-gloves",
    "728592614367": "opera-gloves",
    "732561509757": "bridal-gloves",
    "776820765686": "bridal-gloves",
    "728659873446": "opera-gloves",
    "732419024504": "bridal-gloves",
    "741321749838": "opera-gloves",
  });
  assert.deepEqual(registry.entries.filter((entry) => entry.normalizedProductGroupId === "kids-dress-gloves-group-737751870967").map((entry) => entry.listingId).sort(), ["737751870967", "775921736857", "814984964565"]);

  const review = JSON.parse(readFileSync(resolve(root, "data/ingestion/batch-reviews/tranche-2-batch-02/cross-batch-analysis.json"), "utf8")) as { relationshipCount: number; humanDecisionCount: number; automaticMerges: number; relationships: Array<{ sourceListingIds: string[]; humanDecision?: string; normalizedProductGroupId?: string; action: string }> };
  assert.equal(review.relationshipCount, 8);
  assert.equal(review.humanDecisionCount, 8);
  assert.equal(review.automaticMerges, 0);
  assert.equal(review.relationships.filter((relationship) => relationship.humanDecision === "SAME_PRODUCT_DIFFERENT_LISTING").length, 2);
  assert.ok(review.relationships.filter((relationship) => relationship.humanDecision === "SAME_PRODUCT_DIFFERENT_LISTING").every((relationship) => relationship.normalizedProductGroupId === "kids-dress-gloves-group-737751870967" && relationship.action === "DO_NOT_MERGE"));
  assert.ok(review.relationships.filter((relationship) => relationship.humanDecision === "KEEP_SEPARATE").every((relationship) => relationship.action === "DO_NOT_MERGE"));
});

test("records completed tranche-2 batch-01 Human Gates without unresolved review counts", () => {
  const summary = JSON.parse(readFileSync(resolve(root, "data/ingestion/batch-reviews/tranche-2-batch-01/review-summary.json"), "utf8")) as { crossListingHumanReviewCount: number; crossListingHumanDecisionCount: number; crossBatchHumanReviewCount: number; crossBatchHumanDecisionCount: number; automaticMerges: number };
  const review = JSON.parse(readFileSync(resolve(root, "data/ingestion/batch-reviews/tranche-2-batch-01/cross-listing-analysis.json"), "utf8")) as { humanDecisionCount: number };

  assert.equal(summary.crossListingHumanReviewCount, 0);
  assert.equal(summary.crossListingHumanDecisionCount, review.humanDecisionCount);
  assert.equal(summary.crossBatchHumanReviewCount, 0);
  assert.equal(summary.crossBatchHumanDecisionCount, 8);
  assert.equal(summary.automaticMerges, 0);
});

test("blocks a listing ID or archive hash reused by a different batch", () => {
  const entries = [{ listingId: "123456", batch: "pilot-old", rawArchiveSha256: "a".repeat(64) }];
  assert.equal(listingRegistryConflicts(entries, "pilot-new", "123456", "b".repeat(64)).length, 1);
  assert.equal(listingRegistryConflicts(entries, "pilot-new", "999999", "a".repeat(64)).length, 1);
  assert.equal(listingRegistryConflicts(entries, "pilot-old", "123456", "a".repeat(64)).length, 0);
});

test("rejects unsafe ZIP paths and retains the source listing identifier from an original filename", () => {
  assert.equal(archivePathIsSafe("images/front.jpg"), true);
  assert.equal(archivePathIsSafe("../outside.jpg"), false);
  assert.equal(archivePathIsSafe("C:/outside.jpg"), false);
  assert.equal(listingIdFromFilename("加长缎面礼服手套_814978872980_images.zip"), "814978872980");
});

test("drafts remain review-only even when an archive matches the authorized storefront", () => {
  const draft = buildDraft({
    listingId: "814978872980",
    originalZipFilename: "加长缎面礼服手套_814978872980_images.zip",
    rawArchiveSha256: "a".repeat(64),
    sourceStorefront: "https://jsmeilai.1688.com/",
    permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
    images: [{ originalFilename: "front.jpg", archivePath: "front.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [] }],
    metadataFiles: [],
    unsupportedFiles: [],
  });
  assert.equal(draft.status, "PENDING_REVIEW");
  assert.equal(draft.suggestedFamily, "opera-gloves");
  assert.equal(draft.suggestedProductName, "Long satin formal gloves");
  assert.equal(draft.humanGate.permission, "INHERITED");
  assert.equal(draft.humanGate.overall, "PENDING_REVIEW");
});

test("retains source metadata, image roles, and a conservative frozen-family suggestion", () => {
  const metadata = parseSourceMetadata("店铺名称:\n江山市美来服饰厂\nhttps://jsmeilai.1688.com/?offerId=730186552239\n\n商品标题:\n夏季55CM加长款缎面光滑手套女舞会晚宴礼服\n商品链接:\nhttps://detail.1688.com/offer/730186552239.html");
  const draft = buildDraft({ listingId: "730186552239", originalZipFilename: "test_730186552239_images.zip", rawArchiveSha256: "a".repeat(64), sourceStorefront: "https://jsmeilai.1688.com/", permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", sourceMetadata: metadata, images: [{ originalFilename: "主图_01.jpg", archivePath: "listing/主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: roleForArchivePath("listing/主图/主图_01.jpg") }], metadataFiles: [], unsupportedFiles: [] });
  assert.equal(metadata.listingTitle, "夏季55CM加长款缎面光滑手套女舞会晚宴礼服");
  assert.equal(draft.suggestedFamily, "opera-gloves");
  assert.equal(draft.status, "PENDING_REVIEW");
  assert.equal(draft.candidatePrimaryImages[0]?.status, "UNAPPROVED");
});

test("inherits store-level permission only from complete storefront and listing provenance", () => {
  const metadata = parseSourceMetadata("店铺名称:\n江山市美来服饰厂\nhttps://jsmeilai.1688.com/?offerId=730186552239\n\n商品标题:\n夏季55CM加长款缎面光滑手套女舞会晚宴礼服\n商品链接:\nhttps://detail.1688.com/offer/730186552239.html");
  assert.equal(hasCompleteStorefrontProvenance("730186552239", "a".repeat(64), metadata, "https://jsmeilai.1688.com/"), true);
  assert.equal(hasCompleteStorefrontProvenance("730186552239", "not-a-hash", metadata, "https://jsmeilai.1688.com/"), false);
  assert.equal(hasCompleteStorefrontProvenance("730186552239", "a".repeat(64), { ...metadata, listingUrl: "https://detail.1688.com/offer/999999999999.html" }, "https://jsmeilai.1688.com/"), false);
});

test("keeps description evidence and own-brand visual notes outside the cleanup queue", () => {
  const triage = triageImages([
    { originalFilename: "描述图_01.jpg", archivePath: "描述图/描述图_01.jpg", sha256: "a".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "description" },
    { originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" },
  ], [{ sha256: "b".repeat(64), disposition: "NON_PREFERRED_PRODUCTION", reason: "Own factory brand text; use a clean sibling when available." }]);
  assert.equal(triage[0]?.disposition, "RESEARCH_EVIDENCE_ONLY");
  assert.equal(triage[1]?.disposition, "NON_PREFERRED_PRODUCTION");
  assert.equal(triage.some((image) => image.disposition === "CLEANUP_REQUIRED"), false);
});

test("an accepted family clears marketplace-wording conflicts but does not approve the draft", () => {
  const draft = buildDraft({
    listingId: "856992679458",
    originalZipFilename: "test_856992679458_images.zip",
    rawArchiveSha256: "a".repeat(64),
    sourceStorefront: "https://jsmeilai.1688.com/",
    permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
    sourceMetadata: { storeName: "江山市美来服饰厂", storefrontUrl: "https://jsmeilai.1688.com/?offerId=856992679458", listingTitle: "黑色万圣节长款网纱手套婚纱礼服蕾丝袖套女", listingUrl: "https://detail.1688.com/offer/856992679458.html" },
    humanReviewDecision: { listingId: "856992679458", acceptedFamily: "bridal-gloves", variationDecision: "ONE_NORMALIZED_DRAFT_VARIATION_DETAILS_PENDING" },
    images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }],
    metadataFiles: [],
    unsupportedFiles: [],
  });
  assert.deepEqual(draft.conflicts, []);
  assert.equal(draft.humanGate.classification, "HUMAN_ACCEPTED");
  assert.equal(draft.humanGate.variations, "ONE_NORMALIZED_DRAFT_VARIATION_DETAILS_PENDING");
  assert.equal(draft.status, "PENDING_REVIEW");
});

test("source-title character or brand references become a listing-level Human Gate exception", () => {
  const metadata = { storeName: "江山市美来服饰厂", storefrontUrl: "https://jsmeilai.1688.com/?offerId=776815144156", listingTitle: "跨境欧美热卖印花冰雪艾莎儿童舞台表演色丁手套", listingUrl: "https://detail.1688.com/offer/776815144156.html" };
  const draft = buildDraft({ listingId: "776815144156", originalZipFilename: "test_776815144156_images.zip", rawArchiveSha256: "a".repeat(64), sourceStorefront: "https://jsmeilai.1688.com/", permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", sourceMetadata: metadata, sourceReviewFlags: sourceReviewFlags(metadata), images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }], metadataFiles: [], unsupportedFiles: [] });
  assert.equal(draft.humanGate.permission, "INHERITED");
  assert.ok(draft.humanGateExceptions.some((exception) => exception.includes("THIRD_PARTY_IP_RISK")));
  assert.equal(draft.imageTriage.some((image) => image.disposition === "CLEANUP_REQUIRED"), false);
});

test("a Human quarantine/defer decision excludes a draft without changing source permission", () => {
  const draft = buildDraft({ listingId: "776815144156", originalZipFilename: "test_776815144156_images.zip", rawArchiveSha256: "a".repeat(64), sourceStorefront: "https://jsmeilai.1688.com/", permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: "印花冰雪艾莎儿童色丁手套", listingUrl: "https://detail.1688.com/offer/776815144156.html" }, sourceReviewFlags: ["THIRD_PARTY_IP_RISK"], humanReviewDecision: { listingId: "776815144156", disposition: "QUARANTINE_DEFER" }, images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }], metadataFiles: [], unsupportedFiles: [] });
  assert.equal(draft.status, "QUARANTINED");
  assert.equal(draft.humanGate.permission, "INHERITED");
  assert.ok(draft.humanGateExceptions.some((exception) => exception.includes("QUARANTINE / DEFER")));
});

test("cross-listing analysis never merges drafts and treats exact shared binaries as possible duplicates", () => {
  const draft = (listingId: string, title: string, hash: string) => buildDraft({ listingId, originalZipFilename: `test_${listingId}_images.zip`, rawArchiveSha256: "a".repeat(64), sourceStorefront: "https://jsmeilai.1688.com/", permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: title, listingUrl: `https://detail.1688.com/offer/${listingId}.html` }, images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: hash, bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }], metadataFiles: [], unsupportedFiles: [] });
  const [relationship] = analyzeCrossListingRelationships([draft("111111", "长款缎面手套", "b".repeat(64)), draft("222222", "长款缎面手套", "b".repeat(64))]);
  assert.equal(relationship?.status, "POSSIBLE_DUPLICATE");
  assert.equal(relationship?.action, "HUMAN_DECISION_REQUIRED");
});

test("cross-listing analysis preserves different constructions as separate drafts", () => {
  const draft = (listingId: string, title: string) => buildDraft({ listingId, originalZipFilename: `test_${listingId}_images.zip`, rawArchiveSha256: "a".repeat(64), sourceStorefront: "https://jsmeilai.1688.com/", permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: title, listingUrl: `https://detail.1688.com/offer/${listingId}.html` }, images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: listingId.padEnd(64, "a"), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }], metadataFiles: [], unsupportedFiles: [] });
  const [relationship] = analyzeCrossListingRelationships([draft("111111", "长款褶皱色丁包指手套",), draft("222222", "长款勾指色丁露指袖套")]);
  assert.equal(relationship?.status, "KEEP_SEPARATE");
  assert.equal(relationship?.action, "DO_NOT_MERGE");
});

test("cross-batch fingerprints retain lightweight hash and reference evidence", () => {
  const draft = buildDraft({
    listingId: "814984964565",
    originalZipFilename: "test_814984964565_images.zip",
    rawArchiveSha256: "a".repeat(64),
    sourceStorefront: "https://jsmeilai.1688.com/",
    permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
    sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: "儿童缎面蝴蝶结长款手套", listingUrl: "https://detail.1688.com/offer/814984964565.html" },
    images: [
      { originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" },
      { originalFilename: "主图_02.jpg", archivePath: "主图/主图_02.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" },
      { originalFilename: "SKU_01.jpg", archivePath: "SKU/SKU_01.jpg", sha256: "c".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "sku" },
    ],
    metadataFiles: [],
    unsupportedFiles: [],
  });
  const fingerprint = buildListingRelationshipFingerprint(draft, "tranche-test", "d".repeat(64));
  assert.deepEqual(fingerprint.imageSha256s, ["b".repeat(64), "c".repeat(64)]);
  assert.equal(fingerprint.imageReferenceCounts["b".repeat(64)], 2);
  assert.deepEqual(fingerprint.skuImageSha256s, ["c".repeat(64)]);
  assert.equal(fingerprint.skuImageReferenceCounts["c".repeat(64)], 1);
  assert.equal(buildListingRelationshipFingerprint(draft, "tranche-test", "d".repeat(64), "kids-dress-gloves").normalizedProductFamily, "kids-dress-gloves");
});

test("cross-batch analysis reports exact evidence without merging listings", () => {
  const draft = buildDraft({
    listingId: "814984964565",
    originalZipFilename: "test_814984964565_images.zip",
    rawArchiveSha256: "a".repeat(64),
    sourceStorefront: "https://jsmeilai.1688.com/",
    permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
    sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: "儿童缎面蝴蝶结长款手套", listingUrl: "https://detail.1688.com/offer/814984964565.html" },
    images: [{ originalFilename: "SKU_01.jpg", archivePath: "SKU/SKU_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "sku" }],
    metadataFiles: [],
    unsupportedFiles: [],
  });
  const historical = { listingId: "737751870967", batch: "pilot-2026-09-01", rawArchiveSha256: "c".repeat(64), normalizedDraftId: "draft-737751870967", normalizedProductFamily: "kids-dress-gloves" as const, sourceTitle: "儿童缎面蝴蝶结长款手套", imageSha256s: ["b".repeat(64)], skuImageSha256s: ["b".repeat(64)], imageReferenceCounts: { ["b".repeat(64)]: 1 }, skuImageReferenceCounts: { ["b".repeat(64)]: 1 } };
  const [relationship] = analyzeCrossBatchRelationships([draft], [historical]);
  assert.equal(relationship?.status, "POSSIBLE_VARIATION");
  assert.equal(relationship?.recommendation, "SAME_PRODUCT_WITH_DIFFERENT_VARIATION_SET");
  assert.deepEqual(relationship?.exactSharedImageHashes, ["b".repeat(64)]);
  assert.equal(relationship?.action, "HUMAN_DECISION_REQUIRED");
});

test("cross-batch comparisons can exclude fingerprints from the current batch", () => {
  const draft = buildDraft({
    listingId: "111111",
    originalZipFilename: "test_111111_images.zip",
    rawArchiveSha256: "a".repeat(64),
    sourceStorefront: "https://jsmeilai.1688.com/",
    permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
    sourceMetadata: { storeName: null, storefrontUrl: "https://jsmeilai.1688.com/", listingTitle: "长款缎面手套", listingUrl: "https://detail.1688.com/offer/111111.html" },
    images: [{ originalFilename: "主图_01.jpg", archivePath: "主图/主图_01.jpg", sha256: "b".repeat(64), bytes: 128, extension: ".jpg", reviewFlags: [], role: "main" }],
    metadataFiles: [],
    unsupportedFiles: [],
  });
  const sameBatch = { listingId: "111111", batch: "tranche-test", rawArchiveSha256: "c".repeat(64), normalizedDraftId: "draft-111111", normalizedProductFamily: "opera-gloves" as const, sourceTitle: "长款缎面手套", imageSha256s: ["b".repeat(64)], skuImageSha256s: [], imageReferenceCounts: { ["b".repeat(64)]: 1 }, skuImageReferenceCounts: {} };
  const otherBatch = { ...sameBatch, listingId: "222222", batch: "pilot-old" };
  const current = [sameBatch, otherBatch].filter((fingerprint) => fingerprint.batch !== "tranche-test");
  const relationships = analyzeCrossBatchRelationships([draft], current);
  assert.deepEqual(relationships.map((relationship) => relationship.sourceListingIds), [["111111", "222222"]]);
});

test("approved records require reviewed product data and approved asset provenance", () => {
  const invalid = validateApprovedProduct({ id: "draft-1", productName: "Draft", productFamily: "bridal-gloves", status: "DRAFT" });
  assert.ok(invalid.some((error) => error.includes("Only status APPROVED")));
  const valid = validateApprovedProduct({
    id: "bg-001",
    provenance: { normalizedProductGroupId: "bridal-gloves-group-001", sourceListingIds: ["814978872980"] },
    productName: "Long lace bridal glove",
    productFamily: "bridal-gloves",
    material: { value: null, status: "UNKNOWN", source: "Listing evidence reviewed 2026-09-01" },
    customizableFields: [{ field: "pattern", value: null, status: "PENDING_CONFIRMATION", source: "Not yet confirmed" }],
    images: [{ assetId: "bg-001-front", role: "primary", status: "CONFIRMED", source: "1688 listing 814978872980; archive and image hash in intake ledger", path: "/products/bridal-gloves/bg-001/front.webp", width: 800, height: 1000, altText: "Long lace bridal glove, front view" }],
    thumbnail: { assetId: "bg-001-front", role: "thumbnail", status: "CONFIRMED", source: "1688 listing 814978872980; archive and image hash in intake ledger", path: "/products/bridal-gloves/bg-001/front.webp", width: 800, height: 1000, altText: "Long lace bridal glove, front view" },
    shortDescription: "A reviewed bridal glove style for catalogue consideration.",
    specifications: { material: { value: null, status: "UNKNOWN", source: "Not yet confirmed" } },
    featured: false,
    sortOrder: 1,
    status: "APPROVED",
    altText: "Long lace bridal glove, front view",
  });
  assert.deepEqual(valid, []);
});

test("initial public tranche keeps exactly four approved records in a registry and asset-manifest closed loop", () => {
  const records = JSON.parse(readFileSync(resolve(root, "data/products/approved/initial-public-tranche.json"), "utf8"));
  const registry = JSON.parse(readFileSync(resolve(root, "data/ingestion/listing-registry.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(resolve(root, "assets/asset-manifest.json"), "utf8"));
  const fingerprints = readFileSync(resolve(root, "data/ingestion/listing-relationship-fingerprints.json"), "utf8");
  assert.equal(records.length, 4);
  assert.deepEqual(records.map((record: { id: string }) => record.id), ["kids-dress-gloves-satin-bow-001", "bridal-gloves-sheer-lace-long-001", "opera-gloves-satin-short-001", "wedding-veils-black-lace-trim-001"]);
  assert.equal(new Set(records.map((record: { id: string }) => record.id)).size, 4);
  assert.equal(records.find((record: { id: string }) => record.id === "bridal-gloves-sheer-lace-long-001")?.provenance.normalizedProductGroupId, undefined);
  assert.equal(records.find((record: { id: string }) => record.id === "wedding-veils-black-lace-trim-001")?.provenance.normalizedProductGroupId, undefined);
  assert.equal(records.find((record: { id: string }) => record.id === "wedding-veils-black-lace-trim-001")?.images.length, 4);
  assert.deepEqual(validateApprovedCatalogue(records, { registryEntries: registry.entries, productionAssets: manifest.productionAssets, durableEvidenceText: fingerprints }), []);
  const productionSources = manifest.productionAssets.map((asset: { sourceHash: string }) => asset.sourceHash);
  assert.ok(!productionSources.includes("fc01e4e85a76f46680b54ade4b697dba7d7c866642f5692d01359f4810d09ea1"));
  assert.ok(!productionSources.includes("97d37bfcc74e37dcc19119f0149fbc5820eb4491c31cc71d9314c0046f0946e8"));
  assert.ok(!productionSources.includes("d482486585ca19e1e0077a33ef0c4bfc76e945e79331fde5f0343bc271c88caa"));
});
