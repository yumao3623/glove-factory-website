import type { NextConfig } from "next";
import { isIndexableProduction, siteRobotsHeader } from "./lib/stakeholder-preview";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return isIndexableProduction ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: siteRobotsHeader }] }];
  },
};

export default nextConfig;
