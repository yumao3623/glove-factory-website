import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repo = process.cwd();
const recordsPath = path.join(repo, "data/products/approved/initial-public-tranche.json");
const manifestPath = path.join(repo, "assets/asset-manifest.json");
const curationPath = path.join(repo, "data/ingestion/w02-public-asset-curation.json");
const publicMediaRoot = path.join(repo, "public/products/media");
const sourceInventoryBaselineCommit = "a2a92128cb3e201de2d9ce6e188569ee456d1a05";

// Explicit, manually reviewed W02 public-image allowlist. Order defines the
// preferred primary image. Prefixes are resolved only within their product and
// must match exactly one immutable source hash.
const selectedSourceHashPrefixes = {
  "opera-gloves-730186552239": ["8e5473f4c02d", "f614c1ef7bec", "83118171d10f", "8bd5c0be1d8e"],
  "kids-dress-gloves-satin-bow-001": ["5f58e6e044d4", "8352aaaedaf0", "cf95540a9e47", "4bc2e163cdb1"],
  "wedding-veils-black-lace-trim-001": ["0cbc108c3d88", "8256dd02868a", "53ffe69ae5ce", "c8042675e03c"],
  "bridal-gloves-sheer-lace-long-001": ["5e05f6cb3090", "5a1e1a90a5bf", "fa20cd3b7720", "4abaae73fda2"],
  "kids-dress-gloves-728772172182": ["a59be1f64ff0", "cb40045ddf02", "5b993176d8ee", "8f1c58879f78"],
  "bridal-gloves-728908046635": ["59a8db8cf24a", "616462d52c82", "011466d4680f", "d29ea500a694"],
  "bridal-gloves-733063602867": ["64d167450b03", "3d6cce56d56a", "5ebcc03efb42", "82462ad59e5f"],
  "bridal-gloves-735814134529": ["28bb5f99feb4", "33042fdcf586", "bcb661e88f3c", "94ce7e160c85"],
  "bridal-gloves-857043957533": ["6771f72d7847", "125ad3e4cae8", "210b6d250e6b", "81fe18770d8f"],
  "bridal-gloves-733010943271": ["6273550406d3", "07955cace4dc", "7eebf0e98f9c", "2f88bd12fcfc"],
  "bridal-gloves-819967426657": ["2fe9020aedac", "01e528923daf", "ec7962191cd0", "4cd736e58a25"],
  "opera-gloves-844530638864": ["f614c1ef7bec", "2840acc4ce83", "443ad0bbe9f0", "87fc26517d8d"],
  "opera-gloves-956309661690": ["cc5277157f3e", "edf04c9da581", "2592187551ff", "e775bd8d051c"],
  "costume-gloves-962080651234": ["34e55a7197c5", "e8c8af5ff5ef"],
  "kids-dress-gloves-1002636896918": ["b2a45ab02160", "1b1028c1b89d", "be54e6567a2b", "65d700dc35e9"],
  "costume-gloves-691557112631": ["f69f0de4884a", "2232f0dd24ff"],
  "opera-gloves-729142545579": ["0e59fb287ad9", "e8c8906212e7", "25c9efb6036f", "5bceb4f5b98d"],
  "opera-gloves-730371444820": ["9d1684abb07e", "a2d6d18be1f8", "50eef4e3e2dc", "bcba1568d3c1"],
  "opera-gloves-satin-short-001": ["812ae1610555", "1d207e4a46f4", "da87ba0813ed", "43929d3a6ec0"],
  "costume-gloves-732732478288": ["a46cb466d74d", "d365a401ac7c", "0496ff8992bd", "1b035d23d5c2"],
  "bridal-gloves-761321664860": ["920fbe201982", "b212b8939ac3", "900b2bc8330d", "59bfcda15425"],
  "bridal-gloves-950693682364": ["394bd6e2b263", "31089a77fecc", "ddc72bf3b498", "0bb46ca96918"],
  "opera-gloves-728194389811": ["631b0e455a43", "6fdb78d0162a", "24c50bc4e0a6", "fedacf16c845"],
  "opera-gloves-728592614367": ["a08e3ec734a5", "f7908efbfe46", "171bba348c18", "66fedae6968d"],
  "opera-gloves-728659873446": ["785e4e9c533d", "90bda5a1f784", "27dc7839a4af", "0574e7b633bc"],
  "bridal-gloves-732419024504": ["7c4a1f8e1992", "17b4da257a52", "ca49e2f7e401", "87ae56173fb2"],
  "bridal-gloves-732561509757": ["c832d4d0aa97", "647541ccf55f", "040e5ba59edc", "9965e6c1ebfa"],
  "opera-gloves-741321749838": ["222cd5627321", "177d7b487a1f", "6a6b2b8cbc91"],
  "bridal-gloves-776820765686": ["fe75cba79a88", "fe2f6992fdba", "74d32022cdc7", "caff064e5d6d"],
  "bridal-gloves-728600712961": ["7053997bff7c", "592060bee85f", "190fa625b5fe", "03dee9907f47"],
  "opera-gloves-732867076935": ["bffbef509f29", "fc89fec9b7fe", "7b071be78d7c", "a7013597034a"],
  "bridal-gloves-733406564887": ["375bb40c303b", "8751ce9e3104", "41e46ddb2048", "986d9b79ac0b"],
  "opera-gloves-741154552428": ["e48e773c5b92", "e89ed2a29e16", "47ccbc857483", "f8998b9bee0a"],
  "kids-dress-gloves-788133828087": ["ab4754e0f620", "ffb387a2cf3b", "961793dfd74c", "40fe95c83d03"],
  "costume-gloves-819969614484": ["f574058f6724", "e531cc2be890", "c95dd646ae5a", "8043c4075995"],
  "bridal-gloves-977246337453": ["7fa03027f6e8", "8245be7555ac"],
};

