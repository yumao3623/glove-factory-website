import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, Heart, PackageCheck, Ruler, Sparkles } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { ProductConfigurator } from "@/components/product/product-configurator";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { getProductRfqContext } from "@/data/product-rfq-context";
import { displayColors, displayFamily, displayFingerStyle, displayLength, displayMaterial } from "@/lib/product-display";
import { canonicalUrl, getSiteOrigin } from "@/lib/site";
import { isIndexableProductSlug } from "@/data/seo-index";
import { isIndexableProduction } from "@/lib/stakeholder-preview";
import { getSeoProductDescription } from "@/data/seo-editorial";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";

function confirmedValues(product: ApprovedCatalogueProduct): Array<[string, string]> {
  const values: Array<[string, string]> = [["Family", displayFamily(product)], ["Material", displayMaterial(product)], ["Colour direction", displayColors(product).join(", ") || "Available on request"], ["Length", displayLength(product)], ["Finger style", displayFingerStyle(product)]];
  if (product.subStyle?.length) values.push(["Style", product.subStyle.join(", ")]);
  if (product.decoration?.status === "CONFIRMED" && product.decoration.value?.length) values.push(["Detail", product.decoration.value.join(", ")]);
  if (product.ageGroup?.status === "CONFIRMED" && product.ageGroup.value) values.push(["Age group", product.ageGroup.value]);
  for (const [label, fact] of Object.entries(product.specifications)) {
    if (fact.status === "CONFIRMED" && fact.value !== null && fact.value !== "") values.push([label.replaceAll("_", " "), Array.isArray(fact.value) ? fact.value.join(", ") : String(fact.value)]);
  }
  return values;
}

function productStructuredData(product: ApprovedCatalogueProduct) {
  const productUrl = canonicalUrl(`/products/${product.slug}/`).toString();
  const image = product.collectionImages.map((reference) => new URL(approvedProductImage(reference), getSiteOrigin()).toString());
  const properties: Array<{ "@type": "PropertyValue"; name: string; value: string }> = [];
  if (product.length?.status === "CONFIRMED" && product.length.value) properties.push({ "@type": "PropertyValue", name: "Length", value: product.length.value.label });
  if (product.fingerStyle?.status === "CONFIRMED" && product.fingerStyle.value) properties.push({ "@type": "PropertyValue", name: "Finger style", value: displayFingerStyle(product) });
  if (product.ageGroup?.status === "CONFIRMED" && product.ageGroup.value) properties.push({ "@type": "PropertyValue", name: "Age group", value: product.ageGroup.value });
  if (product.occasion?.status === "CONFIRMED" && product.occasion.value?.length) properties.push({ "@type": "PropertyValue", name: "Occasion", value: product.occasion.value.join(", ") });
  if (product.decoration?.status === "CONFIRMED" && product.decoration.value?.length) properties.push({ "@type": "PropertyValue", name: "Detail", value: product.decoration.value.join(", ") });
  const productData: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.productName,
    description: getSeoProductDescription(product),
    url: productUrl,
    image,
    category: displayFamily(product),
    brand: { "@type": "Brand", name: "JS Meilai" },
  };
  if (properties.length) productData.additionalProperty = properties;
  if (product.material.status === "CONFIRMED" && product.material.value) productData.material = product.material.value;
  const colors = displayColors(product);
  if (colors.length) productData.color = colors.join(", ");
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/").toString() },
      { "@type": "ListItem", position: 2, name: "Products", item: canonicalUrl("/products/").toString() },
      { "@type": "ListItem", position: 3, name: displayFamily(product), item: canonicalUrl(`/${product.productFamily}/`).toString() },
      { "@type": "ListItem", position: 4, name: product.productName, item: productUrl },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [productData, breadcrumb] };
}

