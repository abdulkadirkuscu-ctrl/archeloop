export default function NervousSystemPage() {
  const states = [
    {
      name: "Fight",
      colour: "border-red-500",
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
      colour: "border-blue-400",
      description:
        "Flight activates when the nervous system believes safety comes from escape, overthinking, movement, or staying mentally ahead.",
      patterns: [
        "Overthinking",
        "Restlessness",
        "Anxiety",
        "Perfectionism",
        "Difficulty slowing down",
      ],
      archetypes:
        "Often activated through distorted Magician energy.",
      loops: ["Mind Maze", "Smoky Mirrors", "Blank Page"],
      regulation:
        "Return attention to the body. Focus on one grounded action instead of solving everything mentally.",
    },

    {
      name: "Freeze",
      colour: "border-cyan-400",
      description:
        "Freeze activates when the nervous system perceives overwhelm and becomes immobilised between action and shutdown.",
      patterns: [
        "Mental fog",
        "Difficulty moving",
        "Feeling stuck",
        "Disconnection",
        "Collapse into inaction",
      ],
      archetypes:
        "Often appears when Air and Earth collide under stress.",
      loops: ["Blank Page", "Mind Maze", "Barren Ground"],
      regulation:
        "Reduce pressure. Start with very small movement, gentle grounding, and nervous system safety.",
    },

    {
      name: "Fawn",
      colour: "border-yellow-400",
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

    {
      name: "Collapse",
      colour: "border-zinc-500",
      description:
        "Collapse occurs when the nervous system becomes exhausted after prolonged overwhelm, survival stress, helplessness, or depletion.",
      patterns: [
        "Emotional numbness",
        "Exhaustion",
        "Hopelessness",
        "Heavy body",
        "Difficulty accessing motivation",
      ],
      archetypes:
        "Often linked to depleted Warrior, suppressed Lover, or collapsed Sovereign energy.",
      loops: ["Barren Ground", "Emotional Lockdown", "Dimmed Light"],
      regulation:
        "Prioritise restoration before performance. Safety, nourishment, rest, and support become essential.",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-yellow-300">Home</a>
        <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
        <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-yellow-300">Practices</a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Nervous System Patterns
          </p>

          <h1 className="text-6xl font-bold mb-8">
            Understanding Survival States
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-16">
            Shadow loops are not only psychological patterns.
            They are also nervous system responses shaped by stress,
            survival, emotion, memory, and protection.
          </p>

          <div className="space-y-10">

            {states.map((state) => (
              <div
                key={state.name}
                className={`border ${state.colour} rounded-3xl p-8 bg-zinc-950`}
              >

                <h2 className="text-4xl font-bold mb-5">
                  {state.name}
                </h2>

                <p className="text-gray-300 text-lg mb-8">
                  {state.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">

                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Common Patterns
                    </h3>

                    <ul className="space-y-3">
                      {state.patterns.map((pattern) => (
                        <li
                          key={pattern}
                          className="border border-zinc-800 rounded-xl p-4"
                        >
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4">
                      Archetypal Connection
                    </h3>

                    <p className="text-gray-300 mb-6">
                      {state.archetypes}
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">
                      Common Loops
                    </h3>

                    <div className="flex gap-3 flex-wrap">
                      {state.loops.map((loop) => (
                        <a
                          key={loop}
                          href={`/loops/${loop
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="border border-zinc-700 rounded-full px-4 py-2 hover:bg-white hover:text-black transition"
                        >
                          {loop}
                        </a>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="bg-white text-black rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-3">
                    Regulation Focus
                  </h3>

                  <p className="text-lg">
                    {state.regulation}
                  </p>
                </div>

              </div>
            ))}

          </div>

          <div className="flex gap-4 flex-wrap mt-16">

            <a
              href="/assessment"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Take Assessment
            </a>

            <a
              href="/triggered"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              I Am Triggered
            </a>

            <a
              href="/"
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Return Home
            </a>

          </div>

        </div>
      </section>
    </main>
  )
}