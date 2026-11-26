import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarCheck,
  HeartHandshake,
  MessagesSquare,
  Shapes,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import RoomCard from "@/components/RoomCard";
import Testimonials from "@/components/Testimonials";
import { features, galleryItems, pillars, whyVisit } from "@/content/site";
import { rooms } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Little Lanterns Day Nursery | Warm childcare for babies and pre-school children",
  description:
    "Where little minds grow, explore and shine. Discover our nursery rooms, learning approach, gallery and book a visit with our friendly team.",
};

const iconMap = {
  HeartHandshake,
  Shapes,
  Users,
  ShieldCheck,
  Sprout,
  MessagesSquare,
};

const previewGallery = galleryItems.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="grain relative overflow-hidden bg-paper">
        {/* cut-paper background shapes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-sun/40 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-72 h-40 w-40 rounded-full bg-mint-pale"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 right-1/3 hidden h-28 w-28 rounded-full bg-sky-pale lg:block"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pb-32 lg:pt-16">
          <div className="relative z-10 lg:col-span-6 xl:col-span-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-sheet px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">
                <span className="h-2 w-2 rounded-full bg-coral" />
                Day nursery · Babies to pre-school
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[clamp(2.5rem,6.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-balance">
                Where little minds
                <span className="block text-coral">grow, explore</span>
                <span className="block">and shine.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-body sm:text-[1.15rem]">
                Providing a warm, caring and inspiring environment where every child is encouraged
                to learn, develop and discover the world around them.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/book-a-visit"
                  className="inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-4 font-semibold text-white shadow-[0_18px_34px_-20px_rgba(206,83,64,1)] transition hover:-translate-y-0.5 hover:bg-coral-dark"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book a Visit
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-sheet px-7 py-4 font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/35"
                >
                  Learn More
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink/10 pt-6">
                <div>
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-body/85">
                    Rooms
                  </dt>
                  <dd className="mt-1 font-display text-lg font-medium text-ink">
                    {rooms.length} age-based rooms
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-body/85">
                    Age range
                  </dt>
                  <dd className="mt-1 font-display text-lg font-medium text-ink">
                    Babies to pre-school
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-body/85">
                    Visits
                  </dt>
                  <dd className="mt-1 font-display text-lg font-medium text-ink">
                    Weekday tours
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-body/85">
                Room names and age bands shown are editable placeholder records.
              </p>
            </Reveal>
          </div>

          {/* organic cut-paper image */}
          <div className="relative lg:col-span-6">
            <Reveal delay={0.1} y={34}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-xl sm:aspect-[5/4] lg:max-w-none lg:-mr-[6vw] lg:aspect-[5/4.4]">
                <div
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-sun"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 left-10 h-16 w-16 rounded-full bg-mint"
                />
                <div className="blob-a absolute inset-0 overflow-hidden shadow-paper-lg">
                  <img
                    src="/images/hero.jpg"
                    alt="A toddler laughing with paint-covered hands at a low table in a bright nursery playroom"
                    width={1536}
                    height={1024}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-5 right-2 rotate-[-4deg] rounded-2xl border border-ink/5 bg-sheet px-5 py-3 shadow-paper sm:right-6">
                  <p className="hand text-2xl leading-none text-sky-deep">Small steps…</p>
                  <p className="hand text-2xl leading-tight text-coral">big dreams</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- ROOMS RAIL ---------------- */}
      <section className="relative bg-sheet pb-16 pt-4 sm:pb-20">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Explore our rooms"
              title="The right space for every stage."
              intro="Each room is planned around a stage of development. Enter your child's date of birth in our booking form and we will point you towards the right one."
            />
            <Reveal delay={0.1}>
              <Link
                href="/rooms"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-coral hover:text-coral md:self-auto"
              >
                View all rooms
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 hide-scrollbar sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {rooms.map((room, i) => (
              <div
                key={room.slug}
                className="w-[80vw] shrink-0 snap-start sm:w-[46vw] md:w-auto"
              >
                <RoomCard room={room} index={i} />
              </div>
            ))}
          </div>

          <p className="text-xs text-body/85 md:hidden">
            Swipe to see more rooms →
          </p>
        </div>
      </section>

      {/* ---------------- WELCOME ---------------- */}
      <section className="relative bg-shade pb-20 pt-6">
        <Scallop className="text-shade" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="blob-b mt-10 overflow-hidden shadow-paper">
                  <img
                    src="/images/team.jpg"
                    alt="A nursery practitioner kneeling at eye level with a child in a playroom"
                    width={768}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div className="blob-c overflow-hidden shadow-paper">
                  <img
                    src="/images/reading.jpg"
                    alt="A child reading a picture book in a cosy nursery reading corner"
                    width={768}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 rotate-[-3deg] rounded-2xl bg-sun px-5 py-3 shadow-paper sm:block">
                <p className="hand text-xl leading-none text-ink">Welcome in!</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Welcome to our nursery"
              title="A home from home, with room to grow."
              intro="We believe children do their best learning when they feel safe, known and happy. Our team takes time to understand each child — their routines, their interests and the way they like to play — so that days here feel familiar from the very first visit."
            />
            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3">
                {[
                  "A key person who knows your child and keeps you updated",
                  "Open-ended play with real, child-led choice",
                  "Calm, well-kept rooms with space to be busy or quiet",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[0.98rem] text-body">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-mint" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-sheet transition hover:bg-ink-soft"
                >
                  About us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/our-nursery"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/35"
                >
                  Tour our nursery
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section className="relative bg-paper pb-24 pt-6">
        <Scallop className="text-paper" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why choose our nursery"
            title="Six things parents tell us matter most."
            intro="Everything below is written to be edited by the nursery team — no unverified claims, no borrowed promises."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <Reveal key={feature.title} delay={i * 0.05}>
                  <article
                    className={`card-lift h-full rounded-[1.6rem] border border-ink/5 p-6 shadow-paper ${feature.tint} ${
                      i === 0 ? "lg:col-span-1" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sheet shadow-sm ${feature.iconColor}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 font-display text-[1.15rem] font-semibold leading-snug text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body/90">{feature.body}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- LEARNING & DEVELOPMENT ---------------- */}
      <section className="relative bg-ink pb-28 pt-6 text-sheet">
        <Scallop className="text-ink" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Learning and development"
            title="Play is serious work for little people."
            intro="Four threads run through everything we do — and they look different in every room."
            tone="light"
            note="…and it should feel like fun."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.06}>
                <article className="group grid h-full grid-cols-5 overflow-hidden rounded-[1.6rem] bg-white/5 ring-1 ring-white/10 transition hover:bg-white/[0.08]">
                  <div className="col-span-2 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      width={640}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="h-full min-h-40 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="col-span-3 p-5 sm:p-6">
                    <span className={`eyebrow ${pillar.tint === "bg-sun-pale" ? "text-sun" : pillar.tint === "bg-peach-pale" ? "text-peach" : pillar.tint === "bg-sky-pale" ? "text-sky" : "text-mint"}`}>
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-sheet">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sheet/75">{pillar.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY PREVIEW ---------------- */}
      <section className="relative bg-paper pb-24 pt-6">
        <Scallop className="text-paper" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Inside our nursery"
              title="A look around the rooms and garden."
              intro="Photographs of the spaces your child would spend their day in."
            />
            <Reveal delay={0.1}>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 font-semibold text-sheet transition hover:bg-ink-soft md:self-auto"
              >
                View full gallery
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {previewGallery.map((item, i) => (
              <Reveal
                key={item.src + i}
                delay={i * 0.04}
                className={i === 0 || i === 5 ? "col-span-2 md:col-span-2" : ""}
              >
                <Link
                  href="/gallery"
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[1.4rem] shadow-paper"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={768}
                    height={576}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-4 right-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="relative bg-shade pb-24 pt-6">
        <Scallop className="text-shade" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Parent testimonials"
              title="Kind words from our families."
              intro="Carousel content below is clearly labelled as demonstration copy until real, permissioned testimonials are supplied."
            />
            <p className="hand mt-5 text-2xl text-coral">Real quotes coming soon!</p>
          </div>
          <div className="lg:col-span-8">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative bg-coral pb-16 pt-6 text-white">
        <Scallop className="text-coral" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-white/80">Come and say hello</p>
            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold text-balance text-white">
              Come and see what makes our nursery special.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/90">
              Arrange a visit, ask about availability or tell us a little about your child. Our
              team will be in touch to talk it through — nothing is booked until we have
              confirmed it with you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-a-visit"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-semibold text-coral-dark shadow-[0_18px_34px_-20px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Visit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/50 px-8 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact our team
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              {whyVisit.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl bg-white/10 p-4 text-left ring-1 ring-white/20"
                >
                  <p className="font-display text-base font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-white/90">
              Submitting a form creates an enquiry only — a place or appointment is never
              confirmed automatically.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
