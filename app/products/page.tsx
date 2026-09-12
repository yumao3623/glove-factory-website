import { CatalogBrowser } from "@/components/product/catalog-browser";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("全部产品", "按产品类别、材料、长度、指型和颜色筛选 JS Meilai 的 B2B 手套与婚礼配饰目录。", "/products/");

export default function ProductsPage() {
  const products = ["bridal-gloves", "opera-gloves", "costume-gloves", "kids-dress-gloves", "wedding-veils", "arm-sleeves"].flatMap((family) => getApprovedCatalogueByFamily(family as never));
  return <main id="main-content" tabIndex={-1}><CatalogBrowser products={products} /></main>;
}
