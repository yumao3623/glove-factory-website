import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { getMarketQuote, applyWholesalePrice } from "@/lib/commerce/markets";
import { createPaddleTransaction, verifyPaddleSignature } from "@/lib/commerce/paddle-rest";
import { createPayPalOrder, verifyPayPalWebhook } from "@/lib/commerce/paypal-rest";

test("market quote applies configured wholesale threshold and currency", () => {
  const quote = getMarketQuote("GB");
  assert.equal(quote.currency, "GBP");
  assert.equal(applyWholesalePrice(10000, 19, quote), 10000);
  assert.equal(applyWholesalePrice(10000, 20, quote), 9200);
});

test("paddle checkout fails closed when secret is absent", async () => {
  delete process.env.PADDLE_API_KEY;
  const result = await createPaddleTransaction([{ priceId: "pri_test", quantity: 1 }], {});
  assert.equal(result.configured, false);
});

test("paddle webhook signature verifies a fresh signed payload", () => {
  const payload = JSON.stringify({ type: "checkout.session.completed" });
  const secret = "whsec_test";
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", secret).update(`${timestamp}:${payload}`).digest("hex");
  assert.equal(verifyPaddleSignature(payload, `ts=${timestamp};h1=${signature}`, secret), true);
  assert.equal(verifyPaddleSignature(payload, `ts=${timestamp};h1=bad`, secret), false);
});

test("paypal checkout fails closed until merchant verification", async () => {
  delete process.env.PAYPAL_CLIENT_ID;
  delete process.env.PAYPAL_CLIENT_SECRET;
  const result = await createPayPalOrder({ orderId: "quote_test_001", lines: [{ name: "Approved glove direction", quantity: 1, unitAmountMinor: 1000, currency: "USD" }] });
  assert.equal(result.configured, false);
  assert.match(result.error, /pending merchant verification/i);
});

test("paypal webhook verification fails closed without merchant configuration", async () => {
  delete process.env.PAYPAL_CLIENT_ID;
  delete process.env.PAYPAL_CLIENT_SECRET;
  delete process.env.PAYPAL_WEBHOOK_ID;
  const result = await verifyPayPalWebhook("{}", { authAlgo: null, certUrl: null, transmissionId: null, transmissionSig: null, transmissionTime: null });
  assert.equal(result.configured, false);
  assert.equal(result.verified, false);
});
