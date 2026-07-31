"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

/* ─── Icons: hand-drawn, one per capability ─── */

const WarehouseIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M6 20L24 8l18 12"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M10 20v20h28V20"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <rect x="20" y="28" width="8" height="12" fill="currentColor" />
    <rect
      x="13"
      y="24"
      width="6"
      height="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect
      x="29"
      y="24"
      width="6"
      height="5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M8 16L24 8l16 8v20L24 44 8 36z"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M8 16l16 8 16-8M24 24v20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M16 12l16 8"
      stroke="currentColor"
      strokeWidth="1.6"
      opacity="0.5"
    />
  </svg>
);

const InventoryIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect
      x="6"
      y="6"
      width="15"
      height="15"
      rx="2"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    <rect
      x="27"
      y="6"
      width="15"
      height="15"
      rx="2"
      fill="currentColor"
    />
    <rect
      x="6"
      y="27"
      width="15"
      height="15"
      rx="2"
      fill="currentColor"
    />
    <rect
      x="27"
      y="27"
      width="15"
      height="15"
      rx="2"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.2"
    />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect
      x="8"
      y="26"
      width="32"
      height="18"
      rx="2"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.4"
    />
    <path
      d="M14 22a10 10 0 0120 0"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 18l4 4-4 4"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

type Feature = {
  icon: ReactNode;
  state: "transit" | "assigned" | "delivered";
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: <WarehouseIcon />,
    state: "assigned",
    title: "Storage in our hubs",
    body: "Hold stock close to the customer instead of shipping it across the state on every order. Ambient storage today; ask about temperature-controlled.",
  },
  {
    icon: <PackageIcon />,
    state: "transit",
    title: "Inward, pick, and pack",
    body: "We receive your stock against a purchase order, check it in, then pick and pack each order to your packaging spec.",
  },
  {
    icon: <InventoryIcon />,
    state: "transit",
    title: "Inventory you can see",
    body: "Stock levels update as orders move, so what your storefront shows is what is actually on the shelf.",
  },
  {
    icon: <ReturnIcon />,
    state: "delivered",
    title: "Returns back into stock",
    body: "RTO and customer returns come back to the hub, get checked, and go back into sellable stock rather than sitting in a corner.",
  },
];

export default function Fulfilment() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section
      id="fulfilment"
      ref={scope}
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div>
          <p data-reveal className="u-eyebrow">
            Fulfilment
          </p>
          <h2
            data-reveal
            className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]"
          >
            Keep the stock nearer the door.
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-md leading-relaxed text-ink/70"
          >
            Same-day only works if the box starts close to the customer. Store
            with us and the order is picked, packed, and out on a rider from the
            same hub — instead of spending its first day in transit.
          </p>
          <a
            href="/quote?topic=storage"
            data-reveal
            className="u-data mt-8 inline-flex items-center gap-2 text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Ask about storage
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              data-reveal
              className="group relative flex h-full flex-col rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_44px_-18px_rgb(14_19_25/0.18)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `var(--color-${f.state})` }}
              />

              <div
                className="flex size-12 items-center justify-center rounded-[14px] p-3"
                style={{
                  background: `color-mix(in oklab, var(--color-${f.state}) 14%, #ffffff)`,
                  color: `var(--color-${f.state})`,
                }}
              >
                {f.icon}
              </div>

              <h3 className="u-display mt-5 text-lg leading-tight">{f.title}</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/65">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
