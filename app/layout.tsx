import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { getSiteOrigin } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: getSiteOrigin(),
  title: { default: "Occasion Gloves & Wedding Veils Manufacturer", template: "%s | JS Meilai" },
  description: "A focused B2B range of occasion gloves and wedding veils for sourcing conversations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><SkipLink /><SiteHeader />{children}<SiteFooter /></body></html>;
}
