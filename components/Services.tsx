"use client";

import { useReveal } from "@/lib/useReveal";

const SERVICES = [
  {
    state: "transit",
    name: "Hyperlocal same-day",
    line: "Within a city, inside the day.",
    body: "Dark store or store-to-door runs for D2C, grocery, pharmacy, and food brands. Batched by rider, routed by hub.",
    points: ["Store and dark-store pickups", "Slotted and on-demand windows", "Live status on every order"],
  },
  {
    state: "assigned",
    name: "Last-mile for 3PLs",
    line: "Your freight, our doorstep.",
    body: "We take the final leg for aggregators and 3PLs already moving volume into Bengal, from hub handover to proof of delivery.",
    points: ["Hub-in to doorstep", "Reverse pickups and RTO", "Reconciliation-ready reporting"],
  },
  {
    state: "delivered",
    name: "Dedicated fleet",
    line: "Riders who only work your route.",
    body: "A ring-fenced set of riders and vehicles on a fixed monthly commitment, managed on our platform but dedicated to your volume.",
    points: ["Fixed rider count per hub", "Branded or unbranded", "Managed attendance and payout"],
  },
] as const;

export default function Services() {
  const scope = useReveal<HTMLElement>(0.1);

  return (
    <section id="services" ref={scope} className="border-y border-paper-2 bg-white/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow">
          What you can put on the network
        </p>
        <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          Three ways to hand us the last leg.
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.name}
              data-reveal
              className="group relative flex flex-col rounded-card border border-paper-2 bg-paper p-6 transition-colors duration-300 hover:border-ink/25"
            >
              <span
                className="absolute left-6 right-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `var(--color-${s.state})` }}
                aria-hidden="true"
              />
              <h3 className="u-display text-2xl">{s.name}</h3>
              <p className="u-data mt-2" style={{ color: `var(--color-${s.state})` }}>
                {s.line}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{s.body}</p>

              <ul className="mt-6 space-y-2 border-t border-paper-2 pt-5">
                {s.points.map((p) => (
                  <li key={p} className="u-data flex items-start gap-2.5 text-ink/70">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink/30" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
