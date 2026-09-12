import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "工厂与质量 | JS Meilai", description: "了解手套产品族、材料方向和采购沟通方式。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜工厂与质量" title="工厂与质量" intro="了解手套产品族、材料方向和采购沟通方式。" sections={[{ title: "面向全球采购", body: "我们围绕婚礼、Opera、礼服、舞台、儿童礼服、婚礼头纱和袖套配饰整理可审阅的产品目录，帮助采购团队先确定方向。" }, { title: "质量沟通", body: "样品、尺寸、材料、颜色和包装要求在询价中逐项确认。公开页面只展示已完成证据审核的字段。" }, { title: "采购支持", body: "从现有款式、小批量样品到私人品牌项目，提交完整 brief 后进入人工评估。" }]} />; }
