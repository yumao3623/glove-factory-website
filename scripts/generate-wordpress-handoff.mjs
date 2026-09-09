import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const repo = process.cwd();
const output = path.resolve(repo, "..", "JS-Meilai-WordPress-Handoff-2026-09-07");
const packageName = path.basename(output);

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, value) => {
  mkdir(file);
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
};
const digest = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const mkdir = (file) => fs.mkdirSync(path.dirname(file), { recursive: true });
const copy = (source, destination) => {
  mkdir(destination);
  fs.copyFileSync(source, destination);
};
const csv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const toPosix = (file) => file.split(path.sep).join("/");

if (fs.existsSync(output)) {
  const existingTopLevel = fs.readdirSync(output).sort();
  if (existingTopLevel.length !== 1 || existingTopLevel[0] !== "media") {
    throw new Error(`Refusing to overwrite existing handoff directory: ${output}`);
  }
  console.warn(`Resuming media-only incomplete handoff output: ${output}`);
}

const registry = readJson(path.join(repo, "data", "ingestion", "listing-registry.json"));
const w02 = fs.readFileSync(path.join(repo, "docs", "W02_40_LISTING_DECISION_GATE.md"), "utf8");
const attributesByListing = new Map();
for (const line of w02.split(/\r?\n/)) {
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  const match = cells[0]?.match(/^`(\d+)`$/);
  if (match && cells.length === 7 && cells[6].includes("APPROVE_CANDIDATE")) {
    attributesByListing.set(match[1], cells[4].split("、").map((value) => value.trim()));
  }
}

const ledgerByListing = new Map();
const ingestionRoot = path.join(repo, ".product-ingestion");
for (const entry of fs.readdirSync(ingestionRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const ledger = path.join(ingestionRoot, entry.name, "review", "intake-ledger.json");
  if (!fs.existsSync(ledger)) continue;
  for (const listing of readJson(ledger).listings) {
    ledgerByListing.set(listing.listingId, { ...listing, batch: entry.name });
  }
}

const excludedImageReasons = new Map();
const collectDecisionFiles = (directory) => {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectDecisionFiles(file));
    else if (entry.name === "human-decisions.json") files.push(file);
  }
  return files;
};
for (const sourceRoot of [path.join(repo, "data", "ingestion"), ingestionRoot]) {
  for (const file of collectDecisionFiles(sourceRoot)) {
    const content = readJson(file);
    for (const decision of content.decisions ?? []) {
      for (const note of decision.imageReviewNotes ?? []) {
        if (note.disposition === "NON_PREFERRED_PRODUCTION") {
          excludedImageReasons.set(note.sha256, note.reason);
        }
      }
    }
  }
}

const approvedEntries = registry.entries.filter((entry) => entry.status !== "QUARANTINED");
const quarantinedEntries = registry.entries.filter((entry) => entry.status === "QUARANTINED");
const groups = new Map();
for (const entry of approvedEntries) {
  const key = entry.normalizedProductGroupId ?? entry.normalizedDraftId;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(entry);
}

const namedProductIds = new Map([
  ["kids-dress-gloves-group-737751870967", "kids-dress-gloves-satin-bow-001"],
  ["opera-gloves-group-730659973350", "opera-gloves-satin-short-001"],
  ["draft-800814497148", "wedding-veils-black-lace-trim-001"],
  ["draft-856992679458", "bridal-gloves-sheer-lace-long-001"],
]);
const familyNames = {
  "bridal-gloves": "Bridal / Wedding Gloves",
  "opera-gloves": "Opera / Evening / Formal Gloves",
  "costume-gloves": "Costume / Stage Gloves",
  "kids-dress-gloves": "Kids / Girls Dress Gloves",
  "wedding-veils": "Wedding / Bridal Veils",
};

