import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-5xl space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              About ArcheLoop™
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Name the pattern.
              <br />
              Break the loop.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop is a symbolic self-awareness system for recognising,
              understanding, and interrupting recurring Shadow Loops.
            </p>
          </div>

          <div className="space-y-6">
            <Section title="How ArcheLoop began">
              <p>
                ArcheLoop began through years of personal shadow work,
                self-observation, journaling, archetypal psychology, nervous
                system work, and studying the relationship between human
                behaviour, emotion, and unconscious patterns.
              </p>

              <p>
                For around two years, I worked closely with a shadow work coach
                exploring recurring emotional reactions, childhood conditioning,
                identity patterns, archetypes, and unconscious protective
                behaviours.
              </p>

              <p>
                Later, when I could no longer continue formal coaching, I
                carried on the work independently — studying archetypes,
                elemental dynamics, symbolic psychology, somatic awareness, and
                recurring behavioural loops in my own life.
              </p>
            </Section>

            <Section title="Naming the shadows">
              <p>
                During this process, I noticed that many painful experiences were
                not isolated incidents. Different memories often carried the
                same emotional structure underneath.
              </p>

              <p>
                I began giving these repeating patterns names. One of the
                earliest was what I called the “Obedient Boy Trap” — a pattern
                where loyalty, suppression, and fear of disapproval kept healthy
                agency and boundaries trapped long after childhood had ended.
              </p>

              <p>
                Over time, I realised these patterns were not random. They
                appeared to form through recurring interactions between
                archetypal energies: collapse, compensation, collision,
                protection, and inner conflict.
              </p>
            </Section>

            <Section title="The ArcheLoop framework">
              <p>
                ArcheLoop eventually evolved into a system of four archetypal
                energies and twelve core Shadow Loops.
              </p>

              <p>
                The system is based on the idea that every person has access to
                all four archetypal energies — Fire, Air, Water, and Earth — but
                different life experiences can distort, suppress, inflate, or
                disconnect these energies from one another.
              </p>

              <p>
                Instead of seeing shadow work only as revisiting painful
                memories, ArcheLoop provides a structured symbolic map that helps
                people recognise the loop they are currently living inside.
              </p>
            </Section>

            <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                Core Principle
              </p>

              <h2 className="mt-5 text-4xl font-bold">
                You cannot interrupt a pattern you cannot see.
              </h2>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone-300">
                <p>
                  By naming recurring Shadow Loops, people often begin
                  recognising them in real time — in thoughts, relationships,
                  emotional reactions, behaviours, and nervous system states.
                </p>

                <p>
                  ArcheLoop is built around the belief that awareness creates
                  choice. You are not the loop. The loop is a pattern — and
                  patterns can change.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Find My Loop
            </a>

            <a
              href="/"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Return Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <h2 className="text-3xl font-semibold text-yellow-300">{title}</h2>

      <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone-300">
        {children}
      </div>
    </section>
  );
}