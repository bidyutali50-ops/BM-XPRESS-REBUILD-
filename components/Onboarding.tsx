"use client";

import { useReveal } from "@/lib/useReveal";
import type { ReactNode } from "react";

/* ─── Icons: hand-drawn, per step ─── */

const PinIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14z"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="18" r="5" fill="currentColor" />
  </svg>
);

const DocIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M10 6h20l10 10v26a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M30 6v10h10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    <path
      d="M16 24h16M16 30h16M16 36h10"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M12 34v6a2 2 0 002 2h20a2 2 0 002-2v-6"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M24 8v22M15 17l9-9 9 9"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M24 4c8 4 12 12 12 20l-4 6h-16l-4-6c0-8 4-16 12-20z"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="20" r="4" fill="currentColor" />
    <path
      d="M18 34l-3 8m18-8l3 8m-12-4v6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

type Step = {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
  state: "transit" | "assigned" | "delivered";
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Send us your pincodes",
    body: "We check them against live hub coverage and tell you honestly what we can and cannot serve today.",
    icon: <PinIcon />,
    state: "transit",
  },
  {
    n: "02",
    title: "Agree the commercials",
    body: "Rate card, SLA window, COD remittance cycle, and who absorbs RTO. Written down before anything ships.",
    icon: <DocIcon />,
    state: "assigned",
  },
  {
    n: "03",
    title: "Connect or upload",
    body: "API, plugin, or a daily file. We run a handful of test orders end to end before you send real volume.",
    icon: <UploadIcon />,
    state: "transit",
  },
  {
    n: "04",
    title: "Go live on one cluster",
    body: "Start with a single pincode cluster for two weeks. Scale hub by hub once the numbers hold.",
    icon: <RocketIcon />,
    state: "delivered",
  },
];

export default function Onboarding() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section
      id="onboarding"
      ref={scope}
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p data-reveal className="u-eyebrow">
          Getting started
        </p>
        <h2
          data-reveal
          className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]"
        >
          Live in about two weeks.
        </h2>
        <p
          data-reveal
          className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/70"
        >
          Four short steps. No sales cycle, no protocol dance — the first two
          weeks are working days, not calendar days.
        </p>
      </div>

      <ol className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.n} data-reveal className="h-full">
            <article className="group relative flex h-full flex-col rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-18px_rgb(14_19_25/0.18)]">
              <div className="flex items-start justify-between">
                <span
                  className="u-data font-semibold"
                  style={{ color: `var(--color-${s.state})` }}
                >
                  {s.n}
                </span>
                <span
                  className="flex size-11 items-center justify-center rounded-[12px] p-2.5"
                  style={{
                    background: `color-mix(in oklab, var(--color-${s.state}) 14%, #ffffff)`,
                    color: `var(--color-${s.state})`,
                  }}
                >
                  {s.icon}
                </span>
              </div>

              <h3 className="u-display mt-6 text-lg leading-tight">{s.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/65">
                {s.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
