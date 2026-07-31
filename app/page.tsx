import LifecycleRail from "@/components/LifecycleRail";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Commitment from "@/components/Commitment";
import Services from "@/components/Services";
import Fulfilment from "@/components/Fulfilment";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import Lifecycle from "@/components/Lifecycle";
import Network from "@/components/Network";
import Integrations from "@/components/Integrations";
import Onboarding from "@/components/Onboarding";
import TrustedBy from "@/components/TrustedBy";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <LifecycleRail />
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Stats />
        <Commitment />
        <Services />
        <Fulfilment />
        <Industries />
        <Lifecycle />
        <Network />
        <Integrations />
        <Onboarding />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Credentials />
      <Footer />
    </>
  );
}
