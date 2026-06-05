import Footer from "../components/Footer";
import Nav from "../components/Nav";

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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-12">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Nervous System Patterns
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              Understanding Survival States
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-stone-300">
             Shadow Loops are not only psychological patterns. They can also
connect with familiar survival responses such as fight, flight,
freeze, and fawn — protective states shaped by stress, emotion,
memory, and relational safety.
            </p>
          </div>

          <div className="space-y-8">
            {states.map((state) => (
              <div
                key={state.name}
                className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_55px_rgba(216,183,120,0.06)]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                  Survival State
                </p>

                <h2 className="mt-3 text-4xl font-bold text-yellow-300">
                  {state.name}
                </h2>

                <p className="mt-5 max-w-4xl text-lg leading-relaxed text-stone-300">
                  {state.description}
                </p>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-100">
                      Common Patterns
                    </h3>

                    <ul className="mt-5 space-y-3">
                      {state.patterns.map((pattern) => (
                        <li
                          key={pattern}
                          className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                        >
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-stone-100">
                      Archetypal Connection
                    </h3>

                    <p className="mt-5 leading-relaxed text-stone-300">
                      {state.archetypes}
                    </p>

                    <h3 className="mt-8 text-2xl font-semibold text-stone-100">
                      Common Loops
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {state.loops.map((loop) => (
                        <a
                          key={loop}
                          href={`/loops/${loop
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
                        >
                          {loop}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-6">
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/70">
                    Regulation Focus
                  </p>

                  <p className="mt-4 text-lg leading-relaxed text-stone-100">
                    {state.regulation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Find My Loop
            </a>

            <a
              href="/triggered"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              I Am Triggered
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