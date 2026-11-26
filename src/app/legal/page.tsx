import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";

export const metadata: Metadata = {
  title: "Privacy and Cookie Policy",
  description:
    "How this nursery website handles personal data, children's information, cookies and retention — written with UK GDPR in mind.",
};

export default function LegalPage() {
  return (
    <>
      <section className="grain relative bg-paper pb-12 pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow text-coral">Legal</p>
            <h1 className="mt-3 text-[clamp(2.1rem,4.6vw,3.2rem)] font-semibold text-balance">
              Privacy and cookie policy.
            </h1>
            <p className="mt-4 text-body">
              Draft wording for the prototype. The nursery must review and approve this text, and
              confirm its retention periods, before publication.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-24 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          <article id="privacy" className="scroll-mt-32 rounded-[1.6rem] bg-paper p-6 ring-1 ring-ink/5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Privacy policy</h2>
            <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-body">
              <p>
                When you submit an enquiry or a booking request through this website, we collect the
                details you provide: your name, email address, telephone number, your child's first
                name and date of birth, and any information you choose to add to the message.
              </p>
              <p>
                We use that information only to respond to your enquiry, calculate which nursery room
                suits your child's age and arrange a visit if you ask for one. We do not publish
                child information on the website, do not place it in web addresses, and do not share
                it with third parties for marketing.
              </p>
              <p>
                Information is sent over an encrypted connection (HTTPS) and stored in a restricted
                database that only the nursery team can access. Enquiries are retained for as long as
                needed to deal with your request and to meet our legal obligations, then deleted or
                anonymised.
              </p>
              <p>
                You can ask what information we hold about you, request a correction or ask for
                deletion by contacting the nursery. You may also complain to the Information
                Commissioner's Office (ICO).
              </p>
              <p className="rounded-xl bg-sun-pale px-4 py-3 text-sm font-semibold text-sun-deep">
                Placeholder privacy notice — to be reviewed against the nursery's actual data
                controller details, retention schedule and analytics tools before launch.
              </p>
            </div>
          </article>

          <article id="cookie" className="scroll-mt-32 rounded-[1.6rem] bg-paper p-6 ring-1 ring-ink/5 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Cookie policy</h2>
            <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-body">
              <p>
                This prototype stores a single item in your browser's local storage so that the
                prototype notice at the top of the page stays dismissed. It contains no personal
                information and expires when you clear your browser data.
              </p>
              <p>
                The booking form uses a short-lived session token to prevent accidental duplicate
                submissions. No advertising or cross-site tracking cookies are set.
              </p>
              <p>
                If analytics or embedded map services are added later, they will be listed here with
                a consent control before they are switched on.
              </p>
              <p className="rounded-xl bg-sun-pale px-4 py-3 text-sm font-semibold text-sun-deep">
                Placeholder cookie notice — confirm the final script list with the nursery.
              </p>
            </div>
          </article>

          <article className="rounded-[1.6rem] bg-ink p-6 text-sheet sm:p-8">
            <h2 className="font-display text-xl font-semibold text-sheet">Data controller</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-sheet/60">Organisation</dt>
                <dd className="font-semibold">Little Lanterns Day Nursery (placeholder)</dd>
              </div>
              <div>
                <dt className="text-sheet/60">Contact</dt>
                <dd className="font-semibold">hello@your-nursery.co.uk</dd>
              </div>
              <div>
                <dt className="text-sheet/60">Postal address</dt>
                <dd className="font-semibold">12 Nursery Lane, Your Town, AB1 2CD</dd>
              </div>
              <div>
                <dt className="text-sheet/60">Supervisory authority</dt>
                <dd className="font-semibold">Information Commissioner's Office</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </>
  );
}
