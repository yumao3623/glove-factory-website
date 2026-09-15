import { getApprovedCatalogueByFamily, getApprovedCatalogueProductBySlug, getApprovedCatalogueSlugs, type ApprovedCatalogueProduct, type ApprovedCatalogueImage } from "@/data/approved-catalogue";
import type { ProductFamily, ProductRecord, SourcedValue } from "@/types/product";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { siteMode } from "@/lib/stakeholder-preview";
import { getCommerceConfig } from "@/lib/commerce/config";

const families = new Set<ProductFamily>(["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"]);
export type PublishedRow = { id: string; slug: string; name: string; family: string; status?: string; material?: string | null; length_cm?: number | null; finger_style?: string | null; colors?: string[] | null; description?: string | null; image_urls?: string[] | null };
const confirmed = <T,>(value: T, source: string): SourcedValue<T> => ({ value, status: "CONFIRMED", source });

export function mapPublishedProduct(row: PublishedRow): ApprovedCatalogueProduct | null {
  if (!row.id || !row.slug || !row.name || row.status !== "active" || !families.has(row.family as ProductFamily)) return null;
  const family = row.family as ProductFamily;
  const supabaseOrigin = (() => { try { return new URL(getCommerceConfig().supabaseUrl ?? "").origin; } catch { return ""; } })();
  const urls = (row.image_urls ?? []).map((url) => {
    if (/^products\/[A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpg|jpeg|png|webp)$/.test(url) && !url.includes("..")) return `/api/media/${url}`;
    if (url.startsWith("/api/media/")) return url;
    if (/^products\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(url) && !url.includes("..")) return `/api/media/${url}`;
    try {
      const parsed = new URL(url);
      if (parsed.origin !== supabaseOrigin) return null;
      const match = parsed.pathname.match(/\/storage\/v1\/object\/(?:public|sign)\/product-media\/(products\/[^/]+)$/);
      return match ? `/api/media/${match[1]}` : null;
    } catch { return null; }
  }).filter((url): url is string => Boolean(url));
  if (!urls.length) return null;
  const images: ApprovedCatalogueImage[] = urls.map((path, index) => ({ assetId: `supabase-${row.id}-${index}`, role: index === 0 ? "primary" : "detail", status: "CONFIRMED", source: "supabase:products", path, width: null, height: null, altText: `${row.name} product image` }));
  const record: ProductRecord = {
    id: row.id, slug: row.slug, productName: row.name, productFamily: family,
    provenance: { sourceListingIds: [], normalizedProductGroupId: `admin:${row.id}` },
    material: row.material ? confirmed(row.material, "supabase:products") : { value: null, status: "UNKNOWN", source: "supabase:products" },
    length: typeof row.length_cm === "number" ? confirmed({ value: row.length_cm, unit: "cm", label: `${row.length_cm} cm` }, "supabase:products") : undefined,
    fingerStyle: row.finger_style && ["full-finger", "fingerless", "half-finger", "not-applicable"].includes(row.finger_style) ? confirmed(row.finger_style as "full-finger" | "fingerless" | "half-finger" | "not-applicable", "supabase:products") : undefined,
    color: row.colors?.length ? confirmed(row.colors, "supabase:products") : undefined,
    images, thumbnail: images[0], shortDescription: row.description ?? "", specifications: {}, customizableFields: [], featured: false, sortOrder: 9999, status: "APPROVED",
  };
  return { ...record, slug: row.slug, primaryImage: images[0], collectionImages: images };
}

async function fetchPublished(): Promise<ApprovedCatalogueProduct[]> {
  if (siteMode === "STAKEHOLDER_PREVIEW" && process.env.COMMERCE_CATALOG_ENABLED !== "true") return [];
  const result = await supabaseRest<PublishedRow[]>("products?select=id,slug,name,family,status,material,length_cm,finger_style,colors,description,image_urls&status=eq.active&order=updated_at.desc");
  if (!result.data || result.error) return [];
  return result.data.map(mapPublishedProduct).filter((item): item is ApprovedCatalogueProduct => item !== null);
}

export async function getCommerceCatalogue(family?: ProductFamily): Promise<readonly ApprovedCatalogueProduct[]> {
  const remote = await fetchPublished();
  const fallback = family ? getApprovedCatalogueByFamily(family) : getApprovedCatalogueSlugs().map((slug) => getApprovedCatalogueProductBySlug(slug)!).filter(Boolean);
  const merged = [...remote, ...fallback.filter((item) => !remote.some((published) => published.slug === item.slug))];
  return family ? merged.filter((item) => item.productFamily === family) : merged;
}

export async function getCommerceProductBySlug(slug: string): Promise<ApprovedCatalogueProduct | undefined> {
  const remote = await fetchPublished();
  return remote.find((item) => item.slug === slug) ?? getApprovedCatalogueProductBySlug(slug);
}
