import test from "node:test";
import assert from "node:assert/strict";
import { mapPublishedProduct, getCommerceCatalogue } from "@/lib/commerce/catalog";

test("published DB row maps into the same approved product model", () => {
  const product = mapPublishedProduct({ id: "db-1", slug: "satin-opera", name: "Satin Opera Glove", family: "opera-gloves", status: "active", material: "satin", length_cm: 60, finger_style: "full-finger", colors: ["white"], description: "Wholesale glove", image_urls: ["/api/media/products/glove.jpg"] });
  assert.equal(product?.status, "APPROVED");
  assert.equal(product?.productFamily, "opera-gloves");
  assert.equal(product?.primaryImage.path, "/api/media/products/glove.jpg");
  assert.equal(product?.material.status, "CONFIRMED");
  const canonical = mapPublishedProduct({ id: "db-canonical", slug: "canonical-media", name: "Canonical media", family: "opera-gloves", status: "active", image_urls: ["products/abc123.webp"] });
  assert.equal(canonical?.primaryImage.path, "/api/media/products/abc123.webp");
});

test("unpublished or untrusted rows never enter the public model", () => {
  assert.equal(mapPublishedProduct({ id: "db-2", slug: "draft", name: "Draft", family: "opera-gloves", status: "draft", image_urls: ["/api/media/products/a.jpg"] }), null);
  assert.equal(mapPublishedProduct({ id: "db-3", slug: "bad", name: "Bad", family: "unknown", image_urls: ["/api/media/products/a.jpg"] }), null);
  assert.equal(mapPublishedProduct({ id: "db-4", slug: "no-image", name: "No image", family: "opera-gloves", status: "active", image_urls: [] }), null);
});

test("catalog keeps the frozen fallback when DB loading is not explicitly enabled", async () => {
  const previous = process.env.COMMERCE_CATALOG_ENABLED;
  delete process.env.COMMERCE_CATALOG_ENABLED;
  const products = await getCommerceCatalogue("opera-gloves");
  assert.ok(products.length > 0);
  if (previous === undefined) delete process.env.COMMERCE_CATALOG_ENABLED; else process.env.COMMERCE_CATALOG_ENABLED = previous;
});
