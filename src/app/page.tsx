import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Services from "@/components/sections/Services";
import Cases from "@/components/sections/Cases";
import Process from "@/components/sections/Process";
import Manifesto from "@/components/sections/Manifesto";
import Studio from "@/components/sections/Studio";
import TechMarquee from "@/components/sections/TechMarquee";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Services />
        <Cases />
        <Process />
        <Manifesto />
        <Studio />
        <TechMarquee />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
