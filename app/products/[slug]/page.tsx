import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPreview } from "@/components/product/product-detail-preview";
import { getApprovedCatalogueProductBySlug, getApprovedCatalogueSlugs } from "@/data/approved-catalogue";
import { previewRobots } from "@/lib/stakeholder-preview";

export const dynamicParams = false;

export function generateStaticParams() {
  return getApprovedCatalogueSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getApprovedCatalogueProductBySlug(slug);
  if (!product) return { robots: previewRobots };
  return { title: `${product.productName} | Product preview`, description: product.shortDescription, robots: previewRobots };
}

export default async function ProductPreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getApprovedCatalogueProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailPreview product={product} />;
}
