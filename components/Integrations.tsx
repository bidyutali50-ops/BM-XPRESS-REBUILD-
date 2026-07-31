"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons kept for the two entries that don't have a brand logo ─── */

const CodeIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect
      x="6"
      y="10"
      width="36"
      height="28"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2.4"
    />
    <path
      d="M18 20l-6 4 6 4M30 20l6 4-6 4M26 18l-4 12"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M10 6h20l10 10v26a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path d="M30 6v10h10" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
    <path
      d="M16 26h16M16 32h16M16 38h10"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

type Way = {
  name: string;
  note: string;
  logo?: string;
  icon?: ReactNode;
  state: "transit" | "assigned" | "delivered";
  href?: string;
};

const WAYS: Way[] = [
  {
    name: "Shopify",
    note: "Orders sync from your store.",
    logo: "/integrations/shopify.jpg",
    state: "delivered",
  },
  {
    name: "WooCommerce",
    note: "Plugin or webhook, either works.",
    logo: "/integrations/woocommerce.webp",
    state: "assigned",
  },
  {
    name: "Unicommerce",
    note: "OMS handover with reconciliation.",
    logo: "/integrations/unicommerce.svg",
    state: "transit",
  },
  {
    name: "Shiprocket",
    note: "Aggregator handover, standard flow.",
    logo: "/integrations/shiprocket.svg",
    state: "transit",
  },
  {
    name: "REST API",
    note: "Create shipments, pull status.",
    icon: <CodeIcon />,
    state: "delivered",
    href: "https://api.scm.fynd.com/tms/service/public/hyperlocal/redoc",
  },
  {
    name: "Excel or CSV",
    note: "Upload a file, no build required.",
    icon: <FileIcon />,
    state: "assigned",
  },
];

export default function Integrations() {
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
          const heads = gsap.utils.toArray<HTMLElement>(".int-head", scope.current!);
          const cards = gsap.utils.toArray<HTMLElement>(".int-card", scope.current!);

          if (ctx.conditions?.reduced) {
            gsap.set([...heads, ...cards], { opacity: 1, y: 0, scale: 1, rotateX: 0 });
            return;
          }

          gsap.from(heads, {
            y: 22,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
          });

          gsap.from(cards, {
            y: 30,
            opacity: 0,
            scale: 0.94,
            rotateX: -6,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".int-grid", start: "top 84%", once: true },
          });
        }
      );
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      id="integrations"
      ref={scope}
      className="u-defer mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div>
          <p className="int-head u-eyebrow">Getting orders to us</p>
          <h2 className="int-head u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]">
            Integrate, or don&rsquo;t.
          </h2>
          <p className="int-head mt-6 max-w-md leading-relaxed text-ink/70">
            The API is there if your team wants it. Plenty of clients never touch
            it and upload a file instead. Neither route changes what happens once
            the order reaches a rider.
          </p>
        </div>

        <div className="u-scene int-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS.map((w) => {
            const Body = (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `var(--color-${w.state})` }}
                />

                {/* Fixed-height logo/icon row so every card starts identically */}
                <div className="flex h-10 items-center">
                  {w.logo ? (
                    <img
                      src={w.logo}
                      alt={w.name}
                      className="max-h-10 w-auto max-w-[160px] object-contain object-left"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span
                      className="flex size-10 items-center justify-center rounded-[12px] p-2"
                      style={{
                        color: `var(--color-${w.state})`,
                        background: `color-mix(in oklab, var(--color-${w.state}) 14%, #ffffff)`,
                      }}
                    >
                      {w.icon}
                    </span>
                  )}
                </div>

                {/* For logo cards the wordmark IS the title, so we skip the redundant h3.
                    For icon cards we still need the label. */}
                {w.logo ? (
                  <p className="mt-6 text-[0.9rem] leading-relaxed text-ink/65">
                    {w.note}
                  </p>
                ) : (
                  <div className="mt-5">
                    <p className="u-display text-lg leading-none">{w.name}</p>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/65">
                      {w.note}
                    </p>
                  </div>
                )}

                {w.href && (
                  <p className="u-data mt-auto inline-flex items-center gap-1.5 pt-4 text-transit">
                    View API reference
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </p>
                )}
              </>
            );

            const cardCls =
              "int-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_18px_44px_-18px_rgb(14_19_25/0.18)]";

            return w.href ? (
              <a
                key={w.name}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardCls}
              >
                {Body}
              </a>
            ) : (
              <div key={w.name} className={cardCls}>
                {Body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
