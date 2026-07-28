"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/#fulfilment", label: "Fulfilment" },
  { href: "/#network", label: "Network" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.current, { y: -24, opacity: 0, duration: 0.7, delay: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <header
      ref={root}
      className="sticky top-0 z-50 border-b border-paper-2/80 bg-paper/92 backdrop-blur-[6px]"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-baseline gap-2">
          <span className="u-display text-xl">BM Xpress</span>
          <span className="u-data hidden text-muted sm:inline">BMX</span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="u-data text-ink/70 transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/track"
            className="u-data hidden shrink-0 rounded-full border border-ink/20 px-4 py-2 transition-colors hover:border-ink/50 sm:inline-block lg:hidden xl:inline-block"
          >
            Track
          </a>
          <a
            href="/quote"
            className="u-data shrink-0 rounded-full bg-ink px-4 py-2 text-paper transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get a quote
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="u-data rounded-full border border-ink/20 px-3 py-2 lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-paper-2 bg-paper px-5 pb-4 pt-2 sm:px-8 lg:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="u-data block py-2.5 text-ink/70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
