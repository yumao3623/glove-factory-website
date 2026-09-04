import type { NextConfig } from "next";
import { previewRobotsHeader } from "./lib/stakeholder-preview";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: previewRobotsHeader }] }];
  },
};

export default nextConfig;
