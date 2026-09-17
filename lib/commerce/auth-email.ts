import { getCommerceConfig } from "@/lib/commerce/config";
import { sendCommerceEmail } from "@/lib/commerce/email-rest";

export type EmailAction = "signup" | "recovery" | "invite";

/** Supabase creates one-use proofs; only the recipient gets them through Resend. */
export async function sendAuthEmail(type: EmailAction, email: string, password?: string) {
  const c = getCommerceConfig();
  if (!c.supabaseUrl || !c.supabaseServiceRoleKey || !c.resendApiKey) return { configured: false, error: "Account email service is unavailable." };
  const response = await fetch(`${c.supabaseUrl}/auth/v1/admin/generate_link`, {
    method: "POST", cache: "no-store",
    headers: { apikey: c.supabaseServiceRoleKey, Authorization: `Bearer ${c.supabaseServiceRoleKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ type, email: email.trim().toLowerCase(), ...(password ? { password } : {}) }),
  });
  const data = await response.json().catch(() => ({})) as { hashed_token?: string; verification_type?: string; code?: string };
  // Do not reveal whether an email exists. A recovery request for an unknown address is a no-op.
  if (!response.ok) {
    if (["user_not_found", "email_exists"].includes(data.code ?? "")) return { configured: true, accepted: true };
    return { configured: true, error: "We could not send an account email. Please try again later." };
  }
  if (!data.hashed_token) return { configured: true, error: "The account link could not be created." };
  const action = type === "signup" ? "Confirm your email" : type === "invite" ? "Set up your JS Meilai account" : "Reset your password";
  const params = new URLSearchParams({ token_hash: data.hashed_token, type: data.verification_type ?? type });
  const link = `${c.appUrl.replace(/\/$/, "")}/account/confirm/#${params}`;
  const sent = await sendCommerceEmail({ to: email, subject: `${action} | JS Meilai`, html: `<h1>${action}</h1><p>You requested access to JS Meilai.</p><p><a href="${link}">${action}</a></p><p>This link is single-use and expires. If you did not request it, ignore this email.</p>` });
  return sent.error ? { configured: true, error: "The email service could not accept this message. Please try again later." } : { configured: true, accepted: true, messageId: sent.id };
}
