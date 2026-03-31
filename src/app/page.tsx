import Sidebar from "@/components/Sidebar";
import StatusBar from "@/components/StatusBar";
import Hero from "@/components/Hero";
import DomainExpertise from "@/components/DomainExpertise";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Sidebar />
      <StatusBar />
      <main className="lg:ml-64 pt-10 min-h-screen">
        <Hero />
        <DomainExpertise />
        <Experience />
        <TechStack />
        <Education />
        <Contact />
      </main>
    </>
  );
}
