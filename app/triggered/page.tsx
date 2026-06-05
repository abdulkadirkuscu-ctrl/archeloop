"use client"

import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

const bodyAreas = [
  {
    title: "Head / Throat",
    description: "Perception, thought, clarity, communication.",
  },
  {
    title: "Chest / Solar Plexus",
    description: "Worth, visibility, identity, expression.",
  },
  {
    title: "Gut / Lower Abdomen",
    description: "Emotion, attachment, vulnerability, connection.",
  },
  {
    title: "Legs / Feet / Full Body",
    description: "Protection, grounding, boundaries, survival.",
  },
]

const states = [
  {
    title: "Inadequate / Exposed",
    description:
      "Feeling pressured, unseen, judged, or not enough.",
  },
  {
    title: "Confused / Overthinking",
    description:
      "Feeling mentally overwhelmed, foggy, uncertain, or trapped in thought.",
  },
  {
    title: "Hurt / Longing",
    description:
      "Feeling emotionally overwhelmed, rejected, abandoned, or craving connection.",
  },
  {
    title: "Defensive / Tense",
    description:
      "Feeling irritated, guarded, trapped, angry, or unable to relax.",
  },
]

const responses = [
  {
    title: "I shrank, disconnected, or held myself back.",
    mechanism: "Suppression",
  },
  {
    title:
      "I tried to regain control, prove myself, manage the situation, or overcompensate.",
    mechanism: "Compensation",
  },
  {
    title:
      "I felt overwhelmed, conflicted, or stuck between impulses.",
    mechanism: "Collision",
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
      if (mechanism === "Suppression") return "Dimmed Light"
      if (mechanism === "Compensation") return "Paper Crown"
      return "Stalled Flame"
    }

    if (state.includes("Confused") || state.includes("Overthinking")) {
      if (mechanism === "Suppression") return "Blank Page"
      if (mechanism === "Compensation") return "Smoky Mirrors"
      return "Mind Maze"
    }

    if (state.includes("Hurt") || state.includes("Longing")) {
      if (mechanism === "Suppression") return "Emotional Lockdown"
      if (mechanism === "Compensation") return "Fantasy Fog"
      return "Flooded Waters"
    }

    if (state.includes("Defensive") || state.includes("Tense")) {
      if (mechanism === "Suppression") return "Compliance"
      if (mechanism === "Compensation") return "Fortress"
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
          <div className="max-w-3xl mx-auto">

            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              Triggered Pattern
            </p>

            <h1 className="text-5xl font-bold mb-8">
              Your system may currently be in:
            </h1>

            <div className="border border-yellow-300/20 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8 mb-8">

              <h2 className="text-4xl font-bold mb-5">
                <span className="text-yellow-300">
                  {loop} Loop
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {loopDescriptions[loop]}
              </p>

              <p className="text-gray-400 leading-relaxed">
                This does not define who you are. It reflects a likely adaptive pattern that may currently be active beneath stress, emotion, overwhelm, pressure, conflict, or relational activation.
              </p>
            </div>

            <div className="grid gap-6 mb-8">

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">
                  Body Activation
                </h3>

                <p className="text-gray-300">
                  {body}
                </p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">
                  Emotional Tone
                </h3>

                <p className="text-gray-300">
                  {state}
                </p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">
                  Adaptive Strategy
                </h3>

                <p className="text-gray-300">
                  {response}
                </p>
              </div>

            </div>

            <div className="border border-yellow-300/20 rounded-2xl p-8 mb-8 bg-zinc-950">

              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
                First Loop Breaker
              </h3>

              <p className="text-gray-300 leading-relaxed">
                Pause before reacting automatically. Name what is happening internally and take one small grounded action before continuing the loop pattern.
              </p>

            </div>

            <div className="flex gap-4 flex-wrap">

              <a
                href="/triggered"
                className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                Start Again
              </a>

              <a
                href={`/loops/${loopSlug(loop)}`}
                className="bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Explore The {loop} Loop
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

        <div className="max-w-4xl mx-auto">

         <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70 mb-5">
  I Am Triggered™
</p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            What is active right now?
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            Move through three quick steps to identify the loop that may currently be active in this moment.
          </p>

          <div className="border border-zinc-800 rounded-[2rem] p-8 mb-8 bg-zinc-950">

            <h2 className="text-2xl font-semibold mb-6">
              1. Where do you feel it most?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {bodyAreas.map((item) => (
                <button
                  key={item.title}
                  onClick={() => setBody(item.title)}
                  className={`border rounded-2xl p-5 text-left transition ${
                    body === item.title
                      ? "bg-white text-black"
                      : "border-zinc-700 hover:border-yellow-300"
                  }`}
                >

                  <h3 className="font-semibold text-lg mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm opacity-80 leading-relaxed">
                    {item.description}
                  </p>

                </button>
              ))}

            </div>

          </div>

          {body && (
            <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 mb-8 shadow-[0_0_40px_rgba(216,183,120,0.04)]">

              <h2 className="text-2xl font-semibold mb-6">
                2. What feels strongest?
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                {states.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setState(item.title)}
                    className={`border rounded-2xl p-5 text-left transition ${
                      state === item.title
                        ? "bg-white text-black"
                        : "border-zinc-700 hover:border-yellow-300"
                    }`}
                  >

                    <h3 className="font-semibold text-lg mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm opacity-80 leading-relaxed">
                      {item.description}
                    </p>

                  </button>
                ))}

              </div>

            </div>
          )}

          {state && (
            <div className="border border-zinc-800 rounded-[2rem] p-8 mb-8 bg-zinc-950">

              <h2 className="text-2xl font-semibold mb-6">
                3. What happened next?
              </h2>

              <div className="grid gap-4">

                {responses.map((item) => (
                  <button
                    key={item.title}
                    onClick={() =>
                      selectResponse(item.title, item.mechanism)
                    }
                    className={`border rounded-2xl p-5 text-left transition ${
                      response === item.title
                        ? "bg-white text-black"
                        : "border-zinc-700 hover:border-yellow-300"
                    }`}
                  >

                    <h3 className="font-semibold text-lg mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm opacity-80">
                      {item.mechanism}
                    </p>

                  </button>
                ))}

              </div>

            </div>
          )}

<div className="mb-8 rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_60px_rgba(216,183,120,0.08)]">
  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
    Upgrade Available
  </p>

  <h3 className="mt-4 text-3xl font-bold">
    Unlock Triggered Pro™
  </h3>

  <p className="mt-4 leading-relaxed text-stone-300">
    Discover primary and secondary loops, integration journeys,
    trigger history, progress tracking, and your personalised
    transformation pathway.
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
            className="w-full bg-yellow-300 text-black py-5 rounded-full font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            Identify My Loop
          </button>

        </div>

      </section>

      <Footer />
    </main>
  )
}
