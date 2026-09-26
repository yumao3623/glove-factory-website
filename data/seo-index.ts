import { getApprovedCatalogueProductBySlug } from "@/data/approved-catalogue";

/**
 * The first public PDP tranche is intentionally curated instead of exposing
 * every approved record to search engines at once. Catalogue browsing can
 * still show the full approved set; only these pages are promoted to the
 * indexable SEO surface until the remaining records have reviewed copy.
 */
const firstPdpSlugs = [
  "bridal-gloves-sheer-lace-long-001",
  "bridal-gloves-728908046635",
  "bridal-gloves-735814134529",
  "bridal-gloves-776820765686",
  "opera-gloves-730186552239",
  "opera-gloves-844530638864",
  "opera-gloves-satin-short-001",
  "opera-gloves-729142545579",
  "kids-dress-gloves-satin-bow-001",
  "kids-dress-gloves-728772172182",
  "wedding-veils-black-lace-trim-001",
  "costume-gloves-962080651234",
  "costume-gloves-732732478288",
  "bridal-gloves-857043957533",
  "bridal-gloves-761321664860",
] as const;

export function getIndexableProductSlugs(): readonly string[] {
  return firstPdpSlugs.filter((slug) => Boolean(getApprovedCatalogueProductBySlug(slug)));
}

export function isIndexableProductSlug(slug: string): boolean {
  return getIndexableProductSlugs().includes(slug);
}
