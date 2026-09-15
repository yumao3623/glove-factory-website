import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
import { VariantForm } from "@/components/admin/variant-form";
import { RequestsDashboard } from "@/components/admin/requests-dashboard";
import { getAdminUser } from "@/lib/commerce/admin";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const admin = await getAdminUser();
  return <main id="main-content" className="mx-auto min-h-[70vh] max-w-[1200px] px-5 py-16 sm:px-8 lg:py-24">
    <p className="section-label text-stone-500">Operations</p>
    <h1 className="mt-3 font-serif text-5xl text-[#0d2b3f]">Products and enquiries</h1>
    {admin ? <><p className="mt-5 max-w-2xl leading-7 text-stone-700">Add product photos and specifications, review drafts, and keep your stock records up to date.</p><ProductForm /><VariantForm /><RequestsDashboard /></> : <div className="mt-8 max-w-xl border border-stone-200 bg-white p-6"><h2 className="font-serif text-2xl text-[#0d2b3f]">Admin sign-in required</h2><p className="mt-3 text-sm leading-6 text-stone-600">Sign in with your confirmed administrator email to manage products and view enquiries.</p></div>}
    <Link href="/account/" className="mt-10 inline-flex border border-[#0d2b3f] px-5 py-3 text-sm text-[#0d2b3f]">{admin ? "Your account" : "Sign in"}</Link>
  </main>;
}
