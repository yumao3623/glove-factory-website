import { NextResponse } from "next/server";
import { getAdminUser, sameOrigin } from "@/lib/commerce/admin";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { uuidPattern } from "@/lib/commerce/quotes";
export async function GET() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const [rfq, orders] = await Promise.all([supabaseRest("rfq_requests?select=*&order=created_at.desc&limit=100", {}, true), supabaseRest("orders?select=id,buyer_email,fulfillment_status,payment_status,total_minor,currency,created_at,quote_status,quote_expires_at,quote_terms,order_items(name,quantity)&order=created_at.desc&limit=100", {}, true)]);
  return NextResponse.json({ rfq: rfq.data ?? [], orders: orders.data ?? [], error: rfq.error || orders.error ? "Unable to load buyer records." : null }, { status: rfq.error || orders.error ? 502 : 200 });
}
export async function PATCH(request: Request) {
  const admin = await getAdminUser(); if (!admin) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (!uuidPattern.test(String(body.id)) || !["new", "reviewing", "quoted", "won", "closed"].includes(body.status)) return NextResponse.json({ error: "Invalid RFQ status update." }, { status: 400 });
  const result = await supabaseRest("rpc/admin_update_rfq_status", { method: "POST", body: JSON.stringify({ p_id: body.id, p_status: body.status, p_actor: admin.id }) }, true);
  return NextResponse.json({ ok: !result.error, error: result.error ? "Unable to update this enquiry." : null }, { status: result.error ? 502 : 200 });
}
