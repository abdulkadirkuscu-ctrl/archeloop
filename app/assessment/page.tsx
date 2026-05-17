"use client"

import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { useState } from "react"
import { questions } from "../data/questions"
import { loops } from "../data/loops"

const answerOptions = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly agree", value: 5 },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [finished, setFinished] = useState(false)

  function handleAnswer(value: number) {
    const updatedResponses = [...responses, value]
    setResponses(updatedResponses)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const archetypeToElement: Record<string, string> = {
  Sovereign: "Fire",
  Magician: "Air",
  Lover: "Water",
  Warrior: "Earth",
}

const healthyScores: Record<string, number> = {}
const healthyCounts: Record<string, number> = {}

const shadowScores: Record<string, number> = {}
const shadowCounts: Record<string, number> = {}

const loopScores: Record<string, number> = {}

responses.forEach((score, index) => {
  const question = questions[index]
  const archetype = question.archetype

  if (question.mechanism === "Healthy") {
    healthyScores[archetype] = (healthyScores[archetype] || 0) + score
    healthyCounts[archetype] = (healthyCounts[archetype] || 0) + 1
  } else {
    shadowScores[archetype] = (shadowScores[archetype] || 0) + score
    shadowCounts[archetype] = (shadowCounts[archetype] || 0) + 1

    loopScores[question.category] =
      (loopScores[question.category] || 0) + score
  }
})
const archetypes = ["Sovereign", "Magician", "Lover", "Warrior"]

const integratedScores = archetypes.map((archetype) => {
  const healthyMax = (healthyCounts[archetype] || 1) * 5
  const shadowMax = (shadowCounts[archetype] || 1) * 5

  const healthyPercent = Math.round(
    ((healthyScores[archetype] || 0) / healthyMax) * 100
  )

  const shadowPercent = Math.round(
    ((shadowScores[archetype] || 0) / shadowMax) * 100
  )

  const integratedPercent = Math.max(
    0,
    Math.round(healthyPercent - shadowPercent * 0.6)
  )

  return {
    archetype,
    element: archetypeToElement[archetype],
    healthyPercent,
    shadowPercent,
    integratedPercent,
  }
})
const elementalPresenceRaw = integratedScores.map((item) => {
  const presence = Math.max(
    1,
    Math.round(item.healthyPercent - item.shadowPercent * 0.35)
  )

  return {
    element: item.element,
    archetype: item.archetype,
    percentage: presence,
  }
})

const totalElementalPresence = elementalPresenceRaw.reduce(
  (sum, item) => sum + item.percentage,
  0
)

const elementalActivation = elementalPresenceRaw.map((item) => ({
  element: item.element,
  archetype: item.archetype,
  percentage: Math.round(
    (item.percentage / totalElementalPresence) * 100
  ),
}))

const totalIntegrated = integratedScores.reduce(
  (sum, item) => sum + item.integratedPercent,
  0
)

const elementalPercentages = integratedScores.map((item) => ({
  element: item.element,
  percentage:
    totalIntegrated > 0
      ? Math.round((item.integratedPercent / totalIntegrated) * 100)
      : 25,
}))

const sortedLoops = Object.entries(loopScores).sort(
  (a, b) => b[1] - a[1]
)

const primaryLoop = sortedLoops[0]
const secondaryLoop = sortedLoops[1]

const primaryLoopInfo = primaryLoop
  ? loops[primaryLoop[0] as keyof typeof loops]
  : null

const weakestHealthyArchetype = integratedScores.sort(
  (a, b) => a.integratedPercent - b.integratedPercent
)[0]

    return (
  <main className="min-h-screen bg-black text-white">
    <Nav />

        <div className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
  Your Result
</h1>

<div className="border border-yellow-400 rounded-3xl p-8 bg-zinc-950 mb-8">
  <h2 className="text-3xl font-bold mb-4">
    Result Summary
  </h2>

  <p className="text-lg text-gray-300 leading-relaxed">
    Your primary loop is{" "}
    <span className="text-yellow-300 font-semibold">
      {primaryLoopInfo?.title}
    </span>.
  </p>

  <p className="text-lg text-gray-300 leading-relaxed mt-4">
    This result suggests that one or more archetypal energies may be
    active, blocked, suppressed, inflated, or conflicting under pressure.
  </p>

  <p className="text-lg text-gray-300 leading-relaxed mt-4">
    ArcheLoop does not view this as your identity. A loop is a pattern —
    and patterns can become conscious, interrupted, and integrated over time.
  </p>

  {primaryLoop && (
    <div className="mt-8">
      <a
        href={`/loops/${primaryLoop[0]
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
      >
        Explore {primaryLoop[0]} Loop
      </a>
    </div>
  )}
</div>
            <div className="border rounded-2xl p-8 mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Elemental Presence
  </h2>

 <p className="text-gray-400 mb-6">
  This shows which elemental energies appear most available overall. It considers healthy expression and also reduces the score when shadow pressure is high. A low score does not mean the element is absent — it may be suppressed, distorted, or harder to access consciously.
</p>

  {elementalActivation.map(({ element, percentage }) => {
    const colours: Record<string, string> = {
      Fire: "bg-yellow-400",
      Air: "bg-blue-300",
      Water: "bg-red-400",
      Earth: "bg-green-500",
    }

    return (
      <div
        key={element}
        className="mb-5 border border-zinc-800 rounded-2xl p-5 bg-zinc-950"
      >
        <div className="flex justify-between mb-3">
          <span className="text-lg font-semibold">
            {element}
          </span>

          <span className="text-lg text-gray-300">
            {percentage}%
          </span>
        </div>

        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colours[element]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  })}
</div>
            <div className="border rounded-2xl p-8 mb-6">
  <h2 className="text-2xl font-semibold mb-4">
    Integrated Elemental Energy
  </h2>

  <p className="text-gray-400 mb-6">
    This does not mean an element is absent. It shows how much of each element appears currently integrated after shadow pressure is considered. A low score may mean the element is blocked, suppressed, conflicted, or operating through a shadow loop.
  </p>

  {elementalPercentages.map(({ element, percentage }) => {
    const colours: Record<string, string> = {
      Fire: "bg-yellow-400",
      Air: "bg-blue-300",
      Water: "bg-red-400",
      Earth: "bg-green-500",
    }

    const glow: Record<string, string> = {
      Fire: "shadow-yellow-400/30",
      Air: "shadow-blue-300/30",
      Water: "shadow-red-400/30",
      Earth: "shadow-green-500/30",
    }

    return (
      <div
        key={element}
        className="mb-6 border border-zinc-800 rounded-2xl p-5 bg-zinc-950"
      >
        <div className="flex justify-between mb-3">
          <span className="text-lg font-semibold">
            {element}
          </span>

          <span className="text-lg text-gray-300">
            {percentage}%
          </span>
        </div>

        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colours[element]} ${glow[element]} shadow-lg`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  })}
</div>
            <div className="border rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Healthy Archetype Scores
              </h2>

              {integratedScores.map((item) => (
  <div
    key={item.archetype}
    className="mb-5 border border-zinc-800 rounded-xl p-4"
  >
    <p className="text-lg font-semibold">
      Healthy {item.archetype}: {item.healthyPercent}%
    </p>

    <p className="text-sm text-gray-400">
      Shadow Pressure: {item.shadowPercent}% • Integrated Energy:{" "}
      {item.integratedPercent}%
    </p>
  </div>
))}
            </div>

            <div className="border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Shadow Loop Results
              </h2>

              {primaryLoop ? (
                <div className="space-y-4">

  <a
    href={`/loops/${primaryLoop[0]
      .toLowerCase()
      .replace(/\s+/g, "-")}`}
    className="text-xl underline text-blue-300 hover:text-blue-200"
  >
    Primary Loop: {primaryLoop[0]} — Score: {primaryLoop[1]}
  </a>

  {secondaryLoop && (
    <a
      href={`/loops/${secondaryLoop[0]
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
      className="text-xl text-gray-300 underline hover:text-white block"
    >
      Secondary Loop: {secondaryLoop[0]} — Score: {secondaryLoop[1]}
    </a>
  )}

</div>
              ) : (
                <p>No shadow loop detected yet.</p>
              )}
            </div>

            {primaryLoopInfo && (
              <div className="border rounded-2xl p-8 mt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Your Primary Loop: {primaryLoopInfo.title}
                </h2>

                <p className="text-gray-300 mb-4">
                  {primaryLoopInfo.description}
                </p>

                <p><strong>Archetype:</strong> {primaryLoopInfo.archetype}</p>
                <p><strong>Element:</strong> {primaryLoopInfo.element}</p>
                <p><strong>Mechanism:</strong> {primaryLoopInfo.mechanism}</p>
                <p><strong>Core Emotion:</strong> {primaryLoopInfo.emotion}</p>
                <p><strong>Body Map:</strong> {primaryLoopInfo.body}</p>

                <p className="mt-4">
                  <strong>Core Belief:</strong> “{primaryLoopInfo.coreBelief}”
                </p>

                <div className="bg-white text-black rounded-xl p-5 mt-6">
                  <strong>Loop Breaker Practice:</strong>
                  <p>{primaryLoopInfo.loopBreaker}</p>
                </div>

                <div className="border border-zinc-700 rounded-xl p-5 mt-6">
                  <h3 className="text-xl font-semibold mb-3">
                    Integration Key
                  </h3>

                  <p className="mb-2">
                    <strong>Restoring Energy:</strong>{" "}
                    {primaryLoopInfo.integrationKey}
                  </p>

                  <p className="text-gray-300">
                    {primaryLoopInfo.integrationReason}
                  </p>
                </div>

                {weakestHealthyArchetype && (
                  <div className="border border-zinc-700 rounded-xl p-5 mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Lowest Integrated Archetype
                    </h3>

                    <p>
                      <strong>{weakestHealthyArchetype.archetype}</strong> —{" "}
{weakestHealthyArchetype.integratedPercent}% integrated
                    </p>

                    <p className="text-gray-300 mt-2">
                      This may be the energy that most needs strengthening to help break the loop.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href="/"
                className="bg-white text-black px-6 py-3 rounded-full font-semibold"
              >
                Return Home
              </a>

              <a
                href="/triggered"
                className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
              >
                I Am Triggered
</a>

{primaryLoopInfo && (
  <a
    href={`/archetypes/${primaryLoopInfo.archetype.toLowerCase()}`}
    className="border border-blue-400 text-blue-300 px-6 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-black"
  >
    Explore {primaryLoopInfo.archetype}
  </a>
)}

              <a
                href="/practices"
                className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
              >
                Explore Practices
              </a>
            </div>
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
          <p className="text-gray-400 mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <h1 className="text-4xl font-bold mb-10">
            Discover Your Shadow Loop
          </h1>

          <div className="border rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-8">
              {questions[currentQuestion].text}
            </h2>

            <div className="grid gap-3">
              {answerOptions.map((answer) => (
                <button
                  key={answer.value}
                  onClick={() => handleAnswer(answer.value)}
                  className="border rounded-xl p-4 text-left hover:bg-white hover:text-black"
                >
                  {answer.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}