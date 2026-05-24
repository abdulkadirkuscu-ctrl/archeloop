import type { Metadata } from "next"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

const flow = [
  ["1", "Relational Trigger", "Something happens externally: criticism, confusion, pressure, distance, intensity, or invalidation."],
  ["2", "Nervous System Activation", "The body reacts: tight chest, foggy mind, heat, collapse, tension, shutdown, or hypervigilance."],
  ["3", "Archetypal Adaptation", "One archetypal function becomes defensive, inflated, suppressed, or compensatory."],
  ["4", "Shadow Loop", "A recurring loop begins: Paper Crown, Mind Maze, Fortress, Fantasy Fog, Compliance, or another pattern."],
  ["5", "Behavioural Response", "You may over-explain, withdraw, prove, freeze, defend, collapse, chase, or shut down."],
  ["6", "Integration / Exit", "You return through grounding, boundaries, clear expression, emotional regulation, or embodied action."],
]

const examples = [
  ["Status pressure", "Paper Crown / Dimmed Light", "proving, shrinking, over-performing"],
  ["Confusing communication", "Blank Page / Smoky Mirrors", "mental freeze, doubt, over-explaining"],
  ["Emotional unpredictability", "Fortress / Emotional Lockdown", "withdrawal, guardedness, shutdown"],
  ["Fantasy or inflated stories", "Mind Maze / Warrior compensation", "reality-checking, tension, control"],
]
export const metadata: Metadata = {
  title: "Dynamic Relational Activation",
  description:
    "Explore how different interactions activate archetypal adaptations, nervous system responses, and recurring shadow loops.",
}

export default function RelationalDynamicsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[0.35em] text-gray-500 mb-4">
          Dynamic Relational Activation
        </p>

        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          Different people activate different loops.
        </h1>

        <p className="text-2xl text-gray-300 max-w-4xl leading-relaxed mb-20">
          Shadow Loops are not always fixed personality traits. They can be
          adaptive states activated by relational environments, nervous system
          responses, and archetypal survival patterns.
        </p>

        <div className="border border-yellow-400 rounded-3xl p-8 bg-zinc-950 mb-24">
          <h2 className="text-3xl font-bold mb-4">
            Core Idea
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            ArcheLoop asks not only “What loop am I in?” but also:
            <span className="text-yellow-300 font-semibold">
              {" "}“What interaction activated this adaptation?”
            </span>
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-10">
          The Relational Activation Model
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {flow.map(([number, title, text]) => (
            <div
              key={title}
              className="border border-zinc-800 bg-zinc-950 rounded-3xl p-6"
            >
              <p className="text-yellow-300 text-3xl font-bold mb-4">
                {number}
              </p>

              <h3 className="text-2xl font-bold mb-4">
                {title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold mb-10">
          Examples of Relational Activation
        </h2>

        <div className="space-y-5 mb-24">
          {examples.map(([trigger, loop, response]) => (
            <div
              key={trigger}
              className="grid md:grid-cols-3 gap-6 border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
            >
              <div>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-sm mb-2">
                  Relational Trigger
                </p>
                <p className="text-xl font-semibold">{trigger}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-sm mb-2">
                  Possible Loops
                </p>
                <p className="text-xl text-yellow-300 font-semibold">{loop}</p>
              </div>

              <div>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-sm mb-2">
                  Behavioural Response
                </p>
                <p className="text-gray-300">{response}</p>
              </div>
            </div>
          ))}
        </div>
<section className="mt-24 px-6 py-28 border-t border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Loop Interaction Examples
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        One loop can activate another.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        ArcheLoop looks at relational patterns dynamically: how one person’s
        activated state may trigger, intensify, protect, or compensate inside
        another system.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        [
          "Fantasy Fog ↔ Fortress",
          "Longing, projection, or emotional fantasy may activate distance, guardedness, or withdrawal. Withdrawal may then intensify longing.",
        ],
        [
          "Flooded Waters ↔ Emotional Lockdown",
          "Emotional intensity may activate shutdown. Shutdown may then increase urgency, protest, or fear of disconnection.",
        ],
        [
          "Paper Crown ↔ Compliance",
          "Achievement pressure, status, or conditional approval may activate adaptation, pleasing, or self-suppression.",
        ],
        [
          "Mind Maze ↔ Stalled Flame",
          "Over-analysis may interrupt action. Lack of movement may then create more uncertainty and mental looping.",
        ],
      ].map(([title, description]) => (
        <div
          key={title}
          className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
              {title}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
</section>

<div className="max-w-5xl mx-auto mt-12 mb-28 px-6">
  <div className="border border-zinc-800 rounded-3xl p-10 bg-zinc-950">
    <h2 className="text-4xl font-bold mb-6">
      This is not blame. It is pattern recognition.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed">
      Relational dynamics do not mean another person “causes” your loop.
      They mean certain interactions can activate adaptive responses
      inside your body, mind, emotions, and archetypal system. Awareness
      creates the possibility of choice.
    </p>
  </div>
</div>

<Footer />
    </main>
  )
}