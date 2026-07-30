"use client";

import { useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SpecularButton from "./SpecularButton";
import Lightfall from "./Lightfall";

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
            .from(".hero-pill", { opacity: 0, y: 14, duration: 0.7 })
            .from(".hero-line", { yPercent: 108, duration: 1.1, stagger: 0.11 }, "-=0.35")
            .from(".hero-fade", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.55");
        }
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  const heroStyle = useMemo(
    () => ({
      background: "linear-gradient(180deg, #0a0f14 0%, #0e1319 55%, #0a0f14 100%)",
    }),
    []
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate overflow-hidden text-paper"
      style={heroStyle}
    >
      {/* Lightfall — falling light streaks in the state palette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Lightfall
          colors={["#3b6fe0", "#2f9e6b", "#e8a33d"]}
          backgroundColor="#0e1319"
          speed={0.35}
          streakCount={5}
          streakWidth={1}
          streakLength={1.4}
          glow={0.85}
          density={0.6}
          twinkle={0.7}
          zoom={3}
          backgroundGlow={0.5}
          opacity={0.75}
          mouseInteraction
          mouseStrength={0.6}
          mouseRadius={0.7}
        />
      </div>

      {/* Vignette — darkens edges to focus on the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 45%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-28">
        <span className="hero-pill inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 backdrop-blur-md">
          <span className="rp-pulse size-1.5 rounded-full bg-delivered" aria-hidden="true" />
          <span className="u-data text-paper/75">Live network across West Bengal</span>
        </span>

        <h1 className="u-display mt-8 text-[clamp(2.8rem,8vw,6rem)] leading-[0.94] tracking-tight">
          <span className="u-mask block">
            <span className="hero-line block">Bengal.</span>
          </span>
          <span className="u-mask block">
            <span className="hero-line block">Delivered.</span>
          </span>
          <span className="u-mask block">
            <span className="hero-line block text-delivered">Same day.</span>
          </span>
        </h1>

        <p className="hero-fade mt-9 max-w-xl text-[1.05rem] leading-relaxed text-paper/75 sm:text-[1.15rem]">
          3,000+ orders handled every day. Hyperlocal, same-day, and next-day
          delivery on our own dispatch platform.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap items-center justify-center gap-3">
          <SpecularButton
            size="md"
            radius={999}
            tint="#0e1319"
            tintOpacity={1}
            textColor="#f2f4f1"
            lineColor="#2f9e6b"
            baseColor="#1a222c"
            intensity={1.35}
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
            className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-paper backdrop-blur transition-colors duration-200 hover:border-white/50 hover:bg-white/10"
          >
            What we deliver
          </a>
        </div>

      </div>
    </section>
  );
}
