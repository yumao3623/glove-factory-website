import type { Metadata } from "next";

/** Indexing is an explicit release switch and remains fail-closed by default. */
const configuredSiteOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
export const siteMode: "FORMAL_PRODUCTION" | "STAKEHOLDER_PREVIEW" = process.env.SEO_INDEXING_ENABLED === "true" && configuredSiteOrigin === "https://www.jsmeilai.com" ? "FORMAL_PRODUCTION" : "STAKEHOLDER_PREVIEW";
export const isIndexableProduction = siteMode === "FORMAL_PRODUCTION";
export const isCostumeIndexable = isIndexableProduction && process.env.SEO_COSTUME_INDEXING_ENABLED === "true";

export const previewRobots = {
  index: false,
  follow: false,
  noarchive: true,
  noimageindex: true,
  googleBot: {
    index: false,
    follow: false,
    noarchive: true,
    noimageindex: true,
  },
} satisfies Exclude<Metadata["robots"], string | null | undefined>;

export const previewRobotsHeader = "noindex, nofollow, noarchive, noimageindex";
export const noindexRobots = previewRobots;
export const facetRobots = { index: false, follow: true, noarchive: true, noimageindex: true, googleBot: { index: false, follow: true, noarchive: true, noimageindex: true } } satisfies Exclude<Metadata["robots"], string | null | undefined>;

export const indexableRobots = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
} satisfies Exclude<Metadata["robots"], string | null | undefined>;

export const siteRobots = isIndexableProduction ? indexableRobots : previewRobots;
export const siteRobotsHeader = isIndexableProduction ? "all" : previewRobotsHeader;
