import type { ApprovedCatalogueImage } from "@/data/approved-catalogue";

/** Product images are served only through the protected storage gateway. */
export function approvedProductImage(imageReference: ApprovedCatalogueImage): string {
  if (imageReference.path?.startsWith("/api/media/products/")) return imageReference.path;
  throw new Error(`Missing storage path for approved production asset ${imageReference.assetId}.`);
}
