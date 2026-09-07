import costumeStageGloves from "../assets/products/costume-gloves/costume-stage-gloves-legacy-001/web/costume-gloves__costume-stage-gloves-legacy-001__front__red__v1.webp";

/** Stable W05 selections. Product-role images are kept separate from W11 editorial media. */
export const w05HomepageFamilyVisuals = {
  "bridal-gloves": {
    productId: "bridal-gloves-sheer-lace-long-001",
    sourceListingIds: ["856992679458"],
    rationale: "Approved primary production view; the hands and floral-lace surface remain legible in a full-bleed 4:5 crop.",
  },
  "opera-gloves": {
    productId: "opera-gloves-satin-short-001",
    sourceListingIds: ["730659973350", "956904395389"],
    rationale: "Approved primary production view; the dress context supports the formalwear category without adding a retail treatment.",
  },
  "costume-gloves": {
    productId: "costume-stage-gloves-legacy-001",
    sourceListingIds: [],
    source: "_stitch_input_pack/02_CONTENT_PRODUCTS/CONTENT_costume_01.jpg",
    image: costumeStageGloves,
    alt: "Red long stage gloves shown as a product view",
    rationale: "Real non-IP stage-glove source selected by the Human-directed W05 category requirement; it is a category visual only, not an approved ProductRecord or route launch decision.",
  },
  "kids-dress-gloves": {
    productId: "kids-dress-gloves-satin-bow-001",
    sourceListingIds: ["737751870967", "814984964565", "775921736857"],
    rationale: "Approved primary production view; the bow and full-finger silhouette remain clear in the shared category crop.",
  },
  "wedding-veils": {
    productId: "wedding-veils-black-lace-trim-001",
    sourceListingIds: ["800814497148"],
    rationale: "Approved primary production view; its black lace edge gives the five-card group a distinct but truthful veil signal.",
  },
} as const;
