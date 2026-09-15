import Link from "next/link";
export const metadata = { title: "Request a quotation", description: "Confirm materials, quantities and delivery for your glove order." };
export default function CheckoutPage() {
  return <main id="main-content" className="mx-auto min-h-[60vh] max-w-[900px] px-5 py-16 sm:px-8 lg:py-24">
    <p className="section-label text-stone-500">Your next step</p>
    <h1 className="mt-3 font-serif text-5xl text-[#0d2b3f]">Let’s confirm your order details.</h1>
    <p className="mt-5 max-w-xl leading-7 text-stone-700">Send your selected styles and quantities. We’ll confirm materials, sizing, production time and delivery costs before you place an order.</p>
    <p className="mt-6 max-w-xl text-sm leading-6 text-stone-600">Online payment is not available yet. A saved enquiry list does not reserve stock or place an order.</p>
    <div className="mt-10 flex flex-wrap gap-3"><Link href="/cart/" className="inline-flex min-h-11 items-center border border-[#0d2b3f] px-5 text-sm text-[#0d2b3f]">Review enquiry list</Link><Link href="/contact/#rfq" className="inline-flex min-h-11 items-center bg-[#0d2b3f] px-5 text-sm font-medium text-white">Contact our team</Link></div>
  </main>;
}
