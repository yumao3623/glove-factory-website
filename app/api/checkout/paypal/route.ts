import { NextResponse } from "next/server";
import { createPayPalOrder, paypalCheckoutEnabled } from "@/lib/commerce/paypal-rest";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { isSameOrigin } from "@/lib/commerce/auth";
import { authorizedQuote, isPayableQuote } from "@/lib/commerce/quotes";
import { getCommerceConfig } from "@/lib/commerce/config";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!paypalCheckoutEnabled()) return NextResponse.json({ error: "Online payment is not available yet. Please contact our team about your confirmed quote." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  try {
    const order = await authorizedQuote(String(body.orderId ?? ""));
    if (!order) return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    if (body.acceptedTerms !== true || !isPayableQuote(order)) return NextResponse.json({ error: "Review and accept a current confirmed quote before payment." }, { status: 409 });
    const base = getCommerceConfig().appUrl.replace(/\/$/, "");
    const result = await createPayPalOrder({ orderId: order.id, lines: order.order_items.map(item => ({ name: item.name, quantity: item.quantity, unitAmountMinor: item.unit_price_minor, currency: order.currency })), totalMinor: order.total_minor, shippingMinor: order.shipping_minor, taxMinor: order.tax_minor, returnUrl: `${base}/checkout/paypal/return/?orderId=${order.id}`, cancelUrl: `${base}/checkout/quote/${order.id}/?cancelled=1` });
    if (result.error || !("id" in result) || !result.id) return NextResponse.json({ error: result.error ?? "PayPal did not create an order." }, { status: 502 });
    const saved = await supabaseRest(`orders?id=eq.${order.id}&payment_status=eq.pending`, { method: "PATCH", body: JSON.stringify({ payment_provider: "paypal", paypal_order_id: result.id }) }, true);
    if (saved.error) return NextResponse.json({ error: "Could not save the payment reference. Please try again." }, { status: 502 });
    return NextResponse.json(result, { status: 201 });
  } catch { return NextResponse.json({ error: "Payment service is temporarily unavailable." }, { status: 503 }); }
}
