import type { MetadataRoute } from "next";
import { getIndexableProductSlugs } from "@/data/seo-index";
import { canonicalUrl } from "@/lib/site";
import { isIndexableProduction } from "@/lib/stakeholder-preview";

// Keep this release timestamp stable. Generating `new Date()` on every request
// would send a false freshness signal to crawlers.
const releaseLastModified = new Date("2026-09-27T00:00:00.000Z");

const corePaths = [
  "/",
  "/products/",
  "/bridal-gloves/",
  "/opera-gloves/",
  "/costume-gloves/",
  "/kids-dress-gloves/",
  "/wedding-veils/",
  "/arm-sleeves/",
  "/custom-manufacturing/",
  "/factory/",
  "/contact/",
  "/guides/materials/",
  "/guides/size-guide/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = isIndexableProduction
    ? [...corePaths, ...getIndexableProductSlugs().map((slug) => `/products/${slug}/`)]
    : corePaths.slice(0, 2);

  return paths.map((path) => ({
    url: canonicalUrl(path).toString(),
    lastModified: releaseLastModified,
    changeFrequency: path.startsWith("/products/") ? "weekly" : path.startsWith("/guides/") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/products/") ? 0.7 : path.startsWith("/guides/") ? 0.6 : 0.8,
  }));
}
