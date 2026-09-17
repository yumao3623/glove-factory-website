import type { Metadata } from "next";
import { noindexRobots } from "@/lib/stakeholder-preview";

export const metadata: Metadata = { robots: noindexRobots };

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
