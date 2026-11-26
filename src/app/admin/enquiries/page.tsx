import { createHash, timingSafeEqual } from "crypto";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Inbox, Mail, Phone } from "lucide-react";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import AdminLogin from "@/components/AdminLogin";
import AdminLogout from "@/components/AdminLogout";
import { statusLabels, rooms } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Enquiry admin",
  robots: { index: false, follow: false },
};

function expectedToken(): string {
  const key = process.env.ADMIN_KEY || "nursery-demo-key";
  return createHash("sha256").update(`nursery:${key}`).digest("hex");
}

function isAuthed(value: string | undefined): boolean {
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expectedToken());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const cookieStore = await cookies();
  const authed = isAuthed(cookieStore.get("nursery_admin")?.value);

  if (!authed) {
    return (
      <section className="bg-paper px-4 py-16 sm:px-6">
        <AdminLogin />
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-body/85">
          <Link href="/" className="underline underline-offset-4">
            Back to the website
          </Link>
        </p>
      </section>
    );
  }

  const rows = await db
    .select()
    .from(enquiries)
    .orderBy(desc(enquiries.createdAt))
    .limit(100);

  return (
    <section className="bg-paper px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-coral">Restricted area</p>
            <h1 className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold">
              Booking enquiries
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-body">
              {rows.length} enquir{rows.length === 1 ? "y" : "ies"} stored securely. Child details
              are never exposed on any public page. In the WordPress build this screen maps to a
              capability-restricted CPT list table.
            </p>
          </div>
          <div className="flex gap-2">
            <AdminLogout />
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sheet transition hover:bg-ink-soft"
            >
              <ArrowLeft className="h-4 w-4" />
              Site
            </Link>
          </div>
        </div>

        {rows.length === 0 ? (
          <div className="mt-10 rounded-[1.6rem] bg-sheet p-12 text-center shadow-paper">
            <Inbox className="mx-auto h-12 w-12 text-body/40" />
            <h2 className="mt-4 font-display text-xl font-semibold text-ink">
              No enquiries yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              Submit a test enquiry through the booking form and it will appear here immediately.
            </p>
            <Link
              href="/book-a-visit"
              className="mt-6 inline-flex rounded-full bg-coral px-6 py-3.5 font-semibold text-white transition hover:bg-coral-dark"
            >
              Open the booking form
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {rows.map((row) => {
              const room = rooms.find((r) => r.slug === row.roomSlug);
              return (
                <li
                  key={row.id}
                  className="rounded-[1.4rem] bg-sheet p-6 shadow-paper ring-1 ring-ink/5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/8 pb-4">
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">
                        {row.parentName}
                      </p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body">
                        <a
                          href={`mailto:${row.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-coral"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {row.email}
                        </a>
                        <a
                          href={`tel:${row.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center gap-1.5 hover:text-coral"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {row.phone}
                        </a>
                        <span className="text-body/85">Prefers {row.contactMethod}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex rounded-full bg-ink px-3 py-1 font-mono text-xs font-bold tracking-wide text-sun">
                        {row.reference}
                      </span>
                      <p className="mt-2 text-xs text-body/85">
                        {row.createdAt.toLocaleString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-body/85">
                        Child
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">
                        {row.childName} · born {row.dob}
                      </dd>
                      <dd className="text-sm text-body">
                        {row.ageLabel} ({row.ageMonths} months)
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-body/85">
                        Recommended room
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">
                        {row.roomName || "To be reviewed"}
                      </dd>
                      {room && (
                        <dd className="text-sm text-body">{room.ageLabel}</dd>
                      )}
                    </div>
                    <div>
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-body/85">
                        Enquiry
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ink">{row.enquiryType}</dd>
                      <dd className="text-sm text-body">
                        Start: {row.startDate || "not specified"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-body/85">
                        Preferred days
                      </dt>
                      <dd className="mt-1 text-sm text-ink">{row.preferredDays || "No preference"}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-body/85">
                        Notes from parent
                      </dt>
                      <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-body">
                        {row.message || "No additional notes."}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-body/85">
                    Consent recorded: {row.consent ? "yes" : "no"} · source: {row.source}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-8 text-xs leading-relaxed text-body/85">
          Room availability shown to parents:{" "}
          {rooms.map((r) => `${r.name} — ${statusLabels[r.status]}`).join(" · ")}.
        </p>
      </div>
    </section>
  );
}
