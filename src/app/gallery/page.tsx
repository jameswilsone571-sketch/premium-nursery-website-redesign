import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Scallop from "@/components/Scallop";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryItems } from "@/content/site";

export const metadata: Metadata = {
  title: "Nursery Gallery",
  description:
    "Browse photographs of our nursery rooms, indoor activities, outdoor play, learning and creativity, events and special activities.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-paper pb-14 pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 top-8 h-56 w-56 rounded-full bg-sun/45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-sky-pale"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-coral">Image gallery</p>
            <h1 className="mt-3 max-w-3xl text-[clamp(2.3rem,5vw,3.8rem)] font-semibold text-balance">
              Photographs from around the nursery.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-body">
              Filter by category, then click any photograph to open it full size. All images are
              replaceable through the content management system, and no identifiable children's
              photographs are published without the client's permission.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-sheet pb-24 pt-6">
        <Scallop className="text-sheet" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Photo library"
            title="Explore by category."
            intro="Categories, captions and alt text are editable so the gallery stays useful for parents and for local search."
          />
          <div className="mt-8">
            <GalleryGrid items={galleryItems} />
          </div>

          <Reveal delay={0.08}>
            <div className="mt-14 rounded-[2rem] bg-shade p-8 text-center">
              <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-balance">
                Want to see it in real life?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-body">
                Photographs never quite capture the noise, the laughter and the welcome. Book a
                visit and walk through the rooms yourself.
              </p>
              <a
                href="/book-a-visit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 font-semibold text-white transition hover:bg-coral-dark"
              >
                Book a Visit
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
