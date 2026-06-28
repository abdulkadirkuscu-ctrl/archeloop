import { loopFormulas } from "../app/data/loopFormulas"
import { archetypeInsights } from "../app/data/archetypeInsights"
import { loopDetails } from "../app/data/loopDetails"
import Nav from "../app/components/Nav"
import Footer from "../app/components/Footer"
import { loops } from "../app/data/loops"
import { elementInsights } from "../app/data/elementInsights"
import ReportFeedback from "./ReportFeedback"


const loopPathMap: Record<string, { journey: string; integratedSelf: string }> = {
  "Dimmed Light": {
    journey: "Visibility Path™",
    integratedSelf: "Healthy Visibility",
  },
  "Paper Crown": {
    journey: "Authentic Sovereignty Path™",
    integratedSelf: "Authentic Leadership",
  },
  "Stalled Flame": {
    journey: "Action Path™",
    integratedSelf: "Purposeful Action",
  },
  "Blank Page": {
    journey: "Creative Expression Path™",
    integratedSelf: "Authentic Expression",
  },
  "Smoky Mirrors": {
    journey: "Truth Path™",
    integratedSelf: "Self-Honesty",
  },
  "Mind Maze": {
    journey: "Clarity Path™",
    integratedSelf: "Clear Thinking",
  },
  "Emotional Lockdown": {
    journey: "Vulnerability Path™",
    integratedSelf: "Emotional Openness",
  },
  "Fantasy Fog": {
    journey: "Connection Path™",
    integratedSelf: "Genuine Connection",
  },
  "Flooded Waters": {
    journey: "Emotional Regulation Path™",
    integratedSelf: "Emotional Flow",
  },
  Compliance: {
    journey: "Boundaries Path™",
    integratedSelf: "Self-Respect",
  },
  Fortress: {
    journey: "Trust Path™",
    integratedSelf: "Connected Strength",
  },
  "Barren Ground": {
    journey: "Vitality Path™",
    integratedSelf: "Inner Vitality",
  },
};

function formatMechanism(mechanism: string) {
  if (mechanism === "Suppression") return "Collapsed";
  if (mechanism === "Compensation") return "Compensated";
  if (mechanism === "Collision") return "Collided";
  return mechanism;
}

export default function FullReport({
  reportData,
}: {
  reportData: {
    primaryLoop?: string;
    integratedScores?: any[];
    loopLandscape?: any[];
  };
}) {
  const archetypeScores = reportData?.integratedScores || [];
  const loopLandscape = reportData?.loopLandscape || [];

  const selectedLoopName =
    reportData?.primaryLoop && reportData.primaryLoop in loopDetails
      ? reportData.primaryLoop
      : "Emotional Lockdown";

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

const archeLoopPath = loopPathMap[selectedLoopName] || {
  journey: primaryLoop.integrationKey || "Integration Journey™",
  integratedSelf: primaryLoop.integrationKey || "Integrated Self™",
};

const formattedMechanism = formatMechanism(primaryLoop.mechanism);

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

function PathCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-b from-yellow-300/10 to-black p-8 text-center">
      <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/70">
        {label}
      </p>

      <h3 className="mt-5 text-3xl font-bold text-yellow-300">
        {value}
      </h3>

      <p className="mt-4 leading-relaxed text-gray-300">
        {detail}
      </p>
    </div>
  )
}

