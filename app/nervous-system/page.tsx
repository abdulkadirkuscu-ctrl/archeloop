import PageShell from "../components/PageShell";

export default function NervousSystemPage() {
  const states = [
    {
      name: "Fight",
      description:
        "Fight activates when the nervous system believes protection requires force, control, confrontation, or intensity.",
      patterns: [
        "Irritability or anger",
        "Defensiveness",
        "Need to control",
        "Aggression or sharpness",
        "Tension in jaw, chest, or hands",
      ],
      archetypes:
        "Often activated through distorted Warrior or inflated Sovereign energy.",
      loops: ["Fortress", "Paper Crown", "Flooded Waters"],
      regulation:
        "Slow the body before trying to solve the situation. Ground through movement, breath, and physical safety.",
    },
    {
      name: "Flight",
      description:
        "Flight activates when the nervous system believes safety comes from escape, overthinking, movement, or staying mentally ahead.",
      patterns: [
        "Overthinking",
        "Restlessness",
        "Anxiety",
        "Perfectionism",
        "Difficulty slowing down",
      ],
      archetypes: "Often activated through distorted Magician energy.",
      loops: ["Mind Maze", "Smoky Mirrors", "Blank Page"],
      regulation:
        "Return attention to the body. Focus on one grounded action instead of solving everything mentally.",
    },
    {
      name: "Freeze",
      description:
        "Freeze activates when the nervous system perceives overwhelm and movement, expression, or decision-making become difficult. It can include immobilisation, shutdown, numbness, or collapse-like heaviness.",
      patterns: [
        "Mental fog",
        "Difficulty moving",
        "Feeling stuck",
        "Disconnection or numbness",
        "Heavy body or low energy",
        "Collapse into inaction",
      ],
      archetypes:
        "Often appears when Magician clarity, Warrior movement, or Sovereign direction becomes interrupted under stress.",
      loops: ["Blank Page", "Mind Maze", "Barren Ground", "Stalled Flame"],
      regulation:
        "Reduce pressure. Start with very small movement, gentle grounding, nervous system safety, and restoration before performance.",
    },
    {
      name: "Fawn",
      description:
        "Fawn activates when the nervous system prioritises approval, harmony, or adaptation to avoid rejection or conflict.",
      patterns: [
        "People pleasing",
        "Difficulty saying no",
        "Over-adapting",
        "Fear of disappointing others",
        "Loss of boundaries",
      ],
      archetypes:
        "Often linked to suppressed Warrior and distorted Lover energy.",
      loops: ["Compliance", "Emotional Lockdown", "Dimmed Light"],
      regulation:
        "Practise safe boundaries slowly. Build tolerance for honesty, disagreement, and taking up space.",
    },
  ];

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-12">
          <div className="al-hero-card">
            <p className="al-kicker">Nervous System Patterns</p>

            <h1 className="al-heading-xl">
              Understanding Survival States
            </h1>

            <p className="al-text-lg mt-8 max-w-4xl">
              Shadow Loops are not only psychological patterns. They can also
              connect with survival responses such as fight, flight, freeze, and
              fawn — protective states shaped by stress, emotion, memory, and
              relational safety.
            </p>
          </div>

          <div className="space-y-8">
            {states.map((state) => (
              <div key={state.name} className="al-card p-8">
                <p className="al-kicker">Survival State</p>

                <h2 className="mt-3 text-4xl font-bold text-[var(--al-accent)]">
                  {state.name}
                </h2>

                <p className="al-text-lg mt-5 max-w-4xl">
                  {state.description}
                </p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Common Patterns
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {state.patterns.map((pattern) => (
                        <li key={pattern} className="al-soft-card p-4">
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold">
                      Archetypal Connection
                    </h3>

                    <p className="al-text mt-5">
                      {state.archetypes}
                    </p>

                    <h3 className="mt-8 text-2xl font-semibold">
                      Common Loops
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {state.loops.map((loop) => (
                        <a
                          key={loop}
                          href={`/loops/${loop
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="al-badge transition hover:border-[var(--al-accent)]"
                        >
                          {loop}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="al-premium-card mt-8 p-6">
                  <p className="al-kicker">Regulation Focus</p>

                  <p className="mt-4 text-lg leading-relaxed">
                    {state.regulation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="/assessment" className="al-button-primary">
              Find My Loop
            </a>

            <a href="/triggered" className="al-button-secondary">
              I Am Triggered
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