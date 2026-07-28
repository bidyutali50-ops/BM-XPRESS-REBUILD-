"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type Props = {
  /** Public path to the Lottie JSON, e.g. "/lottie/onboarding.json" */
  src: string;
  /** Descriptive label for screen readers. */
  ariaLabel?: string;
  className?: string;
  /** Whether the animation loops. Defaults to true. */
  loop?: boolean;
  /** Root margin for the intersection observer that triggers load. */
  rootMargin?: string;
};

type LottieModule = { default: ComponentType<Record<string, unknown>> };

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
  const [Lottie, setLottie] = useState<LottieModule["default"] | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // No IO available — load immediately as a safe fallback
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

    async function load() {
      try {
        const [mod, res] = await Promise.all([
          import("lottie-react") as Promise<LottieModule>,
          fetch(src, { cache: "force-cache" }),
        ]);
        const json = await res.json();
        setLottie(() => mod.default);
        setData(json);
      } catch (err) {
        // Silent fail — the placeholder stays and we don't break layout
        // eslint-disable-next-line no-console
        console.warn("Lottie load failed:", err);
      }
    }

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
