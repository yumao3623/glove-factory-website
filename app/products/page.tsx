import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/catalog-browser";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";
import { facetRobots } from "@/lib/stakeholder-preview";
const catalogueTitle = "B2B Gloves & Bridal Accessories";
const catalogueDescription = "Browse JS Meilai's approved glove and bridal accessory catalogue by family, material, length, finger style and colour for sourcing review.";
export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams;
  const hasFacet = Object.values(params).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value));
  const base = pageMetadata(catalogueTitle, catalogueDescription, "/products/");
  return hasFacet ? { ...base, robots: facetRobots } : base;
}
export default async function Page() { return <main id="main-content" tabIndex={-1}><CatalogBrowser products={await getCommerceCatalogue()} /></main>; }
