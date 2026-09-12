import { ArrowRightIcon } from "lucide-react";
import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { Button } from "@/components/ui/button";
import { generatedEditorialMedia } from "@/data/generated-editorial-media";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Occasion Gloves & Wedding Veils Manufacturer",
  "A focused B2B range of occasion gloves and wedding veils for sourcing conversations.",
  "/",
);

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
    <section className="relative isolate overflow-hidden bg-[#e7e9e8] text-[#111416]">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.84fr_1.16fr]">
        <div className="order-2 flex flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:min-h-[39rem] lg:px-12 lg:py-14">
          <div>
            <p className="section-label text-[#274c68]">JS Meilai｜Sourcing studio</p>
            <h1 className="mt-8 max-w-[10ch] font-serif text-[clamp(3.4rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.045em] text-balance">
              Made for the moment.
            </h1>
            <p className="mt-8 max-w-md text-[1.05rem] leading-7 text-[#3e464b]">
              A considered glove and veil range for bridal, formalwear and occasionwear buyers.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button asChild size="lg" className="min-h-12 rounded-none bg-[#111416] px-6 text-white hover:bg-[#274c68]">
              <a href="#families">Explore the range <ArrowRightIcon data-icon="inline-end" /></a>
            </Button>
            <span className="max-w-[14rem] text-xs leading-5 text-[#5c676d]">Small-batch development, clear material decisions, export-ready conversations.</span>
          </div>
        </div>
        <div className="relative order-1 min-h-[22rem] lg:order-2 lg:min-h-[39rem]">
          <EditorialImage
            priority
            src={generatedEditorialMedia.hero.src}
            alt={generatedEditorialMedia.hero.alt}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div className="absolute bottom-5 left-5 border-l border-white/70 pl-3 text-[0.65rem] uppercase tracking-[0.14em] text-white sm:bottom-8 sm:left-8">
            <span className="block">Hand-finished</span>
            <span className="mt-1 block text-white/70">For global buyers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialMoment() {
  return (
    <section className="relative isolate overflow-hidden border-y border-[#c9ced0] bg-[#f4f5f4]">
      <div className="relative mx-auto grid max-w-[1380px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:px-10 lg:py-20">
        <div className="max-w-md">
          <p className="section-label text-[#274c68]">Material｜Finish｜Hand</p>
          <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">The decision is in the detail.</h2>
          <p className="mt-6 leading-7 text-[#4c5559]">
            Compare surface, structure and finish before a sampling conversation. Every enquiry starts with a real product direction.
          </p>
        </div>
        <div className="grid min-h-[20rem] grid-cols-12 grid-rows-[1.1fr_0.9fr] gap-3 sm:min-h-[26rem]">
          <EditorialImage
            src={generatedEditorialMedia.materialReview.src}
            alt={generatedEditorialMedia.materialReview.alt}
            className="col-span-7 row-span-2"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 42vw, 58vw"
          />
          <EditorialImage
            src={generatedEditorialMedia.materialDetail.src}
            alt={generatedEditorialMedia.materialDetail.alt}
            className="col-span-5"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 30vw, 42vw"
          />
          <EditorialImage
            src={generatedEditorialMedia.gloveDetail.src}
            alt={generatedEditorialMedia.gloveDetail.alt}
            className="col-span-5"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 30vw, 42vw"
          />
        </div>
      </div>
    </section>
  );
}

function FactoryBridge() {
  return (
    <section className="relative overflow-hidden border-y border-[#243746] bg-[#1c2b35] text-white">
      <EditorialImage
        src={generatedEditorialMedia.craft.src}
        alt={generatedEditorialMedia.craft.alt}
        className="absolute inset-y-0 right-0 hidden w-[54%] sm:block"
        imageClassName="object-cover object-center opacity-75"
        sizes="54vw"
      />
      <div className="relative mx-auto flex max-w-[1380px] flex-col justify-between gap-8 px-5 py-14 sm:px-8 md:min-h-[28rem] md:flex-row md:items-end lg:px-10 lg:py-20">
        <div>
          <p className="section-label text-[#a8c2d3]">Atelier｜Production</p>
          <h2 className="mt-4 max-w-[11ch] font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">Craft you can specify.</h2>
        </div>
        <div className="max-w-sm md:pb-1">
          <p className="leading-7 text-[#d2dde4]">
            Bring construction, trim and volume questions into one clear sourcing brief.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-7 min-h-11 rounded-none border-white/70 bg-transparent px-5 text-white hover:bg-white hover:text-[#1c2b35]">
            <a href="#rfq">Discuss factory capability <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CustomBridge() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1f2d35] text-white">
      <EditorialImage
        src={generatedEditorialMedia.customManufacturing.src}
        alt={generatedEditorialMedia.customManufacturing.alt}
        className="pointer-events-none absolute inset-0 h-full w-full"
        imageClassName="object-cover object-center opacity-45"
        sizes="100vw"
      />
      <div className="relative mx-auto grid max-w-[1380px] gap-8 px-5 py-16 sm:px-8 lg:min-h-[34rem] lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-10 lg:py-20">
        <div>
          <p className="section-label text-[#c6d8e1]">Custom manufacturing</p>
          <h2 className="mt-4 max-w-[11ch] font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl">Bring a direction into the discussion.</h2>
          <p className="mt-5 max-w-md leading-7 text-[#e0e8ec]">
            This preview introduces the range. Requirements can be discussed separately for a product and project.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8 min-h-11 w-fit rounded-none border-white/70 bg-transparent px-5 text-white hover:bg-white hover:text-[#1f2d35]">
            <a href="#rfq">View preview status <ArrowRightIcon data-icon="inline-end" /></a>
          </Button>
        </div>
        <div aria-hidden="true" />
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
