"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HUBS = [
  "MURSHIDABAD · HQ",
  "RAJARHAT",
  "NEW TOWN",
  "SALT LAKE SEC V",
  "KOLKATA",
  "DANKUNI",
  "HOWRAH",
  "CHANDANNAGAR",
  "BERHAMPORE",
];

export default function HubStrip() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hub-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="overflow-hidden border-y border-paper-2 bg-white/40 py-3.5"
      aria-label="Hubs currently on the BM Xpress network"
    >
      <div className="hub-track flex w-max gap-8 pr-8">
        {[...HUBS, ...HUBS].map((h, i) => (
          <span key={`${h}-${i}`} className="u-data flex shrink-0 items-center gap-3 text-muted">
            <span className="size-1 rounded-full bg-transit" aria-hidden="true" />
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
