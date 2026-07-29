"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import RoutePanel from "./RoutePanel";
import SpecularButton from "./SpecularButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();

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
            .from(".hero-line", { yPercent: 106, duration: 1, stagger: 0.09 }, "-=0.3")
            .from(".hero-fade", { y: 16, opacity: 0, duration: 0.7, stagger: 0.09 }, "-=0.5");

          gsap.to(".hero-parallax", {
            y: -70,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="px-3 pt-3 sm:px-4">
      <div className="u-hero-panel overflow-hidden rounded-[24px] border border-ink/8">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
          <div className="hero-parallax grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <span className="hero-pill inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-3 pr-4">
                <span className="size-1.5 rounded-full bg-delivered" aria-hidden="true" />
                <span className="u-data text-ink/70">
                  Same-day and next-day across West Bengal
                </span>
              </span>

              <h1 className="u-display mt-7 text-[clamp(2.6rem,6vw,4.4rem)]">
                <span className="u-mask">
                  <span className="hero-line block">Same-day, next-day.</span>
                </span>
                <span className="u-mask">
                  <span className="hero-line block">
                    <span className="text-delivered">3,000+ times a day.</span>
                  </span>
                </span>
              </h1>

              <p className="hero-fade mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                Hyperlocal and last-mile delivery run on our own dispatch platform and our
                own riders. Nothing is subcontracted into a black box, so you can see where
                a shipment is at any point in its life.
              </p>

              <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
                <SpecularButton
                  size="md"
                  radius={999}
                  tint="#0e1319"
                  tintOpacity={1}
                  textColor="#f2f4f1"
                  lineColor="#2f9e6b"
                  baseColor="#1a222c"
                  intensity={1.25}
                  shineSize={9}
                  shineFade={32}
                  thickness={1.2}
                  proximity={280}
                  onClick={() => router.push("/quote")}
                >
                  Get a quote
                </SpecularButton>
                <a
                  href="#services"
                  className="rounded-full border border-ink/15 bg-white/50 px-7 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-ink/40"
                >
                  What we deliver
                </a>
              </div>

            </div>

            <div className="hero-fade lg:pl-4">
              <RoutePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
