"use client";

import { useReveal } from "@/lib/useReveal";

const CLIENTS = [
  { name: "Flipkart", src: "/logos/flipkart.webp", w: 92, h: 36 },
  { name: "Pidge", src: "/logos/pidge.svg", w: 92, h: 38 },
  { name: "Adloggs", src: "/logos/adloggs.svg", w: 233, h: 64 },
];

export default function TrustedBy() {
  const scope = useReveal<HTMLElement>(0.08);

  return (
    <section ref={scope} className="border-t border-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p data-reveal className="u-eyebrow">
          Trusted by
        </p>

        <ul className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-10">
          {CLIENTS.map((c) => (
            <li key={c.name} data-reveal>
              <img
                src={c.src}
                alt={c.name}
                width={c.w}
                height={c.h}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-9"
              />
            </li>
          ))}
        </ul>

        <p data-reveal className="u-data mt-10 text-muted">
          Among eight brands currently on the network.
        </p>
      </div>
    </section>
  );
}
