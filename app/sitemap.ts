import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/products/", "/bridal-gloves/", "/opera-gloves/", "/costume-gloves/", "/kids-dress-gloves/", "/wedding-veils/", "/arm-sleeves/"].map((path) => ({ url: canonicalUrl(path).toString(), lastModified: new Date("2026-09-01"), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 })); }
