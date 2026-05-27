import Nav from "./components/Nav"
import Footer from "./components/Footer"

const patterns = [
  "Overthinking instead of taking action",
  "Feeling emotionally overwhelmed or disconnected",
  "Seeking validation to feel worthy",
  "Freezing when trying to express yourself",
  "People pleasing to avoid conflict or rejection",
  "Shutting down under pressure",
  "Wanting connection while fearing vulnerability",
  "Feeling stuck in cycles you cannot explain",
]

const states = [
  {
    title: "Ashamed / Exposed",
    text: "Feeling pressured, inadequate, judged, unseen, or not enough.",
  },
  {
    title: "Foggy / Confused",
    text: "Feeling mentally overwhelmed, uncertain, trapped in thought, or disconnected from clarity.",
  },
  {
    title: "Hurt / Longing",
    text: "Feeling rejected, emotionally overwhelmed, abandoned, sensitive, or craving connection.",
  },
  {
    title: "Defensive / Tense",
    text: "Feeling irritated, guarded, trapped, pressured, angry, or unable to relax.",
  },
]

const steps = [
  {
    number: "01",
    title: "Body",
    text: "Where your nervous system reacts first.",
  },
  {
    number: "02",
    title: "Emotional State",
    text: "What becomes emotionally activated internally.",
  },
  {
    number: "03",
    title: "Protective Response",
    text: "How your system suppresses, compensates, protects, or collides.",
  },
  {
    number: "04",
    title: "Loop",
    text: "The repeating emotional pattern formed underneath.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-36 text-center border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.14),transparent_45%)]" />

        <div className="relative max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-gray-500 mb-6 text-sm">
            ArcheLoop™
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Understand the patterns
            <br />
            you keep repeating.
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Overthinking. Shutdown. People pleasing. Emotional overwhelm.
            ArcheLoop helps uncover the hidden loop beneath the reactions you keep repeating.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Identify My Loop
            </a>

            <a
              href="/triggered"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              I Am Triggered
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Start With What Feels Familiar
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Do any of these patterns feel familiar?
          </h2>

          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4 mt-14">
            {patterns.map((pattern) => (
              <div
                key={pattern}
                className="border border-zinc-800 bg-black/60 rounded-full px-6 py-4 text-gray-300 text-base md:text-lg hover:border-yellow-300/30 transition"
              >
                {pattern}
              </div>
            ))}
          </div>

          <a
            href="/assessment"
            className="inline-flex mt-12 bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
          >
            Find My Loop
          </a>
        </div>
      </section>

      <section className="px-6 py-28 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Why It Repeats
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            These reactions are not random.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Many begin as protective nervous system responses: suppressing emotion,
            compensating for insecurity, or splitting between opposing needs.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Over time, these reactions can harden into repeating loops — patterns
            that once protected you, but now shape your emotions, relationships,
            identity, and behaviour automatically.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            ArcheLoop helps make those loops visible.
          </p>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Triggered Check-In
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            What feels strongest right now?
          </h2>

          <div className="grid md:grid-cols-4 gap-5 mt-14 text-left">
            {states.map((state) => (
              <div
                key={state.title}
                className="border border-zinc-800 rounded-[2rem] bg-black p-6 hover:border-yellow-300/30 transition"
              >
                <h3 className="text-2xl font-bold mb-4">{state.title}</h3>
                <p className="text-gray-400 leading-relaxed">{state.text}</p>
              </div>
            ))}
          </div>

          <a
            href="/triggered"
            className="inline-flex mt-12 border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
          >
            Use Triggered Check-In
          </a>
        </div>
      </section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            How ArcheLoop Works
          </p>
<section
  id="how-it-works"
  className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]"
></section>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Body. State. Response. Loop.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            ArcheLoop translates what you feel into a clearer pattern map:
            where it appears in the body, what emotional state is active,
            how your system protects itself, and which loop may be running.
          </p>

          <div className="grid gap-6 md:grid-cols-4 mt-12 text-left">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6"
              >
                <div className="text-sm text-yellow-500 mb-3">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-300 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            ArcheLoop Report
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Get your personal pattern profile.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Take the 60-question assessment to receive your profile preview,
            then unlock the deeper report with structural dynamics, relational
            activators, nervous system patterns, and integration guidance.
          </p>

          <a
            href="/report"
            className="inline-flex bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
          >
            Explore The Report
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}