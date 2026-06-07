"use client"

import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { useState } from "react"
import { questions, assessmentOrder } from "../data/questions"
import { loops } from "../data/loops"
import { trackEvent } from "../../lib/trackEvent"

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
  if (currentQuestion === 0 && responses.length === 0) {
    trackEvent("assessment_started");
  }

  const updatedResponses = [...responses];
  updatedResponses[currentQuestion] = value;
  setResponses(updatedResponses);

  if (currentQuestion < orderedQuestions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    trackEvent("assessment_completed");
    setFinished(true);
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


  const journeyByLoop: Record<
  string,
  { journey: string; integratedState: string }
> = {
  "Dimmed Light": {
    journey: "Visibility Path™",
    integratedState: "Healthy Visibility",
  },
  "Paper Crown": {
    journey: "Authentic Sovereignty Path™",
    integratedState: "Authentic Leadership",
  },
  "Stalled Flame": {
    journey: "Action Path™",
    integratedState: "Purposeful Action",
  },
  "Blank Page": {
    journey: "Creative Expression Path™",
    integratedState: "Authentic Expression",
  },
  "Smoky Mirrors": {
    journey: "Truth Path™",
    integratedState: "Self-Honesty",
  },
  "Mind Maze": {
    journey: "Clarity Path™",
    integratedState: "Clear Thinking",
  },
  "Emotional Lockdown": {
    journey: "Vulnerability Path™",
    integratedState: "Emotional Openness",
  },
  "Fantasy Fog": {
    journey: "Connection Path™",
    integratedState: "Genuine Connection",
  },
  "Flooded Waters": {
    journey: "Emotional Regulation Path™",
    integratedState: "Emotional Flow",
  },
  Compliance: {
    journey: "Boundaries Path™",
    integratedState: "Self-Respect",
  },
  Fortress: {
    journey: "Trust Path™",
    integratedState: "Connected Strength",
  },
  "Barren Ground": {
    journey: "Vitality Path™",
    integratedState: "Inner Vitality",
  },
};

  async function saveReportAndRedirect() {
  try {
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reportData: {
          primaryLoop: primaryLoop[0],
          integratedScores,
          loopLandscape,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not create report.");
      return;
    }

    trackEvent("report_unlocked", primaryLoop[0]);
    
    const primaryLoopName = primaryLoop[0];
const secondaryLoopName = secondaryLoop?.[0] || "";
const journeyInfo = journeyByLoop[primaryLoopName];

document.cookie = `archeloop_report_summary=${encodeURIComponent(
  JSON.stringify({
    primaryLoop: primaryLoopName,
    secondaryLoop: secondaryLoopName,
    archetype: primaryLoopInfo?.archetype || "",
    element: primaryLoopInfo?.element || "",
    journey: journeyInfo?.journey || "",
    integratedState: journeyInfo?.integratedState || "",
  })
)}; path=/; max-age=2592000`;

    window.location.href = `/report/${data.reportId}`;
  } catch {
    alert("Something went wrong while creating your report.");
  }
}

    return (
  <main className="min-h-screen bg-[#030712] text-stone-100">
    <Nav />

    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
          Find My Loop™ Complete
        </p>

        <h1 className="mt-5 text-5xl font-bold md:text-7xl">
          Your ArcheLoop Report™
          <br />
          is ready.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
          Your 60-question assessment has been analysed. We identified your
          Shadow Loop™, archetypal pattern, nervous system pattern, Integrated
          Self™, and recommended Integration Journey™.
        </p>
      </div>
    </section>

    {primaryLoopInfo && primaryLoop && (
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Primary Shadow Loop™
          </p>

          <h2 className="mt-5 text-4xl font-bold text-yellow-300 md:text-6xl">
            {primaryLoopInfo.title}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            {primaryLoopInfo.description}
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-stone-500">
            This is only the first layer. The full ArcheLoop Report™ reveals why
            this loop formed, what activates it, how it affects relationships,
            and the integration pathway beyond it.
          </p>
        </div>
      </section>
    )}

    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Choose Your Next Step
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Understand the loop or begin integration.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
              Product 1
            </p>

            <h3 className="mt-4 text-4xl font-bold text-yellow-300">
              ArcheLoop Report™
            </h3>

            <p className="mt-4 text-lg text-stone-500 line-through">£29</p>

            <p className="text-2xl font-semibold text-yellow-300">
              Free Founding Access
            </p>

            <p className="mt-5 leading-relaxed text-stone-300">
              Unlock your full personalised report and understand the deeper
              structure beneath your Shadow Loop™.
            </p>

            <div className="mt-7 grid gap-3 text-left">
              {[
                "Primary & Secondary Shadow Loops™",
                "Core belief and core fear",
                "Nervous system pattern",
                "Relationship dynamics",
                "Body map interpretation",
                "Integration blueprint",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
              Recommended
            </p>

           <h3 className="mt-4 text-4xl font-bold text-yellow-300">
  Find My Loop™ + First Month Integration™
</h3>

<p className="mt-4 text-lg text-stone-500 line-through">£39</p>

<p className="text-2xl font-semibold text-yellow-300">
  Free Founding Access
</p>

<p className="mt-5 leading-relaxed text-stone-300">
  Includes your full ArcheLoop Report™ and first month of ArcheLoop
  Integration™. After the first month, ArcheLoop Integration™ continues
  at the monthly subscription price.
</p>

            <div className="mt-7 grid gap-3 text-left">
              {[
  "Full ArcheLoop Report™",
  "First month ArcheLoop Integration™",
  "Triggered Pro™",
  "Progress Dashboard™",
  "Integration Journeys™",
  "My Integrated Vision™",
].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-yellow-300/20 bg-black/40 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Founding Access
          </p>

          <p className="mt-4 text-stone-300">
            Enter your Founding Access code to unlock your full ArcheLoop
            Report™ during the founding phase.
          </p>

          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter access code"
            className="mt-6 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white placeholder:text-gray-500 focus:border-yellow-300 focus:outline-none"
          />

          {hasFoundingAccess ? (
            <button
              type="button"
              onClick={saveReportAndRedirect}
              className="mt-5 w-full rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Unlock My ArcheLoop Report™
            </button>
          ) : (
            <button
              disabled
              className="mt-5 w-full cursor-not-allowed rounded-full bg-zinc-800 px-8 py-4 text-lg font-semibold text-gray-500"
            >
              Enter Code To Unlock
            </button>
          )}

          <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-left">
  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
    Founding Access Notice
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-400">
    No payment is required during Founding Access. ArcheLoop™ products are
    temporarily available for testing and feedback while the platform is being
    refined.
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-500">
    Future access to Find My Loop™, ArcheLoop Report™, ArcheLoop Integration™,
    Triggered Pro™, Progress Dashboard™, and Integration Journeys™ may require
    an active purchase or subscription after public launch. Founding Access does
    not guarantee free lifetime access.
  </p>
</div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);
}

  return (
  <main className="min-h-screen bg-[#030712] text-stone-100">
    <Nav />

    <section className="relative overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

      <div className="relative mx-auto max-w-4xl space-y-8">
<div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-6 shadow-[0_0_60px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Find My Loop™
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Find My Loop™
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-300">
           Complete the 60-question ArcheLoop assessment to generate your personalised ArcheLoop Report™. Your report reveals your Shadow Loop™, archetype, nervous system pattern, Integrated Self™, and recommended Integration Journey™.
          </p>
        </div>

       <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-5 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
          <div className="mb-8">
            <div className="mb-3 flex justify-between text-sm text-yellow-300/60">
              <span>
                Question {currentQuestion + 1} of {orderedQuestions.length}
              </span>

              <span>
                {Math.round(
                  ((currentQuestion + 1) / orderedQuestions.length) * 100
                )}
                %
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-black/50">
              <div
                className="h-full rounded-full bg-yellow-300 transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-6 flex justify-between">
            {currentQuestion > 0 ? (
              <button
                onClick={goBack}
                className="rounded-full border border-yellow-300/20 bg-black/30 px-5 py-2 text-sm text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {responses[currentQuestion] &&
              currentQuestion < questions.length - 1 && (
                <button
                  onClick={goNext}
                  className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
                >
                  Next →
                </button>
              )}
          </div>

          <div className="rounded-[1.5rem] border border-yellow-300/10 bg-black/30 p-5">
            <h2 className="mb-5 text-2xl font-semibold leading-snug text-stone-100">
              {orderedQuestions[currentQuestion]?.text}
            </h2>

            <div className="grid gap-3">
              {answerOptions.map((answer) => {
                const active = responses[currentQuestion] === answer.value;

                return (
                  <button
                    key={answer.value}
                    onClick={() => handleAnswer(answer.value)}
                    className={`rounded-2xl border px-5 py-3 text-left font-medium transition ${
                      active
                        ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_35px_rgba(216,183,120,0.18)]"
                        : "border-yellow-300/10 bg-[#0B1018] text-stone-300 hover:border-yellow-300/50 hover:bg-[#111827]"
                    }`}
                  >
                    {answer.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

       <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-7 shadow-[0_0_55px_rgba(216,183,120,0.07)]">
  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
    What You’ll Discover
  </p>

  <div className="mt-5 grid gap-3 text-stone-300 md:grid-cols-2">
    {[
  "Your Primary Shadow Loop™",
  "Your Secondary Shadow Loop™",
  "Your Archetype & Element",
  "Your Nervous System Pattern",
  "Your Integrated Self™",
  "Your Personalised ArcheLoop Report™",
].map((item) => (
      <div
        key={item}
        className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4"
      >
        ✓ {item}
      </div>
    ))}
  </div>

  <p className="mt-5 text-sm text-stone-400">
    60 questions • Approximately 5–7 minutes
  </p>
</div>
      </div>
    </section>

    <Footer />
  </main>
);
}