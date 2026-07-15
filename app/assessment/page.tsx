"use client"

import Footer from "../components/Footer"
import Nav from "../components/Nav"
import { useEffect, useRef, useState } from "react"
import { questions, assessmentOrder } from "../data/questions"
import { loops } from "../data/loops"
import { trackEvent } from "../../lib/trackEvent"
import { supabaseClient } from "../../lib/supabaseClient"
import {
  scoreAssessment,
  type ScoredQuestion,
  type AssessmentResult,
  type ArchetypeScore,
} from "../data/scoring"

const answerOptions = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
]

const orderedQuestions = assessmentOrder
  .map((id) => questions.find((q) => q.id === id))
  .filter(Boolean)

const journeyByLoop: Record<
  string,
  { journey: string; integratedState: string }
> = {
  "Dimmed Light": {
    journey: "Visibility Path",
    integratedState: "Healthy Visibility",
  },
  "Paper Crown": {
    journey: "Authentic Sovereignty Path",
    integratedState: "Authentic Leadership",
  },
  "Stalled Flame": {
    journey: "Action Path",
    integratedState: "Purposeful Action",
  },
  "Blank Page": {
    journey: "Creative Expression Path",
    integratedState: "Authentic Expression",
  },
  "Smoky Mirrors": {
    journey: "Truth Path",
    integratedState: "Self-Honesty",
  },
  "Mind Maze": {
    journey: "Clarity Path",
    integratedState: "Clear Thinking",
  },
  "Emotional Lockdown": {
    journey: "Vulnerability Path",
    integratedState: "Emotional Openness",
  },
  "Fantasy Fog": {
    journey: "Connection Path",
    integratedState: "Genuine Connection",
  },
  "Flooded Waters": {
    journey: "Emotional Regulation Path",
    integratedState: "Emotional Flow",
  },
  Compliance: {
    journey: "Boundaries Path",
    integratedState: "Self-Respect",
  },
  Fortress: {
    journey: "Trust Path",
    integratedState: "Connected Strength",
  },
  "Barren Ground": {
    journey: "Vitality Path",
    integratedState: "Inner Vitality",
  },
}

// Report v2 saved snapshot: the full AssessmentResult, plus compatibility
// aliases so app/assessment/page.tsx and components/FullReport.tsx keep
// working against the field names they already read. scoringVersion (carried
// through from AssessmentResult) is what gates Report v2 rendering in
// FullReport.tsx - old saved reports simply lack this field and fall back to
// the pre-v2 layout untouched.
type PendingReportData = Omit<AssessmentResult, "primaryLoop" | "secondaryLoop"> & {
  primaryLoop: string
  secondaryLoop: string
  confidence: number
  integratedScores: ArchetypeScore[]
}

type PendingReportPayload = {
  reportData: PendingReportData
  selectedProduct: "report" | "bundle" | null
  createdAt: string
}

const PENDING_REPORT_KEY = "archeloop_pending_report"
const PENDING_REPORT_MAX_AGE_MS = 24 * 60 * 60 * 1000

function readPendingReport(): PendingReportPayload | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(PENDING_REPORT_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as PendingReportPayload

    const isValidShape =
      parsed &&
      typeof parsed.createdAt === "string" &&
      parsed.reportData &&
      typeof parsed.reportData.primaryLoop === "string" &&
      Array.isArray(parsed.reportData.loopLandscape)

    if (!isValidShape) {
      window.localStorage.removeItem(PENDING_REPORT_KEY)
      return null
    }

    const age = Date.now() - Date.parse(parsed.createdAt)

    if (!Number.isFinite(age) || age < 0 || age > PENDING_REPORT_MAX_AGE_MS) {
      window.localStorage.removeItem(PENDING_REPORT_KEY)
      return null
    }

    return parsed
  } catch {
    window.localStorage.removeItem(PENDING_REPORT_KEY)
    return null
  }
}

function writePendingReport(reportData: PendingReportData) {
  if (typeof window === "undefined") return

  const payload: PendingReportPayload = {
    reportData,
    selectedProduct: null,
    createdAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(PENDING_REPORT_KEY, JSON.stringify(payload))
  } catch {
    // localStorage unavailable (private browsing, quota) - safe to ignore
  }
}

function writePendingProduct(product: "report" | "bundle") {
  const existing = readPendingReport()
  if (!existing) return

  const payload: PendingReportPayload = {
    ...existing,
    selectedProduct: product,
  }

  try {
    window.localStorage.setItem(PENDING_REPORT_KEY, JSON.stringify(payload))
  } catch {
    // ignore
  }
}

