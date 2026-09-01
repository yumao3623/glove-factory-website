import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { RfqForm } from "@/components/marketing/rfq-form";
import { visualGateMedia } from "@/data/visual-gate-media";
import type { DevelopmentFixtureProduct, ProductFamily } from "@/types/product";
import type { StaticImageData } from "next/image";

type CollectionConfig = {
  family: ProductFamily;
  title: string;
  eyebrow: string;
  intro: string;
  layout: "opera" | "kids" | "veils";
  fixtures: readonly DevelopmentFixtureProduct[];
  images: readonly StaticImageData[];
  heroAlts: readonly string[];
  rangeHeading: string;
  rangeCopy: string;
  procurementHeading: string;
  procurementCopy: string;
};

function Breadcrumb({ title }: { title: string }) {
  return <nav aria-label="Breadcrumb" className="text-sm text-stone-600"><Link href="/" className="hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Home</Link><span aria-hidden="true"> / </span><Link href="/products/" className="hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Products</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>;
}

export function CollectionPage({ config }: { config: CollectionConfig }) {
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Products", item: "/products/" }, { "@type": "ListItem", position: 3, name: config.title, item: `/${config.family}/` }] };
  return <main id="main-content" tabIndex={-1} className="overflow-hidden"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <CollectionHero config={config} />
    <CollectionRange config={config} />
    <CollectionProcurement config={config} />
    <section id="rfq" className="bg-black text-white"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-24"><div><p className="section-label text-stone-400">Enquiry</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-[1.04] sm:text-5xl">Bring this range into an RFQ.</h2><p className="mt-5 max-w-sm leading-7 text-stone-300">This development form validates the sourcing handoff. Delivery and public contact details remain pending.</p></div><div className="rfq-on-dark"><RfqForm /></div></div></section>
  </main>;
}

function CollectionHero({ config }: { config: CollectionConfig }) {
  if (config.layout === "kids") return <section className="bg-[#f0e7df]"><div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12"><Breadcrumb title={config.title} /><div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-4"><p className="section-label">{config.eyebrow}</p><h1 className="mt-3 max-w-[9ch] font-serif text-[clamp(3.4rem,7vw,6.6rem)] leading-[.87]">{config.title}</h1><p className="mt-6 max-w-sm leading-7 text-stone-700">{config.intro}</p><Button asChild size="lg" className="mt-8 min-h-11 rounded-none bg-black px-6 hover:bg-stone-800"><a href="#collection">View the edit <ArrowRightIcon data-icon="inline-end" /></a></Button></div><div className="grid grid-cols-2 gap-3 lg:col-span-8"><EditorialImage priority src={config.images[0]} alt={config.heroAlts[0]} className="aspect-[4/5]" imageClassName="object-cover" /><EditorialImage priority src={config.images[1]} alt={config.heroAlts[1]} className="mt-14 aspect-[4/5]" imageClassName="object-cover" /></div></div></div></section>;
  if (config.layout === "veils") return <section className="bg-white"><div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12"><Breadcrumb title={config.title} /><div className="mt-10 grid gap-8 lg:grid-cols-12"><div className="flex flex-col justify-end lg:col-span-4 lg:pb-10"><p className="section-label">{config.eyebrow}</p><h1 className="mt-3 max-w-[8ch] font-serif text-[clamp(3.4rem,7vw,6.4rem)] leading-[.87]">{config.title}</h1><p className="mt-6 max-w-sm leading-7 text-stone-600">{config.intro}</p></div><div className="grid grid-cols-12 gap-3 lg:col-span-8"><EditorialImage priority src={config.images[0]} alt={config.heroAlts[0]} className="col-span-7 aspect-[4/5]" imageClassName="object-cover" /><div className="col-span-5 grid gap-3"><EditorialImage priority src={config.images[1]} alt={config.heroAlts[1]} className="aspect-[3/4]" imageClassName="object-cover" /><EditorialImage priority src={config.images[2]} alt={config.heroAlts[2]} className="aspect-[3/4]" imageClassName="object-cover" /></div></div></div></div></section>;
  return <section className="bg-black text-white"><div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12"><div className="text-stone-400"><Breadcrumb title={config.title} /></div><div className="mt-8 grid gap-2 lg:grid-cols-12"><div className="flex flex-col justify-end py-8 lg:col-span-4 lg:py-16"><p className="section-label text-stone-400">{config.eyebrow}</p><h1 className="mt-3 max-w-[8ch] font-serif text-[clamp(3.2rem,6vw,6.2rem)] leading-[.88]">{config.title}</h1><p className="mt-6 max-w-sm leading-7 text-stone-300">{config.intro}</p><Button asChild size="lg" className="mt-8 min-h-11 w-fit rounded-none bg-white px-6 text-black hover:bg-stone-200"><a href="#collection">View the edit <ArrowRightIcon data-icon="inline-end" /></a></Button></div><div className="grid min-h-[390px] grid-cols-7 gap-1 lg:col-span-8 lg:min-h-[580px]"><EditorialImage priority src={config.images[0]} alt={config.heroAlts[0]} className="col-span-4" imageClassName="object-contain p-3" /><div className="col-span-3 grid gap-1"><EditorialImage priority src={config.images[1]} alt={config.heroAlts[1]} className="min-h-0" imageClassName="object-contain p-3" /><EditorialImage priority src={config.images[2]} alt={config.heroAlts[2]} className="min-h-0" imageClassName="object-contain p-3" /></div></div></div></div></section>;
}

