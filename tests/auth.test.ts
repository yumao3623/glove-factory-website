import test from "node:test";
import assert from "node:assert/strict";
import { isSameOrigin, validEmail, validPassword } from "@/lib/commerce/auth";

test("auth input validation accepts normal credentials and rejects malformed values", () => {
  assert.equal(validEmail("buyer@example.com"), true);
  assert.equal(validEmail("buyer"), false);
  assert.equal(validPassword("eight888"), true);
  assert.equal(validPassword("short"), false);
});

test("cookie-bearing auth mutations require same origin when Origin is sent", () => {
  assert.equal(isSameOrigin(new Request("https://shop.example/api/auth/sign-in", { headers: { origin: "https://shop.example" } })), true);
  assert.equal(isSameOrigin(new Request("https://shop.example/api/auth/sign-in", { headers: { origin: "https://evil.example" } })), false);
  assert.equal(isSameOrigin(new Request("https://shop.example/api/auth/sign-in")), true);
});
