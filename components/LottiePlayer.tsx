"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { LottieComponentProps } from "lottie-react";

type Props = {
  src: string;
  ariaLabel?: string;
  className?: string;
  loop?: boolean;
  rootMargin?: string;
};

/**
 * Lazy Lottie player. Neither the JSON nor the lottie-react runtime is
 * fetched until the placeholder approaches the viewport, so a bounce
 * visitor never pays for either. Autoplay is disabled under
 * prefers-reduced-motion.
 */
export default function LottiePlayer({
  src,
  ariaLabel = "Animation",
  className,
  loop = true,
  rootMargin = "200px",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [Lottie, setLottie] = useState<ComponentType<LottieComponentProps> | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;

    async function load() {
      try {
        const [mod, res] = await Promise.all([
          import("lottie-react"),
          fetch(src, { cache: "force-cache" }),
        ]);
        const json = await res.json();
        setLottie(() => mod.default);
        setData(json);
      } catch (err) {
        // Silent fail — placeholder stays, layout doesn't shift
        // eslint-disable-next-line no-console
        console.warn("Lottie load failed:", err);
      }
    }

    if (!el || typeof IntersectionObserver === "undefined") {
      load();
      return;
    }

    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done) return;
        if (entries.some((e) => e.isIntersecting)) {
          done = true;
          io.disconnect();
          load();
        }
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src, rootMargin]);

  return (
    <div ref={ref} className={className} role="img" aria-label={ariaLabel}>
      {Lottie && data ? (
        <Lottie
          animationData={data}
          loop={loop}
          autoplay={!reduced}
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : null}
    </div>
  );
}
