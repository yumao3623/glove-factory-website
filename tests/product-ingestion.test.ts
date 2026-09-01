import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { analyzeCrossListingRelationships, archivePathIsSafe, buildDraft, hasCompleteStorefrontProvenance, listingIdFromFilename, parseSourceMetadata, roleForArchivePath, sourceReviewFlags, triageImages, validateApprovedProduct } from "../lib/product-ingestion";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

test("keeps raw and derived ingestion state outside Git while retaining an explicit approved-data location", () => {
  const gitignore = readFileSync(resolve(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\.product-ingestion\/$/m);
  assert.ok(existsSync(resolve(root, "data/products/approved/.gitkeep")));
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

test("approved records require reviewed product data and approved asset provenance", () => {
  const invalid = validateApprovedProduct({ id: "draft-1", productName: "Draft", productFamily: "bridal-gloves", status: "DRAFT" });
  assert.ok(invalid.some((error) => error.includes("Only status APPROVED")));
  const valid = validateApprovedProduct({
    id: "bg-001",
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
