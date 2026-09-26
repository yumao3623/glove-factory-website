import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site";
import { isIndexableProduction } from "@/lib/stakeholder-preview";

export default function robots(): MetadataRoute.Robots {
  return {
    // Product imagery is delivered through the read-only media gateway. Keep
    // private APIs blocked while explicitly allowing that crawlable asset path.
    rules: { userAgent: "*", allow: ["/", "/api/media/"], disallow: ["/api/", "/404/", "/admin/", "/account/", "/cart/", "/checkout/"] },
    ...(isIndexableProduction ? { sitemap: new URL("/sitemap.xml", getSiteOrigin()).toString() } : {}),
  };
}
