"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** The page's colour key. Names the four states the headline claims. */
const STATES = [
  { state: "queued", label: "Queued" },
  { state: "assigned", label: "Assigned" },
  { state: "transit", label: "In transit" },
  { state: "delivered", label: "Delivered" },
] as const;

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(".hero-line, .hero-fade, .hero-state", { y: 0, opacity: 1 });
            return;
          }

          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-eyebrow", { opacity: 0, duration: 0.6 })
            .from(".hero-line", { yPercent: 108, duration: 1.05, stagger: 0.09 }, "-=0.35")
            .from(".hero-fade", { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.55")
            .from(".hero-state", { opacity: 0, x: -10, duration: 0.5, stagger: 0.09 }, "-=0.45");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
      <p className="hero-eyebrow u-eyebrow">
        Murshidabad &middot; West Bengal &middot; BM Xpress Logistics Pvt Ltd
      </p>

      <h1 className="u-display mt-6 text-[clamp(2.6rem,8.5vw,5.75rem)]">
        <span className="u-mask">
          <span className="hero-line block">Every order</span>
        </span>
        <span className="u-mask">
          <span className="hero-line block">has four states.</span>
        </span>
        <span className="u-mask">
          <span className="hero-line block text-delivered">We own all four.</span>
        </span>
      </h1>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.15fr_auto] md:items-start md:gap-20">
        <div>
          <p className="hero-fade max-w-xl text-lg leading-relaxed text-ink/75">
            BM Xpress runs hyperlocal and last-mile delivery across West Bengal on our own
            dispatch platform and our own rider network. Nothing is subcontracted into a
            black box, so you can see where a shipment is at any point in its life.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a pilot route
            </a>
            <a
              href="#lifecycle"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/50"
            >
              See how a delivery runs
            </a>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-3 md:block md:space-y-3 md:border-l md:border-paper-2 md:pl-8">
          {STATES.map((s) => (
            <li key={s.state} className="hero-state flex items-center gap-2.5">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: `var(--color-${s.state})` }}
                aria-hidden="true"
              />
              <span className="u-data" style={{ color: `var(--color-${s.state})` }}>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
