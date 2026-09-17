import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquiry list",
  description: "Review selected styles, quantities and custom directions before sending a B2B enquiry.",
};

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