// These selected originals contain only an own-factory watermark along the
// bottom edge. A non-semantic crop removes that edge without reconstruction.
const safeBottomCropRatios = new Map([
  ["34e55a7197c5", 0.89],
  ["e8c8af5ff5ef", 0.86],
  ["394bd6e2b263", 0.86],
  ["ddc72bf3b498", 0.86],
  ["0bb46ca96918", 0.86],
]);

// This clean flat-lay context image was removed by the first remediation pass;
// retain its immutable W02 metadata so the script remains idempotent.
const retainedFallbacks = {
  "e8c8af5ff5efecea829dd14d3045ba3dfa389ed579fb1d63584f8bc4615448ca": {
    image: {
      assetId: "costume-gloves-962080651234-e8c8af5ff5ef-web",
      role: "context",
      status: "CONFIRMED",
      source: "W02 accepted listing media; source listing 962080651234; SHA-256 e8c8af5ff5efecea829dd14d3045ba3dfa389ed579fb1d63584f8bc4615448ca.",
      path: "/products/media/costume-gloves-962080651234/e8c8af5ff5efecea829dd14d3045ba3dfa389ed579fb1d63584f8bc4615448ca.webp",
      width: 750,
      height: 750,
      altText: "Feather Lace Costume Wrist Cuffs, flat-lay view",
      sourceRoles: ["description"],
      sourceListingIds: ["962080651234"],
    },
    asset: {
      assetId: "costume-gloves-962080651234-e8c8af5ff5ef",
      productId: "costume-gloves-962080651234",
      sourceListingIds: ["962080651234"],
      sourceHash: "e8c8af5ff5efecea829dd14d3045ba3dfa389ed579fb1d63584f8bc4615448ca",
      permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED",
      permissionSource: "Factory-owned 1688 storefront grant for https://jsmeilai.1688.com/",
      visualApprovalStatus: "HUMAN_PRODUCTION_APPROVED",
      visualApprovalSource: "W02 storefront permission retained; Post-W02 public-image curation accepted by Human Review on 2026-09-10.",
      original: {
        path: ".product-ingestion/tranche-1-batch-01/inspection/a2b6cd9bda9cc2e0/亚马逊跨境万圣节羽毛勾指手套派对舞会黑色蕾丝手环袖套配饰黑色_962080651234_images/描述图/描述图_04.jpg",
        width: 750,
        height: 750,
      },
      derivatives: [{
        assetId: "costume-gloves-962080651234-e8c8af5ff5ef-web",
        role: "context",
        sourceRoles: ["description"],
        path: "/products/media/costume-gloves-962080651234/e8c8af5ff5efecea829dd14d3045ba3dfa389ed579fb1d63584f8bc4615448ca.webp",
        width: 750,
        height: 750,
        format: "webp",
        sha256: null,
      }],
    },
  },
};

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
function collectWebp(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? collectWebp(target) : entry.isFile() && entry.name.endsWith(".webp") ? [target] : [];
  });
}

