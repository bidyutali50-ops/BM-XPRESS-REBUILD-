"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import HeroCards from "./HeroCards";

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
            gsap.set(".hero-line, .hero-fade, .hero-pill", { y: 0, opacity: 1 });
            return;
          }

          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-pill", { opacity: 0, y: 12, duration: 0.6 })
            .from(".hero-line", { yPercent: 108, duration: 1.05, stagger: 0.1 }, "-=0.3")
            .from(".hero-fade", { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.5");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="px-3 pt-3 sm:px-5">
      <div className="u-hero-panel mx-auto max-w-[1360px] overflow-hidden rounded-[26px] border border-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10">
            <div>
              <span className="hero-pill inline-flex items-center gap-2.5 rounded-full border border-paper-2 bg-white/70 py-1.5 pl-2.5 pr-4">
                <span className="flex gap-1" aria-hidden="true">
                  {["queued", "assigned", "transit", "delivered"].map((s) => (
                    <span
                      key={s}
                      className="size-1.5 rounded-full"
                      style={{ background: `var(--color-${s})` }}
                    />
                  ))}
                </span>
                <span className="u-data text-ink/70">
                  Five hubs live across West Bengal
                </span>
              </span>

              <h1 className="u-display mt-7 text-[clamp(2.7rem,7.2vw,5rem)]">
                <span className="u-mask">
                  <span className="hero-line block">Bengal,</span>
                </span>
                <span className="u-mask">
                  <span className="hero-line block text-delivered">delivered same day.</span>
                </span>
              </h1>

              <p className="hero-fade mt-7 max-w-lg text-lg leading-relaxed text-ink/75">
                Around 3,000 deliveries a day across five hubs, on 143 riders we employ and
                dispatch software we wrote ourselves. Nothing is subcontracted into a
                black box.
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
                  className="rounded-full border border-ink/20 bg-white/50 px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/50"
                >
                  What we deliver
                </a>
              </div>
            </div>

            <div className="hero-fade">
              <HeroCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
