import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TrackForm from "@/components/TrackForm";

export const metadata: Metadata = {
  title: "Track a shipment — BM Xpress",
  description: "Check the status of a BM Xpress delivery by waybill number.",
};

export default function TrackPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="u-eyebrow">Track a shipment</p>
        <h1 className="u-display mt-4 text-[clamp(2.1rem,5.5vw,3.4rem)]">
          Where is my delivery?
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
          Enter the waybill number from your confirmation message. It usually starts with
          BMX.
        </p>
        <TrackForm />
      </main>
      <Footer />
    </>
  );
}
