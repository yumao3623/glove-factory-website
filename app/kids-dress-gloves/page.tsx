import { CollectionPage, kidsCollection } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Kids Dress Gloves", "A focused development collection for girls' dress and special-occasion glove sourcing.", "/kids-dress-gloves/");

export default function KidsDressGlovesPage() { return <CollectionPage config={kidsCollection} products={getApprovedCatalogueByFamily("kids-dress-gloves")} />; }
