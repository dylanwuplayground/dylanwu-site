import Sidebar from "@/components/Sidebar";
import StatusBar from "@/components/StatusBar";
import Hero from "@/components/Hero";
import DomainExpertise from "@/components/DomainExpertise";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import TerminalTransition from "@/components/TerminalTransition";

export default function Home() {
  return (
    <>
      <Sidebar />
      <StatusBar />
      <main className="lg:ml-64 pt-10 min-h-screen">
        <Hero />
        <TerminalTransition command="cat expertise.log" />
        <DomainExpertise />
        <TerminalTransition command="cat experience.log --timeline" />
        <Experience />
        <TerminalTransition command="cat stack.config" />
        <TechStack />
        <TerminalTransition command="cat education.md" />
        <Education />
        <TerminalTransition command="open --inquiry" />
        <Contact />
      </main>
    </>
  );
}
