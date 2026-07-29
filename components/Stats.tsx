"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Real figures. Add a fourth only when you have one you can evidence. */
type Stat = { display: string; count?: number; label: string };
const STATS: Stat[] = [
  { display: "3,000+", count: 3000, label: "Deliveries handled daily" },
  { display: "Same-day", label: "Within city limits" },
  { display: "Next-day", label: "Across West Bengal" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const nums = gsap.utils.toArray<HTMLElement>("[data-count]", root.current);
          const items = gsap.utils.toArray<HTMLElement>(".stat-item", root.current);

          if (ctx.conditions?.reduced) {
            nums.forEach((n) => {
              const end = Number(n.dataset.count);
              n.textContent = Number.isFinite(end) ? end.toLocaleString("en-IN") : "";
            });
            gsap.set(items, { opacity: 1, y: 0 });
            return;
          }

          gsap.from(items, {
            y: 18,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
          });

          nums.forEach((n) => {
            const end = Number(n.dataset.count);
            if (!Number.isFinite(end)) return;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: end,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: { trigger: n, start: "top 88%", once: true },
              onUpdate: () => {
                n.textContent = Math.round(obj.v).toLocaleString("en-IN");
              },
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="border-b border-paper-2 bg-white/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item border-l border-paper-2 pl-5 first:border-l-0 first:pl-0 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0">
            <p className="u-display text-[clamp(2rem,4.5vw,2.9rem)]">
              {s.count !== undefined ? (
                <>
                  <span data-count={s.count}>0</span>+
                </>
              ) : (
                s.display
              )}
            </p>
            <p className="u-data mt-2 max-w-[18ch] leading-relaxed text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
