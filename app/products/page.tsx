import { CatalogBrowser } from "@/components/product/catalog-browser";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("All products", "Filter JS Meilai's B2B glove and bridal accessories catalogue by family, material, length, finger style and colour.", "/products/");
export default async function Page() { return <main id="main-content" tabIndex={-1}><CatalogBrowser products={await getCommerceCatalogue()} /></main>; }
