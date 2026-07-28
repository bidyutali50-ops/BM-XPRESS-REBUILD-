"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * SIGNATURE ELEMENT
 * One continuous rail down the left edge of the page. It fills as you scroll
 * and steps through the four delivery states, so reading the page top to
 * bottom has the same shape as watching an order reach a doorstep.
 */
const STAGES = [
  { label: "Queued", color: "var(--color-queued)" },
  { label: "Assigned", color: "var(--color-assigned)" },
  { label: "In transit", color: "var(--color-transit)" },
  { label: "Delivered", color: "var(--color-delivered)" },
];

export default function LifecycleRail() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      const tween = gsap.to(fill.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (self) => {
            setStage(Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length)));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root }
  );

  const active = STAGES[stage];

  return (
    <div
      aria-hidden="true"
      ref={root}
      className="pointer-events-none fixed left-5 top-0 z-40 hidden h-screen flex-col items-center justify-center gap-4 lg:flex"
    >
      <span
        className="u-data uppercase tracking-[0.22em] transition-colors duration-500"
        style={{ writingMode: "vertical-rl", color: active.color }}
      >
        {active.label}
      </span>

      <div className="relative h-[38vh] w-px bg-paper-2">
        <div
          ref={fill}
          className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 transition-colors duration-500"
          style={{ background: active.color }}
        />
      </div>

      <span
        className="block size-2 rounded-full transition-colors duration-500"
        style={{ background: active.color }}
      />
    </div>
  );
}
