import approvedRecords from "@/data/products/approved/initial-public-tranche.json";
import assetManifest from "@/assets/asset-manifest.json";
import type { AssetReference, ProductFamily, ProductRecord } from "@/types/product";

type ProductionDerivative = { assetId: string; role: AssetReference["role"]; path: string; width: number; height: number };
type ProductionAsset = { productId: string; permissionStatus: string; visualApprovalStatus: string; derivatives: ProductionDerivative[] };

export type ApprovedCatalogueImage = AssetReference & { path: string; width: number; height: number; altText: string };

export type ApprovedCatalogueProduct = ProductRecord & {
  slug: string;
  primaryImage: ApprovedCatalogueImage;
  collectionImages: readonly ApprovedCatalogueImage[];
};

const productionAssets = assetManifest.productionAssets as ProductionAsset[];
const records = approvedRecords as unknown as ProductRecord[];

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
  return record.images
    .filter((image) => image.status === "CONFIRMED" && image.role !== "thumbnail" && image.path?.startsWith("/products/"))
    .map((image) => productionImageFor(record, image))
    .filter((image): image is ApprovedCatalogueImage => image !== null);
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
