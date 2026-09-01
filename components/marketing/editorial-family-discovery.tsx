import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { families } from "@/data/families";
import { visualGateMedia } from "@/data/visual-gate-media";

const familyMedia = [
  visualGateMedia.bridal03,
  visualGateMedia.opera01,
  visualGateMedia.costume01,
  visualGateMedia.kids01,
  visualGateMedia.veil01,
] as const;

export function EditorialFamilyDiscovery({ variant = "d" }: { variant?: "d" | "e" }) {
  return (
    <section id="families" className={variant === "d" ? "bg-[#f6f5f2]" : "bg-white"}>
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <p className="section-label">Explore the range</p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.04] sm:text-5xl">Explore five occasionwear families.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-600">Choose a product direction first, then bring the specifications into the enquiry.</p>
        </div>
        {variant === "d" ? <BalancedDiscovery /> : <RefinedDiscovery />}
      </div>
    </section>
  );
}

function FamilyLink({ index, prominent = false, vertical = false }: { index: number; prominent?: boolean; vertical?: boolean }) {
  const family = families[index];
  const media = familyMedia[index];
  const content = <>
    <EditorialImage src={media} alt={`${family.title} local visual-gate candidate`} className={vertical ? "aspect-[3/4]" : prominent ? "aspect-[1.08] sm:aspect-[1.2]" : "aspect-[4/5]"} imageClassName="object-contain p-3 mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.025]" />
    <div className="flex items-start justify-between gap-4 border-t border-stone-300 pt-3">
      <div><h3 className="font-serif text-xl leading-tight sm:text-2xl">{family.title}</h3><p className="mt-1 text-xs leading-5 text-stone-600">{family.buyerUse}</p></div>
      <ArrowUpRightIcon className="mt-1 size-4 shrink-0" aria-hidden="true" />
    </div>
  </>;
  return family.route ? <Link href={family.route} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">{content}</Link> : <article className="group block" aria-label={`${family.title}: collection route pending`}>{content}</article>;
}

function BalancedDiscovery() {
  return <div className="grid gap-x-7 gap-y-12 lg:grid-cols-12">
    <div className="lg:col-span-7"><FamilyLink index={0} prominent /></div>
    <div className="lg:col-span-5 lg:pt-20"><FamilyLink index={1} /></div>
    <div className="lg:col-span-3"><FamilyLink index={2} /></div>
    <div className="lg:col-span-4 lg:pt-16"><FamilyLink index={3} /></div>
    <div className="lg:col-span-5"><FamilyLink index={4} prominent /></div>
  </div>;
}

function RefinedDiscovery() {
  return <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
    <div className="sm:col-span-2 lg:col-span-2"><FamilyLink index={0} prominent /></div>
    <div className="lg:col-span-1 lg:pt-20"><FamilyLink index={1} vertical /></div>
    <div className="lg:col-span-1 lg:pt-8"><FamilyLink index={4} vertical /></div>
    <div className="lg:col-span-2 lg:pl-[15%]"><FamilyLink index={2} prominent /></div>
    <div className="lg:col-span-2 lg:pr-[15%]"><FamilyLink index={3} prominent /></div>
  </div>;
}
