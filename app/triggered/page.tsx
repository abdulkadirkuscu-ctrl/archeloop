"use client"

import { useState } from "react"

const bodyAreas = [
  { label: "Head / Throat", archetype: "Magician", element: "Air" },
  { label: "Solar Plexus / Chest", archetype: "Sovereign", element: "Fire" },
  { label: "Heart / Belly", archetype: "Lover", element: "Water" },
  { label: "Legs / Root", archetype: "Warrior", element: "Earth" },
]

const emotions = ["Fear", "Shame", "Anger", "Grief", "Numbness", "Confusion"]

const triggers = [
  "Criticism",
  "Rejection",
  "Pressure",
  "Conflict",
  "Uncertainty",
  "Visibility",
  "Abandonment",
]

function Nav() {
  return (
    <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800 flex-wrap">
      <a href="/" className="hover:text-yellow-300">Home</a>
      <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
      <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
      <a href="/practices" className="hover:text-yellow-300">Practices</a>
      <a href="/nervous-system" className="hover:text-yellow-300">Nervous System</a>
      <a href="/archetype-interactions" className="hover:text-yellow-300">Interactions</a>
    </nav>
  )
}

function determineLoop(archetype: string, emotion: string) {
  if (archetype === "Magician") {
    if (emotion === "Fear") {
      return {
        loop: "Mind Maze",
        state: "Flight / Freeze",
        why:
          "Air energy is overactivated. The mind tries to create safety through analysis, certainty, and prediction.",
        integrated: "Healthy Warrior",
        protocol: [
          "Stop trying to solve the whole situation.",
          "Name one real fact.",
          "Feel your feet or hands for 20 seconds.",
          "Choose one small action.",
          "Act before complete certainty arrives.",
        ],
      }
    }

    if (emotion === "Confusion") {
      return {
        loop: "Blank Page",
        state: "Freeze",
        why:
          "Air energy has collapsed under pressure. Your system may be protecting you by temporarily shutting down thought or speech.",
        integrated: "Healthy Magician",
        protocol: [
          "Lower the pressure.",
          "Take one slow breath.",
          "Say or write one simple sentence.",
          "Do not force clarity.",
          "Let one thought return at a time.",
        ],
      }
    }

    return {
      loop: "Smoky Mirrors",
      state: "Flight",
      why:
        "Air energy is compensating through interpretation, rationalisation, or story control to avoid uncertainty.",
      integrated: "Healthy Lover",
      protocol: [
        "Pause the explanation.",
        "Ask: what actually happened?",
        "Ask: what am I adding to the story?",
        "Name the vulnerable feeling underneath.",
        "Return to one grounded truth.",
      ],
    }
  }

  if (archetype === "Sovereign") {
    if (emotion === "Shame") {
      return {
        loop: "Dimmed Light",
        state: "Freeze",
        why:
          "Fire energy has collapsed. Visibility feels unsafe, so the system tries to protect you by shrinking or hiding.",
        integrated: "Healthy Sovereign",
        protocol: [
          "Stand or sit slightly taller.",
          "Place a hand on your chest or solar plexus.",
          "Name one thing you are allowed to want.",
          "Take one small visible action.",
          "Do not apologise for existing.",
        ],
      }
    }

    if (emotion === "Fear") {
      return {
        loop: "Stalled Flame",
        state: "Freeze / Flight",
        why:
          "Fire wants to move, but Air may be blocking action through doubt, prediction, or fear of failure.",
        integrated: "Healthy Warrior",
        protocol: [
          "Stop planning the whole path.",
          "Choose the smallest next step.",
          "Move your body first.",
          "Take action imperfectly.",
          "Review after action, not before.",
        ],
      }
    }

    return {
      loop: "Paper Crown",
      state: "Fight",
      why:
        "Fire energy is compensating through performance, control, or status to protect a vulnerable sense of worth.",
      integrated: "Healthy Lover",
      protocol: [
        "Release the need to look impressive.",
        "Name one value you hold privately.",
        "Soften your breath.",
        "Ask: who am I without performance?",
        "Choose authenticity over image.",
      ],
    }
  }

  if (archetype === "Lover") {
    if (emotion === "Numbness") {
      return {
        loop: "Emotional Lockdown",
        state: "Collapse",
        why:
          "Water energy has shut down to protect you from vulnerability, grief, longing, or emotional overwhelm.",
        integrated: "Healthy Lover",
        protocol: [
          "Do not force emotion.",
          "Name one body sensation.",
          "Name one possible feeling gently.",
          "Let the feeling be small.",
          "Stay with it for 30 seconds.",
        ],
      }
    }

    if (emotion === "Grief") {
      return {
        loop: "Flooded Waters",
        state: "Fight / Flight",
        why:
          "Water energy is overflowing. Emotion becomes so intense that regulation and perspective become difficult.",
        integrated: "Healthy Warrior",
        protocol: [
          "Slow the wave.",
          "Exhale longer than you inhale.",
          "Feel your feet or seat.",
          "Name the feeling without becoming it.",
          "Delay reaction until your body settles.",
        ],
      }
    }

    return {
      loop: "Fantasy Fog",
      state: "Flight",
      why:
        "Water energy escapes into imagination, idealisation, or longing because direct reality feels unsafe or disappointing.",
      integrated: "Healthy Warrior",
      protocol: [
        "Name the fantasy.",
        "Name the reality.",
        "Notice the gap between them.",
        "Take one real-world action.",
        "Return to your body.",
      ],
    }
  }

  if (archetype === "Warrior") {
    if (emotion === "Fear") {
      return {
        loop: "Compliance",
        state: "Fawn",
        why:
          "Earth energy has collapsed. Your system may choose approval, peace, or adaptation instead of boundaries.",
        integrated: "Healthy Warrior",
        protocol: [
          "Pause before agreeing.",
          "Ask: what do I actually want?",
          "Name one boundary internally.",
          "Say one honest sentence.",
          "Let discomfort exist without abandoning yourself.",
        ],
      }
    }

    if (emotion === "Anger") {
      return {
        loop: "Fortress",
        state: "Fight",
        why:
          "Earth energy is overprotecting. Boundaries may become walls, control, distance, or hyper-independence.",
        integrated: "Healthy Lover",
        protocol: [
          "Notice the protective wall.",
          "Relax your jaw or hands.",
          "Ask: what am I protecting?",
          "Choose one safe softening.",
          "Stay protected without becoming closed.",
        ],
      }
    }

    return {
  loop: "Barren Ground",
  state: "Collapse",
  why:
    "Earth energy is exhausted. The system keeps enduring responsibility without enough nourishment, rest, or support.",
  integrated: "Healthy Lover",
  protocol: [
    "Stop adding new burdens.",
    "Name what is draining you.",
    "Choose one act of restoration.",
    "Ask for one form of support.",
    "Let rest become part of strength.",
  ],
}
}

return null
}
export default function TriggeredPage() {
  const [selectedBody, setSelectedBody] = useState<any>(null)
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [finished, setFinished] = useState(false)
  const [brokeLoop, setBrokeLoop] = useState(false)

  if (finished && selectedBody) {
    const result = determineLoop(selectedBody.archetype, selectedEmotion)

    return (
      <main className="min-h-screen bg-black text-white">
        <Nav />

        <div className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Triggered Pattern</h1>

            {result && (
              <>
                <div className="border rounded-2xl p-8 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Most Likely Active Loop
                  </h2>

                  <p className="text-3xl font-bold mb-4">
                    {result.loop}
                  </p>

                  <p className="text-gray-300">
                    Your current body signal, emotion, and trigger suggest this loop may be active right now.
                  </p>
                </div>

                <div className="border rounded-2xl p-8 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Nervous System Pattern
                  </h2>

                  <p className="text-xl">{result.state}</p>
                </div>

                <div className="border rounded-2xl p-8 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Why This Happens
                  </h2>

                  <p className="text-gray-300">{result.why}</p>
                </div>

                <div className="bg-white text-black rounded-2xl p-8 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Loop Breaking Protocol
                  </h2>

                  <ol className="space-y-3 list-decimal list-inside">
                    {result.protocol.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="border border-yellow-400 rounded-2xl p-8 mb-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Integration Key
                  </h2>

                  <p className="text-yellow-300 text-xl">
                    Restore: {result.integrated}
                  </p>
                </div>

                {brokeLoop ? (
                  <div className="bg-white text-black rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-3">
                      Loop Interrupted
                    </h2>

                    <p>
                      You created space between trigger and reaction. This is the beginning of breaking the loop.
                    </p>

                    <div className="flex gap-4 mt-6 flex-wrap">
                      <a href="/" className="bg-black text-white px-5 py-3 rounded-full">
                        Return Home
                      </a>

                      <a href="/triggered" className="border border-black px-5 py-3 rounded-full">
                        Track Another Trigger
                      </a>

                      <a href="/assessment" className="border border-black px-5 py-3 rounded-full">
                        Take Assessment
                      </a>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setBrokeLoop(true)}
                    className="bg-white text-black px-8 py-4 rounded-full font-semibold"
                  >
                    I Broke the Loop
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            I Am Triggered
          </h1>

          <p className="text-gray-300 mb-10">
            Use this when you feel uneasy, foggy, anxious, ashamed, overwhelmed, defensive, numb, or stuck.
          </p>

          <div className="border rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              Where do you feel it?
            </h2>

            <div className="grid gap-3">
              {bodyAreas.map((area) => (
                <button
                  key={area.label}
                  onClick={() => setSelectedBody(area)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedBody?.label === area.label
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {area.label} — {area.archetype}
                </button>
              ))}
            </div>
          </div>

          <div className="border rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              What emotion is strongest?
            </h2>

            <div className="grid gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedEmotion === emotion
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="border rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
              What triggered this?
            </h2>

            <div className="grid gap-3">
              {triggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => setSelectedTrigger(trigger)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedTrigger === trigger
                      ? "bg-white text-black"
                      : "hover:bg-white hover:text-black"
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setFinished(true)}
            disabled={!selectedBody || !selectedEmotion || !selectedTrigger}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold disabled:opacity-40"
          >
            Identify My Loop
          </button>
        </div>
      </div>
    </main>
  )
}