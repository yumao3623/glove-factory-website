import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sm_access_token")?.value;
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ authenticated: false, configured: false, error: `Missing Supabase configuration: ${missing.join(", ")}` }, { status: 503 });
  const response = token ? await fetch(`${config.supabaseUrl}/auth/v1/user`, { headers: { apikey: config.supabaseAnonKey!, Authorization: `Bearer ${token}` }, cache: "no-store" }) : new Response(null, { status: 401 });
  if (!response.ok) {
    const refresh = cookieStore.get("sm_refresh_token")?.value;
    if (!refresh) return NextResponse.json({ authenticated: false }, { status: 401 });
    const refreshed = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: config.supabaseAnonKey!, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: refresh }) });
    if (!refreshed.ok) return NextResponse.json({ authenticated: false }, { status: 401 });
    const tokens = await refreshed.json() as { access_token?: string; refresh_token?: string };
    if (!tokens.access_token) return NextResponse.json({ authenticated: false }, { status: 401 });
    const userResponse = await fetch(`${config.supabaseUrl}/auth/v1/user`, { headers: { apikey: config.supabaseAnonKey!, Authorization: `Bearer ${tokens.access_token}` }, cache: "no-store" });
    if (!userResponse.ok) return NextResponse.json({ authenticated: false }, { status: 401 });
    const result = NextResponse.json(sessionPayload(await userResponse.json(), true));
    result.cookies.set("sm_access_token", tokens.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 3600 });
    if (tokens.refresh_token) result.cookies.set("sm_refresh_token", tokens.refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    return result;
  }
  return NextResponse.json(sessionPayload(await response.json(), false));
}

function sessionPayload(user: { id: string; email?: string; email_confirmed_at?: string }, refreshed: boolean) {
  const allowed = (process.env.ADMIN_EMAILS ?? "").split(",").map(value => value.trim().toLowerCase());
  return { authenticated: true, user: { id: user.id, email: user.email }, refreshed, isAdmin: Boolean(user.email_confirmed_at && user.email && allowed.includes(user.email.toLowerCase())) };
}
