import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "OEM 与定制制造 | JS Meilai", description: "把一个产品方向转成可讨论的打样与量产 brief。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ OEM 与定制制造" title="OEM 与定制制造" intro="把一个产品方向转成可讨论的打样与量产 brief。" sections={[{ title: "从样品到系列", body: "根据已确认的产品方向讨论版型、颜色、尺寸、装饰、Logo、包装或客户提供材料。每个项目先确认范围，再进入打样与报价。" }, { title: "适合哪些买家", body: "婚纱品牌、礼服品牌、舞台服装、批发商和选品团队都可以从现有产品族开始，提交目标市场、数量和交期要求。" }, { title: "如何开始", body: "将产品链接、参考图、目标数量和交付市场放入询价，我们会在事实和可行性确认后回复下一步。" }]} />; }
