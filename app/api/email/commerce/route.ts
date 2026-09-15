import { NextResponse } from "next/server";
// Only validated server-side business operations may send notifications.
export async function POST() {
  return NextResponse.json({ error: "Direct email sending is not available." }, { status: 403 });
}
