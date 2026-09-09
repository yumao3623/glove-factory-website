import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { getProductRfqContext } from "@/data/product-rfq-context";
import { Button } from "@/components/ui/button";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

export function ProductCard({ product }: { product: ApprovedCatalogueProduct }) {
  const supportingImages = product.collectionImages.filter((image) => image.assetId !== product.primaryImage.assetId);
  const rfqContext = getProductRfqContext(product);
  return <article className="border-t border-stone-300 pt-7 lg:grid lg:grid-cols-12 lg:gap-10 lg:pt-10" data-product-id={rfqContext.productId} data-product-slug={rfqContext.slug} data-product-family={rfqContext.family} data-product-name={rfqContext.approvedDisplayName} data-source-route={rfqContext.sourceRoute}>
    <div className="lg:col-span-5"><p className="section-label text-stone-500">Style reference</p><h3 className="mt-3 max-w-[12ch] font-serif text-4xl leading-[1.02] sm:text-5xl"><Link href={`/products/${product.slug}/`} className="underline decoration-stone-300 underline-offset-8 transition-colors hover:decoration-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">{product.productName}</Link></h3><p className="mt-5 max-w-md leading-7 text-stone-600">{product.shortDescription}</p><div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"><Button asChild variant="link" size="lg" className="min-h-11 w-fit rounded-none px-0 text-black underline-offset-4"><Link href={`/products/${product.slug}/`}>View product preview <ArrowRightIcon data-icon="inline-end" /></Link></Button><Button asChild variant="link" size="lg" className="min-h-11 w-fit rounded-none px-0 text-black underline-offset-4"><a href="#rfq">Discuss your requirements <ArrowRightIcon data-icon="inline-end" /></a></Button></div></div>
    {supportingImages.length > 0 ? <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7 lg:mt-0">{supportingImages.map((image) => <EditorialImage key={image.assetId} src={approvedProductImage(image)} alt={image.altText} className="aspect-[4/5]" imageClassName="object-cover object-center" sizes="(min-width: 1024px) 26vw, 50vw" />)}</div> : null}
  </article>;
}
