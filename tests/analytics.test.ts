import assert from "node:assert/strict";
import test from "node:test";
import { attributionKeys, readAttribution } from "@/lib/analytics";

test("attribution reader keeps approved campaign fields and page path", () => {
  const result = readAttribution("?utm_source=linkedin&utm_campaign=autumn%20buyers&utm_medium=social&ignored=secret", "/custom-manufacturing/");
  assert.deepEqual(result, {
    utm_source: "linkedin",
    utm_medium: "social",
    utm_campaign: "autumn buyers",
    landing_page: "/custom-manufacturing/",
  });
  assert.deepEqual(attributionKeys, ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);
});

test("attribution reader fails closed for blank or oversized values", () => {
  const result = readAttribution("?utm_source=%20&utm_term=" + "x".repeat(300), "");
  assert.equal(result.utm_source, undefined);
  assert.equal(result.utm_term?.length, 160);
  assert.equal(result.landing_page, "/");
});
