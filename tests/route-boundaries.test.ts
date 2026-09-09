import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { families } from "../data/families";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

test("implements only this checkpoint's approved public routes", () => {
  for (const path of ["app/page.tsx", "app/products/page.tsx", "app/bridal-gloves/page.tsx", "app/opera-gloves/page.tsx", "app/costume-gloves/page.tsx", "app/kids-dress-gloves/page.tsx", "app/wedding-veils/page.tsx", "app/wedding-gloves/page.tsx", "app/not-found.tsx", "app/robots.ts", "app/sitemap.ts"]) assert.ok(existsSync(resolve(root, path)), path);
  for (const excluded of ["lace-gloves", "mesh-gloves", "fingerless-gloves", "wholesale-gloves"]) assert.equal(existsSync(resolve(root, "app", excluded)), false, excluded);
});

test("keeps the legacy wedding-gloves alias as a one-hop permanent redirect", () => {
  const route = read("app/wedding-gloves/page.tsx");
  assert.match(route, /permanentRedirect\("\/bridal-gloves\/"\)/);
});

test("sitemap includes only implemented indexable owners", () => {
  const sitemap = read("app/sitemap.ts");
  for (const included of ["\"/\"", "\"/products/\"", "\"/bridal-gloves/\"", "\"/opera-gloves/\"", "\"/costume-gloves/\"", "\"/kids-dress-gloves/\"", "\"/wedding-veils/\""]) assert.ok(sitemap.includes(included));
  for (const excluded of ["wedding-gloves", "lace-gloves", "wholesale-gloves"]) assert.equal(sitemap.includes(excluded), false, excluded);
});

test("available families expose their canonical collection route", () => {
  for (const family of families.filter((entry) => entry.availableNow)) assert.ok(family.route, family.slug);
  assert.equal(families.find((entry) => entry.slug === "costume-gloves")?.route, "/costume-gloves/");
});
