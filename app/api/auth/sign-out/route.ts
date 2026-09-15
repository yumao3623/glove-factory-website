import { NextResponse } from "next/server";
import { isSameOrigin } from "@/lib/commerce/auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("sm_access_token");
  response.cookies.delete("sm_refresh_token");
  return response;
}
