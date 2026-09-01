import type { DevelopmentFixtureProduct } from "@/types/product";

const fixtureBoundary = "SYNTHETIC_DEV_ONLY_NOT_FOR_FACTUAL_PUBLISHING" as const;

export const bridalDevelopmentFixtures: DevelopmentFixtureProduct[] = [
  {
    id: "dev-bridal-01",
    fixture: true,
    contentBoundary: fixtureBoundary,
    productName: "Lace bridal glove reference",
    productFamily: "bridal-gloves",
    style: "Lace / long form",
    material: { value: null, status: "PENDING_CONFIRMATION", source: "Development fixture only" },
    imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE",
    productStatus: "DRAFT",
    shortDescription: "Development reference; final product details remain pending confirmation.",
  },
  {
    id: "dev-bridal-02",
    fixture: true,
    contentBoundary: fixtureBoundary,
    productName: "Embellished bridal glove reference",
    productFamily: "bridal-gloves",
    style: "Embellished / fingerless form",
    material: { value: null, status: "PENDING_CONFIRMATION", source: "Development fixture only" },
    imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE",
    productStatus: "DRAFT",
    shortDescription: "Development reference; final product details remain pending confirmation.",
  },
  {
    id: "dev-bridal-03",
    fixture: true,
    contentBoundary: fixtureBoundary,
    productName: "Sheer bridal glove reference",
    productFamily: "bridal-gloves",
    style: "Sheer / short form",
    material: { value: null, status: "PENDING_CONFIRMATION", source: "Development fixture only" },
    imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE",
    productStatus: "DRAFT",
    shortDescription: "Development reference; final product details remain pending confirmation.",
  },
  {
    id: "dev-bridal-04",
    fixture: true,
    contentBoundary: fixtureBoundary,
    productName: "Fingerless lace bridal reference",
    productFamily: "bridal-gloves",
    style: "Lace / fingerless form",
    material: { value: null, status: "PENDING_CONFIRMATION", source: "Development fixture only" },
    imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE",
    productStatus: "DRAFT",
    shortDescription: "Development reference; final product details remain pending confirmation.",
  },
];
