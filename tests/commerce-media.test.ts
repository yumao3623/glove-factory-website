import test from "node:test";
import assert from "node:assert/strict";
import { signedStorageUrl } from "@/lib/commerce/media";

test("relative storage signatures resolve to Supabase storage, never the storefront", () => {
  const origin = "https://project.supabase.co";
  assert.equal(signedStorageUrl(origin, "/object/sign/product-media/products/test.webp?token=test").href,
    `${origin}/storage/v1/object/sign/product-media/products/test.webp?token=test`);
  assert.equal(signedStorageUrl(origin, "object/sign/product-media/products/test.webp?token=test").host, "project.supabase.co");
  assert.throws(() => signedStorageUrl(origin, "https://other.example/steal"));
});
