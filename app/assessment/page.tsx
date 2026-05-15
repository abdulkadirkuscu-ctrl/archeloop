"use client"

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

function Nav() {
  return (
    <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
      <a href="/" className="hover:text-yellow-300">Home</a>
      <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
      <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
      <a href="/practices" className="hover:text-yellow-300">Practices</a>
    </nav>
  )
}

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
    const healthyElementScores: Record<string, number> = {
      Fire: 0,
      Air: 0,
      Water: 0,
      Earth: 0,
    }

    const loopScores: Record<string, number> = {}
    const healthyScores: Record<string, number> = {}

    responses.forEach((score, index) => {
      const question = questions[index]

      if (question.mechanism === "Healthy") {
        healthyElementScores[question.element] += score

        healthyScores[question.archetype] =
          (healthyScores[question.archetype] || 0) + score
      } else {
        healthyElementScores[question.element] += 6 - score

        loopScores[question.category] =
          (loopScores[question.category] || 0) + score
      }
    })

    const totalHealthyEnergy = Object.values(healthyElementScores).reduce(
      (a, b) => a + b,
      0
    )

    const elementalPercentages = Object.entries(healthyElementScores).map(
      ([element, score]) => ({
        element,
        percentage: Math.round((score / totalHealthyEnergy) * 100),
      })
    )

    const sortedLoops = Object.entries(loopScores).sort(
      (a, b) => b[1] - a[1]
    )

    const primaryLoop = sortedLoops[0]
    const secondaryLoop = sortedLoops[1]

    const primaryLoopInfo = primaryLoop
      ? loops[primaryLoop[0] as keyof typeof loops]
      : null

    const weakestHealthyArchetype = Object.entries(healthyScores).sort(
      (a, b) => a[1] - b[1]
    )[0]

    return (
      <main className="min-h-screen bg-black text-white">
        <Nav />

        <div className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Your Result</h1>

            <div className="border rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Elemental Balance
              </h2>

              {elementalPercentages.map(({ element, percentage }) => (
                <div key={element} className="mb-5">
                  <div className="flex justify-between mb-1">
                    <span>{element}</span>
                    <span>{percentage}%</span>
                  </div>

                  <div className="h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        element === "Fire"
                          ? "bg-yellow-400"
                          : element === "Air"
                          ? "bg-blue-400"
                          : element === "Water"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Healthy Archetype Scores
              </h2>

              {Object.entries(healthyScores).map(([archetype, score]) => (
                <p key={archetype} className="text-lg">
                  Healthy {archetype}: {score} / 30
                </p>
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
                      <strong>{weakestHealthyArchetype[0]}</strong> —{" "}
                      {weakestHealthyArchetype[1]} / 30
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
    </main>
  )
}