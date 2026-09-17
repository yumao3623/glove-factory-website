import { InfoPage } from "@/components/marketing/info-page";
import { pageMetadata, canonicalUrl } from "@/lib/site";

export const metadata = pageMetadata("Glove Measuring Guide for Buyers", "Prepare repeatable hand and arm measurements before requesting glove or sleeve samples.", "/guides/size-guide/");

const measuringGuideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to prepare glove and sleeve measurements",
  description: "A practical measurement checklist for a B2B glove or sleeve sourcing brief.",
  mainEntityOfPage: canonicalUrl("/guides/size-guide/").toString(),
  step: [
    { "@type": "HowToStep", name: "Measure palm circumference", text: "Measure around the palm across the knuckles, keeping the tape comfortable and excluding the thumb." },
    { "@type": "HowToStep", name: "Measure hand length", text: "Record the distance from the wrist crease to the tip of the longest finger." },
    { "@type": "HowToStep", name: "Record arm or sleeve length", text: "For long gloves or sleeves, record the intended opening point and the length to that point." },
    { "@type": "HowToStep", name: "Send context with the numbers", text: "Include the garment, occasion, size range, tolerance and sample reference so the measurements can be reviewed in context." },
  ],
};

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(measuringGuideSchema) }} /><InfoPage eyebrow="JS Meilai | Measuring guide" title="Measuring guide" intro="Prepare repeatable hand and arm measurements before requesting glove or sleeve samples." sections={[{ title: "Measure the palm", body: "Measure around the palm across the knuckles, keeping the tape comfortable and excluding the thumb. Record the unit and whether the measurement was taken over or under any garment layer." }, { title: "Record hand length", body: "Measure from the wrist crease to the tip of the longest finger. If the brief covers a size range, send the smallest, largest and most common target rather than one unlabelled number." }, { title: "Add arm and sleeve context", body: "For opera gloves, arm sleeves or other long accessories, note the intended opening point and the length to that point. Add the garment or occasion so the proportion can be reviewed with the silhouette." }, { title: "Make the sample request repeatable", body: "Include the reference product or family, measurements, tolerance, colour, material direction, estimated quantity and delivery market. Final sizing follows product and sample confirmation; this guide does not replace a fit review." }]} relatedLinks={[{ href: "/products/", label: "Browse all products" }, { href: "/opera-gloves/", label: "Explore opera gloves" }, { href: "/arm-sleeves/", label: "Explore arm sleeves" }, { href: "/guides/materials/", label: "Compare materials" }]} /></>;
}
