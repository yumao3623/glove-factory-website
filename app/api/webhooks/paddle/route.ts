import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ error: "Paddle is not enabled for this physical goods store." }, { status: 503 });
}
