import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { previewRobots, previewRobotsHeader, siteMode } from "../lib/stakeholder-preview";
import { POST } from "../app/api/rfq/route";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

test("preview mode is explicit and fail-closed for indexing", () => {
  assert.equal(siteMode, "STAKEHOLDER_PREVIEW");
  assert.equal(previewRobots.index, false);
  assert.equal(previewRobots.follow, false);
  assert.equal(previewRobotsHeader, "noindex, nofollow, noarchive, noimageindex");
  assert.match(read("next.config.ts"), /X-Robots-Tag/);
  assert.doesNotMatch(read("app/robots.ts"), /sitemap/);
});

test("preview RFQ rejects before reading the request body", async () => {
  const request = { json: async () => { throw new Error("body must not be read"); } } as unknown as Request;
  const response = await POST(request);
  assert.equal(response.status, 503);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
  assert.match(await response.text(), /No data was collected or stored/);
});

test("preview RFQ UI has no form controls or client submission", () => {
  const source = read("components/marketing/rfq-form.tsx");
  assert.doesNotMatch(source, /<form|<input|fetch\(/);
});
