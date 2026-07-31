"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SpecularButton from "./SpecularButton";
import HeroScene from "./HeroScene";

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
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 py-1.5 pl-3 pr-4 backdrop-blur-sm">
            <span
              className="size-1.5 rounded-full bg-delivered"
              aria-hidden="true"
            />
            <span className="u-data text-ink/70">
              Live network across West Bengal
            </span>
          </span>

          <h1 className="u-display mt-7 text-[clamp(2.7rem,7vw,5rem)] leading-[0.94] tracking-tight">
            <span className="block">Bengal, delivered</span>
            <span className="block text-delivered">same day.</span>
          </h1>

          <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink/70">
            3,000+ orders handled every day. Hyperlocal, same-day, and next-day
            delivery on our own dispatch platform.
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

          {/* Tracking bar */}
          <form
            onSubmit={handleTrack}
            className="mt-10 max-w-md"
            aria-label="Track a shipment"
          >
            <label htmlFor="hero-awb" className="u-data block text-muted">
              Track a shipment
            </label>
            <div className="mt-3 flex items-stretch overflow-hidden rounded-full border border-ink/15 bg-white/80 shadow-[0_10px_30px_-18px_rgb(14_19_25/0.28)] backdrop-blur-sm focus-within:border-ink/40">
              <input
                id="hero-awb"
                type="text"
                inputMode="text"
                autoComplete="off"
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
                placeholder="Enter AWB or order ID"
                className="u-data min-w-0 flex-1 bg-transparent px-5 py-3 text-ink outline-none placeholder:text-ink/40"
              />
              <button
                type="submit"
                className="u-data shrink-0 bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-ink/85"
              >
                Track &rarr;
              </button>
            </div>
          </form>

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

        <div>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
