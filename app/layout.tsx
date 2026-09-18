import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { canonicalUrl, getSiteOrigin } from "@/lib/site";
import { siteRobots } from "@/lib/stakeholder-preview";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteOrigin(),
  title: { default: "Occasion Gloves & Wedding Veils Manufacturer", template: "%s | JS Meilai" },
  description: "A focused B2B range of occasion gloves and wedding veils for sourcing conversations.",
  robots: siteRobots,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JS Meilai",
    url: canonicalUrl("/").toString(),
  };
  return <html lang="en" data-scroll-behavior="smooth"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /><LocaleProvider><SkipLink /><SiteHeader />{children}<SiteFooter /></LocaleProvider></body></html>;
}
