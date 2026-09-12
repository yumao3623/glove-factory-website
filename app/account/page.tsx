import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "账户 | JS Meilai", description: "登录后管理订单、询价、地址和收藏。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 账户" title="账户" intro="登录后管理订单、询价、地址和收藏。" sections={[{ title: "账户功能预览", body: "账户登录和 Google 登录将在认证服务配置后启用。本地版本保留页面入口，不伪造登录状态或订单数据。" }]} />; }
