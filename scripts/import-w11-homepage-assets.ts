import { cp, mkdir, readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const sourceNames: Record<string, string> = {
  "06908b0d21e789a67abd54c71ace2043.jpg": "editorial-veil-portrait.jpg",
  "0f6f2d11a93ead206ca72f6a39aa515b.jpg": "editorial-bow-glove.jpg",
  "1553ecb66aa4045a9c4806bb90558348.jpg": "editorial-white-glove-ribbons.jpg",
  "1df67c620e83e42b80fcbc57fbf3a2dc.jpg": "editorial-black-glove-satin.jpg",
  "2d63a482e7aa22af9763d3535073179f.jpg": "editorial-veil-floral-texture.jpg",
  "3b07d082d557b5f7ef2a6cb66c6550af.jpg": "editorial-black-glove.jpg",
  "3f1eecf0c12c606ba3f7063ae89148b0.jpg": "editorial-white-glove-garden.jpg",
  "4b2ae65fdf1adc73428dc0294c69c690.jpg": "editorial-pearl-glove-detail.jpg",
  "48baf75cff83b78d5bf1885649797f41.jpg": "editorial-white-glove.jpg",
  "67ea117fd14a50e60f3863cd3f406a8e.jpg": "editorial-satin-folds.jpg",
  "73a57727eca9155b62f6489a54badcf5.jpg": "editorial-ivory-glove-portrait.jpg",
  "770ed4eefc6fb4c97b7307eed568d0c2.jpg": "editorial-glove-boutonniere.jpg",
  "8388419b02d9cc866790ab66cdba1bfd.jpg": "editorial-lace-shadow.jpg",
  "98b91f840f404aaa43c6109c7ac17e03.jpg": "editorial-long-glove-portrait.jpg",
  "a549a94aa91f63d661ef6d14d20f062c.jpg": "editorial-long-glove-model.jpg",
  "bc0ecc4a3ec6a1604806c349ac957a5a.jpg": "editorial-embellished-glove.jpg",
  "bc8e6aa41cd42feb7b72555b0a15e846.jpg": "editorial-satin-detail.jpg",
  "cf2f35ad94e829c7dd8f76dd65fa6844.jpg": "editorial-white-glove-display.jpg",
  "d463a6a8a03b8afb460f9fd607c39cd2.jpg": "editorial-flower-glove.jpg",
  "e388c45993c454d0df569d5b755a2ae1.jpg": "editorial-lace-glove-detail.jpg",
  "f5c4dac1820ed458eb8d2e56327ae742.jpg": "editorial-veil-texture.jpg",
  "下载 (1).png": "editorial-sheer-sparkle.png",
  "下载 (2).png": "editorial-veil-sculpture.png",
  "下载 (3).png": "editorial-satin-bows.png",
  "下载.png": "editorial-veil-bow.png",
};

async function main() {
  const sourceRoot = process.argv[2];
  if (!sourceRoot) throw new Error("Usage: tsx scripts/import-w11-homepage-assets.ts <extracted-w11-directory>");

  const assetRoot = join(process.cwd(), "assets", "editorial", "w11");
  const originals = join(assetRoot, "original");
  const web = join(assetRoot, "web");
  const sourceFiles = await readdir(sourceRoot);
  await Promise.all([mkdir(originals, { recursive: true }), mkdir(web, { recursive: true })]);

  for (const sourceFile of sourceFiles) {
    const destinationName = sourceNames[sourceFile];
    if (!destinationName) continue;

    const source = join(sourceRoot, sourceFile);
    const original = join(originals, destinationName);
    const derivative = join(web, `${basename(destinationName, extname(destinationName))}.webp`);
    await cp(source, original);
    await sharp(source).webp({ quality: 82, effort: 5 }).toFile(derivative);
    console.log(`${sourceFile} -> ${destinationName}`);
  }
}

void main();
