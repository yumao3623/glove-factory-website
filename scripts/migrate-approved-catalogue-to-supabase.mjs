/**
 * Upload the already reviewed V1 catalogue into the protected Supabase
 * product-media bucket and products table.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-approved-catalogue-to-supabase.mjs --dry-run
 *   node --env-file=.env.local scripts/migrate-approved-catalogue-to-supabase.mjs --apply
 *   node --env-file=.env.local scripts/migrate-approved-catalogue-to-supabase.mjs --apply --metadata-only
 *
 * The script is intentionally opt-in. It uploads only approved web derivatives
 * and inserts rows as drafts; rows become public only after every image and row
 * has been verified. It is safe to rerun for the same slugs.
 */
import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const apply = process.argv.includes("--apply");
const metadataOnly = process.argv.includes("--metadata-only");
const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (apply && (!base || !service)) throw new Error("--apply requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");

const rows = JSON.parse(await readFile(join(root, "data/products/approved/initial-public-tranche.json"), "utf8"));
const records = rows.filter((row) => row.status === "APPROVED");
const allowedFields = new Set(["pattern", "color", "size", "logo", "packaging", "supplied-material"]);
const colourAliases = [["ivory", "ivory"], ["champagne", "champagne"], ["nude", "nude"], ["white", "white"], ["black", "black"], ["red", "red"], ["pink", "pink"], ["blue", "blue"], ["green", "green"], ["purple", "purple"], ["brown", "brown"], ["gold", "gold"], ["silver", "silver"], ["象牙", "ivory"], ["香槟", "champagne"], ["裸", "nude"], ["肤", "nude"], ["白", "white"], ["黑", "black"], ["红", "red"], ["粉", "pink"], ["蓝", "blue"], ["绿", "green"], ["紫", "purple"], ["棕", "brown"], ["咖啡", "brown"], ["金", "gold"], ["银", "silver"]];

function confirmedValue(record, key) {
  const value = record[key];
  return value?.status === "CONFIRMED" ? value.value : null;
}

function normalizeColours(record) {
  const raw = confirmedValue(record, "color");
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.flatMap((value) => {
    const text = String(value).toLowerCase();
    return colourAliases.filter(([alias]) => text.includes(alias)).map(([, colour]) => colour);
  }))];
}

function storagePath(record, image) {
  return `products/${record.slug}/${basename(image.path)}`;
}

function payloadFor(record, imageUrls) {
  const occasions = confirmedValue(record, "occasion");
  const decorations = confirmedValue(record, "decoration");
  const ageGroup = confirmedValue(record, "ageGroup");
  return {
    slug: record.slug,
    name: record.productName,
    family: record.productFamily,
    material: confirmedValue(record, "material"),
    length_cm: confirmedValue(record, "length")?.value ?? null,
    finger_style: confirmedValue(record, "fingerStyle"),
    colors: normalizeColours(record),
    description: record.shortDescription,
    image_urls: imageUrls,
    sub_style: record.subStyle ?? [],
    occasion: Array.isArray(occasions) ? occasions : [],
    decoration: Array.isArray(decorations) ? decorations : [],
    age_group: ["adult", "kids", "mixed"].includes(ageGroup) ? ageGroup : null,
    customizable_fields: (record.customizableFields ?? []).filter((field) => field.status === "CONFIRMED" && allowedFields.has(field.field)).map((field) => field.field),
    // Source-language evidence stays in the local provenance ledger. The
    // public row receives only the typed fields rendered by the catalogue.
    specifications: {},
    featured: record.featured === true,
    sort_order: Number.isInteger(record.sortOrder) ? record.sortOrder : 9999,
    status: "draft",
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: { apikey: service, Authorization: `Bearer ${service}`, ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers ?? {}) },
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(`${options.method ?? "GET"} ${path} failed with HTTP ${response.status}: ${JSON.stringify(data)}`);
  return data;
}

const prepared = [];
for (const record of records) {
  const images = record.images.filter((image) => image.status === "CONFIRMED" && image.role !== "thumbnail" && image.path?.startsWith("/products/media/"));
  const imageUrls = images.map((image) => storagePath(record, image));
  if (!imageUrls.length) throw new Error(`${record.slug} has no approved web images.`);
  for (const image of images) {
    const localPath = join(root, "public", image.path.replace(/^\//, ""));
    prepared.push({ record, image, imageUrls, localPath, storagePath: storagePath(record, image), payload: payloadFor(record, imageUrls) });
  }
}

console.log(JSON.stringify({ mode: apply ? "apply" : "dry-run", products: records.length, images: prepared.length, families: [...new Set(records.map((record) => record.productFamily))].sort() }, null, 2));
if (!apply) process.exit(0);

// Upload every object before creating public rows. A failed upload leaves no
// active catalogue row and can be safely resumed.
if (!metadataOnly) {
  for (const [index, item] of prepared.entries()) {
    const bytes = await readFile(item.localPath);
    await request(`/storage/v1/object/product-media/${item.storagePath}`, { method: "POST", headers: { "Content-Type": "image/webp", "x-upsert": "true", "Cache-Control": "public,max-age=31536000,immutable" }, body: bytes });
    if ((index + 1) % 20 === 0 || index === prepared.length - 1) console.log(`uploaded ${index + 1}/${prepared.length} images`);
  }
} else {
  console.log("metadata-only: skipped media uploads");
}

const inserted = [];
for (const record of records) {
  const row = payloadFor(record, prepared.find((item) => item.record.slug === record.slug).imageUrls);
  const response = await request(`/rest/v1/products?on_conflict=slug`, { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(row) });
  inserted.push(response[0]);
}
console.log(`saved ${inserted.length} draft product rows`);

for (const row of inserted) {
  await request(`/rest/v1/products?id=eq.${encodeURIComponent(row.id)}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ status: "active" }) });
}
console.log(`published ${inserted.length} products after media verification`);
