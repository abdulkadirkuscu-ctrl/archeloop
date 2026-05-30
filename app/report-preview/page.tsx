import { loopFormulas } from "../data/loopFormulas"
import { archetypeInsights } from "../data/archetypeInsights"
import { loopDetails } from "../data/loopDetails"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { loops } from "../data/loops"
import { elementInsights } from "../data/elementInsights"
import ReportFeedback from "../../components/ReportFeedback";
import TriggeredWaitlist from "../../components/TriggeredWaitlist";

export default async function ReportPreviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ loop?: string; scores?: string; loops?: string }>
}) {
  const params = await searchParams

  const archetypeScores = params?.scores
  ? JSON.parse(params.scores)
  : []
  const loopLandscape = params?.loops
  ? JSON.parse(params.loops)
  : []
  const selectedLoopName =
    params?.loop && params.loop in loopDetails
      ? params.loop
      : "Emotional Lockdown"

  const primaryLoop = loops[selectedLoopName as keyof typeof loops]
  const detail = loopDetails[selectedLoopName as keyof typeof loopDetails]
  const formula = loopFormulas[selectedLoopName as keyof typeof loopFormulas]
  const primaryArchetype = primaryLoop.archetype as keyof typeof archetypeInsights
const archetypeInsight = archetypeInsights[primaryArchetype]
const lowestIntegratedArchetype =
  [...archetypeScores].sort(
    (a: any, b: any) => a.integratedPercent - b.integratedPercent
  )[0]

const highestIntegratedArchetype =
  [...archetypeScores].sort(
    (a: any, b: any) => b.integratedPercent - a.integratedPercent
  )[0]
  const dominantLoopFamily = primaryLoop.archetype
const primaryElement = primaryLoop.element as keyof typeof elementInsights
const elementInsight = elementInsights[primaryElement]

  const secondaryLoopName = detail.relatedDynamics?.[0] || "Fortress"
  const secondaryLoop = loops[secondaryLoopName as keyof typeof loops]

  const bodyMapText =
  "bodyMapInterpretation" in detail &&
  typeof detail.bodyMapInterpretation === "string"
    ? detail.bodyMapInterpretation
    : `${primaryLoop.body} may become a key area of activation when this loop is under pressure. The body may hold tension, shutdown, urgency, or protective contraction depending on the loop pattern.`

const secondaryInteractionText =
  "secondaryInteraction" in detail &&
  typeof detail.secondaryInteraction === "string"
    ? detail.secondaryInteraction
    : `When ${primaryLoop.title} combines with ${secondaryLoop.title}, the system may move between the primary protective pattern and a secondary response that reinforces the loop under pressure.`

const integrationBlueprintText =
  "integrationBlueprint" in detail &&
  typeof detail.integrationBlueprint === "string"
    ? detail.integrationBlueprint
    : `${detail.coreStructure.integrationShift} This process usually begins through small, repeatable moments of awareness, regulation, and behaviour change rather than forcing the system to transform all at once.`
 
 function ScoreBar({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300">{label}</span>
        <span className="text-yellow-300">{value}%</span>
      </div>

      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-300 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
if (!lowestIntegratedArchetype) {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-700 p-8 text-center">
        <h1 className="text-3xl font-semibold">No report data found</h1>
        <p className="mt-4 text-gray-400">
          Please complete the ArcheLoop assessment first to generate your report.
        </p>
        <a
          href="/assessment"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black"
        >
          Start Assessment
        </a>
      </div>
    </main>
  );
}

    return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-32 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_45%)]" />

        <div className="relative max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm mb-6">
            Premium Report Preview
          </p>

<div className="border border-yellow-300/25 rounded-[2rem] bg-yellow-300/10 p-6 mb-10">
  <p className="text-yellow-300 font-semibold mb-2">
    Save Your Report
  </p>

  <p className="text-gray-300 leading-relaxed">
    This report is generated from your assessment link. Bookmark this page or save it as a PDF from your browser if you want to return to it later.
  </p>
</div>

         <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
  {primaryLoop.title}
  <br />
  Pattern Report
</h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
 This report maps the deeper structure beneath your {primaryLoop.title}, including emotional reactions, protective responses, relational activators, nervous system patterns, and integration pathway.
