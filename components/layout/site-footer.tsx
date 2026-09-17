import Link from "next/link";
import { provisionalBrandDisplay } from "@/lib/site-identity";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <div>
          <p className="font-serif text-3xl">{provisionalBrandDisplay}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-background/75">Occasion gloves and wedding veils for wholesale orders.</p>
          <div className="mt-6 space-y-1 text-sm leading-6 text-background/80"><p>Jiangshan Meilai Garment Factory</p><p>37 Quantang Road, Quantang Village, Shimen Town, Jiangshan, Quzhou, Zhejiang, China</p><p><a href="mailto:yumao3623@gmail.com" className="underline underline-offset-4">yumao3623@gmail.com</a></p><p><a href="tel:+601114166916" className="underline underline-offset-4">+60 1114166916</a></p></div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-2"><span className="text-background/60">Explore</span><Link href="/products/" className="min-h-11 py-2 hover:text-background/70">Products</Link><Link href="/bridal-gloves/" className="min-h-11 py-2 hover:text-background/70">Bridal gloves</Link><Link href="/opera-gloves/" className="min-h-11 py-2 hover:text-background/70">Opera gloves</Link><Link href="/costume-gloves/" className="min-h-11 py-2 hover:text-background/70">Costume gloves</Link><Link href="/kids-dress-gloves/" className="min-h-11 py-2 hover:text-background/70">Kids dress gloves</Link><Link href="/wedding-veils/" className="min-h-11 py-2 hover:text-background/70">Wedding veils</Link><Link href="/arm-sleeves/" className="min-h-11 py-2 hover:text-background/70">Arm sleeves</Link></div>
          <div className="flex min-w-0 flex-col gap-2"><span className="text-background/60">For buyers</span>{[["Contact us", "/contact/"], ["Custom orders", "/custom-manufacturing/"], ["Size guide", "/guides/size-guide/"], ["Materials", "/guides/materials/"], ["Shipping", "/shipping/"]].map(([label, href]) => <Link key={href} href={href} className="min-h-11 py-2 hover:text-background/70">{label}</Link>)}</div>
          <div className="flex min-w-0 flex-col gap-2"><span className="text-background/60">Company</span>{[["Our factory", "/factory/"], ["Your account", "/account/"], ["Returns", "/returns/"], ["Privacy", "/privacy/"], ["Terms", "/terms/"]].map(([label, href]) => <Link key={href} href={href} className="min-h-11 py-2 hover:text-background/70">{label}</Link>)}</div>
        </div>
      </div>
    </footer>
  );
}
