import { getCommerceConfig } from "@/lib/commerce/config";

type PayPalEnvironment = "sandbox" | "live";
type PayPalAmount = { currency_code: string; value: string };
type PayPalOrderResponse = { id?: string; status?: string; links?: Array<{ href: string; rel: string; method?: string }>; message?: string };
type PayPalVerificationResponse = { verification_status?: string; message?: string };

function environment(): PayPalEnvironment {
  return process.env.PAYPAL_ENVIRONMENT === "live" ? "live" : "sandbox";
}

function baseUrl() {
  return environment() === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

function configured() {
  const config = getCommerceConfig();
  return Boolean(config.paypalClientId && config.paypalClientSecret);
}

async function accessToken() {
  const config = getCommerceConfig();
  if (!config.paypalClientId || !config.paypalClientSecret) return { token: null, error: "PayPal merchant credentials are not configured." };
  const response = await fetch(`${baseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      Authorization: `Basic ${Buffer.from(`${config.paypalClientId}:${config.paypalClientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({})) as { access_token?: string; error_description?: string };
  return response.ok && data.access_token ? { token: data.access_token, error: null } : { token: null, error: data.error_description ?? "Unable to authenticate with PayPal." };
}

export type PayPalQuoteLine = { name: string; quantity: number; unitAmountMinor: number; currency: string };

export async function createPayPalOrder(input: { orderId: string; lines: PayPalQuoteLine[]; totalMinor?: number; shippingMinor?: number; taxMinor?: number; returnUrl?: string; cancelUrl?: string }) {
  if (!configured()) return { configured: false as const, error: "PayPal is pending merchant verification. No order was created." };
  if (!input.lines.length || input.lines.some((line) => !Number.isInteger(line.quantity) || line.quantity < 1 || !Number.isInteger(line.unitAmountMinor) || line.unitAmountMinor < 0 || !/^[A-Z]{3}$/.test(line.currency))) {
    return { configured: true as const, error: "A confirmed quote with valid line items is required." };
  }
  const currency = input.lines[0].currency;
  if (input.lines.some((line) => line.currency !== currency)) return { configured: true as const, error: "PayPal orders require one settlement currency." };
  const itemTotalMinor = input.lines.reduce((sum, line) => sum + line.unitAmountMinor * line.quantity, 0);
  const shippingMinor = input.shippingMinor ?? 0;
  const taxMinor = input.taxMinor ?? 0;
  const totalMinor = input.totalMinor ?? itemTotalMinor + shippingMinor + taxMinor;
  if (![totalMinor, shippingMinor, taxMinor].every((value) => Number.isInteger(value) && value >= 0) || totalMinor !== itemTotalMinor + shippingMinor + taxMinor) {
    return { configured: true as const, error: "The confirmed quote total no longer matches its line items." };
  }
  const money = (minor: number): PayPalAmount => ({ currency_code: currency, value: (minor / 100).toFixed(2) });
  const tokenResult = await accessToken();
  if (!tokenResult.token) return { configured: true as const, error: tokenResult.error };
  const config = getCommerceConfig();
  const response = await fetch(`${baseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResult.token}`, "Content-Type": "application/json", "PayPal-Request-Id": input.orderId },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ reference_id: input.orderId, custom_id: input.orderId, amount: { ...money(totalMinor), breakdown: { item_total: money(itemTotalMinor), ...(shippingMinor ? { shipping: money(shippingMinor) } : {}), ...(taxMinor ? { tax_total: money(taxMinor) } : {}) } }, items: input.lines.map((line) => ({ name: line.name.slice(0, 127), quantity: String(line.quantity), unit_amount: money(line.unitAmountMinor), category: "PHYSICAL_GOODS" })) }],
      application_context: { brand_name: "JS Meilai", shipping_preference: "GET_FROM_FILE", user_action: "PAY_NOW", return_url: input.returnUrl ?? `${config.appUrl}/checkout/paypal/return`, cancel_url: input.cancelUrl ?? `${config.appUrl}/checkout/` },
    }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({})) as PayPalOrderResponse;
  const approval = data.links?.find((link) => link.rel === "approve")?.href;
  return response.ok && data.id && approval ? { configured: true as const, id: data.id, status: data.status ?? "CREATED", approvalUrl: approval } : { configured: true as const, error: data.message ?? "PayPal order creation failed." };
}

export async function capturePayPalOrder(orderId: string) {
  if (!configured()) return { configured: false as const, error: "PayPal is pending merchant verification. No capture was attempted." };
  if (!/^[A-Z0-9-]{5,80}$/i.test(orderId)) return { configured: true as const, error: "Invalid PayPal order id." };
  const tokenResult = await accessToken();
  if (!tokenResult.token) return { configured: true as const, error: tokenResult.error };
  const response = await fetch(`${baseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, { method: "POST", headers: { Authorization: `Bearer ${tokenResult.token}`, "Content-Type": "application/json" }, cache: "no-store" });
  const data = await response.json().catch(() => ({})) as PayPalOrderResponse;
  return response.ok ? { configured: true as const, id: data.id ?? orderId, status: data.status ?? "COMPLETED" } : { configured: true as const, error: data.message ?? "PayPal capture failed." };
}

export type PayPalWebhookHeaders = {
  authAlgo: string | null;
  certUrl: string | null;
  transmissionId: string | null;
  transmissionSig: string | null;
  transmissionTime: string | null;
};

export type PayPalWebhookEvent = {
  id?: string;
  event_type?: string;
  resource?: Record<string, unknown>;
};

/**
 * Ask PayPal to verify the original webhook payload before an event is used.
 * The webhook id and credentials are intentionally required so an unconfigured
 * deployment returns a clear fail-closed result instead of accepting a POST.
 */
export async function verifyPayPalWebhook(rawBody: string, headers: PayPalWebhookHeaders) {
  const config = getCommerceConfig();
  if (!config.paypalWebhookId || !config.paypalClientId || !config.paypalClientSecret) {
    return { configured: false as const, verified: false as const, error: "PayPal webhook verification is pending merchant verification." };
  }
  let event: PayPalWebhookEvent;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Webhook event must be an object.");
    event = parsed as PayPalWebhookEvent;
  } catch {
    return { configured: true as const, verified: false as const, error: "Invalid PayPal webhook JSON." };
  }
  const required = [headers.authAlgo, headers.certUrl, headers.transmissionId, headers.transmissionSig, headers.transmissionTime];
  if (required.some((value) => !value)) return { configured: true as const, verified: false as const, error: "PayPal webhook signature headers are incomplete." };
  try {
    const cert = new URL(headers.certUrl!);
    if (cert.protocol !== "https:") return { configured: true as const, verified: false as const, error: "PayPal certificate URL must use HTTPS." };
  } catch {
    return { configured: true as const, verified: false as const, error: "PayPal certificate URL is invalid." };
  }
  const tokenResult = await accessToken();
  if (!tokenResult.token) return { configured: true as const, verified: false as const, error: tokenResult.error };
  const response = await fetch(`${baseUrl()}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResult.token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_algo: headers.authAlgo,
      cert_url: headers.certUrl,
      transmission_id: headers.transmissionId,
      transmission_sig: headers.transmissionSig,
      transmission_time: headers.transmissionTime,
      webhook_id: config.paypalWebhookId,
      webhook_event: event,
    }),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({})) as PayPalVerificationResponse;
  return response.ok && data.verification_status === "SUCCESS"
    ? { configured: true as const, verified: true as const, event }
    : { configured: true as const, verified: false as const, error: data.message ?? "PayPal webhook signature verification failed." };
}
