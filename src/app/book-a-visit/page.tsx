import type { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import Scallop from "@/components/Scallop";
import BookingForm from "@/components/BookingForm";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Visit or Enquire About a Place",
  description:
    "Arrange a nursery visit, enquire about availability or request information. The form calculates your child's age and recommends the right room automatically.",
};

type Props = { searchParams: Promise<{ room?: string }> };

export default async function BookAVisitPage({ searchParams }: Props) {
  const params = await searchParams;
  const room = typeof params.room === "string" ? params.room : undefined;

  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-14 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-peach-pale"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-10 bottom-0 h-32 w-32 rounded-full bg-sun/45"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Book a visit · Make an enquiry</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              Let's find the right room for your little one.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              Five short steps. We work out your child's age from their date of birth, match it
              against the nursery's age ranges and suggest a room — then send everything to the
              team.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Takes about two minutes",
                "Age calculated automatically",
                "No obligation",
                "Nothing confirmed until we reply",
              ].map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sheet px-4 py-2 text-xs font-semibold text-ink ring-1 ring-ink/8"
                >
                  <Check className="h-3.5 w-3.5 text-mint" strokeWidth={3} />
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-24 pt-6">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BookingForm preselectedRoom={room} />
        </div>
      </section>

      <section className="relative bg-shade pb-24 pt-4">
        <Scallop className="text-shade" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold text-balance">
              Your child's data, handled carefully.
            </h2>
            <p className="mt-4 text-body">
              This is a children's nursery, so we treat every detail you share as sensitive.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Sent over an encrypted connection (HTTPS)",
                "Stored in a restricted database only the nursery team can access",
                "Never shown publicly or placed in a web address",
                "Kept only as long as needed, then deleted or anonymised",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm text-body">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint-deep" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/legal#privacy"
              className="mt-5 inline-block text-sm font-semibold text-sky-deep underline underline-offset-4"
            >
              Read the full privacy policy
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[1.6rem] bg-sheet p-6 shadow-paper ring-1 ring-ink/5 sm:p-8">
              <p className="flex items-center gap-2 eyebrow text-coral">
                <HelpCircle className="h-4 w-4" />
                Before you start
              </p>
              <dl className="mt-5 space-y-5">
                {faqs.slice(0, 4).map((faq) => (
                  <div key={faq.q}>
                    <dt className="font-display text-base font-semibold text-ink">{faq.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-body">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
