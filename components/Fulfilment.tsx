"use client";

import { useReveal } from "@/lib/useReveal";

const CAPABILITIES = [
  {
    head: "Storage in our hubs",
    body: "Hold stock close to the customer instead of shipping it across the state on every order. Ambient storage today; ask about temperature-controlled.",
  },
  {
    head: "Inward, pick, and pack",
    body: "We receive your stock against a purchase order, check it in, then pick and pack each order to your packaging spec.",
  },
  {
    head: "Inventory you can see",
    body: "Stock levels update as orders move, so what your storefront shows is what is actually on the shelf.",
  },
  {
    head: "Returns back into stock",
    body: "RTO and customer returns come back to the hub, get checked, and go back into sellable stock rather than sitting in a corner.",
  },
];

export default function Fulfilment() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section id="fulfilment" ref={scope} className="u-defer mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p data-reveal className="u-eyebrow">
            Fulfilment
          </p>
          <h2 data-reveal className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]">
            Keep the stock nearer the door.
          </h2>
          <p data-reveal className="mt-6 max-w-md leading-relaxed text-ink/70">
            Same-day only works if the box starts close to the customer. Store with us and
            the order is picked, packed, and out on a rider from the same hub, instead of
            spending its first day in transit.
          </p>
          <a
            data-reveal
            href="/quote"
            className="u-data mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-1 transition-colors hover:border-ink"
          >
            Ask about storage <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="grid gap-px overflow-hidden rounded-card bg-paper-2 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <article key={c.head} data-reveal className="bg-paper p-6">
              <h3 className="u-display text-lg">{c.head}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink/65">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
