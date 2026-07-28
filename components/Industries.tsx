"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons (all drawn in-house — simple geometric marks) ─── */

const StoreIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <path d="M8 20v20h32V20" />
    <path d="M6 20l4-12h28l4 12z" fill="currentColor" fillOpacity="0.15" />
    <path d="M6 20l4-12h28l4 12" />
    <path d="M20 40V28h8v12" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const BasketIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <path d="M8 18h32l-3 22H11z" fill="currentColor" fillOpacity="0.15" />
    <path d="M8 18h32l-3 22H11z" />
    <path d="M17 18l5-10 M31 18l-5-10" />
    <path d="M18 26v6 M24 26v6 M30 26v6" />
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <rect x="14" y="16" width="20" height="26" rx="3" fill="currentColor" fillOpacity="0.15" />
    <rect x="14" y="16" width="20" height="26" rx="3" />
    <path d="M12 10h24" />
    <path d="M24 24v10 M19 29h10" />
  </svg>
);

const FoodIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <path d="M8 22a16 16 0 0132 0" fill="currentColor" fillOpacity="0.15" />
    <path d="M8 22a16 16 0 0132 0" />
    <path d="M6 28h36" />
    <path d="M10 34a4 4 0 004-4h20a4 4 0 004 4" fill="currentColor" fillOpacity="0.15" />
    <path d="M10 34a4 4 0 004-4h20a4 4 0 004 4" />
  </svg>
);

const ShirtIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <path d="M18 8l6 6 6-6 10 6-4 8-6-2v22H14V20l-6 2-4-8z" fill="currentColor" fillOpacity="0.15" />
    <path d="M18 8l6 6 6-6 10 6-4 8-6-2v22H14V20l-6 2-4-8z" />
  </svg>
);

const ChipIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full">
    <rect x="12" y="12" width="24" height="24" rx="3" fill="currentColor" fillOpacity="0.15" />
    <rect x="12" y="12" width="24" height="24" rx="3" />
    <rect x="18" y="18" width="12" height="12" />
    <path d="M18 6v6 M30 6v6 M18 36v6 M30 36v6 M6 18h6 M6 30h6 M36 18h6 M36 30h6" />
  </svg>
);

const INDUSTRIES: { name: string; state: string; icon: ReactNode }[] = [
  { name: "D2C brands", state: "transit", icon: <StoreIcon /> },
  { name: "Grocery", state: "delivered", icon: <BasketIcon /> },
  { name: "Pharmacy", state: "assigned", icon: <PillIcon /> },
  { name: "Food & bakery", state: "transit", icon: <FoodIcon /> },
  { name: "Fashion", state: "delivered", icon: <ShirtIcon /> },
  { name: "Electronics", state: "assigned", icon: <ChipIcon /> },
];

export default function Industries() {
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
          if (ctx.conditions?.reduced) {
            gsap.set(".ind-head, .ind-tile", { opacity: 1, y: 0 });
            return;
          }

          gsap.from(".ind-head", {
            y: 26,
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });

          gsap.from(".ind-tile", {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.7,
            stagger: 0.09,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".ind-grid", start: "top 82%", once: true },
          });

          // gentle floating loop, offset per tile so they never sync
          gsap.utils.toArray<HTMLElement>(".ind-tile", scope.current!).forEach((tile, i) => {
            gsap.to(tile, {
              y: i % 2 === 0 ? -6 : 6,
              duration: 3 + (i % 3) * 0.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.4 + i * 0.15,
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section id="industries" ref={scope} className="u-defer relative overflow-hidden">
      {/* Mesh gradient panel — deep blue base with cool accents, in the site's own palette */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 55% at 18% 26%, color-mix(in oklab, var(--color-transit) 55%, transparent) 0%, transparent 60%),
            radial-gradient(55% 50% at 82% 34%, color-mix(in oklab, var(--color-delivered) 40%, transparent) 0%, transparent 60%),
            radial-gradient(70% 55% at 50% 108%, color-mix(in oklab, var(--color-assigned) 30%, transparent) 0%, transparent 60%),
            linear-gradient(180deg, #101826 0%, #0e1319 100%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="ind-head u-eyebrow text-paper/55">Who we move for</p>
        <h2 className="ind-head u-display u-display-xl mx-auto mt-5 max-w-3xl text-[clamp(2rem,5.4vw,3.6rem)] text-paper">
          Built for every delivery-driven business.
        </h2>

        <div className="ind-grid mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
          {INDUSTRIES.map((i) => (
            <div key={i.name} className="ind-tile flex flex-col items-center gap-4">
              <div className="relative">
                {/* soft glow behind the tile in the state colour */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[22px] blur-xl opacity-40"
                  style={{ background: `var(--color-${i.state})` }}
                />
                <div className="relative flex size-[74px] items-center justify-center rounded-[20px] bg-paper p-[18px] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.5)] sm:size-[84px] sm:p-[22px]">
                  <span style={{ color: `var(--color-${i.state})` }}>{i.icon}</span>
                </div>
              </div>

              <span className="rounded-full bg-paper/95 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink shadow-sm sm:text-[0.82rem]">
                {i.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
