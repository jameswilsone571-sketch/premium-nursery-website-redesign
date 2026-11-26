"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { contact, nav } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/5 bg-paper/92 shadow-[0_10px_30px_-24px_rgba(31,42,68,0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-paper/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-2.5 py-2 text-[0.85rem] font-medium whitespace-nowrap transition-colors ${
                isActive(item.href) ? "text-ink" : "text-body hover:text-ink"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-0.5 h-1 rounded-full bg-coral" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/25 hover:bg-sheet xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-coral" />
            {contact.phone}
          </a>
          <Link
            href="/book-a-visit"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_-14px_rgba(206,83,64,0.9)] transition hover:bg-coral-dark sm:px-5"
          >
            <CalendarCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Book a Visit</span>
            <span className="sm:hidden">Book</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-sheet text-ink transition hover:border-ink/25 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-paper lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto max-w-lg px-5 pb-10 pt-28"
          >
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium transition ${
                      isActive(item.href)
                        ? "bg-sun-pale text-ink"
                        : "text-ink hover:bg-sheet"
                    }`}
                  >
                    {item.label}
                    <span className="text-base text-body/85">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-3xl bg-sheet p-5 shadow-paper">
              <p className="eyebrow text-coral">Talk to us</p>
              <a
                href={contact.phoneHref}
                className="mt-2 block font-display text-2xl font-semibold text-ink"
              >
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="mt-1 block text-sm text-body underline decoration-sky/40 underline-offset-4">
                {contact.email}
              </a>
              <p className="mt-3 text-sm leading-relaxed text-body/80">
                {contact.addressLines.join(", ")}
              </p>
              <Link
                href="/book-a-visit"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 font-semibold text-white transition hover:bg-coral-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Visit
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
