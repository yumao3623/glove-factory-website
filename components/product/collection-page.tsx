import Link from "next/link";
import { ArrowRightIcon, Check } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { LiveRfqForm } from "@/components/rfq/live-form";
import { LocalizedText } from "@/components/i18n/localized-text";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { ApprovedCatalogueProduct } from "@/data/approved-catalogue";
import type { ProductFamily } from "@/types/product";
import { commerceRfqEnabled } from "@/lib/commerce/config";
import { canonicalUrl } from "@/lib/site";
import { ProductFamilyView } from "@/components/analytics/product-family-view";
import { isIndexableProductSlug } from "@/data/seo-index";
import { isIndexableProduction } from "@/lib/stakeholder-preview";
import { generatedCollectionHeroMedia } from "@/data/generated-collection-hero-media";

export type CollectionConfig = {
  family: ProductFamily;
  title: string;
  eyebrow: string;
  intro: string;
  layout: "bridal" | "opera" | "kids" | "veils" | "costume" | "accessories";
  rangeHeading: string;
  rangeCopy: string;
  procurementHeading: string;
  procurementCopy: string;
};

function Breadcrumb({ title, dark = false }: { title: string; dark?: boolean }) {
  const colors = dark ? "text-stone-300 hover:text-white focus-visible:ring-white" : "text-stone-600 hover:text-black focus-visible:ring-black";
  return <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-2 text-sm ${colors}`}><Link href="/" className="focus-visible:outline-none focus-visible:ring-2"><LocalizedText k="common.home" fallback="Home" /></Link><span aria-hidden="true">/</span><Link href="/products/" className="focus-visible:outline-none focus-visible:ring-2"><LocalizedText k="common.products" fallback="Products" /></Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>;
}

export function CollectionPage({ config, products }: { config: CollectionConfig; products: readonly ApprovedCatalogueProduct[] }) {
  const rfqEnabled = commerceRfqEnabled();
  const visibleProducts = isIndexableProduction ? products.filter((product) => isIndexableProductSlug(product.slug)) : products;
  const breadcrumbSchema = { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/").toString() }, { "@type": "ListItem", position: 2, name: "Products", item: canonicalUrl("/products/").toString() }, { "@type": "ListItem", position: 3, name: config.title, item: canonicalUrl(`/${config.family}/`).toString() }] };
  const collectionSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: config.title, description: config.intro, url: canonicalUrl(`/${config.family}/`).toString(), isPartOf: { "@type": "WebSite", url: canonicalUrl("/").toString() } }, breadcrumbSchema] };
  return <main id="main-content" tabIndex={-1} className="overflow-hidden"><ProductFamilyView family={config.family} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    <CollectionHero config={config} />
    <CollectionRange config={config} products={visibleProducts} />
    <CollectionProcurement config={config} rfqEnabled={rfqEnabled} />
    <section id="rfq" className="bg-black text-white"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-24"><div><h2 className="max-w-md font-serif text-4xl leading-[1.04] sm:text-5xl">{rfqEnabled ? <LocalizedText k="common.startWholesale" fallback="Start a wholesale conversation." /> : <LocalizedText k="common.reviewRange" fallback="Review the range without submitting a brief." />}</h2><p className="mt-5 max-w-sm leading-7 text-stone-300">{rfqEnabled ? <LocalizedText k="common.shareStyles" fallback="Share the styles, quantities and custom details you need us to review." /> : <LocalizedText k="common.previewOffline" fallback="This stakeholder preview keeps enquiry delivery and visitor-data collection offline." />}</p></div><div className="rfq-on-dark">{rfqEnabled ? <LiveRfqForm /> : <RfqForm />}</div></div></section>
  </main>;
}

function CollectionHero({ config }: { config: CollectionConfig }) {
  const dark = config.layout === "opera";
  const tone = dark ? "bg-[#0d2b3f] text-white" : config.layout === "kids" ? "bg-[#f0e7df]" : "bg-white";
  const hero = generatedCollectionHeroMedia[config.family];
  return <section className={tone}><div className="mx-auto max-w-[1280px] px-5 py-6 sm:px-8 lg:px-10"><Breadcrumb title={config.title} dark={dark} /><div className="grid gap-8 py-9 sm:py-11 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-14 lg:py-12"><div><h1 className="max-w-[16ch] font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[.96] tracking-[-.02em]">{config.title}</h1><p className={dark ? "mt-5 max-w-[42ch] leading-7 text-stone-200" : "mt-5 max-w-[42ch] leading-7 text-stone-600"}>{config.intro}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className={dark ? "min-h-11 rounded-none bg-white px-5 text-black hover:bg-stone-200" : "min-h-11 rounded-none bg-[#0d2b3f] px-5 hover:bg-[#173f59]"}><a href="#collection"><LocalizedText k="common.exploreCollection" fallback="Explore the collection" /> <ArrowRightIcon data-icon="inline-end" /></a></Button><Link href="/contact/#rfq" className={dark ? "inline-flex min-h-11 items-center border border-white/60 px-5 text-sm hover:bg-white/10" : "inline-flex min-h-11 items-center border border-[#0d2b3f] px-5 text-sm text-[#0d2b3f]"}>Start an enquiry</Link></div></div><EditorialImage src={hero.src} alt={hero.alt} priority className="aspect-[5/3] lg:aspect-[1.25/1]" imageClassName="object-cover object-center" sizes="(min-width: 1024px) 58vw, 100vw" /></div></div></section>;
}

function CollectionRange({ config, products }: { config: CollectionConfig; products: readonly ApprovedCatalogueProduct[] }) {
  return <section id="collection" className={config.layout === "kids" ? "bg-[#f8f5f1]" : "bg-[#f6f5f2]"}><div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="flex flex-col justify-between gap-5 border-b border-stone-300 pb-6 lg:flex-row lg:items-end"><div><h2 className="max-w-[24ch] font-serif text-3xl leading-[1.04] sm:text-4xl">{config.rangeHeading}</h2></div><p className="max-w-lg text-sm leading-6 text-stone-600">{config.rangeCopy}</p></div><div className="mt-9 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>;
}

function CollectionProcurement({ config, rfqEnabled }: { config: CollectionConfig; rfqEnabled: boolean }) {
  return <section className={config.layout === "opera" ? "bg-[#dfe3e2]" : "bg-white"}><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-16"><div><h2 className="max-w-[16ch] font-serif text-4xl leading-[1.04] sm:text-5xl">{config.procurementHeading}</h2><p className="mt-5 max-w-md leading-7 text-stone-600">{config.procurementCopy}</p></div><div className="self-end"><ul className="grid gap-3 border-y border-stone-300 py-5 text-sm sm:grid-cols-3">{["Style and reference images", "Quantity and market", "Colour, sizing and packaging"].map((item) => <li key={item} className="flex gap-2 text-stone-700"><Check size={16} className="mt-0.5 shrink-0 text-[#0d2b3f]" />{item}</li>)}</ul><div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm"><Link href="/guides/materials/" className="underline underline-offset-4"><LocalizedText k="common.compareMaterials" fallback="Compare materials" /></Link><Link href="/guides/size-guide/" className="underline underline-offset-4"><LocalizedText k="common.prepareMeasurements" fallback="Prepare measurements" /></Link><Link href="/custom-manufacturing/" className="underline underline-offset-4"><LocalizedText k="common.discussCustom" fallback="Discuss custom work" /></Link><a href="#rfq" className="inline-flex min-h-10 items-center bg-[#0d2b3f] px-4 text-white">{rfqEnabled ? "Send enquiry" : "View enquiry route"} <ArrowRightIcon size={15} className="ml-2" /></a></div></div></div></section>;
}

export const operaCollection: CollectionConfig = { family: "opera-gloves", title: "Opera Gloves", eyebrow: "Formal glove sourcing", intro: "A focused collection for buyers exploring evening and formal glove direction.", layout: "opera", rangeHeading: "A concise formal glove direction.", rangeCopy: "Use the visible silhouette as a starting point, then bring the requirements for your range to an enquiry.", procurementHeading: "Start with the silhouette.", procurementCopy: "Use this selection to align on formalwear direction before discussing the specifications relevant to your brief." };
export const kidsCollection: CollectionConfig = { family: "kids-dress-gloves", title: "Kids Dress Gloves", eyebrow: "Girls' special-occasion sourcing", intro: "A focused collection for buyers sourcing girls' dress glove direction.", layout: "kids", rangeHeading: "A dress-glove direction for special occasions.", rangeCopy: "Explore the visible bow detail and occasion-led styling, then share the requirements for your range in an enquiry.", procurementHeading: "Build the occasion range.", procurementCopy: "Bring the intended age group, event context and visual direction to an enquiry so the next discussion starts with your brief." };
export const veilsCollection: CollectionConfig = { family: "wedding-veils", title: "Wedding Veils", eyebrow: "Bridal accessory sourcing", intro: "A focused veil collection for buyers coordinating bridal accessory direction.", layout: "veils", rangeHeading: "A black lace-trim veil direction.", rangeCopy: "Explore the visible lace trim and attachment details, then bring the requirements for your bridal range to an enquiry.", procurementHeading: "Coordinate the accessory story.", procurementCopy: "Discuss veil silhouette, colour direction and the accessory details relevant to your brief." };
export const costumeCollection: CollectionConfig = { family: "costume-gloves", title: "Costume and Stage Gloves", eyebrow: "Performance and costume sourcing", intro: "Non-licensed visual references for performance, costume and stage briefs.", layout: "costume", rangeHeading: "Stage references for a specific brief.", rangeCopy: "Review the silhouettes, then share the performance context, construction and decoration requirements.", procurementHeading: "Keep the brief specific.", procurementCopy: "Share the intended performance context, construction, colour and decoration requirements for review." };
export const armSleevesCollection: CollectionConfig = { family: "arm-sleeves", title: "Arm Sleeves and Accessories", eyebrow: "Sleeve and accessory sourcing", intro: "Long, fingerless silhouettes for bridal, formalwear and costume accessory programmes.", layout: "accessories", rangeHeading: "Sleeve-led accessory references.", rangeCopy: "Review proportion and trim, then bring your colour, opening and volume requirements to an enquiry.", procurementHeading: "Specify the proportion.", procurementCopy: "Bring sleeve length, opening, trim, colour and volume requirements into the sourcing conversation." };
