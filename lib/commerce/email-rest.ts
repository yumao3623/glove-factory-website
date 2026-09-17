import { getCommerceConfig, missingConfig } from "@/lib/commerce/config";

export async function sendCommerceEmail(input: { to: string | string[]; subject: string; html: string; replyTo?: string; idempotencyKey?: string }) {
  const config = getCommerceConfig();
  const missing = missingConfig(config.resendApiKey, config.emailFrom);
  if (missing.length) return { configured: false as const, error: `Missing email configuration: ${missing.join(", ")}` };
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${config.resendApiKey}`, "Content-Type": "application/json", ...(input.idempotencyKey ? { "Idempotency-Key": input.idempotencyKey } : {}) }, body: JSON.stringify({ from: config.emailFrom, to: input.to, subject: input.subject, html: input.html, reply_to: input.replyTo }) });
  const data = await response.json() as { id?: string; message?: string };
  return response.ok ? { configured: true as const, id: data.id } : { configured: true as const, error: data.message ?? "Email delivery failed" };
}
