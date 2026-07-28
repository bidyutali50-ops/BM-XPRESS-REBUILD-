"use client";

import { useReveal } from "@/lib/useReveal";

const POINTS = [
  {
    head: "Accountability stops here",
    body: "Dispatch, riders, and the software are all ours. When a delivery fails you get a reason from the people who can fix it, not a vendor pointing at another vendor.",
  },
  {
    head: "Disputes end with a record",
    body: "Every status change carries a timestamp and the person who made it. Month-end reconciliation is a query against our data, not an argument over screenshots.",
  },
  {
    head: "Riders who are paid right, stay",
    body: "Attendance, minimum guarantee, and per-order pay settle the same day, calculated server-side. Retention is unglamorous, and it is the reason service quality holds.",
  },
];

export default function Technology() {
  const scope = useReveal<HTMLElement>(0.1);

  return (
    <section id="technology" ref={scope} className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow text-paper/45">
          Why we build our own
        </p>
        <h2 data-reveal className="u-display mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          There is nobody else to blame.
        </h2>
        <p data-reveal className="mt-6 max-w-xl leading-relaxed text-paper/65">
          Most delivery partners our size run on spreadsheets and a WhatsApp group, and
          subcontract the hard parts. We wrote our own stack instead. That is a commercial
          decision before it is a technical one.
        </p>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {POINTS.map((p) => (
            <article key={p.head} data-reveal className="u-glass-dark rounded-card p-7">
              <h3 className="u-display text-xl">{p.head}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/60">{p.body}</p>
            </article>
          ))}
        </div>

        <p data-reveal className="u-data mt-8 text-paper/40">
          Running on BMX Dispatch, the Rider Panel, and a client API &mdash; built and
          maintained in-house.
        </p>
      </div>
    </section>
  );
}
