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
};

export type RfqValidation = { valid: true; data: Required<Omit<RfqPayload, "whatsapp" | "website">> & { whatsapp?: string } } | { valid: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const families = new Set(["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils"]);

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

  if (!name) errors.name = "Name is required.";
  if (!company) errors.company = "Company is required.";
  if (!country) errors.country = "Country is required.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid business email.";
  if (!families.has(productFamily)) errors.productFamily = "Choose a product family.";
  if (!quantity) errors.quantity = "Quantity is required.";
  if (!message) errors.message = "Message is required.";
  if (payload.consent !== true) errors.consent = "Consent is required.";
  if (text(payload.website)) errors.website = "Submission cannot be processed.";

  if (Object.keys(errors).length) return { valid: false, errors };
  return { valid: true, data: { name, company, country, email, productFamily, quantity, message, consent: true, ...(whatsapp ? { whatsapp } : {}) } };
}
