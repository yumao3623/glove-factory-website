import { NextResponse } from "next/server";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";
import { isSameOrigin, validEmail, validPassword } from "@/lib/commerce/auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string };
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ configured: false, error: `Missing Supabase configuration: ${missing.join(", ")}` }, { status: 503 });
  if (!validEmail(body.email) || !validPassword(body.password)) return NextResponse.json({ error: "Enter a valid email and a password of at least 8 characters." }, { status: 400 });
  const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: config.supabaseAnonKey!, "Content-Type": "application/json" }, body: JSON.stringify({ email: body.email, password: body.password }) });
  const data = await response.json() as { access_token?: string; refresh_token?: string; error_description?: string };
  if (!response.ok) return NextResponse.json({ configured: true, error: data.error_description ?? "Sign in failed." }, { status: 401 });
  const result = NextResponse.json({ configured: true, ok: true });
  result.cookies.set("sm_access_token", data.access_token!, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 3600 });
  result.cookies.set("sm_refresh_token", data.refresh_token!, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return result;
}
