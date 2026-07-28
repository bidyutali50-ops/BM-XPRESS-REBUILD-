"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Set PHOTO to a headshot path in /public (e.g. "/founder.jpg") to replace
 * the initials mark. Nothing here is attributed speech — if you want a
 * founder's note, write it yourself and it goes in below the title.
 */
const PHOTO: string | null = null;

const LINKEDIN = "https://www.linkedin.com/in/bidyut-ali-a0228a312/";

export default function Founder() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section id="founder" ref={scope} className="border-y border-paper-2 bg-white/45">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <p data-reveal className="u-eyebrow">
          Meet our founder
        </p>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
          {PHOTO ? (
            <img
              src={PHOTO}
              alt="Bidyut Ali"
              width={144}
              height={144}
              loading="lazy"
              className="size-18 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="u-display flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-xl text-paper"
            >
              BA
            </span>
          )}

          <div>
            <p className="u-display text-2xl">Bidyut Ali</p>
            <p className="u-data mt-1.5 text-muted">
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

        <p data-reveal className="mt-10 max-w-xl border-t border-paper-2 pt-8 leading-relaxed text-ink/70">
          BM Xpress is built and run from Murshidabad, West Bengal, with hubs across the
          state and a rider network on our own payroll.
        </p>
      </div>
    </section>
  );
}
