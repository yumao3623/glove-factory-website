import { CollectionPage, kidsCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Girls' Dress Gloves for Special Occasions", "Review girls' dress glove directions for flower-girl, formal and special-occasion ranges, with confirmed details discussed per project.", "/kids-dress-gloves/");

export default async function KidsDressGlovesPage() { return <CollectionPage config={kidsCollection} products={await getCommerceCatalogue("kids-dress-gloves")} />; }
