import test from "node:test";
import assert from "node:assert/strict";
import { mapPublishedProduct, getCommerceCatalogue } from "@/lib/commerce/catalog";
import { displayColors } from "@/lib/product-display";

test("published DB row maps into the same approved product model", () => {
  const product = mapPublishedProduct({ id: "db-1", slug: "satin-opera", name: "Satin Opera Glove", family: "opera-gloves", status: "active", material: "satin", length_cm: 60, finger_style: "full-finger", colors: ["white"], description: "Wholesale glove", image_urls: ["/api/media/products/glove.jpg"], sub_style: ["long", "satin"], occasion: ["formalwear"], decoration: ["bow"], age_group: "adult", customizable_fields: ["color", "logo"], featured: true, sort_order: 4 });
  assert.equal(product?.status, "APPROVED");
  assert.equal(product?.productFamily, "opera-gloves");
  assert.equal(product?.primaryImage.path, "/api/media/products/glove.jpg");
  assert.equal(product?.material.status, "CONFIRMED");
  assert.deepEqual(product?.subStyle, ["long", "satin"]);
  assert.deepEqual(product?.occasion?.value, ["formalwear"]);
  assert.deepEqual(product?.decoration?.value, ["bow"]);
  assert.equal(product?.ageGroup?.value, "adult");
  assert.deepEqual(product?.customizableFields.map((field) => field.field), ["color", "logo"]);
  assert.equal(product?.featured, true);
  assert.equal(product?.sortOrder, 4);
  const canonical = mapPublishedProduct({ id: "db-canonical", slug: "canonical-media", name: "Canonical media", family: "opera-gloves", status: "active", image_urls: ["products/abc123.webp"] });
  assert.equal(canonical?.primaryImage.path, "/api/media/products/abc123.webp");
});

test("source colour evidence is rendered as English public copy", () => {
  const product = mapPublishedProduct({ id: "db-colour", slug: "colour-study", name: "Colour study", family: "bridal-gloves", status: "active", colors: ["红/黑/白/粉色"], image_urls: ["products/colour-study/image.webp"] });
  assert.deepEqual(displayColors(product!), ["Red", "Black", "White", "Pink"]);
});

test("unpublished or untrusted rows never enter the public model", () => {
  assert.equal(mapPublishedProduct({ id: "db-2", slug: "draft", name: "Draft", family: "opera-gloves", status: "draft", image_urls: ["/api/media/products/a.jpg"] }), null);
  assert.equal(mapPublishedProduct({ id: "db-3", slug: "bad", name: "Bad", family: "unknown", image_urls: ["/api/media/products/a.jpg"] }), null);
  assert.equal(mapPublishedProduct({ id: "db-4", slug: "no-image", name: "No image", family: "opera-gloves", status: "active", image_urls: [] }), null);
});

test("catalog never republishes stale local records when DB loading is disabled", async () => {
  const previous = process.env.COMMERCE_CATALOG_ENABLED;
  delete process.env.COMMERCE_CATALOG_ENABLED;
  const products = await getCommerceCatalogue("opera-gloves");
  assert.equal(products.length, 0);
  if (previous === undefined) delete process.env.COMMERCE_CATALOG_ENABLED; else process.env.COMMERCE_CATALOG_ENABLED = previous;
});
