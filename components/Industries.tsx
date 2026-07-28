"use client";

import { useReveal } from "@/lib/useReveal";

const INDUSTRIES = [
  { name: "D2C brands", note: "Same-day in the city your customers actually live in." },
  { name: "Grocery and q-commerce", note: "Dark-store dispatch with batching and slot windows." },
  { name: "Pharmacy", note: "Time-bound runs with handover proof at the door." },
  { name: "Food and bakery", note: "Short-radius, temperature-sensitive, no waiting." },
  { name: "Fashion and apparel", note: "High return volume, so reverse pickup is built in." },
  { name: "Electronics", note: "Higher value per box, so scan and proof at every hop." },
];

export default function Industries() {
  const scope = useReveal<HTMLElement>(0.06);

  return (
    <section id="industries" ref={scope} className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p data-reveal className="u-eyebrow">
        Who we move for
      </p>
      <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
        Different boxes, different rules.
      </h2>

      <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((i) => (
          <div key={i.name} data-reveal className="border-t border-paper-2 pt-5">
            <h3 className="u-display text-lg">{i.name}</h3>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/65">{i.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
