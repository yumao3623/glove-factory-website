import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "隐私政策 | JS Meilai", description: "说明询价、账户和营销订阅数据的处理边界。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 隐私政策" title="隐私政策" intro="说明询价、账户和营销订阅数据的处理边界。" sections={[{ title: "当前预览边界", body: "当前版本只在本地预览询价清单和表单行为，不启用真实营销投递或支付。生产接入前会补齐法律主体、处理者、保留期限和用户权利信息。" }, { title: "你的选择", body: "营销订阅与询价同意分开记录；你可以要求访问、更正或删除由站点保存的个人信息。" }]} />; }
