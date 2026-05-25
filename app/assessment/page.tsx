"use client"

import ElementalWheel from "../components/ElementalWheel"
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

    const sortedLoops = Object.entries(loopScores).sort((a, b) => b[1] - a[1])
    const primaryLoop = sortedLoops[0]
    const secondaryLoop = sortedLoops[1]

    const primaryLoopInfo = primaryLoop
      ? loops[primaryLoop[0] as keyof typeof loops]
      : null

    const weakestHealthyArchetype = integratedScores.sort(
      (a, b) => a.integratedPercent - b.integratedPercent
    )[0]

    const colours: Record<string, string> = {
      Fire: "bg-yellow-400",
      Air: "bg-blue-300",
      Water: "bg-red-400",
      Earth: "bg-green-500",
    }

    return (
      <main className="min-h-screen bg-black text-white">
        <Nav />

        <div className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Your Result</h1>

            <div className="relative overflow-hidden border border-yellow-300/30 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-10 mb-10">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_55%)]" />

  <div className="relative z-10">
    <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm mb-5">
      ArcheLoop Profile Preview
    </p>

    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      Your primary loop is{" "}
      <span className="text-yellow-300">
        {primaryLoopInfo?.title}
      </span>
    </h1>

    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
      This does not define who you are. It reflects a protective pattern
      that may activate under stress, pressure, emotion, or relational dynamics.
    </p>

    {primaryLoop && (
      <a
        href={`/loops/${primaryLoop[0]
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        className="inline-flex bg-yellow-300 text-black px-7 py-3 rounded-full font-semibold hover:bg-yellow-200 transition"
      >
        Explore {primaryLoop[0]} Loop
      </a>
    )}
  </div>
</div>

          {primaryLoopInfo && (
  <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 mb-10">
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-4">
      Primary Pattern Map
    </p>

    <h2 className="text-4xl font-bold mb-5">
      {primaryLoopInfo.title}
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed mb-8">
      {primaryLoopInfo.description}
    </p>

    <div className="grid md:grid-cols-2 gap-5 mb-8">
      <div className="border border-zinc-800 rounded-2xl p-5">
        <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
          Archetype
        </p>
        <p className="text-2xl font-semibold">{primaryLoopInfo.archetype}</p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-5">
        <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
          Element
        </p>
        <p className="text-2xl font-semibold">{primaryLoopInfo.element}</p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-5">
        <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
          Mechanism
        </p>
        <p className="text-2xl font-semibold">{primaryLoopInfo.mechanism}</p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-5">
        <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-2">
          Body Map
        </p>
        <p className="text-2xl font-semibold">{primaryLoopInfo.body}</p>
      </div>
    </div>

    <div className="border border-yellow-300/20 rounded-2xl p-6 mb-6 bg-black/40">
      <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-3">
        Core Belief
      </p>
      <p className="text-2xl text-yellow-300">
        “{primaryLoopInfo.coreBelief}”
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-white text-black rounded-2xl p-6">
        <p className="font-semibold mb-3">
          Loop Breaker Practice
        </p>
        <p>{primaryLoopInfo.loopBreaker}</p>
      </div>

      <div className="border border-zinc-800 rounded-2xl p-6">
        <p className="font-semibold mb-3">
          Integration Key
        </p>
        <p className="text-yellow-300 mb-2">
          Restoring Energy: {primaryLoopInfo.integrationKey}
        </p>
        <p className="text-gray-300">
          {primaryLoopInfo.integrationReason}
        </p>
      </div>
    </div>

    {weakestHealthyArchetype && (
      <div className="border border-zinc-800 rounded-2xl p-6 mt-6">
        <p className="text-gray-500 text-sm uppercase tracking-[0.25em] mb-3">
          Integration Pathway
        </p>

        <p className="text-xl">
          <strong>{weakestHealthyArchetype.archetype}</strong> appears as the
          lowest integrated archetypal energy in this result.
        </p>

        <p className="text-gray-300 mt-3">
          This may indicate where strengthening, grounding, or conscious
          integration could support breaking the loop.
        </p>
      </div>
    )}
  </div>
)}

            <div className="border border-yellow-300/20 rounded-3xl bg-gradient-to-b from-zinc-950 to-black p-8 mb-8">
              <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-4">
                Deeper Report Coming Soon
              </p>

              <h2 className="text-3xl font-bold mb-4">
                This result is the beginning of your ArcheLoop profile.
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                Future reports will expand this into a personalised map of your
                primary and secondary loops, elemental balance, nervous system
                patterns, relational activators, body map, and integration
                pathway.
              </p>

              <a
                href="/report"
                className="inline-flex bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-200 transition"
              >
                View Report Preview
              </a>
            </div>

<div className="mb-12">
  <div className="mb-8">
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-3">
      Elemental System
    </p>

    <h2 className="text-4xl font-bold mb-4">
      Integrated Elemental Presence
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
      ArcheLoop maps how different elemental energies appear within your current
      psychological system — including visibility, perception, emotional
      connection, grounding, protection, and regulation.
    </p>
  </div>

 <div className="mb-12">
  <ElementalWheel scores={elementalPercentages} />
</div>

<div className="grid md:grid-cols-2 gap-5">
    {elementalPercentages.map(({ element, percentage }) => {
      const descriptions: Record<string, string> = {
        Fire: "Visibility • Identity • Expression",
        Air: "Perception • Thought • Communication",
        Water: "Emotion • Vulnerability • Connection",
        Earth: "Grounding • Boundaries • Protection",
      }

      return (
        <div
          key={element}
          className="border border-zinc-800 rounded-[2rem] p-7 bg-gradient-to-b from-zinc-950 to-black"
        >
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-3xl font-bold">{element}</h3>
              <p className="text-gray-400 mt-2">
                {descriptions[element]}
              </p>
            </div>

            <div className="text-4xl font-bold text-yellow-300">
              {percentage}%
            </div>
          </div>

          <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-300 rounded-full transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )
    })}
  </div>
</div>

           <div className="mb-12">
  <div className="mb-8">
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-3">
      Archetype Profile
    </p>

    <h2 className="text-4xl font-bold mb-4">
      Integrated Archetypal Energy
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
      ArcheLoop explores how different archetypal energies appear across
      visibility, grounding, emotion, protection, perception, and expression.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-5">
    {integratedScores.map((item) => (
      <div
        key={item.archetype}
        className="border border-zinc-800 rounded-[2rem] p-7 bg-gradient-to-b from-zinc-950 to-black"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">
              {item.archetype}
            </h3>

            <p className="text-gray-400">
              Healthy expression vs shadow pressure
            </p>
          </div>

          <div className="text-4xl font-bold text-yellow-300">
            {item.integratedPercent}%
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Healthy Energy</span>
              <span>{item.healthyPercent}%</span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${item.healthyPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Shadow Pressure</span>
              <span>{item.shadowPercent}%</span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-400 rounded-full"
                style={{ width: `${item.shadowPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Integrated Energy</span>
              <span>{item.integratedPercent}%</span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-300 rounded-full"
                style={{ width: `${item.integratedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

            <div className="mb-12">
  <div className="mb-8">
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-3">
      Loop Interaction
    </p>

    <h2 className="text-4xl font-bold mb-4">
      Primary and Secondary Activations
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
      ArcheLoop looks not only at your primary loop, but also at the secondary
      patterns that may activate under stress, pressure, emotion, or relational
      dynamics.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-5">
    {primaryLoop && (
      <a
        href={`/loops/${primaryLoop[0].toLowerCase().replace(/\s+/g, "-")}`}
        className="group relative overflow-hidden border border-yellow-300/30 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-7 hover:border-yellow-300/60 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.1),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-4">
            Primary Adaptation
          </p>

          <h3 className="text-4xl font-bold mb-4 group-hover:text-yellow-300 transition">
            {primaryLoop[0]}
          </h3>

          <p className="text-gray-300 mb-6">
            This appears to be the strongest activated loop in your current
            response pattern.
          </p>

          <p className="text-yellow-300 font-semibold">
            Explore {primaryLoop[0]} →
          </p>
        </div>
      </a>
    )}

    {secondaryLoop && (
      <a
        href={`/loops/${secondaryLoop[0].toLowerCase().replace(/\s+/g, "-")}`}
        className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-7 hover:border-yellow-300/40 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-4">
            Secondary Activation
          </p>

          <h3 className="text-4xl font-bold mb-4 group-hover:text-yellow-300 transition">
            {secondaryLoop[0]}
          </h3>

          <p className="text-gray-300 mb-6">
            This may appear as a related protective pattern or compensatory
            response under pressure.
          </p>

          <p className="text-yellow-300 font-semibold">
            Explore {secondaryLoop[0]} →
          </p>
        </div>
      </a>
    )}
  </div>
</div>

            <div className="flex gap-4 mt-8 flex-wrap">
              <a href="/" className="bg-white text-black px-6 py-3 rounded-full font-semibold">
                Return Home
              </a>

              <a href="/triggered" className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black">
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

              <a href="/practices" className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black">
                Explore Practices
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
      Question {currentQuestion + 1} of {questions.length}
    </span>

    <span>
      {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
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

<div className="border rounded-2xl p-8 mb-8">
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

<div className="border border-yellow-300/20 rounded-3xl bg-gradient-to-b from-zinc-950 to-black p-6">
  <p className="uppercase tracking-[0.3em] text-yellow-300 text-xs mb-3">
    Future Report Preview
  </p>

  <p className="text-gray-300 leading-relaxed">
    Your answers will eventually help shape your ArcheLoop Personal Pattern Report,
    mapping shadow loops, archetypal patterns, nervous system responses, and integration pathways.
  </p>
</div>
        </div>
      </div>

      <Footer />
    </main>
  )
}