</p>
<div className="grid md:grid-cols-3 gap-4 mt-10 max-w-3xl">
  <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
    <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
      Archetype
    </p>
    <p className="text-xl font-semibold">{primaryLoop.archetype}</p>
  </div>

  <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
    <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
      Element
    </p>
    <p className="text-xl font-semibold">{primaryLoop.element}</p>
  </div>

  <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
    <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
      Pattern Formation
    </p>
    <p className="text-xl font-semibold">{primaryLoop.mechanism === "Suppression"
  ? "Collapsed"
  : primaryLoop.mechanism === "Compensation"
  ? "Compensated"
  : primaryLoop.mechanism}</p>
  </div>
</div>
        </div>
      </section>


<section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Structural Dynamic
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center">
      How this loop forms.
    </h2>

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="text-xl text-gray-300 leading-relaxed">
        {detail.structuralDynamic}
      </p>
    </div>
  </div>
</section>

<section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Loop Formula
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      How this pattern protects you.
    </h2>

    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">Healthy Expression</h3>
        <p className="text-gray-300 leading-relaxed">
          {formula.healthyExpression}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">Collapsed Energy</h3>
        <p className="text-gray-300 leading-relaxed">
          {formula.collapsedEnergy}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">Protective Adaptation</h3>
        <p className="text-gray-300 leading-relaxed">
          {formula.protectiveAdaptation}
        </p>
      </div>

      <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">
          Integration Shift
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {formula.integrationShift}
        </p>
      </div>
    </div>

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <h3 className="text-2xl font-bold mb-6">Observable Behaviours</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {formula.observableBehaviours.map((item) => (
          <div
            key={item}
            className="border border-zinc-800 rounded-2xl p-4 text-gray-300 bg-zinc-950"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
              Primary Loop
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {primaryLoop.title}
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {primaryLoop.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Archetype
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.archetype}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Element
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.element}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Pattern Formation
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.mechanism === "Suppression"
  ? "Collapsed"
  : primaryLoop.mechanism === "Compensation"
  ? "Compensated"
  : primaryLoop.mechanism}</p>
              </div>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Secondary Activation
            </p>

            <h3 className="text-3xl font-bold mb-5">
              {secondaryLoop.title}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {secondaryLoop.description}
            </p>
          </div>
        </div>
      </section>

<section className="px-6 py-20 border-b border-zinc-800 bg-black">
  <div className="max-w-5xl mx-auto">

    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Why This Loop Appeared
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
      Understanding the result.
    </h2>

    <div className="border border-zinc-800 rounded-[2rem] p-10 bg-zinc-950">

      <p className="text-lg leading-8 text-gray-300">

  <span className="text-white font-semibold">
    Lowest Integrated Archetype:
  </span>{" "}
  
  {lowestIntegratedArchetype.archetype} ({lowestIntegratedArchetype.integratedPercent}%)

</p>

<p className="text-lg leading-8 text-gray-300 mt-8">

  This archetype currently shows the lowest level of integrated
  expression and may represent the primary area of collapse,
  restriction, avoidance, or developmental pressure within the system.

</p>
<p className="text-lg leading-8 text-gray-300 mt-8">
  This may be different from the dominant loop family, because one part of the system may be most restricted while another part becomes the main protective strategy.
</p>

<p className="text-lg leading-8 text-gray-300 mt-10">

  <span className="text-white font-semibold">
    Dominant Loop Family:
  </span>{" "}
  {dominantLoopFamily}

</p>

<p className="text-lg leading-8 text-gray-300 mt-8">

  The strongest shadow activation emerged within the{" "}
  <span className="text-white font-semibold">
    {dominantLoopFamily}
  </span>{" "}
  loop family, indicating that this archetype currently provides
  the dominant protective strategy used by the system under pressure.

</p>

<p className="text-lg leading-8 text-gray-300 mt-10">

  <span className="text-white font-semibold">
    Primary Loop Formation:
  </span>{" "}
  {primaryLoop.mechanism === "Suppression"
    ? "Collapsed"
    : primaryLoop.mechanism === "Compensation"
    ? "Compensated"
    : "Collision"}

</p>

<p className="text-lg leading-8 text-gray-300 mt-8">

  Among all loop activations,{" "}
  <span className="text-white font-semibold">
    {primaryLoop.title}
  </span>{" "}
  produced the strongest overall activation score and therefore
  emerged as the dominant loop pattern at this time.

</p>
     
    </div>
  </div>
</section>

{loopLandscape.length > 0 && (
  <section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
    <div className="max-w-6xl mx-auto">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
        Loop Landscape
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Your dominant loop ecosystem.
      </h2>

      <p className="text-gray-400 text-center max-w-3xl mx-auto mb-14 leading-relaxed">
        These are the strongest shadow loop activations detected in your current assessment.
        Your primary loop is the strongest pattern, while the others may activate under
        different forms of stress, pressure, vulnerability, conflict, visibility, or relational activation.
      </p>

      <div className="grid gap-5">
        {loopLandscape.slice(0, 5).map((item: any, index: number) => (
          <div
            key={item.loop}
            className={`border rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 ${
              index === 0
                ? "border-yellow-300/40 bg-gradient-to-r from-yellow-300/10 to-black"
                : "border-zinc-800 bg-black"
            }`}
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold ${
                  index === 0
                    ? "bg-yellow-300 text-black"
                    : "bg-zinc-900 text-gray-300 border border-zinc-700"
                }`}
              >
                {index + 1}
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-2">
                  {index === 0 ? "Primary Pattern" : "Supporting Pattern"}
                </p>

                <h3 className="text-2xl md:text-3xl font-bold">
                  {item.loop}
                </h3>
              </div>
            </div>

            <div className="md:w-64">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Activation</span>
                <span className="text-yellow-300 font-semibold">
                  {item.score}%
                </span>
              </div>

              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          </div>
        ))}
            </div>

      <div className="mt-12 border border-zinc-800 rounded-[2rem] bg-black p-8 max-w-4xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-4">
          Loop Family Insight
        </p>

        <p className="text-lg text-gray-300 leading-8">
          Your strongest shadow activation currently appears within the{" "}
          <span className="text-white font-semibold">
            {primaryLoop.archetype}
          </span>{" "}
          archetype family.

          This suggests that challenges related to{" "}
          <span className="text-white font-semibold">
            {primaryLoop.element}
          </span>{" "}
          energy may be playing a central role in the current pattern.

          Rather than reflecting a single isolated loop, the assessment indicates
          a broader ecosystem of related protective responses that emerge under
          stress, vulnerability, relational activation, uncertainty, or pressure.
        </p>
      </div>

    </div>
  </section>
)}


   <section className="px-6 py-28 border-b border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Core Structure
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      The architecture beneath the pattern.
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Object.entries(detail.coreStructure).map(([label, value]) => (
        <div
          key={label}
          className="border border-zinc-800 rounded-2xl bg-black p-6"
        >
          <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-3">
            {label === "overactiveArchetype"
              ? "Protective Archetype"
              : label === "suppressedElement"
              ? "Collapsed Element"
              : label === "compensationPattern"
              ? "Protective Adaptation"
              : label
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
          </p>

          <p className="text-lg text-gray-200 leading-relaxed">
            {value}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{archetypeScores.length > 0 && (
  <section className="px-6 py-28 border-b border-zinc-800 bg-black">
    <div className="max-w-6xl mx-auto">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
        Archetype Score Map
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
        Your archetypal energy profile.
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
      {archetypeScores.map((item: any) => (
  <div
    key={item.archetype}
    className="border border-zinc-800 rounded-[2rem] bg-zinc-950 p-8"
  >
    <div className="flex justify-between items-center mb-8">
      <div>
        <h3 className="text-3xl font-bold">
          {item.archetype}
        </h3>
        <p className="text-gray-500">
          {item.element}
        </p>
      </div>

<p className="text-2xl font-bold text-yellow-300">
  Current Integration: {item.integratedPercent}%
</p>

    </div>

    <div className="space-y-6">
      <div>
        <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-4">
          Healthy Expression
        </p>

        <ScoreBar
  label="Healthy"
  value={item.healthyPercent}
/>
      </div>

      <div>
        <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-4">
  Shadow Expression
</p>

<div className="space-y-5">
  <ScoreBar
    label="Shadow Pressure"
    value={item.shadowPercent || 0}
  />

  <div className="border-t border-zinc-800 pt-5 space-y-5">
    <ScoreBar
      label="Collapsed"
      value={item.suppressionPercent || 0}
    />

    <ScoreBar
      label="Compensated"
      value={item.compensationPercent || 0}
    />

    <ScoreBar
      label="Collision"
      value={item.collisionPercent || 0}
    />
  </div>
</div>
      </div>

      
    </div>
  </div>
))}
      </div>
    </div>
  </section>
)}

<section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Archetype Integration
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      How {primaryLoop.archetype} energy may be organising this pattern.
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">
          Low Integration
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {archetypeInsight.low}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">
          Shadow Activation
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {archetypeInsight.highShadow}
        </p>
      </div>

      <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">
          Healthy Integration
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {archetypeInsight.healthy}
        </p>
      </div>
    </div>
  </div>
</section>



<section className="px-6 py-28 border-b border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Elemental Balance
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      How {primaryLoop.element} may be moving through this pattern.
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">
          Low Presence
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {elementInsight.low}
        </p>
      </div>

      <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
        <h3 className="text-2xl font-bold mb-4">
          High Activation
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {elementInsight.high}
        </p>
      </div>

      <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8">
        <h3 className="text-2xl font-bold mb-4 text-yellow-300">
          Healthy Balance
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {elementInsight.healthy}
        </p>
      </div>
    </div>
  </div>
</section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
            Deeper Pattern Map
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
            What this loop may reveal.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Relationship Pattern
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.relationshipPattern}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Communication Style
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.communicationStyle}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Escalation Pattern
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.escalationPattern}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Identity Protection
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.identityProtection}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Nervous System
            </p>

            <h2 className="text-3xl font-bold mb-5">
              How your system may protect itself.
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              {primaryLoop.nervousSystem}
            </p>

            <div className="border border-yellow-300/20 rounded-2xl p-6 bg-black/40">
              <p className="text-yellow-300 font-semibold mb-3">
                Protection Mechanism
              </p>

              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.protection}
              </p>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Relational Activators
            </p>

            <h2 className="text-3xl font-bold mb-5">
              What may activate the loop.
            </h2>

            <div className="space-y-4">
              {detail.relationalActivators.map((item) => (
                <div
                  key={item}
                  className="border border-zinc-800 rounded-2xl p-4 text-gray-300 bg-black/40"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
        Body Map Interpretation
      </p>

      <h2 className="text-3xl font-bold mb-5">
        Where the loop may live in the body.
      </h2>

     <p className="text-gray-300 leading-relaxed">
  {bodyMapText}
</p>
    </div>

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
        Secondary Loop Interaction
      </p>

      <h2 className="text-3xl font-bold mb-5">
        How protective patterns reinforce each other.
      </h2>

      <p className="text-gray-300 leading-relaxed">
  {secondaryInteractionText}
</p>
    </div>

  </div>
</section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Core Belief
            </p>

            <h2 className="text-4xl font-bold text-yellow-300 mb-6">
              “{primaryLoop.coreBelief}”
            </h2>

            <p className="text-gray-300 leading-relaxed">
              This belief is not a fixed identity. It is a protective
              interpretation that may have formed around safety, vulnerability,
              belonging, or control.
            </p>
          </div>

          <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
              Integration Focus
            </p>

            <h2 className="text-3xl font-bold mb-5">
              {primaryLoop.healingFocus}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Restoring Energy:{" "}
              <span className="text-yellow-300">
                {primaryLoop.integrationKey}
              </span>
            </p>

            <p className="text-gray-300 leading-relaxed">
              {primaryLoop.integrationReason}
            </p>
          </div>
        </div>
      </section>

<section className="px-6 py-28">
  <div className="max-w-5xl mx-auto">

    <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
      <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
        Integration Blueprint
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-8">
        Rebuilding safety beyond the loop.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
  {integrationBlueprintText}
</p>
    </div>

  </div>
</section>

      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            First Practices
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Begin interrupting the loop.
          </h2>

          <div className="bg-white text-black rounded-[2rem] p-8 text-left mb-10">
            <p className="font-semibold mb-3">
              Loop Breaker
            </p>

            <p className="text-lg leading-relaxed">
              {detail.loopBreaker}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 text-left">
            {detail.prompts.map((prompt) => (
              <div
                key={prompt}
                className="border border-zinc-800 rounded-2xl p-5 bg-black"
              >
                <p className="text-gray-300">
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

<TriggeredWaitlist />

<ReportFeedback />
      <Footer />
    </main>
  )
}