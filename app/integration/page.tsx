import Nav from "../components/Nav";
import Link from "next/link";
import Footer from "../components/Footer";

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
      ["Fantasy Fog", "Connection Path™", "Genuine Connection"],
      ["Flooded Waters", "Emotional Regulation Path™", "Emotional Flow"],
    ],
  },
  {
    element: "Earth",
    archetype: "Warrior",
    theme: "Boundaries, trust, and vitality",
    journeys: [
      ["Compliance", "Boundaries Path™", "Self-Respect"],
      ["Fortress", "Trust Path™", "Connected Strength"],
      ["Barren Ground", "Vitality Path™", "Inner Vitality"],
    ],
  },
];

const features = [
  "Trigger Tracking",
  "Loop Analytics",
  "Integration Journeys",
  "Reflection Prompts",
  "Daily Practices",
  "Progress Tracking",
  "Archetypal Development",
  "Personal Integration Dashboard",
];

export default function IntegrationPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            ArcheLoop Integration™
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Identify.
            <br />
            Track.
            <br />
            Integrate.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            Most people discover their patterns. Few people change them.
            ArcheLoop Integration™ is designed to help transform recurring
            Shadow Loops into healthy archetypal expression through awareness,
            reflection, and intentional practice.
          </p>

          <a
            href="#journeys"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Explore The 12 Integration Journeys
          </a>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Why Integration Matters
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Awareness is only the beginning.
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-7 text-xl leading-relaxed text-stone-300">
            <p>
              The ArcheLoop Assessment helps identify the loops shaping your
              emotions, behaviours, relationships, and reactions.
            </p>

            <p>The ArcheLoop Report helps explain why those loops formed.</p>

            <p>ArcheLoop Integration™ is designed to help transform them.</p>

            <p>
              Every Shadow Loop contains an invitation. The loop reveals where
              energy became stuck. The Integration Journey reveals the path
              forward.
            </p>
          </div>
        </div>
      </section>

      <section id="journeys" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              The 12 Integration Journeys™
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              Every loop has a path forward.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Each Shadow Loop reveals where energy became distorted. Each
              Integration Journey points toward the healthy expression waiting
              underneath.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {journeyGroups.map((group) => (
              <div
                key={group.element}
                className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
              >
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                  {group.archetype}
                </p>

                <h3 className="mt-3 text-4xl font-bold text-yellow-300">
                  {group.element}
                </h3>

                <p className="mt-3 text-stone-400">{group.theme}</p>

                <div className="mt-8 space-y-5">
                  {group.journeys.map(([loop, path, state]) => {
                    const slug = path
                      .replace("™", "")
                      .toLowerCase()
                      .replaceAll(" ", "-");

                    return (
                      <Link
                        key={loop}
                        href={`/integration/${slug}`}
                        className="block rounded-2xl border border-yellow-300/10 bg-black/30 p-5 transition hover:border-yellow-300/60 hover:bg-[#111827]"
                      >
                        <p className="font-semibold text-stone-100">{loop}</p>

                        <p className="mt-2 text-yellow-300">{path}</p>

                        <p className="mt-2 text-sm text-stone-400">
                          Integrated State: {state}
                        </p>

                        <p className="mt-4 text-sm text-yellow-300/60">
                          View Journey →
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Coming Soon
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            The ArcheLoop Integration Platform
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-relaxed text-stone-300">
            Future ArcheLoop Integration members will be able to follow
            personalised Integration Journeys™, access guided practices, track
            long-term archetypal development, and transform recurring Shadow
            Loops into healthy expression over time.
          </p>

          <div className="mt-14 grid gap-5 text-left md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-stone-300"
              >
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <h2 className="text-4xl font-bold md:text-6xl">
            The journey does not end with the report.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            The report reveals the loop. Integration transforms it.
          </p>

          <a
            href="/assessment"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Take The Assessment
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}