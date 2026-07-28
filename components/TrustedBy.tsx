"use client";

import { useReveal } from "@/lib/useReveal";

/** Replace with your eight confirmed clients, or delete this section. */
const CLIENTS = [
  "Client one",
  "Client two",
  "Client three",
  "Client four",
  "Client five",
  "Client six",
  "Client seven",
  "Client eight",
];

export default function TrustedBy() {
  const scope = useReveal<HTMLElement>(0.05);

  return (
    <section ref={scope} className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <p data-reveal className="u-eyebrow">
        Shipping with us
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        {CLIENTS.map((c) => (
          <li
            key={c}
            data-reveal
            className="u-display border-b border-paper-2 pb-4 text-lg text-ink/45"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
