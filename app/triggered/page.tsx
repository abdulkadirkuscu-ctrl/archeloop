"use client"

import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { loopDetails } from "../data/loopDetails"

const bodyAreas = [
  { title: "Head / Throat" },
  { title: "Chest / Solar Plexus" },
  { title: "Gut / Lower Abdomen" },
  { title: "Legs / Feet / Full Body" },
]

const states = [
  {
    title: "I felt judged or not good enough.",
    description: "Inadequate / Exposed",
  },
  {
    title: "I couldn't stop thinking.",
    description: "Confused / Overthinking",
  },
  {
    title: "I felt hurt or rejected.",
    description: "Hurt / Longing",
  },
  {
  title: "I felt I needed to protect myself or defend my boundaries.",
  description: "Defensive / Tense",
},
]

const responses = [
  {
    title: "I shut down.",
    mechanism: "Collapse",
  },
  {
    title: "I tried to regain control.",
    mechanism: "Compensate",
  },
  {
    title: "I felt torn between different impulses.",
    mechanism: "Collide",
  },
]

const loopDescriptions: Record<string, string> = {
  "Dimmed Light":
    "You may shrink, hide your gifts, or avoid visibility because being seen feels unsafe.",
  "Paper Crown":
    "You may seek worth through performance, image, or achievement.",
  "Stalled Flame":
    "You may feel desire or vision, but struggle to move into action.",
  "Blank Page":
    "You may mentally freeze or lose access to clarity under pressure.",
  "Smoky Mirrors":
    "You may over-explain, distort, or control meaning to feel safe.",
  "Mind Maze":
    "You may become trapped in overthinking without clear movement.",
  "Emotional Lockdown":
    "You may disconnect from feeling when vulnerability feels unsafe.",
  "Fantasy Fog":
    "You may retreat into fantasy or idealisation instead of reality.",
  "Flooded Waters":
    "You may become emotionally overwhelmed or difficult to regulate.",
  Compliance:
    "You may abandon your needs to avoid conflict or rejection.",
  Fortress:
    "You may become guarded, distant, or hyper-independent for protection.",
  "Barren Ground":
    "You may keep enduring while feeling emotionally depleted.",
}


function loopSlug(loop: string) {
  return loop.toLowerCase().replace(/\s+/g, "-")
}

