/** Run with local server or deployed NEXT_PUBLIC_APP_URL already available. Never logs links or tokens. */
import { getCommerceConfig } from "../lib/commerce/config";
import { sendAuthEmail } from "../lib/commerce/auth-email";
async function main() {
const c = getCommerceConfig();
const email = process.argv[2]?.toLowerCase();
const allowed = (process.env.ADMIN_EMAILS ?? "").split(",").map(value => value.trim().toLowerCase());
if (!email || !allowed.includes(email) || !c.supabaseUrl || !c.supabaseServiceRoleKey) throw new Error("Supply a configured administrator email.");
const response = await fetch(`${c.supabaseUrl}/auth/v1/admin/users?page=1&per_page=1000`, { headers: { apikey: c.supabaseServiceRoleKey, Authorization: `Bearer ${c.supabaseServiceRoleKey}` } });
if (!response.ok) throw new Error("Unable to inspect account state.");
const users = await response.json() as { users: Array<{ email: string }> };
const existing = users.users.some(user => user.email.toLowerCase() === email);
const result = await sendAuthEmail(existing ? "recovery" : "invite", email);
console.log(JSON.stringify({ email, action: existing ? "recovery" : "invite", ...result }));
if (result.error) process.exitCode = 1;

}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
