import type { Metadata } from "next";
import { previewRobots } from "@/lib/stakeholder-preview";

const developmentOrigin = "http://localhost:3000";

export function getSiteOrigin(): URL {
  const suppliedOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(suppliedOrigin ?? developmentOrigin);
}

export function canonicalUrl(pathname: string): URL {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  return new URL(path, getSiteOrigin());
}

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    robots: previewRobots,
    alternates: { canonical: canonicalUrl(pathname).pathname },
  };
}
