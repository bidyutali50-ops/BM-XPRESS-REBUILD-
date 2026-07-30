"use client";

import { useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SpecularButton from "./SpecularButton";
import HeroScene from "./HeroScene";

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
            gsap.set(".hero-line, .hero-fade, .hero-pill, .hero-scene", {
              y: 0,
              opacity: 1,
              scale: 1,
            });
            return;
          }

          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-pill", { opacity: 0, y: 12, duration: 0.7 })
            .from(".hero-line", { yPercent: 108, duration: 1.05, stagger: 0.1 }, "-=0.35")
            .from(".hero-fade", { y: 18, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
            .from(
              ".hero-scene",
              { opacity: 0, scale: 0.94, duration: 1, ease: "power3.out" },
              "-=1.15"
            );
        }
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  const heroStyle = useMemo(
    () => ({
      background: `
        radial-gradient(55% 60% at 12% 18%, color-mix(in oklab, var(--color-transit) 14%, #ffffff) 0%, transparent 65%),
        radial-gradient(50% 55% at 88% 78%, color-mix(in oklab, var(--color-delivered) 12%, #ffffff) 0%, transparent 65%),
        linear-gradient(180deg, #f7f9f6 0%, var(--color-paper) 100%)
      `,
    }),
    []
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate overflow-hidden"
      style={heroStyle}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:py-24">
        <div>
          <span className="hero-pill inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <span
              className="rp-pulse size-1.5 rounded-full bg-delivered"
              aria-hidden="true"
            />
            <span className="u-data text-ink/70">
              Live network across West Bengal
            </span>
          </span>

          <h1 className="u-display mt-7 text-[clamp(2.7rem,7vw,5rem)] leading-[0.94] tracking-tight">
            <span className="u-mask block">
              <span className="hero-line block">Bengal, delivered</span>
            </span>
            <span className="u-mask block">
              <span className="hero-line block text-delivered">same day.</span>
            </span>
          </h1>

          <p className="hero-fade mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink/70">
            3,000+ orders handled every day. Hyperlocal, same-day, and next-day
            delivery on our own dispatch platform.
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
              className="rounded-full border border-ink/15 bg-white/60 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors duration-200 hover:border-ink/40 hover:bg-white"
            >
              What we deliver
            </a>
          </div>
        </div>

        <div className="hero-scene">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
