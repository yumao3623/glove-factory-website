import Link from "next/link";
import { provisionalBrandDisplay } from "@/lib/site-identity";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div>
          <p className="font-serif text-3xl">{provisionalBrandDisplay}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-background/75">A B2B product range for sourcing discussions.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex flex-col gap-2"><span className="text-background/60">Explore</span><Link href="/products/" className="min-h-11 py-2 hover:text-background/70">Products</Link><Link href="/bridal-gloves/" className="min-h-11 py-2 hover:text-background/70">Bridal gloves</Link><Link href="/opera-gloves/" className="min-h-11 py-2 hover:text-background/70">Opera gloves</Link><Link href="/kids-dress-gloves/" className="min-h-11 py-2 hover:text-background/70">Kids dress gloves</Link><Link href="/wedding-veils/" className="min-h-11 py-2 hover:text-background/70">Wedding veils</Link><Link href="/arm-sleeves/" className="min-h-11 py-2 hover:text-background/70">Arm sleeves</Link></div>
          <div className="flex min-w-0 flex-col gap-2"><span className="text-background/60">Enquiries</span><a href="#rfq" className="min-h-11 py-2 hover:text-background/70">Preview enquiry status</a></div>
        </div>
      </div>
    </footer>
  );
}
