import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export type ProductRfqContext = {
  productId: string;
  slug: string;
  family: ApprovedCatalogueProduct["productFamily"];
  approvedDisplayName: string;
  sourceRoute: string;
};

export function getProductRfqContext(product: ApprovedCatalogueProduct): ProductRfqContext {
  return {
    productId: product.id,
    slug: product.slug,
    family: product.productFamily,
    approvedDisplayName: product.productName,
    sourceRoute: `/${product.productFamily}/`,
  };
}
