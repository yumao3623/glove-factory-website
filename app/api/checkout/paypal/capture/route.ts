import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/commerce/auth";
import { authorizedQuote } from "@/lib/commerce/quotes";
import { capturePayPalOrder, paypalAmountMinor, paypalCheckoutEnabled } from "@/lib/commerce/paypal-rest";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  if (!paypalCheckoutEnabled()) return NextResponse.json({ error: "Online payment is not enabled." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  try {
    const order = await authorizedQuote(String(body.orderId ?? ""));
    if (!order || !order.paypal_order_id || body.paypalOrderId !== order.paypal_order_id) return NextResponse.json({ error: "Payment reference does not match your quote." }, { status: 404 });
    if (order.payment_status === "paid") return NextResponse.json({ paid: true });
    if (order.payment_status !== "pending" || order.quote_status !== "approved" || order.fulfillment_status === "cancelled") return NextResponse.json({ error: "This order is not payable. Please contact our team." }, { status: 409 });
    const result = await capturePayPalOrder(order.paypal_order_id);
    if (result.error || !("capture" in result) || !result.capture?.id) return NextResponse.json({ error: result.error ?? "Payment confirmation is pending. Contact us before trying again." }, { status: 502 });
    if (result.status !== "COMPLETED" || result.capture.status !== "COMPLETED") return NextResponse.json({ paid: false, message: "PayPal is still reviewing this payment. Your order is not marked paid." }, { status: 202 });
    const amount = paypalAmountMinor(result.capture.amount);
    if (amount !== order.total_minor || result.capture.amount?.currency_code !== order.currency) return NextResponse.json({ error: "Payment total needs review. Contact our team." }, { status: 409 });
    const saved = await supabaseRest("rpc/apply_paypal_capture", { method: "POST", body: JSON.stringify({ p_order_id: order.id, p_paypal_order: order.paypal_order_id, p_capture: result.capture.id, p_event: `capture:${result.capture.id}`, p_amount: amount, p_currency: order.currency }) }, true);
    if (saved.error || saved.data !== true) return NextResponse.json({ error: "Payment received by PayPal; order confirmation needs review. Do not pay again." }, { status: 502 });
    return NextResponse.json({ paid: true });
  } catch { return NextResponse.json({ error: "Unable to confirm the payment. Contact our team before trying again." }, { status: 503 }); }
}
