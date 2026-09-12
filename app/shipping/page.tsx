import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "运输与交付 | JS Meilai", description: "了解运输、税费与交期信息的确认方式。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 运输与交付" title="运输与交付" intro="了解运输、税费与交期信息的确认方式。" sections={[{ title: "按市场确认", body: "运输方式、税费、交期和目的地限制会根据国家、数量和产品状态确认；页面不展示未经验证的统一承诺。" }]} />; }
