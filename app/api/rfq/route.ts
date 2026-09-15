import { NextResponse } from "next/server";
import { validateRfq } from "@/lib/rfq-validation";
import { previewRobotsHeader, siteMode } from "@/lib/stakeholder-preview";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { sendCommerceEmail } from "@/lib/commerce/email-rest";
import { getCommerceConfig } from "@/lib/commerce/config";

export const dynamic = "force-dynamic";

const requests = new Map<string, number[]>();
const windowMs = 60_000;
const limit = 5;
const htmlEscape = (value: unknown) => String(value ?? "").replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] ?? char));

function requestKey(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "development"; }
function isRateLimited(key: string) {
  const now = Date.now(); const retained = (requests.get(key) ?? []).filter((time) => now - time < windowMs);
  retained.push(now); requests.set(key, retained); return retained.length > limit;
}

export async function POST(request: Request) {
  if (siteMode === "STAKEHOLDER_PREVIEW" && process.env.COMMERCE_RFQ_ENABLED !== "true") {
    return NextResponse.json({ status: siteMode, message: "RFQ is disabled in stakeholder preview. No data was collected or stored." }, { status: 503, headers: { "Cache-Control": "no-store", "X-Robots-Tag": previewRobotsHeader } });
  }
  if (process.env.COMMERCE_RFQ_ENABLED !== "true") {
    return NextResponse.json({ status: "DISABLED", message: "RFQ is not enabled for this environment." }, { status: 503 });
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 32_000) return NextResponse.json({ message: "Submission is too large." }, { status: 413 });
  if (isRateLimited(requestKey(request))) return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid request payload." }, { status: 400 }); }
  const result = validateRfq((payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>);
  if (!result.valid) return NextResponse.json({ message: "Please review the highlighted fields.", errors: result.errors }, { status: 400 });
  const data = result.data as Record<string, unknown>;
  let stored;
  try { stored = await supabaseRest("rfq_requests", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ contact_name: data.name, company_name: data.company, country: data.country, email: data.email, whatsapp: data.whatsapp ?? null, product_family: data.productFamily, quantity: data.quantityInteger, quantity_description: data.quantityDescription, consent_at: new Date().toISOString(), message: data.message, status: "new", idempotency_key: data.idempotencyKey ?? null, product_context: data.productContext ?? [] }) }, true); }
  catch { return NextResponse.json({ status: "STORAGE_FAILED", message: "Your enquiry could not be saved. Please try again." }, { status: 502 }); }
  if (!stored.configured) return NextResponse.json({ status: "CONFIGURATION_REQUIRED", message: stored.error }, { status: 503 });
  if (stored.error) return NextResponse.json({ status: "STORAGE_FAILED", message: "Your enquiry could not be saved. Please try again." }, { status: 502 });
  const storedId = Array.isArray(stored.data) ? (stored.data[0] as { id?: string } | undefined)?.id : undefined;
  const config = getCommerceConfig();
  let email;
  try { email = await sendCommerceEmail({ to: config.rfqRecipient, subject: `New RFQ from ${String(data.company ?? "buyer")}`, replyTo: String(data.email), html: `<p>New RFQ received.</p><p>Contact: ${htmlEscape(data.name)}</p><p>Company: ${htmlEscape(data.company)}</p><p>Country: ${htmlEscape(data.country)}</p><p>Product family: ${htmlEscape(data.productFamily)}</p><p>Quantity: ${htmlEscape(data.quantityDescription)}</p><p>${htmlEscape(data.message)}</p>` }); }
  catch { email = { configured: true as const, error: "Provider request failed" }; }
  if (!email.configured || email.error) {
    if (storedId) await supabaseRest(`rfq_requests?id=eq.${encodeURIComponent(storedId)}`, { method: "PATCH", body: JSON.stringify({ notification_status: "failed", notification_error: email.error ?? "not configured" }) }, true);
    return NextResponse.json({ status: "STORED_EMAIL_PENDING", message: "Enquiry saved; notification email is not available." }, { status: 202 });
  }
  if (storedId) await supabaseRest(`rfq_requests?id=eq.${encodeURIComponent(storedId)}`, { method: "PATCH", body: JSON.stringify({ notification_status: "accepted", notification_id: email.id }) }, true);
  return NextResponse.json({ status: "RECEIVED", message: "Your enquiry has been received." }, { status: 201 });
}
