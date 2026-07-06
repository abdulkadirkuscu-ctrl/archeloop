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
              About ArcheLoop
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Name the pattern.
              <br />
              Break the loop.
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-stone-300">
              ArcheLoop is an integrative archetypal self-awareness framework
              that helps people recognise recurring Shadow Loops, interrupt
              automatic reactions, and develop a more integrated way of being.
            </p>
          </div>

          <div className="space-y-6">
            <Section title="How ArcheLoop began">
              <p>
                ArcheLoop grew from years of self-observation, journaling,
                shadow work, archetypal psychology, nervous system education,
                and a deep curiosity about why certain emotional patterns seemed
                to repeat throughout life.
              </p>

              <p>
                Early in that journey I worked with a shadow work coach,
                exploring recurring emotional reactions, identity,
                relationships, childhood conditioning, and unconscious
                protective behaviours. As the work deepened, I continued that
                exploration independently, studying archetypal psychology,
                symbolic systems, somatic awareness, and recurring behavioural
                patterns.
              </p>

              <p>
                Over time I became less interested in asking,
                <em> "What happened to me?" </em>
                and more interested in asking,
                <em> "Why does this pattern keep repeating?"</em>
              </p>

              <p>
                That question became the starting point for everything that
                would eventually become ArcheLoop.
              </p>
            </Section>

            <Section title="Recognising the patterns">
              <p>
                As I continued this work, I noticed something unexpected.
                Although life presented different situations, many emotional
                reactions shared the same underlying structure. The people,
                places, and circumstances changed, but the internal pattern
                often remained remarkably consistent.
              </p>

              <p>
                I began giving these recurring patterns names. Naming them made
                them easier to recognise, observe, and eventually interrupt.
                Instead of seeing every difficult experience as a separate
                problem, I started recognising recurring protective strategies
                that appeared across many different areas of life.
              </p>

              <p>
                That shift changed everything. The goal was no longer to analyse
                every memory or determine who was to blame. The goal became
                recognising the pattern itself. Once a pattern could be seen, it
                became possible to respond differently.
              </p>
            </Section>

            <Section title="From personal insight to a framework">
              <p>
                As the work developed, I began studying how different
                archetypal energies interact under pressure. Drawing inspiration
                from archetypal psychology, I explored how four fundamental
                human functions — represented in ArcheLoop as Fire
                (Sovereign), Air (Magician), Water (Lover), and Earth
                (Warrior) — could become either integrated or protective.
              </p>

              <p>
                Rather than viewing emotional struggles as isolated problems, I
                began recognising recurring dynamics created by the interaction
                of these archetypal energies. Sometimes an energy collapsed.
                Sometimes it compensated for another. Sometimes two opposing
                energies collided. These recurring adaptations eventually
                evolved into twelve distinct Shadow Loops.
              </p>

              <p>
                Over time the framework expanded beyond archetypes alone.
                ArcheLoop integrates body awareness, nervous system activation,
                emotional patterns, thought patterns, core beliefs, relational
                dynamics, behavioural responses, and practical self-observation
                into one coherent system for recognising recurring patterns and
                moving toward healthier integration.
              </p>
            </Section>

            <Section title="The ArcheLoop philosophy">
              <p>
                ArcheLoop is based on a simple observation: every person has
                access to four fundamental archetypal energies. When these
                energies are balanced, they support healthy visibility,
                perception, connection, and grounded action.
              </p>

              <p>
                Under stress, however, these same energies may collapse,
                compensate, or collide with one another, creating recurring
                Shadow Loops. These adaptations can influence thoughts,
                emotions, behaviours, relationships, and nervous system
                responses without us fully realising it.
              </p>

              <p>
                Every person's story is unique, and every experience deserves
                compassion. ArcheLoop is not designed to reduce people to
                categories. Instead, it offers a practical language for
                recognising recurring patterns so they can be understood,
                interrupted, and gradually integrated.
              </p>
            </Section>

            <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                Core Principle
              </p>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Awareness is the beginning of integration.
              </h2>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone-300">
                <p>
                  ArcheLoop is built on a simple idea: when recurring patterns
                  become visible, new choices become possible.
                </p>

                <p>
                  By recognising Shadow Loops in real time — through thoughts,
                  emotions, body sensations, behaviours, relationships, and
                  nervous system responses — you begin creating space between
                  the trigger and the reaction.
                </p>

                <p>
                  You are not the loop. The loop is a learned protective
                  pattern. Patterns can be recognised, interrupted, and
                  integrated.
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
              href="/what-is-archeloop"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Learn the Framework
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
      <h2 className="text-2xl font-semibold text-yellow-300 md:text-3xl">
        {title}
      </h2>

      <div className="mt-6 space-y-5 text-lg leading-relaxed text-stone-300">
        {children}
      </div>
    </section>
  );
}