"use client";

import { useReveal } from "@/lib/useReveal";

const HUBS = [
  { code: "MSD", name: "Murshidabad", note: "Head office and control room" },
  { code: "RJH", name: "Rajarhat", note: "New Town and Salt Lake coverage" },
  { code: "KOL", name: "Kolkata", note: "Central and south city" },
  { code: "DKN", name: "Dankuni", note: "Howrah and Hooghly corridor" },
  { code: "CDN", name: "Chandannagar", note: "Upper Hooghly belt" },
];

export default function Network() {
  const scope = useReveal<HTMLElement>(0.07);

  return (
    <section id="network" ref={scope} className="u-grid-field">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p data-reveal className="u-eyebrow">
              Where we already run
            </p>
            <h2 data-reveal className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]">
              Bengal, hub by hub.
            </h2>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-ink/70">
              We opened in Murshidabad and grew along the corridors our clients actually
              ship on, rather than planting flags on a map. If a pincode is outside the
              list, ask us before you assume it is not covered.
            </p>
            <a
              data-reveal
              href="#contact"
              className="u-data mt-8 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-ink transition-colors hover:border-ink"
            >
              Check a pincode <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <ul className="divide-y divide-paper-2 border-y border-paper-2">
            {HUBS.map((h) => (
              <li
                key={h.code}
                data-reveal
                className="group flex items-center gap-5 py-5 transition-colors duration-300 hover:bg-white/50"
              >
                <span className="u-data w-12 shrink-0 text-transit">{h.code}</span>
                <div className="min-w-0">
                  <p className="u-display text-lg">{h.name}</p>
                  <p className="u-data mt-0.5 text-muted">{h.note}</p>
                </div>
                <span
                  className="ml-auto size-1.5 shrink-0 rounded-full bg-delivered"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
