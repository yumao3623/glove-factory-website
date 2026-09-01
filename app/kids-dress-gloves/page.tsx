import { CollectionPage, kidsCollection, withFixtures } from "@/components/product/collection-page";
import { kidsDevelopmentFixtures } from "@/data/collection-fixtures";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Kids Dress Gloves", "A focused development collection for girls' dress and special-occasion glove sourcing.", "/kids-dress-gloves/");

export default function KidsDressGlovesPage() { return <CollectionPage config={withFixtures(kidsCollection, kidsDevelopmentFixtures)} />; }
