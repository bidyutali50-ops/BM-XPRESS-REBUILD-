"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * Pointer-tracked 3D tilt. Transform-only so it composites on the GPU,
 * and it adds nothing to the bundle beyond gsap, which is already here.
 * Skipped entirely on coarse pointers and under reduced motion.
 */
export function useTilt<T extends HTMLElement = HTMLElement>(max = 7) {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-tilt]", scope.current);
          const cleanups: Array<() => void> = [];

          cards.forEach((card) => {
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
            const lift = card.querySelector<HTMLElement>("[data-lift]");
            const lz = lift
              ? gsap.quickTo(lift, "z", { duration: 0.5, ease: "power3.out" })
              : null;

            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * max * 2);
              rx(-py * max * 2);
              lz?.(26);
            };

            const leave = () => {
              rx(0);
              ry(0);
              lz?.(0);
            };

            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return scope;
}
