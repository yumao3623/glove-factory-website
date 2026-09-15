import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/commerce/admin";
import { getCommerceConfig } from "@/lib/commerce/config";
import { signedStorageUrl } from "@/lib/commerce/media";

export async function GET(request: Request) {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Admin authentication required." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const path = new URL(request.url).searchParams.get("path") ?? "";
  if (!/^products\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(path) || path.includes("..")) return NextResponse.json({ error: "Invalid media path." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  const config = getCommerceConfig();
  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) return NextResponse.json({ error: "Supabase storage is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  const response = await fetch(`${config.supabaseUrl}/storage/v1/object/sign/product-media/${path}`, { method: "POST", headers: { apikey: config.supabaseServiceRoleKey, Authorization: `Bearer ${config.supabaseServiceRoleKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ expiresIn: 300 }), cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "Unable to preview media." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  const data = await response.json() as { signedURL?: string; signedUrl?: string };
  if (!data.signedURL && !data.signedUrl) return NextResponse.json({ error: "Unable to preview media." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  return NextResponse.redirect(signedStorageUrl(config.supabaseUrl, data.signedURL ?? data.signedUrl!), { status: 307, headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } });
}
