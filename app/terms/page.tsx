import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of service — BM Xpress",
  robots: { index: false },
};

const SECTIONS = [
  {
    h: "What this covers",
    p: "These terms cover use of this website. The delivery service itself is governed by the signed agreement and rate card between BM Xpress and the client. Where the two differ, the signed agreement wins.",
  },
  {
    h: "Quotes and rates",
    p: "Anything quoted on this site or by email is an estimate until it is confirmed in a rate card. Rates depend on weight, distance band, service type, and volume commitment.",
  },
  {
    h: "Service commitments",
    p: "Delivery windows, SLA targets, COD remittance cycles, and liability for failed deliveries are set out in the client agreement rather than here.",
  },
  {
    h: "Prohibited items",
    p: "We do not carry goods that are illegal to transport, hazardous, or restricted under Indian law. Clients are responsible for the contents and the accuracy of what they declare.",
  },
  {
    h: "Liability",
    p: "Our liability for loss or damage is limited to the terms in the signed client agreement. Nothing here limits liability that cannot be limited under Indian law.",
  },
  {
    h: "Contact",
    p: "BM Xpress Logistics Private Limited, Murshidabad, West Bengal, India. Email hello@bmxpress.in.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="u-eyebrow">Legal</p>
        <h1 className="u-display mt-4 text-[clamp(2.1rem,5.5vw,3.4rem)]">Terms of service</h1>

        <div className="mt-8 rounded-card border border-assigned/40 bg-assigned/10 p-5">
          <p className="u-data text-[color:var(--color-assigned)]">Draft — not yet reviewed</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/75">
            A skeleton to build on, not legal advice. Have a lawyer draft the real thing
            against your client contracts before you publish it.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="u-display text-xl">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
