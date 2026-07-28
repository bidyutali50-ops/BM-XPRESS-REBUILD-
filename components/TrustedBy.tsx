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

/** Tripled so the track is wide enough to loop seamlessly on any screen. */
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function TrustedBy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".tb-track")!;

        const loop = gsap.to(track, {
          xPercent: -33.3333,
          duration: 26,
          ease: "none",
          repeat: -1,
        });

        const slow = () => gsap.to(loop, { timeScale: 0, duration: 0.4 });
        const resume = () => gsap.to(loop, { timeScale: 1, duration: 0.4 });

        root.current!.addEventListener("pointerenter", slow);
        root.current!.addEventListener("pointerleave", resume);

        return () => {
          root.current?.removeEventListener("pointerenter", slow);
          root.current?.removeEventListener("pointerleave", resume);
          loop.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="border-b border-paper-2 bg-white/45 py-12 sm:py-14">
      <p className="u-eyebrow mx-auto max-w-6xl px-5 sm:px-8">Trusted by</p>

      <div
        className="mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <ul className="tb-track flex w-max items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
          {TRACK.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              className="flex h-7 w-[92px] shrink-0 items-center justify-center sm:h-[34px] sm:w-[110px]"
            >
              <img
                src={c.src}
                alt={i < CLIENTS.length ? c.name : ""}
                aria-hidden={i >= CLIENTS.length}
                width={c.w}
                height={c.h}
                loading={i < CLIENTS.length ? "eager" : "lazy"}
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      <p className="u-data mx-auto mt-8 max-w-6xl px-5 text-muted sm:px-8">
        Five of eight brands currently on the network.
      </p>
    </section>
  );
}
