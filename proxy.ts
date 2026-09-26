import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const crawlerPatterns: Array<[string, RegExp]> = [
  ["googlebot", /googlebot/i],
  ["google-inspection-tool", /google-inspectiontool/i],
  ["googleother", /googleother/i],
  ["bingbot", /bingbot/i],
  ["duckduckbot", /duckduckbot/i],
  ["slurp", /slurp/i],
  ["yandex", /yandex/i],
  ["baiduspider", /baiduspider/i],
];

/**
 * Emit a privacy-safe marker that lets Vercel runtime logs answer which
 * crawler requested which route. Vercel's own request row remains the source
 * for the final status and latency; this marker never records query strings,
 * IP addresses, cookies or request bodies.
 */
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const crawler = crawlerPatterns.find(([, pattern]) => pattern.test(userAgent));
  if (crawler) {
    console.info(JSON.stringify({
      event: "search_crawler_request",
      crawler: crawler[0],
      method: request.method,
      path: request.nextUrl.pathname,
      host: request.nextUrl.host,
      timestamp: new Date().toISOString(),
    }));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image).*)"],
};
