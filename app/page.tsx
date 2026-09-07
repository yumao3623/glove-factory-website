import { ArrowRightIcon } from "lucide-react";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { Button } from "@/components/ui/button";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { w11EditorialMedia } from "@/data/w11-media";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Occasion Gloves & Wedding Veils Manufacturer",
  "A focused B2B range of occasion gloves and wedding veils for sourcing conversations.",
  "/",
);

const bridal = getApprovedCatalogueByFamily("bridal-gloves")[0];
const veils = getApprovedCatalogueByFamily("wedding-veils")[0];
const bridalBlackLace = bridal.collectionImages.find((image) => image.role === "detail") ?? bridal.primaryImage;
const veilDetail = veils.collectionImages.find((image) => image.role === "detail") ?? veils.primaryImage;

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f8f6f2]">
      <RefinedHero />
      <EditorialFamilyDiscovery />
      <MaterialMoment />
      <FactoryBridge />
      <CustomBridge />
      <RfqBand />
    </main>
  );
}

function RefinedHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#151512] text-white">
      <EditorialImage
        src={w11EditorialMedia.satinFolds.src}
        alt=""
        className="pointer-events-none absolute -right-[22%] -top-[25%] h-[135%] w-[75%] opacity-20"
        imageClassName="object-cover blur-[2px]"
        priority
        sizes="75vw"
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-3 px-5 py-4 sm:gap-5 sm:px-8 sm:py-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(19rem,0.7fr)_minmax(11rem,0.32fr)] lg:items-end lg:gap-5 lg:px-10 lg:py-10">
        <div className="order-1 flex flex-col justify-end pb-3 pt-0 sm:pb-4 sm:pt-3 lg:min-h-[40rem] lg:pb-12 lg:pt-0">
          <h1 className="max-w-[9ch] font-serif text-[clamp(3.2rem,6.2vw,6.25rem)] leading-[0.84] text-balance">
            Occasion Gloves &amp; Wedding Veils Manufacturer
          </h1>
          <p className="mt-7 max-w-md text-[1.05rem] leading-7 text-stone-300">
            A focused range for buyers building bridal, formal and occasionwear programmes.
          </p>
          <Button asChild size="lg" className="mt-8 min-h-11 w-fit rounded-none bg-white px-6 text-black hover:bg-stone-200">
            <a href="#families">Explore the range <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
        <div className="relative order-2 grid grid-cols-[1fr_0.48fr] items-end gap-3 lg:grid-cols-1">
          <EditorialImage
            priority
            src={w11EditorialMedia.veilPortrait.src}
            alt={w11EditorialMedia.veilPortrait.alt}
            className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 62vw, 62vw"
          />
          <EditorialImage
            src={w11EditorialMedia.laceShadow.src}
            alt=""
            className="aspect-[3/4] self-end lg:absolute lg:-bottom-10 lg:-right-16 lg:w-[56%] lg:shadow-[0_18px_34px_rgba(0,0,0,0.3)]"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 18vw, 30vw"
          />
        </div>
        <div className="order-3 hidden lg:z-10 lg:block lg:self-start lg:pt-14">
          <EditorialImage
            src={w11EditorialMedia.blackGloveSatin.src}
            alt={w11EditorialMedia.blackGloveSatin.alt}
            className="ml-auto aspect-[3/4] w-full max-w-[14rem]"
            imageClassName="object-cover object-center"
            sizes="14rem"
          />
          <p className="mt-4 max-w-[14rem] border-t border-white/35 pt-3 text-xs leading-5 text-stone-300">
            Product images and editorial material are kept distinct throughout this preview.
          </p>
        </div>
      </div>
    </section>
  );
}

