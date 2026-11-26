import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Room } from "@/content/rooms";
import { statusLabels } from "@/content/rooms";

export default function RoomCard({ room, index = 0 }: { room: Room; index?: number }) {
  return (
    <article
      className={`card-lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] ${room.tint} border border-ink/5 shadow-paper`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        href={`/rooms/${room.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={room.image}
          alt={room.alt}
          width={640}
          height={480}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-sheet/95 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] ${room.accentText}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${room.dot}`} />
          {statusLabels[room.status]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">
            <Link href={`/rooms/${room.slug}`} className="transition group-hover:text-coral">
              {room.name}
            </Link>
          </h3>
          <span className={`hand whitespace-nowrap text-lg ${room.accentText}`}>
            {room.ageLabel}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-body/90">{room.blurb}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-body/85">
            {room.minMonths}–{room.maxMonths} months
          </span>
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-sheet px-4 py-2 text-sm font-semibold text-ink shadow-sm transition group-hover:bg-coral group-hover:text-white"
          >
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
