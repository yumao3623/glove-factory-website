import { CollectionPage, veilsCollection } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Wedding Veils", "A focused development edit for buyers sourcing wedding and bridal veil directions.", "/wedding-veils/");

export default function WeddingVeilsPage() { return <CollectionPage config={veilsCollection} products={getApprovedCatalogueByFamily("wedding-veils")} />; }
