import type { DevelopmentFixtureProduct, ProductFamily } from "@/types/product";

const boundary = "SYNTHETIC_DEV_ONLY_NOT_FOR_FACTUAL_PUBLISHING" as const;

function fixture(id: string, productFamily: ProductFamily, productName: string, style: string, shortDescription: string): DevelopmentFixtureProduct {
  return {
    id,
    fixture: true,
    contentBoundary: boundary,
    productName,
    productFamily,
    style,
    material: { value: null, status: "PENDING_CONFIRMATION", source: "Development fixture only" },
    imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE",
    productStatus: "DRAFT",
    shortDescription,
  };
}

export const operaDevelopmentFixtures = [
  fixture("dev-opera-01", "opera-gloves", "Long glove colour study", "Long / formal reference", "Visual reference for formalwear range conversations; final product details remain pending."),
  fixture("dev-opera-02", "opera-gloves", "Satin evening glove study", "Satin / evening reference", "Visual reference for evening styling conversations; final product details remain pending."),
  fixture("dev-opera-03", "opera-gloves", "Opera glove proportion study", "Opera / long form", "Visual reference for length and proportion discussions; measured specifications remain pending."),
] as const;

export const kidsDevelopmentFixtures = [
  fixture("dev-kids-01", "kids-dress-gloves", "Satin bow dress-glove study", "Bow / dress reference", "Visual reference for girls' special-occasion ranges; age and size details remain pending."),
  fixture("dev-kids-02", "kids-dress-gloves", "Colour study for girls' dress gloves", "Satin / colour reference", "Visual reference for colour direction; available colours and specifications remain pending."),
] as const;

export const veilDevelopmentFixtures = [
  fixture("dev-veil-01", "wedding-veils", "Layered veil silhouette study", "Layered / wedding reference", "A focused visual reference for wedding veil direction; length and construction remain pending."),
  fixture("dev-veil-02", "wedding-veils", "Black veil colourway study", "Black / wedding reference", "Visual reference for a darker wedding or event direction; final details remain pending."),
  fixture("dev-veil-03", "wedding-veils", "Veil comb detail study", "Comb / detail reference", "Detail reference for accessory coordination; attachment and dimension details remain pending."),
] as const;
