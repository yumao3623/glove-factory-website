import { InfoPage } from "@/components/marketing/info-page";
import { pageMetadata, canonicalUrl } from "@/lib/site";

export const metadata = pageMetadata("Material Guide for Gloves and Veils", "Compare satin, lace, tulle, silk, velvet and cotton directions before requesting samples.", "/guides/materials/");

const materialGuideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Material Guide for Gloves and Veils",
  description: "A practical material comparison for buyers preparing a glove or bridal veil sourcing brief.",
  mainEntityOfPage: canonicalUrl("/guides/materials/").toString(),
  author: { "@type": "Organization", name: "JS Meilai" },
};

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(materialGuideSchema) }} /><InfoPage eyebrow="JS Meilai | Material guide" title="Material guide" intro="Compare material direction first, then confirm colour, handfeel and construction with a sample or specification review." sections={[{ title: "Start with the buyer brief", body: "Record the occasion, silhouette, colour direction, target quantity and whether the item needs stretch, structure or an open texture. This keeps material discussion tied to the finished use rather than a fabric name alone." }, { title: "Smooth and formal surfaces", body: "Satin and silk directions can suit a smooth, dressed surface. Confirm sheen, weight, stretch, lining and colour under the lighting used for the final garment before approving a bulk specification." }, { title: "Open texture and light layers", body: "Lace and tulle directions can support open texture or a lighter visual layer. Confirm edge finish, backing, transparency and attachment details with the sample that will represent the range." }, { title: "Handfeel and structure", body: "Velvet and cotton directions change the handfeel and body of an accessory. Treat fibre content, weight and finishing as confirmation fields; the catalogue does not assume a specification that has not been reviewed." }, { title: "What to include in a sample request", body: "Send the family, reference image or product link, preferred material direction, colour, size range, estimated quantity and delivery market. The final material and construction remain item-by-item confirmation points." }]} relatedLinks={[{ href: "/products/", label: "Browse all products" }, { href: "/bridal-gloves/", label: "Explore bridal gloves" }, { href: "/wedding-veils/", label: "Explore wedding veils" }, { href: "/guides/size-guide/", label: "Prepare measurements" }]} /></>;
}
