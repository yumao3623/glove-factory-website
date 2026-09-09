import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { getProductRfqContext } from "@/data/product-rfq-context";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

function confirmedValues(product: ApprovedCatalogueProduct): Array<[string, string]> {
  const values: Array<[string, string]> = [];
  if (product.subStyle?.length) values.push(["Style", product.subStyle.join(", ")]);
  if (product.fingerStyle?.status === "CONFIRMED" && product.fingerStyle.value) values.push(["Finger style", product.fingerStyle.value]);
  if (product.decoration?.status === "CONFIRMED" && product.decoration.value?.length) values.push(["Detail", product.decoration.value.join(", ")]);
  if (product.ageGroup?.status === "CONFIRMED" && product.ageGroup.value) values.push(["Age group", product.ageGroup.value]);
  if (product.color?.status === "CONFIRMED" && product.color.value?.length) values.push(["Colour", product.color.value.join(", ")]);
  return values;
}

export function ProductDetailPreview({ product }: { product: ApprovedCatalogueProduct }) {
  const context = getProductRfqContext(product);
  const attributes = confirmedValues(product);
  return <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f8f6f2]" data-rfq-context={JSON.stringify(context)}>
    <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600"><Link href={context.sourceRoute} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Back to {product.productFamily.replaceAll("-", " ")}</Link><span aria-hidden="true"> / </span><span aria-current="page">{product.productName}</span></nav>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-5" aria-label="Approved product images">{product.collectionImages.map((image, index) => <EditorialImage key={image.assetId} src={approvedProductImage(image)} alt={image.altText} priority={index === 0} className={index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"} imageClassName="object-cover object-center" sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"} />)}</div>
        <div className="flex flex-col justify-center py-4 lg:py-10"><p className="section-label text-stone-600">Product preview</p><h1 className="mt-3 max-w-[11ch] font-serif text-5xl leading-[.95] sm:text-6xl">{product.productName}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-stone-700">{product.shortDescription}</p>{attributes.length ? <dl className="mt-8 border-y border-stone-300">{attributes.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(7rem,.7fr)_1fr] gap-5 border-b border-stone-300 py-3 text-sm last:border-b-0"><dt className="text-stone-500">{label}</dt><dd className="font-medium text-stone-900">{value}</dd></div>)}</dl> : null}<div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"><Link href={context.sourceRoute} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><ArrowLeftIcon aria-hidden="true" />Back to collection</Link><a href={`${context.sourceRoute}#rfq`} className="inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Discuss this direction <ArrowRightIcon aria-hidden="true" /></a></div><p className="mt-6 max-w-md text-sm leading-6 text-stone-600">This internal preview uses approved imagery and confirmed fields only. Enquiry delivery remains offline in the stakeholder preview.</p></div>
      </div>
    </div>
  </main>;
}
