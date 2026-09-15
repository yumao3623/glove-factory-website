import { CollectionPage, armSleevesCollection } from "@/components/product/collection-page";
import { getCommerceCatalogue } from "@/lib/commerce/catalog";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Arm Sleeves | Occasion Accessories", "A focused collection for fingerless arm sleeves and coordinated occasion accessories.", "/arm-sleeves/");

export default async function ArmSleevesPage() {
  return <CollectionPage config={armSleevesCollection} products={await getCommerceCatalogue("arm-sleeves")} />;
}
