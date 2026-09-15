import test from "node:test";
import assert from "node:assert/strict";
import { validateProductInput } from "@/lib/commerce/admin";

test("admin product input whitelists fields and accepts private media paths", () => {
  const result = validateProductInput({ name: "Opera glove", slug: "opera-glove", family: "opera-gloves", image_urls: ["products/opera/front.webp"] });
  assert.deepEqual(result.errors, []);
  assert.equal("image_url" in result.payload, false);
  assert.deepEqual(result.payload.image_urls, ["products/opera/front.webp"]);
});

test("admin product input rejects unsupported families and traversal", () => {
  const result = validateProductInput({ name: "Draft", slug: "draft", family: "unknown", image_urls: ["products/../secret.webp"] });
  assert.ok(result.errors.length >= 2);
});
