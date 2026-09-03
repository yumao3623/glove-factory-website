import type { StaticImageData } from "next/image";
import bridalPrimaryImage from "@/assets/products/bridal-gloves/bridal-gloves-sheer-lace-long-001/web/bridal-gloves__bridal-gloves-sheer-lace-long-001__front__default__v1.webp";
import kidsPrimaryImage from "@/assets/products/kids-dress-gloves/kids-dress-gloves-satin-bow-001/web/kids-dress-gloves__kids-dress-gloves-satin-bow-001__front__default__v1.webp";
import operaPrimaryImage from "@/assets/products/opera-gloves/opera-gloves-satin-short-001/web/opera-gloves__opera-gloves-satin-short-001__front__default__v1.webp";
import veilPrimaryImage from "@/assets/products/wedding-veils/wedding-veils-black-lace-trim-001/web/wedding-veils__wedding-veils-black-lace-trim-001__front__default__v1.webp";
import bridalDetailOneImage from "@/assets/products/bridal-gloves/bridal-gloves-sheer-lace-long-001/web/bridal-gloves__bridal-gloves-sheer-lace-long-001__detail-01__default__v1.webp";
import bridalDetailTwoImage from "@/assets/products/bridal-gloves/bridal-gloves-sheer-lace-long-001/web/bridal-gloves__bridal-gloves-sheer-lace-long-001__detail-02__default__v1.webp";
import kidsDetailImage from "@/assets/products/kids-dress-gloves/kids-dress-gloves-satin-bow-001/web/kids-dress-gloves__kids-dress-gloves-satin-bow-001__detail__default__v1.webp";
import veilCombImage from "@/assets/products/wedding-veils/wedding-veils-black-lace-trim-001/web/wedding-veils__wedding-veils-black-lace-trim-001__comb__default__v1.webp";
import veilDressFormImage from "@/assets/products/wedding-veils/wedding-veils-black-lace-trim-001/web/wedding-veils__wedding-veils-black-lace-trim-001__dress-form__default__v1.webp";
import type { ApprovedCatalogueImage } from "@/data/approved-catalogue";

const imageByAssetId: Record<string, StaticImageData> = {
  "bridal-gloves-sheer-lace-long-001-front-web": bridalPrimaryImage,
  "bridal-gloves-sheer-lace-long-001-detail-01-web": bridalDetailOneImage,
  "bridal-gloves-sheer-lace-long-001-detail-02-web": bridalDetailTwoImage,
  "kids-dress-gloves-satin-bow-001-front-web": kidsPrimaryImage,
  "kids-dress-gloves-satin-bow-001-detail-web": kidsDetailImage,
  "opera-gloves-satin-short-001-front-web": operaPrimaryImage,
  "wedding-veils-black-lace-trim-001-front-web": veilPrimaryImage,
  "wedding-veils-black-lace-trim-001-comb-web": veilCombImage,
  "wedding-veils-black-lace-trim-001-dress-form-web": veilDressFormImage,
};

export function approvedProductImage(imageReference: ApprovedCatalogueImage): StaticImageData {
  const image = imageByAssetId[imageReference.assetId];
  if (!image) throw new Error(`Missing static import for approved production asset ${imageReference.assetId}.`);
  return image;
}
