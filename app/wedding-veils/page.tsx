import { CollectionPage, veilsCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Wedding Veils for Bridal Collections", "Review wedding and bridal veil directions for accessory ranges, then discuss colour, trim, attachment and quantities with JS Meilai.", "/wedding-veils/");

export default async function WeddingVeilsPage() { return <CollectionPage config={veilsCollection} products={await getCommerceCatalogue("wedding-veils")} />; }
