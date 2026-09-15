import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL("/account/", request.url));
  const fail = (reason: string) => {
    const failed = NextResponse.redirect(new URL(`/account/?auth_error=${reason}`, request.url));
    failed.cookies.delete("sm_pkce_verifier");
    return failed;
  };
  const code = url.searchParams.get("code");
  // Supabase PKCE callbacks exchange a short-lived code server-side. Never
  // accept access or refresh tokens from query parameters (token injection).
  if (!code) {
    response.cookies.delete("sm_pkce_verifier");
    return fail("missing_code");
  }
  let access: string | null = null;
  let refresh: string | null = null;
  if (code) {
    const config = getCommerceConfig();
    const verifier = (await cookies()).get("sm_pkce_verifier")?.value;
    if (!missingConfig(config.supabaseUrl, config.supabaseAnonKey).length && verifier) {
      const tokenResponse = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=pkce`, { method: "POST", headers: { apikey: config.supabaseAnonKey!, "Content-Type": "application/json" }, body: JSON.stringify({ auth_code: code, code_verifier: verifier }) });
      if (!tokenResponse.ok) return fail("exchange_failed");
      const token = await tokenResponse.json() as { access_token?: string; refresh_token?: string };
      access = token.access_token ?? null; refresh = token.refresh_token ?? null;
    }
  }
  if (!access || !refresh) return fail("exchange_failed");
  response.cookies.set("sm_access_token", access, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 3600 });
  response.cookies.set("sm_refresh_token", refresh, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
  response.cookies.delete("sm_pkce_verifier");
  return response;
}
