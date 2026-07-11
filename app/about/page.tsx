import PageShell from "../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container space-y-10">
          <div className="al-hero-card">
            <p className="al-kicker">About ArcheLoop</p>

            <h1 className="al-heading-xl">
              Name the pattern.
              <br />
              Break the loop.
            </h1>

            <p className="al-text-lg mt-8 max-w-3xl">
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

            <div className="al-premium-card p-10">
              <p className="al-kicker">Core Principle</p>

              <h2 className="al-heading-lg">
                Awareness is the beginning of integration.
              </h2>

              <div className="al-text-lg mt-8 space-y-5">
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
            <a href="/assessment" className="al-button-primary">
              Find My Loop
            </a>

            <a href="/what-is-archeloop" className="al-button-secondary">
              Learn the Framework
            </a>

            <a href="/" className="al-button-secondary">
              Return Home
            </a>
          </div>
        </div>
      </section>
    </PageShell>
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
    <section className="al-card p-8">
      <h2 className="text-2xl font-semibold text-[var(--al-accent)] md:text-3xl">
        {title}
      </h2>

      <div className="al-text-lg mt-6 space-y-5">
        {children}
      </div>
    </section>
  );
}