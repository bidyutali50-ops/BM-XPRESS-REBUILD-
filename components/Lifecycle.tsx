"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STAGES = [
  {
    state: "queued",
    label: "Queued",
    title: "Order lands",
    body: "Your order arrives by API, panel upload, or a dark-store pick list. It is validated against serviceability before anyone is assigned.",
  },
  {
    state: "assigned",
    label: "Assigned",
    title: "Rider takes it",
    body: "BMX Dispatch assigns by hub, live rider load, and distance. The rider is on our payroll and punched in, not a name from a pool.",
  },
  {
    state: "transit",
    label: "In transit",
    title: "It moves",
    body: "Pickup is scanned, the route runs, and status changes are written the moment they happen. Exceptions surface immediately, not at end of day.",
  },
  {
    state: "delivered",
    label: "Delivered",
    title: "Proof closes it",
    body: "Delivery is closed with proof, the customer is notified, and the rider's earning for that order is credited to their wallet the same day.",
  },
] as const;

export default function Lifecycle() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(".stage-col, .stage-dot", { opacity: 1, y: 0, scale: 1 });
            gsap.set(".stage-line", { scaleX: 1 });
            return;
          }

          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top 68%", once: true },
            })
            .from(".stage-line", { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "power2.inOut" })
            .from(".stage-dot", { scale: 0, duration: 0.45, stagger: 0.16, ease: "back.out(2.2)" }, "-=1.15")
            .from(".stage-col", { y: 26, opacity: 0, duration: 0.7, stagger: 0.14 }, "-=1.05");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="lifecycle" ref={root} className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <p className="u-eyebrow">The order lifecycle</p>
      <h2 className="u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
        Four states, and a timestamp on each one.
      </h2>

      <div className="relative mt-16">
        <div className="stage-line absolute left-0 right-0 top-[5px] hidden h-px bg-paper-2 md:block" />

        <ol className="grid gap-12 md:grid-cols-4 md:gap-6">
          {STAGES.map((s) => (
            <li key={s.state} className="stage-col relative">
              <span
                className="stage-dot mb-6 hidden size-3 rounded-full md:block"
                style={{ background: `var(--color-${s.state})` }}
                aria-hidden="true"
              />
              <p className="u-data" style={{ color: `var(--color-${s.state})` }}>
                {s.label}
              </p>
              <h3 className="u-display mt-2 text-xl">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
