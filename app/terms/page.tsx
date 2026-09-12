import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "服务条款 | JS Meilai", description: "产品目录、询价和未来订单的使用规则。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 服务条款" title="服务条款" intro="产品目录、询价和未来订单的使用规则。" sections={[{ title: "目录状态", body: "产品、价格、库存、MOQ、交期和认证等信息只有在确认后才会成为公开商业事实。目录中的预览字段不构成报价。" }, { title: "订单与询价", body: "正式订单以人工确认的报价、付款、税费和物流条款为准。没有支付确认前，不会产生已付款订单。" }]} />; }
