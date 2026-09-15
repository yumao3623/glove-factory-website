import { NextResponse } from "next/server";
import { getAdminUser, sameOrigin, validateProductInput } from "@/lib/commerce/admin";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  const checked = validateProductInput(await request.json().catch(() => ({})), true);
  if (checked.payload.status === "active") checked.errors.push("Publishing requires a separate review action.");
  if (checked.errors.length || !Object.keys(checked.payload).length) return NextResponse.json({ error: checked.errors.join("; ") || "No editable fields supplied." }, { status: 400 });
  const result = await supabaseRest(`products?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(checked.payload) }, true);
  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
  const result = await supabaseRest(`products?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ status: "archived" }) }, true);
  return NextResponse.json(result, { status: result.error ? 502 : 200 });
}
