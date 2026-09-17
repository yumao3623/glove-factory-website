import { NextResponse } from "next/server";
import { isSameOrigin, validEmail } from "@/lib/commerce/auth";
import { sendAuthEmail } from "@/lib/commerce/auth-email";
import { clientAddress, consumeLimit } from "@/lib/commerce/request-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  if (!validEmail(body.email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  try {
    const rate = await consumeLimit("account-email", clientAddress(request), 5, 600);
    if (!rate.allowed) return NextResponse.json({ error: rate.available ? "Please wait before requesting another email." : "Account service is temporarily unavailable." }, { status: rate.available ? 429 : 503 });
    const emailRate = await consumeLimit("recovery-email", body.email.toLowerCase().trim(), 1, 60);
    if (!emailRate.allowed) return NextResponse.json({ message: "If this address has an account, check your inbox for a password link." });
    const result = await sendAuthEmail("recovery", body.email);
    return NextResponse.json(result.error ? { error: result.error } : { message: "If this address has an account, check your inbox for a password link." }, { status: result.error ? 503 : 200 });
  } catch { return NextResponse.json({ error: "Account email is temporarily unavailable." }, { status: 503 }); }
}
