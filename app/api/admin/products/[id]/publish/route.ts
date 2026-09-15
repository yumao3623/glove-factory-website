import { NextResponse } from "next/server";
import { getAdminUser, sameOrigin } from "@/lib/commerce/admin";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  if (!/^[0-9a-f-]{36}$/i.test(id) || body.reviewed !== true) return NextResponse.json({ error: "Review the saved product details and images before publishing." }, { status: 400 });
  const result = await supabaseRest("rpc/admin_publish_product", { method: "POST", body: JSON.stringify({ p_product_id: id, p_reviewer_id: admin.id }) }, true);
  return NextResponse.json(result, { status: result.error ? 400 : 200 });
}
