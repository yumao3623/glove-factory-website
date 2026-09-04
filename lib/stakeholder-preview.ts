import type { Metadata } from "next";

export const siteMode = "STAKEHOLDER_PREVIEW" as const;

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
