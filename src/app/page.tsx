import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <section id="home" className="min-h-screen flex items-center justify-center px-6">
          <h1 className="text-4xl font-heading text-text-bright">Dylan Wu</h1>
        </section>
      </main>
    </>
  );
}
