import { EditorialFamilyDiscovery } from "@/components/marketing/editorial-family-discovery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Products", "A B2B navigation hub for five occasion glove and bridal veil product families.", "/products/");

export default function ProductsPage() {
  return <main id="main-content" tabIndex={-1} className="overflow-hidden"><section className="bg-black text-white"><div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="section-label text-stone-400">Product families</p><h1 className="mt-3 max-w-3xl font-serif text-[clamp(3rem,5.6vw,5.6rem)] leading-[.94]">Find the right family before discussing a product direction.</h1><p className="mt-6 max-w-xl leading-7 text-stone-300">Explore bridal, formal, girls&apos; dress and veil ranges, alongside costume and stage direction.</p></div></section><EditorialFamilyDiscovery /></main>;
}
