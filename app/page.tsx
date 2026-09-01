import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";
import { visualGateMedia } from "@/data/visual-gate-media";

export const metadata = pageMetadata("Occasion Gloves & Wedding Veils Manufacturer", "A development prototype for buyers exploring five occasion glove and bridal veil product families.", "/");
type HomeProps = { searchParams: Promise<{ gate?: string }> };

export default async function HomePage({ searchParams }: HomeProps) {
  const { gate } = await searchParams;
  const variant = gate === "d" ? "d" : "e";
  return <main id="main-content" tabIndex={-1} className="overflow-hidden">
    {variant === "d" ? <BalancedHero /> : <RefinedHero />}
    <EditorialFamilyDiscovery variant={variant} />
    <MaterialMoment variant={variant} />
    <CustomBridge variant={variant} />
    <WorkshopEvidence variant={variant} />
    <RfqBand />
  </main>;
}

function BalancedHero() {
  return <section className="border-b border-stone-200 bg-[#fbfaf8]"><div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-8 sm:px-8 lg:min-h-[690px] lg:grid-cols-[.72fr_1.28fr] lg:gap-12 lg:px-10 lg:py-14">
    <div className="flex flex-col justify-center lg:pb-10"><p className="section-label">B2B occasionwear range</p><h1 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.8rem,5.1vw,5.2rem)] leading-[.94]">Occasion Gloves &amp; Wedding Veils Manufacturer</h1><p className="mt-6 max-w-md text-base leading-7 text-stone-600">A visual range overview for buyers sourcing bridal, formal, stage, girls&apos; dress and veil families.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="min-h-11 rounded-none bg-black px-6 hover:bg-stone-800"><a href="#rfq">Request a Quote <ArrowRightIcon data-icon="inline-end" /></a></Button><Button asChild variant="link" size="lg" className="min-h-11 rounded-none px-1 text-black underline-offset-4"><a href="#families">Explore the range <ArrowDownIcon data-icon="inline-end" /></a></Button></div></div>
    <div className="grid min-h-[410px] grid-cols-12 grid-rows-6 gap-3 sm:min-h-[560px] lg:min-h-0"><EditorialImage priority src={visualGateMedia.bridal03} alt="Black lace glove visual-gate candidate" className="col-span-7 row-span-6" imageClassName="object-cover object-center" /><EditorialImage priority src={visualGateMedia.bridal04} alt="White lace glove visual-gate candidate" className="col-span-5 row-span-4 mt-8" imageClassName="object-cover object-center" /><EditorialImage priority src={visualGateMedia.opera01} alt="Long evening glove visual-gate candidate" className="col-start-8 col-end-13 row-start-5 row-end-7 mr-5" imageClassName="object-contain p-3 mix-blend-multiply" /></div>
  </div></section>;
}

function RefinedHero() {
  return <section className="bg-black text-white"><div className="mx-auto grid max-w-[1440px] lg:min-h-[710px] lg:grid-cols-12"><div className="order-2 flex flex-col justify-end px-5 py-12 sm:px-8 lg:order-1 lg:col-span-4 lg:px-10 lg:py-16"><p className="section-label text-stone-400">B2B occasionwear range</p><h1 className="mt-4 max-w-[9ch] font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[.95]">Occasion Gloves &amp; Wedding Veils Manufacturer</h1><p className="mt-6 max-w-sm leading-7 text-stone-300">Product families for an enquiry-led sourcing conversation.</p><Button asChild size="lg" className="mt-8 min-h-11 w-fit rounded-none bg-white px-6 text-black hover:bg-stone-200"><a href="#rfq">Discuss Your Requirements <ArrowRightIcon data-icon="inline-end" /></a></Button></div><div className="order-1 grid min-h-[420px] grid-cols-7 gap-2 p-2 sm:min-h-[580px] lg:order-2 lg:col-span-8 lg:min-h-0"><EditorialImage priority src={visualGateMedia.bridal01} alt="Bridal glove visual-gate candidate" className="col-span-4" imageClassName="object-cover" /><div className="col-span-3 grid gap-2"><EditorialImage priority src={visualGateMedia.opera03} alt="Long formal glove visual-gate candidate" className="min-h-0" imageClassName="object-contain p-3 mix-blend-multiply" /><EditorialImage priority src={visualGateMedia.veil02} alt="Wedding veil visual-gate candidate" className="min-h-0" imageClassName="object-cover" /></div></div></div></section>;
}

