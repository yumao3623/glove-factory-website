import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";
import { isCostumeIndexable } from "@/lib/stakeholder-preview";

export default function sitemap(): MetadataRoute.Sitemap { const paths = ["/", "/products/", "/bridal-gloves/", "/opera-gloves/", "/kids-dress-gloves/", "/wedding-veils/", "/arm-sleeves/", "/guides/materials/", "/guides/size-guide/"]; if (isCostumeIndexable) paths.splice(4, 0, "/costume-gloves/"); return paths.map((path) => ({ url: canonicalUrl(path).toString(), lastModified: new Date("2026-09-18"), changeFrequency: "monthly", priority: path === "/" ? 1 : path.startsWith("/guides/") ? 0.6 : 0.8 })); }
