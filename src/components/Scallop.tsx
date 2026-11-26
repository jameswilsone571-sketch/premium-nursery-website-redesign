const SEGMENTS = 30;
const R = 24;

function buildPath() {
  let d = `M0,26`;
  for (let i = 0; i < SEGMENTS; i++) {
    d += ` a${R},${R} 0 0 1 ${R * 2},0`;
  }
  d += ` L1440,44 L0,44 Z`;
  return d;
}

const PATH = buildPath();

/**
 * Cut-paper scalloped divider.
 *
 * Absolutely positioned so it sits *above* the section it belongs to, filled
 * with that section's colour: the bumps rise into the previous "sheet" and the
 * notches reveal it, so stacked sections read as layered paper rather than flat
 * bands.
 */
export default function Scallop({
  className = "text-sheet",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-full leading-[0] ${className} ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 44"
        preserveAspectRatio="none"
        className="block h-7 w-full fill-current sm:h-10"
      >
        <path d={PATH} />
      </svg>
    </div>
  );
}
