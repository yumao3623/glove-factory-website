import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { approvedProductImage } from "@/components/product/approved-product-image";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { families } from "@/data/families";

const familyProducts = {
  "bridal-gloves": getApprovedCatalogueByFamily("bridal-gloves")[0],
  "opera-gloves": getApprovedCatalogueByFamily("opera-gloves")[0],
  "kids-dress-gloves": getApprovedCatalogueByFamily("kids-dress-gloves")[0],
  "wedding-veils": getApprovedCatalogueByFamily("wedding-veils")[0],
} as const;

export function EditorialFamilyDiscovery() {
  return <section id="families" className="bg-white"><div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="mb-10 flex flex-col justify-between gap-4 lg:mb-14 lg:flex-row lg:items-end"><div><p className="section-label">Explore the range</p><h2 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.04] sm:text-5xl">Explore five occasionwear families.</h2></div><p className="max-w-md text-sm leading-6 text-stone-600">Choose a product direction first, then bring the specifications into the enquiry.</p></div><div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><div className="sm:col-span-2 lg:col-span-2"><FamilyLink family={families[0]} /></div><div className="lg:col-span-1 lg:pt-20"><FamilyLink family={families[1]} vertical /></div><div className="lg:col-span-1 lg:pt-8"><FamilyLink family={families[4]} vertical /></div><div className="lg:col-span-2 lg:pl-[15%]"><FamilyLink family={families[2]} pending /></div><div className="lg:col-span-2 lg:pr-[15%]"><FamilyLink family={families[3]} /></div></div></div></section>;
}

function FamilyLink({ family, vertical = false, pending = false }: { family: (typeof families)[number]; vertical?: boolean; pending?: boolean }) {
  const product = familyProducts[family.slug as keyof typeof familyProducts];
  const content = <><div className={vertical ? "aspect-[3/4]" : "aspect-[1.08] sm:aspect-[1.2]"}>{pending ? <div className="flex h-full items-end bg-[#f6f5f2] p-5"><span className="section-label text-stone-500">Collection information coming soon</span></div> : product ? <EditorialImage src={approvedProductImage(product.primaryImage)} alt={product.primaryImage.altText} className="h-full" imageClassName="object-contain bg-[#efefec] transition-transform duration-300 group-hover:scale-[1.025]" /> : null}</div><div className="flex items-start justify-between gap-4 border-t border-stone-300 pt-3"><div><h3 className="font-serif text-xl leading-tight sm:text-2xl">{family.title}</h3><p className="mt-1 text-xs leading-5 text-stone-600">{family.buyerUse}</p></div>{family.route ? <ArrowUpRightIcon className="mt-1 size-4 shrink-0" aria-hidden="true" /> : null}</div></>;
  return family.route ? <Link href={family.route} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">{content}</Link> : <article className="group block" aria-label={`${family.title}: collection information coming soon`}>{content}</article>;
}
