import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { VariantForm } from "@/components/admin/variant-form";
import { RequestsDashboard } from "@/components/admin/requests-dashboard";
import { getAdminUser } from "@/lib/commerce/admin";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const admin = await getAdminUser();
  return <main id="main-content" className="mx-auto min-h-[70vh] max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-300 pb-8"><div><p className="section-label text-stone-500">Operations workspace</p><h1 className="mt-3 font-serif text-5xl text-[#0d2b3f]">Products and enquiries</h1><p className="mt-4 max-w-2xl leading-7 text-stone-700">Manage database-backed product drafts, approved media, variants, inventory and buyer enquiries from one reviewable workspace.</p></div><span className={`inline-flex min-h-9 items-center border px-3 text-xs font-medium ${admin ? "border-emerald-700/30 bg-emerald-50 text-emerald-800" : "border-stone-300 bg-stone-100 text-stone-600"}`}>{admin ? "Administrator session" : "Signed out"}</span></div>
    {admin ? <><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="admin-stat"><p className="admin-stat-value">CRUD</p><p className="admin-stat-label mt-2">Products</p></div><div className="admin-stat"><p className="admin-stat-value">Media</p><p className="admin-stat-label mt-2">Private storage</p></div><div className="admin-stat"><p className="admin-stat-value">Review</p><p className="admin-stat-label mt-2">Before publish</p></div><div className="admin-stat"><p className="admin-stat-value">RFQ</p><p className="admin-stat-label mt-2">Buyer pipeline</p></div></div><ProductForm /><VariantForm /><RequestsDashboard /></> : <div className="mt-8 max-w-xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl text-[#0d2b3f]">Admin sign-in required</h2><p className="mt-3 text-sm leading-6 text-stone-600">Sign in with your confirmed administrator email to manage products and view enquiries. Product images remain private until a reviewed publish action.</p></div>}
    <Link href="/account/" className="mt-10 inline-flex border border-[#0d2b3f] px-5 py-3 text-sm text-[#0d2b3f]">{admin ? "Your account" : "Sign in"}</Link>
  </main>;
}
