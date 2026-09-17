export type RfqPayload = {
  name?: unknown;
  company?: unknown;
  country?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  productFamily?: unknown;
  quantity?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
  idempotencyKey?: unknown;
  productContext?: unknown;
};

export type ValidatedRfq = { name: string; company: string; country: string; email: string; productFamily: string; quantity: string; quantityInteger: number | null; quantityDescription: string; message: string; consent: true; whatsapp?: string; idempotencyKey?: string; productContext: Array<Record<string, unknown>> };

export type RfqValidation = { valid: true; data: ValidatedRfq } | { valid: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const families = new Set(["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"]);

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateRfq(payload: RfqPayload): RfqValidation {
  const errors: Record<string, string> = {};
  const name = text(payload.name);
  const company = text(payload.company);
  const country = text(payload.country);
  const email = text(payload.email);
  const productFamily = text(payload.productFamily);
  const quantity = text(payload.quantity);
  const message = text(payload.message);
  const whatsapp = text(payload.whatsapp);
  const idempotencyKey = text(payload.idempotencyKey);

  if (!name) errors.name = "Name is required.";
  if (!company) errors.company = "Company is required.";
  if (!country) errors.country = "Country is required.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid business email.";
  if (!families.has(productFamily)) errors.productFamily = "Choose a product family.";
  if (!quantity) errors.quantity = "Quantity is required.";
  if (!message) errors.message = "Message is required.";
  if (payload.consent !== true) errors.consent = "Consent is required.";
  if (text(payload.website)) errors.website = "Submission cannot be processed.";
  if (idempotencyKey && !/^[0-9a-f-]{36}$/i.test(idempotencyKey)) errors.idempotencyKey = "Invalid request key.";

  for (const [key, value, max] of [["name", name, 200], ["company", company, 200], ["country", country, 200], ["email", email, 254], ["quantity", quantity, 100], ["message", message, 6000], ["whatsapp", whatsapp, 80]] as const) if (value.length > max) errors[key] = `Use no more than ${max} characters.`;
  if (/^0+$/.test(quantity.replace(/[,\s]/g, ""))) errors.quantity = "Enter a quantity greater than zero.";
  if (Object.keys(errors).length) return { valid: false, errors };
  const numeric = Number(quantity.replace(/[,\s]/g, ""));
  const quantityInteger = /^\d+$/.test(quantity.replace(/[,\s]/g, "")) && Number.isSafeInteger(numeric) ? numeric : null;
  const productContext = Array.isArray(payload.productContext) ? payload.productContext.slice(0, 50).filter(item => item && typeof item === "object").map(item => Object.fromEntries(Object.entries(item as Record<string, unknown>).filter(([key, value]) => ["productId", "productName", "productSlug", "family", "quantity", "color", "size", "addons"].includes(key) && ["string", "number", "object"].includes(typeof value)))) : [];
  return { valid: true, data: { name, company, country, email, productFamily, quantity, quantityInteger, quantityDescription: quantity, message, consent: true, productContext, ...(idempotencyKey ? { idempotencyKey } : {}), ...(whatsapp ? { whatsapp } : {}) } };
}
