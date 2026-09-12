import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { generatedFamilyMedia } from "@/data/generated-family-media";
import { families, type FamilyEntry } from "@/data/families";

type FamilyVisual = {
  family: FamilyEntry;
  image: StaticImageData | string;
  alt: string;
  productId: string;
};

const familyVisuals: readonly FamilyVisual[] = families.map((family) => ({
  family,
  image: generatedFamilyMedia[family.slug].src,
  alt: generatedFamilyMedia[family.slug].alt,
  productId: getApprovedCatalogueByFamily(family.slug)[0]?.id ?? `family-${family.slug}`,
}));

const cardOffsets = ["lg:pt-0", "lg:pt-10", "lg:pt-4", "lg:pt-14", "lg:pt-7", "lg:pt-2"] as const;

export function EditorialFamilyDiscovery() {
  return (
    <section id="families" className="relative isolate overflow-hidden border-b border-[#c9ced0] bg-[#f5f6f5]">
      <div className="relative mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label text-stone-600">Explore the range</p>
            <h2 className="mt-3 max-w-[13ch] font-serif text-4xl leading-[0.98] sm:text-5xl lg:text-6xl">
              Six directions for an occasionwear range.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-stone-700">
            Start with a family, then bring materials, measurements and timing into the sourcing conversation.
          </p>
        </div>
        <div className="relative mt-12 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12 lg:mt-16 lg:grid-cols-6 lg:items-start lg:gap-x-5 lg:pb-8">
          {familyVisuals.map((visual, index) => (
            <FamilyLink key={visual.family.slug} visual={visual} offset={cardOffsets[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyLink({ visual, offset }: { visual: FamilyVisual; offset: string }) {
  const content = (
    <>
      <EditorialImage
        src={visual.image}
        alt={visual.alt}
        className="aspect-[4/5]"
        imageClassName="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]"
        sizes="(min-width: 1024px) 19vw, (min-width: 640px) 44vw, 46vw"
      />
      <div className="mt-3 border-t border-black/30 pt-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.35rem] leading-[1.02] sm:text-2xl">{visual.family.title}</h3>
          {visual.family.route ? <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : null}
        </div>
        <p className="mt-2 text-xs leading-5 text-stone-700">{visual.family.buyerUse}</p>
        {!visual.family.route ? <p className="mt-2 text-[0.65rem] font-semibold uppercase text-stone-600">Route pending</p> : null}
      </div>
    </>
  );

  const className = `group block min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 ${offset}`;

  return visual.family.route ? (
    <Link href={visual.family.route} className={className} data-product-id={visual.productId}>
      {content}
    </Link>
  ) : (
    <article className={className} aria-label={`${visual.family.title}: route pending`} data-product-id={visual.productId}>
      {content}
    </article>
  );
}
