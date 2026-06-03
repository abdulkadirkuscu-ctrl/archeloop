import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FoundingCounter from "../components/FoundingCounter";

const patterns = [
  "Overthinking instead of taking action",
  "Feeling emotionally overwhelmed or disconnected",
  "Seeking validation to feel worthy",
  "Freezing when trying to express yourself",
  "People pleasing to avoid conflict or rejection",
  "Shutting down under pressure",
  "Wanting connection while fearing vulnerability",
  "Feeling stuck in cycles you cannot explain",
];

const states = [
  {
    title: "Inadequate / Exposed",
    text: "Feeling pressured, unseen, judged, criticised, or not enough.",
  },
  {
    title: "Confused / Overthinking",
    text: "Feeling mentally overwhelmed, foggy, uncertain, or trapped in thought.",
  },
  {
    title: "Hurt / Longing",
    text: "Feeling emotionally overwhelmed, rejected, abandoned, or craving connection.",
  },
  {
    title: "Defensive / Tense",
    text: "Feeling irritated, guarded, trapped, angry, or unable to relax.",
  },
];

const steps = [
  {
    number: "1",
    title: "Body",
    text: "Where your nervous system reacts first.",
  },
  {
    number: "2",
    title: "Emotional State",
    text: "What becomes emotionally activated internally.",
  },
  {
    number: "3",
    title: "Protective Response",
    text: "How your system suppresses, compensates, protects, or collides.",
  },
  {
    number: "4",
    title: "Loop",
    text: "The repeating emotional pattern formed underneath.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.4em] text-yellow-300/70">
            ArcheLoop™
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Understand the patterns
            <br />
            you keep repeating.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300 md:text-2xl">
            Overthinking. Shutdown. People pleasing. Emotional overwhelm.
            ArcheLoop helps uncover the hidden loop beneath the reactions you
            keep repeating.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Identify My Loop
            </a>

            <a
              href="/triggered"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              I Am Triggered
            </a>
          </div>

          <FoundingCounter />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Start With What Feels Familiar
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Do any of these patterns feel familiar?
          </h2>

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-4">
            {patterns.map((pattern) => (
              <div
                key={pattern}
                className="rounded-full border border-yellow-300/10 bg-black/30 px-6 py-4 text-base text-stone-300 transition hover:border-yellow-300/40 md:text-lg"
              >
                {pattern}
              </div>
            ))}
          </div>

          <a
            href="/assessment"
            className="mt-12 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Find My Loop
          </a>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Why It Repeats
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            These reactions are not random.
          </h2>

          <div className="mx-auto mt-8 max-w-4xl space-y-6 text-xl leading-relaxed text-stone-300">
            <p>
              Many begin as protective nervous system responses: suppressing
              emotion, compensating for insecurity, or splitting between
              opposing needs.
            </p>

            <p>
              Over time, these reactions can harden into repeating loops —
              patterns that once protected you, but now shape your emotions,
              relationships, identity, and behaviour automatically.
            </p>

            <p>ArcheLoop helps make those loops visible.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Triggered Check-In
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            What feels strongest right now?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-stone-300">
            The I Am Triggered check-in helps identify what is active beneath
            the reaction so you can interrupt the pattern before it becomes a
            loop.
          </p>

          <div className="mt-14 grid gap-5 text-left md:grid-cols-4">
            {states.map((state) => (
              <div
                key={state.title}
                className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_35px_rgba(216,183,120,0.04)] transition hover:border-yellow-300/40"
              >
                <h3 className="text-2xl font-bold text-yellow-300">
                  {state.title}
                </h3>

                <p className="mt-4 leading-relaxed text-stone-400">
                  {state.text}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/triggered"
            className="mt-12 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Use Triggered Check-In
          </a>
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            How ArcheLoop Works
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Body. State. Response. Loop.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            ArcheLoop translates what you feel into a clearer pattern map:
            where it appears in the body, what emotional state is active, how
            your system protects itself, and which loop may be running.
          </p>

          <a
            href="/loops"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Explore The 12 Shadow Loops
          </a>

          <div className="mt-12 grid gap-6 text-left md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6 shadow-[0_0_35px_rgba(216,183,120,0.04)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold text-yellow-300">
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-stone-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            ArcheLoop Report
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Discover the pattern beneath your reactions.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Take the 60-question assessment to receive your profile preview,
            then unlock the deeper report with structural dynamics, relational
            activators, nervous system patterns, and integration guidance.
          </p>

          <a
            href="/report"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Explore The Report
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}