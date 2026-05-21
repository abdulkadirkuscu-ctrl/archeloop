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
      </section>

      <Footer />
    </main>
  )
}