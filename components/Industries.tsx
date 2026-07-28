"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const INDUSTRIES = [
  {
    name: "D2C brands",
    note: "Same-day in the city your customers actually live in.",
    image: "/industries/d2c.avif",
    state: "transit",
  },
  {
    name: "Grocery and q-commerce",
    note: "Dark-store dispatch with batching and slot windows.",
    image: "/industries/grocery.avif",
    state: "delivered",
  },
  {
    name: "Pharmacy",
    note: "Time-bound runs with handover proof at the door.",
    image: "/industries/pharmacy.avif",
    state: "assigned",
  },
  {
    name: "Food and bakery",
    note: "Short-radius, temperature-sensitive, no waiting.",
    image: "/industries/food.avif",
    state: "transit",
  },
  {
    name: "Fashion and apparel",
    note: "High return volume, so reverse pickup is built in.",
    image: "/industries/fashion.avif",
    state: "delivered",
  },
  {
    name: "Electronics",
    note: "Higher value per box, so scan and proof at every hop.",
    image: "/industries/electronics.avif",
    state: "assigned",
  },
] as const;

export default function Industries() {
  const scope = useRef<HTMLElement>(null);

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
            gsap.set(".ind-head, .ind-card", { opacity: 1, y: 0, rotateX: 0 });
            return;
          }

          gsap.from(".ind-head", {
            y: 24,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });

          gsap.from(".ind-card", {
            y: 44,
            opacity: 0,
            rotateX: -10,
            duration: 0.9,
            stagger: 0.11,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ind-grid", start: "top 82%", once: true },
          });

          // subtle parallax on each image as its card moves through the viewport
          gsap.utils.toArray<HTMLElement>(".ind-image", scope.current!).forEach((img) => {
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: img.closest(".ind-card"),
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      id="industries"
      ref={scope}
      className="u-defer mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <p className="ind-head u-eyebrow">Who we move for</p>
      <h2 className="ind-head u-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,3.1rem)]">
        Different boxes, different rules.
      </h2>

      <div className="u-scene ind-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((i) => (
          <article
            key={i.name}
            className="ind-card group relative flex flex-col overflow-hidden rounded-card border border-paper-2 bg-white transition-shadow duration-500 hover:shadow-[0_20px_50px_-24px_rgb(14_19_25/0.18)]"
          >
            <div
              className="relative aspect-[5/4] overflow-hidden"
              style={{
                background: `linear-gradient(155deg, color-mix(in oklab, var(--color-${i.state}) 10%, #ffffff) 0%, #ffffff 70%)`,
              }}
            >
              <img
                src={i.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                width={512}
                height={512}
                className="ind-image absolute inset-0 size-full object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
            </div>

            <div
              className="border-t-2 p-6"
              style={{ borderColor: `var(--color-${i.state})` }}
            >
              <h3 className="u-display text-lg">{i.name}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/65">{i.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