fs.mkdirSync(output, { recursive: true });
const copiedMedia = [];
const products = [];
for (const [groupId, entries] of groups) {
  const sourceListings = entries.map((entry) => {
    const listing = ledgerByListing.get(entry.listingId);
    if (!listing) throw new Error(`Missing intake ledger for ${entry.listingId}`);
    return listing;
  });
  const family = entries[0].normalizedProductFamily;
  const productId = namedProductIds.get(groupId) ?? `${family}-${entries[0].listingId}`;
  const imageByHash = new Map();
  for (const listing of sourceListings) {
    for (const image of listing.images) {
      const source = path.join(
        ingestionRoot,
        listing.batch,
        "inspection",
        listing.rawArchiveSha256.slice(0, 16),
        ...image.archivePath.split("/"),
      );
      if (!fs.existsSync(source)) {
        throw new Error(`Missing source image for ${listing.listingId}: ${source}`);
      }
      const existing = imageByHash.get(image.sha256) ?? {
        sha256: image.sha256,
        extension: image.extension,
        bytes: image.bytes,
        width: image.width,
        height: image.height,
        roles: [],
        source_listing_ids: [],
        source_paths: [],
        eligible_for_public_use: !excludedImageReasons.has(image.sha256),
        exclusion_reason: excludedImageReasons.get(image.sha256) ?? null,
        source,
      };
      existing.roles.push(image.role);
      existing.source_listing_ids.push(listing.listingId);
      existing.source_paths.push(image.archivePath);
      imageByHash.set(image.sha256, existing);
    }
  }

  const media = [];
  for (const image of imageByHash.values()) {
    image.roles = [...new Set(image.roles)];
    image.source_listing_ids = [...new Set(image.source_listing_ids)];
    image.source_paths = [...new Set(image.source_paths)];
    const mediaPath = `media/products/${productId}/${image.sha256}${image.extension}`;
    if (image.eligible_for_public_use) {
      copy(image.source, path.join(output, ...mediaPath.split("/")));
      copiedMedia.push(mediaPath);
    }
    media.push({
      sha256: image.sha256,
      extension: image.extension,
      bytes: image.bytes,
      width: image.width,
      height: image.height,
      roles: image.roles,
      source_listing_ids: image.source_listing_ids,
      source_archive_paths: image.source_paths,
      package_path: image.eligible_for_public_use ? mediaPath : null,
      eligible_for_public_use: image.eligible_for_public_use,
      exclusion_reason: image.exclusion_reason,
    });
  }
  const eligibleMedia = media.filter((image) => image.eligible_for_public_use);
  const primaryImage = eligibleMedia.find((image) => image.roles.includes("main"));
  if (!primaryImage) throw new Error(`No eligible main image for ${productId}`);

  products.push({
    product_id: productId,
    wordpress_slug_seed: productId,
    status: "W02_APPROVED_FOR_WORDPRESS_HANDOFF",
    family_slug: family,
    family_name: familyNames[family],
    title_source_zh: sourceListings[0].sourceMetadata.listingTitle,
    title_en: null,
    title_en_status: "NOT_CONFIRMED_IN_SOURCE_REPOSITORY",
    source_listing_ids: sourceListings.map((listing) => listing.listingId),
    source_listings: sourceListings.map((listing) => ({
      listing_id: listing.listingId,
      title_source_zh: listing.sourceMetadata.listingTitle,
      source_url: listing.sourceMetadata.listingUrl,
      storefront_url: listing.sourceStorefront,
      raw_archive_sha256: listing.rawArchiveSha256,
      batch: listing.batch,
      confirmed_attributes_zh: attributesByListing.get(listing.listingId) ?? [],
    })),
    confirmed_attributes_zh: [...new Set(sourceListings.flatMap((listing) => attributesByListing.get(listing.listingId) ?? []))],
    unknown_or_unconfirmed: [
      "English product title",
      "Exact material composition",
      "Size range",
      "MOQ",
      "Price",
      "Stock",
      "Sample terms",
      "Lead time",
      "Capacity",
      "Certification",
      "Packaging",
      "QC claim",
    ],
    primary_image_path: primaryImage.package_path,
    image_counts: {
      unique_total: media.length,
      eligible_for_public_use: eligibleMedia.length,
      excluded: media.length - eligibleMedia.length,
      main: eligibleMedia.filter((image) => image.roles.includes("main")).length,
      sku: eligibleMedia.filter((image) => image.roles.includes("sku")).length,
      description: eligibleMedia.filter((image) => image.roles.includes("description")).length,
    },
    images: media,
  });
}

if (products.length !== 36) throw new Error(`Expected 36 products, found ${products.length}`);
if (quarantinedEntries.length !== 1 || quarantinedEntries[0].listingId !== "776815144156") {
  throw new Error("Unexpected W02 quarantine population");
}

