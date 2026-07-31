"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SpecularButton from "./SpecularButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const [awb, setAwb] = useState("");

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    const clean = awb.trim();
    router.push(clean ? `/track?awb=${encodeURIComponent(clean)}` : "/track");
  };

  const heroStyle = useMemo(
    () => ({
      background: `
        radial-gradient(45% 55% at 10% 15%, color-mix(in oklab, var(--color-transit) 8%, #ffffff) 0%, transparent 65%),
        radial-gradient(45% 55% at 92% 82%, color-mix(in oklab, var(--color-delivered) 7%, #ffffff) 0%, transparent 65%),
        linear-gradient(180deg, #ffffff 0%, #f7faf6 100%)
      `,
    }),
    []
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate overflow-hidden"
      style={heroStyle}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <span
              className="size-1.5 rounded-full bg-delivered"
              aria-hidden="true"
            />
            <span className="u-data text-ink/70">
              Live network
            </span>
          </span>

          <h1 className="u-display mt-7 max-w-2xl text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] tracking-tight">
            India&rsquo;s trusted{" "}
            <span className="text-delivered">last-mile delivery partner.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
            BM Xpress provides technology-driven last-mile delivery, hyperlocal
            fulfilment, dedicated fleets, and enterprise logistics solutions that
            help businesses deliver faster, reduce costs, and scale with
            confidence.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <SpecularButton
              size="md"
              radius={999}
              tint="#0e1319"
              tintOpacity={1}
              textColor="#f2f4f1"
              lineColor="#2f9e6b"
              baseColor="#1a222c"
              intensity={1.25}
              shineSize={9}
              shineFade={32}
              thickness={1.2}
              proximity={280}
              onClick={() => router.push("/quote")}
            >
              Get a quote
            </SpecularButton>
            <a
              href="#services"
              className="rounded-full border border-ink/15 bg-white/60 px-7 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors duration-200 hover:border-ink/40 hover:bg-white"
            >
              What we deliver
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-10 gap-y-2">
            <span className="u-display text-[clamp(1.1rem,2.2vw,1.55rem)] font-bold text-transit">
              Under 60 min
            </span>
            <span className="u-display text-[clamp(1.1rem,2.2vw,1.55rem)] font-bold text-assigned">
              Same-day
            </span>
            <span className="u-display text-[clamp(1.1rem,2.2vw,1.55rem)] font-bold text-delivered">
              Next-day
            </span>
          </div>
        </div>

        {/* Right column: prominent tracking card */}
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <div className="rounded-[24px] border border-ink/10 bg-white p-7 shadow-[0_30px_80px_-30px_rgb(14_19_25/0.18)] sm:p-9">
            <div className="flex items-center gap-2">
              <span
                className="size-2 rounded-full bg-delivered"
                aria-hidden="true"
              />
              <span className="u-eyebrow">Live tracking</span>
            </div>

            <h2 className="u-display mt-4 text-[clamp(1.7rem,3.5vw,2.15rem)] leading-tight">
              Track your shipment.
            </h2>

            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
              Enter your AWB or order ID and land straight on the timeline —
              acceptance, pickup, transit, doorstep.
            </p>

            <form onSubmit={handleTrack} className="mt-7 space-y-3">
              <label htmlFor="hero-awb" className="sr-only">
                Tracking or waybill number
              </label>
              <input
                id="hero-awb"
                type="text"
                inputMode="text"
                autoComplete="off"
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
                placeholder="BMX-00000"
                className="u-data w-full rounded-[14px] border border-ink/15 bg-paper/50 px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/50 focus:bg-white"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-ink px-5 py-4 text-base font-semibold text-paper transition-colors duration-200 hover:bg-ink/85"
              >
                Track order
                <span aria-hidden="true">&rarr;</span>
              </button>
            </form>

            <div className="mt-6 flex items-start gap-2 border-t border-paper-2 pt-5">
              <span
                className="mt-1 size-1.5 shrink-0 rounded-full bg-transit"
                aria-hidden="true"
              />
              <p className="text-[0.85rem] leading-relaxed text-ink/60">
                Don&rsquo;t have an AWB yet?{" "}
                <a
                  href="/quote"
                  className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  Talk to sales &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
