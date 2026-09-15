import { CollectionPage, kidsCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Kids Dress Gloves", "A focused collection for girls' dress and special-occasion glove sourcing.", "/kids-dress-gloves/");

export default async function KidsDressGlovesPage() { return <CollectionPage config={kidsCollection} products={await getCommerceCatalogue("kids-dress-gloves")} />; }
