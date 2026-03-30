import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <Hero />
      </main>
    </>
  );
}
