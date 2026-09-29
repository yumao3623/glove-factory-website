import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { RfqForm } from "@/components/marketing/rfq-form";
import { LiveRfqForm } from "@/components/rfq/live-form";
import { LocalizedText } from "@/components/i18n/localized-text";
import { Button } from "@/components/ui/button";
import { generatedEditorialMedia } from "@/data/generated-editorial-media";
import { commerceRfqEnabled } from "@/lib/commerce/config";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Occasion Gloves & Wedding Veils Manufacturer",
  "Occasion gloves and wedding veils from JS Meilai in Jiangshan, Zhejiang, China. Browse styles and discuss wholesale orders.",
  "/",
);

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden bg-[#f8f6f2]">
      <RefinedHero />
      <EditorialFamilyDiscovery />
      <SourcingPath />
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
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.98fr_1.02fr]">
        <div className="order-2 flex flex-col justify-between px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:min-h-[36rem] lg:px-12 lg:py-14">
          <div>
            <p className="section-label text-[#274c68]"><LocalizedText k="home.eyebrow" /></p>
            <h1 className="mt-8 max-w-[18ch] font-serif text-[clamp(3.2rem,5.3vw,5.6rem)] leading-[0.9] tracking-[-0.045em] text-balance">
              <LocalizedText k="home.title" />
            </h1>
            <p className="mt-8 max-w-md text-[1.05rem] leading-7 text-[#3e464b]">
              <LocalizedText k="home.intro" />
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Button asChild size="lg" className="min-h-12 rounded-none bg-[#111416] px-6 text-white hover:bg-[#274c68]">
              <a href="#families"><LocalizedText k="home.explore" /> <ArrowRightIcon data-icon="inline-end" /></a>
            </Button>
            <a href="#rfq" className="inline-flex min-h-11 items-center text-sm font-medium text-[#111416] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f]"><LocalizedText k="common.startEnquiry" /></a>
          </div>
        </div>
        <div className="relative order-1 min-h-[22rem] lg:order-2 lg:min-h-[36rem]">
          <EditorialImage
            priority
            src={generatedEditorialMedia.hero.src}
            alt={generatedEditorialMedia.hero.alt}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-cover object-center"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div className="absolute bottom-5 left-5 border-l border-white/70 pl-3 text-[0.65rem] uppercase tracking-[0.14em] text-white sm:bottom-8 sm:left-8">
            <span className="block"><LocalizedText k="home.occasionGloves" fallback="Occasion gloves" /></span>
            <span className="mt-1 block text-white/70"><LocalizedText k="home.wholesaleCollection" fallback="Wholesale collection" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcingPath() {
  const steps = [
    { number: "01", title: "home.sourcingStep1", copy: "home.sourcingStep1Copy" },
    { number: "02", title: "home.sourcingStep2", copy: "home.sourcingStep2Copy" },
    { number: "03", title: "home.sourcingStep3", copy: "home.sourcingStep3Copy" },
  ] as const;
  return (
    <section aria-labelledby="sourcing-path-title" className="border-b border-[#c9ced0] bg-[#f7f5f1]">
      <div className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <h2 id="sourcing-path-title" className="max-w-[12ch] font-serif text-4xl leading-[.98] tracking-[-.03em] sm:text-5xl"><LocalizedText k="home.sourcingTitle" /></h2>
          <p className="max-w-xl text-sm leading-7 text-stone-700"><LocalizedText k="home.sourcingCopy" /></p>
        </div>
        <ol className="mt-12 grid gap-0 border-y border-stone-300 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.number} className={`flex min-h-48 flex-col py-6 md:px-7 ${index > 0 ? "border-t border-stone-300 md:border-l md:border-t-0" : ""}`}>
              <span className="font-mono text-xs tracking-[.16em] text-stone-500">{step.number}</span>
              <h3 className="mt-8 font-serif text-2xl leading-tight text-[#0d2b3f]"><LocalizedText k={step.title} /></h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-stone-700"><LocalizedText k={step.copy} /></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MaterialMoment() {
  return (
    <section className="relative isolate overflow-hidden border-y border-[#c9ced0] bg-[#f4f5f4]">
      <div className="relative mx-auto grid max-w-[1380px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:px-10 lg:py-20">
        <div className="max-w-md">
          <h2 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl"><LocalizedText k="home.materialTitle" /></h2>
          <p className="mt-6 leading-7 text-[#4c5559]">
            <LocalizedText k="home.materialCopy" />
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
          <h2 className="max-w-[11ch] font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl"><LocalizedText k="home.factoryTitle" /></h2>
        </div>
        <div className="max-w-sm md:pb-1">
          <p className="leading-7 text-[#d2dde4]">
            <LocalizedText k="home.factoryCopy" />
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button asChild variant="outline" size="lg" className="min-h-11 rounded-none border-white/70 bg-transparent px-5 text-white hover:bg-white hover:text-[#1c2b35]"><a href="#rfq"><LocalizedText k="common.startEnquiry" /> <ArrowRightIcon data-icon="inline-end" /></a></Button>
            <Link href="/factory/" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><LocalizedText k="home.factoryLink" /></Link>
          </div>
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
          <h2 className="max-w-[11ch] font-serif text-4xl leading-[0.95] tracking-[-0.03em] sm:text-5xl"><LocalizedText k="home.customTitle" /></h2>
          <p className="mt-5 max-w-md leading-7 text-[#e0e8ec]">
            <LocalizedText k="home.customCopy" />
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="outline" size="lg" className="min-h-11 rounded-none border-white/70 bg-transparent px-5 text-white hover:bg-white hover:text-[#1f2d35]"><a href="#rfq"><LocalizedText k="common.startEnquiry" /> <ArrowRightIcon data-icon="inline-end" /></a></Button>
            <Link href="/custom-manufacturing/" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><LocalizedText k="home.customLink" /></Link>
          </div>
        </div>
        <div aria-hidden="true" />
      </div>
    </section>
  );
}

function RfqBand() {
  const enabled = commerceRfqEnabled();
  return (
    <section id="rfq" className="bg-black text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-10 lg:py-24">
        <div>
          <h2 className="mt-3 max-w-md font-serif text-4xl leading-[0.98] sm:text-5xl"><LocalizedText k="home.enquiryTitle" /></h2>
          <p className="mt-5 max-w-sm leading-7 text-stone-300">
            <LocalizedText k="home.enquiryCopy" />
          </p>
        </div>
        <div className="rfq-on-dark">{enabled ? <LiveRfqForm /> : <RfqForm />}</div>
      </div>
    </section>
  );
}
