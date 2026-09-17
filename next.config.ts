import type { NextConfig } from "next";
import { isIndexableProduction, siteRobotsHeader } from "./lib/stakeholder-preview";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    if (isIndexableProduction) return [];
    const previewHeader = { key: "X-Robots-Tag", value: siteRobotsHeader };
    const machineEntryHeader = { key: "X-Robots-Tag", value: "all" };
    return [
      { source: "/:path*", headers: [previewHeader] },
      { source: "/robots.txt", headers: [machineEntryHeader] },
      { source: "/sitemap.xml", headers: [machineEntryHeader] },
      { source: "/google14a276efa04bb12e.html", headers: [machineEntryHeader] },
    ];
  },
};

export default nextConfig;
