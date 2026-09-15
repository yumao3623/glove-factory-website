import { NextResponse } from "next/server";
import { getCommerceConfig } from "@/lib/commerce/config";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { signedStorageUrl } from "@/lib/commerce/media";

function safePath(parts: string[]) { const path = parts.join("/"); return /^products\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(path) && !path.includes("..") ? path : null; }

async function signed(path: string) {
  const config = getCommerceConfig();
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) return null;
  const response = await fetch(`${config.supabaseUrl}/storage/v1/object/sign/product-media/${path}`, { method: "POST", headers: { apikey: config.supabaseServiceRoleKey, Authorization: `Bearer ${config.supabaseServiceRoleKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ expiresIn: 300 }), cache: "no-store" });
  if (!response.ok) return null;
  const data = await response.json() as { signedURL?: string; signedUrl?: string };
  return data.signedURL ?? data.signedUrl ?? null;
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const config = getCommerceConfig();
  const path = safePath((await context.params).path);
  if (!path) return NextResponse.json({ error: "Invalid media path." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const result = await supabaseRest<Array<{ status: string; image_urls: string[] }>>("products?select=status,image_urls", {}, true);
  const active = result.data?.some((product) => product.status === "active" && product.image_urls?.includes(path));
  if (!active) return NextResponse.json({ error: "Media is unavailable." }, { status: 404, headers: { "Cache-Control": "no-store" } });
  const url = await signed(path);
  if (!url) return NextResponse.json({ error: "Media is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  return NextResponse.redirect(signedStorageUrl(config.supabaseUrl!, url), { status: 307, headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } });
}
