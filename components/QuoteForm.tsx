"use client";

import { useState } from "react";

const SERVICES = [
  "Hyperlocal same-day",
  "Last-mile for 3PLs",
  "Dedicated fleet",
  "Reverse and RTO",
  "Storage and fulfilment",
];

const VOLUMES = ["Under 500", "500 to 2,000", "2,000 to 10,000", "Over 10,000"];

const FIELD =
  "u-data w-full rounded-[10px] border border-ink/20 bg-white/70 px-4 py-3 outline-none transition-colors focus:border-ink/50";

/**
 * TODO: post to a Supabase table or a form endpoint. Composing a mailto
 * keeps this working today with no backend and loses nothing but analytics.
 */
export default function QuoteForm() {
  const [f, setF] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    service: SERVICES[0],
    volume: VOLUMES[0],
    notes: "",
  });

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const ready = f.name.trim() && f.company.trim() && (f.email.trim() || f.phone.trim());

  const href = `mailto:hello@bmxpress.in?subject=${encodeURIComponent(
    `Quote request — ${f.company || "new enquiry"}`
  )}&body=${encodeURIComponent(
    [
      `Name: ${f.name}`,
      `Company: ${f.company}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
      `Pickup city: ${f.city}`,
      `Service: ${f.service}`,
      `Monthly orders: ${f.volume}`,
      "",
      f.notes,
    ].join("\n")
  )}`;

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      <input className={FIELD} placeholder="Your name" value={f.name} onChange={set("name")} />
      <input className={FIELD} placeholder="Company" value={f.company} onChange={set("company")} />
      <input className={FIELD} placeholder="Work email" type="email" value={f.email} onChange={set("email")} />
      <input className={FIELD} placeholder="Phone" type="tel" value={f.phone} onChange={set("phone")} />
      <input className={FIELD} placeholder="Pickup city or pincode" value={f.city} onChange={set("city")} />

      <select className={FIELD} value={f.service} onChange={set("service")} aria-label="Service">
        {SERVICES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select className={FIELD} value={f.volume} onChange={set("volume")} aria-label="Monthly orders">
        {VOLUMES.map((v) => (
          <option key={v}>{v} orders a month</option>
        ))}
      </select>

      <textarea
        className={`${FIELD} sm:col-span-2`}
        rows={4}
        placeholder="Anything else we should know — delivery windows, COD, returns volume"
        value={f.notes}
        onChange={set("notes")}
      />

      <div className="sm:col-span-2">
        <a
          href={ready ? href : undefined}
          aria-disabled={!ready}
          className={`inline-block rounded-full px-7 py-3.5 text-sm font-medium transition-transform duration-200 ${
            ready
              ? "bg-ink text-paper hover:-translate-y-0.5"
              : "pointer-events-none bg-ink/30 text-paper"
          }`}
        >
          Send enquiry
        </a>
        <p className="u-data mt-4 text-muted">
          Name, company, and one way to reach you. We reply the same working day.
        </p>
      </div>
    </div>
  );
}
