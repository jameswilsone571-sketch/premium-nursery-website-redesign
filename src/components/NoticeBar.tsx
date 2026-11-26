"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "ll-prototype-notice-dismissed";

/** Slim, dismissible prototype disclosure so placeholder content is never mistaken for live data. */
export default function NoticeBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-50 bg-ink text-sheet">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2 text-[0.78rem] leading-snug sm:items-center sm:px-6 lg:px-8">
        <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-sun px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink sm:mt-0">
          Prototype
        </span>
        <p className="flex-1 text-sheet/85">
          Preview build — brand name, contact details, room age bands, fees and testimonials are
          editable placeholders, not confirmed nursery information.
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              window.localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
          className="-mr-1 rounded-full p-1 text-sheet/70 transition hover:bg-white/10 hover:text-sheet"
          aria-label="Dismiss prototype notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
