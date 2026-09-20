"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const SERVICES = [
  "Hyperlocal same-day",
  "Last-mile ecommerce",
  "Reverse pickup / RTO",
  "B2B bulk movement",
  "Air freight",
  "Warehousing / fulfilment",
] as const;

const VOLUMES = [
  "Under 100 / day",
  "100 – 500 / day",
  "500 – 2,000 / day",
  "2,000+ / day",
] as const;

const SALES_INBOX = "hello@bmxpress.in";

type Field =
  | "company"
  | "name"
  | "email"
  | "phone"
  | "cities"
  | "volume"
  | "service"
  | "notes";

const EMPTY: Record<Field, string> = {
  company: "",
  name: "",
  email: "",
  phone: "",
  cities: "",
  volume: "",
  service: "",
  notes: "",
};

export default function QuoteForm() {
  const params = useSearchParams();
  const [form, setForm] = useState<Record<Field, string>>({
    ...EMPTY,
    service: params.get("service") ?? "",
  });
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: Field) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSent(false);
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const phoneOk = form.phone.replace(/\D/g, "").length >= 10;
  const ready =
    form.company.trim().length > 1 &&
    form.name.trim().length > 1 &&
    emailOk &&
    phoneOk &&
    form.cities.trim().length > 1;

  const body = [
    `Company: ${form.company.trim()}`,
    `Contact: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Cities / pincodes: ${form.cities.trim()}`,
    `Expected volume: ${form.volume || "Not specified"}`,
    `Service needed: ${form.service || "Not specified"}`,
    "",
    "Notes:",
    form.notes.trim() || "—",
  ].join("\n");

  const mailto = `mailto:${SALES_INBOX}?subject=${encodeURIComponent(
    `Quote request — ${form.company.trim() || "New enquiry"}`
  )}&body=${encodeURIComponent(body)}`;

  const submit = () => {
    setTouched(true);
    if (!ready) return;
    setSent(true);
    window.location.href = mailto;
  };

  const inputClass =
    "u-data w-full rounded-[10px] border border-ink/15 bg-white/70 px-4 py-3 outline-none transition-colors focus:border-ink/50";
  const labelClass = "u-data block text-muted";
  const errorClass = "u-data mt-1.5 block text-assigned";

  return (
    <div className="mx-auto max-w-2xl rounded-card border border-paper-2 bg-white/60 p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="q-company" className={labelClass}>
            Company name
          </label>
          <input
            id="q-company"
            value={form.company}
            onChange={(e) => set("company")(e.target.value)}
            placeholder="Registered or trading name"
            className={`${inputClass} mt-2`}
          />
          {touched && form.company.trim().length < 2 && (
            <span className={errorClass}>Tell us who we are quoting for.</span>
          )}
        </div>

        <div>
          <label htmlFor="q-name" className={labelClass}>
            Your name
          </label>
          <input
            id="q-name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            autoComplete="name"
            className={`${inputClass} mt-2`}
          />
          {touched && form.name.trim().length < 2 && (
            <span className={errorClass}>Required.</span>
          )}
        </div>

        <div>
          <label htmlFor="q-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="q-phone"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            className={`${inputClass} mt-2`}
          />
          {touched && !phoneOk && (
            <span className={errorClass}>Enter a reachable number.</span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-email" className={labelClass}>
            Work email
          </label>
          <input
            id="q-email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            inputMode="email"
            autoComplete="email"
            className={`${inputClass} mt-2`}
          />
          {touched && !emailOk && (
            <span className={errorClass}>Enter a valid email address.</span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-cities" className={labelClass}>
            Cities or pincodes you need covered
          </label>
          <input
            id="q-cities"
            value={form.cities}
            onChange={(e) => set("cities")(e.target.value)}
            placeholder="Kolkata, Rajarhat, Murshidabad…"
            className={`${inputClass} mt-2`}
          />
          {touched && form.cities.trim().length < 2 && (
            <span className={errorClass}>
              Coverage decides the rate — give us at least one city.
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <span className={labelClass}>Service needed</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const on = form.service === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("service")(on ? "" : s)}
                  className={`u-data rounded-full border px-4 py-2 transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 text-ink/75 hover:border-ink/45"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <span className={labelClass}>Expected volume</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {VOLUMES.map((v) => {
              const on = form.volume === v;
              return (
                <button
                  key={v}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("volume")(on ? "" : v)}
                  className={`u-data rounded-full border px-4 py-2 transition-colors ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 text-ink/75 hover:border-ink/45"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-notes" className={labelClass}>
            Anything else we should know
          </label>
          <textarea
            id="q-notes"
            value={form.notes}
            onChange={(e) => set("notes")(e.target.value)}
            rows={4}
            placeholder="SLA expectations, current partner, integration needs, COD share…"
            className={`${inputClass} mt-2 resize-y leading-relaxed`}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={submit}
          className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
        >
          Send enquiry
        </button>
        <p className="u-data text-muted">We reply within one business day.</p>
      </div>

      {sent && (
        <div className="mt-6 rounded-[10px] border border-delivered/30 bg-delivered/5 p-5">
          <p className="u-data text-delivered">Opening your mail app</p>
          <p className="mt-2 leading-relaxed text-ink/75">
            If nothing opened, mail the details to{" "}
            <a className="u-data text-ink underline" href={`mailto:${SALES_INBOX}`}>
              {SALES_INBOX}
            </a>{" "}
            and we will pick it up from there.
          </p>
        </div>
      )}
    </div>
  );
}
