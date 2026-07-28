"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type Spark = { x: number; y: number; angle: number; startTime: number };
type Easing = "linear" | "ease-in" | "ease-in-out" | "ease-out";

type Props = {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: Easing;
  extraScale?: number;
  children?: ReactNode;
};

/**
 * Sparks radiating from every click on the document. Fires on the window,
 * draws to a viewport-sized fixed canvas, and only runs the RAF loop while
 * sparks exist. Disabled entirely under prefers-reduced-motion.
 *
 * Original: React Bits (MIT). This version is TS + perf-tuned for our site.
 */
export default function ClickSpark({
  sparkColor = "#3b6fe0",
  sparkSize = 12,
  sparkRadius = 26,
  sparkCount = 10,
  duration = 520,
  easing = "ease-out",
  extraScale = 1,
  children,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  // Read reduced-motion once on mount
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Size the canvas to the viewport, DPR-aware, and keep it in sync on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      // absolute transform, not multiplicative, so repeated resizes don't compound
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // RAF loop that only runs while sparks exist
  const ensureLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.globalAlpha = 1 - eased; // fade toward end of life
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      // reset alpha so future draws are clean
      ctx.globalAlpha = 1;

      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(draw);
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  // Attach a single window click listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (reducedRef.current) return;
      // Skip synthetic clicks and modifier-key clicks (opens in new tab etc)
      if (e.detail === 0 || e.metaKey || e.ctrlKey) return;

      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      sparksRef.current.push(...newSparks);
      ensureLoop();
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [sparkCount, ensureLoop]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70]"
      />
      {children}
    </>
  );
}
