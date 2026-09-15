import { cookies } from "next/headers";
import { getCommerceConfig } from "@/lib/commerce/config";

export type AdminUser = { id: string; email: string; email_confirmed_at?: string | null };

/** Authorize only a Supabase-verified user whose confirmed email is allow-listed. */
export async function getAdminUser(): Promise<AdminUser | null> {
  const config = getCommerceConfig();
  const token = (await cookies()).get("sm_access_token")?.value;
  if (!token || !config.supabaseUrl || !config.supabaseAnonKey) return null;
  const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
    headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const user = await response.json() as AdminUser;
  const email = user.email?.trim().toLowerCase();
  const allowed = (process.env.ADMIN_EMAILS ?? "").split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (!email || !user.email_confirmed_at || !allowed.includes(email)) return null;
  return user;
}

/** Require same-origin mutations; this prevents cross-site form posts. */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}

const allowedFields = ["slug", "name", "family", "material", "length_cm", "finger_style", "colors", "description", "image_urls", "status"] as const;
type ProductField = typeof allowedFields[number];

export type ProductInput = Partial<Record<ProductField, unknown>>;
const families = new Set(["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"]);

export function validateProductInput(input: ProductInput, partial = false) {
  const errors: string[] = [];
  const payload: Record<string, unknown> = {};
  for (const field of allowedFields) if (Object.prototype.hasOwnProperty.call(input, field)) payload[field] = input[field];
  if (!partial || "slug" in input) {
    if (typeof input.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) || input.slug.length > 120) errors.push("slug must use lowercase letters, numbers and hyphens");
    else payload.slug = input.slug.trim();
  }
  if (!partial || "name" in input) {
    if (typeof input.name !== "string" || input.name.trim().length < 2 || input.name.length > 180) errors.push("name is required");
    else payload.name = input.name.trim();
  }
  if (!partial || "family" in input) {
    if (typeof input.family !== "string" || !families.has(input.family.trim())) errors.push("family must be a supported product family");
    else payload.family = input.family.trim();
  }
  for (const field of ["material", "finger_style", "description"] as const) if (field in input && input[field] !== null && (typeof input[field] !== "string" || input[field].length > (field === "description" ? 10000 : 120))) errors.push(`${field} is invalid`);
  if (input.finger_style && !["full-finger", "fingerless", "half-finger", "not-applicable"].includes(String(input.finger_style))) errors.push("finger_style must be a supported value");
  if ("length_cm" in input && input.length_cm !== null && (!Number.isFinite(Number(input.length_cm)) || Number(input.length_cm) < 0 || Number(input.length_cm) > 300)) errors.push("length_cm is invalid");
  if ("colors" in input && (!Array.isArray(input.colors) || input.colors.some((value) => typeof value !== "string" || value.length > 60))) errors.push("colors must be an array of short strings");
  if ("image_urls" in input && (!Array.isArray(input.image_urls) || input.image_urls.some((value) => typeof value !== "string" || !/^products\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) || String(value).includes("..")))) errors.push("image_urls must contain product-media paths");
  if ("status" in input && !["draft", "active", "archived"].includes(String(input.status))) errors.push("status is invalid");
  if ("length_cm" in input) payload.length_cm = input.length_cm === null || input.length_cm === "" ? null : Number(input.length_cm);
  if ("colors" in input) payload.colors = input.colors;
  if ("image_urls" in input) payload.image_urls = input.image_urls;
  if ("status" in input) payload.status = input.status;
  for (const field of ["material", "finger_style", "description"] as const) if (field in input) payload[field] = input[field] === "" ? null : input[field];
  return { errors, payload };
}
