import type { StaticImageData } from "next/image";
import type { ApprovedCatalogueImage } from "@/data/approved-catalogue";

/** Resolve either a protected Supabase media route or a local provenance derivative. */
export function approvedProductImage(imageReference: ApprovedCatalogueImage): StaticImageData | string {
  if (/^https?:\/\//i.test(imageReference.path ?? "") || imageReference.path?.startsWith("/api/media/")) return imageReference.path!;
  if (!imageReference.path?.startsWith("/products/") || !imageReference.width || !imageReference.height) {
    throw new Error(`Missing local path for approved production asset ${imageReference.assetId}.`);
  }
  return { src: imageReference.path, width: imageReference.width, height: imageReference.height };
}
