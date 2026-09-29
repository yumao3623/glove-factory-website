import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

type Profile = { contactName: string; company: string; country: string; phone: string };

function clean(value: unknown, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function getUser() {
  const token = (await cookies()).get("sm_access_token")?.value;
  const config = getCommerceConfig();
  if (!token || !config.supabaseUrl || !config.supabaseAnonKey) return { error: "Sign in to manage your details.", status: 401 as const };
  const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, { headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!response.ok) return { error: "Your session has expired. Sign in again.", status: 401 as const };
  return { token, config, user: await response.json() as { id: string; email?: string; user_metadata?: Record<string, unknown> } };
}

function payload(user: { email?: string; user_metadata?: Record<string, unknown> }) {
  const metadata = user.user_metadata ?? {};
  return { email: user.email ?? "", profile: { contactName: clean(metadata.contact_name), company: clean(metadata.company), country: clean(metadata.country, 80), phone: clean(metadata.phone, 80) } satisfies Profile };
}

export async function GET() {
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ error: "Account service is not configured." }, { status: 503 });
  const result = await getUser();
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(payload(result.user), { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  const config = getCommerceConfig();
  const missing = missingConfig(config.supabaseUrl, config.supabaseAnonKey);
  if (missing.length) return NextResponse.json({ error: "Account service is not configured." }, { status: 503 });
  const result = await getUser();
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: result.status });
  const body = await request.json().catch(() => ({}));
  const profile = { contact_name: clean(body.contactName), company: clean(body.company), country: clean(body.country, 80), phone: clean(body.phone, 80) };
  const response = await fetch(`${result.config.supabaseUrl}/auth/v1/user`, { method: "PUT", headers: { apikey: result.config.supabaseAnonKey!, Authorization: `Bearer ${result.token}`, "Content-Type": "application/json" }, body: JSON.stringify({ data: profile }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) return NextResponse.json({ error: "Unable to save your details. Please try again." }, { status: 503 });
  return NextResponse.json({ message: "Your details were saved.", ...payload(data) });
}
