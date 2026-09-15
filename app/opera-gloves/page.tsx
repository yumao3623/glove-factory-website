import { CollectionPage, operaCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Opera Gloves", "A focused collection for buyers sourcing long, evening and formal gloves.", "/opera-gloves/");

export default async function OperaGlovesPage() { return <CollectionPage config={operaCollection} products={await getCommerceCatalogue("opera-gloves")} />; }
