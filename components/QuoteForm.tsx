"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

// Sheet endpoint for quote submissions.
// Not a secret — this URL only accepts writes with the specific field
// shape defined in the Apps Script, and Google rate-limits by origin.
const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz_UhVi98QcILma9GMZMQZVta8dVU6sAZeeU100RExbQJ6bPTJJx2OomkzdXQb37V0mfg/exec";

type Status = "idle" | "sending" | "sent" | "error";

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: (fd.get("name") as string) || "",
      company: (fd.get("company") as string) || "",
      email: (fd.get("email") as string) || "",
      phone: (fd.get("phone") as string) || "",
      service: (fd.get("service") as string) || "",
      volume: (fd.get("volume") as string) || "",
      message: (fd.get("message") as string) || "",
    };

    if (!payload.name || !payload.email) {
      setStatus("error");
      setErrorMsg("Name and email are required.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      // no-cors mode is required for Google Apps Script from a browser.
      // We won't see the response body, but the request goes through and
      // the row lands in the sheet. Success is inferred from no thrown error.
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg("Could not send. Try again or email us directly.");
      // eslint-disable-next-line no-console
      console.error("Quote submit failed:", err);
    }
  };

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-lg rounded-[16px] border border-paper-2 bg-white p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-delivered/15">
          <svg viewBox="0 0 24 24" className="size-7 text-delivered" fill="none" aria-hidden="true">
            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="u-display mt-6 text-2xl">Thanks — we got it.</h2>
        <p className="mt-3 leading-relaxed text-ink/70">
          A member of the team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="u-data mt-6 text-ink underline underline-offset-4 hover:text-ink/70"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-[16px] border border-paper-2 bg-white p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="u-data text-muted">Name *</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          />
        </label>
        <label className="block">
          <span className="u-data text-muted">Company</span>
          <input
            type="text"
            name="company"
            autoComplete="organization"
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="u-data text-muted">Email *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          />
        </label>
        <label className="block">
          <span className="u-data text-muted">Phone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="u-data text-muted">Service interest</span>
          <select
            name="service"
            defaultValue={prefilledService}
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          >
            <option value="">Any service</option>
            <option value="hyperlocal">Hyperlocal delivery</option>
            <option value="3pl">3PL last-mile</option>
            <option value="fleet">Dedicated fleet</option>
            <option value="returns">Reverse logistics and RTO</option>
            <option value="cod">Cash on delivery</option>
            <option value="fulfilment">Fulfilment and dark stores</option>
            <option value="storage">Storage and warehousing</option>
          </select>
        </label>
        <label className="block">
          <span className="u-data text-muted">Monthly volume</span>
          <select
            name="volume"
            className="mt-2 w-full rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
          >
            <option value="">Rough estimate</option>
            <option value="<500">Under 500 orders</option>
            <option value="500-2000">500 to 2,000</option>
            <option value="2000-10000">2,000 to 10,000</option>
            <option value=">10000">Over 10,000</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="u-data text-muted">Anything else?</span>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full resize-y rounded-[12px] border border-ink/15 bg-white px-4 py-3 text-ink outline-none focus:border-ink/50"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="u-data text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[14px] bg-ink px-6 py-4 text-base font-semibold text-paper transition-colors duration-200 hover:bg-ink/85 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
      </button>

      <p className="u-data text-center text-muted">
        We reply within one business day.
      </p>
    </form>
  );
}
