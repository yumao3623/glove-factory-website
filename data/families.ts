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
    route: null,
    buyerUse: "Formalwear and long-glove programmes.",
    detail: "Collection route is scheduled for a later checkpoint.",
    availableNow: false,
  },
  {
    slug: "costume-gloves",
    title: "Costume / Stage Gloves",
    route: null,
    buyerUse: "Stage, performance and supported costume ranges.",
    detail: "Collection route is scheduled for a later checkpoint.",
    availableNow: false,
  },
  {
    slug: "kids-dress-gloves",
    title: "Kids / Girls Dress Gloves",
    route: null,
    buyerUse: "Girls' dress and formal-occasion programmes.",
    detail: "Collection route is scheduled for a later checkpoint.",
    availableNow: false,
  },
  {
    slug: "wedding-veils",
    title: "Wedding / Bridal Veils",
    route: null,
    buyerUse: "Bridal veil ranges and accessory coordination.",
    detail: "Collection route is scheduled for a later checkpoint.",
    availableNow: false,
  },
];
