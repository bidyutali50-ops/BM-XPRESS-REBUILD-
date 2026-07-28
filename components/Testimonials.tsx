"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Real quotes only. Add entries as clients give them to you, with a real
 * name, title, and company. While this array is empty the section does not
 * render at all, which is better than an empty shell or an invented quote.
 */
type Quote = {
  quote: string;
  name: string;
  title: string;
  company: string;
  photo?: string;
};

const QUOTES: Quote[] = [];

export default function Testimonials() {
  const scope = useReveal<HTMLElement>(0.09);

  if (QUOTES.length === 0) return null;

  return (
    <section id="testimonials" ref={scope} className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p data-reveal className="u-eyebrow">
        In their words
      </p>
      <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
        What our clients say.
      </h2>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            data-reveal
            className="flex flex-col rounded-card border border-paper-2 bg-white/60 p-7"
          >
            <blockquote className="text-[1.02rem] leading-relaxed text-ink/80">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3.5 border-t border-paper-2 pt-6">
              {q.photo ? (
                <img
                  src={q.photo}
                  alt={q.name}
                  className="size-11 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="u-display flex size-11 items-center justify-center rounded-full bg-ink text-sm text-paper"
                >
                  {q.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              )}
              <div>
                <p className="text-[0.92rem] font-medium">{q.name}</p>
                <p className="u-data mt-0.5 text-muted">
                  {q.title}, {q.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
