import { NextResponse } from "next/server";
// Paddle excludes physical goods. Never create transactions for this store.
export async function POST() {
  return NextResponse.json({ code: "PAYMENT_PROVIDER_UNAVAILABLE", error: "Online payment is not available. Please request a quotation." }, { status: 503 });
}
