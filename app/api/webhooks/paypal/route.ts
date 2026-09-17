import { NextResponse } from "next/server";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { verifyPayPalWebhook, paypalAmountMinor, getPayPalCapture } from "@/lib/commerce/paypal-rest";

type Order = { id: string; currency: string; total_minor: number; paypal_order_id: string; paypal_capture_id: string; payment_status: string };
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 100000) return NextResponse.json({ received: false }, { status: 413 });
  try {
    const rawBody = await request.text();
    const result = await verifyPayPalWebhook(rawBody, { authAlgo: request.headers.get("paypal-auth-algo"), certUrl: request.headers.get("paypal-cert-url"), transmissionId: request.headers.get("paypal-transmission-id"), transmissionSig: request.headers.get("paypal-transmission-sig"), transmissionTime: request.headers.get("paypal-transmission-time") });
    if (!result.verified) return NextResponse.json({ received: false, error: result.error }, { status: result.configured ? 400 : 503 });
    const event = result.event; const resource = event.resource ?? {};
    if (!event.id) return NextResponse.json({ received: false }, { status: 400 });
    const related = (resource.supplementary_data as { related_ids?: { order_id?: string; capture_id?: string } } | undefined)?.related_ids;
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const reference = related?.order_id;
      if (!reference || !/^[A-Z0-9-]{5,80}$/i.test(reference) || typeof resource.id !== "string") return NextResponse.json({ received: false }, { status: 400 });
      const found = await supabaseRest<Order[]>(`orders?select=id,currency,total_minor,paypal_order_id,payment_status&paypal_order_id=eq.${reference}`, {}, true);
      if (found.error) return NextResponse.json({ received: false }, { status: 503 });
      const order = found.data?.[0];
      if (!order) return NextResponse.json({ received: true, processed: false });
      const amount = resource.amount as { value?: string; currency_code?: string };
      const minor = paypalAmountMinor(amount);
      if (resource.status !== "COMPLETED" || minor !== order.total_minor || amount?.currency_code !== order.currency) return NextResponse.json({ received: false, error: "Payment amount mismatch." }, { status: 409 });
      const saved = await supabaseRest("rpc/apply_paypal_capture", { method: "POST", body: JSON.stringify({ p_order_id: order.id, p_paypal_order: reference, p_capture: resource.id, p_event: event.id, p_amount: minor, p_currency: order.currency }) }, true);
      return NextResponse.json({ received: !saved.error, processed: !saved.error }, { status: saved.error ? 503 : 200 });
    }
    if (event.event_type === "PAYMENT.CAPTURE.REFUNDED") {
      const captureId = related?.capture_id;
      if (!captureId || !/^[A-Z0-9-]{5,80}$/i.test(captureId)) return NextResponse.json({ received: true, processed: false });
      // A partial refund must never make the full order appear refunded.
      const capture = await getPayPalCapture(captureId);
      if (!capture) return NextResponse.json({ received: false }, { status: 503 });
      if (capture.status !== "REFUNDED") return NextResponse.json({ received: true, processed: false, reason: "Partial refund requires review." });
      const saved = await supabaseRest(`orders?paypal_capture_id=eq.${captureId}&payment_status=eq.paid`, { method: "PATCH", body: JSON.stringify({ payment_status: "refunded" }) }, true);
      return NextResponse.json({ received: !saved.error, processed: !saved.error }, { status: saved.error ? 503 : 200 });
    }
    return NextResponse.json({ received: true, processed: false });
  } catch { return NextResponse.json({ received: false, error: "Webhook processing temporarily unavailable." }, { status: 503 }); }
}
