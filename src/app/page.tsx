import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import DomainExpertise from "@/components/DomainExpertise";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <Hero />
        <DomainExpertise />
        <Experience />
      </main>
    </>
  );
}
