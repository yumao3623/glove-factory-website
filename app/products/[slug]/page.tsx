import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPreview } from "@/components/product/product-detail-preview";
import { getCommerceProductBySlug } from "@/lib/commerce/catalog";
import { getIndexableProductSlugs, isIndexableProductSlug } from "@/data/seo-index";
import { getSeoProductMetaDescription } from "@/data/seo-editorial";
import { pageMetadata } from "@/lib/site";
import { isIndexableProduction, noindexRobots } from "@/lib/stakeholder-preview";

export const dynamicParams = true;

export function generateStaticParams() {
  return getIndexableProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndexableProduction || !isIndexableProductSlug(slug)) return { robots: noindexRobots };
  const product = await getCommerceProductBySlug(slug);
  if (!product) return { robots: noindexRobots };
  return pageMetadata(
    `${product.productName} | Wholesale sourcing`,
    getSeoProductMetaDescription(product),
    `/products/${product.slug}/`,
    { imageAlt: product.primaryImage.altText },
  );
}

export default async function ProductPreviewPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = await getCommerceProductBySlug(slug); if (!product) notFound(); return <ProductDetailPreview product={product} indexable={isIndexableProduction && isIndexableProductSlug(slug)} />; }
