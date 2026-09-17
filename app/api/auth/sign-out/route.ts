import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/commerce/auth";
import { cookies } from "next/headers";
import { getCommerceConfig } from "@/lib/commerce/config";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const token = (await cookies()).get("sm_access_token")?.value;
  const config = getCommerceConfig();
  if (token && config.supabaseUrl && config.supabaseAnonKey) {
    try { await fetch(`${config.supabaseUrl}/auth/v1/logout?scope=local`, { method: "POST", headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${token}` } }); } catch { /* Always clear this browser's cookies, including during a provider outage. */ }
  }
  const response = NextResponse.json({ ok: true });
  for (const name of ["sm_access_token", "sm_refresh_token", "sm_recovery_token", "sm_quote_access"]) response.cookies.delete(name);
  return response;
}
