import LifecycleRail from "@/components/LifecycleRail";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HubStrip from "@/components/HubStrip";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Lifecycle from "@/components/Lifecycle";
import Network from "@/components/Network";
import Integrations from "@/components/Integrations";
import Technology from "@/components/Technology";
import Onboarding from "@/components/Onboarding";
import TrustedBy from "@/components/TrustedBy";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <LifecycleRail />
      <Nav />
      <main>
        <Hero />
        <HubStrip />
        <Stats />
        <Services />
        <Industries />
        <Lifecycle />
        <Network />
        <Integrations />
        <Technology />
        <Onboarding />
        <TrustedBy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
