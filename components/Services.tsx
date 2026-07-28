"use client";

import { useTilt } from "@/lib/useTilt";

const SERVICES = [
  {
    state: "transit",
    name: "Hyperlocal same-day",
    line: "Within a city, inside the day",
    body: "Store and dark-store runs for D2C, grocery, pharmacy, and food. Batched by rider, routed by hub, delivered in hours.",
  },
  {
    state: "assigned",
    name: "Last-mile for 3PLs",
    line: "Your freight, our doorstep",
    body: "The final leg for aggregators and 3PLs already moving volume into Bengal. Hub handover to proof of delivery.",
  },
  {
    state: "delivered",
    name: "Dedicated fleet",
    line: "Riders who only work your route",
    body: "Ring-fenced riders and vehicles on a fixed monthly commitment. Branded or unbranded, managed end to end.",
  },
  {
    state: "queued",
    name: "Reverse and RTO",
    line: "Returns are not an afterthought",
    body: "Customer pickups, failed-delivery returns, and RTO back to your warehouse, tracked on the same waybill.",
  },
  {
    state: "assigned",
    name: "Cash on delivery",
    line: "Collected, reconciled, remitted",
    body: "COD collected at the door and reconciled against your order file, with a remittance cycle you agree up front.",
  },
  {
    state: "transit",
    name: "Dark store fulfilment",
    line: "Pick, pack, and ship from local stock",
    body: "Hold inventory in our hubs and we pick, pack, and deliver locally. Useful when the warehouse is too far to hit same-day.",
  },
] as const;

export default function Services() {
  const scope = useTilt<HTMLElement>(6);

  return (
    <section id="services" ref={scope} className="border-y border-paper-2 bg-white/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="u-eyebrow">What you can put on the network</p>
        <h2 className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          Six ways to hand us the last leg.
        </h2>

        <div className="u-scene mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.name}
              data-tilt
              className="u-card3d group relative flex flex-col rounded-card border border-paper-2 bg-paper p-6 transition-colors duration-300 hover:border-ink/25"
            >
              <span
                className="absolute left-6 right-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `var(--color-${s.state})` }}
                aria-hidden="true"
              />
              <div data-lift>
                <h3 className="u-display text-xl">{s.name}</h3>
                <p className="u-data mt-2" style={{ color: `var(--color-${s.state})` }}>
                  {s.line}
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
