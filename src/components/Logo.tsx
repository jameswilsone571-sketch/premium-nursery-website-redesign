import Link from "next/link";

export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 2.6c2 0 3.6 1.6 3.6 3.6v2.2h-7.2V6.2c0-2 1.6-3.6 3.6-3.6Z"
        fill="#E0A22E"
      />
      <rect x="7.5" y="9.6" width="25" height="25.4" rx="10.5" fill="#CE5340" />
      <path
        d="M20 14.4l2.2 4.5 5 .7-3.6 3.5.85 5-4.45-2.35L15.55 28.1l.85-5-3.6-3.5 5-.7Z"
        fill="#FCD96B"
      />
      <path
        d="M11 30.5c2.6 2.4 5.7 3.6 9 3.6s6.4-1.2 9-3.6"
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 rounded-2xl px-1 py-1"
      aria-label="Little Lanterns Day Nursery — home"
    >
      <Mark className={compact ? "h-9 w-9" : "h-11 w-11"} />
      <span className="leading-none">
        <span className="block font-display text-[1.1rem] font-semibold tracking-tight text-ink sm:text-[1.25rem] lg:text-[1.15rem] xl:text-[1.3rem]">
          Little Lanterns
        </span>
        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-body/85">
          Day Nursery
        </span>
      </span>
    </Link>
  );
}
