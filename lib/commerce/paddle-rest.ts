import crypto from "node:crypto";

export type PaddleLineItem = { priceId: string; quantity: number };

export async function createPaddleTransaction(_items: PaddleLineItem[], _metadata: Record<string, string>) {
  void _items; void _metadata;
  return { configured: false as const, error: "Paddle does not support physical goods. No transaction was created." };
}

export function verifyPaddleSignature(payload: string, signature: string | null, secret: string | undefined, toleranceSeconds = 300) {
  if (!signature || !secret) return false;
  const values = Object.fromEntries(signature.split(";").map((part) => part.split("=", 2))) as Record<string, string>;
  const timestamp = Number(values.ts);
  if (!timestamp || Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds || !values.h1) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}:${payload}`).digest("hex");
  if (expected.length !== values.h1.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(values.h1));
}
