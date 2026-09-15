import { CollectionPage, veilsCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Wedding Veils", "A focused edit for buyers sourcing wedding and bridal veil directions.", "/wedding-veils/");

export default async function WeddingVeilsPage() { return <CollectionPage config={veilsCollection} products={await getCommerceCatalogue("wedding-veils")} />; }
