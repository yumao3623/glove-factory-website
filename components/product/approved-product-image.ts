import type { StaticImageData } from "next/image";
import type { ApprovedCatalogueImage } from "@/data/approved-catalogue";

/** Approved catalogue derivatives are copied into public/ by the W02 build step. */
export function approvedProductImage(imageReference: ApprovedCatalogueImage): StaticImageData {
  if (!imageReference.path?.startsWith("/products/") || !imageReference.width || !imageReference.height) {
    throw new Error(`Missing local path for approved production asset ${imageReference.assetId}.`);
  }
  return { src: imageReference.path, width: imageReference.width, height: imageReference.height };
}
