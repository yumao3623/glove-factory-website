import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "材质色卡 | JS Meilai", description: "查看颜色和材料方向并提交样品需求。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 材质色卡" title="材质色卡" intro="查看颜色和材料方向并提交样品需求。" sections={[{ title: "颜色需要实物确认", body: "屏幕颜色仅用于方向选择；色卡和样品可作为后续项目输入，最终颜色以确认样为准。" }]} />; }
