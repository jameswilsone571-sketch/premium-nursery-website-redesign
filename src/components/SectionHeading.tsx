import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  note?: string;
  align?: "left" | "center";
  tone?: "ink" | "light";
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  note,
  align = "left",
  tone = "ink",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p
        className={`eyebrow ${tone === "light" ? "text-sun" : "text-coral"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold text-balance ${
          tone === "light" ? "text-sheet" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[1.05rem] leading-relaxed ${
            tone === "light" ? "text-sheet/85" : "text-body"
          }`}
        >
          {intro}
        </p>
      )}
      {note && (
        <p
          className={`hand mt-3 text-2xl ${tone === "light" ? "text-sun" : "text-sky-deep"}`}
        >
          {note}
        </p>
      )}
    </Reveal>
  );
}
