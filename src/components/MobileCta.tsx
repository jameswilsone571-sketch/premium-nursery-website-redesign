"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { contact } from "@/content/site";

/**
 * Persistent mobile action bar — parents on phones are the primary audience,
 * so the two highest-value actions stay within thumb reach on every page.
 */
export default function MobileCta() {
  const pathname = usePathname();
  if (pathname === "/book-a-visit" || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/8 bg-paper/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2.5">
        <Link
          href="/book-a-visit"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white shadow-[0_14px_26px_-16px_rgba(206,83,64,1)] transition active:scale-[0.98]"
        >
          <CalendarCheck className="h-4.5 w-4.5" />
          Book a Visit
        </Link>
        <a
          href={contact.phoneHref}
          aria-label={`Call the nursery on ${contact.phone}`}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-sheet text-ink transition active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
