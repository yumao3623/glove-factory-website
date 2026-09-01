import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { families } from "@/data/families";

export function FamilyGrid({ showAll = true }: { showAll?: boolean }) {
  const entries = showAll ? families : families.slice(0, 1);
  return <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">{entries.map((family, index) => {
    const inner = <><span className="font-serif text-2xl leading-tight">{family.title}</span><span className="mt-6 text-sm leading-6 text-muted-foreground">{family.buyerUse}</span><span className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium">{family.availableNow ? "View collection" : "Route pending"}{family.availableNow ? <ArrowUpRightIcon aria-hidden="true" /> : null}</span></>;
    return family.route ? <Link href={family.route} key={family.slug} className="flex min-h-72 flex-col border-b border-r border-border p-6 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{inner}</Link> : <article key={family.slug} className="flex min-h-72 flex-col border-b border-r border-border p-6" aria-label={`${family.title}: collection route pending`}><span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>{inner}</article>;
  })}</div>;
}
