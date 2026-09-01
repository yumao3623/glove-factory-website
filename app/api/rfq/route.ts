import { NextResponse } from "next/server";
import { validateRfq } from "@/lib/rfq-validation";

export const dynamic = "force-dynamic";

const requests = new Map<string, number[]>();
const windowMs = 60_000;
const limit = 5;

function requestKey(request: Request) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "development"; }
function isRateLimited(key: string) {
  const now = Date.now(); const retained = (requests.get(key) ?? []).filter((time) => now - time < windowMs);
  retained.push(now); requests.set(key, retained); return retained.length > limit;
}

export async function POST(request: Request) {
  if (isRateLimited(requestKey(request))) return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });
  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "Invalid request payload." }, { status: 400 }); }
  const result = validateRfq((payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>);
  if (!result.valid) return NextResponse.json({ message: "Please review the highlighted fields.", errors: result.errors }, { status: 400 });
  return NextResponse.json({ status: "PENDING_PUBLIC_CONTACT", message: "Validation passed. This development endpoint does not send or persist enquiries." }, { status: 202 });
}
