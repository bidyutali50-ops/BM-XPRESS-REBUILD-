"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * Shared scroll reveal. Every section uses this so the motion reads as one
 * system rather than a pile of unrelated effects.
 * Mark children with data-reveal to opt them in.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(stagger = 0.08) {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(targets, { opacity: 1, y: 0 });
            return;
          }
          gsap.from(targets, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            stagger,
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return scope;
}
