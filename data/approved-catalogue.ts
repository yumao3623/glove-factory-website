import approvedRecords from "@/data/products/approved/initial-public-tranche.json";
import assetManifest from "@/assets/asset-manifest.json";
import type { AssetReference, ProductFamily, ProductRecord } from "@/types/product";

type ProductionDerivative = { assetId: string; role: AssetReference["role"]; path: string; width: number; height: number };
type ProductionAsset = { productId: string; permissionStatus: string; visualApprovalStatus: string; derivatives: ProductionDerivative[] };

export type ApprovedCatalogueImage = AssetReference & { path: string; width: number | null; height: number | null; altText: string };

export type ApprovedCatalogueProduct = ProductRecord & {
  slug: string;
  primaryImage: ApprovedCatalogueImage;
  collectionImages: readonly ApprovedCatalogueImage[];
};

const productionAssets = assetManifest.productionAssets as ProductionAsset[];
const records = approvedRecords as unknown as ProductRecord[];

// The accepted source record for this style mixes a white reference photo with
// the black product direction. Keep the source audit record intact, but publish
// only the black views until the supplier confirms a single colour set.
const publicImageOrder: Record<string, string[]> = {
  "bridal-gloves-sheer-lace-long-001": [
    "bridal-gloves-sheer-lace-long-001-5a1e1a90a5bf-web",
    "bridal-gloves-sheer-lace-long-001-4abaae73fda2-web",
  ],
};

export function isPublicMediaCuratedProduct(product: Pick<ProductRecord, "id"> & Partial<Pick<ProductRecord, "slug">>): boolean {
  return Boolean(publicImageOrder[product.id] || (product.slug && publicImageOrder[product.slug]));
}

export function isApprovedProduct(record: Pick<ProductRecord, "status">): boolean {
  return record.status === "APPROVED";
}

function productionImageFor(record: ProductRecord, image: AssetReference): ApprovedCatalogueImage | null {
  if (!image.path || !image.width || !image.height || !image.altText) return null;
  const derivative = productionAssets
    .filter((asset) => asset.productId === record.id && asset.permissionStatus === "STORE_LEVEL_PERMISSION_INHERITED" && asset.visualApprovalStatus === "HUMAN_PRODUCTION_APPROVED")
    .flatMap((asset) => asset.derivatives)
    .find((candidate) => candidate.assetId === image.assetId);

  if (!derivative || derivative.role !== image.role || derivative.path !== image.path || derivative.width !== image.width || derivative.height !== image.height) return null;
  return image as ApprovedCatalogueImage;
}

function collectionImagesFor(record: ProductRecord): readonly ApprovedCatalogueImage[] {
  const approvedImages = record.images
    .filter((image) => image.status === "CONFIRMED" && image.role !== "thumbnail" && image.path?.startsWith("/products/"))
    .map((image) => productionImageFor(record, image))
    .filter((image): image is ApprovedCatalogueImage => image !== null);
  const curatedOrder = publicImageOrder[record.id];
  if (!curatedOrder) return approvedImages;
  const selected = curatedOrder
    .map((assetId) => approvedImages.find((image) => image.assetId === assetId))
    .filter((image): image is ApprovedCatalogueImage => image !== undefined);
  if (!selected.length) return approvedImages;
  return selected.map((image, index) => index === 0 ? { ...image, role: "primary" } : image);
}

function toApprovedCatalogueProduct(record: ProductRecord): ApprovedCatalogueProduct | null {
  if (!isApprovedProduct(record)) return null;
  const slug = record.slug;
  if (!slug) return null;
  const collectionImages = collectionImagesFor(record);
  const primaryImage = collectionImages.find((image) => image.role === "primary");
  return primaryImage ? { ...record, slug, primaryImage, collectionImages } : null;
}

const approvedCatalogue = records
  .map(toApprovedCatalogueProduct)
  .filter((record): record is ApprovedCatalogueProduct => record !== null)
  .sort((left, right) => left.sortOrder - right.sortOrder || left.id.localeCompare(right.id));

export function getApprovedCatalogueByFamily(family: ProductFamily): readonly ApprovedCatalogueProduct[] {
  return approvedCatalogue.filter((record) => record.productFamily === family);
}

export function getApprovedCatalogueProductBySlug(slug: string): ApprovedCatalogueProduct | undefined {
  return approvedCatalogue.find((record) => record.slug === slug);
}

export function getApprovedCatalogueSlugs(): readonly string[] {
  return approvedCatalogue.map((record) => record.slug);
}
