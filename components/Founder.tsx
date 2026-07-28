"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Swap PHOTO to a headshot path in /public to replace the initials mark,
 * e.g. "/founder.jpg". Left null it falls back to initials, which reads as
 * a deliberate choice rather than a missing image.
 */
const PHOTO: string | null = null;

const LINKEDIN = "https://www.linkedin.com/in/bidyut-ali-a0228a312/";

export default function Founder() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section id="founder" ref={scope} className="border-y border-paper-2 bg-white/45">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow">
          Meet our founder
        </p>

        <blockquote data-reveal className="mt-10">
          <p className="u-display text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.18]">
            &ldquo;We started in Murshidabad, not Bengaluru. Every company that wants to
            serve Bengal runs it from somewhere else, and the gap always shows up in the
            last mile.&rdquo;
          </p>
        </blockquote>

        <div data-reveal className="mt-9 max-w-2xl space-y-4 text-[0.98rem] leading-relaxed text-ink/70">
          <p>
            The pincodes nobody has walked. The addresses that do not resolve. The riders
            who leave after a month because nobody paid them properly. Those are not
            software problems, and you cannot fix them from a dashboard in another state.
          </p>
          <p>
            So we did it the slow way. We wrote our own dispatch platform, put every rider
            on our payroll, and opened hubs in the places our clients actually ship to.
            Growing this way takes longer. It is also the only way the service holds when
            volume arrives.
          </p>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-5 border-t border-paper-2 pt-8">
          {PHOTO ? (
            <img
              src={PHOTO}
              alt="Bidyut Ali"
              width={112}
              height={112}
              loading="lazy"
              className="size-14 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="u-display flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg text-paper"
            >
              BA
            </span>
          )}

          <div>
            <p className="u-display text-lg">Bidyut Ali</p>
            <p className="u-data mt-1 text-muted">
              Founder and Managing Director, BM Xpress Logistics
            </p>
          </div>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="u-data ml-auto rounded-full border border-ink/20 px-5 py-2.5 transition-colors duration-200 hover:border-ink/50"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