function ArchetypeCompass({ scores }: { scores: any[] }) {
  const positions = [
    { name: "Magician", element: "Air", x: 200, y: 40 },
    { name: "Sovereign", element: "Fire", x: 360, y: 200 },
    { name: "Lover", element: "Water", x: 200, y: 360 },
    { name: "Warrior", element: "Earth", x: 40, y: 200 },
  ];

  const items = positions.map((position) => {
    const item = scores.find((score) => score.archetype === position.name);
    const value = item?.integratedPercent || 0;

    const dx = position.x - 200;
    const dy = position.y - 200;

    return {
      ...position,
      value,
      energyX: 200 + dx * (value / 100),
      energyY: 200 + dy * (value / 100),
    };
  });

  const polygonPoints = items
    .map((item) => `${item.energyX},${item.energyY}`)
    .join(" ");

  const mostAvailable = [...items].sort((a, b) => b.value - a.value)[0];
  const leastAvailable = [...items].sort((a, b) => a.value - b.value)[0];

  return (
    <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-b from-yellow-300/10 via-[#050814] to-black p-8 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
      <p className="text-center text-sm uppercase tracking-[0.3em] text-yellow-300/70">
        Archetypal Compass™
      </p>

      <h3 className="mt-4 text-center text-3xl font-bold">
        Healthy archetypal access
      </h3>

      <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-gray-300">
        This map shows which healthy archetypal energies are currently most
        available. Lower availability does not mean weakness — it means that
        expression may be collapsed, compensated, or caught in collision under
        pressure.
      </p>

      <div className="mt-10 flex justify-center">
        <svg viewBox="0 0 400 400" className="h-[28rem] w-[28rem] max-w-full">
          <defs>
            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(250,204,21,0.55)" />
              <stop offset="45%" stopColor="rgba(250,204,21,0.18)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0)" />
            </radialGradient>

            <filter id="softGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="200" cy="200" r="150" fill="url(#goldGlow)" />

          {[40, 70, 100, 130, 160].map((radius) => (
            <circle
              key={radius}
              cx="200"
              cy="200"
              r={radius}
              fill="none"
              stroke="rgba(250,204,21,0.13)"
              strokeWidth="1"
            />
          ))}

          {Array.from({ length: 11 }).map((_, index) => {
            const offset = 40 + index * 32;

            return (
              <g key={index}>
                <line
                  x1={offset}
                  y1="40"
                  x2={offset}
                  y2="360"
                  stroke="rgba(250,204,21,0.06)"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1={offset}
                  x2="360"
                  y2={offset}
                  stroke="rgba(250,204,21,0.06)"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          <line
            x1="200"
            y1="40"
            x2="200"
            y2="360"
            stroke="rgba(250,204,21,0.25)"
            strokeWidth="1.5"
          />
          <line
            x1="40"
            y1="200"
            x2="360"
            y2="200"
            stroke="rgba(250,204,21,0.25)"
            strokeWidth="1.5"
          />

          <polygon
            points={polygonPoints}
            fill="rgba(250,204,21,0.22)"
            stroke="rgba(250,204,21,0.95)"
            strokeWidth="2"
            filter="url(#softGlow)"
          />

          {items.map((item) => (
            <circle
              key={`${item.name}-energy`}
              cx={item.energyX}
              cy={item.energyY}
              r="5"
              fill="rgb(250,204,21)"
              filter="url(#softGlow)"
            />
          ))}

          <circle
            cx="200"
            cy="200"
            r="5"
            fill="rgba(250,204,21,0.9)"
            filter="url(#softGlow)"
          />

          {items.map((item) => (
            <g key={item.name}>
              <circle
                cx={item.x}
                cy={item.y}
                r="26"
                fill="rgba(0,0,0,0.72)"
                stroke="rgba(250,204,21,0.32)"
              />

              <text
                x={item.x}
                y={item.y - 4}
                textAnchor="middle"
                fill="rgb(245,245,244)"
                fontSize="12"
                fontWeight="700"
              >
                {item.name}
              </text>

              <text
                x={item.x}
                y={item.y + 12}
                textAnchor="middle"
                fill="rgba(214,211,209,0.7)"
                fontSize="10"
              >
                {item.element}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-yellow-300/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-300/60">
            Most Available
          </p>
          <p className="mt-3 text-2xl font-bold text-stone-100">
            {mostAvailable.name}
          </p>
          <p className="mt-2 text-sm text-stone-400">
            This archetypal energy currently has the strongest healthy access.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-300/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-300/60">
            Least Available
          </p>
          <p className="mt-3 text-2xl font-bold text-stone-100">
            {leastAvailable.name}
          </p>
          <p className="mt-2 text-sm text-stone-400">
            This archetypal energy may need gentler integration, not force or
            judgment.
          </p>
        </div>
      </div>
    </div>
  );
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
            Your ArcheLoop Report™
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

<section className="px-6 py-24 border-b border-zinc-800 bg-black">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-yellow-300/70 mb-5 text-center">
      Your ArcheLoop Path™
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      From loop to integrated self.
    </h2>

    <div className="grid gap-5 md:grid-cols-3">
      <PathCard
        label="Shadow Loop™"
        value={primaryLoop.title}
        detail="The protective pattern currently shaping your reactions."
      />

      <PathCard
        label="Integration Journey™"
        value={archeLoopPath.journey}
        detail="The path that helps you interrupt and integrate the loop."
      />

      <PathCard
        label="Integrated Self™"
        value={archeLoopPath.integratedSelf}
        detail="The healthier expression this loop is guiding you toward."
      />
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
    Primary Loop Formation:
  </span>{" "}
  {formattedMechanism}
</p>

<p className="text-lg leading-8 text-gray-300 mt-8">
  Your strongest assessment pattern emerged as{" "}
  <span className="text-white font-semibold">
    {primaryLoop.title}
  </span>
  . This does not mean this loop is your identity. It means this protective
  pattern is currently the most visible expression of how your system adapts
  under pressure.
</p>

<p className="text-lg leading-8 text-gray-300 mt-10">
  <span className="text-white font-semibold">
    Archetype Family:
  </span>{" "}
  {primaryLoop.archetype}
</p>

<p className="text-lg leading-8 text-gray-300 mt-8">
  This loop belongs to the{" "}
  <span className="text-white font-semibold">
    {primaryLoop.archetype}
  </span>{" "}
  archetype family and the{" "}
  <span className="text-white font-semibold">
    {primaryLoop.element}
  </span>{" "}
  element. The report is not saying this archetype is weak. It is showing how
  this archetypal energy is currently forming a shadow pattern through{" "}
  <span className="text-white font-semibold">
   {
  primaryLoop.mechanism === "Suppression"
    ? "collapse"
    : primaryLoop.mechanism === "Compensation"
    ? "compensation"
    : "collision"
}
  </span>
  .
</p>

<p className="text-lg leading-8 text-gray-300 mt-10">
  <span className="text-white font-semibold">
    Integration Direction:
  </span>{" "}
  {archeLoopPath.journey} → {archeLoopPath.integratedSelf}
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
               <span className="text-gray-400">Activation Score™</span>
<span className="text-yellow-300 font-semibold">
  {item.score}
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
  {label === "weakArchetype"
  ? "Collapsed Archetype"
  : label === "overactiveArchetype"
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
        Archetypal Availability™
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      Your archetypal availability at a glance.
      </h2>

<div className="mb-10">
  <ArchetypeCompass scores={archetypeScores} />
</div>

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
  Healthy Availability: {item.integratedPercent}%
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

     <section className="px-6 py-28 border-y border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black">
  <div className="max-w-6xl mx-auto text-center">
    <p className="uppercase tracking-[0.35em] text-yellow-300/70 text-sm mb-5">
      Your Next Step
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-8">
      Understanding creates awareness.
      <br />
      Integration creates transformation.
    </h2>

    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 mb-12">
      Your ArcheLoop Report™ has shown you the structure beneath your Shadow
      Loop™. ArcheLoop Integration™ helps you notice the pattern in real life,
      follow your Integration Journey™, and practise becoming your Integrated
      Self™.
    </p>

    <div className="grid gap-6 md:grid-cols-3 text-left mb-12">
      <div className="rounded-[2rem] border border-yellow-300/10 bg-black/40 p-6">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
          Triggered Pro™
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Log real-life activations and discover which Shadow Loops™ are
          repeating most often.
        </p>
      </div>

      <div className="rounded-[2rem] border border-yellow-300/10 bg-black/40 p-6">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
          Progress Dashboard™
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Track recurring triggers, people, environments, loops, and integration
          progress over time.
        </p>
      </div>

      <div className="rounded-[2rem] border border-yellow-300/10 bg-black/40 p-6">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
          Integration Journey™
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Follow the path from your Shadow Loop™ toward your Integrated Self™
          through practices, prompts, and reflection.
        </p>
      </div>
    </div>

    <div className="mx-auto max-w-3xl rounded-[2rem] border border-yellow-300/25 bg-black/50 p-8">
  <p className="text-lg text-gray-500 line-through">
    £29/month
  </p>

  <p className="mt-2 text-3xl font-bold text-yellow-300">
    Free Founding Access
  </p>

  <p className="mt-4 text-gray-300">
    ArcheLoop Integration™ is the transformation system that helps you
    practise beyond the loop through Triggered Pro™, Progress Dashboard™,
    Integration Journeys™, My Integrated Vision™, and personal integration
    tracking.
  </p>

  <div className="mt-8 rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-left">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
      Founding Access Notice
    </p>

    <p className="mt-3 text-sm leading-relaxed text-stone-400">
      ArcheLoop Integration™ is temporarily available during Founding Access
      while the platform is being refined and tested with early users.
    </p>

    <p className="mt-3 text-sm leading-relaxed text-stone-500">
      Future access to ArcheLoop Integration™, Triggered Pro™, Progress
      Dashboard™, and Integration Journeys™ may require an active
      subscription after public launch. Founding Access does not guarantee
      free lifetime access.
    </p>
  </div>

<p className="mt-6 text-sm text-stone-500">
  Future public pricing: £29/month
</p>

  <div className="mt-8 flex flex-wrap justify-center gap-4">
    <a
      href="/integration"
      className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
    >
      Continue To Integration™
    </a>
  </div>
</div>
  </div>
</section>

<ReportFeedback />
      <Footer />
    </main>
  )
}