function MaterialMoment() {
  return (
    <section className="relative isolate overflow-hidden bg-[#eeece6]">
      <EditorialImage
        src={w11EditorialMedia.veilSculpture.src}
        alt=""
        className="pointer-events-none absolute -left-[18%] -top-[30%] h-[160%] w-[44%] opacity-45"
        imageClassName="object-cover object-center"
        sizes="44vw"
      />
      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:px-10 lg:py-16">
        <div className="max-w-md">
          <p className="section-label">Product detail</p>
          <h2 className="mt-3 font-serif text-4xl leading-[0.98] sm:text-5xl">Details buyers compare.</h2>
          <p className="mt-5 leading-7 text-stone-700">
            Use the range to identify a direction before material, dimensions and availability are confirmed.
          </p>
        </div>
        <div className="grid min-h-[19rem] grid-cols-12 grid-rows-[0.9fr_1.1fr] gap-3 sm:min-h-[23rem] lg:min-h-[20rem]">
          <EditorialImage
            src={approvedProductImage(bridalBlackLace)}
            alt={bridalBlackLace.altText}
            className="col-span-4 row-span-2"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 19vw, 36vw"
          />
          <EditorialImage
            src={w11EditorialMedia.pearlGloveDetail.src}
            alt={w11EditorialMedia.pearlGloveDetail.alt}
            className="col-span-3"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 14vw, 28vw"
          />
          <EditorialImage
            src={w11EditorialMedia.satinDetail.src}
            alt=""
            className="col-span-5 row-span-2"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 24vw, 42vw"
          />
          <EditorialImage
            src={approvedProductImage(veilDetail)}
            alt={veilDetail.altText}
            className="col-span-3"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 14vw, 28vw"
          />
        </div>
      </div>
    </section>
  );
}

function FactoryBridge() {
  return (
    <section className="relative overflow-hidden border-y border-stone-300 bg-[#171714] text-white">
      <EditorialImage
        src={w11EditorialMedia.satinBows.src}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-20 sm:w-[58%]"
        imageClassName="object-cover object-center"
        sizes="58vw"
      />
      <div className="relative mx-auto flex max-w-[1380px] flex-col justify-between gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end lg:px-10 lg:py-16">
        <div>
          <p className="section-label text-stone-400">Factory</p>
          <h2 className="mt-3 max-w-[12ch] font-serif text-4xl leading-[0.98] sm:text-5xl">Bring the factory conversation into the brief.</h2>
        </div>
        <div className="max-w-sm md:pb-1">
          <p className="leading-7 text-stone-300">
            Start with the range, then bring process questions and product requirements into the sourcing conversation.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-7 min-h-11 rounded-none border-white bg-transparent px-5 text-white hover:bg-white hover:text-black">
            <a href="#rfq">Discuss factory capability <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CustomBridge() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8f6f2]">
      <EditorialImage
        src={w11EditorialMedia.veilBow.src}
        alt=""
        className="pointer-events-none absolute -right-[8%] -top-[12%] h-[125%] w-[42%] opacity-45"
        imageClassName="object-cover object-center"
        sizes="42vw"
      />
      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <p className="section-label">Custom manufacturing</p>
          <h2 className="mt-3 max-w-[11ch] font-serif text-4xl leading-[0.98] sm:text-5xl">Bring a direction into the discussion.</h2>
          <p className="mt-5 max-w-md leading-7 text-stone-700">
            This preview introduces the range. Requirements can be discussed separately for a product and project.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8 min-h-11 w-fit rounded-none border-black bg-transparent px-5">
            <a href="#rfq">View preview status <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
        <div className="grid grid-cols-[0.72fr_1fr] items-end gap-3 sm:max-w-[42rem] lg:justify-self-end">
          <EditorialImage
            src={w11EditorialMedia.whiteGloveRibbons.src}
            alt={w11EditorialMedia.whiteGloveRibbons.alt}
            className="aspect-[3/4]"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 18vw, 34vw"
          />
          <EditorialImage
            src={w11EditorialMedia.longGloveModel.src}
            alt={w11EditorialMedia.longGloveModel.alt}
            className="mb-7 aspect-[4/5]"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 25vw, 48vw"
          />
        </div>
      </div>
    </section>
  );
}

function RfqBand() {
  return (
    <section id="rfq" className="bg-black text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-24">
        <div>
          <p className="section-label text-stone-400">Enquiry</p>
          <h2 className="mt-3 max-w-md font-serif text-4xl leading-[0.98] sm:text-5xl">Bring the range into an RFQ.</h2>
          <p className="mt-5 max-w-sm leading-7 text-stone-300">
            Organise the details for a sourcing conversation. Enquiry delivery remains offline in this checkpoint.
          </p>
        </div>
        <div className="rfq-on-dark"><RfqForm /></div>
      </div>
    </section>
  );
}
