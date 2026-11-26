"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { galleryCategories, type GalleryCategory } from "@/content/site";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  categories: GalleryCategory[];
  span?: "tall" | "wide" | "normal";
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.categories.includes(active))),
    [active, items],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, filtered.length]);

  const current = index === null ? null : filtered[index];

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((category) => {
          const isActive = category === active;
          const count =
            category === "All"
              ? items.length
              : items.filter((i) => i.categories.includes(category)).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActive(category);
                setIndex(null);
              }}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-coral text-white shadow-[0_14px_26px_-18px_rgba(206,83,64,1)]"
                  : "border border-ink/12 bg-sheet text-ink hover:border-ink/30"
              }`}
            >
              {category}
              <span className={`ml-2 text-xs ${isActive ? "text-white/90" : "text-body/85"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-body/85" role="status">
        Showing {filtered.length} photograph{filtered.length === 1 ? "" : "s"}
        {active === "All" ? "" : ` in ${active}`}.
      </p>

      <motion.div
        layout={!reduce}
        className="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.button
              key={item.src + item.caption}
              type="button"
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-shade text-left shadow-paper break-inside-avoid"
              aria-label={`Open image: ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={768}
                height={512}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
                  item.span === "tall"
                    ? "aspect-[3/4]"
                    : item.span === "wide"
                      ? "aspect-[4/3]"
                      : "aspect-[4/3]"
                }`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block font-display text-base font-semibold text-white">
                  {item.caption}
                </span>
                <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/90">
                  {item.categories.join(" · ")}
                </span>
              </span>
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sheet/90 text-ink opacity-0 transition group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl bg-sheet p-8 text-center text-body shadow-paper">
          No photographs have been added to this category yet.
        </p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            onClick={() => setIndex(null)}
          >
            <motion.figure
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                width={1536}
                height={1024}
                decoding="async"
                className="max-h-[72vh] w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sheet">
                <div>
                  <p className="font-display text-lg font-semibold">{current.caption}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-sheet/60">
                    {current.categories.join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
                    }
                    aria-label="Previous image"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="min-w-16 text-center text-sm text-sheet/75">
                    {(index ?? 0) + 1} / {filtered.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i === null ? i : (i + 1) % filtered.length))}
                    aria-label="Next image"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </figcaption>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Close image viewer"
                className="absolute -top-3 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-lg transition hover:bg-sun sm:-top-14 sm:right-0"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
