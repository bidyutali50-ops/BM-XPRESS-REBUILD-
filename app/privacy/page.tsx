import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy — BM Xpress",
  robots: { index: false },
};

const SECTIONS = [
  {
    h: "What we collect",
    p: "When a client sends us an order we receive the recipient's name, delivery address, phone number, and the order reference. When someone contacts us through this site we receive whatever they put in the form. Our riders' location is recorded while they are punched in to a shift.",
  },
  {
    h: "Why we hold it",
    p: "Delivery addresses and phone numbers exist so a rider can find the door and call ahead. Order references exist so a shipment can be traced and reconciled. We do not sell any of it, and we do not use recipient data for our own marketing.",
  },
  {
    h: "How long we keep it",
    p: "Delivery records are retained for the period agreed with the client and for as long as tax and accounting rules require. Enquiry form submissions are kept until the enquiry is closed.",
  },
  {
    h: "Who else sees it",
    p: "The rider assigned to a delivery, our hub and operations staff, and the client whose order it is. We use third-party infrastructure providers to host the platform and they process data on our instructions.",
  },
  {
    h: "Your rights",
    p: "You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted where we are not required to keep it. Write to the address below and we will respond.",
  },
  {
    h: "Contact",
    p: "BM Xpress Logistics Private Limited, Murshidabad, West Bengal, India. Email hello@bmxpress.in.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="u-eyebrow">Legal</p>
        <h1 className="u-display mt-4 text-[clamp(2.1rem,5.5vw,3.4rem)]">Privacy policy</h1>

        <div className="mt-8 rounded-card border border-assigned/40 bg-assigned/10 p-5">
          <p className="u-data text-[color:var(--color-assigned)]">Draft — not yet reviewed</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/75">
            This is a starting point written from how the business actually operates. It
            is not legal advice and has not been checked against the DPDP Act 2023 or your
            client contracts. Have a lawyer review it before you rely on it.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="u-display text-xl">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{s.p}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
