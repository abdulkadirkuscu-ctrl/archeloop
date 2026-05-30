"use client"

import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { useState } from "react"
import { questions, assessmentOrder } from "../data/questions"
import { loops } from "../data/loops"

const answerOptions = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
]
function scoreToPercent(score: number) {
  const scale: Record<number, number> = {
    1: 0,
    2: 25,
    3: 50,
    4: 75,
    5: 100,
  }

  return scale[score] ?? 0
}
const orderedQuestions = assessmentOrder
  .map((id) => questions.find((q) => q.id === id))
  .filter(Boolean)

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [accessCode, setAccessCode] = useState("")


  function handleAnswer(value: number) {
  const updatedResponses = [...responses]
  updatedResponses[currentQuestion] = value
  setResponses(updatedResponses)

  if (currentQuestion < orderedQuestions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setFinished(true)
  }
}

function goBack() {
  if (currentQuestion > 0) {
    setCurrentQuestion(currentQuestion - 1)
  }
}

function goNext() {
  if (
    responses[currentQuestion] &&
    currentQuestion < questions.length - 1
  ) {
    setCurrentQuestion(currentQuestion + 1)
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

const suppressionScores: Record<string, number> = {}
const suppressionCounts: Record<string, number> = {}

const compensationScores: Record<string, number> = {}
const compensationCounts: Record<string, number> = {}

const collisionScores: Record<string, number> = {}
const collisionCounts: Record<string, number> = {}

const loopScores: Record<string, number> = {}

responses.forEach((rawScore, index) => {
  const question = orderedQuestions[index]
  if (!question) return

  const score = scoreToPercent(rawScore)
  const archetype = question.archetype

  if (question.mechanism === "Healthy") {
    healthyScores[archetype] = (healthyScores[archetype] || 0) + score
    healthyCounts[archetype] = (healthyCounts[archetype] || 0) + 1
  }

  if (question.mechanism === "Suppression") {
    suppressionScores[archetype] =
      (suppressionScores[archetype] || 0) + score
    suppressionCounts[archetype] =
      (suppressionCounts[archetype] || 0) + 1
  }

  if (question.mechanism === "Compensation") {
    compensationScores[archetype] =
      (compensationScores[archetype] || 0) + score
    compensationCounts[archetype] =
      (compensationCounts[archetype] || 0) + 1
  }

  if (question.mechanism === "Collision") {
    collisionScores[archetype] =
      (collisionScores[archetype] || 0) + score
    collisionCounts[archetype] =
      (collisionCounts[archetype] || 0) + 1
  }

  if (question.mechanism !== "Healthy") {
    loopScores[question.category] =
      (loopScores[question.category] || 0) + score
  }
})

const archetypes = ["Sovereign", "Magician", "Lover", "Warrior"]

const integratedScores = archetypes.map((archetype) => {

  const healthyPercent = Math.round(
  (healthyScores[archetype] || 0) / (healthyCounts[archetype] || 1)
)

const suppressionPercent = Math.round(
  (suppressionScores[archetype] || 0) / (suppressionCounts[archetype] || 1)
)

const compensationPercent = Math.round(
  (compensationScores[archetype] || 0) / (compensationCounts[archetype] || 1)
)

const collisionPercent = Math.round(
  (collisionScores[archetype] || 0) / (collisionCounts[archetype] || 1)
)

  const shadowPercent = Math.round(
    (suppressionPercent + compensationPercent + collisionPercent) / 3
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
    suppressionPercent,
    compensationPercent,
    collisionPercent,
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
      percentage: Math.round((item.percentage / totalElementalPresence) * 100),
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

    const loopToArchetype: Record<string, string> = {
  "Dimmed Light": "Sovereign",
  "Paper Crown": "Sovereign",
  "Stalled Flame": "Sovereign",

  "Blank Page": "Magician",
  "Smoky Mirrors": "Magician",
  "Mind Maze": "Magician",

  "Emotional Lockdown": "Lover",
  "Fantasy Fog": "Lover",
  "Flooded Waters": "Lover",

  Compliance: "Warrior",
  Fortress: "Warrior",
  "Barren Ground": "Warrior",
}

const loopToFormation: Record<string, "suppressionPercent" | "compensationPercent" | "collisionPercent"> = {
  "Dimmed Light": "suppressionPercent",
  "Paper Crown": "compensationPercent",
  "Stalled Flame": "collisionPercent",

  "Blank Page": "suppressionPercent",
  "Smoky Mirrors": "compensationPercent",
  "Mind Maze": "collisionPercent",

  "Emotional Lockdown": "suppressionPercent",
  "Fantasy Fog": "compensationPercent",
  "Flooded Waters": "collisionPercent",

  Compliance: "suppressionPercent",
  Fortress: "compensationPercent",
  "Barren Ground": "collisionPercent",
}

const weightedLoopScores = Object.entries(loopScores).map(([loopName, rawScore]) => {
  const archetype = loopToArchetype[loopName]
  const formationKey = loopToFormation[loopName]
  const archetypeScore = integratedScores.find((item) => item.archetype === archetype)

  const loopAverage = Math.round(rawScore / 3)
  const formationScore = archetypeScore ? archetypeScore[formationKey] : loopAverage
  const lowIntegrationPressure = archetypeScore
    ? 100 - archetypeScore.integratedPercent
    : 50

  const finalScore = Math.round(
    loopAverage * 0.5 +
      formationScore * 0.3 +
      lowIntegrationPressure * 0.2
  )

  return [loopName, finalScore] as [string, number]
})

const sortedLoops = weightedLoopScores.sort((a, b) => b[1] - a[1])

const loopLandscape = sortedLoops.map(([loop, score]) => ({
  loop,
  score,
}))

const primaryLoop = sortedLoops[0]
const secondaryLoop = sortedLoops[1]

    const primaryLoopInfo = primaryLoop
      ? loops[primaryLoop[0] as keyof typeof loops]
      : null

    const weakestHealthyArchetype = integratedScores.sort(
      (a, b) => a.integratedPercent - b.integratedPercent
    )[0]

    const premiumDataReady = {
      integratedScores,
      elementalActivation,
      elementalPercentages,
      secondaryLoop,
      weakestHealthyArchetype,
    }
    const hasFoundingAccess =
  accessCode.trim().toUpperCase() === "FOUNDING50"

    return (
      <main className="min-h-screen bg-black text-white">
        <Nav />

        <div className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="uppercase tracking-[0.35em] text-gray-500 text-sm mb-5">
              ArcheLoop Profile Preview
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Your Result
            </h1>

            {primaryLoopInfo && primaryLoop && (
              <>
                <section className="relative overflow-hidden border border-yellow-300/30 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-10 mb-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_55%)]" />

                  <div className="relative z-10">
                    <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
                      Primary Loop
                    </p>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                      Your primary loop is{" "}
                      <span className="text-yellow-300">
                        {primaryLoopInfo.title}
                      </span>
                    </h2>

                    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-8">
                      {primaryLoopInfo.description}
                    </p>

                    <p className="text-gray-400 leading-relaxed max-w-3xl">
                      This does not define who you are. It reflects a protective
                      pattern that may activate under stress, pressure, emotion,
                      or relational dynamics.
                    </p>
                  </div>
                </section>

                <section className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 mb-10">
                  <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-6">
                    Primary Pattern Snapshot
                  </p>

                  <div className="grid md:grid-cols-2 gap-5 mb-8">
                    <div className="border border-zinc-800 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
                        Archetype
                      </p>
                      <p className="text-2xl font-semibold">
                        {primaryLoopInfo.archetype}
                      </p>
                    </div>

                    <div className="border border-zinc-800 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
                        Element
                      </p>
                      <p className="text-2xl font-semibold">
                        {primaryLoopInfo.element}
                      </p>
                    </div>

                    <div className="border border-zinc-800 rounded-2xl p-5">
  <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
    Pattern Formation
  </p>

  <p className="text-2xl font-semibold">
    {primaryLoopInfo?.mechanism === "Suppression"
      ? "Collapsed"
      : primaryLoopInfo?.mechanism === "Compensation"
      ? "Compensated"
      : primaryLoopInfo?.mechanism === "Collision"
      ? "Collision"
      : "Unknown"}
  </p>
</div>

                    <div className="border border-zinc-800 rounded-2xl p-5">
                      <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
                        Core Belief
                      </p>
                      <p className="text-xl font-semibold text-yellow-300">
                        “{primaryLoopInfo.coreBelief}”
                      </p>
                    </div>
                  </div>

                  <div className="bg-white text-black rounded-2xl p-6">
                    <p className="font-semibold mb-3">
                      First Loop Breaker
                    </p>

                    <p className="leading-relaxed">
                      {primaryLoopInfo.loopBreaker}
                    </p>
                  </div>
                </section>

                <section className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8 mb-10">
                  <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
                    Unlock The Full Report
                  </p>

                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Want the deeper map?
                  </h2>

                  <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
                    Your full ArcheLoop Report expands this preview into a comprehensive pattern map, including secondary
                    loops, elemental balance, nervous system patterns,
                    relational activators, body map interpretation, loop
                    interaction dynamics, and integration guidance.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {[
                      "Secondary loop activations",
                      "Elemental balance",
                      "Nervous system patterns",
                      "Relational activators",
                      "Body map interpretation",
                      "Loop interaction dynamics",
                      "Integration pathway",
                      "Personalised loop breakers",
                    ].map((item) => (
                      <div
                        key={item}
                        className="border border-zinc-800 rounded-2xl p-4 text-gray-300 bg-black/40"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                   <div className="border border-zinc-800 rounded-[2rem] bg-black p-8 mt-8">

  <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-4">
    Founding Access
  </p>

  <h3 className="text-2xl font-bold mb-4">
  First 50 Reports Free
</h3>

<p className="text-xl font-semibold text-yellow-300 mb-4">
  Unlock Your Full ArcheLoop Report
</p>

  <p className="text-gray-400 leading-relaxed mb-6">
   The first 50 ArcheLoop reports are currently available free as part of the
Founding Access programme.

If you have received a Founding Access code, enter it below to unlock your report.
  </p>

  <input
    type="text"
    value={accessCode}
    onChange={(e) => setAccessCode(e.target.value)}
    placeholder="Enter access code"
    className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300 mb-5"
  />

  {hasFoundingAccess ? (
    <a
      href={`/report-preview?loop=${encodeURIComponent(primaryLoop[0])}&scores=${encodeURIComponent(JSON.stringify(integratedScores))}&loops=${encodeURIComponent(JSON.stringify(loopLandscape))}`}
      className="block text-center bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
    >
      Unlock My Full ArcheLoop Report
    </a>
  ) : (
    <button
      disabled
      className="w-full bg-zinc-800 text-gray-500 px-8 py-4 rounded-full font-semibold text-lg cursor-not-allowed"
    >
      Enter Code To Unlock Report
    </button>
  )}

  <p className="text-xs text-gray-600 mt-5">
    No payment is required during the founding phase. Access is limited while early feedback is collected.
  </p>

</div>

                    <a
                      href={`/loops/${primaryLoop[0]
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="border border-zinc-700 px-7 py-3 rounded-full font-semibold hover:border-yellow-300 hover:text-yellow-300 transition"
                    >
                      Explore {primaryLoopInfo.title}
                    </a>
                  </div>
                </section>

               <div className="hidden">
  {JSON.stringify(premiumDataReady)}
</div>
              </>
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

              <a
               href={`/report-preview?loop=${encodeURIComponent(primaryLoop[0])}&scores=${encodeURIComponent(JSON.stringify(integratedScores))}`}
                className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
              >
                View Report Page
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>
               Question {currentQuestion + 1} of {orderedQuestions.length}
              </span>

              <span>
               {Math.round(((currentQuestion + 1) / orderedQuestions.length) * 100)}%
              </span>
            </div>

            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-300 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-10">
            Discover Your Shadow Loop
          </h1>

<div className="flex justify-between mb-6">
  {currentQuestion > 0 ? (
    <button
      onClick={goBack}
      className="border border-zinc-700 px-5 py-2 rounded-full text-sm text-gray-300 hover:border-yellow-300 hover:text-yellow-300 transition"
    >
      ← Back
    </button>
  ) : (
    <div />
  )}

  {responses[currentQuestion] && currentQuestion < questions.length - 1 && (
    <button
      onClick={goNext}
      className="border border-zinc-700 px-5 py-2 rounded-full text-sm text-gray-300 hover:border-yellow-300 hover:text-yellow-300 transition"
    >
      Next →
    </button>
  )}
</div>


          <div className="border rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-8">
             {orderedQuestions[currentQuestion]?.text}
            </h2>

            <div className="grid gap-3">
              {answerOptions.map((answer) => (
  <button
    key={answer.value}
    onClick={() => handleAnswer(answer.value)}
    className={`border rounded-xl p-4 text-left transition ${
      responses[currentQuestion] === answer.value
        ? "bg-yellow-300 text-black border-yellow-300"
        : "hover:bg-white hover:text-black"
    }`}
  >
    {answer.label}
  </button>
))}
            </div>
          </div>

          <div className="border border-yellow-300/20 rounded-3xl bg-gradient-to-b from-zinc-950 to-black p-6">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-xs mb-3">
              Future Report Preview
            </p>

            <p className="text-gray-300 leading-relaxed">
              Your answers will eventually help shape your ArcheLoop Personal
              Pattern Report, mapping shadow loops, archetypal patterns, nervous
              system responses, and integration pathways.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}