const publicAssetManifest = readJson(path.join(repo, "assets", "asset-manifest.json"));
const supportingAssets = [];
for (const sourceDirectory of [
  ["editorial", path.join(repo, "assets", "editorial", "w11", "original"), "HUMAN_PUBLIC_USE_APPROVED_FOR_EDITORIAL_DECORATIVE_USE", "Editorial/decorative only; never identify a product or factory."],
  ["factory", path.join(repo, "assets", "factory", "original"), "HUMAN_PUBLIC_USE_APPROVED", "Factory page/process use only; do not infer capacity, certification, QC, customers, or lead time."],
]) {
  const [kind, directory, permissionStatus, boundary] = sourceDirectory;
  for (const file of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!file.isFile()) continue;
    const source = path.join(directory, file.name);
    const destination = `media/${kind}/${file.name}`;
    copy(source, path.join(output, ...destination.split("/")));
    copiedMedia.push(destination);
    supportingAssets.push({
      asset_id: `${kind}-${path.parse(file.name).name}`,
      kind,
      package_path: destination,
      sha256: digest(source),
      permission_status: permissionStatus,
      use_boundary: boundary,
    });
  }
}

const productManifest = {
  schema: "js-meilai-wordpress-handoff/products/v1",
  generated_at: "2026-09-07",
  source_decision: "W02 Human Review accepted: 39 non-IP-risk source listings normalize to 36 products; one IP-risk listing is quarantined.",
  products,
};
writeJson(path.join(output, "data", "products.json"), productManifest);

const csvRows = [
  ["product_id", "wordpress_slug_seed", "family_slug", "family_name", "title_source_zh", "title_en", "source_listing_ids", "confirmed_attributes_zh", "primary_image_path", "eligible_image_count", "main_image_count", "sku_image_count", "description_image_count"],
  ...products.map((product) => [
    product.product_id,
    product.wordpress_slug_seed,
    product.family_slug,
    product.family_name,
    product.title_source_zh,
    product.title_en,
    product.source_listing_ids.join(";"),
    product.confirmed_attributes_zh.join(";"),
    product.primary_image_path,
    product.image_counts.eligible_for_public_use,
    product.image_counts.main,
    product.image_counts.sku,
    product.image_counts.description,
  ]),
];
fs.mkdirSync(path.join(output, "data"), { recursive: true });
fs.writeFileSync(path.join(output, "data", "products.csv"), `${csvRows.map((row) => row.map(csv).join(",")).join("\n")}\n`);

const assetManifest = {
  schema: "js-meilai-wordpress-handoff/assets/v1",
  generated_at: "2026-09-07",
  product_media: products.flatMap((product) => product.images.map((image) => ({ product_id: product.product_id, ...image }))),
  supporting_media: supportingAssets,
  excluded_product_images: products.flatMap((product) => product.images.filter((image) => !image.eligible_for_public_use).map((image) => ({ product_id: product.product_id, ...image }))),
  original_public_asset_record_count: publicAssetManifest.assets.length,
};
writeJson(path.join(output, "data", "asset-manifest.json"), assetManifest);

writeJson(path.join(output, "data", "quarantined-listings.json"), {
  schema: "js-meilai-wordpress-handoff/quarantine/v1",
  listings: quarantinedEntries.map((entry) => {
    const listing = ledgerByListing.get(entry.listingId);
    return {
      listing_id: entry.listingId,
      title_source_zh: listing?.sourceMetadata.listingTitle ?? null,
      family_review_note: "costume-gloves suggested in W02; registry preserved kids-dress-gloves before quarantine",
      disposition: "QUARANTINE_DO_NOT_IMPORT_OR_PUBLISH",
      reason: "Confirmed Frozen/Elsa character/IP risk.",
      source_listing_url: listing?.sourceMetadata.listingUrl ?? null,
    };
  }),
});

