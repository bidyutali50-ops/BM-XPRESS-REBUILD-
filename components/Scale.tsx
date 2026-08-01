"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Founder-confirmed 2026-07-31 (session 2):
 * - 200+ pincodes served across West Bengal
 * - 35+ hub network — owned operations + partner/franchise/agent locations
 * - 24/7 — riders on the road and CS desk both round-the-clock
 */
const NUMBERS = [
  {
    big: "200+",
    label: "Pincodes served",
    sub: "Across West Bengal",
    state: "transit",
  },
  {
    big: "35+",
    label: "Hubs & partner locations",
    sub: "Owned and franchised",
    state: "assigned",
  },
  {
    big: "24/7",
    label: "Operations & support",
    sub: "Riders and CS round-the-clock",
    state: "delivered",
  },
];

export default function Scale() {
  const scope = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={scope}
      aria-labelledby="scale-heading"
      className="border-y border-paper-2 bg-white/50"
    >
      <h2 id="scale-heading" className="sr-only">
        Scale
      </h2>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 divide-y divide-paper-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {NUMBERS.map((n) => (
            <div
              key={n.label}
              data-reveal
              className="flex flex-col items-center gap-2 px-4 py-6 text-center sm:py-2"
            >
              <p
                className="u-display text-[clamp(2.2rem,4.5vw,3.2rem)] leading-none"
                style={{ color: `var(--color-${n.state})` }}
              >
                {n.big}
              </p>
              <p className="mt-1 text-sm font-medium text-ink">{n.label}</p>
              <p className="u-data text-muted">{n.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
