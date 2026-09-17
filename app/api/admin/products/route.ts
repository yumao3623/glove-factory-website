import { NextResponse } from "next/server";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { getAdminUser, sameOrigin, validateProductInput } from "@/lib/commerce/admin";

export async function GET() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const result = await supabaseRest("products?select=*&order=featured.desc,sort_order.asc,updated_at.desc", {}, true);
  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}

export async function POST(request: Request) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  const input = await request.json().catch(() => ({}));
  const checked = validateProductInput(input);
  if (checked.errors.length) return NextResponse.json({ error: checked.errors.join("; ") }, { status: 400 });
  const result = await supabaseRest("products", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ ...checked.payload, status: "draft", colors: checked.payload.colors ?? [], image_urls: checked.payload.image_urls ?? [] }) }, true);
  return NextResponse.json(result, { status: result.error ? 502 : 201 });
}
