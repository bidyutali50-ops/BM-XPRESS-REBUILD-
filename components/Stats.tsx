"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons: hand-drawn, no external assets ─── */

const BikeIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45">
      <line x1="2" y1="20" x2="10" y2="20" />
      <line x1="4" y1="26" x2="12" y2="26" />
      <line x1="2" y1="32" x2="10" y2="32" />
    </g>
    <rect x="10" y="14" width="14" height="12" rx="2" fill="currentColor" />
    <path
      d="M18 34L24 22H34L38 34"
      stroke="currentColor"
      strokeWidth="2.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="35" r="5.5" fill="currentColor" />
    <circle cx="18" cy="35" r="2" fill="white" />
    <circle cx="38" cy="35" r="5.5" fill="currentColor" />
    <circle cx="38" cy="35" r="2" fill="white" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect x="21" y="4" width="6" height="4" rx="1" fill="currentColor" />
    <circle cx="24" cy="26" r="16" fill="currentColor" fillOpacity="0.14" />
    <circle cx="24" cy="26" r="16" fill="none" stroke="currentColor" strokeWidth="2.6" />
    <path d="M24 26L24 16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M24 26L31 26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="24" cy="26" r="1.8" fill="currentColor" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect x="4" y="18" width="20" height="18" rx="2" fill="currentColor" />
    <path
      d="M24 24H32L40 32V36H24Z"
      fill="currentColor"
      fillOpacity="0.55"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path d="M27 26L31 26L35.5 30.5L27 30.5Z" fill="white" fillOpacity="0.85" />
    <circle cx="13" cy="38" r="3.5" fill="currentColor" />
    <circle cx="13" cy="38" r="1.4" fill="white" />
    <circle cx="34" cy="38" r="3.5" fill="currentColor" />
    <circle cx="34" cy="38" r="1.4" fill="white" />
  </svg>
);

type Tier = {
  icon: ReactNode;
  state: "transit" | "assigned" | "delivered";
  time: string;
  title: string;
  desc: string;
};

/**
 * TODO: confirm the hyperlocal SLA before this ships to a client.
 * "Under 60 min" is a common industry claim, defensible for short-radius
 * urban pickups; keep it consistent with the actual rate card.
 */
const TIERS: Tier[] = [
  {
    icon: <BikeIcon />,
    state: "transit",
    time: "Under 60 min",
    title: "Hyperlocal",
    desc: "Store to door within the neighbourhood, on a rider dispatched the moment the order lands.",
  },
  {
    icon: <ClockIcon />,
    state: "assigned",
    time: "Same-day",
    title: "In-city",
    desc: "Within city limits, on the day of pickup. Slotted or on-demand windows.",
  },
  {
    icon: <TruckIcon />,
    state: "delivered",
    time: "Next-day",
    title: "Bengal-wide",
    desc: "Across West Bengal, delivered the following working day.",
  },
];

export default function Stats() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const counter = scope.current?.querySelector<HTMLElement>("[data-count]");
          const cards = gsap.utils.toArray<HTMLElement>(".stat-card", scope.current!);
          const heads = gsap.utils.toArray<HTMLElement>(".stat-head", scope.current!);

          if (ctx.conditions?.reduced) {
            gsap.set([...heads, ...cards], { opacity: 1, y: 0, scale: 1, rotateX: 0 });
            if (counter) {
              const end = Number(counter.dataset.count) || 3000;
              counter.textContent = end.toLocaleString("en-IN") + "+";
            }
            return;
          }

          gsap.from(heads, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });

          gsap.from(cards, {
            y: 32,
            opacity: 0,
            scale: 0.94,
            rotateX: -8,
            duration: 0.75,
            stagger: 0.13,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".stat-grid", start: "top 82%", once: true },
          });

          if (counter) {
            const end = Number(counter.dataset.count) || 3000;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: counter, start: "top 85%", once: true },
              onUpdate: () => {
                counter.textContent =
                  Math.round(obj.v).toLocaleString("en-IN") + "+";
              },
            });
          }

          gsap.utils.toArray<HTMLElement>(".stat-icon", scope.current!).forEach((el, i) => {
            gsap.to(el, {
              y: -3,
              duration: 2 + i * 0.35,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.4 + i * 0.2,
            });
          });
        }
      );
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} className="border-y border-paper-2 bg-white/45">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="stat-head u-eyebrow">How fast we deliver</p>
        <h2 className="stat-head u-display mt-4 max-w-3xl text-[clamp(1.7rem,4vw,2.6rem)]">
          <span data-count="3000">0</span>{" "}
          <span className="text-ink/70">deliveries a day, in three tiers.</span>
        </h2>

        <div className="u-scene stat-grid mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.title}
              className="stat-card group relative flex flex-col overflow-hidden rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgb(14_19_25/0.22)] sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `var(--color-${tier.state})` }}
              />

              <div
                className="stat-icon mb-5 flex size-14 items-center justify-center rounded-[14px] p-3"
                style={{
                  background: `color-mix(in oklab, var(--color-${tier.state}) 15%, #ffffff)`,
                }}
              >
                <span style={{ color: `var(--color-${tier.state})` }}>{tier.icon}</span>
              </div>

              <p
                className="u-display text-[1.85rem] leading-none"
                style={{ color: `var(--color-${tier.state})` }}
              >
                {tier.time}
              </p>
              <p className="mt-2 text-base font-medium">{tier.title}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/65">{tier.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
