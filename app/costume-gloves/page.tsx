import { CollectionPage, costumeCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";
import { isCostumeIndexable, noindexRobots } from "@/lib/stakeholder-preview";

const baseMetadata = pageMetadata("Costume & Stage Gloves for Sourcing", "Explore non-licensed costume and stage glove directions for performance, event and supported accessory programmes.", "/costume-gloves/");
export const metadata = isCostumeIndexable ? baseMetadata : { ...baseMetadata, robots: noindexRobots };

export default async function CostumeGlovesPage() { return <CollectionPage config={costumeCollection} products={await getCommerceCatalogue("costume-gloves")} />; }