function CollectionRange({ config }: { config: CollectionConfig }) {
  const columns = config.layout === "opera" ? "lg:grid-cols-3" : config.layout === "kids" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return <section id="collection" className={config.layout === "kids" ? "bg-[#f8f5f1]" : "bg-[#f6f5f2]"}><div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-6 border-b border-stone-300 pb-6 lg:flex-row lg:items-end"><div><p className="section-label">Development edit</p><h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight">{config.rangeHeading}</h2></div><p className="max-w-sm text-sm leading-6 text-stone-600">{config.rangeCopy}</p></div><div className={`mt-10 grid gap-x-6 gap-y-12 ${columns}`}>{config.fixtures.map((product, index) => <ProductCard key={product.id} product={product} image={config.images[index]} />)}</div></div></section>;
}

function CollectionProcurement({ config }: { config: CollectionConfig }) {
  const image = config.layout === "veils" ? config.images[2] : null;
  return <section className={config.layout === "opera" ? "bg-[#dfe3e2]" : "bg-white"}><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-20">{image ? <div className="lg:col-span-7"><EditorialImage src={image} alt={config.heroAlts[2]} className="aspect-[16/9]" imageClassName="object-cover" /></div> : null}<div className={`flex flex-col justify-center ${image ? "lg:col-span-5" : "lg:col-span-6 lg:col-start-4"}`}><p className="section-label">Sourcing context</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] sm:text-5xl">{config.procurementHeading}</h2><p className="mt-5 leading-7 text-stone-600">{config.procurementCopy}</p><div className="mt-7 border-y border-stone-300 text-sm"><div className="flex justify-between py-3"><span>Material and composition</span><span className="text-stone-500">Pending confirmation</span></div><div className="flex justify-between border-t border-stone-300 py-3"><span>Dimensions and sizing</span><span className="text-stone-500">Pending confirmation</span></div><div className="flex justify-between border-t border-stone-300 py-3"><span>Sample and timing</span><span className="text-stone-500">Pending confirmation</span></div></div><Button asChild variant="link" size="lg" className="mt-5 w-fit rounded-none px-0 text-black underline-offset-4"><a href="#rfq">Discuss this direction <ArrowRightIcon data-icon="inline-end" /></a></Button></div></div></section>;
}

export const operaCollection: CollectionConfig = { family: "opera-gloves", title: "Opera Gloves", eyebrow: "Formal long-glove sourcing", intro: "Long, evening and formal glove references for buyers building an occasionwear range.", layout: "opera", fixtures: [], images: [visualGateMedia.opera01, visualGateMedia.opera02, visualGateMedia.opera03], heroAlts: ["Black long formal glove visual-gate candidate", "White long formal glove visual-gate candidate", "Blue long formal glove visual-gate candidate"], rangeHeading: "Long form, colour and proportion", rangeCopy: "A focused visual edit for discussing long-glove direction. Product names, materials, measurements and available colourways remain pending confirmation.", procurementHeading: "Start with the silhouette.", procurementCopy: "Use this edit to align on length, colour direction and formalwear context before confirming exact specifications. Factory evidence and exact specifications remain pending confirmation." };
export const kidsCollection: CollectionConfig = { family: "kids-dress-gloves", title: "Kids Dress Gloves", eyebrow: "Girls' special-occasion sourcing", intro: "Dress-glove references for girls' formal, ceremony and performance programmes.", layout: "kids", fixtures: [], images: [visualGateMedia.kids01, visualGateMedia.kids02], heroAlts: ["Pink satin bow glove visual-gate candidate", "Blue satin bow glove visual-gate candidate"], rangeHeading: "Colour and bow details", rangeCopy: "A compact visual edit for girls' dress-glove conversations. Age group, size, material and colour availability remain pending confirmation.", procurementHeading: "Build the occasion range.", procurementCopy: "Bring the intended age group, event context and colour direction to the enquiry. This helps qualify the range without inferring sizing or performance from photography." };
export const veilsCollection: CollectionConfig = { family: "wedding-veils", title: "Wedding Veils", eyebrow: "Focused bridal accessory edit", intro: "A small veil and detail study for buyers coordinating wedding accessory ranges.", layout: "veils", fixtures: [], images: [visualGateMedia.veil01, visualGateMedia.veil02, visualGateMedia.veil03], heroAlts: ["White layered wedding veil visual-gate candidate", "Black wedding veil visual-gate candidate", "Wedding veil comb detail visual-gate candidate"], rangeHeading: "A focused veil edit", rangeCopy: "These references support an initial wedding-veil conversation; the current image pool does not represent a complete catalogue or confirmed length range.", procurementHeading: "Coordinate the accessory story.", procurementCopy: "Discuss veil silhouette, colour direction and accessory details first. Length, attachment, material and availability are shown as pending until confirmed." };

export function withFixtures(config: CollectionConfig, fixtures: readonly DevelopmentFixtureProduct[]): CollectionConfig { return { ...config, fixtures }; }
