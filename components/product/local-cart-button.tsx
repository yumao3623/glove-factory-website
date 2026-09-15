"use client";

import { useState } from "react";
import Link from "next/link";
import { addEnquiryItem, parseEnquiryList, readEnquirySnapshot, writeEnquiryList } from "@/lib/enquiry-list";

export function LocalCartButton({ productId, productName }: { productId: string; productName: string }) {
  const [added, setAdded] = useState(false);
  function add() {
    try { writeEnquiryList(addEnquiryItem(parseEnquiryList(readEnquirySnapshot()), { productId, productName, quantity: 1 })); } catch { return; }
    setAdded(true);
  }
  return <div className="flex flex-wrap gap-3"><button type="button" onClick={add} className="inline-flex min-h-11 items-center bg-[#0d2b3f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#173f59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2b3f] focus-visible:ring-offset-2">{added ? "Added to enquiry list" : "Add to enquiry list"}</button>{added ? <Link href="/cart/" className="inline-flex min-h-11 items-center border border-[#0d2b3f] px-5 text-sm font-medium text-[#0d2b3f]">View list</Link> : null}</div>;
}
