#!/usr/bin/env node

/**
 * Small dependency-free crawl guard for the JS Meilai 2.2 SEO checkpoint.
 *
 * It deliberately checks the URLs the site publishes in sitemap.xml instead
 * of guessing routes. Run it against a local server or the production host:
 *
 *   node scripts/seo-audit.mjs --origin http://localhost:3000 --mode preview
 *   node scripts/seo-audit.mjs --origin https://www.jsmeilai.com --mode production
 */

const args = process.argv.slice(2);
const valueFor = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1] ?? fallback;
};
const origin = valueFor("--origin", "http://localhost:3000").replace(/\/+$/, "");
const mode = valueFor("--mode", "preview");
const jsonPath = valueFor("--json", "");
if (!new URL(origin).protocol.startsWith("http")) throw new Error("--origin must be an http(s) URL");
if (!['preview', 'production'].includes(mode)) throw new Error("--mode must be preview or production");

const failures = [];
const warnings = [];
const checked = [];
const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);

async function request(path, { reportError = true } = {}) {
  const parsedPath = new URL(path, `${origin}/`);
  const localPath = mode === "preview" && parsedPath.origin !== origin ? `${parsedPath.pathname}${parsedPath.search}` : parsedPath.toString();
  const url = new URL(localPath, `${origin}/`);
  try {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(8000), headers: { "user-agent": "jsmeilai-seo-audit/2.2" } });
    return { url: url.toString(), response, body: await response.text() };
  } catch (error) {
    if (reportError) fail(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
}

async function checkPage(result, expectedUrl) {
  if (!result) return;
  const { response, body, url } = result;
  checked.push(url);
  if (response.status !== 200) {
    fail(`${url}: expected 200, got ${response.status}`);
    return;
  }
  const title = body.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
  const description = body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? "";
  const canonical = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1] ?? "";
  const h1Count = (body.match(/<h1\b/gi) ?? []).length;
  const ogTitle = body.match(/<meta[^>]+property=["']og:title["'][^>]+content=["'][^"']+["']/i);
  const ogUrl = body.match(/<meta[^>]+property=["']og:url["'][^>]+content=["'][^"']+["']/i);
  const jsonLdCount = (body.match(/<script[^>]+type=["']application\/ld\+json["']/gi) ?? []).length;
  const images = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (!title) fail(`${url}: missing title`);
  if (!description) fail(`${url}: missing meta description`);
  if (!canonical) fail(`${url}: missing canonical`);
  if (canonical && new URL(canonical, url).toString() !== expectedUrl) warn(`${url}: canonical is ${new URL(canonical, url).toString()}`);
  if (h1Count !== 1) fail(`${url}: expected one H1, got ${h1Count}`);
  if (!ogTitle || !ogUrl) warn(`${url}: Open Graph title/url is incomplete`);
  if (!jsonLdCount) warn(`${url}: no JSON-LD found`);
  if (images.some((image) => !/\balt=["'][^"']*["']/i.test(image))) fail(`${url}: image without alt text`);
  const internalLinks = [...new Set([...body.matchAll(/href=["'](\/[A-Za-z0-9][^"'#?]*)/gi)].map((match) => match[1]))];
  const linkedTargets = internalLinks.filter((link) => !link.startsWith("/api/")).slice(0, 20);
  const linkedResults = await Promise.all(linkedTargets.map((link) => request(link, { reportError: false })));
  linkedResults.forEach((linked, index) => {
    if (linked && linked.response.status >= 400) fail(`${url}: internal link ${linkedTargets[index]} returned ${linked.response.status}`);
  });
  const noindex = /(?:noindex|nofollow)/i.test(body.match(/<meta[^>]+name=["']robots["'][^>]*>/i)?.[0] ?? "") || /noindex/i.test(response.headers.get("x-robots-tag") ?? "");
  if (mode === "production" && noindex) fail(`${url}: production page is noindex`);
  if (mode === "preview" && !noindex) warn(`${url}: preview page is not noindex`);
}

const robots = await request("/robots.txt");
if (robots) {
  if (robots.response.status !== 200) fail(`robots.txt: expected 200, got ${robots.response.status}`);
  if (!/User-Agent:/i.test(robots.body)) fail("robots.txt: missing User-agent rule");
  if (mode === "production" && !/Sitemap:\s*https:\/\/www\.jsmeilai\.com\/sitemap\.xml/i.test(robots.body)) fail("robots.txt: production sitemap declaration is missing");
}

const sitemap = await request("/sitemap.xml");
const sitemapUrls = sitemap ? extractUrls(sitemap.body) : [];
if (sitemap) {
  if (sitemap.response.status !== 200) fail(`sitemap.xml: expected 200, got ${sitemap.response.status}`);
  if (sitemapUrls.length === 0) fail("sitemap.xml: no URLs found");
  for (const url of sitemapUrls) {
    const parsed = new URL(url);
    const allowedOrigins = mode === "production" ? new Set(["https://www.jsmeilai.com"]) : new Set([origin, "https://www.jsmeilai.com"]);
    if (!allowedOrigins.has(parsed.origin)) fail(`sitemap.xml: non-canonical URL ${url}`);
    if (parsed.search) fail(`sitemap.xml: query URL ${url}`);
  }
}

for (const url of sitemapUrls) await checkPage(await request(url), url);

const report = { origin, mode, checkedAt: new Date().toISOString(), sitemapUrls, checkedPages: checked, warnings, failures };
if (jsonPath) await import("node:fs/promises").then(({ writeFile }) => writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`));
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
