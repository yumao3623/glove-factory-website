"use client";
import { useMemo, useSyncExternalStore } from "react";
import { enquiryEvent, parseEnquiryList, readEnquirySnapshot } from "@/lib/enquiry-list";
function subscribe(notify: () => void) { window.addEventListener("storage", notify); window.addEventListener(enquiryEvent, notify); return () => { window.removeEventListener("storage", notify); window.removeEventListener(enquiryEvent, notify); }; }
const serverSnapshot = () => "[]";
export function useEnquiryList() { const raw = useSyncExternalStore(subscribe, readEnquirySnapshot, serverSnapshot); return useMemo(() => parseEnquiryList(raw), [raw]); }