export default function TriggeredPage() {
  const [body, setBody] = useState("")
  const [state, setState] = useState("")
  const [response, setResponse] = useState("")
  const [loop, setLoop] = useState("")
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (finished) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [finished])

  function determineLoop(state: string, mechanism: string) {
    if (state.includes("Inadequate") || state.includes("Exposed")) {
      if (mechanism === "Collapse") return "Dimmed Light"
      if (mechanism === "Compensate") return "Paper Crown"
      return "Stalled Flame"
    }

    if (state.includes("Confused") || state.includes("Overthinking")) {
      if (mechanism === "Collapse") return "Blank Page"
      if (mechanism === "Compensate") return "Smoky Mirrors"
      return "Mind Maze"
    }

    if (state.includes("Hurt") || state.includes("Longing")) {
      if (mechanism === "Collapse") return "Emotional Lockdown"
      if (mechanism === "Compensate") return "Fantasy Fog"
      return "Flooded Waters"
    }

    if (state.includes("Defensive") || state.includes("Tense")) {
      if (mechanism === "Collapse") return "Compliance"
      if (mechanism === "Compensate") return "Fortress"
      return "Barren Ground"
    }

    return "Mind Maze"
  }

  function selectResponse(title: string, mechanism: string) {
    setResponse(title)
    setLoop(determineLoop(state, mechanism))
  }

  if (finished && loop) {
    return (
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              I Am Triggered™ Result
            </p>

            <h1 className="mb-8 text-4xl font-bold md:text-5xl">
              Possible Active Loop
            </h1>

            <div className="mb-8 rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                Shadow Loop™
              </p>

              <h2 className="mt-4 text-4xl font-bold text-yellow-300">
                {loop}
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-stone-300">
                {loopDescriptions[loop]}
              </p>

              <p className="mt-5 leading-relaxed text-stone-400">
                This does not define who you are. It reflects a likely adaptive
                pattern that may be active beneath stress, emotion, overwhelm,
                pressure, conflict, or relational activation.
              </p>
            </div>

            <div className="mb-8 grid gap-5 md:grid-cols-3">
              <ResultCard title="Where you felt it" value={body} />
              <ResultCard title="What you felt" value={state} />
              <ResultCard title="How you responded" value={response} />
            </div>

            <div className="mb-8 rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8">
              <h3 className="text-2xl font-semibold text-yellow-300">
                First Loop Breaker
              </h3>

              <p className="mt-4 leading-relaxed text-stone-300">
  {loopDetails[loop as keyof typeof loopDetails].loopBreaker}
</p>
            </div>

            <div className="mb-8 rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                Go Deeper with Triggered Pro™
              </p>

              <h3 className="mt-4 text-3xl font-bold">
                Understand the full pattern behind the reaction.
              </h3>

              <p className="mt-4 leading-relaxed text-stone-300">
                Triggered Pro™ goes beyond identifying your active loop. Discover
                your primary and secondary Shadow Loops™, Integration Journey™,
                personalised guidance, trigger history, and progress over time.
              </p>

              <a
                href="/triggered-intelligence"
                className="mt-6 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
              >
                Explore Triggered Pro™
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/triggered"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Start Again
              </a>

              <a
                href={`/loops/${loopSlug(loop)}`}
                className="rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
              >
                Learn About {loop}™
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            I Am Triggered™
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            What is happening right now?
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-stone-300">
            Answer three quick questions to identify the Shadow Loop™ that may
            be active right now.
          </p>

          <StepCard title="1. Where did you feel it?">
            <div className="grid gap-4 md:grid-cols-2">
              {bodyAreas.map((item) => (
                <ChoiceButton
                  key={item.title}
                  active={body === item.title}
                  title={item.title}
                  onClick={() => setBody(item.title)}
                />
              ))}
            </div>
          </StepCard>

          {body && (
            <StepCard title="2. What did you feel?">
              <div className="grid gap-4 md:grid-cols-2">
                {states.map((item) => (
                  <ChoiceButton
                    key={item.title}
                    active={state === item.description}
                    title={item.title}
                    description={item.description}
                    onClick={() => setState(item.description)}
                  />
                ))}
              </div>
            </StepCard>
          )}

          {state && (
            <StepCard title="3. How did you respond?">
              <div className="grid gap-4">
                {responses.map((item) => (
                  <ChoiceButton
                    key={item.title}
                    active={response === item.title}
                    title={item.title}
                    description={item.mechanism}
                    onClick={() => selectResponse(item.title, item.mechanism)}
                  />
                ))}
              </div>
            </StepCard>
          )}

          <div className="mb-8 rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_60px_rgba(216,183,120,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Go Deeper with Triggered Pro™
            </p>

            <h3 className="mt-4 text-3xl font-bold">
              See the fuller pattern.
            </h3>

            <p className="mt-4 leading-relaxed text-stone-300">
              Triggered Pro™ identifies primary and secondary loops, Integration
              Journeys™, trigger history, progress tracking, and personalised
              guidance for your next integrated step.
            </p>

            <a
              href="/triggered-intelligence"
              className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-3 text-yellow-200 transition hover:border-yellow-300/60"
            >
              Explore Triggered Pro™
            </a>
          </div>

          <button
            disabled={!body || !state || !response}
            onClick={() => setFinished(true)}
            className="w-full rounded-full bg-yellow-300 py-5 text-lg font-semibold text-black transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Identify My Loop
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function StepCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8 rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_40px_rgba(216,183,120,0.04)]">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  )
}

function ChoiceButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean
  title: string
  description?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_35px_rgba(216,183,120,0.18)]"
          : "border-yellow-300/10 bg-black/30 text-stone-300 hover:border-yellow-300/50 hover:bg-[#0B1018]"
      }`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p
          className={`mt-2 text-sm leading-relaxed ${
            active ? "text-black/70" : "text-stone-500"
          }`}
        >
          {description}
        </p>
      )}
    </button>
  )
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-6">
      <h3 className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
        {title}
      </h3>

      <p className="mt-3 leading-relaxed text-stone-300">{value}</p>
    </div>
  )
}