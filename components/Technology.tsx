"use client";

import { useReveal } from "@/lib/useReveal";

const SYSTEMS = [
  {
    name: "BMX Dispatch",
    body: "The control room. Orders in, riders assigned, hubs balanced, exceptions raised. Every status change is written with a timestamp and an actor.",
  },
  {
    name: "Rider Panel",
    body: "Riders punch in, run their route, and watch earnings settle into a wallet. Attendance, minimum guarantee, and per-order pay are all calculated server-side.",
  },
  {
    name: "Client API",
    body: "Push orders and pull status without logging into anything. If you would rather not integrate, the panel and scheduled reports do the same job.",
  },
];

export default function Technology() {
  const scope = useReveal<HTMLElement>(0.1);

  return (
    <section id="technology" ref={scope} className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow text-paper/45">
          Built in-house
        </p>
        <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          We wrote the software we run on.
        </h2>
        <p data-reveal className="mt-6 max-w-xl leading-relaxed text-paper/65">
          Most delivery partners this size run on spreadsheets and a WhatsApp group. Our
          dispatch, rider payout, and reporting stack is our own, which is why status is
          real time and payouts are not argued about at month end.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden rounded-card bg-ink-3 md:grid-cols-3">
          {SYSTEMS.map((s) => (
            <article key={s.name} data-reveal className="bg-ink-2 p-7">
              <h3 className="u-display text-xl">{s.name}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/60">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
