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
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-300 pb-8"><div><p className="section-label text-stone-500">Operations workspace</p><h1 className="mt-3 font-serif text-5xl text-[#0d2b3f]">Products and enquiries</h1><p className="mt-4 max-w-2xl leading-7 text-stone-700">Manage products, images, stock, buyer enquiries and confirmed quotes.</p></div><span className={`inline-flex min-h-9 items-center border px-3 text-xs font-medium ${admin ? "border-emerald-700/30 bg-emerald-50 text-emerald-800" : "border-stone-300 bg-stone-100 text-stone-600"}`}>{admin ? "Administrator session" : "Signed out"}</span></div>
    {admin ? <><nav aria-label="Workspace sections" className="mt-6 flex flex-wrap gap-3 text-sm"><a href="#products-workspace" className="min-h-11 border border-stone-300 px-4 py-3">Products</a><a href="#inventory-workspace" className="min-h-11 border border-stone-300 px-4 py-3">Inventory</a><a href="#requests-workspace" className="min-h-11 border border-stone-300 px-4 py-3">Enquiries and orders</a><a href="#quote-builder" className="min-h-11 border border-stone-300 px-4 py-3">Create quote</a></nav><div id="products-workspace" className="scroll-mt-24"><ProductForm /></div><div id="inventory-workspace" className="scroll-mt-24"><VariantForm /></div><RequestsDashboard /><QuoteForm /></> : <div className="mt-8 max-w-xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl text-[#0d2b3f]">Admin sign-in required</h2><p className="mt-3 text-sm leading-6 text-stone-600">Sign in with your confirmed administrator email to manage products and view enquiries. Product images remain private until a reviewed publish action.</p></div>}
    <Link href="/account/" className="mt-10 inline-flex border border-[#0d2b3f] px-5 py-3 text-sm text-[#0d2b3f]">{admin ? "Your account" : "Sign in"}</Link>
  </main>;
}
