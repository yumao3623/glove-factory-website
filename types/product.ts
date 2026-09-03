export const factStatuses = [
  "CONFIRMED",
  "PENDING_CONFIRMATION",
  "UNKNOWN",
  "NOT_APPLICABLE",
] as const;

export type FactStatus = (typeof factStatuses)[number];
export type ProductFamily =
  | "bridal-gloves"
  | "opera-gloves"
  | "costume-gloves"
  | "kids-dress-gloves"
  | "wedding-veils";

export type SourcedValue<T> = {
  value: T | null;
  status: FactStatus;
  source: string;
};

export type AssetReference = {
  assetId: string;
  role: "primary" | "detail" | "context" | "thumbnail";
  status: FactStatus;
  source: string;
  path: string | null;
  width: number | null;
  height: number | null;
  altText: string | null;
};

export type CustomizableField = {
  field: "pattern" | "color" | "size" | "logo" | "packaging" | "supplied-material";
  status: FactStatus;
  source: string;
};

export type ProductProvenance = {
  normalizedProductGroupId?: string;
  sourceListingIds: string[];
};

export type ProductRecord = {
  id: string;
  slug?: string;
  provenance: ProductProvenance;
  productName: string;
  productFamily: ProductFamily;
  subStyle?: string[];
  material: SourcedValue<string>;
  length?: SourcedValue<{ value: number; unit: "cm" | "in"; label: string }>;
  color?: SourcedValue<string[]>;
  size?: SourcedValue<string[]>;
  fingerStyle?: SourcedValue<"full-finger" | "fingerless" | "half-finger" | "not-applicable">;
  decoration?: SourcedValue<string[]>;
  ageGroup?: SourcedValue<"adult" | "kids" | "mixed">;
  occasion?: SourcedValue<string[]>;
  customizableFields: CustomizableField[];
  images: AssetReference[];
  thumbnail: AssetReference;
  shortDescription: string;
  specifications: Record<string, SourcedValue<string | number | boolean | string[]>>;
  featured: boolean;
  sortOrder: number;
  status: "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "ARCHIVED";
  moq?: SourcedValue<{ value: number; unit: string }>;
  sample?: SourcedValue<string>;
  leadTime?: SourcedValue<string>;
  capacity?: SourcedValue<string>;
};

export type DevelopmentFixtureProduct = {
  id: string;
  fixture: true;
  contentBoundary: "SYNTHETIC_DEV_ONLY_NOT_FOR_FACTUAL_PUBLISHING";
  productName: string;
  productFamily: ProductFamily;
  style: string;
  material: SourcedValue<string>;
  imageStatus: "NEUTRAL_PLACEHOLDER_NO_PRODUCT_IMAGE";
  productStatus: "DRAFT";
  shortDescription: string;
};
