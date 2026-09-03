"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { provisionalBrandDisplay } from "@/lib/site-identity";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/products/", label: "Products" },
  { href: "/bridal-gloves/", label: "Bridal Gloves" },
  { href: "/opera-gloves/", label: "Opera Gloves" },
  { href: "/kids-dress-gloves/", label: "Kids Dress Gloves" },
  { href: "/wedding-veils/", label: "Wedding Veils" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-[#fbfaf8]">
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="font-serif text-2xl leading-none text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {provisionalBrandDisplay}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="min-h-11 px-3 py-3 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</Link>)}
        </nav>
        <Button asChild size="lg" className="hidden min-h-11 rounded-none bg-black px-5 md:inline-flex"><a href="#rfq">Request a Quote</a></Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="inline-flex min-h-11 min-w-11 shrink-0 text-black md:hidden" aria-label="Open navigation"><MenuIcon aria-hidden="true" /></Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Explore the range</SheetTitle>
              <SheetDescription>Browse the collections available at this stage.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
              {navItems.map((item) => <SheetClose key={item.href} asChild><Link href={item.href} className="min-h-11 px-3 py-3 text-base hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.label}</Link></SheetClose>)}
              <SheetClose asChild><a href="#rfq" className="mt-3 min-h-11 bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground">Request a quote</a></SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
