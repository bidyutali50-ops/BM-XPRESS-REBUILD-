"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons: bold filled silhouettes, drawn in-house ─── */

const StoreIcon = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
    <path d="M8 14l3-6h26l3 6z" opacity="0.55" />
    <rect x="8" y="16" width="32" height="26" rx="3" />
    <rect x="13" y="24" width="9" height="10" rx="1.5" fill="#fff" fillOpacity="0.95" />
    <rect x="26" y="24" width="9" height="14" rx="1.5" fill="#fff" fillOpacity="0.95" />
    <path d="M13 24h9M26 24h9" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
    <rect x="14" y="10" width="20" height="6" rx="2" opacity="0.55" />
    <rect x="12" y="16" width="24" height="26" rx="3" />
    <rect x="22" y="22" width="4" height="14" rx="1" fill="#fff" />
    <rect x="17" y="27" width="14" height="4" rx="1" fill="#fff" />
  </svg>
);

const BasketIcon = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
    <path d="M14 12l3 6H10z" opacity="0.55" />
    <path d="M34 12l-3 6h7z" opacity="0.55" />
    <path d="M24 8l0 10" opacity="0.55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M6 18h36l-3 22H9z" />
    <path d="M17 24v10M24 24v10M31 24v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
    <path d="M8 16l16-8 16 8v18l-16 8-16-8z" />
    <path d="M8 16l16 8 16-8M24 24v18" stroke="#fff" strokeWidth="1.8" fill="none" opacity="0.85" />
    <circle cx="35" cy="14" r="6.5" fill="#fff" />
    <circle cx="35" cy="14" r="5" fill="currentColor" />
    <path d="M35 11v3l2 1.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

const FoodIcon = () => (
  <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
    <path d="M8 22a16 16 0 0132 0z" />
    <circle cx="16" cy="17" r="1.4" fill="#fff" />
    <circle cx="24" cy="14" r="1.4" fill="#fff" />
    <circle cx="32" cy="17" r="1.4" fill="#fff" />
    <rect x="6" y="24" width="36" height="4" rx="1" opacity="0.6" />
    <path d="M10 30h28l-2 6a4 4 0 01-4 3H16a4 4 0 01-4-3z" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="size-full">
    <path
      d="M6 10h5l1 4M14 18h27l-4 14H17z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 18l3 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="18" cy="38" r="3" fill="currentColor" />
    <circle cx="34" cy="38" r="3" fill="currentColor" />
  </svg>
);

const INDUSTRIES: { name: string; state: string; icon: ReactNode }[] = [
  { name: "Retail", state: "assigned", icon: <StoreIcon /> },
  { name: "Pharma", state: "delivered", icon: <PillIcon /> },
  { name: "Grocery", state: "delivered", icon: <BasketIcon /> },
  { name: "Q-commerce", state: "transit", icon: <PackageIcon /> },
  { name: "Food & beverage", state: "assigned", icon: <FoodIcon /> },
  { name: "E-commerce", state: "transit", icon: <CartIcon /> },
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
            gsap.set(".ind-head, .ind-tile", { opacity: 1, y: 0, scale: 1 });
            return;
          }

          gsap.from(".ind-head", {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });

          gsap.from(".ind-tile", {
            y: 30,
            opacity: 0,
            scale: 0.88,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: ".ind-row", start: "top 85%", once: true },
          });

          gsap.utils.toArray<HTMLElement>(".ind-tile", scope.current!).forEach((tile, i) => {
            gsap.to(tile, {
              y: i % 2 === 0 ? -4 : 4,
              duration: 3 + (i % 3) * 0.5,
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
    <section
      id="industries"
      ref={scope}
      className="u-defer relative overflow-hidden"
    >
      {/* soft light gradient panel — palette-native, not violet */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(55% 60% at 15% 30%, color-mix(in oklab, var(--color-transit) 14%, #ffffff) 0%, transparent 65%),
            radial-gradient(50% 55% at 85% 40%, color-mix(in oklab, var(--color-delivered) 12%, #ffffff) 0%, transparent 65%),
            radial-gradient(60% 55% at 50% 100%, color-mix(in oklab, var(--color-assigned) 8%, #ffffff) 0%, transparent 70%),
            linear-gradient(180deg, #f6f7f4 0%, #eef1ec 100%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-28">
        <p className="ind-head u-eyebrow">Who we move for</p>
        <h2 className="ind-head u-display u-display-xl mx-auto mt-5 max-w-3xl text-[clamp(2rem,5.4vw,3.6rem)]">
          Built for every delivery-driven business.
        </h2>

        <div className="ind-row mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((i) => (
            <div key={i.name} className="ind-tile flex flex-col items-center gap-3.5">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[22px] opacity-30 blur-lg"
                  style={{ background: `var(--color-${i.state})` }}
                />
                <div className="relative flex size-[76px] items-center justify-center rounded-[20px] bg-white p-[18px] shadow-[0_16px_36px_-14px_rgb(14_19_25/0.22)] sm:size-[84px] sm:p-[22px]">
                  <span style={{ color: `var(--color-${i.state})` }}>{i.icon}</span>
                </div>
              </div>

              <span className="whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-ink shadow-sm sm:text-[0.82rem]">
                {i.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
