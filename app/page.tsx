import LifecycleRail from "@/components/LifecycleRail";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HubStrip from "@/components/HubStrip";
import Lifecycle from "@/components/Lifecycle";
import Services from "@/components/Services";
import Network from "@/components/Network";
import Technology from "@/components/Technology";
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
        <Lifecycle />
        <Services />
        <Network />
        <Technology />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