function MaterialMoment({ variant }: { variant: "d" | "e" }) {
  return <section className={variant === "d" ? "bg-[#e9e8e5]" : "bg-[#f6f5f2]"}><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-24"><div className="flex flex-col justify-end lg:col-span-4"><p className="section-label">Visual detail</p><h2 className="mt-3 max-w-sm font-serif text-4xl leading-[1.04] sm:text-5xl">A range can carry more than one occasion.</h2><p className="mt-5 max-w-sm leading-7 text-stone-600">Detail, silhouette and presentation belong in the buyer&apos;s visual review before specifications are confirmed.</p></div><div className="grid grid-cols-12 gap-3 lg:col-span-8"><EditorialImage src={visualGateMedia.bridal02} alt="White embellished bridal glove visual-gate candidate" className="col-span-7 aspect-[4/5]" imageClassName="object-cover" /><EditorialImage src={visualGateMedia.opera02} alt="White long formal glove visual-gate candidate" className="col-span-5 mt-14 aspect-[3/4]" imageClassName="object-contain p-3 mix-blend-multiply" /><EditorialImage src={visualGateMedia.veil03} alt="Wedding veil visual-gate candidate" className="col-span-5 aspect-[3/4]" imageClassName="object-cover" /><EditorialImage src={visualGateMedia.costume02} alt="Costume glove visual-gate candidate" className="col-span-7 mt-10 aspect-[4/5]" imageClassName="object-contain p-3 mix-blend-multiply" /></div></div></section>;
}

function CustomBridge({ variant }: { variant: "d" | "e" }) {
  return <section className="border-y border-stone-200 bg-white"><div className={variant === "d" ? "mx-auto grid max-w-[1280px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:px-10 lg:py-24" : "mx-auto grid max-w-[1280px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-24"}><div className={variant === "d" ? "flex flex-col justify-center" : "order-2 flex flex-col justify-center lg:order-1"}><p className="section-label">Custom manufacturing</p><h2 className="mt-3 max-w-lg font-serif text-4xl leading-[1.04] sm:text-5xl">Begin with a product direction. Continue with the requirements.</h2><p className="mt-5 max-w-md leading-7 text-stone-600">Customization is a supported enquiry topic. Product-specific materials, measurements, colours, packaging and timing are confirmed in the sourcing conversation, not invented on the page.</p><Button asChild variant="outline" size="lg" className="mt-8 min-h-11 w-fit rounded-none border-black px-5"><a href="#rfq">Discuss Your Requirements <ArrowRightIcon data-icon="inline-end" /></a></Button></div><div className={variant === "d" ? "grid grid-cols-2 gap-3" : "order-1 grid grid-cols-2 gap-3 lg:order-2"}><EditorialImage src={visualGateMedia.kids02} alt="Girls dress glove visual-gate candidate" className="aspect-[3/4]" imageClassName="object-cover" /><EditorialImage src={visualGateMedia.costume01} alt="Stage glove visual-gate candidate" className="mt-10 aspect-[3/4]" imageClassName="object-contain p-3 mix-blend-multiply" /></div></div></section>;
}

function WorkshopEvidence({ variant }: { variant: "d" | "e" }) {
  return <section className={variant === "d" ? "bg-[#ebeae7]" : "bg-[#dfe3e2]"}><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-24"><div className="lg:col-span-4"><p className="section-label">Craft / workshop / production evidence</p><h2 className="mt-3 font-serif text-4xl leading-[1.04] sm:text-5xl">From product direction to a practical discussion.</h2><p className="mt-5 max-w-sm leading-7 text-stone-600">Workshop imagery is shown here as local visual-gate evidence only. It does not stand in for unconfirmed factory facts or permissions.</p></div><div className="grid grid-cols-12 gap-3 lg:col-span-8"><EditorialImage src={visualGateMedia.factory01} alt="Workshop visual-gate candidate" className="col-span-8 aspect-[16/10]" imageClassName="object-cover" /><EditorialImage src={visualGateMedia.factory02} alt="Sewing workshop visual-gate candidate" className="col-span-4 mt-12 aspect-[3/5]" imageClassName="object-cover" /><div className="col-span-12 mt-3 grid grid-cols-[1fr_auto] items-end border-t border-stone-400 pt-4"><p className="max-w-md text-sm leading-6 text-stone-600">Video-ready media slot: a future approved product or process clip can replace this visual sequence.</p><span className="text-xs font-medium uppercase tracking-[.12em] text-stone-500">Image fallback</span></div></div></div></section>;
}

function RfqBand() {
  return <section id="rfq" className="bg-black text-white"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-24"><div><p className="section-label text-stone-400">Enquiry</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-[1.04] sm:text-5xl">Bring the range into an RFQ.</h2><p className="mt-5 max-w-sm leading-7 text-stone-300">This form validates the sourcing handoff. Delivery and public contact details remain pending.</p></div><div className="rfq-on-dark"><RfqForm /></div></div></section>;
}
