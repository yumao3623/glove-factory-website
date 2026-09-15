import { NextResponse } from "next/server";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";
import { isSameOrigin, validEmail, validPassword } from "@/lib/commerce/auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { email?: string; password?: string };
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ configured: false, error: `Missing Supabase configuration: ${missing.join(", ")}` }, { status: 503 });
  if (!validEmail(body.email) || !validPassword(body.password)) return NextResponse.json({ error: "Use a valid email and a password of at least 8 characters." }, { status: 400 });
  const response = await fetch(`${config.supabaseUrl}/auth/v1/signup`, { method: "POST", headers: { apikey: config.supabaseAnonKey!, "Content-Type": "application/json" }, body: JSON.stringify({ email: body.email, password: body.password }) });
  const data = await response.json() as { id?: string; error_description?: string; user?: { id: string } };
  if (!response.ok) return NextResponse.json({ configured: true, error: "We could not create the account. If this email was used before, sign in or request a new confirmation email." }, { status: 400 });
  return NextResponse.json({ configured: true, ok: true, userId: data.user?.id ?? data.id, message: "Check your email to confirm your account." });
}
