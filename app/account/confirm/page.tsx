import { ConfirmEmail } from "@/components/account/email-action";
export const metadata = { title: "Confirm your email", robots: { index: false, follow: false }, referrer: "no-referrer" as const };
export default function Page() { return <main id="main-content" className="mx-auto min-h-[65vh] max-w-[1100px] px-5 py-16 sm:px-8"><p className="section-label text-stone-500">JS Meilai | Account</p><h1 className="mt-4 font-serif text-4xl text-[#0d2b3f] sm:text-5xl">Confirm your email</h1><ConfirmEmail /></main>; }
