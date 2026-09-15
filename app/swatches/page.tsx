import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "Material swatches | JS Meilai", description: "Compare colour and material directions, then request samples." };
export default function Page() { return <InfoPage eyebrow="JS Meilai | Material swatches" title="Material swatches" intro="Compare colour and material directions, then request samples." sections={[{ title: "Colour needs a physical reference", body: "On-screen colour is directional only; swatches and samples inform the project, with final colour set by an approved sample." }]} />; }
