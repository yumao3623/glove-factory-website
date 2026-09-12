import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "联系我们 | JS Meilai", description: "提交一个包含产品、数量和定制方向的 B2B 询价。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 联系我们" title="联系我们" intro="提交一个包含产品、数量和定制方向的 B2B 询价。" sections={[{ title: "让 brief 可执行", body: "请在下方询价表中说明公司、国家、产品链接、预计数量、目标交期以及颜色、材料、尺寸和包装要求。" }, { title: "隐私与回复", body: "联系方式只用于处理你的询价。正式邮件投递和数据存储将在生产环境接入经过授权的服务后开启。" }, { title: "其他页面", body: "尺寸请查看尺寸指南，材料请查看材料词典；如果不确定产品族，先浏览全部产品目录。" }]} />; }
