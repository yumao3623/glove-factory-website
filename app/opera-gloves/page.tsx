import { CollectionPage, operaCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Opera, Evening & Formal Gloves", "Explore long glove silhouettes for eveningwear and formal collections, then share materials, quantities and sizing in an enquiry.", "/opera-gloves/");

export default async function OperaGlovesPage() { return <CollectionPage config={operaCollection} products={await getCommerceCatalogue("opera-gloves")} />; }
