import Link from "next/link";
import Logo, { Mark } from "./Logo";
import { contact, nav, site } from "@/content/site";
import { rooms } from "@/content/rooms";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-sheet">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <Mark className="h-11 w-11" />
            <span className="font-display text-xl font-semibold text-sheet">
              {site.fullName}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sheet/70">
            {site.description}
          </p>
          <p className="hand mt-4 text-xl text-sun">Small steps, big dreams.</p>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-sun">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sheet/75 transition hover:text-sheet"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-sun">Our rooms</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {rooms.map((room) => (
              <li key={room.slug}>
                <Link
                  href={`/rooms/${room.slug}`}
                  className="text-sheet/75 transition hover:text-sheet"
                >
                  {room.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book-a-visit" className="font-semibold text-sun transition hover:text-sheet">
                Book a visit →
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="eyebrow text-sun">Get in touch</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic">
            <p className="text-sheet/75">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={contact.phoneHref} className="text-sheet/75 transition hover:text-sheet">
                {contact.phone}
              </a>
            </p>
            <p>
              <a href={contact.emailHref} className="text-sheet/75 transition hover:text-sheet">
                {contact.email}
              </a>
            </p>
          </address>

          <ul className="mt-5 flex flex-wrap gap-2">
            {contact.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-sheet/80 transition hover:border-sun hover:text-sun"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-sheet/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {site.year} {site.fullName}. All rights reserved. Placeholder brand and details.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/legal#privacy" className="transition hover:text-sheet">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal#cookie" className="transition hover:text-sheet">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/parent-information#policies" className="transition hover:text-sheet">
                Nursery policies
              </Link>
            </li>
            <li>
              <Link href="/admin/enquiries" className="transition hover:text-sheet">
                Enquiry admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
