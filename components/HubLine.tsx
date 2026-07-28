"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The hub network as a transit line. Real hubs in real north-to-south
 * order. Schematic like any transit map, so it makes no claim to scale.
 */
const STOPS = [
  { code: "MSD", name: "Murshidabad", note: "Head office", hq: true },
  { code: "CDN", name: "Chandannagar", note: "Upper Hooghly" },
  { code: "DKN", name: "Dankuni", note: "Howrah corridor" },
  { code: "KOL", name: "Kolkata", note: "Central and south" },
  { code: "RJH", name: "Rajarhat", note: "New Town, Salt Lake" },
];

export default function HubLine() {
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
            gsap.set(".hub-line-track", { scaleY: 1 });
            gsap.set(".hub-stop", { opacity: 1, x: 0 });
            return;
          }

          gsap
            .timeline({ delay: 0.85 })
            .to(".hub-line-track", { scaleY: 1, duration: 1.1, ease: "power2.inOut" })
            .to(
              ".hub-stop",
              { opacity: 1, x: 0, duration: 0.5, stagger: 0.11, ease: "power3.out" },
              "-=0.8"
            );
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="rounded-card border border-paper-2 bg-white/50 p-6 sm:p-7"
    >
      <div className="flex items-baseline justify-between">
        <span className="u-eyebrow">Hub network</span>
        <span className="u-data text-muted">Schematic</span>
      </div>

      <ol className="relative mt-7 space-y-7">
        <span
          aria-hidden="true"
          className="hub-line-track absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top scale-y-0 bg-ink/20"
        />

        {STOPS.map((s) => (
          <li key={s.code} className="hub-stop relative flex items-start gap-4 opacity-0 [transform:translateX(-8px)]">
            <span
              aria-hidden="true"
              className="relative z-10 mt-1.5 block size-[11px] shrink-0 rounded-full border-[2.5px] bg-paper"
              style={{ borderColor: s.hq ? "var(--color-delivered)" : "var(--color-ink)" }}
            />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2.5">
                <span className="u-display text-base leading-none">{s.name}</span>
                <span className="u-data text-muted">{s.code}</span>
              </div>
              <p className="u-data mt-1.5 text-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
