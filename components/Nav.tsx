"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const LINKS = [
  { href: "#lifecycle", label: "How it runs" },
  { href: "#services", label: "Services" },
  { href: "#network", label: "Network" },
  { href: "#technology", label: "Technology" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(root.current, { y: -24, opacity: 0, duration: 0.7, delay: 0.1 });
    },
    { scope: root }
  );

  return (
    <header
      ref={root}
      className="sticky top-0 z-50 border-b border-paper-2/80 bg-paper/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="u-display text-xl">BM Xpress</span>
          <span className="u-data hidden text-muted sm:inline">BMX</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="u-data text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="u-data rounded-full bg-ink px-4 py-2 text-paper transition-transform duration-200 hover:-translate-y-0.5"
        >
          Book a pilot
        </a>
      </nav>
    </header>
  );
}
