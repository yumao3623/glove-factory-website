import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repo = process.cwd();
const registry = JSON.parse(fs.readFileSync(path.join(repo, "data/ingestion/listing-registry.json"), "utf8"));
const outputMediaRoot = path.join(repo, "public/products/media");
const manifestPath = path.join(repo, "assets/asset-manifest.json");
const recordsPath = path.join(repo, "data/products/approved/initial-public-tranche.json");
const w02Text = fs.readFileSync(path.join(repo, "docs/W02_40_LISTING_DECISION_GATE.md"), "utf8");
const familyNames = {
  "bridal-gloves": "Bridal / Wedding Gloves",
  "opera-gloves": "Opera / Evening / Formal Gloves",
  "costume-gloves": "Costume / Stage Gloves",
  "kids-dress-gloves": "Kids / Girls Dress Gloves",
  "wedding-veils": "Wedding / Bridal Veils",
};
const nameOverrides = {
  "730186552239": "Long Smooth Satin Opera Gloves",
  "737751870967": "Girls' Satin Bow Dress Gloves",
  "800814497148": "Black Lace-Trim Veil",
  "856992679458": "Long Sheer Lace Bridal Gloves",
  "728772172182": "Girls' Fingerless Lace Dress Gloves",
  "728908046635": "Beaded Fingerless Lace Bridal Gloves",
  "733063602867": "Short Sheer Lace Bridal Gloves",
  "735814134529": "Long Ruched Satin Bridal Gloves",
  "857043957533": "Long Fingerless Satin Bridal Arm Sleeves",
  "733010943271": "Short Fingerless Sheer Bridal Gloves",
  "819967426657": "Rhinestone Fishnet Bridal Gloves",
  "844530638864": "55 cm Long Satin Opera Gloves",
  "956309661690": "55 cm Satin Evening Gloves",
  "962080651234": "Feather Lace Costume Wrist Cuffs",
  "1002636896918": "Checked Tulle Girls' Dress Gloves",
  "691557112631": "Vintage Lace Stage Arm Sleeves",
  "729142545579": "Beaded Bow Fingerless Formal Gloves",
  "730371444820": "Long Satin Evening Gloves",
  "730659973350": "Short Satin Dress Gloves",
  "732732478288": "Long Glossy Costume Gloves",
  "761321664860": "Beaded Tulle Bridal Arm Sleeves",
  "950693682364": "Short Eyelash Lace Bridal Gloves",
  "728194389811": "Vintage Black Sheer Lace Opera Gloves",
  "728592614367": "Bow Lace Short Formal Gloves",
  "728659873446": "Polka Dot Bow Lace Formal Gloves",
  "732419024504": "Pearl Beaded Tulle Bridal Arm Sleeves",
  "732561509757": "Long Floral Tulle Bridal Gloves",
  "741321749838": "Long Bow Lace Satin Formal Gloves",
  "776820765686": "Short Full-Finger Lace Bridal Gloves",
  "728600712961": "Long Full-Finger Lace Bridal Gloves",
  "732867076935": "Fingerless Floral Lace Formal Arm Sleeves",
  "733406564887": "Long Fingerless Floral Lace Bridal Gloves",
  "741154552428": "Rhinestone Bow Lace Formal Gloves",
  "788133828087": "Girls' White Satin Lace Bow Gloves",
  "819969614484": "Fingerless Glossy Costume Gloves",
  "977246337453": "White Mesh Lace Bow Bridal Gloves",
};
const namedGroups = new Map([
  ["kids-dress-gloves-group-737751870967", "kids-dress-gloves-satin-bow-001"],
  ["opera-gloves-group-730659973350", "opera-gloves-satin-short-001"],
  ["draft-800814497148", "wedding-veils-black-lace-trim-001"],
  ["draft-856992679458", "bridal-gloves-sheer-lace-long-001"],
]);
const excluded = new Map();
for (const hash of [
  "fc01e4e85a76f46680b54ade4b697dba7d7c866642f5692d01359f4810d09ea1",
  "97d37bfcc74e37dcc19119f0149fbc5820eb4491c31cc71d9314c0046f0946e8",
  "d482486585ca19e1e0077a33ef0c4bfc76e945e79331fde5f0343bc271c88caa",
]) excluded.set(hash, "Historical production exclusion retained by the ingestion validator.");
function walkDecisionFiles(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walkDecisionFiles(file);
    else if (entry.name === "human-decisions.json") {
      const value = JSON.parse(fs.readFileSync(file, "utf8"));
      for (const decision of value.decisions ?? []) for (const note of decision.imageReviewNotes ?? []) {
        if (note.disposition === "NON_PREFERRED_PRODUCTION") excluded.set(note.sha256, note.reason);
      }
    }
  }
}
walkDecisionFiles(path.join(repo, "data/ingestion"));
walkDecisionFiles(path.join(repo, ".product-ingestion"));
const ledgers = new Map();
for (const entry of fs.readdirSync(path.join(repo, ".product-ingestion"), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const ledgerPath = path.join(repo, ".product-ingestion", entry.name, "review/intake-ledger.json");
  if (!fs.existsSync(ledgerPath)) continue;
  for (const listing of JSON.parse(fs.readFileSync(ledgerPath, "utf8")).listings) ledgers.set(listing.listingId, { ...listing, batch: entry.name });
}
const attributes = new Map();
for (const line of w02Text.split(/\r?\n/)) {
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  if (cells.length !== 7 || !/^`\d+`$/.test(cells[0]) || !cells[6].includes("APPROVE_CANDIDATE")) continue;
  attributes.set(cells[0].slice(1, -1), cells[4].split("、").map((value) => value.trim()).filter(Boolean));
}
const sourcePathFor = (listing, image) => path.join(repo, ".product-ingestion", listing.batch, "inspection", listing.rawArchiveSha256.slice(0, 16), ...image.archivePath.replaceAll("\\", "/").split("/"));
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const tagsFor = (name) => name.toLowerCase().split(/[^a-z0-9]+/).filter((tag) => ["satin", "lace", "sheer", "tulle", "fingerless", "full", "short", "long", "bow", "beaded", "rhinestone", "glossy", "mesh", "fishnet", "feather", "floral", "opera", "formal", "costume"].includes(tag));
const roleFor = (image, index, primaryHash) => image.sha256 === primaryHash ? "primary" : image.role === "description" ? "context" : index === 0 ? "detail" : "detail";
const sourceRoleLabel = (roles) => roles.length ? roles.join(", ") : "other";
const approvedEntries = registry.entries.filter((entry) => entry.status !== "QUARANTINED");
const groups = new Map();
for (const entry of approvedEntries) {
  const groupId = entry.normalizedProductGroupId ?? entry.normalizedDraftId;
  if (!groups.has(groupId)) groups.set(groupId, []);
  groups.get(groupId).push(entry);
}
if (groups.size !== 36) throw new Error(`Expected 36 normalized products, found ${groups.size}`);
fs.mkdirSync(outputMediaRoot, { recursive: true });
const sourceRecords = [];
const productionAssets = [];
for (const [groupId, entries] of groups) {
  const productId = namedGroups.get(groupId) ?? `${entries[0].normalizedProductFamily}-${entries[0].listingId}`;
  const family = entries[0].normalizedProductFamily;
  const listings = entries.map((entry) => {
    const listing = ledgers.get(entry.listingId);
    if (!listing) throw new Error(`Missing intake ledger for ${entry.listingId}`);
    return listing;
  });
  const imagesByHash = new Map();
  for (const listing of listings) for (const image of listing.images) {
    if (excluded.has(image.sha256)) continue;
    const source = sourcePathFor(listing, image);
    if (!fs.existsSync(source)) throw new Error(`Missing source image ${source}`);
    const current = imagesByHash.get(image.sha256) ?? { ...image, source, roles: [], sourceListingIds: [], sourcePaths: [] };
    current.roles.push(image.role ?? "other");
    current.sourceListingIds.push(listing.listingId);
    current.sourcePaths.push(image.archivePath);
    imagesByHash.set(image.sha256, current);
  }
  const ordered = [...imagesByHash.values()];
  const primary = ordered.find((image) => image.roles.includes("main"));
  if (!primary) throw new Error(`No eligible main image for ${productId}`);
  const productName = nameOverrides[entries[0].listingId] ?? `${familyNames[family]} product ${entries[0].listingId}`;
  const productDir = path.join(outputMediaRoot, productId);
  fs.mkdirSync(productDir, { recursive: true });
  const recordImages = [];
  for (let index = 0; index < ordered.length; index += 1) {
    const image = ordered[index];
    const imageId = `${productId}-${image.sha256.slice(0, 12)}`;
    const outputPath = path.join(productDir, `${image.sha256}.webp`);
    const relativePath = `/products/media/${productId}/${image.sha256}.webp`;
    const transformed = await sharp(image.source).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(outputPath);
    const role = roleFor(image, index, primary.sha256);
    const altText = `${productName}, ${sourceRoleLabel(image.roles)} view`;
    const source = `W02 accepted listing media; source listing ${image.sourceListingIds.join(", ")}; SHA-256 ${image.sha256}.`;
    recordImages.push({ assetId: `${imageId}-web`, role, status: "CONFIRMED", source, path: relativePath, width: transformed.width, height: transformed.height, altText, sourceRoles: [...new Set(image.roles)], sourceListingIds: [...new Set(image.sourceListingIds)] });
    productionAssets.push({ assetId: imageId, productId, sourceListingIds: [...new Set(image.sourceListingIds)], sourceHash: image.sha256, permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", permissionSource: "Factory-owned 1688 storefront grant for https://jsmeilai.1688.com/", visualApprovalStatus: "HUMAN_PRODUCTION_APPROVED", visualApprovalSource: "W02 Human Review accepted 2026-09-06; eligible image after explicit exclusion review.", original: { path: path.relative(repo, image.source).replaceAll("\\", "/"), width: image.width, height: image.height }, derivatives: [{ assetId: `${imageId}-web`, role, sourceRoles: [...new Set(image.roles)], path: relativePath, width: transformed.width, height: transformed.height, format: "webp", sha256: sha256(outputPath) }] });
  }
  const primaryRecordImage = recordImages.find((image) => image.path.includes(primary.sha256));
  const thumbPath = path.join(productDir, `${primary.sha256}-thumb.webp`);
  const thumbRelativePath = `/products/media/${productId}/${primary.sha256}-thumb.webp`;
  const thumb = await sharp(primary.source).rotate().resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(thumbPath);
  const thumbSource = `W02 accepted listing media thumbnail derived from ${primary.sha256}; source listing ${primary.sourceListingIds.join(", ")}.`;
  const thumbnail = { assetId: `${productId}-${primary.sha256.slice(0, 12)}-thumb`, role: "thumbnail", status: "CONFIRMED", source: thumbSource, path: thumbRelativePath, width: thumb.width, height: thumb.height, altText: `${productName}, primary view` };
  productionAssets.push({ assetId: `${productId}-${primary.sha256.slice(0, 12)}-thumb`, productId, sourceListingIds: [...new Set(primary.sourceListingIds)], sourceHash: primary.sha256, permissionStatus: "STORE_LEVEL_PERMISSION_INHERITED", permissionSource: "Factory-owned 1688 storefront grant for https://jsmeilai.1688.com/", visualApprovalStatus: "HUMAN_PRODUCTION_APPROVED", visualApprovalSource: "W02 Human Review accepted 2026-09-06; eligible image thumbnail derived from an approved source.", original: { path: path.relative(repo, primary.source).replaceAll("\\", "/"), width: primary.width, height: primary.height }, derivatives: [{ assetId: `${productId}-${primary.sha256.slice(0, 12)}-thumb`, role: "thumbnail", path: thumbRelativePath, width: thumb.width, height: thumb.height, format: "webp", sha256: sha256(thumbPath) }] });
  const confirmedAttributes = [...new Set(listings.flatMap((listing) => attributes.get(listing.listingId) ?? []))];
  const colorValues = confirmedAttributes.filter((value) => /黑|白|红|粉|紫|香槟/.test(value));
  const color = colorValues.length ? { value: colorValues, status: "CONFIRMED", source: "W02 accepted source title/attribute evidence." } : undefined;
  const fingerStyle = /无指|露指|钩指|半指/.test(confirmedAttributes.join("、")) ? { value: "fingerless", status: "CONFIRMED", source: "W02 accepted source title/attribute evidence." } : /全指|包指|五指/.test(confirmedAttributes.join("、")) ? { value: "full-finger", status: "CONFIRMED", source: "W02 accepted source title/attribute evidence." } : undefined;
  const lengthMatch = confirmedAttributes.join(" ").match(/(\d+)\s*cm/);
  sourceRecords.push({ id: productId, slug: productId, provenance: { ...(groupId.startsWith("draft-") ? {} : { normalizedProductGroupId: groupId }), sourceListingIds: entries.map((entry) => entry.listingId) }, productName, productFamily: family, subStyle: tagsFor(productName), material: { value: null, status: "UNKNOWN", source: "No fibre composition is approved for publication." }, ...(lengthMatch ? { length: { value: Number(lengthMatch[1]), unit: "cm", label: `${lengthMatch[1]} cm` } } : {}), ...(color ? { color } : {}), ...(fingerStyle ? { fingerStyle } : {}), ...(family === "kids-dress-gloves" ? { ageGroup: { value: "kids", status: "CONFIRMED", source: "W02 accepted family and source title evidence." } } : {}), occasion: { value: family === "wedding-veils" ? ["wedding", "bridal"] : family === "kids-dress-gloves" ? ["dress", "special occasion"] : family === "costume-gloves" ? ["stage", "costume"] : ["bridal", "formalwear"], status: "CONFIRMED", source: "W02 accepted family and source title evidence." }, customizableFields: ["pattern", "color", "size", "logo", "packaging", "supplied-material"].map((field) => ({ field, status: "CONFIRMED", source: "W01 confirmed customization capability; subject to product/project review." })), images: [...recordImages, thumbnail], thumbnail, shortDescription: `${productName} is a source-reviewed direction for ${familyNames[family].toLowerCase()} sourcing conversations.`, specifications: { sourceAttributesZh: { value: confirmedAttributes, status: "CONFIRMED", source: "W02 accepted listing attribute evidence." }, sourceListingTitlesZh: { value: listings.map((listing) => listing.sourceMetadata?.listingTitle ?? ""), status: "CONFIRMED", source: "W02 accepted intake ledger." } }, featured: false, sortOrder: sourceRecords.length + 1, status: "APPROVED", altText: primaryRecordImage.altText, editorialTitleStatus: "PREVIEW_DERIVED_PENDING_HUMAN_COPY_REVIEW", sourceListingTitlesZh: listings.map((listing) => listing.sourceMetadata?.listingTitle ?? "") });
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
manifest.productionAssets = productionAssets;
fs.writeFileSync(recordsPath, `${JSON.stringify(sourceRecords, null, 2)}\n`);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ products: sourceRecords.length, productionAssets: productionAssets.length, imageReferences: sourceRecords.reduce((total, record) => total + record.images.length, 0), output: "public/products/media" }, null, 2));
