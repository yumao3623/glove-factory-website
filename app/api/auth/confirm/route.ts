import { NextResponse } from "next/server";
import { getCommerceConfig } from "@/lib/commerce/config";
import { isSameOrigin } from "@/lib/commerce/auth";
import { clientAddress, consumeLimit } from "@/lib/commerce/request-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (typeof body.token_hash !== "string" || !/^[a-f0-9]{32,128}$/i.test(body.token_hash) || !["signup", "invite", "recovery", "email"].includes(body.type)) return NextResponse.json({ error: "This account link is invalid." }, { status: 400 });
  const c = getCommerceConfig();
  if (!c.supabaseUrl || !c.supabaseAnonKey) return NextResponse.json({ error: "Account service unavailable." }, { status: 503 });
  try {
    const rate = await consumeLimit("account-confirm", clientAddress(request), 15, 600);
    if (!rate.allowed) return NextResponse.json({ error: "Please try again later." }, { status: rate.available ? 429 : 503 });
    const verified = await fetch(`${c.supabaseUrl}/auth/v1/verify`, { method: "POST", headers: { apikey: c.supabaseAnonKey, "Content-Type": "application/json" }, body: JSON.stringify({ token_hash: body.token_hash, type: body.type }) });
    const data = await verified.json();
    if (!verified.ok || !data.access_token || !data.refresh_token) return NextResponse.json({ error: "This link has expired or was already used. Request a new email." }, { status: 400 });
    const reset = body.type === "invite" || body.type === "recovery";
    const response = NextResponse.json({ next: reset ? "/account/reset-password/" : "/account/" }, { headers: { "Cache-Control": "no-store" } });
    const options = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/" };
    if (reset) {
      response.cookies.set("sm_recovery_token", data.access_token, { ...options, maxAge: 900 });
      response.cookies.delete("sm_access_token"); response.cookies.delete("sm_refresh_token");
    } else {
      response.cookies.set("sm_access_token", data.access_token, { ...options, maxAge: 3600 });
      response.cookies.set("sm_refresh_token", data.refresh_token, { ...options, maxAge: 60 * 60 * 24 * 30 });
    }
    return response;
  } catch { return NextResponse.json({ error: "Unable to verify this link. Please try again." }, { status: 503 }); }
}
