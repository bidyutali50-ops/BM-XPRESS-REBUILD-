const COLUMNS = [
  {
    head: "Services",
    links: [
      { label: "Hyperlocal same-day", href: "/#services" },
      { label: "Last-mile for 3PLs", href: "/#services" },
      { label: "Dedicated fleet", href: "/#services" },
      { label: "Storage and fulfilment", href: "/#fulfilment" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "How it runs", href: "/#lifecycle" },
      { label: "Getting started", href: "/#onboarding" },
    ],
  },
  {
    head: "Get in touch",
    links: [
      { label: "Get a quote", href: "/quote" },
      { label: "Track an order", href: "/track" },
      { label: "Integrations", href: "/#integrations" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

/** TODO: replace with the real company handles. */
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/bm-xpress" },
  { label: "Instagram", href: "https://www.instagram.com/bmxpress" },
];

/** Government / industry credential badges. Add more as they arrive. */
const BADGES = [
  {
    name: "Startup India",
    src: "/badges/startup-india.png",
    href: "https://www.startupindia.gov.in/",
    width: 1020,
    height: 227,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)] md:gap-8">
          <div>
            <img
              src="/logo.svg"
              alt="BM Xpress"
              width={186}
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-3 max-w-xs text-[0.9rem] leading-relaxed text-ink/65">
              Hyperlocal and last-mile delivery across West Bengal, on our own platform and
              our own rider network.
            </p>
            <p className="u-data mt-5 text-muted">
              BM Xpress Logistics Private Limited
              <br />
              Murshidabad, West Bengal, India
            </p>

            <ul className="mt-5 flex gap-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-data text-ink/65 underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="u-eyebrow text-muted">Recognitions</p>
              <div className="mt-3 flex flex-wrap items-center gap-6">
                {BADGES.map((b) => (
                  <a
                    key={b.name}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${b.name} — visit programme site`}
                    className="inline-flex items-center opacity-90 transition-opacity hover:opacity-100"
                  >
                    <img
                      src={b.src}
                      alt={b.name}
                      width={b.width}
                      height={b.height}
                      className="h-10 w-auto"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
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
          <ul className="flex gap-5">
            <li>
              <a href="/terms" className="u-data text-muted transition-colors hover:text-ink">
                Terms
              </a>
            </li>
            <li>
              <a href="/privacy" className="u-data text-muted transition-colors hover:text-ink">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
