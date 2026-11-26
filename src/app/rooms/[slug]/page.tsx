import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarCheck, MapPin, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Scallop from "@/components/Scallop";
import { getRoom, rooms, statusLabels } from "@/content/rooms";
import { describeBand } from "@/lib/age";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room not found" };
  return {
    title: `${room.name} (${room.ageLabel})`,
    description: `${room.blurb} Learn about the activities, development focus and facilities in our ${room.name}.`,
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const index = rooms.findIndex((r) => r.slug === room.slug);
  const next = rooms[(index + 1) % rooms.length];
  const prev = rooms[(index - 1 + rooms.length) % rooms.length];

  const blocks = [
    { title: "Learning activities", items: room.activities },
    { title: "Development objectives", items: room.development },
    { title: "Facilities and environment", items: room.facilities },
  ];

  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-14 pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-body/85">
              <Link href="/" className="transition hover:text-ink">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/rooms" className="transition hover:text-ink">Our rooms</Link>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-ink">{room.name}</span>
            </nav>

            <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${room.tint} ${room.accentText}`}
                  >
                    {room.ageLabel} · {room.minMonths}–{room.maxMonths} months
                  </span>
                  <span className="rounded-full border border-ink/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-body/85">
                    {statusLabels[room.status]}
                  </span>
                </div>
                <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold text-balance">
                  {room.name}
                </h1>
                <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-body">
                  {room.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/book-a-visit?room=${room.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 font-semibold text-white transition hover:bg-coral-dark"
                  >
                    <CalendarCheck className="h-5 w-5" />
                    Enquire about this room
                  </Link>
                  <Link
                    href="/rooms"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-semibold text-ink transition hover:border-ink/35"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    All rooms
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="blob-a overflow-hidden shadow-paper-lg">
                  <img
                    src={room.image}
                    alt={room.alt}
                    width={1024}
                    height={768}
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-20 pt-4">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {blocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 0.06}>
                <div className="h-full rounded-[1.6rem] bg-paper p-6 ring-1 ring-ink/5">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${room.tint} ${room.accentText}`}
                  >
                    {i === 0 ? (
                      <Sparkles className="h-5 w-5" strokeWidth={1.9} />
                    ) : i === 1 ? (
                      <MapPin className="h-5 w-5" strokeWidth={1.9} />
                    ) : (
                      <Sparkles className="h-5 w-5" strokeWidth={1.9} />
                    )}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold">{block.title}</h2>
                  <ul className="mt-3 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-body">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${room.dot}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 grid gap-6 rounded-[1.6rem] bg-paper p-7 ring-1 ring-ink/5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="eyebrow text-coral">Age eligibility</p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  The booking form recommends this room when a child's completed age in months is{" "}
                  <strong className="text-ink">{describeBand(room)}</strong>.
                </p>
              </div>
              <div>
                <p className="eyebrow text-coral">Boundary rule</p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  A child moves up on the lower bound of the next room's range, so ranges never
                  overlap and boundary birthdays are handled exactly.
                </p>
              </div>
              <div>
                <p className="eyebrow text-coral">Editable record</p>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Name, age range, description and availability are all editable — this is
                  placeholder content pending the nursery's confirmation.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-shade pb-24 pt-4">
        <Scallop className="text-shade" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/rooms/${prev.slug}`}
              className="card-lift group rounded-[1.4rem] bg-sheet p-6 shadow-paper"
            >
              <span className="eyebrow text-body/85">Previous room</span>
              <p className="mt-2 flex items-center gap-2 font-display text-xl font-semibold text-ink">
                <ArrowLeft className="h-5 w-5 text-coral transition group-hover:-translate-x-1" />
                {prev.name}
              </p>
            </Link>
            <Link
              href={`/rooms/${next.slug}`}
              className="card-lift group rounded-[1.4rem] bg-sheet p-6 text-right shadow-paper"
            >
              <span className="eyebrow text-body/85">Next room</span>
              <p className="mt-2 flex items-center justify-end gap-2 font-display text-xl font-semibold text-ink">
                {next.name}
                <ArrowRight className="h-5 w-5 text-coral transition group-hover:translate-x-1" />
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
