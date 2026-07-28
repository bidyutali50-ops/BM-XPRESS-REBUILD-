"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import DispatchTicker from "./DispatchTicker";

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
            gsap.set(".hero-line, .hero-fade", { y: 0, opacity: 1 });
            return;
          }

          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-eyebrow", { opacity: 0, duration: 0.6 })
            .from(
              ".hero-line",
              { yPercent: 108, duration: 1.05, stagger: 0.09 },
              "-=0.35"
            )
            .from(".hero-fade", { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.55");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <p className="hero-eyebrow u-eyebrow">
        Murshidabad &middot; West Bengal &middot; Est. BM Xpress Logistics Pvt Ltd
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

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="hero-fade max-w-xl text-lg leading-relaxed text-ink/75">
            BM Xpress runs hyperlocal and last-mile delivery across West Bengal on our own
            dispatch platform and our own rider network. Nothing is subcontracted into a
            black box, so you can see where a shipment is at any point in its life.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
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

        <div className="hero-fade">
          <DispatchTicker />
        </div>
      </div>
    </section>
  );
}
