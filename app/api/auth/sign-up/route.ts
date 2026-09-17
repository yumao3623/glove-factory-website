import { NextResponse } from "next/server";
import { isSameOrigin, validEmail, validPassword } from "@/lib/commerce/auth";
import { sendAuthEmail } from "@/lib/commerce/auth-email";
import { clientAddress, consumeLimit } from "@/lib/commerce/request-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (!validEmail(body.email) || !validPassword(body.password) || body.password.length < 12) return NextResponse.json({ error: "Use a valid email and a password of 12 to 128 characters." }, { status: 400 });
  try {
    const rate = await consumeLimit("account-email", clientAddress(request), 5, 600);
    if (!rate.allowed) return NextResponse.json({ error: "Please try again later." }, { status: rate.available ? 429 : 503 });
    const result = await sendAuthEmail("signup", body.email, body.password);
    return NextResponse.json(result.error ? { error: result.error } : { message: "Check your email to confirm your account. If you already have an account, sign in or reset your password." }, { status: result.error ? 503 : 200 });
  } catch { return NextResponse.json({ error: "Account email is temporarily unavailable." }, { status: 503 }); }
}
