import type { Metadata } from "next";
import { siteRobots } from "@/lib/stakeholder-preview";

const developmentOrigin = "http://localhost:3000";

export function getSiteOrigin(): URL {
  const suppliedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL((suppliedOrigin ?? developmentOrigin).replace(/\/+$/, "") + "/");
}

export function canonicalUrl(pathname: string): URL {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  return new URL(path, getSiteOrigin());
}

export const siteOrganization = {
  "@type": "Organization",
  "@id": `${canonicalUrl("/").toString()}#organization`,
  name: "JS Meilai",
  legalName: "江山市美来服饰厂",
  url: canonicalUrl("/").toString(),
  email: "yumao3623@gmail.com",
  telephone: "+60 1114166916",
  address: {
    "@type": "PostalAddress",
    streetAddress: "37 Quantang Road, Quantang Village, Shimen Town",
    addressLocality: "Jiangshan",
    addressRegion: "Zhejiang",
    addressCountry: "CN",
  },
};

type PageMetadataOptions = {
  image?: string;
  imageAlt?: string;
};

export function pageMetadata(title: string, description: string, pathname: string, options: PageMetadataOptions = {}): Metadata {
  const canonical = canonicalUrl(pathname);
  const shareImage = new URL(options.image ?? "/opengraph-image/", getSiteOrigin()).toString();
  return {
    title,
    description,
    robots: siteRobots,
    alternates: { canonical: canonical.toString() },
    openGraph: { title, description, url: canonical.toString(), siteName: "JS Meilai", type: "website", locale: "en_US", images: [{ url: shareImage, width: 1200, height: 630, alt: options.imageAlt ?? "JS Meilai occasion gloves and bridal accessories" }] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
