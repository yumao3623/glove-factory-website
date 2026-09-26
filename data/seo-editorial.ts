import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

// Human-edited descriptions for the first SEO tranche. They use only fields
// already marked CONFIRMED in the approved registry; unknown commercial facts
// stay explicitly in the enquiry flow.
const descriptions: Record<string, string> = {
  "bridal-gloves-sheer-lace-long-001": "A long, sheer lace fingerless direction in black for bridal and formalwear collections. Use the reference images to discuss trim, colour matching and sizing; fibre composition and commercial terms remain to be confirmed with the factory.",
  "bridal-gloves-728908046635": "Beaded, fingerless lace gloves with a black-and-white colour direction for bridal and formalwear briefs. The beaded surface is a visual reference; construction, materials and sampling are reviewed per project.",
  "bridal-gloves-735814134529": "Long ruched satin gloves with a full-finger silhouette for bridal and formalwear ranges. Share the desired colour, measurements and finish so the sample brief can be checked.",
  "bridal-gloves-776820765686": "Short full-finger lace gloves with a red, black, white or pink colour direction for bridal and formalwear collections. Confirm the final colour and construction against a sample.",
  "opera-gloves-730186552239": "Long smooth satin opera gloves for bridal and formalwear sourcing. Use the reference to discuss proportion, colour and fit; fibre composition, measurements and terms remain project confirmations.",
  "opera-gloves-844530638864": "A long satin opera glove direction with black, purple or champagne colour options recorded in the source evidence. Confirm the final shade, measurements, construction and sample requirements for your market.",
  "opera-gloves-satin-short-001": "Short satin dress gloves with a white satin colour direction. Discuss measurements, finish and packaging with the factory before a quotation.",
  "opera-gloves-729142545579": "Fingerless formal gloves with a beaded bow detail for bridal and eveningwear briefs. Use the reference to align on decoration and fit; material and timing are confirmed per project.",
  "kids-dress-gloves-satin-bow-001": "Girls' full-finger satin bow dress gloves for special-occasion ranges. The approved record identifies a kids' occasion direction; share the target size range and colour for review.",
  "kids-dress-gloves-728772172182": "Girls' fingerless lace dress gloves with a black-and-white colour direction for special-occasion collections. Confirm the final fit, materials and trim through the sample process.",
  "wedding-veils-black-lace-trim-001": "A black lace-trim veil direction for wedding and bridal accessory collections. Use the reference to discuss trim, attachment and proportion; final construction and packaging are confirmed per project.",
  "costume-gloves-962080651234": "Feather and lace wrist cuffs for supported, non-licensed stage and costume briefs, with a black lace colour direction in the approved record. Share the performance context and decoration requirements for review.",
  "costume-gloves-732732478288": "Long glossy costume gloves for supported, non-licensed stage and costume programmes. Use the reference silhouette to discuss colour, finish and fit without assuming unconfirmed material or timing.",
  "bridal-gloves-857043957533": "Long fingerless satin bridal arm sleeves for bridal and formalwear accessory ranges. Share sleeve length, opening, colour and measurements so the factory can review the intended proportion.",
  "bridal-gloves-761321664860": "Beaded tulle bridal arm sleeves for bridal and formalwear briefs. Use the reference to discuss beading, trim and proportion; construction, materials and sample timing remain project confirmations.",
};

export function getSeoProductDescription(product: Pick<ApprovedCatalogueProduct, "slug" | "shortDescription">): string {
  return descriptions[product.slug] ?? product.shortDescription;
}

export function getSeoProductMetaDescription(product: Pick<ApprovedCatalogueProduct, "slug" | "shortDescription">): string {
  const description = getSeoProductDescription(product);
  if (description.length <= 160) return description;
  const clipped = description.slice(0, 157);
  const boundary = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, boundary > 80 ? boundary : 157)}…`;
}
