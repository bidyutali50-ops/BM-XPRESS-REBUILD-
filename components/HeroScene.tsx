"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Isometric delivery-hub scene: BMX hub, stacked packages, delivery
 * bike in the foreground. Hand-drawn SVG, palette-native (transit blue,
 * delivered green, assigned amber on paper). Not a clone of anything
 * — inspired by the Zippee-style illustrated-hero pattern that's now
 * a category convention (Zippee, Blinkit, Zepto all use variations).
 */
export default function HeroScene() {
  const root = useRef<SVGSVGElement>(null);

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

          // Wheels spinning (kept subtle so it doesn't demand attention)
          gsap.to(".hs-wheel", {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none",
            transformOrigin: "center",
            svgOrigin: "0 0",
          });

          // Motion lines pulse (fade in, fade out)
          gsap.to(".hs-motion", {
            opacity: 0.15,
            duration: 0.9,
            stagger: 0.15,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });

          // Small "delivery pulse" leaves the hub, rides an arc to bike
          gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } })
            .set(".hs-pulse", { opacity: 0, x: 0, y: 0 })
            .to(".hs-pulse", { opacity: 1, duration: 0.35 })
            .to(".hs-pulse", { x: -180, y: 30, duration: 1.8 }, "<")
            .to(".hs-pulse", { opacity: 0, duration: 0.3 }, "-=0.3")
            .to({}, { duration: 1.6 });

          // Package stack has a subtle bob (as if just placed)
          gsap.to(".hs-packages", {
            y: -3,
            duration: 2.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      );
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 800 600"
      className="h-auto w-full"
      role="img"
      aria-label="Isometric illustration of a BMX Xpress hub with stacked packages and a delivery bike"
    >
      <defs>
        <linearGradient id="hs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(14,19,25,0.08)" />
          <stop offset="100%" stopColor="rgba(14,19,25,0)" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="450" cy="530" rx="330" ry="26" fill="url(#hs-ground)" />

      {/* ─── Warehouse (right side of scene) ─── */}
      <g>
        {/* Right side face (in shadow) */}
        <path
          d="M600 250 L660 220 L660 460 L600 490 Z"
          fill="#e3e7e1"
        />
        {/* Front face */}
        <path
          d="M370 250 L600 250 L600 490 L370 490 Z"
          fill="#ffffff"
          stroke="#0e1319"
          strokeWidth="2"
        />
        <path
          d="M600 250 L660 220 L660 460 L600 490"
          fill="none"
          stroke="#0e1319"
          strokeWidth="2"
        />
        {/* Roof (top) */}
        <path
          d="M370 250 L600 250 L660 220 L430 220 Z"
          fill="#2f9e6b"
          stroke="#0e1319"
          strokeWidth="2"
        />
        {/* Roof accent stripe */}
        <path
          d="M430 220 L660 220"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="4"
        />

        {/* BMX label plaque */}
        <rect
          x="390"
          y="270"
          width="150"
          height="42"
          rx="4"
          fill="#0e1319"
        />
        <text
          x="465"
          y="299"
          fill="#f2f4f1"
          fontSize="22"
          fontWeight="800"
          fontFamily="var(--font-display), sans-serif"
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          BM XPRESS
        </text>

        {/* Window */}
        <rect
          x="395"
          y="335"
          width="80"
          height="60"
          fill="#3b6fe0"
          fillOpacity="0.18"
          stroke="#0e1319"
          strokeWidth="2"
        />
        <path
          d="M435 335 L435 395 M395 365 L475 365"
          stroke="#0e1319"
          strokeWidth="1.5"
        />

        {/* Door */}
        <rect
          x="495"
          y="360"
          width="80"
          height="130"
          fill="#2f9e6b"
          stroke="#0e1319"
          strokeWidth="2"
        />
        <circle cx="560" cy="425" r="3" fill="#0e1319" />

        {/* "Delivery pulse" — leaves the warehouse */}
        <circle
          className="hs-pulse"
          cx="535"
          cy="425"
          r="6"
          fill="#3b6fe0"
          opacity="0"
          filter="drop-shadow(0 0 4px #3b6fe0)"
        />
      </g>

      {/* ─── Package stack (left of hub) ─── */}
      <g className="hs-packages">
        {/* Bottom box */}
        <path d="M270 460 L340 460 L358 448 L288 448 Z" fill="#c9ad84" />
        <path
          d="M270 460 L270 500 L340 500 L340 460 Z"
          fill="#d4b689"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M340 460 L358 448 L358 488 L340 500 Z"
          fill="#b39066"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M270 460 L340 460 L358 448 L288 448 Z"
          fill="none"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <line x1="305" y1="448" x2="305" y2="500" stroke="#0e1319" strokeWidth="1" opacity="0.35" />

        {/* Middle box */}
        <path d="M285 425 L345 425 L361 413 L301 413 Z" fill="#c9ad84" />
        <path
          d="M285 425 L285 458 L345 458 L345 425 Z"
          fill="#d4b689"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M345 425 L361 413 L361 446 L345 458 Z"
          fill="#b39066"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M285 425 L345 425 L361 413 L301 413 Z"
          fill="none"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <line x1="315" y1="425" x2="315" y2="458" stroke="#0e1319" strokeWidth="1" opacity="0.35" />

        {/* Top box — with delivered-green tape */}
        <path d="M300 390 L350 390 L364 379 L314 379 Z" fill="#c9ad84" />
        <path
          d="M300 390 L300 423 L350 423 L350 390 Z"
          fill="#d4b689"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M350 390 L364 379 L364 411 L350 423 Z"
          fill="#b39066"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        <path
          d="M300 390 L350 390 L364 379 L314 379 Z"
          fill="none"
          stroke="#0e1319"
          strokeWidth="1.5"
        />
        {/* tape */}
        <rect x="322" y="379" width="10" height="44" fill="#2f9e6b" />
        <line x1="325" y1="381" x2="332" y2="374" stroke="#2f9e6b" strokeWidth="2.5" />
      </g>

      {/* ─── Motion lines (behind bike) ─── */}
      <g stroke="#3b6fe0" strokeWidth="3" strokeLinecap="round">
        <line className="hs-motion" x1="30" y1="440" x2="80" y2="440" opacity="0.5" />
        <line className="hs-motion" x1="50" y1="470" x2="105" y2="470" opacity="0.65" />
        <line className="hs-motion" x1="30" y1="500" x2="90" y2="500" opacity="0.5" />
      </g>

      {/* ─── Delivery bike (foreground left) ─── */}
      <g>
        {/* Cargo box (rear) */}
        <path d="M100 430 L155 430 L160 465 L105 465 Z" fill="#3b6fe0" />
        <path d="M100 430 L100 490 L155 490 L155 430 Z" fill="#3b6fe0" />
        <path d="M155 430 L160 465 L160 490 L155 490 Z" fill="#2e5abf" />
        <path
          d="M100 430 L155 430 L160 465 L105 465 M100 430 L100 490 L155 490 L155 430 M155 490 L160 490 L160 465"
          fill="none"
          stroke="#0e1319"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M117 460 L138 460" stroke="#f2f4f1" strokeWidth="1.5" opacity="0.7" />

        {/* Frame */}
        <path
          d="M155 500 L185 460 L235 460 L265 500"
          stroke="#0e1319"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Handlebar + light */}
        <path
          d="M262 462 L280 445"
          stroke="#0e1319"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="285" cy="443" r="4" fill="#e8a33d" />

        {/* Rider silhouette */}
        <circle cx="215" cy="430" r="14" fill="#e8a33d" stroke="#0e1319" strokeWidth="2" />
        <path
          d="M203 442 Q210 465 235 465 Q245 465 250 458"
          stroke="#e8a33d"
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M203 442 Q210 465 235 465 Q245 465 250 458"
          stroke="#0e1319"
          strokeWidth="2"
          fill="none"
        />

        {/* Rear wheel */}
        <g transform="translate(155 500)">
          <circle cx="0" cy="0" r="24" fill="#0e1319" />
          <circle cx="0" cy="0" r="14" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1.5" />
          <g className="hs-wheel" style={{ transformOrigin: "0 0" }}>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0e1319" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0e1319" strokeWidth="2" />
          </g>
          <circle cx="0" cy="0" r="2.5" fill="#0e1319" />
        </g>

        {/* Front wheel */}
        <g transform="translate(265 500)">
          <circle cx="0" cy="0" r="24" fill="#0e1319" />
          <circle cx="0" cy="0" r="14" fill="#f2f4f1" stroke="#0e1319" strokeWidth="1.5" />
          <g className="hs-wheel" style={{ transformOrigin: "0 0" }}>
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0e1319" strokeWidth="2" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0e1319" strokeWidth="2" />
          </g>
          <circle cx="0" cy="0" r="2.5" fill="#0e1319" />
        </g>
      </g>
    </svg>
  );
}
