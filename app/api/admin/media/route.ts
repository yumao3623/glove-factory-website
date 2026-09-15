import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getCommerceConfig } from "@/lib/commerce/config";
import { getAdminUser, sameOrigin } from "@/lib/commerce/admin";

const types = new Map([["image/jpeg", "jpg"], ["image/png", "png"], ["image/webp", "webp"]]);

export async function POST(request: Request) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Cross-origin mutation rejected." }, { status: 403 });
  const config = getCommerceConfig();
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) return NextResponse.json({ configured: false, error: "Supabase service configuration is required." }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  const ext = types.get(file.type);
  if (!ext || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Use a JPEG, PNG or WebP image up to 5 MB." }, { status: 400 });
  const path = `products/${crypto.randomUUID()}.${ext}`;
  const response = await fetch(`${config.supabaseUrl}/storage/v1/object/product-media/${path}`, { method: "POST", headers: { Authorization: `Bearer ${config.supabaseServiceRoleKey}`, apikey: config.supabaseServiceRoleKey, "Content-Type": file.type, "x-upsert": "false" }, body: await file.arrayBuffer() });
  if (!response.ok) return NextResponse.json({ configured: true, error: await response.text() }, { status: 502 });
  return NextResponse.json({ configured: true, path }, { status: 201 });
}
