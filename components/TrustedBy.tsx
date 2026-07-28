"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CLIENTS = [
  { name: "Flipkart", src: "/logos/flipkart.webp", w: 92, h: 36 },
  { name: "Pidge", src: "/logos/pidge.svg", w: 92, h: 38 },
  { name: "Adloggs", src: "/logos/adloggs.svg", w: 233, h: 64 },
  { name: "PrraniGanga", src: "/logos/prraniganga.png", w: 938, h: 243 },
  { name: "Grab", src: "/logos/grab.png", w: 133, h: 53 },
];

const INTEGRATIONS = [
  { name: "Shiprocket", src: "/logos/shiprocket.svg", w: 854, h: 190 },
  { name: "ClickPost", src: "/logos/clickpost.webp", w: 660, h: 202 },
  { name: "Fynd", src: "/logos/fynd.svg", w: 148, h: 50 },
  { name: "ElasticRun", src: "/logos/elasticrun.svg", w: 200, h: 60 },
];

type Row = { name: string; src: string; w: number; h: number };

function Marquee({
  items,
  duration,
  reverse = false,
  className = "",
}: {
  items: Row[];
  duration: number;
  reverse?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = [...items, ...items, ...items];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!.querySelector<HTMLElement>(".tb-track")!;

        const loop = gsap.to(el, {
          xPercent: reverse ? 33.3333 : -33.3333,
          duration,
          ease: "none",
          repeat: -1,
        });

        if (reverse) gsap.set(el, { xPercent: -33.3333 });

        const slow = () => gsap.to(loop, { timeScale: 0, duration: 0.4 });
        const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.4 });

        const host = root.current!;
        host.addEventListener("pointerenter", slow);
        host.addEventListener("pointerleave", resume);

        return () => {
          host.removeEventListener("pointerenter", slow);
          host.removeEventListener("pointerleave", resume);
          loop.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={`overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <ul className="tb-track flex w-max items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
        {track.map((c, i) => (
          <li
            key={`${c.name}-${i}`}
            className="flex h-8 w-[104px] shrink-0 items-center justify-center sm:h-10 sm:w-[128px]"
          >
            <img
              src={c.src}
              alt={i < items.length ? c.name : ""}
              aria-hidden={i >= items.length}
              width={c.w}
              height={c.h}
              loading={i < items.length ? "eager" : "lazy"}
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="border-b border-paper-2 bg-white/45 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className="u-eyebrow">The company we keep</p>
        <h2
          id="partners-heading"
          className="u-display u-display-xl mx-auto mt-5 max-w-3xl text-[clamp(2rem,5.4vw,3.6rem)]"
        >
          Integrations and our partners.
        </h2>
      </div>

      <div className="mt-14 space-y-10">
        <Marquee items={CLIENTS} duration={28} />
        <Marquee items={INTEGRATIONS} duration={32} reverse />
      </div>
    </section>
  );
}
