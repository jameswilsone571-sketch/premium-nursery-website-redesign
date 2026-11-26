import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import { dayTimeline, environmentPoints, galleryItems } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Nursery",
  description:
    "Take a look around our nursery: the rooms, the outdoor space, the quiet corners and what a typical day looks like for children.",
};

export default function OurNurseryPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-16 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-24 h-52 w-52 rounded-full bg-mint-pale"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Our nursery</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              A bright, calm place built for small people.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              From the pegs at the door to the garden beyond it, every part of the setting is
              arranged so children can find what they need, choose what they do and settle when the
              day feels big.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 overflow-hidden rounded-[2rem] shadow-paper-lg">
              <img
                src="/images/entrance.jpg"
                alt="Nursery entrance with low wooden pegs, coats and cubby shelves leading into a bright playroom"
                width={1536}
                height={1024}
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-20 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our environment"
            title="Three things you will notice on a visit."
            intro="Space for busy play, space for quiet, and a door to the outdoors that stays open in all but the worst weather."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {environmentPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <article className="card-lift h-full overflow-hidden rounded-[1.6rem] bg-paper shadow-paper ring-1 ring-ink/5">
                  <img
                    src={point.image}
                    alt={point.alt}
                    width={768}
                    height={576}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-ink">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{point.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink pb-24 pt-4 text-sheet">
        <Scallop className="text-ink" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="A day at the nursery"
              title="Gentle rhythm, plenty of choice."
              intro="Illustrative timings — the nursery will confirm its real session times and routine before launch."
              tone="light"
              note="Every day is a little different!"
            />
            <Link
              href="/parent-information"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-sheet transition hover:bg-white/10"
            >
              Parent information
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ol className="relative space-y-4 lg:col-span-8">
            <span
              aria-hidden="true"
              className="absolute left-[3.6rem] top-3 bottom-3 hidden w-px bg-white/20 sm:block"
            />
            {dayTimeline.map((slot, i) => (
              <Reveal key={slot.title} delay={i * 0.05}>
                <li className="relative grid gap-3 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:grid-cols-[5rem_1fr] sm:gap-6">
                  <span className="font-display text-lg font-semibold text-sun">{slot.time}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-sheet">{slot.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-sheet/75">{slot.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative bg-paper pb-24 pt-4">
        <Scallop className="text-paper" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="More of the setting"
              title="Rooms, corners and the garden."
              intro="A few more photographs of the spaces children use every day."
            />
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-ink px-6 py-3.5 font-semibold text-sheet transition hover:bg-ink-soft"
            >
              View full gallery
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryItems.slice(1, 5).map((item, i) => (
              <Reveal key={item.src} delay={i * 0.05}>
                <Link
                  href="/gallery"
                  className="block aspect-square overflow-hidden rounded-[1.4rem] shadow-paper"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-[2rem] bg-mint-pale p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-balance">
                  The best way to judge a nursery is to walk through it.
                </h2>
                <p className="mt-2 text-body">
                  Book a visit and we will show you every room, the garden and the daily routine.
                </p>
              </div>
              <Link
                href="/book-a-visit"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-coral px-7 py-4 font-semibold text-white transition hover:bg-coral-dark"
              >
                <CalendarCheck className="h-5 w-5" />
                Book a Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
