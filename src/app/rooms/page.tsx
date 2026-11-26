import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, ListChecks } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import { rooms, statusLabels } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Our Nursery Rooms",
  description:
    "Explore our nursery rooms and the age ranges they are designed for, from babies through to pre-school — then find the right room for your child.",
};

export default function RoomsPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-16 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-6 h-56 w-56 rounded-full bg-sky-pale"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-12 bottom-4 h-36 w-36 rounded-full bg-sun/50"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Our nursery rooms</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              Four rooms, four stages, one warm welcome.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              Room names, age ranges and availability on this page are stored as editable records —
              the nursery team can change them at any time. Enter your child's date of birth in the
              booking form and the site will recommend the matching room automatically.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/book-a-visit"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-semibold text-white transition hover:bg-coral-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                Find my child's room
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/35"
              >
                See the gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {rooms.map((room, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={room.slug}
            className={`relative pb-16 pt-4 ${i % 2 === 0 ? "bg-sheet" : "bg-shade"}`}
          >
            <Scallop className={i % 2 === 0 ? "text-sheet" : "text-shade"} />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <Reveal
                  className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}
                  y={26}
                >
                  <div className={`overflow-hidden shadow-paper-lg ${room.slug === "baby-room" ? "blob-b" : room.slug === "toddler-room" ? "blob-c" : "blob-a"}`}>
                    <img
                      src={room.image}
                      alt={room.alt}
                      width={1024}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </Reveal>

                <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                  <Reveal delay={0.06}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${room.tint} ${room.accentText}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${room.dot}`} />
                        {room.ageLabel}
                      </span>
                      <span className="rounded-full border border-ink/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body/85">
                        {room.minMonths}–{room.maxMonths} months
                      </span>
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body/85">
                        {statusLabels[room.status]}
                      </span>
                    </div>

                    <h2 className="mt-4 text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold">
                      {room.name}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-body">
                      {room.description}
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div className={`rounded-2xl p-5 ${room.tint}`}>
                        <p className="eyebrow text-ink/70">Learning activities</p>
                        <ul className="mt-3 space-y-2">
                          {room.activities.map((a) => (
                            <li key={a} className="flex gap-2 text-sm leading-snug text-body">
                              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${room.dot}`} />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-sheet p-5 ring-1 ring-ink/5">
                        <p className="eyebrow text-ink/70">Development focus</p>
                        <ul className="mt-3 space-y-2">
                          {room.development.map((d) => (
                            <li key={d} className="flex gap-2 text-sm leading-snug text-body">
                              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${room.dot}`} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/book-a-visit?room=${room.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-sheet transition hover:bg-ink-soft"
                      >
                        <CalendarCheck className="h-5 w-5" />
                        Enquire about {room.name}
                      </Link>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-coral hover:text-coral"
                      >
                        Full room details
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative bg-paper pb-24 pt-6">
        <Scallop className="text-paper" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-mint-pale text-mint-deep">
              <ListChecks className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)] font-semibold text-balance">
              Not sure which room fits?
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-body">
              Our booking form calculates your child's exact age in months from their date of
              birth, matches it against the configured age ranges and suggests a room in seconds.
            </p>
            <Link
              href="/book-a-visit"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 font-semibold text-white transition hover:bg-coral-dark"
            >
              Start the booking form
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-xs text-body/85">
              Age bands on this page are illustrative records pending the nursery's confirmation.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
