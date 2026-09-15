import crypto from "node:crypto";
import { getCommerceConfig } from "@/lib/commerce/config";

export function verifyStripeSignature(payload: string, signature: string | null, secret = getCommerceConfig().stripeWebhookSecret) {
  if (!signature || !secret) return false;
  const timestamp = Number(signature.match(/(?:^|,)t=(\d+)/)?.[1]);
  const value = signature.match(/(?:^|,)v1=([^,]+)/)?.[1];
  if (!timestamp || !value || Math.abs(Date.now() / 1000 - timestamp) > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  return value.length === expected.length && crypto.timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function createStripeCheckoutSession(input: { lineItems: Array<{ name: string; quantity: number; unitAmountMinor: number; currency: string }>; orderId: string }) {
  const config = getCommerceConfig();
  if (!config.stripeSecretKey) return { configured: false as const, error: "Stripe is not configured." };
  const params = new URLSearchParams({ mode: "payment", success_url: `${config.appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${config.appUrl}/checkout/`, "metadata[order_id]": input.orderId });
  input.lineItems.forEach((item, index) => { params.set(`line_items[${index}][quantity]`, String(item.quantity)); params.set(`line_items[${index}][price_data][currency]`, item.currency.toLowerCase()); params.set(`line_items[${index}][price_data][unit_amount]`, String(item.unitAmountMinor)); params.set(`line_items[${index}][price_data][product_data][name]`, item.name); });
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: `Bearer ${config.stripeSecretKey}`, "Content-Type": "application/x-www-form-urlencoded" }, body: params });
  const data = await response.json() as { id?: string; url?: string; error?: { message?: string } };
  return response.ok && data.url ? { configured: true as const, id: data.id!, url: data.url } : { configured: true as const, error: data.error?.message ?? "Stripe checkout creation failed." };
}
