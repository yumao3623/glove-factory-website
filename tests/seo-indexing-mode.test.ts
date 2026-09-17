import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

function run(env: Record<string, string>) {
  const code = `const stakeholder = (await import('./lib/stakeholder-preview.ts')).default; const robotsModule = (await import('./app/robots.ts')).default; const sitemapModule = (await import('./app/sitemap.ts')).default; const robots = robotsModule.default; const sitemap = sitemapModule.default; console.log(JSON.stringify({ siteMode: stakeholder.siteMode, siteRobots: stakeholder.siteRobots, robots: robots(), sitemap: sitemap() }));`;
  const result = spawnSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e", code], { cwd: process.cwd(), env: { ...process.env, ...env }, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout) as { siteMode: string; siteRobots: { index: boolean }; robots: Record<string, unknown>; sitemap: Array<{ url: string }> };
}

test("formal indexing requires the exact canonical host", () => {
  const formal = run({ SEO_INDEXING_ENABLED: "true", NEXT_PUBLIC_SITE_URL: "https://www.jsmeilai.com", SEO_COSTUME_INDEXING_ENABLED: "false" });
  assert.equal(formal.siteMode, "FORMAL_PRODUCTION");
  assert.equal(formal.siteRobots.index, true);
  assert.equal(formal.robots.sitemap, "https://www.jsmeilai.com/sitemap.xml");
  assert.equal(formal.sitemap.some((item) => item.url.endsWith("/costume-gloves/")), false);
  assert.equal(formal.sitemap.some((item) => item.url.endsWith("/guides/materials/")), true);
  assert.equal(formal.sitemap.some((item) => item.url.endsWith("/guides/size-guide/")), true);

  const wrongHost = run({ SEO_INDEXING_ENABLED: "true", NEXT_PUBLIC_SITE_URL: "http://localhost:3000" });
  assert.equal(wrongHost.siteMode, "STAKEHOLDER_PREVIEW");
  assert.equal(wrongHost.siteRobots.index, false);
  assert.equal("sitemap" in wrongHost.robots, false);
});

test("the deferred costume collection requires its separate gate", () => {
  const gated = run({ SEO_INDEXING_ENABLED: "true", NEXT_PUBLIC_SITE_URL: "https://www.jsmeilai.com", SEO_COSTUME_INDEXING_ENABLED: "true" });
  assert.equal(gated.sitemap.some((item) => item.url.endsWith("/costume-gloves/")), true);
});
