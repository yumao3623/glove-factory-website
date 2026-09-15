import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

export async function GET(request: Request, context: { params: Promise<{ provider: string }> }) {
  const { provider } = await context.params;
  if (provider !== "google") return NextResponse.json({ error: "Unsupported provider." }, { status: 400 });
  if (process.env.GOOGLE_AUTH_ENABLED !== "true") return NextResponse.json({ error: "Google sign-in is not available yet. Please use email and password." }, { status: 503 });
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ configured: false, error: `Missing Supabase configuration: ${missing.join(", ")}` }, { status: 503 });
  const redirectTo = new URL("/api/auth/callback", request.url).toString();
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  const url = `${config.supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}&code_challenge=${challenge}&code_challenge_method=S256`;
  const response = NextResponse.redirect(url);
  response.cookies.set("sm_pkce_verifier", verifier, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 600 });
  return response;
}
