import { InfoPage } from "@/components/marketing/info-page";
import { noindexRobots } from "@/lib/stakeholder-preview";
export const metadata = { title: "Shipping & delivery | JS Meilai", description: "Understand how shipping, tax and lead times are confirmed.", robots: noindexRobots };
export default function Page() { return <InfoPage eyebrow="JS Meilai | Shipping & delivery" title="Shipping & delivery" intro="Understand how shipping, tax and lead times are confirmed." sections={[{ title: "Confirmed by market", body: "Shipping method, tax, lead time and destination limits are confirmed by country, quantity and product status; this page makes no unverified blanket promise." }]} />; }
