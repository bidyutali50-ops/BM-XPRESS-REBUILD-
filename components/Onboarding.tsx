"use client";

import { useReveal } from "@/lib/useReveal";

/** A real sequence, so numbering carries information here. */
const STEPS = [
  {
    n: "01",
    head: "Send us your pincodes",
    body: "We check them against live hub coverage and tell you honestly what we can and cannot serve today.",
  },
  {
    n: "02",
    head: "Agree the commercials",
    body: "Rate card, SLA window, COD remittance cycle, and who absorbs RTO. Written down before anything ships.",
  },
  {
    n: "03",
    head: "Connect or upload",
    body: "API, plugin, or a daily file. We run a handful of test orders end to end before you send real volume.",
  },
  {
    n: "04",
    head: "Go live on one cluster",
    body: "Start with a single pincode cluster for two weeks. Scale hub by hub once the numbers hold.",
  },
];

export default function Onboarding() {
  const scope = useReveal<HTMLElement>(0.1);

  return (
    <section id="onboarding" ref={scope} className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p data-reveal className="u-eyebrow">
        Getting started
      </p>
      <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
        Live in about two weeks.
      </h2>

      <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        {STEPS.map((s) => (
          <li key={s.n} data-reveal className="border-t border-ink/15 pt-5">
            <p className="u-data text-transit">{s.n}</p>
            <h3 className="u-display mt-3 text-lg">{s.head}</h3>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/65">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
