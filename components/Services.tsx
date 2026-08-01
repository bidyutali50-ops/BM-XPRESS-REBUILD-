"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ─── Icons: hand-drawn, one per service ─── */

const BikeIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <circle cx="12" cy="34" r="7" fill="currentColor" opacity="0.25" />
    <circle cx="12" cy="34" r="3.5" fill="currentColor" />
    <circle cx="36" cy="34" r="7" fill="currentColor" opacity="0.25" />
    <circle cx="36" cy="34" r="3.5" fill="currentColor" />
    <path
      d="M12 34l9-16h8l7 16M21 18l-4-4h-6"
      stroke="currentColor"
      strokeWidth="2.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="16" r="3" fill="currentColor" />
  </svg>
);

const HubIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <line x1="12" y1="14" x2="24" y2="24" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
    <line x1="36" y1="14" x2="24" y2="24" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
    <line x1="12" y1="34" x2="24" y2="24" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
    <line x1="36" y1="34" x2="24" y2="24" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
    <circle cx="8" cy="12" r="3.2" fill="currentColor" opacity="0.55" />
    <circle cx="40" cy="12" r="3.2" fill="currentColor" opacity="0.55" />
    <circle cx="8" cy="36" r="3.2" fill="currentColor" opacity="0.55" />
    <circle cx="40" cy="36" r="3.2" fill="currentColor" opacity="0.55" />
    <circle cx="24" cy="24" r="7" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="24" cy="24" r="2.4" fill="currentColor" />
  </svg>
);

const FleetIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect x="4" y="12" width="18" height="10" rx="2" fill="currentColor" opacity="0.45" />
    <circle cx="9" cy="24" r="2.3" fill="currentColor" />
    <circle cx="17" cy="24" r="2.3" fill="currentColor" />
    <rect x="26" y="22" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="2.2" />
    <path d="M32 22V18a2 2 0 012-2h4a2 2 0 012 2v4" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="31" cy="38" r="2.6" fill="currentColor" />
    <circle cx="39" cy="38" r="2.6" fill="currentColor" />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect x="8" y="24" width="32" height="20" rx="2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.4" />
    <path d="M14 20a10 10 0 0120 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <path d="M30 16l4 4-4 4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M14 20l-3-3M14 20l3-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" fill="none" />
  </svg>
);

const CODIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <rect x="6" y="14" width="36" height="24" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="24" cy="26" r="7" fill="currentColor" />
    <path
      d="M22 22h4M22 24h4M22 22c0 1 .8 2 2 2s2 .8 2 2c0 .8-.5 1.5-2 2M23 27l4 3"
      stroke="#ffffff"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="12" cy="20" r="1.6" fill="currentColor" opacity="0.6" />
    <circle cx="36" cy="32" r="1.6" fill="currentColor" opacity="0.6" />
  </svg>
);

const WarehouseIcon = () => (
  <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
    <path
      d="M6 20L24 8l18 12"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M10 20v20h28V20"
      fill="currentColor"
      fillOpacity="0.14"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <rect x="20" y="28" width="8" height="12" fill="currentColor" />
    <rect x="13" y="24" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <rect x="29" y="24" width="6" height="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ─── Data ─── */

type Service = {
  n: string;
  title: string;
  tagline: string;
  body: string;
  features: string[];
  slug: string;
  icon: ReactNode;
  state: "transit" | "assigned" | "delivered";
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Hyperlocal delivery",
    tagline: "Fast delivery within 30–120 minutes",
    body: "Deliver orders from stores, restaurants, pharmacies, warehouses, and dark stores directly to customers with real-time visibility.",
    features: ["Same-day delivery", "Live GPS tracking", "OTP proof of delivery", "API integration"],
    slug: "hyperlocal",
    icon: <BikeIcon />,
    state: "transit",
  },
  {
    n: "02",
    title: "3PL last-mile",
    tagline: "Reliable delivery for logistics partners",
    body: "Expand your delivery network with our scalable rider fleet, hub operations, and real-time shipment tracking.",
    features: ["Hub-to-customer delivery", "White label operations", "Dedicated operations team", "Live dashboard"],
    slug: "3pl",
    icon: <HubIcon />,
    state: "assigned",
  },
  {
    n: "03",
    title: "Dedicated fleet",
    tagline: "Riders who only work your route",
    body: "Deploy trained riders and vehicles exclusively for your operations with complete fleet management and performance monitoring.",
    features: ["2W, 3W and 4W fleet", "Route optimisation", "Fleet analytics", "Branded delivery teams"],
    slug: "fleet",
    icon: <FleetIcon />,
    state: "delivered",
  },
  {
    n: "04",
    title: "Reverse logistics and RTO",
    tagline: "Returns are not an afterthought",
    body: "Handle customer returns, failed deliveries, and reverse logistics efficiently with complete tracking and proof of pickup.",
    features: ["Reverse pickups", "RTO management", "Proof of pickup", "Real-time tracking"],
    slug: "returns",
    icon: <ReturnIcon />,
    state: "assigned",
  },
  {
    n: "05",
    title: "Cash on delivery",
    tagline: "Collected, reconciled, remitted",
    body: "Collect, reconcile, and settle cash-on-delivery payments with transparent reporting and scheduled remittances.",
    features: ["COD collection", "Daily reconciliation", "Settlement reports", "Finance dashboard"],
    slug: "cod",
    icon: <CODIcon />,
    state: "delivered",
  },
  {
    n: "06",
    title: "Fulfilment and dark stores",
    tagline: "Pick, pack and ship from local stock",
    body: "Use our fulfilment centres to reduce delivery time and improve customer experience with local inventory management.",
    features: ["Inventory storage", "Pick and pack", "Same-day fulfilment", "Warehouse management"],
    slug: "fulfilment",
    icon: <WarehouseIcon />,
    state: "transit",
  },
];

