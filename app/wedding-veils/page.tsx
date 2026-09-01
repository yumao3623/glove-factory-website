import { CollectionPage, veilsCollection, withFixtures } from "@/components/product/collection-page";
import { veilDevelopmentFixtures } from "@/data/collection-fixtures";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Wedding Veils", "A focused development edit for buyers sourcing wedding and bridal veil directions.", "/wedding-veils/");

export default function WeddingVeilsPage() { return <CollectionPage config={withFixtures(veilsCollection, veilDevelopmentFixtures)} />; }
