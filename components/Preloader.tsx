"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Shown once per browser session. Kept under a second, because a loader
 * that outstays its welcome costs more goodwill than it buys.
 * Skipped entirely under reduced motion and on repeat views.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem("bmx-loaded") !== "1";
  });

  useGSAP(
    () => {
      if (!show) return;

      document.documentElement.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("bmx-loaded", "1");
          document.documentElement.style.overflow = "";
          setShow(false);
        },
      });

      tl.from(".pl-mark", { y: 18, opacity: 0, duration: 0.5, ease: "power3.out" })
        .to(".pl-bar", { scaleX: 1, duration: 0.62, ease: "power2.inOut" }, "-=0.2")
        .to(".pl-mark, .pl-track", { opacity: 0, duration: 0.25, ease: "power2.in" })
        .to(root.current, {
          yPercent: -100,
          duration: 0.65,
          ease: "power4.inOut",
        });

      return () => {
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
    >
      <p className="pl-mark u-display text-2xl">BM Xpress</p>
      <div className="pl-track mt-6 h-px w-40 overflow-hidden bg-ink/12">
        <span className="pl-bar block h-full w-full origin-left scale-x-0 bg-ink" />
      </div>
    </div>
  );
}
