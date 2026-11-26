import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, FileText, Lock } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import { documents, faqs, parentSections } from "@/content/site";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Parent Information",
  description:
    "Admissions, settling-in, fees and funding, opening hours, nursery policies, FAQs and downloadable documents for parents and carers.",
};

export default function ParentInformationPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-14 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-16 h-48 w-48 rounded-full bg-peach-pale"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Parent information</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              Everything you need, in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              Admissions, settling in, fees, policies and answers to the questions parents ask us
              most. Sections marked as placeholders will be completed by the nursery before this
              page goes live.
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
                href={`#${parentSections[0].id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/35"
              >
                Jump to admissions
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-20 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="sticky top-28 rounded-[1.4rem] bg-paper p-5 ring-1 ring-ink/5">
              <p className="eyebrow text-coral">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {parentSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="rounded-lg px-2 py-1.5 font-medium text-body transition hover:bg-sheet hover:text-ink"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#documents"
                    className="rounded-lg px-2 py-1.5 font-medium text-body transition hover:bg-sheet hover:text-ink"
                  >
                    Downloadable documents
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="rounded-lg px-2 py-1.5 font-medium text-body transition hover:bg-sheet hover:text-ink"
                  >
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="space-y-6 lg:col-span-9">
            {parentSections.map((section, i) => (
              <Reveal key={section.id} delay={i * 0.04}>
                <article
                  id={section.id}
                  className="scroll-mt-32 rounded-[1.6rem] bg-paper p-6 ring-1 ring-ink/5 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral font-display text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <h2 className="font-display text-[1.4rem] font-semibold sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-[0.98rem] leading-relaxed text-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="mt-5 flex items-start gap-2 rounded-xl bg-sun-pale px-4 py-3 text-xs font-semibold leading-relaxed text-sun-deep">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                    {section.placeholder}
                  </p>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <article
                id="documents"
                className="scroll-mt-32 rounded-[1.6rem] bg-paper p-6 ring-1 ring-ink/5 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-sm font-semibold text-white">
                    {parentSections.length + 1}
                  </span>
                  <h2 className="font-display text-[1.4rem] font-semibold sm:text-2xl">
                    Downloadable documents
                  </h2>
                </div>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-body">
                  The nursery administrator can upload and replace these PDFs at any time. Documents
                  that have not been uploaded yet are shown as pending rather than as dead links.
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {documents.map((doc) => (
                    <li
                      key={doc.title}
                      className="flex items-center gap-3 rounded-xl border border-ink/8 bg-sheet px-4 py-3.5"
                    >
                      <FileText className="h-5 w-5 shrink-0 text-body/85" />
                      <span className="flex-1 text-sm font-semibold text-ink">{doc.title}</span>
                      <span className="rounded-full bg-shade px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-body/85">
                        Awaiting upload
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal>
              <article
                id="faq"
                className="scroll-mt-32 rounded-[1.6rem] bg-ink p-6 text-sheet sm:p-8"
              >
                <h2 className="font-display text-[1.4rem] font-semibold text-sheet sm:text-2xl">
                  Frequently asked questions
                </h2>
                <dl className="mt-5 space-y-4">
                  {faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10"
                    >
                      <dt className="font-display text-base font-semibold text-sheet">{faq.q}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-sheet/75">{faq.a}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-xs text-sheet/60">
                  Answers are editable and must be reviewed by the nursery before publication.
                </p>
              </article>
            </Reveal>

            <Reveal>
              <div className="rounded-[1.6rem] bg-mint-pale p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  Still have a question?
                </h2>
                <p className="mt-2 text-body">
                  Call {contact.phone} or send the team a message and we will get back to you.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-sheet transition hover:bg-ink-soft"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/book-a-visit"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/40"
                  >
                    <CalendarCheck className="h-5 w-5" />
                    Book a Visit
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
