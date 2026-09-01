import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/products/", "/bridal-gloves/"].map((path) => ({ url: canonicalUrl(path).toString(), lastModified: new Date("2026-08-31"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 })); }
