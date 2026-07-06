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
      ["Dimmed Light", "Visibility Path", "Healthy Visibility"],
      ["Paper Crown", "Authentic Sovereignty Path", "Authentic Leadership"],
      ["Stalled Flame", "Action Path", "Purposeful Action"],
    ],
  },
  {
    element: "Air",
    archetype: "Magician",
    theme: "Expression, truth, and clarity",
    journeys: [
      ["Blank Page", "Creative Expression Path", "Authentic Expression"],
      ["Smoky Mirrors", "Truth Path", "Self-Honesty"],
      ["Mind Maze", "Clarity Path", "Clear Thinking"],
    ],
  },
  {
    element: "Water",
    archetype: "Lover",
    theme: "Feeling, connection, and regulation",
    journeys: [
      ["Emotional Lockdown", "Vulnerability Path", "Emotional Openness"],
      ["Fantasy Fog", "Connection Path", "Genuine Connection"],
      ["Flooded Waters", "Emotional Regulation Path", "Emotional Flow"],
    ],
  },
  {
    element: "Earth",
    archetype: "Warrior",
    theme: "Boundaries, trust, and vitality",
    journeys: [
      ["Compliance", "Boundaries Path", "Self-Respect"],
      ["Fortress", "Trust Path", "Connected Strength"],
      ["Barren Ground", "Vitality Path", "Inner Vitality"],
    ],
  },
];

const features = [
  "Triggered Pro",
  "Progress Dashboard",
  "Full Integration Journeys",
  "My Integrated Vision",
  "Meet Your Integrated Self",
  "Practices & Reflection Prompts",
  "Trigger History",
  "Personal Integration Tracking",
];

const transformationSteps = [
  {
    title: "Recognise the loop",
    text: "Use Triggered Pro to log real-life triggers and identify which Shadow Loops are repeating most often.",
  },
  {
    title: "Understand the pattern over time",
    text: "Use the Progress Dashboard to see recurring triggers, people, environments, loops, and integration focus.",
  },
  {
    title: "Practise your Integration Journey",
    text: "Follow the path from your Shadow Loop toward your Integrated Self through practices, prompts, and reflection.",
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
  ArcheLoop Integration
</p>

<p className="mt-4 text-sm uppercase tracking-[0.3em] text-yellow-300/60">
  Understand • Interrupt • Integrate
</p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            The report shows the loop.
            <br />
            Integration helps you change it.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
  ArcheLoop Integration is your ongoing practice for recognising Shadow Loops,
  interrupting automatic reactions, and developing a more integrated way of being.
</p>

<p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-400">
  It helps you move from understanding the pattern to living from your
  Integrated Self.
</p>

          <div className="mx-auto mt-10 max-w-md rounded-[2rem] border border-yellow-300/20 bg-black/30 p-6">
            <p className="text-lg text-stone-500 line-through">£29/month</p>

            <p className="mt-1 text-3xl font-bold text-yellow-300">
              £14.99/month
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              Includes Triggered Pro, Progress Dashboard, Integration Journeys, 
              My Integrated Vision, reflection tools, and personal integration tracking.
            </p>

            <p className="mt-5 text-sm text-stone-500">
              Cancel anytime. Subscription renews monthly.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/checkout?product=integration"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start Integration
            </a>

            <a
              href="#journeys"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Preview Integration Journeys
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            How Integration Works
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
          Understand • Interrupt • Integrate
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Your ArcheLoop Report helps you understand the pattern. ArcheLoop Integration 
            helps you recognise it in everyday life, interrupt automatic reactions, 
            and practise living from your Integrated Self.
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
            Everything inside ArcheLoop Integration is designed to 
            help you recognise recurring Shadow Loops, interrupt automatic reactions, 
            and practise living from your Integrated Self.
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
              Integration Journeys
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Every Shadow Loop points toward your Integrated Self.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300"> 
              Preview the journey from protective pattern to healthier expression.
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
  .toLowerCase()
  .replaceAll(" ", "-");

                    return (
                      <Link
                        key={loop}
                        href={`/integration/${slug}`}
                       className="block rounded-2xl border border-yellow-300/20 bg-black/30 p-6 text-white transition hover:border-yellow-300/70 hover:bg-[#111827]"
                      >
                    <p className="text-base font-semibold text-stone-100">
  {loop}
</p>

<p
  className="mt-2 font-semibold"
  style={{ color: "#fcd34d" }}
>
  {path}
</p>

<div className="mt-5 h-px bg-yellow-300/10" />

<p className="mt-3 text-sm text-stone-500">
  Integrated Self
</p>

<p className="text-sm text-stone-300">
  {state}
</p>

<p className="mt-6 text-sm font-medium text-yellow-300/70">
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
            Begin living from your Integrated Self.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
           Start by logging your first trigger, then use your Progress Dashboard and 
           Integration Journey to recognise recurring patterns, interrupt automatic reactions, 
           and gradually live more often from your Integrated Self.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/checkout?product=integration"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start Integration
            </a>

            <a
              href="/checkout?product=bundle"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Choose Report + Integration
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm text-stone-500">
            ArcheLoop Integration is an educational self-awareness tool and
            is not a medical, psychiatric, therapeutic, or diagnostic service.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}