function clearPendingReport() {
  if (typeof window === "undefined") return

  try {
    window.localStorage.removeItem(PENDING_REPORT_KEY)
  } catch {
    // ignore
  }
}

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [restoredReportData, setRestoredReportData] =
    useState<PendingReportData | null>(null)
  const [pendingNotice, setPendingNotice] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  const savingRef = useRef(false)
  const resumeHandledRef = useRef(false)
  const hasPersistedRef = useRef(false)
  const reportDataRef = useRef<PendingReportData | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const isResume = params.get("resume") === "checkout"
    const pending = readPendingReport()

    if (pending) {
      setRestoredReportData(pending.reportData)
      setFinished(true)
    } else if (isResume) {
      setPendingNotice(
        "We couldn't find your completed assessment. It may have expired. Please retake Find My Loop below."
      )
    }

    if (isResume && pending && !resumeHandledRef.current) {
      resumeHandledRef.current = true
      void resumeCheckout(pending)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function saveAndContinue(
    product: "report" | "bundle",
    reportData: PendingReportData
  ) {
    if (savingRef.current) return
    savingRef.current = true
    setSaving(true)
    setSaveError("")

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportData }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSaveError(data.error || "Could not save your report. Please try again.")
        return
      }

      trackEvent("report_opened", reportData.primaryLoop)

      const journeyInfo = journeyByLoop[reportData.primaryLoop]
      const secondaryLoopName = reportData.loopLandscape?.[1]?.loop || ""
      const primaryLoopInfoForCookie =
        loops[reportData.primaryLoop as keyof typeof loops]

      document.cookie = `archeloop_report_summary=${encodeURIComponent(
        JSON.stringify({
          primaryLoop: reportData.primaryLoop,
          secondaryLoop: secondaryLoopName,
          archetype: primaryLoopInfoForCookie?.archetype || "",
          element: primaryLoopInfoForCookie?.element || "",
          journey: journeyInfo?.journey || "",
          integratedState: journeyInfo?.integratedState || "",
        })
      )}; path=/; max-age=2592000`

      clearPendingReport()
      window.location.href = `/checkout?product=${product}`
    } catch {
      setSaveError(
        "Something went wrong while saving your report. Please try again."
      )
    } finally {
      savingRef.current = false
      setSaving(false)
    }
  }

  async function resumeCheckout(pending: PendingReportPayload) {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) return

    const product = pending.selectedProduct === "bundle" ? "bundle" : "report"
    await saveAndContinue(product, pending.reportData)
  }

  async function handleProductClick(product: "report" | "bundle") {
    if (savingRef.current) return
    if (!reportDataRef.current) return

    writePendingProduct(product)
    setSaving(true)

    const {
      data: { session },
    } = await supabaseClient.auth.getSession()

    if (!session) {
      setSaving(false)
      window.location.href =
        "/auth/login?redirectTo=" +
        encodeURIComponent("/assessment?resume=checkout")
      return
    }

    await saveAndContinue(product, reportDataRef.current)
  }

  function handleAnswer(value: number) {
    if (currentQuestion === 0 && responses.length === 0) {
      trackEvent("assessment_started")
    }

    const updatedResponses = [...responses]
    updatedResponses[currentQuestion] = value
    setResponses(updatedResponses)

    if (currentQuestion < orderedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      trackEvent("assessment_completed")
      setFinished(true)
    }
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  function goNext() {
    if (responses[currentQuestion] && currentQuestion < orderedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  if (finished) {
    const result = scoreAssessment(responses, orderedQuestions as ScoredQuestion[])

    const primaryLoopInfo = result.primaryLoop
      ? loops[result.primaryLoop.loop as keyof typeof loops]
      : null

    // Report v2: save the complete AssessmentResult as a frozen snapshot,
    // not just a hand-picked subset. Legacy-named aliases are layered on top
    // so existing rendering code keeps working unchanged. This report is
    // never recomputed after saving - reopening it always renders this exact
    // snapshot (see components/FullReport.tsx, which never calls
    // scoreAssessment()).
    const computedReportData: PendingReportData | null = result.primaryLoop
      ? {
          ...result,
          primaryLoop: result.primaryLoop.loop,
          secondaryLoop: result.secondaryLoop?.loop ?? "",
          confidence: result.resultClarity,
          integratedScores: result.archetypeScores,
        }
      : null

    const activePrimaryLoopInfo = restoredReportData
      ? loops[restoredReportData.primaryLoop as keyof typeof loops] || null
      : primaryLoopInfo

    if (restoredReportData) {
      reportDataRef.current = restoredReportData
    } else if (computedReportData) {
      reportDataRef.current = computedReportData

      if (!hasPersistedRef.current) {
        hasPersistedRef.current = true
        writePendingReport(computedReportData)
      }
    }

    return (
      <main className="al-page min-h-screen">
        <Nav />

        <section className="al-section">
          <div className="mx-auto max-w-5xl text-center">
            <p className="al-kicker">
              Find My Loop Complete
            </p>

            <h1 className="al-heading-xl">
              Your ArcheLoop Report
              <br />
              is ready.
            </h1>

            <p className="al-text-lg mx-auto mt-8 max-w-3xl">
              Your responses have identified the Shadow Loop currently most active for you,
              along with your archetypal pattern, nervous system activation,
              Integration Journey, and Integrated Self.
            </p>
          </div>
        </section>

        {activePrimaryLoopInfo && (
          <section className="al-section-tight">
            <div className="al-container al-premium-card p-10 text-center">
              <p className="al-kicker">
                Primary Shadow Loop
              </p>

              <h2 className="mt-5 text-4xl font-bold text-[var(--al-accent)] md:text-6xl">
                {activePrimaryLoopInfo.title}
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed al-text">
                {activePrimaryLoopInfo.description}
              </p>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed al-muted">
 This is a preview of your ArcheLoop Report. Your full report
explores why this pattern developed, what activates it, how it
influences your relationships and nervous system, and how to move
toward your Integrated Self.
</p>
            </div>
          </section>
        )}

        <section className="al-section">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="al-kicker">
  Your Assessment Is Complete
</p>

<h2 className="al-heading-lg">
  Choose Your Next Step
</h2>

<p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed al-text">
  You've discovered your Shadow Loop.

  Now choose how you'd like to continue your Integration Journey.
</p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="al-card p-8">
                <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                  Personal Report
                </p>

                <h3 className="mt-4 text-4xl font-bold text-[var(--al-accent)]">
                  ArcheLoop Report
                </h3>

                <p className="text-2xl font-semibold text-[var(--al-accent)]">£19</p>

<p className="mt-2 text-sm al-muted">
  Regular price £29
</p>

                <p className="mt-5 leading-relaxed al-text">
                  Understand your Shadow Loop in depth and discover the beliefs, nervous system patterns, relational dynamics, and Integration Journey shaping your experience.
                </p>

                <div className="mt-7 grid gap-3 text-left">
                  {[
                    "Primary & Secondary Shadow Loops",
                    "Core belief and core fear",
                    "Nervous system pattern",
                    "Relationship dynamics",
                    "Body map interpretation",
                    "Integration blueprint",
                  ].map((item) => (
                    <div
                      key={item}
                      className="al-soft-card p-4"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleProductClick("report")}
                  disabled={saving}
                  className="al-button-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Continue to Full ArcheLoop Report"}
                </button>
              </div>

              <div className="al-premium-card p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--al-accent)]">
                  Most Complete Experience
                </p>

                <h3 className="mt-4 text-4xl font-bold text-[var(--al-accent)]">
                  Report + First Month Integration
                </h3>

                <p className="text-2xl font-semibold text-[var(--al-accent)]">£29</p>

<p className="mt-2 text-sm al-muted">
  Regular price £58
</p>

                <p className="mt-5 leading-relaxed al-text">
                  Move beyond understanding.

Continue into ArcheLoop Integration to recognise your Shadow Loops in everyday life, interrupt automatic reactions, and begin living from your Integrated Self.
                </p>

                <div className="mt-7 grid gap-3 text-left">
                  {[
                    "Full ArcheLoop Report",
                    "First month ArcheLoop Integration",
                    "Triggered Pro",
                    "Progress Dashboard",
                    "Integration Journeys",
                    "My Integrated Vision",
                  ].map((item) => (
                    <div
                      key={item}
                      className="al-soft-card p-4"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleProductClick("bundle")}
                  disabled={saving}
                  className="al-button-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Choose Report + Integration"}
                </button>
              </div>
            </div>

            {saveError && (
              <p
                role="alert"
                className="mx-auto mt-8 max-w-2xl text-center text-sm text-red-400"
              >
                {saveError}
              </p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    )
  }

 return (
  <main className="al-page min-h-screen">
    <Nav />

    {pendingNotice && (
      <section className="al-section-tight">
        <div className="mx-auto max-w-4xl">
          <p role="alert" className="al-card p-4 text-center text-sm text-red-400">
            {pendingNotice}
          </p>
        </div>
      </section>
    )}

    <section className="al-section-tight">
      <div className="relative mx-auto max-w-4xl space-y-8">

        <div className="al-premium-card p-8 text-center">

          <p className="al-kicker">
            Assessment
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Find My Loop
          </h1>

          <p className="al-brand-tagline mt-5 justify-center">
            <span className="al-understand-word">Understand</span>

            <span className="al-brand-divider">•</span>

            <span className="al-interrupt-word">Interrupt</span>

            <span className="al-brand-divider">•</span>

            <span className="al-integrate-word">Integrate</span>
          </p>

          <p className="mt-6 al-text-lg mx-auto max-w-3xl">
            Complete the 60-question assessment to discover your Shadow Loop.
            <br />
            <br />
            Your personalised ArcheLoop Report reveals your archetypal
            pattern, nervous system activation, Integration Journey, and
            the Integrated Self your pattern points toward.
          </p>

        </div>

        <div className="al-card p-6 text-left">
          <p className="al-kicker">How to Answer</p>

          <p className="al-text mt-4">
            Choose the response that best reflects how you usually think,
            feel, or behave — particularly under pressure. Answer according
            to what is most consistently true for you, not what you believe
            should be true.
          </p>

          <p className="al-text mt-4">
            You may recognise both Healthy and Protective expressions in
            yourself. This is normal — choose the response that best
            represents how strongly each statement applies to you. There are
            no good or bad answers. This is educational, not diagnostic, and
            more honest responses produce a clearer result.
          </p>

          <div className="al-soft-card mt-6 p-5">
            <p className="al-kicker mb-3">The Scale</p>

            <dl className="al-text space-y-1.5 text-sm">
              <div>
                <span className="font-semibold text-[var(--al-text)]">
                  Strongly disagree
                </span>{" "}
                — rarely or almost never true for me.
              </div>
              <div>
                <span className="font-semibold text-[var(--al-text)]">
                  Disagree
                </span>{" "}
                — usually not true for me.
              </div>
              <div>
                <span className="font-semibold text-[var(--al-text)]">
                  Neutral
                </span>{" "}
                — sometimes true, depends on the situation, or I am unsure.
              </div>
              <div>
                <span className="font-semibold text-[var(--al-text)]">
                  Agree
                </span>{" "}
                — often true for me.
              </div>
              <div>
                <span className="font-semibold text-[var(--al-text)]">
                  Strongly agree
                </span>{" "}
                — consistently or strongly true for me.
              </div>
            </dl>

            <p className="al-muted mt-4 text-xs">
              When two answers feel possible, choose the one that describes
              your more automatic response under pressure.
            </p>
          </div>
        </div>

          <div className="al-card p-5">
            <div className="mb-8">
              <div className="mb-3 flex justify-between text-sm al-kicker">
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

              <div className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
                <div
                  className="h-full rounded-full bg-[var(--al-accent)] transition-all duration-500"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / orderedQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="mb-6 flex justify-between">
              {currentQuestion > 0 ? (
                <button
                  onClick={goBack}
                  className="al-button-secondary px-5 py-2 text-sm"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {responses[currentQuestion] &&
                currentQuestion < orderedQuestions.length - 1 && (
                  <button
                    onClick={goNext}
                    className="al-button-secondary px-5 py-2 text-sm"
                  >
                    Next →
                  </button>
                )}
            </div>

            <div className="al-card p-5">
              <h2 className="mb-5 text-2xl font-semibold leading-snug text-[var(--al-text)]">
                {orderedQuestions[currentQuestion]?.text}
              </h2>

              <div className="grid gap-3">
                {answerOptions.map((answer) => {
                  const active = responses[currentQuestion] === answer.value

                  return (
              <button
  key={answer.value}
  onClick={() => handleAnswer(answer.value)}
  className={`rounded-2xl border px-5 py-3 text-left font-medium transition ${
    active
      ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
      : "border-[var(--al-border)] bg-[var(--al-surface)] text-[var(--al-text-soft)] hover:border-[var(--al-accent)]"
  }`}
>
  {answer.label}
</button>
                  )
                })}
              </div>
            </div>
          </div>

      <div className="al-premium-card p-7">
  <p className="al-kicker">
    Your ArcheLoop Report Includes
  </p>

  <div className="mt-6 grid gap-3 md:grid-cols-2">
    {[
      "Primary Shadow Loop",
      "Secondary Shadow Loop",
      "Archetype & Element",
      "Nervous System Pattern",
      "Integration Journey",
      "Integrated Self",
      "Personalised ArcheLoop Report",
    ].map((item) => (
      <div
        key={item}
        className="al-pill"
      >
        ✓ {item}
      </div>
    ))}
  </div>

  <p className="mt-6 al-muted text-sm">
    60 questions • Approximately 5–7 minutes
  </p>
</div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