export async function ProductDetailPreview({ product, indexable = false }: { product: ApprovedCatalogueProduct; indexable?: boolean }) {
  const context = getProductRfqContext(product);
  const attributes = confirmedValues(product);
  const related = (await getCommerceCatalogue(product.productFamily)).filter((item) => item.id !== product.id && (!isIndexableProduction || isIndexableProductSlug(item.slug))).slice(0, 4);
  const structuredData = productStructuredData(product);
  return <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f8f6f2]" data-rfq-context={JSON.stringify(context)}>
    {indexable ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /> : null}
    <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-600"><Link href={context.sourceRoute} className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Back to {displayFamily(product)}</Link><span aria-hidden="true"> | </span><span aria-current="page">{product.productName}</span></nav>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-5" aria-label="Approved product images">{product.collectionImages.map((image, index) => <EditorialImage key={image.assetId} src={approvedProductImage(image)} alt={image.altText} priority={index === 0} className={index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"} imageClassName="object-cover object-center" sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 28vw, 50vw"} />)}</div>
        <div className="flex flex-col justify-center py-4 lg:py-8"><p className="section-label text-stone-600">Factory collection · Made for your brief</p><h1 className="mt-3 max-w-[14ch] font-serif text-[clamp(2.75rem,4.5vw,4.75rem)] leading-[.95] tracking-[-.02em]">{product.productName}</h1><p className="mt-5 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">{getSeoProductDescription(product)}</p><div className="mt-7 grid grid-cols-3 gap-2 border-y border-stone-300 py-4 text-center text-xs text-stone-600"><div><Ruler className="mx-auto mb-2 text-[#0d2b3f]" size={17} /><span>Sizing review</span></div><div><PackageCheck className="mx-auto mb-2 text-[#0d2b3f]" size={17} /><span>Wholesale enquiry</span></div><div><Sparkles className="mx-auto mb-2 text-[#0d2b3f]" size={17} /><span>Custom route</span></div></div>{attributes.length ? <details open className="mt-7 border-b border-stone-300"><summary className="cursor-pointer list-none py-3 text-xs font-semibold uppercase tracking-[.12em] text-stone-600">Confirmed product details</summary><dl className="pb-4">{attributes.map(([label, value]) => <div key={label} className="grid grid-cols-[minmax(7rem,.7fr)_1fr] gap-5 border-t border-stone-200 py-3 text-sm"><dt className="text-stone-500">{label}</dt><dd className="font-medium text-stone-900">{value}</dd></div>)}</dl></details> : null}<div className="mt-6 border-y border-stone-300 py-4 text-sm leading-6 text-stone-600"><p><strong className="font-medium text-stone-900">For a quotation:</strong> share quantity, target market, colour, measurements, packaging and any supplied materials.</p><p className="mt-2">Material composition, MOQ, sample timing, lead time and payment terms are confirmed per project; this page does not publish unverified commercial promises.</p></div><ProductConfigurator product={product} /><div className="mt-6 grid gap-2"><details className="border-b border-stone-300"><summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm"><span>Sizing & measuring guide</span><Ruler size={15} /></summary><p className="pb-4 text-sm leading-6 text-stone-600">Include palm circumference, hand length and arm length in your enquiry; final sizing follows sample approval.</p></details><details className="border-b border-stone-300"><summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm"><span>Customisation & packaging</span><Sparkles size={15} /></summary><p className="pb-4 text-sm leading-6 text-stone-600">Discuss colour, construction, logo, packaging and supplied materials; feasibility is confirmed per project.</p></details><details className="border-b border-stone-300"><summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm"><span>Save product</span><Heart size={15} /></summary><p className="pb-4 text-sm leading-6 text-stone-600">Use the heart on a catalogue card to save a product for comparison.</p></details></div><div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"><Link href={context.sourceRoute} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><ArrowLeftIcon aria-hidden="true" />Back to collection</Link><a href={`${context.sourceRoute}#rfq`} className="inline-flex min-h-11 items-center gap-2 bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Discuss this direction <ArrowRightIcon aria-hidden="true" /></a></div><p className="mt-6 max-w-md text-sm leading-6 text-stone-600">Need a different colour, fit or finish? Include your requirements in an enquiry so we can review samples, packaging and delivery with you.</p></div>
      </div>
    </div>
    {related.length ? <section className="border-t border-stone-300 bg-white"><div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="flex items-end justify-between gap-4"><div><p className="section-label text-stone-500">You may also like</p><h2 className="mt-3 font-serif text-4xl text-[#0d2b3f]">More from {displayFamily(product)}</h2></div><Link href={context.sourceRoute} className="hidden text-sm underline sm:block">View collection</Link></div><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">{related.map((item) => <Link key={item.id} href={`/products/${item.slug}/`} className="group"><div className="aspect-[4/5] overflow-hidden bg-stone-100"><EditorialImage src={approvedProductImage(item.primaryImage)} alt={item.primaryImage.altText} className="h-full w-full" imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 640px) 25vw, 50vw" /></div><p className="mt-3 font-serif text-xl leading-tight text-[#0d2b3f]">{item.productName}</p><p className="mt-1 text-xs text-stone-500">{displayMaterial(item)} · {displayLength(item)}</p></Link>)}</div></div></section> : null}
  </main>;
}
