import type { ProductFamily } from "@/types/product";

export type FamilyEntry = {
  slug: ProductFamily;
  title: string;
  route: string | null;
  buyerUse: string;
  detail: string;
  availableNow: boolean;
};

export const families: FamilyEntry[] = [
  {
    slug: "bridal-gloves",
    title: "Bridal / Wedding Gloves",
    route: "/bridal-gloves/",
    buyerUse: "Bridal ranges and ceremony-led assortments.",
    detail: "The first collection template in this checkpoint.",
    availableNow: true,
  },
  {
    slug: "opera-gloves",
    title: "Opera / Evening / Formal Gloves",
    route: "/opera-gloves/",
    buyerUse: "Formalwear and long-glove programmes.",
    detail: "Long-glove references for formalwear sourcing conversations.",
    availableNow: true,
  },
  {
    slug: "costume-gloves",
    title: "Costume / Stage Gloves",
    route: "/costume-gloves/",
    buyerUse: "Stage, performance and supported costume ranges.",
    detail: "Scope-controlled stage and supported costume directions.",
    availableNow: true,
  },
  {
    slug: "kids-dress-gloves",
    title: "Kids / Girls Dress Gloves",
    route: "/kids-dress-gloves/",
    buyerUse: "Girls' dress and formal-occasion programmes.",
    detail: "Girls' dress and special-occasion references.",
    availableNow: true,
  },
  {
    slug: "wedding-veils",
    title: "Wedding / Bridal Veils",
    route: "/wedding-veils/",
    buyerUse: "Bridal veil ranges and accessory coordination.",
    detail: "A focused veil edit for wedding accessory sourcing.",
    availableNow: true,
  },
];
