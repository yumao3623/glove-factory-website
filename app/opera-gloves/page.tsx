import { CollectionPage, operaCollection, withFixtures } from "@/components/product/collection-page";
import { operaDevelopmentFixtures } from "@/data/collection-fixtures";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Opera Gloves", "A focused development collection for buyers sourcing long, evening and formal gloves.", "/opera-gloves/");

export default function OperaGlovesPage() { return <CollectionPage config={withFixtures(operaCollection, operaDevelopmentFixtures)} />; }
