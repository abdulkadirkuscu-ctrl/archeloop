import Nav from "../components/Nav";
import Link from "next/link";
import Footer from "../components/Footer";
import TrackPageView from "../../components/TrackPageView";

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
  "Triggered Pro™",
  "Progress Dashboard™",
  "Full Integration Journeys™",
  "My Integrated Vision™",
  "Meet Your Integrated Self™",
  "Practices & Reflection Prompts",
  "Trigger History",
  "Personal Integration Tracking",
];

const transformationSteps = [
  {
    title: "Notice the loop in real life",
    text: "Use Triggered Pro™ to log real-life activations and identify which Shadow Loops™ are repeating most often.",
  },
  {
    title: "Understand the pattern over time",
    text: "Use the Progress Dashboard™ to see recurring triggers, people, environments, loops, and integration focus.",
  },
  {
    title: "Practise your Integration Journey™",
    text: "Follow the path from your Shadow Loop™ toward your Integrated Self™ through practices, prompts, and reflection.",
  },
];

export default function IntegrationPage() {
 
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />
      <TrackPageView eventName="integration_opened" eventValue="integration_page" />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            ArcheLoop Integration™
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            The report shows the loop.
            <br />
            Integration helps you change it.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            ArcheLoop Integration™ is the monthly transformation system that
            helps you track real-life activations, follow your Integration
            Journey™, practise new responses, and move toward your Integrated
            Self™.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-[2rem] border border-yellow-300/20 bg-black/30 p-6">
            <p className="text-lg text-stone-500 line-through">£29/month</p>

            <p className="mt-1 text-3xl font-bold text-yellow-300">
              Free Founding Access
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              Available while ArcheLoop™ is being refined with early users.
            </p>
            <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-left">
  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
    Founding Access Notice
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-400">
    ArcheLoop Integration™ is temporarily available during Founding Access
    while the platform is being refined and tested with early users.
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-500">
    Future access to ArcheLoop Integration™, Triggered Pro™, Progress
    Dashboard™, and Integration Journeys™ may require an active subscription
    after public launch. Founding Access does not guarantee free lifetime
    access.
  </p>
</div>

<p className="mt-5 text-sm text-stone-500">
  Future public pricing: £29/month
</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/triggered-intelligence"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
             Start With Triggered Pro™
            </a>

            <a
              href="#journeys"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Preview Integration Journeys™
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            What Integration Does
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            From awareness into transformation.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Your ArcheLoop Report™ helps you understand the Shadow Loop™.
            ArcheLoop Integration™ helps you notice it, interrupt it, practise
            beyond it, and track your progress over time.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {transformationSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6 text-left"
              >
                <h3 className="text-2xl font-bold text-yellow-300">
                  {step.title}
                </h3>

                <p className="mt-4 leading-relaxed text-stone-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            What Integration Includes
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            One system for real-life pattern change.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Everything inside ArcheLoop Integration™ is designed to help you
            move from understanding your Shadow Loop™ to practising your
            Integrated Self™.
          </p>

          <div className="mt-12 grid gap-5 text-left md:grid-cols-2">
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

      <section id="journeys" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Integration Journeys™
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Every Shadow Loop™ has a path forward.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Preview the pathway from Shadow Loop™ to Integrated State. Full
              journeys include awareness, interruption, embodiment, practices,
              reflection prompts, Integrated Self™ guidance, and integration
              statements.
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
                          Preview Journey →
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

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Begin Integration
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            Start practising beyond the loop.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Start Integration™ by logging your first activation in Triggered Pro™, then use your
            Progress Dashboard™ and Integration Journey™ to track the path
            toward your Integrated Self™.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/triggered-intelligence"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
             Start With Triggered Pro™
            </a>

            <a
              href="/progress-dashboard"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              View Progress Dashboard™
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}