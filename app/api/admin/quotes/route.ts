import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminUser, sameOrigin } from "@/lib/commerce/admin";
import { validateQuote, hashAccess, uuidPattern } from "@/lib/commerce/quotes";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { getCommerceConfig } from "@/lib/commerce/config";

export async function POST(request: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})); const checked = validateQuote(body);
  if (checked.errors.length) return NextResponse.json({ error: checked.errors.join(" ") }, { status: 400 });
  const access = randomBytes(32).toString("hex");
  const result = await supabaseRest<string>("rpc/admin_create_quote", { method: "POST", body: JSON.stringify({ p_quote: { buyer_email: body.buyerEmail.trim().toLowerCase(), rfq_id: body.rfqId ?? null, currency: body.currency, shipping_minor: body.shippingMinor, tax_minor: body.taxMinor, quote_terms: body.terms.trim(), quote_expires_at: body.expiresAt, quote_access_hash: hashAccess(access) }, p_items: checked.lines, p_actor: admin.id }) }, true);
  if (result.error || !result.data) return NextResponse.json({ error: "Could not create the quote. Review its values and try again." }, { status: 502 });
  return NextResponse.json({ id: result.data, url: `${getCommerceConfig().appUrl.replace(/\/$/, "")}/checkout/quote/${result.data}/#access=${access}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (!uuidPattern.test(String(body.id))) return NextResponse.json({ error: "Invalid quote." }, { status: 400 });
  const result = await supabaseRest<Array<{ id: string }>>(`orders?id=eq.${body.id}&payment_status=eq.pending&quote_status=eq.approved&select=id`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ quote_status: "cancelled" }) }, true);
  if (result.error) return NextResponse.json({ error: "Unable to cancel this quote." }, { status: 503 });
  if (!result.data?.length) return NextResponse.json({ error: "Only an approved, unpaid quote can be cancelled." }, { status: 409 });
  return NextResponse.json({ ok: true });
}
