import type { StaticImageData } from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { EditorialImage } from "@/components/marketing/editorial-image";
import { Button } from "@/components/ui/button";
import type { DevelopmentFixtureProduct } from "@/types/product";

export function ProductCard({ product, image }: { product: DevelopmentFixtureProduct; image: StaticImageData }) {
  return <article className="group flex flex-col border-t border-stone-300 bg-transparent">
    <EditorialImage src={image} alt={`${product.productName} local visual-gate candidate`} className="aspect-[4/5] bg-[#efefec]" imageClassName="object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
    <div className="flex flex-1 flex-col py-4"><p className="text-[10px] font-medium uppercase tracking-[.12em] text-stone-500">Visual reference / details on request</p><h3 className="mt-3 font-serif text-2xl leading-tight">{product.productName}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{product.style}</p><p className="mt-2 text-sm leading-6 text-stone-600">{product.shortDescription}</p><Button asChild variant="link" size="lg" className="mt-4 min-h-11 w-fit rounded-none px-0 text-black underline-offset-4"><a href="#rfq">Discuss this style <ArrowRightIcon data-icon="inline-end" /></a></Button></div>
  </article>;
}
