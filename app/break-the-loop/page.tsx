import Nav from "../components/Nav"
import Footer from "../components/Footer"

const steps = [
  ["1", "Name the Loop", "Notice the pattern without becoming it."],
  ["2", "Locate It in the Body", "Where do you feel it: head, chest, belly, legs, throat?"],
  ["3", "Ask the Trigger Question", "What activated this response right now?"],
  ["4", "Choose One Exit Action", "Interrupt the loop physically before analysing it."],
  ["5", "Return to Witness State", "What is actually happening right now, without story?"],
]

export default function BreakTheLoopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
          ArcheLoop Practice
        </p>

        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          Break the Loop Protocol
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mb-16">
          A simple five-step practice for recognising a Shadow Loop, interrupting
          the automatic reaction, and returning to conscious choice.
        </p>

        <div className="grid md:grid-cols-5 gap-5 mb-20">
          {steps.map(([number, title, text]) => (
            <div
              key={title}
              className="border border-zinc-800 bg-zinc-950 rounded-3xl p-6"
            >
              <p className="text-yellow-300 text-3xl font-bold mb-4">
                {number}
              </p>

              <h2 className="text-xl font-semibold mb-3">
                {title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="border border-yellow-400 rounded-3xl p-8 bg-zinc-950">
          <h2 className="text-3xl font-bold mb-4">
            The Witness State
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            The goal is not to fight the loop. The goal is to notice it clearly
            enough that you are no longer fully identified with it.
          </p>

          <p className="text-2xl text-yellow-300 font-semibold">
            “What is actually happening right now, without the story?”
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}