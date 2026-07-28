"use client";

import { useReveal } from "@/lib/useReveal";

export default function FinalCTA() {
  const scope = useReveal<HTMLElement>(0.09);

  return (
    <section id="contact" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <p data-reveal className="u-eyebrow">
        Start small
      </p>
      <h2 data-reveal className="u-display mt-4 max-w-3xl text-[clamp(2.1rem,6vw,4.2rem)]">
        Give us one route for two weeks.
      </h2>
      <p data-reveal className="mt-6 max-w-lg leading-relaxed text-ink/70">
        Pick your hardest pincode cluster and put it on the network. You will see the
        dispatch view from day one, and you can walk away at the end of the pilot without
        a contract.
      </p>

      <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="/quote"
          className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
        >
          Get a quote
        </a>
        <a
          href="tel:+910000000000"
          className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-ink/50"
        >
          Call operations
        </a>
      </div>

      <p data-reveal className="u-data mt-8 text-muted">
        {/* TODO: swap in the real contact details before deploy */}
        Replace hello@bmxpress.in and the phone number with live details.
      </p>
    </section>
  );
}
