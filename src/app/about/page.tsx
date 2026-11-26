import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Heart, Lightbulb, Sprout } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";

export const metadata: Metadata = {
  title: "About Our Nursery",
  description:
    "Our approach to childcare, learning through play, children's development and the team who make our nursery a warm, welcoming place to grow.",
};

const philosophy = [
  {
    icon: Heart,
    title: "Known and understood",
    body: "Every child has a key person who learns their routines, their comforts and the things that make them light up. Parents get the same familiar face at the start and end of each day.",
    tint: "bg-peach-pale",
    color: "text-peach-deep",
  },
  {
    icon: Lightbulb,
    title: "Curiosity over worksheets",
    body: "We follow children's interests and stretch them with open questions, real resources and plenty of time to repeat, test and try again.",
    tint: "bg-sun-pale",
    color: "text-sun-deep",
  },
  {
    icon: Sprout,
    title: "Progress you can see",
    body: "Observations are collected as your child plays, then shared with you in plain language — what they did, what it means and what comes next.",
    tint: "bg-mint-pale",
    color: "text-mint-deep",
  },
];

const team = [
  {
    role: "Room leaders",
    body: "Plan the rhythm of each room, lead on planning and keep a close eye on how every child is settling and progressing.",
  },
  {
    role: "Key persons",
    body: "Your first point of contact. They settle your child, complete daily records and share updates at pick-up.",
  },
  {
    role: "Management team",
    body: "Look after the setting, safeguarding, staffing and the conversations with parents that matter most.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-16 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-peach-pale"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-coral">About us</p>
              <h1 className="mt-3 text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
                A caring team. A shared commitment to helping every child flourish.
              </h1>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
                We are a day nursery built on warm relationships, unhurried play and honest
                communication with parents. This page describes how we like to work — the nursery
                team can edit every word and swap in their own photographs.
              </p>
              <p className="hand mt-4 text-2xl text-sky-deep">Lovely to meet you!</p>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="blob-b overflow-hidden shadow-paper-lg">
                <img
                  src="/images/team.jpg"
                  alt="A nursery practitioner kneeling at eye level with a child in a bright playroom"
                  width={1024}
                  height={768}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-sheet pb-20 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our philosophy"
              title="Children learn best when they feel safe enough to try."
              intro="Settling in, big feelings, first friendships, second helpings — the everyday moments are where the real development happens. Our job is to make those moments feel easy for children and reassuring for parents."
            />
          </div>
          <div className="space-y-5 lg:col-span-7">
            {philosophy.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <article className={`flex gap-5 rounded-[1.4rem] p-6 ${item.tint}`}>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sheet shadow-sm">
                      <Icon className={`h-6 w-6 ${item.color}`} strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-shade pb-24 pt-4">
        <Scallop className="text-shade" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our approach to childcare"
            title="Learning through play, day in and day out."
            intro="A nursery day has a gentle rhythm. Children know what comes next, which makes it easier to be brave about trying something new."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="h-full overflow-hidden rounded-[1.6rem] bg-sheet shadow-paper">
                <img
                  src="/images/art.jpg"
                  alt="Craft table with tissue paper, crayons and drying children's paintings"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6 sm:p-8">
                  <h3 className="font-display text-xl font-semibold">Learning through play</h3>
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-body">
                    Play is how children make sense of the world. Blocks become a tower, a shop or a
                    bridge; water becomes a science experiment. Adults are close by to extend the
                    idea when a child is ready — and to step back when they are not.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Open-ended resources", "Child-led choice", "Adult scaffolding", "Real talk"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-semibold text-ink"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={0.06}>
                <div className="h-full overflow-hidden rounded-[1.6rem] bg-sheet shadow-paper">
                  <img
                    src="/images/reading.jpg"
                    alt="A child reading a picture book in a cosy reading corner"
                    width={768}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold">Children's development</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      We watch for the small shifts — a new word, a longer turn, a new friend — and
                      record them so you can see progress building over weeks, not just at
                      review time.
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="rounded-[1.6rem] bg-ink p-6 text-sheet">
                  <h3 className="font-display text-lg font-semibold text-sheet">Our environment</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sheet/75">
                    Calm colours, real resources and clear zones for busy play, messy play and quiet
                    time — with outdoor space available every day.
                  </p>
                  <Link
                    href="/our-nursery"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sun"
                  >
                    Tour our nursery
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-paper pb-24 pt-4">
        <Scallop className="text-paper" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                eyebrow="Staff and team"
                title="The people your child will see every day."
                intro="Detailed staff biographies, qualifications and safeguarding information will be published here once supplied by the nursery — we do not publish unverified credentials."
              />
              <ul className="mt-7 space-y-4">
                {team.map((member) => (
                  <li
                    key={member.role}
                    className="rounded-2xl border border-ink/8 bg-sheet p-5 shadow-paper"
                  >
                    <p className="font-display text-base font-semibold text-ink">{member.role}</p>
                    <p className="mt-1 text-sm leading-relaxed text-body">{member.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-body/85">
                Placeholder roles — replace with the nursery's real team structure and photographs.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-6" delay={0.08}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/room-tweenies.jpg"
                  alt="Children painting at easels in a bright activity room"
                  width={768}
                  height={576}
                  loading="lazy"
                  decoding="async"
                  className="blob-c aspect-[3/4] w-full object-cover shadow-paper"
                />
                <img
                  src="/images/entrance.jpg"
                  alt="Nursery cloakroom with low wooden pegs and cubby shelves"
                  width={768}
                  height={576}
                  loading="lazy"
                  decoding="async"
                  className="blob-a mt-8 aspect-[3/4] w-full object-cover shadow-paper"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-[2rem] bg-coral p-8 text-center text-white sm:p-12">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold text-white text-balance">
                Come and meet the team in person.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/90">
                A short visit is the best way to see whether we are the right fit for your family.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/book-a-visit"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-coral-dark transition hover:-translate-y-0.5"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book a Visit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
