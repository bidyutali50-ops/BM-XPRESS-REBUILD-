"use client";

import { useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import SpecularButton from "./SpecularButton";

/* ─── Network background: nodes, routes, animated pulses ─── */

const NODES: [number, number][] = [
  [130, 140], [320, 100], [480, 200], [620, 120],
  [810, 180], [980, 100], [1080, 260],
  [200, 340], [400, 380], [640, 340], [830, 400], [1030, 470],
  [140, 550], [340, 620], [550, 560],
  [750, 630], [940, 620],
];

const ROUTES: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6],
  [0, 7], [2, 7], [7, 8], [8, 9], [3, 9], [9, 10], [4, 10], [10, 11], [6, 11],
  [7, 12], [8, 13], [12, 13], [13, 14], [9, 14], [14, 15], [10, 15], [15, 16], [11, 16],
];

const PULSE_COUNT = 5;

function NetworkBg() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) return;

          const pulses = gsap.utils.toArray<SVGCircleElement>(".net-pulse", svgRef.current!);

          const fire = (pulse: SVGCircleElement) => {
            const [fromI, toI] = ROUTES[Math.floor(Math.random() * ROUTES.length)];
            const [sx, sy] = NODES[fromI];
            const [ex, ey] = NODES[toI];

            gsap.set(pulse, { attr: { cx: sx, cy: sy }, opacity: 0 });
            gsap
              .timeline({ onComplete: () => fire(pulse) })
              .to(pulse, { opacity: 1, duration: 0.35, ease: "power2.out" })
              .to(
                pulse,
                {
                  attr: { cx: ex, cy: ey },
                  duration: gsap.utils.random(2.4, 3.8),
                  ease: "power1.inOut",
                },
                "<"
              )
              .to(pulse, { opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.45")
              .to({}, { duration: gsap.utils.random(0.2, 1.2) });
          };

          pulses.forEach((pulse, i) => {
            gsap.delayedCall(1.2 + i * 0.5 + Math.random() * 0.8, () => fire(pulse));
          });
        }
      );
      return () => mm.revert();
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="net-pulse-grad">
          <stop offset="0%" stopColor="#3b6fe0" stopOpacity="1" />
          <stop offset="55%" stopColor="#3b6fe0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b6fe0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Routes — faint connective tissue */}
      <g stroke="rgba(255,255,255,0.09)" strokeWidth="1">
        {ROUTES.map(([from, to], i) => (
          <line
            key={i}
            x1={NODES[from][0]}
            y1={NODES[from][1]}
            x2={NODES[to][0]}
            y2={NODES[to][1]}
          />
        ))}
      </g>

      {/* Nodes — waypoints */}
      <g>
        {NODES.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="rgba(59,111,224,0.18)" />
            <circle cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.6)" />
          </g>
        ))}
      </g>

      {/* Pulses — orders in transit */}
      <g>
        {Array.from({ length: PULSE_COUNT }, (_, i) => (
          <circle key={i} className="net-pulse" r="9" fill="url(#net-pulse-grad)" opacity="0" />
        ))}
      </g>
    </svg>
  );
}

/* ─── Hero ─── */

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
      background: `
        radial-gradient(60% 55% at 15% 20%, color-mix(in oklab, var(--color-transit) 26%, transparent) 0%, transparent 60%),
        radial-gradient(55% 55% at 85% 85%, color-mix(in oklab, var(--color-delivered) 22%, transparent) 0%, transparent 60%),
        linear-gradient(180deg, #0a0f14 0%, #0e1319 55%, #0a0f14 100%)
      `,
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
      {/* Network illustration */}
      <div className="absolute inset-0 opacity-90">
        <NetworkBg />
      </div>

      {/* Vignette — darkens edges to focus on the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 65% at 50% 45%, transparent 30%, rgba(0,0,0,0.55) 100%)",
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

        {/* Bottom rail — three service tiers as micro-signals */}
        <div className="hero-fade mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 sm:mt-20">
          {[
            { label: "Hyperlocal", detail: "Under 60 min", state: "transit" },
            { label: "Same-day", detail: "Within city", state: "assigned" },
            { label: "Next-day", detail: "Bengal-wide", state: "delivered" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span
                className="size-1.5 rounded-full"
                style={{ background: `var(--color-${t.state})` }}
                aria-hidden="true"
              />
              <span className="u-data" style={{ color: `var(--color-${t.state})` }}>
                {t.label}
              </span>
              <span className="u-data text-paper/40">{t.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
