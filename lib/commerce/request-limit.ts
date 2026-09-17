import { createHash } from "node:crypto";
import { supabaseRest } from "@/lib/commerce/supabase-rest";

export async function consumeLimit(namespace: string, identifier: string, limit = 5, seconds = 600) {
  const key = createHash("sha256").update(`${namespace}:${identifier}`).digest("hex");
  const result = await supabaseRest<boolean>("rpc/consume_request_limit", {
    method: "POST", body: JSON.stringify({ p_key: key, p_limit: limit, p_seconds: seconds }),
  }, true);
  return { allowed: result.data === true, available: result.configured && !result.error };
}

export function clientAddress(request: Request) {
  return request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}
