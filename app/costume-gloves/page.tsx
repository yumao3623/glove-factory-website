import { CollectionPage, costumeCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Costume | Stage Gloves", "A supported collection for buyers sourcing non-licensed costume and stage glove directions.", "/costume-gloves/");

export default async function CostumeGlovesPage() { return <CollectionPage config={costumeCollection} products={await getCommerceCatalogue("costume-gloves")} />; }
