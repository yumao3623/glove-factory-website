import assert from "node:assert/strict";
import test from "node:test";
import { validateRfq } from "../lib/rfq-validation";

const validPayload = {
  name: "Buyer Name",
  company: "Buyer Company",
  country: "United Kingdom",
  email: "buyer@example.com",
  productFamily: "bridal-gloves",
  quantity: "500 pairs",
  message: "Please advise on a bridal glove range.",
  consent: true,
};

test("accepts a complete qualified RFQ payload", () => {
  const result = validateRfq(validPayload);
  assert.equal(result.valid, true);
  if (result.valid) assert.equal(result.data.productFamily, "bridal-gloves");
});

test("rejects missing consent, invalid email, and a non-family value", () => {
  const result = validateRfq({ ...validPayload, consent: false, email: "invalid", productFamily: "wholesale-gloves" });
  assert.equal(result.valid, false);
  if (!result.valid) {
    assert.ok(result.errors.consent);
    assert.ok(result.errors.email);
    assert.ok(result.errors.productFamily);
  }
});

test("rejects a filled honeypot without exposing data", () => {
  const result = validateRfq({ ...validPayload, website: "https://spam.example" });
  assert.equal(result.valid, false);
  if (!result.valid) assert.equal(result.errors.website, "Submission cannot be processed.");
});
