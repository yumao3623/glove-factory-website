import { getApprovedCatalogueByFamily, getApprovedCatalogueProductBySlug, getApprovedCatalogueSlugs, type ApprovedCatalogueProduct, type ApprovedCatalogueImage } from "@/data/approved-catalogue";
import type { CustomizableField, ProductFamily, ProductRecord, SourcedValue } from "@/types/product";
import { supabaseRest } from "@/lib/commerce/supabase-rest";
import { siteMode } from "@/lib/stakeholder-preview";
import { getCommerceConfig } from "@/lib/commerce/config";

const families = new Set<ProductFamily>(["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"]);
export type PublishedRow = { id: string; slug: string; name: string; family: string; status?: string; material?: string | null; length_cm?: number | null; finger_style?: string | null; colors?: string[] | null; description?: string | null; image_urls?: string[] | null; sub_style?: string[] | null; occasion?: string[] | null; decoration?: string[] | null; age_group?: string | null; customizable_fields?: string[] | null; specifications?: ProductRecord["specifications"] | null; featured?: boolean | null; sort_order?: number | null };
const confirmed = <T,>(value: T, source: string): SourcedValue<T> => ({ value, status: "CONFIRMED", source });
const customFieldValues = new Set<CustomizableField["field"]>(["pattern", "color", "size", "logo", "packaging", "supplied-material"]);
const strings = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()) : [];

export function mapPublishedProduct(row: PublishedRow): ApprovedCatalogueProduct | null {
  if (!row.id || !row.slug || !row.name || row.status !== "active" || !families.has(row.family as ProductFamily)) return null;
  const family = row.family as ProductFamily;
  const source = "supabase:products";
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
  const occasion = strings(row.occasion);
  const decoration = strings(row.decoration);
  const ageGroup = row.age_group === "adult" || row.age_group === "kids" || row.age_group === "mixed" ? row.age_group : null;
  const customizableFields = strings(row.customizable_fields).filter((field): field is CustomizableField["field"] => customFieldValues.has(field as CustomizableField["field"])).map((field) => ({ field, status: "CONFIRMED", source } satisfies CustomizableField));
  const record: ProductRecord = {
    id: row.id, slug: row.slug, productName: row.name, productFamily: family,
    provenance: { sourceListingIds: [], normalizedProductGroupId: `admin:${row.id}` },
    material: row.material ? confirmed(row.material, source) : { value: null, status: "UNKNOWN", source },
    length: typeof row.length_cm === "number" ? confirmed({ value: row.length_cm, unit: "cm", label: `${row.length_cm} cm` }, source) : undefined,
    fingerStyle: row.finger_style && ["full-finger", "fingerless", "half-finger", "not-applicable"].includes(row.finger_style) ? confirmed(row.finger_style as "full-finger" | "fingerless" | "half-finger" | "not-applicable", source) : undefined,
    color: strings(row.colors).length ? confirmed(strings(row.colors), source) : undefined,
    subStyle: strings(row.sub_style),
    occasion: occasion.length ? confirmed(occasion, source) : undefined,
    decoration: decoration.length ? confirmed(decoration, source) : undefined,
    ageGroup: ageGroup ? confirmed(ageGroup, source) : undefined,
    images, thumbnail: images[0], shortDescription: row.description ?? "", specifications: row.specifications ?? {}, customizableFields, featured: row.featured === true, sortOrder: Number.isInteger(row.sort_order) ? row.sort_order! : 9999, status: "APPROVED",
  };
  return { ...record, slug: row.slug, primaryImage: images[0], collectionImages: images };
}

async function fetchPublished(): Promise<ApprovedCatalogueProduct[]> {
  if (siteMode === "STAKEHOLDER_PREVIEW" && process.env.COMMERCE_CATALOG_ENABLED !== "true") return [];
  const result = await supabaseRest<PublishedRow[]>("products?select=id,slug,name,family,status,material,length_cm,finger_style,colors,description,image_urls,sub_style,occasion,decoration,age_group,customizable_fields,specifications,featured,sort_order&status=eq.active&order=featured.desc,sort_order.asc,updated_at.desc");
  if (!result.data || result.error) return [];
  return result.data.map(mapPublishedProduct).filter((item): item is ApprovedCatalogueProduct => item !== null);
}

export async function getCommerceCatalogue(family?: ProductFamily): Promise<readonly ApprovedCatalogueProduct[]> {
  const remote = await fetchPublished();
  const fallback = process.env.COMMERCE_CATALOG_ENABLED === "true" ? [] : family ? getApprovedCatalogueByFamily(family) : getApprovedCatalogueSlugs().map((slug) => getApprovedCatalogueProductBySlug(slug)!).filter(Boolean);
  const merged = [...remote, ...fallback.filter((item) => !remote.some((published) => published.slug === item.slug))];
  return family ? merged.filter((item) => item.productFamily === family) : merged;
}

export async function getCommerceProductBySlug(slug: string): Promise<ApprovedCatalogueProduct | undefined> {
  const remote = await fetchPublished();
  return remote.find((item) => item.slug === slug) ?? (process.env.COMMERCE_CATALOG_ENABLED === "true" ? undefined : getApprovedCatalogueProductBySlug(slug));
}
