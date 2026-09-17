import { InfoPage } from "@/components/marketing/info-page";
import { noindexRobots } from "@/lib/stakeholder-preview";
export const metadata = { title: "Returns & exchanges | JS Meilai", description: "Returns policy for samples, stock and custom projects.", robots: noindexRobots };
export default function Page() { return <InfoPage eyebrow="JS Meilai | Returns & exchanges" title="Returns & exchanges" intro="Returns policy for samples, stock and custom projects." sections={[{ title: "Terms depend on the project", body: "Samples, stock items and custom production have different return terms. The applicable terms are written into the confirmed quote and order." }]} />; }
