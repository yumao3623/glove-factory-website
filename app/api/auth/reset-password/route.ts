import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCommerceConfig } from "@/lib/commerce/config";
import { isSameOrigin, validPassword } from "@/lib/commerce/auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const token = (await cookies()).get("sm_recovery_token")?.value;
  if (!token) return NextResponse.json({ error: "Open a fresh password link from your email first." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (!validPassword(body.password) || body.password.length < 12) return NextResponse.json({ error: "Use a password of 12 to 128 characters." }, { status: 400 });
  const c = getCommerceConfig();
  if (!c.supabaseUrl || !c.supabaseAnonKey) return NextResponse.json({ error: "Account service unavailable." }, { status: 503 });
  try {
    const headers = { apikey: c.supabaseAnonKey, Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const updated = await fetch(`${c.supabaseUrl}/auth/v1/user`, { method: "PUT", headers, body: JSON.stringify({ password: body.password }) });
    if (!updated.ok) return NextResponse.json({ error: "Password could not be changed. Use a different password or request a fresh link." }, { status: 400 });
    await fetch(`${c.supabaseUrl}/auth/v1/logout?scope=global`, { method: "POST", headers });
    const response = NextResponse.json({ message: "Password saved. Sign in with your new password." });
    for (const name of ["sm_access_token", "sm_refresh_token", "sm_recovery_token"]) response.cookies.delete(name);
    return response;
  } catch { return NextResponse.json({ error: "Unable to update your password. Please try again." }, { status: 503 }); }
}
