"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Drop SVGs into /public/integrations named to match `slug` and they render
 * automatically. Until a file exists the wordmark shows instead, which is
 * honest and still legible.
 */
const WAYS = [
  { name: "Shopify", slug: "shopify", note: "Orders sync from your store", logo: false },
  { name: "WooCommerce", slug: "woocommerce", note: "Plugin or webhook", logo: false },
  { name: "Unicommerce", slug: "unicommerce", note: "OMS handover", logo: false },
  { name: "Shiprocket", slug: "shiprocket", note: "Aggregator handover", logo: true },
  { name: "REST API", slug: "api", note: "Push orders, pull status", logo: false },
  { name: "Excel or CSV", slug: "csv", note: "Upload a file, no build", logo: false },
];

export default function Integrations() {
  const scope = useReveal<HTMLElement>(0.06);

  return (
    <section id="integrations" ref={scope} className="border-y border-paper-2 bg-white/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p data-reveal className="u-eyebrow">
              Getting orders to us
            </p>
            <h2 data-reveal className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]">
              Integrate, or don&rsquo;t.
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-ink/70">
              The API is there if your team wants it. Plenty of our clients never touch it
              and upload a file instead. Neither route changes what happens once the order
              reaches a rider.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-paper-2 sm:grid-cols-3">
            {WAYS.map((w) => (
              <li key={w.name} data-reveal className="flex flex-col bg-paper p-5">
                <div className="flex h-7 items-center">
                  {w.logo ? (
                    <img
                      src={`/integrations/${w.slug}.svg`}
                      alt={w.name}
                      className="max-h-full w-auto max-w-[112px] object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="u-display text-base">{w.name}</span>
                  )}
                </div>
                <p className="u-data mt-2 text-muted">{w.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
