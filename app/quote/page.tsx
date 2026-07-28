import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Get a quote — BM Xpress",
  description:
    "Tell us your pickup city, service, and monthly volume and we will price it against your real order file.",
};

export default function QuotePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="u-eyebrow">Get a quote</p>
        <h1 className="u-display mt-4 text-[clamp(2.1rem,5.5vw,3.4rem)]">
          Priced against your orders, not a slab.
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
          Rates depend on weight, distance band, and whether you want per-order or a
          dedicated monthly commitment. Send us the shape of your volume and we will come
          back with real numbers.
        </p>
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}
