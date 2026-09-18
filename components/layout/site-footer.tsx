"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-provider";
import { provisionalBrandDisplay } from "@/lib/site-identity";

export function SiteFooter() {
  const { t } = useLocale();
  const explore = [["nav.allProducts", "/products/"], ["nav.bridalGloves", "/bridal-gloves/"], ["nav.operaGloves", "/opera-gloves/"], ["nav.costumeGloves", "/costume-gloves/"], ["nav.kidsGloves", "/kids-dress-gloves/"], ["nav.veils", "/wedding-veils/"], ["nav.armSleeves", "/arm-sleeves/"]] as const;
  const buyers = [["nav.contact", "/contact/"], ["nav.oem", "/custom-manufacturing/"], ["nav.measuringGuide", "/guides/size-guide/"], ["nav.materialGuide", "/guides/materials/"], ["common.shipping", "/shipping/"]] as const;
  const company = [["common.factory", "/factory/"], ["nav.account", "/account/"], ["common.returns", "/returns/"], ["common.privacy", "/privacy/"], ["common.terms", "/terms/"]] as const;
  return <footer className="border-t border-border bg-foreground text-background"><div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:px-10"><div><p className="font-serif text-3xl">{provisionalBrandDisplay}</p><p className="mt-3 max-w-md text-sm leading-6 text-background/75">{t("footer.description")}</p><div className="mt-6 space-y-1 text-sm leading-6 text-background/80"><p>Jiangshan Meilai Garment Factory</p><p>37 Quantang Road, Quantang Village, Shimen Town, Jiangshan, Quzhou, Zhejiang, China</p><p><a href="mailto:yumao3623@gmail.com" className="underline underline-offset-4">yumao3623@gmail.com</a></p><p><a href="tel:+601114166916" className="underline underline-offset-4">+60 1114166916</a></p></div></div><div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3"><FooterColumn title={t("footer.explore")} links={explore} t={t} /><FooterColumn title={t("footer.forBuyers")} links={buyers} t={t} /><FooterColumn title={t("footer.company")} links={company} t={t} /></div></div></footer>;
}

function FooterColumn({ title, links, t }: { title: string; links: ReadonlyArray<readonly [string, string]>; t: (key: string, fallback?: string) => string }) {
  return <div className="flex min-w-0 flex-col gap-2"><span className="text-background/60">{title}</span>{links.map(([label, href]) => <Link key={href} href={href} className="min-h-11 py-2 hover:text-background/70">{t(label)}</Link>)}</div>;
}
