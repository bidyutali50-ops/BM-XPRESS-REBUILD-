"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";

/**
 * Drop dashboard screenshots into /public/product named to match `shot`
 * and set `hasShot: true`. Until then the panel shows the capability list
 * instead, which is honest and still useful.
 */
const GROUPS = [
  {
    key: "plan",
    label: "Plan",
    head: "Before anything moves",
    body: "Orders arrive, get checked against live coverage, and land at the right hub with the right rider.",
    shot: "plan",
    hasShot: false,
    items: [
      "Orders in by API, panel, or file",
      "Serviceability checked before acceptance",
      "Hub routing by distance and load",
      "Rider assignment from punched-in staff",
    ],
    state: "queued",
  },
  {
    key: "run",
    label: "Run",
    head: "While it is on the road",
    body: "Pickup scanned, route running, and anything going wrong surfaced while there is still time to fix it.",
    shot: "run",
    hasShot: false,
    items: [
      "Pickup scan and handover record",
      "Live dispatch and reassignment",
      "Exceptions raised as they happen",
      "COD collected at the door",
    ],
    state: "assigned",
  },
  {
    key: "track",
    label: "Track",
    head: "So nobody has to ask",
    body: "Every status change carries a timestamp and an actor, which is what turns a dispute into a lookup.",
    shot: "track",
    hasShot: false,
    items: [
      "Status timeline per waybill",
      "Proof of delivery at close",
      "Customer notified on change",
      "Client reporting and exports",
    ],
    state: "transit",
  },
  {
    key: "scale",
    label: "Scale",
    head: "When volume arrives",
    body: "The unglamorous machinery that decides whether service quality survives growth.",
    shot: "scale",
    hasShot: false,
    items: [
      "Rider payout calculated server-side",
      "Same-day wallet settlement",
      "Month-end reconciliation from records",
      "Hub-by-hub expansion",
    ],
    state: "delivered",
  },
] as const;

export default function Capabilities() {
  const scope = useReveal<HTMLElement>(0.08);
  const [active, setActive] = useState(0);
  const g = GROUPS[active];

  return (
    <section id="platform" ref={scope} className="border-y border-paper-2 bg-white/45">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow">
          The platform
        </p>
        <h2 data-reveal className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          Everything it takes to run a delivery.
        </h2>

        <div data-reveal className="mt-10 flex flex-wrap gap-2">
          {GROUPS.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`u-data rounded-full border px-5 py-2.5 transition-colors duration-200 ${
                i === active
                  ? "border-transparent bg-ink text-paper"
                  : "border-ink/15 hover:border-ink/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          data-reveal
          className="u-tint mt-8 grid gap-8 overflow-hidden rounded-[18px] border p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
          style={{ ["--tint" as string]: `var(--color-${g.state})` }}
        >
          <div>
            <h3 className="u-display text-2xl">{g.head}</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-ink/70">{g.body}</p>

            <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6">
              {g.items.map((it) => (
                <li key={it} className="flex items-start gap-3">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full"
                    style={{ background: `var(--color-${g.state})` }}
                    aria-hidden="true"
                  />
                  <span className="text-[0.95rem] leading-relaxed text-ink/80">{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="u-glass flex min-h-[240px] items-center justify-center rounded-[14px] p-4">
            {g.hasShot ? (
              <img
                src={`/product/${g.shot}.png`}
                alt={`BMX Dispatch — ${g.label}`}
                className="w-full rounded-[10px]"
                loading="lazy"
              />
            ) : (
              <p className="u-data max-w-[22ch] text-center leading-relaxed text-muted">
                BMX Dispatch screenshot goes here
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
