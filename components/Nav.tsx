"use client";

import { useState } from "react";
import GooeyNav from "./GooeyNav";

const PILLS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Network", href: "/#network" },
  { label: "FAQ", href: "/#faq" },
];

const MOBILE_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "How it runs", href: "/#lifecycle" },
  { label: "Network", href: "/#network" },
  { label: "Integrations", href: "/#integrations" },
  { label: "FAQ", href: "/#faq" },
  { label: "Track order", href: "/track" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 isolate border-b border-white/6 bg-ink text-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 overflow-hidden px-5 sm:px-8">
        <a href="/#top" className="flex shrink-0 items-baseline gap-2">
          <span className="u-display text-xl">BM Xpress</span>
          <span className="u-data hidden text-paper/45 sm:inline">BMX</span>
        </a>

        <div className="hidden lg:block">
          <GooeyNav items={PILLS} initialActiveIndex={0} />
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/track"
            className="u-data hidden shrink-0 rounded-full border border-paper/20 px-4 py-2 transition-colors hover:border-paper/50 sm:inline-block"
          >
            Track
          </a>
          <a
            href="/quote"
            className="u-data shrink-0 rounded-full bg-paper px-4 py-2 text-ink transition-transform duration-200 hover:-translate-y-0.5"
          >
            Get a quote
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="u-data rounded-full border border-paper/20 px-3 py-2 lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <ul className="border-t border-paper/10 bg-ink px-5 pb-4 pt-2 sm:px-8 lg:hidden">
          {MOBILE_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="u-data block py-2.5 text-paper/70 hover:text-paper"
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
