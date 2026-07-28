"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Row = {
  id: string;
  from: string;
  to: string;
  state: "queued" | "assigned" | "transit" | "delivered";
};

/** Illustrative rows. Replace with a live feed from BMX Dispatch when ready. */
const ROWS: Row[] = [
  { id: "BMX-48120", from: "Rajarhat", to: "Salt Lake Sec V", state: "transit" },
  { id: "BMX-48119", from: "Dankuni", to: "Howrah Maidan", state: "delivered" },
  { id: "BMX-48118", from: "Chandannagar", to: "Bhadreswar", state: "assigned" },
  { id: "BMX-48117", from: "Kolkata", to: "Ballygunge", state: "transit" },
  { id: "BMX-48116", from: "Murshidabad", to: "Berhampore", state: "delivered" },
  { id: "BMX-48115", from: "Rajarhat", to: "New Town AA-II", state: "queued" },
];

const STATE_LABEL: Record<Row["state"], string> = {
  queued: "Queued",
  assigned: "Assigned",
  transit: "In transit",
  delivered: "Delivered",
};

export default function DispatchTicker() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

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

          const rows = gsap.utils.toArray<HTMLElement>(".ticker-row", root.current);

          // Rows tick in on load, then the track loops quietly forever.
          gsap
            .timeline({ delay: 0.75 })
            .from(rows.slice(0, ROWS.length), {
              opacity: 0,
              x: -14,
              duration: 0.5,
              stagger: 0.07,
            })
            .to(track.current, {
              yPercent: -50,
              duration: 22,
              ease: "none",
              repeat: -1,
            });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="rounded-card border border-paper-2 bg-white/60 p-1.5">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="u-eyebrow">BMX Dispatch</span>
        <span className="u-data text-muted">Illustrative view</span>
      </div>

      <div className="relative h-[168px] overflow-hidden rounded-[10px] bg-paper">
        <div ref={track}>
          {[...ROWS, ...ROWS].map((r, i) => (
            <div
              key={`${r.id}-${i}`}
              className="ticker-row flex items-center gap-3 border-b border-paper-2/70 px-3 py-2.5 last:border-0"
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: `var(--color-${r.state})` }}
              />
              <span className="u-data w-[86px] shrink-0 text-ink">{r.id}</span>
              <span className="u-data truncate text-muted">
                {r.from} <span className="text-ink/40">&rarr;</span> {r.to}
              </span>
              <span
                className="u-data ml-auto shrink-0 whitespace-nowrap"
                style={{ color: `var(--color-${r.state})` }}
              >
                {STATE_LABEL[r.state]}
              </span>
            </div>
          ))}
        </div>

        {/* soften the loop seam */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-paper to-transparent" />
      </div>
    </div>
  );
}
