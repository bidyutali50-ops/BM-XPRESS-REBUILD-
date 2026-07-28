"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Real figures. Add a fourth only when you have one you can evidence. */
const STATS = [
  { value: 3000, suffix: "+", label: "Orders handled daily" },
  { value: 8, suffix: "", label: "Brands shipping with us" },
  { value: 6, suffix: "", label: "Industries we deliver for" },
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

          if (ctx.conditions?.reduced) {
            nums.forEach((n) => {
              n.textContent = Number(n.dataset.count).toLocaleString("en-IN");
            });
            return;
          }

          nums.forEach((n) => {
            const end = Number(n.dataset.count);
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
          <div key={s.label} className="border-l border-paper-2 pl-5 first:border-l-0 first:pl-0 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0">
            <p className="u-display text-[clamp(2rem,4.5vw,2.9rem)]">
              <span data-count={s.value}>0</span>
              {s.suffix}
            </p>
            <p className="u-data mt-2 max-w-[15ch] leading-relaxed text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
