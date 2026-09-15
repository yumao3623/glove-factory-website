import { NextResponse } from "next/server";
import { createStripeCheckoutSession } from "@/lib/commerce/stripe-rest";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { orderId?: string; lineItems?: Array<{ name?: string; quantity?: number; unitAmountMinor?: number; currency?: string }> } | null;
  if (!body?.orderId || !Array.isArray(body.lineItems) || !body.lineItems.length) return NextResponse.json({ error: "orderId and lineItems are required" }, { status: 400 });
  const items = body.lineItems.map((x) => ({ name: String(x.name ?? "Glove order"), quantity: Math.max(1, Math.floor(Number(x.quantity))), unitAmountMinor: Math.max(0, Math.floor(Number(x.unitAmountMinor))), currency: String(x.currency ?? "USD") }));
  if (items.some((x) => !Number.isFinite(x.quantity) || !Number.isFinite(x.unitAmountMinor))) return NextResponse.json({ error: "Invalid line item" }, { status: 400 });
  const result = await createStripeCheckoutSession({ orderId: body.orderId, lineItems: items });
  return result.configured && "url" in result ? NextResponse.json(result) : NextResponse.json(result, { status: 503 });
}
