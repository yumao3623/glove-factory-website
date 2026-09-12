import { InfoPage } from "@/components/marketing/info-page";
export const metadata = { title: "材料词典 | JS Meilai", description: "比较缎面、蕾丝、Tulle、丝绸、天鹅绒与棉等方向。" };
export default function Page() { return <InfoPage eyebrow="JS Meilai｜ 材料词典" title="材料词典" intro="比较缎面、蕾丝、Tulle、丝绸、天鹅绒与棉等方向。" sections={[{ title: "材料先做方向判断", body: "材料筛选只显示已批准数据中的确认值。纤维成分、克重和后整理需要在样品或规格确认后锁定。" }]} />; }
