import { ArrowRightIcon } from "lucide-react";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { Button } from "@/components/ui/button";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Occasion Gloves & Wedding Veils Manufacturer", "A focused B2B range of occasion gloves and wedding veils for sourcing conversations.", "/");

const bridal = getApprovedCatalogueByFamily("bridal-gloves")[0];
const opera = getApprovedCatalogueByFamily("opera-gloves")[0];
const kids = getApprovedCatalogueByFamily("kids-dress-gloves")[0];
const veils = getApprovedCatalogueByFamily("wedding-veils")[0];
const bridalBlackLace = bridal.collectionImages.find((image) => image.role === "detail") ?? bridal.primaryImage;
const veilDetail = veils.collectionImages.find((image) => image.role === "detail") ?? veils.primaryImage;

export default function HomePage() {
  return <main id="main-content" tabIndex={-1} className="overflow-hidden"><RefinedHero /><EditorialFamilyDiscovery /><MaterialMoment /><CustomBridge /><RfqBand /></main>;
}

function RefinedHero() {
  return (
    <section className="bg-[#fbfaf8]">
      <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[5fr_7fr]">
        <div className="order-2 flex flex-col justify-center bg-black px-5 py-12 text-white sm:px-8 sm:py-14 lg:order-1 lg:px-12 lg:py-16">
          <p className="section-label text-stone-400">B2B occasionwear range</p>
          <h1 className="mt-4 max-w-[9ch] font-serif text-[clamp(2.8rem,4vw,4.25rem)] leading-[.95]">Occasion Gloves &amp; Wedding Veils Manufacturer</h1>
          <p className="mt-6 max-w-sm leading-7 text-stone-300">Five product families for buyers sourcing a focused occasionwear range.</p>
          <Button asChild size="lg" className="mt-8 min-h-11 w-fit rounded-none bg-white px-6 text-black hover:bg-stone-200">
            <a href="#rfq">Discuss Your Requirements <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
        <div className="order-1 min-w-0 bg-white lg:order-2">
          <EditorialImage
            priority
            src={approvedProductImage(opera.primaryImage)}
            alt={opera.primaryImage.altText}
            className="aspect-square bg-white"
            imageClassName="bg-white object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

function MaterialMoment() {
  return <section className="bg-[#f6f5f2]"><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-24"><div className="flex flex-col justify-end lg:col-span-4"><p className="section-label">Product detail</p><h2 className="mt-3 max-w-sm font-serif text-4xl leading-[1.04] sm:text-5xl">See the details buyers compare.</h2><p className="mt-5 max-w-sm leading-7 text-stone-600">Use the range to identify a direction before material, dimensions and availability are confirmed.</p></div><div className="grid grid-cols-12 gap-3 lg:col-span-8"><EditorialImage src={approvedProductImage(bridalBlackLace)} alt={bridalBlackLace.altText} className="col-span-7 aspect-[4/5]" imageClassName="object-contain bg-[#efefec]" /><EditorialImage src={approvedProductImage(opera.primaryImage)} alt={opera.primaryImage.altText} className="col-span-5 mt-14 aspect-[3/4]" imageClassName="object-contain bg-[#efefec] p-3 mix-blend-multiply" /><EditorialImage src={approvedProductImage(veilDetail)} alt={veilDetail.altText} className="col-span-5 aspect-[3/4]" imageClassName="object-contain bg-[#efefec]" /><EditorialImage src={approvedProductImage(bridal.primaryImage)} alt={bridal.primaryImage.altText} className="col-span-7 mt-10 aspect-[4/5]" imageClassName="object-contain bg-[#efefec]" /></div></div></section>;
}

function CustomBridge() {
  return <section className="border-y border-stone-200 bg-white"><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-24"><div className="order-2 flex flex-col justify-center lg:order-1"><p className="section-label">Custom manufacturing</p><h2 className="mt-3 max-w-lg font-serif text-4xl leading-[1.04] sm:text-5xl">Tell us what you need made.</h2><p className="mt-5 max-w-md leading-7 text-stone-600">Share a product direction and we can discuss materials, measurements, colours, packaging and timing during the sourcing conversation.</p><Button asChild variant="outline" size="lg" className="mt-8 min-h-11 w-fit rounded-none border-black px-5"><a href="#rfq">Discuss Your Requirements <ArrowRightIcon data-icon="inline-end" /></a></Button></div><div className="order-1 grid grid-cols-2 gap-3 lg:order-2"><EditorialImage src={approvedProductImage(kids.primaryImage)} alt={kids.primaryImage.altText} className="aspect-[3/4]" imageClassName="object-contain bg-[#efefec]" /><EditorialImage src={approvedProductImage(veils.primaryImage)} alt={veils.primaryImage.altText} className="mt-10 aspect-[3/4]" imageClassName="object-contain bg-[#efefec]" /></div></div></section>;
}

function RfqBand() {
  return <section id="rfq" className="bg-black text-white"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-24"><div><p className="section-label text-stone-400">Enquiry</p><h2 className="mt-3 max-w-md font-serif text-4xl leading-[1.04] sm:text-5xl">Bring the range into an RFQ.</h2><p className="mt-5 max-w-sm leading-7 text-stone-300">Organise the details for a sourcing conversation. Enquiry delivery remains offline in this checkpoint.</p></div><div className="rfq-on-dark"><RfqForm /></div></div></section>;
}
