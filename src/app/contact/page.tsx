import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with our nursery team — telephone, email, address, opening hours and a quick contact form, or book a visit.",
};

function MapPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] bg-mint-pale shadow-paper ring-1 ring-ink/5">
      <svg
        viewBox="0 0 600 340"
        role="img"
        aria-label="Stylised map placeholder showing the nursery location"
        className="h-64 w-full sm:h-72"
      >
        <rect width="600" height="340" fill="#E4F4EC" />
        <path d="M0 232 C120 210 210 262 330 240 C440 220 520 250 600 232 L600 340 L0 340 Z" fill="#C7E9DA" />
        <path
          d="M-10 96 C120 120 180 60 300 84 C420 108 500 66 610 92"
          stroke="#FBF6EC"
          strokeWidth="26"
          fill="none"
        />
        <path
          d="M148 -10 C166 90 128 170 168 350"
          stroke="#FBF6EC"
          strokeWidth="18"
          fill="none"
        />
        <path
          d="M420 -10 C402 80 448 160 424 350"
          stroke="#FBF6EC"
          strokeWidth="18"
          fill="none"
        />
        <rect x="66" y="132" width="72" height="54" rx="8" fill="#F4EDE0" />
        <rect x="212" y="140" width="86" height="62" rx="8" fill="#FDEDE2" />
        <rect x="470" y="140" width="94" height="58" rx="8" fill="#FEF3D2" />
        <rect x="248" y="264" width="110" height="48" rx="8" fill="#E3F1FA" />
        <g transform="translate(300 150)">
          <path
            d="M0 -46 C19 -46 34 -31 34 -12 C34 12 0 44 0 44 C0 44 -34 12 -34 -12 C-34 -31 -19 -46 0 -46Z"
            fill="#CE5340"
          />
          <circle cx="0" cy="-12" r="12.5" fill="#FFFDF8" />
        </g>
        <circle cx="300" cy="150" r="62" fill="none" stroke="#CE5340" strokeWidth="3" strokeDasharray="7 9" opacity="0.55" />
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/5 bg-sheet px-5 py-4">
        <div>
          <p className="font-display text-base font-semibold text-ink">{contact.addressOneLine}</p>
          <p className="text-xs text-body/85">
            Map placeholder — connect the nursery's Google Business Profile before launch.
          </p>
        </div>
        <a
          href={contact.mapQuery}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/35"
        >
          <MapPin className="h-4 w-4 text-coral" />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-14 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-10 h-52 w-52 rounded-full bg-sky-pale"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Contact us</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              We would love to hear from you.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              Call, email or send a message below. If you would like to see the nursery in action,
              booking a visit takes about two minutes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book-a-visit"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-semibold text-white transition hover:bg-coral-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Visit
              </Link>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/35"
              >
                <Phone className="h-5 w-5 text-coral" />
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-24 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Nursery details"
              title="Where to find us."
              intro="All contact details below are placeholders to be replaced with the nursery's confirmed information."
            />

            <ul className="mt-7 space-y-4">
              <li className="flex gap-4 rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-peach-pale text-peach-deep">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-body/85">Telephone</p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 block font-display text-lg font-semibold text-ink hover:text-coral"
                  >
                    {contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-pale text-sky-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-body/85">Email</p>
                  <a
                    href={contact.emailHref}
                    className="mt-1 block break-all font-display text-lg font-semibold text-ink hover:text-coral"
                  >
                    {contact.email}
                  </a>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint-pale text-mint-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-body/85">Address</p>
                  <address className="mt-1 not-italic font-display text-lg font-semibold leading-snug text-ink">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>

              <li className="flex gap-4 rounded-2xl bg-paper p-5 ring-1 ring-ink/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sun-pale text-sun-deep">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="eyebrow text-body/85">Opening hours</p>
                  <dl className="mt-2 space-y-1.5">
                    {contact.hours.map((row) => (
                      <div key={row.day} className="flex flex-wrap justify-between gap-2 text-sm">
                        <dt className="font-semibold text-ink">{row.day}</dt>
                        <dd className="text-body/85">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-xs text-body/85">{contact.hoursNote}</p>
                </div>
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-ink/12 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-body/85">{contact.socialsNote}</p>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
            <Reveal delay={0.1}>
              <MapPlaceholder />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
