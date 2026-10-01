import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

export type SupabaseRestResult<T> = { data: T | null; error: string | null; configured: boolean };

export async function supabaseRest<T>(path: string, init: RequestInit = {}, privileged = false): Promise<SupabaseRestResult<T>> {
  const config = getCommerceConfig();
  const key = privileged ? config.supabaseServiceRoleKey : config.supabaseAnonKey;
  const missing = missingConfig(config.supabaseUrl, key);
  if (missing.length) return { data: null, error: `Missing Supabase configuration: ${missing.join(", ")}`, configured: false };
  const request = () => fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
    cache: "no-store",
  });
  const method = (init.method ?? "GET").toUpperCase();
  let response: Response;
  try {
    response = await request();
  } catch {
    // A transient TLS/socket failure should not turn a catalogue page into a
    // Next.js runtime error. Retry safe reads once; never retry mutations.
    if (method !== "GET") return { data: null, error: "Supabase request failed. Please try again.", configured: true };
    await new Promise((resolve) => setTimeout(resolve, 250));
    try { response = await request(); } catch { return { data: null, error: "Supabase request failed. Please try again.", configured: true }; }
  }
  if (!response.ok) return { data: null, error: await response.text(), configured: true };
  const text = await response.text();
  return { data: (text ? JSON.parse(text) : null) as T, error: null, configured: true };
}
