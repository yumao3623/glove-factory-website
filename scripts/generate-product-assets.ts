import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const intakeRoot = join(root, ".product-ingestion");

const assets = [
  { family: "kids-dress-gloves", productId: "kids-dress-gloves-satin-bow-001", view: "front", hash: "5db775e58e1e060cb6fccfba292f3d18b568f279e0ea32a09a20f74a5f761194" },
  { family: "kids-dress-gloves", productId: "kids-dress-gloves-satin-bow-001", view: "detail", hash: "8352aaaedaf0afc9139ae34370f120414530788996293e3e395341e8fddcd96c" },
  { family: "bridal-gloves", productId: "bridal-gloves-sheer-lace-long-001", view: "front", hash: "5e05f6cb309029730123e14bace92d47294a77b318a9ea9a9fd31305a91b2266" },
  { family: "bridal-gloves", productId: "bridal-gloves-sheer-lace-long-001", view: "detail-01", hash: "36ffd5f87f6e067ae266651d6f6c4e833e8ad691ec35e9a4f74edb260c761221" },
  { family: "bridal-gloves", productId: "bridal-gloves-sheer-lace-long-001", view: "detail-02", hash: "5a1e1a90a5bf5ee9ff96d6c2c8af94e2f50d50193db6b1535396f576399e4129" },
  { family: "opera-gloves", productId: "opera-gloves-satin-short-001", view: "front", hash: "d1e752a9bb687ff3bb4d9c2508703f2dbfc4f59be66fc31c2a1532076361ee57" },
  { family: "wedding-veils", productId: "wedding-veils-black-lace-trim-001", view: "front", hash: "c8042675e03c7ecd8c1cef069c997a3f8cc4bd9673a5a6e672595c921d7c2baa" },
  { family: "wedding-veils", productId: "wedding-veils-black-lace-trim-001", view: "comb", hash: "8256dd02868a6e5ce8df433911fbeafc317789a5fe4654237962f8511efb8cfb" },
  { family: "wedding-veils", productId: "wedding-veils-black-lace-trim-001", view: "dress-form", hash: "0cbc108c3d88502b71cbe4b454aa962869d1edfdeb1de2ac5fa2354e51ea4dfb" },
] as const;

function sha256(path: string) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function files(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : entry.isFile() ? [path] : [];
  });
}

const sourceFiles = files(intakeRoot).filter((path) => [".jpg", ".jpeg", ".png", ".webp"].includes(extname(path).toLowerCase()));

async function main() {
  const requestedFamily = process.argv[2];
  for (const asset of assets.filter((candidate) => !requestedFamily || candidate.family === requestedFamily)) {
    const source = sourceFiles.find((path) => sha256(path) === asset.hash);
    if (!source) throw new Error(`Selected source hash is not available in the local intake workspace: ${asset.hash}`);

    const base = `${asset.family}__${asset.productId}__${asset.view}__default__v1`;
    const output = join(root, "assets", "products", asset.family, asset.productId);
    const original = join(output, "original", `${base}${extname(source).toLowerCase()}`);
    const web = join(output, "web", `${base}.webp`);
    const thumbnail = join(output, "thumb", `${base}.webp`);
    [original, web, thumbnail].forEach((path) => mkdirSync(resolve(path, ".."), { recursive: true }));

    if (!existsSync(original)) copyFileSync(source, original);
    if (sha256(original) !== asset.hash) throw new Error(`Copied original hash mismatch: ${basename(original)}`);
    await sharp(original).resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(web);
    await sharp(original).resize({ width: 400, height: 400, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumbnail);
  }
}

void main();
