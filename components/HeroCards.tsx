"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HUBS = ["MSD", "CDN", "DKN", "KOL", "RJH"];

const STATES = [
  { key: "queued", label: "Queued" },
  { key: "assigned", label: "Assigned" },
  { key: "transit", label: "In transit" },
  { key: "delivered", label: "Delivered" },
];

export default function HeroCards() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const cards = gsap.utils.toArray<HTMLElement>(".hcard", root.current);

          if (ctx.conditions?.reduced) {
            gsap.set(cards, { opacity: 1, y: 0, rotateX: 0, rotateY: 0 });
            return;
          }

          gsap.from(cards, {
            opacity: 0,
            y: 34,
            rotateX: -12,
            duration: 0.85,
            stagger: 0.13,
            delay: 0.7,
            ease: "power3.out",
          });

          cards.forEach((card, i) => {
            gsap.to(card, {
              y: i % 2 === 0 ? -9 : 9,
              duration: 3.4 + i * 0.55,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.6 + i * 0.25,
            });
          });

          const setters = cards.map((card) => ({
            x: gsap.quickTo(card, "x", { duration: 0.7, ease: "power3.out" }),
            ry: gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" }),
            rx: gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" }),
          }));

          const move = (e: PointerEvent) => {
            const r = root.current!.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            setters.forEach((s, i) => {
              const depth = 1 + i * 0.45;
              s.x(px * 14 * depth);
              s.ry(px * 7);
              s.rx(-py * 6);
            });
          };

          const leave = () => {
            setters.forEach((s) => {
              s.x(0);
              s.ry(0);
              s.rx(0);
            });
          };

          const el = root.current!;
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);

          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="u-scene relative grid gap-4 sm:grid-cols-2 lg:block lg:h-[430px]">
      <article className="hcard u-card3d rounded-card border border-paper-2 bg-white/85 p-5 backdrop-blur-sm lg:absolute lg:left-0 lg:top-0 lg:w-[270px]">
        <p className="u-eyebrow">Coverage</p>
        <p className="u-display mt-2 text-3xl">5 hubs</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {HUBS.map((h) => (
            <span key={h} className="u-data rounded-full bg-paper px-2.5 py-1 text-muted">
              {h}
            </span>
          ))}
        </div>
      </article>

      <article className="hcard u-card3d rounded-card border border-paper-2 bg-white/85 p-5 backdrop-blur-sm lg:absolute lg:right-0 lg:top-[118px] lg:w-[250px]">
        <p className="u-eyebrow">Fleet</p>
        <p className="u-display mt-2 text-3xl">143 riders</p>
        <p className="u-data mt-3 leading-relaxed text-muted">
          On our payroll, punched in, paid same day
        </p>
      </article>

      <article className="hcard u-card3d rounded-card border border-paper-2 bg-white/85 p-5 backdrop-blur-sm sm:col-span-2 lg:absolute lg:left-[26px] lg:top-[258px] lg:w-[290px]">
        <p className="u-eyebrow">Every order, tracked</p>
        <ul className="mt-3.5 space-y-2">
          {STATES.map((s) => (
            <li key={s.key} className="flex items-center gap-2.5">
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: `var(--color-${s.key})` }}
                aria-hidden="true"
              />
              <span className="u-data" style={{ color: `var(--color-${s.key})` }}>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
