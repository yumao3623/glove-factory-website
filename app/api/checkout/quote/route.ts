import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/commerce/auth";
import { authorizedQuote, publicQuote } from "@/lib/commerce/quotes";
import { paypalCheckoutEnabled } from "@/lib/commerce/paypal-rest";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  try {
    const order = await authorizedQuote(String(body.orderId ?? ""), typeof body.access === "string" ? body.access : undefined);
    if (!order) return NextResponse.json({ error: "Quote not found. Open the full link from our team, or sign in to the buyer account." }, { status: 404 });
    const response = NextResponse.json({ quote: publicQuote(order), paymentsEnabled: paypalCheckoutEnabled() }, { headers: { "Cache-Control": "no-store" } });
    if (body.access) response.cookies.set("sm_quote_access", `${order.id}.${body.access}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 86400 });
    return response;
  } catch { return NextResponse.json({ error: "Quote service is temporarily unavailable." }, { status: 503 }); }
}
