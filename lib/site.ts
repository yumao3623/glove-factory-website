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

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  const canonical = canonicalUrl(pathname);
  const shareImage = new URL("/icon.svg", getSiteOrigin()).toString();
  return {
    title,
    description,
    robots: siteRobots,
    alternates: { canonical: canonical.toString() },
    openGraph: { title, description, url: canonical.toString(), siteName: "JS Meilai", type: "website", locale: "en_US", images: [{ url: shareImage, width: 64, height: 64, alt: "JS Meilai logo" }] },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}
