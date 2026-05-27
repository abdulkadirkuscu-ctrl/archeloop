"use client"

import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

const bodyAreas = [
  "Head / Throat",
  "Chest / Solar Plexus",
  "Gut / Lower Abdomen",
  "Legs / Feet / Full Body",
]

const states = [
  "Inadequate / Pressured",
  "Confused / Overthinking",
  "Hurt / Upset",
  "Defensive / Angry",
]

const responses = [
  {
    label: "Reduce visibility, emotion, voice, or needs.",
    formation: "Suppression",
  },
  {
    label: "Prove, explain, control, imagine, or protect.",
    formation: "Compensation",
  },
  {
    label: "Feel pulled in two directions, overwhelmed, or stuck.",
    formation: "Collision",
  },
]

const loopDescriptions: Record<string, string> = {
  "Dimmed Light": "You may shrink, hide, or suppress visibility to stay safe.",
  "Paper Crown": "You may seek worth through performance, image, or achievement.",
  "Stalled Flame": "You may feel desire or vision, but struggle to move into action.",

  "Blank Page": "You may mentally freeze or lose access to clarity under pressure.",
  "Smoky Mirrors": "You may over-explain, distort, or control meaning to feel safe.",
  "Mind Maze": "You may become trapped in overthinking without clear movement.",

  "Emotional Lockdown": "You may disconnect from feeling when vulnerability feels unsafe.",
  "Fantasy Fog": "You may retreat into fantasy or idealisation instead of reality.",
  "Flooded Waters": "You may become emotionally overwhelmed or difficult to regulate.",

  "Compliance": "You may abandon your needs to avoid conflict or rejection.",
  "Fortress": "You may become guarded, distant, or hyper-independent for protection.",
  "Barren Ground": "You may keep enduring while feeling emotionally depleted.",
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

  function determineLoop(state: string, formation: string) {
  if (state.includes("Pressed") || state.includes("Exposed")) {
    if (formation === "Suppression") return "Dimmed Light"
    if (formation === "Compensation") return "Paper Crown"
    return "Stalled Flame"
  }

  if (state.includes("Confused") || state.includes("Overthinking")) {
    if (formation === "Suppression") return "Blank Page"
    if (formation === "Compensation") return "Smoky Mirrors"
    return "Mind Maze"
  }

  if (state.includes("Hurt") || state.includes("Upset")) {
    if (formation === "Suppression") return "Emotional Lockdown"
    if (formation === "Compensation") return "Fantasy Fog"
    return "Flooded Waters"
  }

  if (state.includes("Defensive") || state.includes("Angry")) {
    if (formation === "Suppression") return "Compliance"
    if (formation === "Compensation") return "Fortress"
    return "Barren Ground"
  }

  return "Mind Maze"
}

function selectResponse(label: string, formation: string) {
  setResponse(label)
  setLoop(determineLoop(state, formation))
}

  if (finished && loop) {
    return (
      <main className="min-h-screen bg-black text-white">
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
              <h2 className="text-4xl font-bold mb-6">
                
  <span className="text-yellow-300">{loop} Loop</span>

<p className="text-gray-300 text-lg leading-relaxed mb-5">
  {loopDescriptions[loop]}
</p>

</h2>

              <p className="text-gray-300 leading-relaxed">
                This does not define who you are. It reflects a likely protective pattern active in this moment.
              </p>
            </div>

            <div className="grid gap-6 mb-8">
              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">Body Signal</h3>
                <p className="text-gray-300">{body}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">State</h3>
                <p className="text-gray-300">{state}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950">
                <h3 className="text-2xl font-semibold mb-3">Response Pattern</h3>
                <p className="text-gray-300">{response}</p>
              </div>
            </div>

            <div className="border border-yellow-300/20 rounded-2xl p-8 mb-8 bg-zinc-950">
  <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
    First Loop Breaker
  </h3>

  <p className="text-gray-300 leading-relaxed">
    Pause. Name what is happening. Take one small grounded action before reacting from the peak of activation.
  </p>
</div>

            <div className="flex gap-4 flex-wrap">
              <a
                href="/triggered"
                className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
              >
                Start Again
              </a>

              <a
                href={`/loops/${loopSlug(loop)}`}
                className="bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold"
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
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            I Am Triggered
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            What is active right now?
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            Move through three quick steps to identify the loop that may be active in this moment.
          </p>

          <div className="border border-zinc-800 rounded-[2rem] p-8 mb-8 bg-zinc-950">
            <h2 className="text-2xl font-semibold mb-6">
              1. Where do you feel it?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {bodyAreas.map((item) => (
                <button
                  key={item}
                  onClick={() => setBody(item)}
                  className={`border rounded-xl p-4 text-left transition ${
                    body === item
                      ? "bg-white text-black"
                      : "border-zinc-700 hover:border-yellow-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {body && (
            <div className="border border-zinc-800 rounded-[2rem] p-8 mb-8 bg-zinc-950">
              <h2 className="text-2xl font-semibold mb-6">
                2. What feels closest?
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {states.map((item) => (
                  <button
                    key={item}
                    onClick={() => setState(item)}
                    className={`border rounded-xl p-4 text-left transition ${
                      state === item
                        ? "bg-white text-black"
                        : "border-zinc-700 hover:border-yellow-300"
                    }`}
                  >
                    {item}
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
                    key={item.label}
onClick={() => selectResponse(item.label, item.formation)}
                    className={`border rounded-xl p-4 text-left transition ${
                      response === item.label
                        ? "bg-white text-black"
                        : "border-zinc-700 hover:border-yellow-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={!body || !state || !response}
            onClick={() => setFinished(true)}
            className="w-full bg-yellow-300 text-black py-5 rounded-full font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Identify My Loop
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}