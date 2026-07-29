"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Delivery-route visual for the hero right column. A stylised route with
 * pickup on the left, a delivery bike in the middle, and a delivered pin
 * on the right. The route dashes scroll leftward continuously so the bike
 * reads as moving without actually translating — cleaner than a bike
 * that loops off-screen and jumps back.
 */
function BikeIcon() {
  return (
    <svg
      viewBox="0 0 100 62"
      fill="none"
      className="h-11 w-[72px] text-ink"
      aria-hidden="true"
    >
      {/* rear wheel */}
      <g className="rp-wheel rp-wheel--rear">
        <circle cx="22" cy="46" r="11" stroke="currentColor" strokeWidth="2.5" />
        <line x1="22" y1="35" x2="22" y2="57" stroke="currentColor" strokeWidth="1.4" />
        <line x1="11" y1="46" x2="33" y2="46" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="22" cy="46" r="1.6" fill="currentColor" />
      </g>
      {/* front wheel */}
      <g className="rp-wheel rp-wheel--front">
        <circle cx="76" cy="46" r="11" stroke="currentColor" strokeWidth="2.5" />
        <line x1="76" y1="35" x2="76" y2="57" stroke="currentColor" strokeWidth="1.4" />
        <line x1="65" y1="46" x2="87" y2="46" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="76" cy="46" r="1.6" fill="currentColor" />
      </g>
      {/* frame */}
      <path
        d="M28 46 L38 30 L62 30 L74 46"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* cargo box */}
      <rect
        x="4"
        y="20"
        width="24"
        height="18"
        rx="3"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M10 20V38 M22 20V38" stroke="rgb(255 255 255 / 0.35)" strokeWidth="0.8" />
      {/* handlebar */}
      <path
        d="M76 30 L86 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="86" cy="20" r="2" fill="currentColor" />
      {/* rider */}
      <circle cx="52" cy="16" r="5.5" fill="currentColor" />
      <path
        d="M52 22 Q 58 30 62 30"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function RoutePanel() {
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
            gsap.set(".rp-endpoint, .rp-bike, .rp-tag, .rp-badge", {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
            return;
          }

          const tl = gsap.timeline({ delay: 0.75, defaults: { ease: "power3.out" } });
          tl.from(".rp-endpoint", { opacity: 0, scale: 0, duration: 0.5, stagger: 0.14 })
            .from(".rp-bike", { opacity: 0, x: -22, duration: 0.55 }, "-=0.25")
            .from(".rp-tag", { opacity: 0, y: 10, duration: 0.4, stagger: 0.09 }, "-=0.2")
            .from(".rp-badge", { opacity: 0, scale: 0.92, duration: 0.55 }, "-=0.3");

          // bike bobs — subtle vertical wobble to sell the motion
          gsap.to(".rp-bike", {
            y: -3,
            duration: 0.55,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1.5,
          });

          // panel-wide tilt/parallax against the cursor
          const panel = root.current!.querySelector<HTMLElement>(".rp-panel");
          const badge = root.current!.querySelector<HTMLElement>(".rp-badge");
          if (!panel) return;
          const rx = gsap.quickTo(panel, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(panel, "rotationY", { duration: 0.8, ease: "power3.out" });
          const bx = badge ? gsap.quickTo(badge, "x", { duration: 0.8, ease: "power3.out" }) : null;
          const by = badge ? gsap.quickTo(badge, "y", { duration: 0.8, ease: "power3.out" }) : null;

          const move = (e: PointerEvent) => {
            const r = root.current!.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 6);
            rx(-py * 4);
            bx?.(px * 14);
            by?.(-py * 8);
          };
          const leave = () => {
            rx(0);
            ry(0);
            bx?.(0);
            by?.(0);
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
      <div className="rp-panel u-card3d u-glass overflow-hidden rounded-[18px]">
        <div className="flex items-center justify-between border-b border-ink/8 px-5 py-4">
          <span className="u-eyebrow">BMX Dispatch</span>
          <div className="flex items-center gap-1.5">
            <span className="rp-pulse size-1.5 rounded-full bg-delivered" aria-hidden="true" />
            <span className="u-data text-muted">Live</span>
          </div>
        </div>

        {/* Route: pickup, animated dashes, bike, delivered */}
        <div className="relative flex items-center justify-between px-6 py-10 sm:px-8 sm:py-12">
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-[3px] overflow-hidden opacity-70"
          >
            <div
              className="rp-route-dash h-full w-[200%]"
              style={{
                background:
                  "repeating-linear-gradient(to right, rgb(14 19 25 / 0.35) 0 8px, transparent 8px 16px)",
              }}
            />
          </div>

          <div className="rp-endpoint relative z-10 flex flex-col items-center gap-2">
            <span className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-transit opacity-30 blur-md" />
              <span className="relative size-3 rounded-full bg-transit" />
            </span>
            <span className="u-data text-muted">Pickup</span>
          </div>

          <div className="rp-bike relative z-10 flex flex-col items-center gap-1">
            <BikeIcon />
          </div>

          <div className="rp-endpoint relative z-10 flex flex-col items-center gap-2">
            <span className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-delivered opacity-30 blur-md" />
              <span className="relative size-3 rounded-full bg-delivered" />
            </span>
            <span className="u-data text-muted">Delivered</span>
          </div>
        </div>

        {/* Service tiers */}
        <div className="flex flex-wrap items-center gap-4 border-t border-ink/8 px-5 py-4">
          <span className="rp-tag inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-transit" aria-hidden="true" />
            <span className="u-data text-transit">Same-day</span>
          </span>
          <span className="rp-tag inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-delivered" aria-hidden="true" />
            <span className="u-data text-delivered">Next-day</span>
          </span>
          <span className="rp-tag ml-auto u-data text-muted">Across West Bengal</span>
        </div>
      </div>

      <div className="rp-badge u-glass absolute -bottom-6 -left-4 rounded-[14px] px-5 py-4 sm:-left-8">
        <p className="u-display text-2xl leading-none">3,000+</p>
        <p className="u-data mt-1.5 text-muted">Deliveries a day</p>
      </div>
    </div>
  );
}
