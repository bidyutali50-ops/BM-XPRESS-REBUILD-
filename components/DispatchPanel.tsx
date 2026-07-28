"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CATEGORIES = [
  { name: "Retail", note: "Same-day" },
  { name: "Pharma", note: "Time-bound" },
  { name: "Grocery", note: "Dark-store" },
  { name: "Q-commerce", note: "Slotted" },
  { name: "Food & beverage", note: "Short-radius" },
  { name: "E-commerce", note: "Doorstep" },
];

const STATES = ["queued", "assigned", "transit", "delivered"] as const;
const STATE_LABEL = {
  queued: "Queued",
  assigned: "Assigned",
  transit: "In transit",
  delivered: "Delivered",
} as const;

export default function DispatchPanel() {
  const root = useRef<HTMLDivElement>(null);

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
            gsap.set(".dp-row, .dp-chip, .dp-badge", { opacity: 1, y: 0, x: 0 });
            return;
          }

          gsap
            .timeline({ delay: 0.75, defaults: { ease: "power3.out" } })
            .to(".dp-row", { opacity: 1, x: 0, duration: 0.55, stagger: 0.07 })
            .to(".dp-chip", { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.3")
            .to(".dp-badge", { opacity: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.35");

          const panel = root.current!.querySelector<HTMLElement>(".dp-panel")!;
          const badge = root.current!.querySelector<HTMLElement>(".dp-badge")!;

          const rx = gsap.quickTo(panel, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(panel, "rotationY", { duration: 0.8, ease: "power3.out" });
          const bx = gsap.quickTo(badge, "x", { duration: 0.8, ease: "power3.out" });
          const by = gsap.quickTo(badge, "y", { duration: 0.8, ease: "power3.out" });

          const move = (e: PointerEvent) => {
            const r = root.current!.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 7);
            rx(-py * 5);
            bx(px * 16);
            by(-py * 10);
          };

          const leave = () => {
            rx(0);
            ry(0);
            bx(0);
            by(0);
          };

          const el = root.current!;
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="u-scene relative">
      <div className="dp-panel u-card3d u-glass overflow-hidden rounded-[18px]">
        <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <span className="u-eyebrow">BMX Dispatch</span>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-delivered" aria-hidden="true" />
            <span className="u-data text-muted">Live</span>
          </div>
        </div>

        <ul className="divide-y divide-ink/6">
          {CATEGORIES.map((c) => (
            <li
              key={c.name}
              className="dp-row flex items-center gap-4 px-5 py-3 opacity-0 [transform:translateX(-10px)]"
            >
              <span className="min-w-0 flex-1 truncate text-[0.92rem] font-medium">
                {c.name}
              </span>
              <span className="u-data shrink-0 text-muted">{c.note}</span>
              <span
                className="size-1.5 shrink-0 rounded-full bg-delivered"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-ink/8 px-5 py-4">
          {STATES.map((s) => (
            <span key={s} className="dp-chip flex items-center gap-1.5 opacity-0 [transform:translateY(6px)]">
              <span
                className="size-1.5 rounded-full"
                style={{ background: `var(--color-${s})` }}
                aria-hidden="true"
              />
              <span className="u-data" style={{ color: `var(--color-${s})` }}>
                {STATE_LABEL[s]}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="dp-badge u-glass absolute -bottom-6 -left-4 rounded-[14px] px-5 py-4 opacity-0 [transform:translateY(14px)_scale(0.94)] sm:-left-8">
        <p className="u-display text-2xl leading-none">3,000+</p>
        <p className="u-data mt-1.5 text-muted">Orders a day</p>
      </div>
    </div>
  );
}
