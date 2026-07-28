"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import HubLine from "./HubLine";

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
            .from(".hero-line", { yPercent: 108, duration: 1.05, stagger: 0.1 }, "-=0.35")
            .from(".hero-fade", { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.5");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="hero-eyebrow u-eyebrow">
            Hyperlocal and last-mile delivery &middot; West Bengal
          </p>

          <h1 className="u-display mt-6 text-[clamp(2.7rem,7.5vw,5.25rem)]">
            <span className="u-mask">
              <span className="hero-line block">Bengal,</span>
            </span>
            <span className="u-mask">
              <span className="hero-line block text-delivered">delivered same day.</span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
            Five hubs, 143 riders on our own payroll, and dispatch software we wrote
            ourselves. Nothing is subcontracted into a black box, so you can see where a
            shipment is at any point in its life.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a pilot route
            </a>
            <a
              href="#services"
              className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/50"
            >
              What we deliver
            </a>
          </div>
        </div>

        <div className="hero-fade">
          <HubLine />
        </div>
      </div>
    </section>
  );
}
