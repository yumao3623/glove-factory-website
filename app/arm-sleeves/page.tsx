import { CollectionPage, armSleevesCollection } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Arm Sleeves｜Occasion Accessories", "A focused collection for fingerless arm sleeves and coordinated occasion accessories.", "/arm-sleeves/");

export default function ArmSleevesPage() {
  return <CollectionPage config={armSleevesCollection} products={getApprovedCatalogueByFamily("arm-sleeves")} />;
}
