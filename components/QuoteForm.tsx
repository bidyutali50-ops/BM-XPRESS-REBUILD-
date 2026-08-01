import { Suspense } from "react";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Get a quote — BM Xpress",
  description:
    "Tell us about your volume and coverage needs. We reply within one business day.",
};

export default function QuotePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="u-eyebrow">Get in touch</p>
        <h1 className="u-display mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight">
          Tell us about your delivery needs.
        </h1>
        <p className="mt-4 leading-relaxed text-ink/70">
          Share a few details and someone from the team will get back to you
          within one business day.
        </p>
      </div>

      <div className="mt-12">
        <Suspense fallback={<div className="mx-auto h-64 max-w-lg rounded-[16px] border border-paper-2 bg-white" />}>
          <QuoteForm />
        </Suspense>
      </div>
    </main>
  );
}
