import Link from "next/link";
import { QuoteForm } from "@/components/admin/quote-form";
import { ProductForm } from "@/components/admin/product-form";
import { VariantForm } from "@/components/admin/variant-form";
import { RequestsDashboard } from "@/components/admin/requests-dashboard";
import { getAdminUser } from "@/lib/commerce/admin";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const admin = await getAdminUser();
  return <main id="main-content" className="mx-auto min-h-[70vh] max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-300 pb-8"><div><p className="section-label text-stone-500">运营工作台</p><h1 className="mt-3 font-serif text-4xl text-[#0d2b3f] sm:text-5xl">产品与询盘管理</h1><p className="mt-4 max-w-2xl leading-7 text-stone-700">管理产品、图片、已确认库存、客户询盘和报价。这里的状态只供内部运营使用。</p></div><span className={`inline-flex min-h-9 items-center border px-3 text-xs font-medium ${admin ? "border-emerald-700/30 bg-emerald-50 text-emerald-800" : "border-stone-300 bg-stone-100 text-stone-600"}`}>{admin ? "管理员已登录" : "未登录"}</span></div>
    {admin ? <><nav aria-label="工作台分区" className="mt-6 flex flex-wrap gap-3 text-sm"><a href="#products-workspace" className="min-h-11 border border-stone-300 px-4 py-3">产品目录</a><a href="#inventory-workspace" className="min-h-11 border border-stone-300 px-4 py-3">变体与库存</a><a href="#requests-workspace" className="min-h-11 border border-stone-300 px-4 py-3">询盘与订单</a><a href="#quote-builder" className="min-h-11 border border-stone-300 px-4 py-3">创建报价</a></nav><div id="products-workspace" className="scroll-mt-24"><ProductForm /></div><div id="inventory-workspace" className="scroll-mt-24"><VariantForm /></div><RequestsDashboard /><QuoteForm /></> : <div className="mt-8 max-w-xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl text-[#0d2b3f]">需要管理员登录</h2><p className="mt-3 text-sm leading-6 text-stone-600">请使用已验证的管理员邮箱登录后管理产品和查看询盘。产品图片只有在复核并发布后才会对外显示。</p></div>}
    <Link href="/account/" className="mt-10 inline-flex border border-[#0d2b3f] px-5 py-3 text-sm text-[#0d2b3f]">{admin ? "返回账户" : "去登录"}</Link>
  </main>;
}
