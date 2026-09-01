import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() { return <main id="main-content" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><p className="text-sm font-medium text-muted-foreground">404</p><h1 className="mt-3 font-serif text-5xl">This page is not part of the current range.</h1><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">Use the product hub to return to an implemented collection route.</p><Button asChild size="lg" className="mt-8 min-h-11"><Link href="/products/">View products</Link></Button></main>; }
