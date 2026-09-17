import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCommerceConfig } from "@/lib/commerce/config";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

type Order = { id: string; created_at: string };
export async function GET() {
  const c = getCommerceConfig(); const token = (await cookies()).get("sm_access_token")?.value;
  if (!token || !c.supabaseUrl || !c.supabaseAnonKey) return NextResponse.json({ error: "Sign in to view your orders." }, { status: 401 });
  try {
    const response = await fetch(`${c.supabaseUrl}/auth/v1/user`, { headers: { apikey: c.supabaseAnonKey, Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Sign in to view your orders." }, { status: 401 });
    const user = await response.json() as { id: string; email?: string; email_confirmed_at?: string };
    if (!user.email || !user.email_confirmed_at) return NextResponse.json({ error: "Confirm your email before viewing orders." }, { status: 403 });
    const fields = "id,fulfillment_status,payment_status,quote_status,currency,total_minor,created_at,order_items(id,name,quantity)";
    // Two exact-match filters also find quotes issued before the buyer registered.
    // Email/identity come only from Supabase's verified user, never from request input.
    const results = await Promise.all([
      supabaseRest<Order[]>(`orders?select=${fields}&customer_id=eq.${encodeURIComponent(user.id)}&order=created_at.desc&limit=100`, {}, true),
      supabaseRest<Order[]>(`orders?select=${fields}&buyer_email=eq.${encodeURIComponent(user.email.toLowerCase())}&order=created_at.desc&limit=100`, {}, true),
    ]);
    if (results.some(result => result.error)) return NextResponse.json({ error: "Unable to load your orders. Please try again." }, { status: 503 });
    const orders = [...new Map(results.flatMap(result => result.data ?? []).map(order => [order.id, order])).values()].sort((a, b) => b.created_at.localeCompare(a.created_at));
    return NextResponse.json({ authenticated: true, data: orders }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Unable to load your orders. Please try again." }, { status: 503 }); }
}
