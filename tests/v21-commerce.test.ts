import test from "node:test";
import assert from "node:assert/strict";
import { validateQuote, isPayableQuote, publicQuote, type QuoteOrder } from "@/lib/commerce/quotes";
import { paypalAmountMinor, paypalCheckoutEnabled } from "@/lib/commerce/paypal-rest";
import { validateRfq } from "@/lib/rfq-validation";
import { POST as paypalCheckout } from "@/app/api/checkout/paypal/route";
import { POST as confirmEmail } from "@/app/api/auth/confirm/route";
import { validateProductInput } from "@/lib/commerce/admin";

const quoteInput = () => ({ buyerEmail: "buyer@example.com", currency: "USD", terms: "Confirmed 100 pairs, factory production, delivery and import tax terms agreed.", commercialReview: true, expiresAt: new Date(Date.now() + 86400000).toISOString(), shippingMinor: 5000, taxMinor: 0, items: [{ name: "Confirmed gloves", sku: "G1", quantity: 100, unit_price_minor: 350 }] });
const order = (): QuoteOrder => ({ id: "c137de77-4e50-4a14-90ac-76bda912ffde", buyer_email: "buyer@example.com", customer_id: null, currency: "USD", subtotal_minor: 35000, shipping_minor: 5000, tax_minor: 0, total_minor: 40000, quote_status: "approved", quote_expires_at: new Date(Date.now() + 86400000).toISOString(), quote_terms: quoteInput().terms, quote_access_hash: "private", payment_status: "pending", fulfillment_status: "unfulfilled", paypal_order_id: null, paypal_capture_id: null, order_items: quoteInput().items });

test("quote approval requires explicit commercial review, confirmed shipping/tax and future expiry", () => {
  assert.equal(validateQuote(quoteInput()).errors.length, 0);
  for (const change of [{ commercialReview: false }, { shippingMinor: undefined }, { taxMinor: -1 }, { currency: "JPY" }, { expiresAt: "2020-01-01" }, { items: [{ ...quoteInput().items[0], unit_price_minor: 0 }] }]) assert.ok(validateQuote({ ...quoteInput(), ...change }).errors.length);
});
test("expired, cancelled, paid and internally inconsistent quotes cannot be paid", () => {
  assert.equal(isPayableQuote(order()), true);
  for (const change of [{ quote_status: "cancelled" }, { payment_status: "paid" }, { quote_expires_at: "2020-01-01" }, { total_minor: 1 }, { subtotal_minor: 1 }, { fulfillment_status: "cancelled" }]) assert.equal(isPayableQuote({ ...order(), ...change }), false);
});
test("buyer quote response never exposes access hashes, buyer email or internal payment references", () => {
  const response = JSON.stringify(publicQuote(order()));
  assert.doesNotMatch(response, /private|buyer_email|customer_id|paypal_order_id|quote_access_hash/);
});
test("PayPal currency parser is precise and rejects invalid or unsupported precision", () => {
  assert.equal(paypalAmountMinor({ value: "400.01", currency_code: "USD" }), 40001);
  for (const value of ["0.00", "-1.00", "1.001", "NaN", "1e4", "999999999999999999999.00"]) assert.equal(paypalAmountMinor({ value }), null);
});
test("online checkout cannot charge while the explicit merchant switch is off, even if client supplies an order", async () => {
  process.env.PAYPAL_CHECKOUT_ENABLED = "false";
  assert.equal(paypalCheckoutEnabled(), false);
  const response = await paypalCheckout(new Request("http://localhost/api/checkout/paypal", { method: "POST", body: JSON.stringify({ orderId: order().id, total: 1 }) }));
  assert.equal(response.status, 503);
});
test("account confirmation rejects client-injected session tokens and foreign origins", async () => {
  const injection = await confirmEmail(new Request("http://localhost/api/auth/confirm", { method: "POST", body: JSON.stringify({ access_token: "injected", type: "recovery" }) }));
  assert.equal(injection.status, 400);
  const csrf = await confirmEmail(new Request("http://localhost/api/auth/confirm", { method: "POST", headers: { Origin: "https://other.example" }, body: "{}" }));
  assert.equal(csrf.status, 403);
});
test("RFQ validation rejects zero quantities and oversized messages", () => {
  const data = { name: "Buyer", company: "Factory", country: "US", email: "buyer@example.com", productFamily: "arm-sleeves", quantity: "0", consent: true, message: "Details" };
  assert.equal(validateRfq(data).valid, false);
  assert.equal(validateRfq({ ...data, quantity: "100", message: "x".repeat(6001) }).valid, false);
});
test("product specifications preserve confirmation state and reject malformed facts", () => {
  assert.equal(validateProductInput({ specifications: { MOQ: { value: "100 pairs", status: "PENDING_CONFIRMATION", source: "factory" } } }, true).errors.length, 0);
  assert.ok(validateProductInput({ specifications: { MOQ: "100 pairs" } }, true).errors.length);
  assert.ok(validateProductInput({ specifications: { MOQ: { value: { nested: true }, status: "CONFIRMED", source: "factory" } } }, true).errors.length);
  const blankAge = validateProductInput({ age_group: "" }, true);
  assert.equal(blankAge.errors.length, 0);
  assert.equal(blankAge.payload.age_group, null);
});
