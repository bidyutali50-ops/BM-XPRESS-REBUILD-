"use client";

import { useState } from "react";

/**
 * TODO: wire to the BMX Dispatch status endpoint. Until then this does not
 * pretend to return a status — it routes the customer to someone who can
 * answer, which is better than a page that dead-ends them.
 */
export default function TrackForm() {
  const [awb, setAwb] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const clean = awb.trim();

  return (
    <div className="mt-10">
      <label htmlFor="awb" className="u-data block text-muted">
        Tracking or waybill number
      </label>
      <div className="mt-3 flex flex-wrap gap-3">
        <input
          id="awb"
          value={awb}
          onChange={(e) => {
            setAwb(e.target.value);
            setSubmitted(false);
          }}
          placeholder="BMX-00000"
          className="u-data min-w-0 flex-1 rounded-full border border-ink/20 bg-white/70 px-5 py-3.5 outline-none transition-colors focus:border-ink/50"
        />
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!clean}
          className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
        >
          Track
        </button>
      </div>

      {submitted && clean && (
        <div className="mt-8 rounded-card border border-paper-2 bg-white/60 p-6">
          <p className="u-data text-transit">Live tracking is being connected</p>
          <p className="mt-3 leading-relaxed text-ink/75">
            We are wiring this page to our dispatch system. Until it is live, send us{" "}
            <span className="u-data text-ink">{clean}</span> and we will check the status
            and come back to you the same day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:hello@bmxpress.in?subject=${encodeURIComponent(
                `Tracking request ${clean}`
              )}&body=${encodeURIComponent(
                `Please share the current status for ${clean}.`
              )}`}
              className="u-data rounded-full bg-ink px-5 py-2.5 text-paper"
            >
              Email us this number
            </a>
            <a
              href="tel:+910000000000"
              className="u-data rounded-full border border-ink/20 px-5 py-2.5"
            >
              Call operations
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
