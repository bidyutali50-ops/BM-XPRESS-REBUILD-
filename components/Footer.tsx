export default function Footer() {
  return (
    <footer className="border-t border-paper-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="u-display text-lg">BM Xpress Logistics Private Limited</p>
          <p className="u-data mt-1.5 text-muted">
            Murshidabad, West Bengal, India
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {["Services", "Network", "Technology", "Contact"].map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="u-data text-muted transition-colors hover:text-ink"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <p className="u-data text-muted">
          &copy; {new Date().getFullYear()} BM Xpress Logistics Pvt Ltd
        </p>
      </div>
    </footer>
  );
}
