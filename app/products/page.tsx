import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/catalog-browser";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { canonicalUrl, pageMetadata } from "@/lib/site";
import { facetRobots, isIndexableProduction } from "@/lib/stakeholder-preview";
import { isIndexableProductSlug } from "@/data/seo-index";
const catalogueTitle = "B2B Gloves & Bridal Accessories";
const catalogueDescription = "Browse JS Meilai's approved glove and bridal accessory catalogue by family, material, length, finger style and colour for sourcing review.";
export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  const params = await searchParams;
  const hasFacet = Object.values(params).some((value) => Array.isArray(value) ? value.length > 0 : Boolean(value));
  const base = pageMetadata(catalogueTitle, catalogueDescription, "/products/");
  return hasFacet ? { ...base, robots: facetRobots } : base;
}
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const products = await getCommerceCatalogue();
  const listedProducts = isIndexableProduction ? products.filter((product) => isIndexableProductSlug(product.slug)) : products;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: catalogueTitle,
    description: catalogueDescription,
    numberOfItems: listedProducts.length,
    itemListElement: listedProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.productName,
      url: canonicalUrl(`/products/${product.slug}/`).toString(),
    })),
  };
  const initialSelected: Record<string, string[]> = Object.fromEntries(Object.entries(params).filter(([key, value]) => key !== "search" && value !== undefined).map(([key, value]) => [key, (Array.isArray(value) ? value : [value]).filter((item): item is string => typeof item === "string")]));
  return <main id="main-content" tabIndex={-1}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} /><CatalogBrowser products={products} initialSearch={typeof params.search === "string" ? params.search : ""} initialSelected={initialSelected} /></main>;
}