const records = JSON.parse(fs.readFileSync(recordsPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const baselineManifest = JSON.parse(execFileSync("git", ["show", `${sourceInventoryBaselineCommit}:assets/asset-manifest.json`], {
  cwd: repo,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
}));
const baselineAssets = baselineManifest.productionAssets ?? [];
const baselineOriginalFailures = baselineAssets.flatMap((asset) => {
  const originalPath = path.join(repo, asset.original.path);
  if (!fs.existsSync(originalPath)) return [{ assetId: asset.assetId, reason: "missing" }];
  return sha256(originalPath) === asset.sourceHash ? [] : [{ assetId: asset.assetId, reason: "hash-mismatch" }];
});
if (baselineAssets.length !== 601 || baselineOriginalFailures.length) {
  throw new Error(`W02 baseline source inventory failed: ${baselineAssets.length} assets and ${baselineOriginalFailures.length} original-file failures.`);
}
const assetByDerivativeId = new Map(
  manifest.productionAssets.flatMap((asset) => asset.derivatives.map((derivative) => [derivative.assetId, asset])),
);
for (const fallback of Object.values(retainedFallbacks)) assetByDerivativeId.set(fallback.image.assetId, fallback.asset);

if (records.length !== 36 || Object.keys(selectedSourceHashPrefixes).length !== 36) {
  throw new Error("W02 remediation requires exactly 36 approved records and 36 curated product entries.");
}

const nextProductionAssets = [];
const selectedSourceHashesByProduct = {};
const safeEdgeCrops = [];

for (const record of records) {
  const prefixes = selectedSourceHashPrefixes[record.id];
  if (!prefixes) throw new Error(`Missing curation entry for ${record.id}`);
  const sourceImages = record.images.filter((image) => image.role !== "thumbnail");
  for (const fallback of Object.values(retainedFallbacks)) {
    if (fallback.asset.productId === record.id && !sourceImages.some((image) => image.assetId === fallback.image.assetId)) sourceImages.push(structuredClone(fallback.image));
  }
  const selectedImages = prefixes.map((prefix) => {
    const matches = sourceImages.filter((image) => assetByDerivativeId.get(image.assetId)?.sourceHash.startsWith(prefix));
    if (matches.length !== 1) throw new Error(`${record.id}: ${prefix} matched ${matches.length} source images.`);
    return structuredClone(matches[0]);
  });
  selectedSourceHashesByProduct[record.id] = selectedImages.map((image) => assetByDerivativeId.get(image.assetId)?.sourceHash);
  if (selectedSourceHashesByProduct[record.id].some((sourceHash) => !sourceHash)) {
    throw new Error(`${record.id}: selected source hash is missing from the production manifest.`);
  }

  for (let index = 0; index < selectedImages.length; index += 1) {
    const image = selectedImages[index];
    const asset = structuredClone(assetByDerivativeId.get(image.assetId));
    if (!asset) throw new Error(`${record.id}: missing production asset for ${image.assetId}`);
    const derivative = asset.derivatives.find((candidate) => candidate.assetId === image.assetId);
    if (!derivative) throw new Error(`${record.id}: missing derivative ${image.assetId}`);
    const sourceHash = asset.sourceHash;

    const retainedHeightRatio = safeBottomCropRatios.get(sourceHash.slice(0, 12));
    if (retainedHeightRatio) {
      derivative.path = `/products/media/${record.id}/${sourceHash}-crop-v1.webp`;
      image.path = derivative.path;
      const outputPath = path.join(repo, "public", derivative.path.slice(1));
      const originalPath = path.join(repo, asset.original.path);
      const resized = await sharp(originalPath)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer({ resolveWithObject: true });
      const croppedHeight = Math.floor(resized.info.height * retainedHeightRatio);
      const transformed = await sharp(resized.data)
        .extract({ left: 0, top: 0, width: resized.info.width, height: croppedHeight })
        .webp({ quality: 82 })
        .toFile(outputPath);
      derivative.width = transformed.width;
      derivative.height = transformed.height;
      derivative.sha256 = sha256(outputPath);
      derivative.processing = {
        operation: "safe-edge-crop",
        removedEdge: "bottom",
        retainedHeightRatio,
        reason: "Remove the own-factory watermark without altering the product or reconstructing pixels.",
      };
      safeEdgeCrops.push({ productId: record.id, sourceHash, derivativePath: derivative.path });
    }

    const role = index === 0 ? "primary" : "detail";
    image.role = role;
    image.width = derivative.width;
    image.height = derivative.height;
    derivative.role = role;
    asset.visualApprovalSource = "W02 storefront permission retained; Post-W02 public-image curation accepted by Human Review on 2026-09-10.";
    nextProductionAssets.push(asset);
  }

  const primaryImage = selectedImages[0];
  const primaryAsset = nextProductionAssets.find((asset) => asset.productId === record.id && asset.derivatives.some((derivative) => derivative.assetId === primaryImage.assetId));
  const primaryDerivative = primaryAsset?.derivatives.find((derivative) => derivative.assetId === primaryImage.assetId);
  if (!primaryAsset || !primaryDerivative) throw new Error(`${record.id}: curated primary derivative is missing.`);
  const primaryHash = primaryAsset.sourceHash;
  const primaryPath = path.join(repo, "public", primaryDerivative.path.slice(1));
  const primaryStem = path.basename(primaryDerivative.path, ".webp");
  const thumbRelativePath = `/products/media/${record.id}/${primaryStem}-thumb.webp`;
  const thumbPath = path.join(repo, "public", thumbRelativePath.slice(1));
  const thumb = await sharp(primaryPath)
    .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(thumbPath);
  const thumbAssetId = `${record.id}-${primaryHash.slice(0, 12)}-thumb`;
  const thumbnail = {
    assetId: thumbAssetId,
    role: "thumbnail",
    status: "CONFIRMED",
    source: `Post-W02 curated thumbnail derived from approved source ${primaryHash}.`,
    path: thumbRelativePath,
    width: thumb.width,
    height: thumb.height,
    altText: `${record.productName}, primary view`,
  };
  nextProductionAssets.push({
    assetId: thumbAssetId,
    productId: record.id,
    sourceListingIds: primaryAsset.sourceListingIds,
    sourceHash: primaryHash,
    permissionStatus: primaryAsset.permissionStatus,
    permissionSource: primaryAsset.permissionSource,
    visualApprovalStatus: primaryAsset.visualApprovalStatus,
    visualApprovalSource: "Post-W02 thumbnail derived from the curated approved primary image; accepted by Human Review on 2026-09-10.",
    original: primaryAsset.original,
    derivatives: [{
      assetId: thumbAssetId,
      role: "thumbnail",
      path: thumbRelativePath,
      width: thumb.width,
      height: thumb.height,
      format: "webp",
      sha256: sha256(thumbPath),
    }],
  });

  record.images = [...selectedImages, thumbnail];
  record.thumbnail = thumbnail;
  record.altText = selectedImages[0].altText;
}

manifest.productionAssets = nextProductionAssets;
manifest.postW02PublicCuration = {
  schema: "w02-public-asset-curation/v1",
  status: "HUMAN_REVIEW_ACCEPTED",
  reviewedOn: "2026-09-10",
  policy: "Product-forward images only; reject promotional posters, marketplace/store UI, price/specification panels, unsupported claims, third-party branding and unrelated packaging. Prefer clean studio or model views and limit each product to a concise gallery.",
  selectedProductCount: records.length,
  selectedGalleryImageCount: records.reduce((total, record) => total + record.images.filter((image) => image.role !== "thumbnail").length, 0),
  thumbnailCount: records.length,
  safeEdgeCropCount: safeEdgeCrops.length,
  sourceInventoryBaseline: {
    manifestCommit: sourceInventoryBaselineCommit,
    productionAssetCount: baselineAssets.length,
    galleryDerivativeCount: baselineAssets.flatMap((asset) => asset.derivatives ?? []).filter((derivative) => derivative.role !== "thumbnail").length,
    thumbnailDerivativeCount: baselineAssets.flatMap((asset) => asset.derivatives ?? []).filter((derivative) => derivative.role === "thumbnail").length,
    uniqueSourceHashCount: new Set(baselineAssets.map((asset) => asset.sourceHash)).size,
    originalFilesPresent: baselineAssets.length,
    originalHashMismatchCount: baselineOriginalFailures.length,
    preservationBoundary: "All baseline originals remain in the Git-ignored .product-ingestion workspace; only the curated production derivatives remain public.",
  },
};

const curation = {
  schema: "w02-public-asset-curation/v1",
  status: "HUMAN_REVIEW_ACCEPTED",
  checkpoint: "Post-W02 approved-data and product-preview integration handoff — visual asset remediation",
  reviewedOn: "2026-09-10",
  sourceBoundary: "The 36 W02-approved ProductRecords derived from 39 approved source listings; no W03 products are included.",
  selectionPolicy: manifest.postW02PublicCuration.policy,
  selectedSourceHashesByProduct,
  safeEdgeCrops,
  sourceInventoryBaseline: manifest.postW02PublicCuration.sourceInventoryBaseline,
};

fs.writeFileSync(recordsPath, `${JSON.stringify(records, null, 2)}\n`);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(curationPath, `${JSON.stringify(curation, null, 2)}\n`);

const keptPublicPaths = new Set(nextProductionAssets.flatMap((asset) => asset.derivatives.map((derivative) => path.join(repo, "public", derivative.path.slice(1)))));
const removedPublicFiles = [];
for (const file of collectWebp(publicMediaRoot)) {
  if (!keptPublicPaths.has(file)) {
    fs.rmSync(file);
    removedPublicFiles.push(path.relative(repo, file));
  }
}

console.log(JSON.stringify({
  products: records.length,
  galleryImages: manifest.postW02PublicCuration.selectedGalleryImageCount,
  thumbnails: records.length,
  safeEdgeCrops: safeEdgeCrops.length,
  removedPublicFiles: removedPublicFiles.length,
}, null, 2));
