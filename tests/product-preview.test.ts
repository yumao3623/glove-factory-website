import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { getApprovedCatalogueProductBySlug, getApprovedCatalogueSlugs } from "../data/approved-catalogue";
import { getProductRfqContext } from "../data/product-rfq-context";
import { getIndexableProductSlugs, isIndexableProductSlug } from "../data/seo-index";
import { getSeoProductDescription, getSeoProductMetaDescription } from "../data/seo-editorial";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

test("approved products have stable preview slugs and closed detail inventory", () => {
  assert.equal(getApprovedCatalogueSlugs().length, 36);
  assert.equal(new Set(getApprovedCatalogueSlugs()).size, 36);
  for (const slug of getApprovedCatalogueSlugs()) {
    const product = getApprovedCatalogueProductBySlug(slug);
    assert.ok(product);
    assert.equal(product.slug, slug);
    assert.equal(product.status, "APPROVED");
    assert.ok(product.collectionImages.length >= 1);
  }
});

test("curated detail tranche is indexable while the remaining catalogue stays gated", () => {
  const routePath = resolve(root, "app/products/[slug]/page.tsx");
  assert.equal(existsSync(routePath), true);
  const route = read("app/products/[slug]/page.tsx");
  assert.match(route, /dynamicParams\s*=\s*true/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /params: Promise<\{ slug: string \}>/);
  assert.match(route, /isIndexableProductSlug/);
  assert.match(route, /noindexRobots/);
  assert.match(route, /notFound\(\)/);
  assert.equal(getIndexableProductSlugs().length, 15);
  assert.equal(isIndexableProductSlug("bridal-gloves-sheer-lace-long-001"), true);
  assert.equal(isIndexableProductSlug("bridal-gloves-728908046635-not-curated"), false);
  for (const slug of getIndexableProductSlugs()) {
    const product = getApprovedCatalogueProductBySlug(slug);
    assert.ok(product);
    assert.notEqual(getSeoProductDescription(product), product.shortDescription);
    assert.ok(getSeoProductMetaDescription(product).length <= 160);
  }
  assert.match(read("components/product/product-detail-preview.tsx"), /\"@type\": \"Product\"/);
  assert.doesNotMatch(read("app/sitemap.ts"), /products\/\[slug\]|product-preview/);
});

test("product RFQ context keeps only approved identity and source fields", () => {
  const product = getApprovedCatalogueProductBySlug("bridal-gloves-sheer-lace-long-001");
  assert.ok(product);
  assert.deepEqual(getProductRfqContext(product), {
    productId: "bridal-gloves-sheer-lace-long-001",
    slug: "bridal-gloves-sheer-lace-long-001",
    family: "bridal-gloves",
    approvedDisplayName: "Long Sheer Lace Bridal Gloves",
    sourceRoute: "/bridal-gloves/",
  });
  assert.deepEqual(Object.keys(getProductRfqContext(product)).sort(), ["approvedDisplayName", "family", "productId", "slug", "sourceRoute"]);
  const contractSource = read("data/product-rfq-context.ts");
  for (const forbidden of ["price", "moq", "inventory", "leadTime", "capacity", "certification", "qc"]) assert.doesNotMatch(contractSource, new RegExp(`\\b${forbidden}\\b`, "i"));
});

test("collection cards and detail surface emit the same RFQ context contract", () => {
  assert.match(read("components/product/product-card.tsx"), /data-product-id=\{rfqContext\.productId\}/);
  assert.match(read("components/product/product-card.tsx"), /data-source-route=\{rfqContext\.sourceRoute\}/);
  assert.match(read("components/product/product-detail-preview.tsx"), /data-rfq-context=\{JSON\.stringify\(context\)\}/);
});
