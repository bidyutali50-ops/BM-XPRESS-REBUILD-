"use client";

import { useReveal } from "@/lib/useReveal";

const QUESTIONS = [
  {
    q: "Which areas do you actually serve?",
    a: "Hubs are live in Murshidabad, Rajarhat, Kolkata, Dankuni, and Chandannagar, with the surrounding corridors covered from each. Send us a pincode list and we will mark it up honestly rather than promise blanket coverage.",
  },
  {
    q: "What does it cost?",
    a: "Rates depend on weight, distance band, and whether you are on per-order or a dedicated monthly commitment. We quote against your real order file, not a generic slab, so ask and we will price it properly.",
  },
  {
    q: "How does COD remittance work?",
    a: "Cash is collected at the door, reconciled against your order file, and remitted on a cycle agreed before you go live. You get the reconciliation, not just the transfer.",
  },
  {
    q: "Who pays when a delivery fails?",
    a: "Depends on why. Address and customer-unavailable failures follow the NDR rules in your contract; anything caused by us is on us. It is written into the rate card so it is never a conversation after the fact.",
  },
  {
    q: "Do we have to integrate?",
    a: "No. The API exists, and plenty of clients never use it. A daily CSV or the client panel gets orders to us just as reliably.",
  },
  {
    q: "Are your riders employees or gig workers?",
    a: "On our payroll, punched in through our own rider app, and paid the same day through our payout system. That is deliberate, and it is why service quality holds.",
  },
  {
    q: "How small can we start?",
    a: "One pincode cluster for two weeks. No contract to walk away from at the end of it.",
  },
];

export default function FAQ() {
  const scope = useReveal<HTMLElement>(0.05);

  return (
    <section id="faq" ref={scope} className="border-y border-paper-2 bg-white/40">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <p data-reveal className="u-eyebrow">
          Before you ask
        </p>
        <h2 data-reveal className="u-display mt-4 text-[clamp(1.9rem,4.6vw,3.1rem)]">
          The questions we get every time.
        </h2>

        <div className="mt-12">
          {QUESTIONS.map((item) => (
            <details key={item.q} data-reveal className="u-faq group border-b border-paper-2">
              <summary className="flex items-start justify-between gap-6 py-5 transition-colors hover:text-ink/60">
                <span className="u-display text-lg">{item.q}</span>
                <span
                  className="u-faq-icon mt-1 shrink-0 text-xl leading-none text-muted transition-transform duration-300"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-ink/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
