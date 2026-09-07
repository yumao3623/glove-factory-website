import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";
import type { ProductFamily } from "@/types/product";

export type CollectionConfig = {
  family: ProductFamily;
  title: string;
  eyebrow: string;
  intro: string;
  layout: "bridal" | "opera" | "kids" | "veils";
  rangeHeading: string;
  rangeCopy: string;
  procurementHeading: string;
  procurementCopy: string;
};

function Breadcrumb({ title, dark = false }: { title: string; dark?: boolean }) {
  const colors = dark ? "text-stone-300 hover:text-white focus-visible:ring-white" : "text-stone-600 hover:text-black focus-visible:ring-black";
  return <nav aria-label="Breadcrumb" className={`text-sm ${colors}`}><Link href="/" className="focus-visible:outline-none focus-visible:ring-2">Home</Link><span aria-hidden="true"> / </span><Link href="/products/" className="focus-visible:outline-none focus-visible:ring-2">Products</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>;
}

export function CollectionPage({ config, products }: { config: CollectionConfig; products: readonly ApprovedCatalogueProduct[] }) {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Products", item: "/products/" }, { "@type": "ListItem", position: 3, name: config.title, item: `/${config.family}/` }] };
  return <main id="main-content" tabIndex={-1} className="overflow-hidden"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <CollectionHero config={config} product={products[0]} />
    <CollectionRange config={config} products={products} />
    <CollectionProcurement config={config} />
    <section id="rfq" className="bg-black text-white"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-24"><div><p className="section-label text-stone-400">Enquiry</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-[1.04] sm:text-5xl">Review the range without submitting a brief.</h2><p className="mt-5 max-w-sm leading-7 text-stone-300">This stakeholder preview keeps enquiry delivery and visitor-data collection offline.</p></div><div className="rfq-on-dark"><RfqForm /></div></div></section>
  </main>;
}

function CollectionHero({ config, product }: { config: CollectionConfig; product: ApprovedCatalogueProduct | undefined }) {
  const dark = config.layout === "opera";
  return <section className={dark ? "bg-black text-white" : config.layout === "kids" ? "bg-[#f0e7df]" : "bg-white"}><div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12"><Breadcrumb title={config.title} dark={dark} /><div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-16"><div className="lg:col-span-5"><p className={dark ? "section-label text-stone-400" : "section-label"}>{config.eyebrow}</p><h1 className="mt-3 max-w-[8ch] font-serif text-[clamp(3.4rem,7vw,6.4rem)] leading-[.87]">{config.title}</h1><p className={dark ? "mt-6 max-w-[30ch] leading-7 text-stone-300" : "mt-6 max-w-[30ch] leading-7 text-stone-600"}>{config.intro}</p><Button asChild size="lg" className={dark ? "mt-8 min-h-11 rounded-none bg-white px-6 text-black hover:bg-stone-200" : "mt-8 min-h-11 rounded-none bg-black px-6 hover:bg-stone-800"}><a href="#collection">Explore the collection <ArrowRightIcon data-icon="inline-end" /></a></Button></div>{product ? <EditorialImage src={approvedProductImage(product.primaryImage)} alt={product.primaryImage.altText} priority className="aspect-[4/5] lg:col-span-7" imageClassName="object-cover object-center" sizes="(min-width: 1024px) 52vw, 100vw" /> : null}</div></div></section>;
}

function CollectionRange({ config, products }: { config: CollectionConfig; products: readonly ApprovedCatalogueProduct[] }) {
  return <section id="collection" className={config.layout === "kids" ? "bg-[#f8f5f1]" : "bg-[#f6f5f2]"}><div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-6 lg:flex-row lg:items-end"><div><p className="section-label">Collection</p><h2 className="mt-3 max-w-[17ch] font-serif text-3xl leading-[1.04] sm:max-w-xl sm:text-4xl sm:leading-tight">{config.rangeHeading}</h2></div><p className="max-w-sm text-sm leading-6 text-stone-600">{config.rangeCopy}</p></div><div className="mt-10">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>;
}

function CollectionProcurement({ config }: { config: CollectionConfig }) {
  return <section className={config.layout === "opera" ? "bg-[#dfe3e2]" : "bg-white"}><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20"><div className="flex flex-col justify-center lg:col-span-6 lg:col-start-4"><p className="section-label">Sourcing context</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] sm:text-5xl">{config.procurementHeading}</h2><p className="mt-5 leading-7 text-stone-600">{config.procurementCopy}</p><div className="mt-7 border-y border-stone-300 text-sm"><div className="flex justify-between gap-5 py-3"><span>Material and composition</span><span className="shrink-0 text-stone-500">Review only</span></div><div className="flex justify-between gap-5 border-t border-stone-300 py-3"><span>Dimensions and sizing</span><span className="shrink-0 text-stone-500">Review only</span></div><div className="flex justify-between gap-5 border-t border-stone-300 py-3"><span>Sample and timing</span><span className="shrink-0 text-stone-500">Review only</span></div></div><Button asChild variant="link" size="lg" className="mt-5 w-fit rounded-none px-0 text-black underline-offset-4"><a href="#rfq">View Preview Status <ArrowRightIcon data-icon="inline-end" /></a></Button></div></div></section>;
}

export const operaCollection: CollectionConfig = { family: "opera-gloves", title: "Opera Gloves", eyebrow: "Formal glove sourcing", intro: "A focused collection for buyers exploring evening and formal glove direction.", layout: "opera", rangeHeading: "A concise formal glove direction.", rangeCopy: "Use the visible silhouette as a starting point, then bring the requirements for your range to an enquiry.", procurementHeading: "Start with the silhouette.", procurementCopy: "Use this selection to align on formalwear direction before discussing the specifications relevant to your brief." };
export const kidsCollection: CollectionConfig = { family: "kids-dress-gloves", title: "Kids Dress Gloves", eyebrow: "Girls' special-occasion sourcing", intro: "A focused collection for buyers sourcing girls' dress glove direction.", layout: "kids", rangeHeading: "A dress-glove direction for special occasions.", rangeCopy: "Explore the visible bow detail and occasion-led styling, then share the requirements for your range in an enquiry.", procurementHeading: "Build the occasion range.", procurementCopy: "Bring the intended age group, event context and visual direction to an enquiry so the next discussion starts with your brief." };
export const veilsCollection: CollectionConfig = { family: "wedding-veils", title: "Wedding Veils", eyebrow: "Bridal accessory sourcing", intro: "A focused veil collection for buyers coordinating bridal accessory direction.", layout: "veils", rangeHeading: "A black lace-trim veil direction.", rangeCopy: "Explore the visible lace trim and comb attachment, then bring the requirements for your bridal range to an enquiry.", procurementHeading: "Coordinate the accessory story.", procurementCopy: "Discuss veil silhouette, colour direction and the accessory details relevant to your brief." };
