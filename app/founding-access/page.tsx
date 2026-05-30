import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function FoundingAccessPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="px-4 sm:px-6 py-20 sm:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              Founding Access
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Become one of the first
              <br />
              ArcheLoop members.
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Receive your full premium ArcheLoop report before public launch
              and help shape the future of the platform through real-world
              feedback and testing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div className="border border-zinc-800 rounded-3xl bg-zinc-950 p-6 sm:p-10">
              <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-8">
                What You Receive
              </p>

              <div className="space-y-5 text-gray-300">
                <p>✓ Full Premium ArcheLoop Report</p>

                <p>✓ Loop Landscape Analysis</p>

                <p>✓ Archetype Score Map</p>

                <p>✓ Healthy Expression & Shadow Pressure Mapping</p>

                <p>✓ Nervous System Pattern Analysis</p>

                <p>✓ Relational Activators & Emotional Triggers</p>

                <p>✓ Body Map Interpretation</p>

                <p>✓ Core Fear & Protection Pattern Analysis</p>

                <p>✓ Integration Blueprint</p>

                <p>✓ Personalised Loop Breakers</p>

                <p>✓ Priority Access To Future Features</p>

                <p>✓ Early Access To I Am Triggered™</p>
              </div>
            </div>

            <div className="border border-yellow-300/30 rounded-3xl bg-gradient-to-b from-yellow-300/10 to-black p-6 sm:p-10 flex flex-col justify-center text-center">
              <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm mb-5">
                Founding Access Code
              </p>

              <h2 className="text-4xl font-bold mb-6">
                First 50 reports are free.
              </h2>

              <p className="text-gray-300 leading-relaxed mb-8">
                Complete the ArcheLoop assessment, then use the Founding Access
                code below to unlock your full report for free in exchange for
                honest feedback.
              </p>

              <div className="inline-block max-w-full rounded-2xl border border-yellow-300/40 bg-black px-5 sm:px-10 py-6 mb-8 self-center">
                <p className="text-gray-400 uppercase tracking-[0.25em] text-xs mb-3">
                  Access Code
                </p>

                <p className="text-2xl sm:text-4xl font-bold text-yellow-300 tracking-widest break-words">
                  FOUNDING50
                </p>
              </div>

              <div>
                <a
                  href="/assessment"
                  className="inline-flex bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
                >
                  Take The Assessment
                </a>
              </div>

              <p className="mt-6 text-sm text-gray-500">
                No payment is required during the founding phase. Access is
                limited to the first 50 reports.
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-10 max-w-3xl mx-auto">
            ArcheLoop reports are educational self-development tools and are
            not medical, psychiatric, psychological, therapeutic, legal, or
            diagnostic services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}