const HEADLINE_WORDS = "Complete last-mile logistics solutions.".split(" ");

/* ─── Component ─── */

export default function Services() {
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
          const words = gsap.utils.toArray<HTMLElement>(".svc-word", scope.current!);
          const heads = gsap.utils.toArray<HTMLElement>(".svc-head", scope.current!);
          const cards = gsap.utils.toArray<HTMLElement>(".svc-card", scope.current!);
          const icons = gsap.utils.toArray<HTMLElement>(".svc-icon", scope.current!);

          if (ctx.conditions?.reduced) {
            gsap.set([...words, ...heads, ...cards], { opacity: 1, y: 0, scale: 1, rotateX: 0, yPercent: 0 });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
            defaults: { ease: "power4.out" },
          });

          tl.from(".svc-eyebrow", { opacity: 0, y: 16, duration: 0.55 })
            .from(words, { yPercent: 108, duration: 1.05, stagger: 0.06 }, "-=0.15")
            .from(".svc-sub", { opacity: 0, y: 18, duration: 0.7 }, "-=0.55");

          gsap.from(cards, {
            opacity: 0,
            y: 32,
            scale: 0.94,
            rotateX: -6,
            duration: 0.75,
            stagger: 0.09,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".svc-grid", start: "top 82%", once: true },
          });

          icons.forEach((el, i) => {
            gsap.to(el, {
              y: -3,
              duration: 2.2 + (i % 3) * 0.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.5 + i * 0.15,
            });
          });
        }
      );
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section
      id="services"
      ref={scope}
      className="u-defer mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="svc-eyebrow u-eyebrow">Our services</p>

        <h2 className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)] leading-[1.05] tracking-tight">
          {HEADLINE_WORDS.map((word, i) => (
            <span key={i} className="mr-3 inline-flex overflow-hidden align-bottom">
              <span className="svc-word inline-block">{word}</span>
            </span>
          ))}
        </h2>

        <p className="svc-sub svc-head mx-auto mt-5 max-w-xl leading-relaxed text-ink/70">
          From hyperlocal deliveries to dedicated fleets and fulfilment operations,
          BM Xpress provides end-to-end logistics solutions that help businesses
          deliver faster, reduce costs, and scale with confidence.
        </p>
      </div>

      <div className="svc-grid mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <article
            key={s.n}
            className="svc-card group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-paper-2 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgb(14_19_25/0.2)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: `var(--color-${s.state})` }}
            />

            <div className="flex items-start justify-between">
              <span
                className="u-data font-semibold"
                style={{ color: `var(--color-${s.state})` }}
              >
                {s.n}
              </span>
              <span
                className="svc-icon flex size-12 items-center justify-center rounded-[14px] p-3"
                style={{
                  background: `color-mix(in oklab, var(--color-${s.state}) 14%, #ffffff)`,
                  color: `var(--color-${s.state})`,
                }}
              >
                {s.icon}
              </span>
            </div>

            <h3 className="u-display mt-6 text-xl leading-tight">{s.title}</h3>
            <p
              className="u-data mt-1.5"
              style={{ color: `var(--color-${s.state})` }}
            >
              {s.tagline}
            </p>

            <p className="mt-4 text-[0.9rem] leading-relaxed text-ink/65">
              {s.body}
            </p>

            <ul className="mt-5 space-y-2">
              {s.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[0.875rem] text-ink/70"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full"
                    style={{ background: `var(--color-${s.state})` }}
                    aria-hidden="true"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={`/quote?service=${s.slug}`}
              className="u-data mt-auto inline-flex items-center gap-1.5 pt-6 text-ink underline-offset-4 hover:underline"
            >
              Learn more
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
