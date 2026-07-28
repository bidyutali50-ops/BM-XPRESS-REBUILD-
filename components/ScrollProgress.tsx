"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Thin page-progress bar coloured through the four delivery states. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(bar.current, { scaleX: 1 });
      return;
    }

    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-queued), var(--color-assigned), var(--color-transit), var(--color-delivered))",
        }}
      />
    </div>
  );
}
