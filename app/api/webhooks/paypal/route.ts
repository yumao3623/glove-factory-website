import { NextResponse } from "next/server";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { verifyPayPalWebhook, type PayPalWebhookEvent } from "@/lib/commerce/paypal-rest";

const orderIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const paymentStatusByEvent: Record<string, "paid" | "failed" | "refunded"> = {
  "CHECKOUT.ORDER.COMPLETED": "paid",
  "PAYMENT.CAPTURE.COMPLETED": "paid",
  "PAYMENT.CAPTURE.DENIED": "failed",
  "PAYMENT.CAPTURE.REFUNDED": "refunded",
};

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function eventOrderReference(event: PayPalWebhookEvent) {
  const resource = event.resource ?? {};
  const purchaseUnits = Array.isArray(resource.purchase_units) ? resource.purchase_units : [];
  const firstUnit = purchaseUnits[0] && typeof purchaseUnits[0] === "object" ? purchaseUnits[0] as Record<string, unknown> : {};
  const supplementary = resource.supplementary_data && typeof resource.supplementary_data === "object" ? resource.supplementary_data as Record<string, unknown> : {};
  const related = supplementary.related_ids && typeof supplementary.related_ids === "object" ? supplementary.related_ids as Record<string, unknown> : {};
  return {
    orderId: stringValue(firstUnit.reference_id) ?? stringValue(firstUnit.custom_id) ?? stringValue(resource.custom_id),
    paypalOrderId: stringValue(related.order_id) ?? stringValue(resource.id),
  };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const result = await verifyPayPalWebhook(rawBody, {
    authAlgo: request.headers.get("paypal-auth-algo"),
    certUrl: request.headers.get("paypal-cert-url"),
    transmissionId: request.headers.get("paypal-transmission-id"),
    transmissionSig: request.headers.get("paypal-transmission-sig"),
    transmissionTime: request.headers.get("paypal-transmission-time"),
  });
  if (!result.verified) return NextResponse.json({ received: false, error: result.error }, { status: result.configured ? 400 : 503, headers: { "Cache-Control": "no-store" } });

  const eventType = result.event.event_type ?? "";
  const paymentStatus = paymentStatusByEvent[eventType];
  if (!paymentStatus) return NextResponse.json({ received: true, processed: false, eventType }, { headers: { "Cache-Control": "no-store" } });

  const reference = eventOrderReference(result.event);
  if (!reference.orderId || !orderIdPattern.test(reference.orderId)) {
    return NextResponse.json({ received: true, processed: false, eventType, reason: "No local order reference was supplied." }, { headers: { "Cache-Control": "no-store" } });
  }
  const update = await supabaseRest(`orders?id=eq.${encodeURIComponent(reference.orderId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ payment_provider: "paypal", payment_reference: reference.paypalOrderId, payment_status: paymentStatus }),
  }, true);
  if (update.error) return NextResponse.json({ received: false, error: "Verified webhook could not update the order." }, { status: update.configured ? 502 : 503, headers: { "Cache-Control": "no-store" } });
  return NextResponse.json({ received: true, processed: true, eventType }, { headers: { "Cache-Control": "no-store" } });
}
