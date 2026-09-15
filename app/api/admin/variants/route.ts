import { NextResponse } from "next/server";
import { getAdminUser, sameOrigin } from "@/lib/commerce/admin";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

const id = /^[0-9a-f-]{36}$/i;
function input(value: unknown) {
  const body = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  if (typeof body.product_id !== "string" || !id.test(body.product_id) || typeof body.sku !== "string" || !/^[A-Za-z0-9._-]{2,80}$/.test(body.sku)) return { error: "product_id and a valid SKU are required." };
  const number = (key: string) => body[key] == null || body[key] === "" ? null : Number(body[key]);
  const prices = ["wholesale_price_minor", "retail_price_minor"].map(number);
  if (prices.some((value) => value !== null && (!Number.isInteger(value) || value < 0))) return { error: "Prices must be non-negative integer minor units." };
  const quantity = number("quantity"); const reserved = number("reserved");
  if (quantity !== null && (!Number.isInteger(quantity) || quantity < 0) || reserved !== null && (!Number.isInteger(reserved) || reserved < 0)) return { error: "Inventory values must be non-negative integers." };
  if (quantity !== null && reserved !== null && reserved > quantity) return { error: "Reserved stock cannot exceed quantity." };
  const currency = typeof body.currency === "string" ? body.currency.toUpperCase() : "USD";
  if (!["USD", "EUR", "GBP", "CNY"].includes(currency)) return { error: "Currency must be USD, EUR, GBP or CNY." };
  return { payload: { id: typeof body.id === "string" && id.test(body.id) ? body.id : null, product_id: body.product_id, sku: body.sku, color: typeof body.color === "string" ? body.color : null, size: typeof body.size === "string" ? body.size : null, wholesale_price_minor: prices[0], retail_price_minor: prices[1], currency, active: body.active !== false }, inventory: { quantity: quantity ?? 0, reserved: reserved ?? 0 } };
}

export async function GET() { if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 }); const result = await supabaseRest("product_variants?select=*,inventory( quantity,reserved )&order=created_at.desc", {}, true); return NextResponse.json(result, { status: result.error ? 502 : 200 }); }
export async function POST(request: Request) { if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 }); if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 }); const checked = input(await request.json().catch(() => ({}))); if (checked.error) return NextResponse.json({ error: checked.error }, { status: 400 }); const result = await supabaseRest("rpc/admin_save_variant", { method: "POST", body: JSON.stringify({ p_variant: checked.payload, p_inventory: checked.inventory }) }, true); return NextResponse.json(result, { status: result.error ? 502 : 201 }); }
