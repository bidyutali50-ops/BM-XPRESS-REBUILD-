"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Recognitions strip that sits just above the footer.
 * Add further government / industry credential badges to CREDENTIALS
 * as they arrive (ISO, MSME registration, DGFT/IEC, etc.).
 */
const CREDENTIALS = [
  {
    name: "Startup India",
    src: "/badges/startup-india.png",
    href: "https://www.startupindia.gov.in/",
    width: 185,
    height: 52,
  },
];

export default function Credentials() {
  const scope = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={scope}
      aria-labelledby="credentials-heading"
      className="border-t border-paper-2 bg-white/40"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8 sm:py-16">
        <p data-reveal className="u-eyebrow" id="credentials-heading">
          Recognitions
        </p>

        <div
          data-reveal
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {CREDENTIALS.map((c) =>
            c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center opacity-90 transition-opacity hover:opacity-100"
                aria-label={`${c.name} — visit programme site`}
              >
                <img
                  src={c.src}
                  alt={c.name}
                  width={c.width}
                  height={c.height}
                  className="h-10 w-auto sm:h-11"
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                width={c.width}
                height={c.height}
                className="h-10 w-auto opacity-90 sm:h-11"
                loading="lazy"
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
