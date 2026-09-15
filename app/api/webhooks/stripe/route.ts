import { NextResponse } from "next/server";
import { verifyStripeSignature } from "@/lib/commerce/stripe-rest";
export async function POST(request: Request) {
  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get("stripe-signature"))) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  const event = JSON.parse(payload) as { type?: string };
  if (!["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(event.type ?? "")) return NextResponse.json({ received: true });
  return NextResponse.json({ received: true, handled: event.type });
}
