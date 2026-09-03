import { ArrowRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { Button } from "@/components/ui/button";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export function ProductCard({ product }: { product: ApprovedCatalogueProduct }) {
  const supportingImages = product.collectionImages.filter((image) => image.assetId !== product.primaryImage.assetId);
  return <article className="border-t border-stone-300 pt-7 lg:grid lg:grid-cols-12 lg:gap-10 lg:pt-10">
    <div className="lg:col-span-5"><p className="section-label text-stone-500">Style reference</p><h3 className="mt-3 max-w-[12ch] font-serif text-4xl leading-[1.02] sm:text-5xl">{product.productName}</h3><p className="mt-5 max-w-md leading-7 text-stone-600">{product.shortDescription}</p><Button asChild variant="link" size="lg" className="mt-5 min-h-11 w-fit rounded-none px-0 text-black underline-offset-4"><a href="#rfq">Discuss your requirements <ArrowRightIcon data-icon="inline-end" /></a></Button></div>
    {supportingImages.length > 0 ? <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7 lg:mt-0">{supportingImages.map((image) => <EditorialImage key={image.assetId} src={approvedProductImage(image)} alt={image.altText} className="aspect-square bg-[#efefec]" imageClassName="object-contain" />)}</div> : null}
  </article>;
}
