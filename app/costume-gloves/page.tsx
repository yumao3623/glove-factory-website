import { CollectionPage, costumeCollection } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Costume / Stage Gloves", "A supported collection for buyers sourcing non-licensed costume and stage glove directions.", "/costume-gloves/");

export default function CostumeGlovesPage() { return <CollectionPage config={costumeCollection} products={getApprovedCatalogueByFamily("costume-gloves")} />; }
