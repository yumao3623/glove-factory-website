import { CollectionPage, operaCollection } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Opera Gloves", "A focused development collection for buyers sourcing long, evening and formal gloves.", "/opera-gloves/");

export default function OperaGlovesPage() { return <CollectionPage config={operaCollection} products={getApprovedCatalogueByFamily("opera-gloves")} />; }
