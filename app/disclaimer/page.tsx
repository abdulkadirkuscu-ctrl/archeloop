import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative max-w-5xl mx-auto space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Disclaimer
            </p>

            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
              ArcheLoop is an educational self-development tool.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop is designed to support self-awareness, reflection,
              personal growth, and understanding of recurring emotional and
              behavioural patterns.
            </p>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
            <div className="space-y-6 text-lg leading-relaxed text-stone-300">
              <p>
                ArcheLoop is designed for educational, reflective, and personal
                development purposes only.
              </p>

              <p>
                ArcheLoop does not provide medical, psychiatric,
                psychological, legal, or therapeutic advice, diagnosis, or
                treatment.
              </p>

              <p>
                The archetypes, Shadow Loops, nervous system states,
                elemental dynamics, integration journeys, and practices
                presented on this website are symbolic frameworks intended to
                support self-awareness and reflection.
              </p>

              <p>
                ArcheLoop should not be used as a substitute for professional
                mental health care, medical treatment, crisis support, therapy,
                counselling, or legal advice.
              </p>

              <p>
                If you are experiencing significant emotional distress,
                mental health symptoms, trauma, or crisis-related experiences,
                please seek support from a qualified healthcare professional.
              </p>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Personal Responsibility
            </p>

            <p className="mt-6 text-2xl leading-relaxed text-stone-100">
              By using ArcheLoop, you acknowledge that all interpretations,
              decisions, actions, and outcomes remain your own responsibility.
            </p>

            <p className="mt-6 text-stone-300 leading-relaxed">
              ArcheLoop provides symbolic frameworks for reflection. It does
              not determine your choices, diagnose conditions, or replace
              professional guidance.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Return Home
            </a>

            <a
              href="/assessment"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Find My Loop
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}