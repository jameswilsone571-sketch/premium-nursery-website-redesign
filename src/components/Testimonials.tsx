"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const active = testimonials[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[19rem] rounded-[2rem] bg-sheet p-7 shadow-paper sm:min-h-[17rem] sm:p-10">
        <Quote className="absolute right-6 top-6 h-12 w-12 text-sun/60" aria-hidden="true" />
        <span className="eyebrow text-coral">{active.meta}</span>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
          >
            <p className="font-display text-[1.35rem] font-medium leading-snug text-ink sm:text-[1.6rem]">
              “{active.quote}”
            </p>
            <footer className="mt-5 flex items-center gap-3 text-sm text-body">
              <span className="h-px w-8 bg-coral" aria-hidden="true" />
              <cite className="not-italic font-semibold text-ink">{active.author}</cite>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:bottom-8 sm:right-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-coral hover:text-coral"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-coral hover:text-coral"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.author + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1} of ${count}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-coral" : "w-2.5 bg-ink/15 hover:bg-ink/30"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-body/85">
        Demonstration content — these are example quotes, not genuine customer feedback.
      </p>
    </div>
  );
}