const handoffDocument = `# JS Meilai WordPress Rebuild Handoff\n\nGenerated: 2026-09-07\n\n## Purpose\n\nThis standalone package transfers the confirmed business inputs, W02 catalogue decision, usable media and publication boundaries to a new WordPress project. It does not transfer the previous Next.js architecture, Vercel implementation order, checkpoint gates or deployment configuration.\n\n## Positioning, Brand and Audience\n\n- Public brand: **JS Meilai**. Do not present it as a separately registered English legal entity.\n- Registered operator where legal identity is required: **江山市美来服饰厂**.\n- Official domain: **jsmeilai.com**. The documented formal host choice is **https://www.jsmeilai.com/**; treat its redirect and canonical setup as a future launch verification, not a current configuration instruction.\n- Positioning: **Occasion Gloves & Wedding Veils Manufacturer**.\n- Audience: wholesalers, importers, distributors, bridal shops, brands, ecommerce sellers and sourcing buyers. The site is English-first B2B lead generation.\n\n## Confirmed Factory Facts and Contact\n\n- Public address: 浙江省衢州市江山市石门镇泉塘村泉塘路37号\n- Team: 19 people total; 15 production personnel.\n- Factory area: 500 m2 total; 80 m2 warehouse.\n- Customization is available for style, colour, sizing, logo application, packaging and customer-supplied materials, subject to product and project review.\n- Approved public phone and WhatsApp: +60 1114166916\n- Early enquiry, privacy-rights and deletion contact: yumao3623@gmail.com\n- Future sending identity recorded for enquiry email: JS Meilai RFQ <rfq@mail.jsmeilai.com>; it is not an inbox and must be configured and verified before use.\n\nDo not add claims for MOQ, sample terms, lead times, capacity, certifications, exact composition, packaging, QC, export history, named customers or sustainability unless separately confirmed.\n\n## Required Site Scope\n\nCreate a homepage, products hub, five family collections, one clickable detail page per product, Factory, Custom Manufacturing, Contact and Privacy. Each product detail page should show its multiple mapped images, source-derived title and confirmed attributes, then offer an enquiry path carrying product and family context.\n\nThe five families are:\n\n1. Bridal / Wedding Gloves (` + "`bridal-gloves`" + `)\n2. Opera / Evening / Formal Gloves (` + "`opera-gloves`" + `)\n3. Costume / Stage Gloves (` + "`costume-gloves`" + `)\n4. Kids / Girls Dress Gloves (` + "`kids-dress-gloves`" + `)\n5. Wedding / Bridal Veils (` + "`wedding-veils`" + `)\n\nThe old project's static JSON, no-database, Vercel and checkpoint restrictions do not constrain WordPress. The business framing is B2B enquiry-led; confirm any later retail-commerce decision separately rather than importing a prior technical prohibition.\n\n## Catalogue Data and Images\n\n` + "`data/products.json`" + ` is the authoritative package data: 36 normalized products from 39 W02-approved source listings. ` + "`data/products.csv`" + ` is a flat import worksheet. The JSON records every source listing, original Chinese title, W02-confirmed attributes, source URLs, raw archive hash, image SHA-256, role (` + "`main`" + `, ` + "`sku`" + `, ` + "`description`" + `) and package path. ` + "`data/asset-manifest.json`" + ` is the import-safe asset manifest.\n\n- ` + "`media/products/<product-id>/`" + ` contains every W02-eligible image for that normalized product.\n- A file may have several roles. Its single binary is intentionally shared and its role list remains in the JSON.\n- Images explicitly excluded as non-preferred production media remain documented in the manifest with SHA-256 and reason, but their binaries are not packaged as publishable product media.\n- ` + "`data/quarantined-listings.json`" + ` names listing 776815144156. It is a confirmed Frozen/Elsa character/IP risk and must never be imported or published.\n- Source Chinese titles are factual source records. English product titles are not confirmed in the source repository and are intentionally null for editorial translation/review.\n\n## Asset Permission Boundaries\n\n- Product media in ` + "`media/products/`" + `: sourced from the factory-owned 1688 store. Permission is inherited for public website use after W02 review. Keep only the supplied eligible files; do not reuse excluded hashes or the quarantined listing.\n- ` + "`media/editorial/`" + `: Human-authorized editorial/decorative homepage material. It may be cropped and web-processed, but must not identify a JS Meilai product, factory, customer or capability.\n- ` + "`media/factory/`" + `: Human-authorized factory photos for appropriate Factory/process use. Do not use as homepage hero or infer capacity, certification, QC, lead time, customers or export claims.\n- Marketplace UI, Chinese marketing posters, competitor screenshots, watermarked/third-party composites and Frozen/Elsa imagery are outside the approved media set.\n\n## Visual Direction\n\nUse the Human-accepted **Editorial Utility / Refined E** direction: real product imagery, a quiet editorial opening, dense five-family wayfinding, consistent 4:5 or 1:1 product frames, serif display headings with compact sans utility copy, visible enquiry calls to action and a factual factory/process bridge. The desired result is fashion-sensitive but credible to B2B buyers.\n\nAvoid oversized empty heroes, grey placeholder image frames, generic SaaS/wholesale marketplace chrome, price/inventory styling, excessive card stacks, full-bleed workshop hero treatment, industrial PPE styling, copied competitor imagery, unsupported heritage/sustainability claims and decorative glass/blur that makes products harder to inspect.\n\nReference patterns retained from review: Cornelia James and Grace Loves Lace for material/editorial pacing; Wedding Factory Direct and Wona for catalogue breadth; Dents-like department navigation. They are references only, not content or assets.\n\n## Enquiry, Privacy, SEO and Launch\n\nEnquiry form requirements: name, company, country/region, email, product/family context, quantity, message and an unticked privacy-consent checkbox; WhatsApp is optional. No file upload is in the documented first version. Route product context with product ID, slug, family, display name and source route. Apply server-side validation, rate limiting, honeypot/risk checks and privacy-safe logging.\n\nPrivacy policy requirements: identify form fields and purpose, Resend and Gmail processing, cross-border transfer where applicable, rights/deletion contact, and retention. The approved policy target is Resend email data for 30 days and Gmail enquiries for 12 months after last business action, then deletion unless a documented legal/contractual exception applies. This is a policy input, not proof of live provider configuration.\n\nSEO requirements: English content first; one canonical host; HTTPS; redirects; unique titles/descriptions and one H1 per page; readable server-rendered primary content; sitemap, robots, 404 and truthful schema. GSC and analytics require later account access and launch approval. Multilingual work follows English content/SEO stabilization and needs language, translation, legal and SEO ownership decisions.\n\n## Information Still Needed\n\nAsk for these only when the new project needs them:\n\n- Approved English product titles and any product-specific copy beyond source titles/visible attributes.\n- Exact materials, size ranges, colour availability, MOQ, price, stock, samples, lead times, capacity, certifications, packaging and QC claims.\n- Live WordPress host, registrar/DNS access, production canonical/redirect decision and launch date.\n- Email provider credentials, authenticated sending-domain/DNS records, form recipient workflow and operational testing approval.\n- Languages, translation owner and localized URL/canonical policy.\n- Any decision to add retail checkout, payments, stock or accounts.\n- Any extra Factory evidence desired, such as exterior, finishing/QC or packing photos, with claim-to-image mapping.\n\n## Package Contents\n\n- ` + "`data/products.json`" + ` and ` + "`data/products.csv`" + `: 36-product import data.\n- ` + "`data/asset-manifest.json`" + `: every image mapping and permission/use status.\n- ` + "`data/quarantined-listings.json`" + `: excluded IP-risk listing.\n- ` + "`media/products/`" + `: all eligible W02 product images.\n- ` + "`media/editorial/`" + ` and ` + "`media/factory/`" + `: authorized supporting media.\n- ` + "`WORDPRESS_REBUILD_HANDOFF.md`" + ` and ` + "`README.md`" + `: this handoff and import orientation.\n`;
fs.writeFileSync(path.join(output, "WORDPRESS_REBUILD_HANDOFF.md"), handoffDocument);
fs.writeFileSync(path.join(output, "README.md"), `# ${packageName}\n\nStart with [WORDPRESS_REBUILD_HANDOFF.md](WORDPRESS_REBUILD_HANDOFF.md). Import products from data/products.json or data/products.csv, then resolve every image through data/asset-manifest.json. The package contains 36 W02-approved normalized products and excludes the quarantined IP-risk listing. No credentials, cookies, API keys or external-service configuration are included.\n`);

const packageFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else packageFiles.push({ path: toPosix(path.relative(output, file)), bytes: fs.statSync(file).size, sha256: digest(file) });
  }
};
walk(output);
writeJson(path.join(output, "PACKAGE_MANIFEST.json"), {
  schema: "js-meilai-wordpress-handoff/package/v1",
  package_name: packageName,
  files: packageFiles,
  totals: {
    files: packageFiles.length,
    bytes: packageFiles.reduce((sum, file) => sum + file.bytes, 0),
    copied_media_files: copiedMedia.length,
    products: products.length,
  },
});

console.log(JSON.stringify({ output, products: products.length, copiedMedia: copiedMedia.length, files: packageFiles.length }, null, 2));
