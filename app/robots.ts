import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";
import { isIndexableProduction } from "@/lib/stakeholder-preview";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/404/", "/admin/", "/account/", "/cart/", "/checkout/"] },
    ...(isIndexableProduction ? { sitemap: new URL("/sitemap.xml", getSiteOrigin()).toString() } : {}),
  };
}
