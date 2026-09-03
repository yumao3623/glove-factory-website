import { CollectionPage, type CollectionConfig } from "@/components/product/collection-page";
import { getApprovedCatalogueByFamily } from "@/data/approved-catalogue";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Bridal Gloves", "A focused B2B collection for buyers sourcing approved bridal glove products.", "/bridal-gloves/");

const bridalCollection: CollectionConfig = {
  family: "bridal-gloves",
  title: "Bridal Gloves",
  eyebrow: "Bridal glove sourcing",
  intro: "A focused collection for buyers exploring bridal glove direction.",
  layout: "bridal",
  rangeHeading: "A lace-led bridal glove direction.",
  rangeCopy: "Explore the visible silhouette and finishing details, then bring the requirements for your range to an enquiry.",
  procurementHeading: "Detail the look before the specification.",
  procurementCopy: "Use this selection to align on lace and sheer direction before discussing the specifications relevant to your brief.",
};

export default function BridalGlovesPage() { return <CollectionPage config={bridalCollection} products={getApprovedCatalogueByFamily("bridal-gloves")} />; }
