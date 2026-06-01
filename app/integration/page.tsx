import Nav from "../components/Nav"
import Footer from "../components/Footer"

const journeyGroups = [
  {
    element: "Fire",
    archetype: "Sovereign",
    theme: "Visibility, worth, and action",
    journeys: [
      ["Dimmed Light", "Visibility Path™", "Healthy Visibility"],
      ["Paper Crown", "Authentic Sovereignty Path™", "Authentic Leadership"],
      ["Stalled Flame", "Action Path™", "Purposeful Action"],
    ],
  },
  {
    element: "Air",
    archetype: "Magician",
    theme: "Expression, truth, and clarity",
    journeys: [
      ["Blank Page", "Creative Expression Path™", "Authentic Expression"],
      ["Smoky Mirrors", "Truth Path™", "Self-Honesty"],
      ["Mind Maze", "Clarity Path™", "Clear Thinking"],
    ],
  },
  {
    element: "Water",
    archetype: "Lover",
    theme: "Feeling, connection, and regulation",
    journeys: [
      ["Emotional Lockdown", "Vulnerability Path™", "Emotional Openness"],
      ["Fantasy Fog", "Connection Path™", "Grounded Intimacy"],
      ["Flooded Waters", "Emotional Regulation Path™", "Emotional Flow"],
    ],
  },
  {
    element: "Earth",
    archetype: "Warrior",
    theme: "Boundaries, trust, and worth",
    journeys: [
      ["Compliance", "Boundaries Path™", "Self-Respect"],
      ["Fortress", "Trust Path™", "Connected Strength"],
      ["Barren Ground", "Self-Worth Path™", "Inner Value"],
    ],
  },
]

const features = [
  "Trigger Tracking",
  "Loop Analytics",
  "Integration Journeys",
  "Reflection Prompts",
  "Daily Practices",
  "Progress Tracking",
  "Archetypal Development",
  "Personal Integration Dashboard",
]

export default function IntegrationPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-32 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.14),transparent_45%)]" />

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            ArcheLoop Integration™
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Identify.
            <br />
            Track.
            <br />
            Integrate.
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Most people discover their patterns. Few people change them.
            ArcheLoop Integration™ is designed to help transform recurring
            Shadow Loops into healthy archetypal expression through awareness,
            reflection, and intentional practice.
          </p>

          <a
            href="#journeys"
            className="inline-flex mt-10 bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
          >
            Explore The 12 Integration Journeys
          </a>
        </div>
      </section>

      <section className="px-6 py-28 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Why Integration Matters
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Awareness is only the beginning.
          </h2>

          <div className="space-y-6 text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <p>
              The ArcheLoop Assessment helps identify the loops shaping your
              emotions, behaviours, relationships, and reactions.
            </p>

            <p>
              The ArcheLoop Report helps explain why those loops formed.
            </p>

            <p>
              ArcheLoop Integration™ is designed to help transform them.
            </p>

            <p>
              Every Shadow Loop contains an invitation. The loop reveals where
              energy became stuck. The Integration Journey reveals the path
              forward.
            </p>
          </div>
        </div>
      </section>

      <section
        id="journeys"
        className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              The 12 Integration Journeys™
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Every loop has a path forward.
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Each Shadow Loop reveals where energy became distorted. Each
              Integration Journey points toward the healthy expression waiting
              underneath.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {journeyGroups.map((group) => (
              <div
                key={group.element}
                className="border border-zinc-800 rounded-[2rem] bg-black/60 p-8"
              >
                <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-3">
                  {group.archetype}
                </p>

                <h3 className="text-3xl font-bold mb-3 text-yellow-300">
                  {group.element}
                </h3>

                <p className="text-gray-400 mb-8">
                  {group.theme}
                </p>

                <div className="space-y-5">
                  {group.journeys.map(([loop, path, state]) => (
                    <div
                      key={loop}
                      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                    >
                      <p className="text-white font-semibold">
                        {loop}
                      </p>

                      <p className="mt-2 text-yellow-300">
                        {path}
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Integrated State: {state}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Coming Soon
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            The ArcheLoop Integration Platform
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-16">
            Future ArcheLoop Integration members will be able to track recurring
            triggers, identify dominant loops, follow personalised Integration
            Journeys, and monitor progress over time.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {features.map((feature) => (
              <div
                key={feature}
                className="border border-zinc-800 rounded-2xl bg-zinc-950 p-6 text-gray-300"
              >
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            The journey does not end with the report.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            The report reveals the loop. Integration transforms it.
          </p>

          <a
            href="/assessment"
            className="inline-flex bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
          >
            Take The Assessment
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}