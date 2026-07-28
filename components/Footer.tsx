const COLUMNS = [
  {
    head: "Services",
    links: [
      { label: "Hyperlocal same-day", href: "#services" },
      { label: "Last-mile for 3PLs", href: "#services" },
      { label: "Dedicated fleet", href: "#services" },
      { label: "Reverse and RTO", href: "#services" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "How it runs", href: "#lifecycle" },
      { label: "Network", href: "#network" },
      { label: "Technology", href: "#technology" },
      { label: "Getting started", href: "#onboarding" },
      { label: "Our founder", href: "#founder" },
    ],
  },
  {
    head: "Get in touch",
    links: [
      { label: "Book a pilot", href: "#contact" },
      { label: "Integrations", href: "#integrations" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-8">
          <div>
            <p className="u-display text-xl">BM Xpress</p>
            <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-ink/65">
              Hyperlocal and last-mile delivery across West Bengal, on our own platform and
              our own rider network.
            </p>
            <p className="u-data mt-5 text-muted">
              BM Xpress Logistics Private Limited
              <br />
              Murshidabad, West Bengal, India
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.head}>
              <p className="u-eyebrow">{col.head}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[0.9rem] text-ink/65 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-data text-muted">
            &copy; {new Date().getFullYear()} BM Xpress Logistics Pvt Ltd
          </p>
          <p className="u-data text-muted">Built and run in-house</p>
        </div>
      </div>
    </footer>
  );
}
