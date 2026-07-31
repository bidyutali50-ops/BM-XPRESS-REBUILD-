"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons: hand-drawn, no external assets ─── */

const ClockIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <circle cx="24" cy="26" r="16" fill="currentColor" fillOpacity="0.14" />
    <circle
      cx="24"
      cy="26"
      r="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
    />
    <rect x="21" y="6" width="6" height="4" rx="1" fill="currentColor" />
    <path
      d="M24 26V16"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M24 26L31 26"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="24" cy="26" r="1.8" fill="currentColor" />
  </svg>
);

const NetworkAirIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    {/* Plane silhouette */}
    <path
      d="M6 22L38 10L40 14L26 22L28 34L24 34L20 24L10 26Z"
      fill="currentColor"
    />
    {/* Ground network nodes below */}
    <line
      x1="8"
      y1="40"
      x2="40"
      y2="40"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.35"
    />
    <circle cx="10" cy="40" r="2.4" fill="currentColor" />
    <circle cx="24" cy="40" r="2.4" fill="currentColor" />
    <circle cx="38" cy="40" r="2.4" fill="currentColor" />
    {/* Dashed trail from plane to network */}
    <path
      d="M22 26L22 36"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeDasharray="2 2"
      opacity="0.55"
    />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M24 4L8 10V24C8 32 14 40 24 44C34 40 40 32 40 24V10L24 4Z"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
    <path
      d="M16 24L22 30L32 18"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const RadarIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <circle
      cx="24"
      cy="24"
      r="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      opacity="0.28"
    />
    <circle
      cx="24"
      cy="24"
      r="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      opacity="0.5"
    />
    <circle
      cx="24"
      cy="24"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      opacity="0.75"
    />
    <path
      d="M24 24L38 10"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <circle cx="38" cy="10" r="2.4" fill="currentColor" />
  </svg>
);

type Card = {
  icon: ReactNode;
  state: "transit" | "assigned" | "delivered";
  big?: string;
  bigCount?: number;
  title: string;
  body: string;
};

/**
 * Founder-confirmed 2026-07-31:
 * - On-time rate: measured above 90% across all shipments — display as "90%+"
 * - Under 60 min: real hyperlocal SLA committed to clients
 * - Ground and air: real capability, air handled in partnership with
 *   Blue Dart Aviation
 */
const CARDS: Card[] = [
  {
    icon: <ClockIcon />,
    state: "transit",
    title: "Real-time ETA",
    body: "Every order carries a live estimated arrival time from acceptance through the doorstep. Your customer knows when it is coming.",
  },
  {
    icon: <NetworkAirIcon />,
    state: "assigned",
    title: "Ground and air",
    body: "Bengal-wide ground network for last-mile delivery, with air freight for time-critical or long-haul dispatch — in partnership with Blue Dart Aviation.",
  },
  {
    icon: <ShieldCheckIcon />,
    state: "delivered",
    big: "90%+",
    bigCount: 90,
    title: "On-time delivery",
    body: "Above 90% across all shipments. Late deliveries follow the SLA credit cycle in your contract.",
  },
  {
    icon: <RadarIcon />,
    state: "transit",
    title: "Live tracking, live support",
    body: "Real-time shipment tracking with a customer-support desk on call for exceptions and escalations.",
  },
];

export default function Commitment() {
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
          const cards = gsap.utils.toArray<HTMLElement>(".cmt-card", scope.current!);
          const heads = gsap.utils.toArray<HTMLElement>(".cmt-head", scope.current!);

          if (ctx.conditions?.reduced) {
            gsap.set([...heads, ...cards], { opacity: 1, y: 0, scale: 1, rotateX: 0 });
            if (counter) {
              counter.textContent =
                (Number(counter.dataset.count) || 90).toString() + "%+";
            }
            return;
          }

          gsap.from(heads, {
            y: 24,
            opacity: 0,
            duration: 0.75,
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
            stagger: 0.11,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".cmt-grid", start: "top 84%", once: true },
          });

          if (counter) {
            const end = Number(counter.dataset.count) || 90;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.6,
              ease: "power2.out",
              scrollTrigger: { trigger: counter, start: "top 85%", once: true },
              onUpdate: () => {
                counter.textContent = Math.round(obj.v).toString() + "%";
              },
              onComplete: () => {
                counter.textContent = end.toString() + "%+";
              },
            });
          }

          gsap.utils
            .toArray<HTMLElement>(".cmt-icon", scope.current!)
            .forEach((el, i) => {
              gsap.to(el, {
                y: -3,
                duration: 2 + i * 0.4,
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
    <section id="commitment" ref={scope} className="u-defer relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(50% 55% at 10% 20%, color-mix(in oklab, var(--color-delivered) 10%, #ffffff) 0%, transparent 65%),
            radial-gradient(50% 50% at 92% 78%, color-mix(in oklab, var(--color-transit) 10%, #ffffff) 0%, transparent 65%)
          `,
        }}
      />

      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <p className="cmt-head u-eyebrow">The commitment</p>
        <h2 className="cmt-head u-display mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
          Delivered when we said we&rsquo;d deliver.
        </h2>
        <p className="cmt-head mt-5 max-w-xl leading-relaxed text-ink/65">
          Four things a prospect asks about on the first call. Here is the honest
          answer to each.
        </p>

        <div className="u-scene cmt-grid mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="cmt-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgb(14_19_25/0.22)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: `var(--color-${card.state})` }}
              />

              <div
                className="cmt-icon mb-5 flex size-12 items-center justify-center rounded-[14px] p-3"
                style={{
                  background: `color-mix(in oklab, var(--color-${card.state}) 15%, #ffffff)`,
                }}
              >
                <span style={{ color: `var(--color-${card.state})` }}>{card.icon}</span>
              </div>

              {card.big && (
                <p
                  className="u-display text-[2.1rem] leading-none"
                  style={{ color: `var(--color-${card.state})` }}
                >
                  <span data-count={card.bigCount}>0%</span>
                </p>
              )}

              <p
                className={`text-base font-medium ${card.big ? "mt-1.5" : ""}`}
              >
                {card.title}
              </p>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink/65">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
