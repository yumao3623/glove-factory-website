import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPreview } from "@/components/product/product-detail-preview";
import { getCommerceProductBySlug } from "@/lib/commerce/catalog";
import { getApprovedCatalogueSlugs } from "@/data/approved-catalogue";
import { previewRobots } from "@/lib/stakeholder-preview";
export const dynamicParams = true;
export function generateStaticParams() { return getApprovedCatalogueSlugs().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const product = await getCommerceProductBySlug(slug); return product ? { title: `${product.productName} | Product preview`, description: product.shortDescription, robots: previewRobots } : { robots: previewRobots }; }
export default async function ProductPreviewPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = await getCommerceProductBySlug(slug); if (!product) notFound(); return <ProductDetailPreview product={product} />; }
