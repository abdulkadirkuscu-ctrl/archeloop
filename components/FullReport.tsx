import Image from "next/image";
import { loopFormulas } from "../app/data/loopFormulas";
import { archetypeInsights } from "../app/data/archetypeInsights";
import { loopDetails } from "../app/data/loopDetails";
import PageShell from "../app/components/PageShell";
import { loops } from "../app/data/loops";
import { loopImages } from "../app/data/loopImages";
import PrintReportLink from "./PrintReportLink";
import { elementInsights } from "../app/data/elementInsights";
import ReportFeedback from "./ReportFeedback";
import { getLoopStructuralMetadata } from "../app/data/loopStructuralMetadata";
import { buildPatternSynthesis } from "../app/data/reportSynthesis";
import {
  buildHeroInterpretation,
  buildWheelInterpretation,
  buildTwelveCapacityInterpretation,
  buildFormationInterpretation,
  buildLoopLandscapeInterpretation,
  buildDevelopmentalDirectionSynthesis,
  buildPrimaryCapacityInterpretation,
  buildArchetypeCapacityInterpretation,
  buildEverydaySummary,
  getActivationDescriptor,
  joinWithAnd,
  ARCHETYPE_ACCENT,
} from "../app/data/reportInterpretations";
import {
  DEVELOPMENTAL_CAPACITY_PLAIN_LANGUAGE,
  ARCHETYPE_CAPACITY_LABEL,
  FORMATION_PLAIN_LANGUAGE,
  describeHealthyAvailability,
  describeShadowActivation,
  describeInjuredArchetype,
} from "../app/data/plainLanguageGlossary";
import ArcheLoopWheel from "./ArcheLoopWheel";

const loopPathMap: Record<string, { journey: string; integratedSelf: string }> = {
  "Dimmed Light": {
    journey: "Visibility Path",
    integratedSelf: "Healthy Visibility",
  },
  "Paper Crown": {
    journey: "Authentic Sovereignty Path",
    integratedSelf: "Authentic Leadership",
  },
  "Stalled Flame": {
    journey: "Action Path",
    integratedSelf: "Purposeful Action",
  },
  "Blank Page": {
    journey: "Creative Expression Path",
    integratedSelf: "Authentic Expression",
  },
  "Smoky Mirrors": {
    journey: "Truth Path",
    integratedSelf: "Self-Honesty",
  },
  "Mind Maze": {
    journey: "Clarity Path",
    integratedSelf: "Clear Thinking",
  },
  "Emotional Lockdown": {
    journey: "Vulnerability Path",
    integratedSelf: "Emotional Openness",
  },
  "Fantasy Fog": {
    journey: "Connection Path",
    integratedSelf: "Genuine Connection",
  },
  "Flooded Waters": {
    journey: "Emotional Regulation Path",
    integratedSelf: "Emotional Flow",
  },
  Compliance: {
    journey: "Boundaries Path",
    integratedSelf: "Self-Respect",
  },
  Fortress: {
    journey: "Trust Path",
    integratedSelf: "Connected Strength",
  },
  "Barren Ground": {
    journey: "Vitality Path",
    integratedSelf: "Inner Vitality",
  },
};

// Locked public-facing response-style language: Collapse, Compensate,
// Collide. Internal data may still use Suppression/Compensation/Collision
// (see app/data/scoring.ts) — this function is the single place that
// resolves those internal values to the public label.
function formatMechanism(mechanism: string) {
  if (mechanism === "Suppression") return "Collapse";
  if (mechanism === "Compensation") return "Compensate";
  if (mechanism === "Collision") return "Collide";
  return mechanism;
}

// Report v2 "self-compensating" explanations (Section 3 of this task): the
// two Compensate-formation loops whose Injured Archetype protects itself
// with an intensified version of its own toolkit rather than recruiting a
// genuinely distinct Compensating Archetype (see
// app/data/loopStructuralMetadata.ts, which deliberately leaves
// compensatingArchetype unset for both).
const SELF_COMPENSATING_SUMMARY: Record<string, string> = {
  "Smoky Mirrors":
    "Magician protects its injured Truth capacity through intensified narrative control, reinterpretation, and reasoning.",
  Fortress:
    "Warrior protects its injured Trust capacity through intensified self-reliance, distance, and control.",
};

// Report v2 replacement for the old integratedPercent-based "Archetype
// Integration" copy (Section 1 of this task): concise, deterministic
// interpretive copy built from the two Archetype-level numbers, always
// reported side by side, never netted into a single score.
function buildArchetypeRelationshipCopy(
  archetypeName: string,
  healthyAvailability: number,
  shadowActivation: number,
  primaryLoopTitle: string
): string {
  if (healthyAvailability - shadowActivation > 15) {
    return `Across ${archetypeName} overall, Healthy Availability (${healthyAvailability}%) currently runs ahead of Shadow Activation (${shadowActivation}%) — healthy expression is comparatively accessible here, even while ${primaryLoopTitle} remains active in one specific capacity.`;
  }

  if (shadowActivation - healthyAvailability > 15) {
    return `Across ${archetypeName} overall, Shadow Activation (${shadowActivation}%) currently runs ahead of Healthy Availability (${healthyAvailability}%) — protective activation is more prominent than healthy access across this Archetype right now.`;
  }

  return `Across ${archetypeName} overall, Healthy Availability (${healthyAvailability}%) and Shadow Activation (${shadowActivation}%) are currently close together — healthy expression and protective activation both show up, sometimes in the same situations.`;
}

export default function FullReport({
  reportData,
  hasIntegrationAccess = false,
}: {
  reportData: {
    primaryLoop?: string;
    secondaryLoop?: string;
    confidence?: number;
    integratedScores?: any[];
    loopLandscape?: any[];
    scoringVersion?: string;
    capacityScores?: any[];
    formationScores?: { collapse: number; compensate: number; collide: number };
    mostAvailableArchetype?: any;
    growthEdge?: any;
    growthEdgeArchetype?: any;
    resultClarity?: number;
    answerCompleteness?: number;
    responseQuality?: any;
    primaryLoopStatus?: string;
  };
  hasIntegrationAccess?: boolean;
}) {
  const archetypeScores = reportData?.integratedScores || [];
  const loopLandscape = reportData?.loopLandscape || [];

  // Report v2 gate: newly generated reports carry scoringVersion "2.0" and
  // the full AssessmentResult snapshot. Reports saved before this field
  // existed simply don't have it, so every Report v2 addition below is
  // additive and skipped for them - they keep rendering exactly as before.
  const isV2 = reportData?.scoringVersion === "2.0";
  const capacityScores = reportData?.capacityScores || [];

  // Low-differentiation handling (Section 9 of this task): when several
  // loops scored too close together to call one Primary Loop a genuine
  // finding, the hero and Loop Landscape framing soften into "broader
  // pattern map" language rather than a definitive result. The tie-break
  // still resolves to a loop (scoring.ts never returns null when any
  // question is answered), so every downstream section still has data to
  // render - only the framing changes.
  const isLowDifferentiation = isV2 && reportData?.primaryLoopStatus === "Low Differentiation";
  const responseQuality = reportData?.responseQuality;

  const selectedLoopName =
    reportData?.primaryLoop && reportData.primaryLoop in loopDetails
      ? reportData.primaryLoop
      : "Emotional Lockdown";

  const primaryLoop = loops[selectedLoopName as keyof typeof loops];
  const detail = loopDetails[selectedLoopName as keyof typeof loopDetails];
  const formula = loopFormulas[selectedLoopName as keyof typeof loopFormulas];

  // Report v2 canonical Structural Dynamic metadata (Injured Archetype,
  // Compensating Archetype where genuinely distinct, Protective Formation).
  // See app/data/loopStructuralMetadata.ts.
  const structuralMetadata = getLoopStructuralMetadata(
    selectedLoopName as Parameters<typeof getLoopStructuralMetadata>[0]
  );

  const primaryCapacityScore = capacityScores.find(
    (c: any) => c.shadowLoop === selectedLoopName
  );

  const primaryArchetype =
    primaryLoop.archetype as keyof typeof archetypeInsights;
  const archetypeInsight = archetypeInsights[primaryArchetype];

  const lowestIntegratedArchetype = [...archetypeScores].sort(
    (a: any, b: any) => a.integratedPercent - b.integratedPercent
  )[0];

  const primaryElement = primaryLoop.element as keyof typeof elementInsights;
  const elementInsight = elementInsights[primaryElement];

  const primaryArchetypeScore = archetypeScores.find(
    (item: any) => item.archetype === primaryLoop.archetype
  );

  const archeLoopPath = loopPathMap[selectedLoopName] || {
    journey: primaryLoop.integrationKey || "Integration Journey",
    integratedSelf: primaryLoop.integrationKey || "Integrated Self",
  };

  const formattedMechanism = formatMechanism(primaryLoop.mechanism);

  // Secondary Shadow Loop: must agree with the assessment's own computed
  // ranking (Loop Landscape) rather than a static per-primary-loop table,
  // so this section can never contradict that section. reportData.secondaryLoop
  // is the authoritative value for reports saved after this fix; the
  // second entry of loopLandscape is an equivalent fallback for reports
  // saved by the corrected assessment logic that predate this exact field.
  // Only truly legacy reports (saved before either fix existed) fall back
  // to the old static relationship table.
  const computedSecondaryLoopName =
    reportData?.secondaryLoop || loopLandscape[1]?.loop || null;

  const secondaryLoopName =
    computedSecondaryLoopName && computedSecondaryLoopName in loops
      ? computedSecondaryLoopName
      : detail.relatedDynamics?.[0] || "Fortress";

  const secondaryLoop = loops[secondaryLoopName as keyof typeof loops];

  const bodyMapText = `Under pressure, this activation can concentrate in the ${primaryLoop.body}. This is consistent with a ${formattedMechanism} response — before ${primaryLoop.title.toLowerCase()} becomes a conscious thought, it may be felt here first, as tension, shutdown, urgency, or protective contraction.`;

  const cascadeSteps: string[] =
    "cascade" in detail && Array.isArray(detail.cascade)
      ? [...detail.cascade]
      : [];

  // Chapter Five intro (two paragraphs): fully dynamic per loop. The
  // "protective behaviours" phrase reuses the same existing, complete
  // per-loop mapping (loopFormulas.ts observableBehaviours) and the same
  // joinWithAnd formatter already used for the Chapter One hero sentence —
  // never a new or partial per-loop text table.
  const primaryProtectiveBehaviours = joinWithAnd(
    formula.observableBehaviours.slice(0, 3).map((behaviour) => behaviour.toLowerCase())
  );

  const integrationOpeningParagraph = `${primaryLoop.title} begins to soften when protection no longer requires ${
    primaryProtectiveBehaviours || "the same protective response"
  }. Integration usually happens through small, repeatable moments: recognising the pattern, regulating your response, experimenting with a different choice, and noticing what changes over time.`;

  const integrationPathParagraph = `Your ${archeLoopPath.journey} guides that movement from ${primaryLoop.title} toward ${archeLoopPath.integratedSelf}. ArcheLoop can support each stage through your report, trigger logging, the ‘I Am Triggered’ process, integration practices, and progress tracking.`;

  // Chapter Five journey stages: static copy per stage, with only the
  // Primary Shadow Loop and Integrated Self values coming from report data
  // (via existing mappings already used elsewhere in this component).
  const integrationJourneyStages = [
    {
      phase: "Understand",
      title: "Your Current Pattern",
      dynamicValue: primaryLoop.title,
      description:
        "Begin by reviewing the report and noticing which parts feel familiar, uncomfortable, or especially accurate.",
      actionLabel: "Review Your Report",
      actionHref: "#report-top",
    },
    {
      phase: "Become Aware",
      title: "Recognise the Pattern",
      description:
        "Notice what activates the loop, what you feel in your body, what you believe in the moment, and how you respond.",
      actionLabel: "Log a Trigger",
      actionHref: "/triggered-intelligence",
      requiresIntegration: true,
    },
    {
      phase: "Interrupt",
      title: "Create a Pause",
      description:
        "Use the ‘I Am Triggered’ process to regulate and choose a response rather than moving automatically into the loop.",
      actionLabel: "I Am Triggered",
      actionHref: "/triggered",
      requiresIntegration: true,
    },
    {
      phase: "Practise",
      title: "Build a New Response",
      description:
        "Practise small behaviours connected to your Integration Path and Integrated Self.",
      actionLabel: "Explore Practices",
      actionHref: "/practices",
      secondaryActionLabel: "Continue with Triggered Pro",
      secondaryActionHref: "/triggered-intelligence",
      requiresIntegration: true,
    },
    {
      phase: "Integrate",
      title: "Track What Is Changing",
      description:
        "Record moments when the loop was recognised earlier, interrupted, or expressed differently.",
      actionLabel: "View Progress Dashboard",
      actionHref: "/progress-dashboard",
      requiresIntegration: true,
    },
    {
      phase: "Embody",
      title: "Integrated Self",
      dynamicValue: archeLoopPath.integratedSelf,
      description:
        "Build a clearer picture of how this integrated expression thinks, feels, communicates, relates, and acts.",
      actionLabel: "Meet Your Integrated Self",
      actionHref: "#meet-your-integrated-self",
    },
  ];

  // Hero interpretation sentence: one deterministic sentence built from the
  // primary loop's own canonical observable behaviours (loopFormulas.ts),
  // applied through the same shared template for every loop - never a
  // per-loop hard-coded phrase. structuralMetadata is canonical, fixed loop
  // data (app/data/loopStructuralMetadata.ts) and is available regardless of
  // scoringVersion. See app/data/reportInterpretations.ts.
  const heroInterpretation = buildHeroInterpretation(
    structuralMetadata.developmentalCapacity,
    structuralMetadata.injuredArchetype,
    formula.observableBehaviours
  );

  const primaryArchetypeAccent = ARCHETYPE_ACCENT[primaryLoop.archetype] ?? "var(--al-accent)";

  // Section 6 of this task: personalised synthesis built from real report
  // data, with graceful fallback copy when v2-only fields are unavailable
  // (legacy reports, or a v2 report missing an optional field). Now returns
  // two-to-three short paragraphs rather than one dense paragraph.
  const patternSynthesisParagraphs = buildPatternSynthesis({
    primaryLoopTitle: primaryLoop.title,
    primaryArchetype: primaryLoop.archetype,
    primaryFormation: isV2 ? structuralMetadata.formation : undefined,
    primaryCapacityName: isV2 ? structuralMetadata.developmentalCapacity : undefined,
    primaryHealthyAvailability: isV2 ? primaryCapacityScore?.healthyAvailabilityScore : undefined,
    primaryShadowActivation: isV2 ? primaryCapacityScore?.shadowActivationScore : undefined,
    secondaryLoopTitle: secondaryLoop?.title,
    mostAvailableArchetype: isV2 ? reportData?.mostAvailableArchetype?.archetype : undefined,
    mostAvailableHealthyAvailability: isV2
      ? reportData?.mostAvailableArchetype?.healthyAvailability
      : undefined,
    growthEdgeCapacity: isV2 ? reportData?.growthEdge?.developmentalCapacity : undefined,
    growthEdgeArchetype: isV2 ? reportData?.growthEdge?.archetype : undefined,
  });

  // Twelve-Capacity Profile highlight badges (Section 6 of this task): the
  // single overall highest-Healthy capacity, shown as "Current Strength".
  // "Growth Edge" and "Highly Protected" reuse the already-canonical
  // reportData.growthEdge and structuralMetadata.developmentalCapacity
  // fields directly (Primary Loop is, by definition, the capacity with the
  // highest shadowActivationScore) rather than re-sorting independently,
  // so these badges can never contradict the rest of the report.
  const topHealthyCapacityOverall =
    capacityScores.length > 0
      ? [...capacityScores].sort(
          (a: any, b: any) => b.healthyAvailabilityScore - a.healthyAvailabilityScore
        )[0]
      : null;

  // Chapter Three, Developmental Direction (Section 10 of this task): the
  // strongest one or two capacities within the Most Available Archetype -
  // read directly from its own capacities array, never recomputed.
  const mostAvailableStrongestCapacities: string[] = reportData?.mostAvailableArchetype?.capacities
    ? [...reportData.mostAvailableArchetype.capacities]
        .sort(
          (a: any, b: any) => b.healthyAvailabilityScore - a.healthyAvailabilityScore
        )
        .slice(0, 2)
        .map((c: any) => c.developmentalCapacity)
    : [];

  // The legacy archetype-level growthEdgeArchetype (derived from
  // integratedPercent) is only surfaced when it names an Archetype distinct
  // from both the capacity-level Growth Edge and the Most Available
  // Archetype - i.e. only when it adds information neither already covers.
  const showBroaderGrowthArea =
    !!reportData?.growthEdgeArchetype &&
    reportData.growthEdgeArchetype.archetype !== reportData?.growthEdge?.archetype &&
    reportData.growthEdgeArchetype.archetype !== reportData?.mostAvailableArchetype?.archetype;

  // "What This Means in Everyday Life" (Section 3 of this task): a plain-
  // language translation of the same data already computed above - never a
  // second, independently-worded interpretation of the score.
  const everydaySummary = buildEverydaySummary({
    primaryArchetype: primaryLoop.archetype,
    mostAvailableArchetype: isV2 ? reportData?.mostAvailableArchetype?.archetype : undefined,
    mostAvailableCapacities: isV2 ? mostAvailableStrongestCapacities : undefined,
    growthEdgeCapacity: isV2 ? reportData?.growthEdge?.developmentalCapacity : undefined,
    growthEdgeArchetype: isV2 ? reportData?.growthEdge?.archetype : undefined,
    integrationPath: archeLoopPath.journey,
    integratedSelf: archeLoopPath.integratedSelf,
  });

  function ScoreBar({ label, value }: { label: string; value: number }) {
    return (
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="al-text">{label}</span>
          <span className="font-semibold text-[var(--al-accent)]">
            {value}%
          </span>
        </div>

        <div
          className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          <div
            className="h-full rounded-full bg-[var(--al-accent)]"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  }

  function PathCard({
    label,
    value,
    detail,
  }: {
    label: string;
    value: string;
    detail: string;
  }) {
    return (
      <div className="al-premium-card p-8 text-center">
        <p className="al-kicker">{label}</p>

        <h3 className="mt-5 text-3xl font-bold text-[var(--al-accent)]">
          {value}
        </h3>

        <p className="al-text mt-4">{detail}</p>
      </div>
    );
  }

  function InfoCard({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) {
    return (
      <div className="al-soft-card p-5">
        <p className="al-kicker">{label}</p>
        <div className="mt-3 text-xl font-semibold text-[var(--al-text)]">
          {value}
        </div>
      </div>
    );
  }

  function SectionHeader({
    kicker,
    title,
    text,
  }: {
    kicker: string;
    title: string;
    text?: string;
  }) {
    return (
      <div className="mx-auto mb-12 max-w-4xl text-center">
        <p className="al-kicker">{kicker}</p>

        <h3 className="al-heading-md">{title}</h3>

        {text && <p className="al-text-lg mx-auto mt-6 max-w-3xl">{text}</p>}
      </div>
    );
  }

  // Chapter Four cluster heading (Section 11 of this task): a small,
  // non-emoji geometric marker plus an h3 - one level below the chapter's h2
  // and one level above each card's own h4, keeping heading depth logical.
  function ClusterHeading({ label }: { label: string }) {
    return (
      <div className="al-cluster-heading mb-6">
        <span className="al-cluster-marker" aria-hidden="true" />
        <h3 className="text-xl font-bold text-[var(--al-text)]">{label}</h3>
      </div>
    );
  }

  // Report v2 chapter structure (Section 4 of this task): a visible number,
  // rule line, kicker, heading, and short intro mark the start of each of
  // the five chapters, so the (long, by design) report reads as five clear
  // movements rather than one undifferentiated scroll.
  function ChapterDivider({
    number,
    kicker,
    title,
    intro,
  }: {
    number: string;
    kicker: string;
    title: string;
    intro?: string;
  }) {
    return (
      <div className="al-chapter-start al-container-wide pb-2 pt-16 md:pt-24">
        <div className="al-chapter-divider">
          <span className="al-chapter-number" aria-hidden="true">
            {number}
          </span>
          <span className="al-chapter-rule" aria-hidden="true" />
        </div>

        <p className="al-kicker mt-6">{kicker}</p>
        <h2 className="al-chapter-heading">{title}</h2>
        {intro && <p className="al-chapter-intro mt-4">{intro}</p>}
      </div>
    );
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
      <div className="al-premium-card p-8">
        <p className="al-kicker text-center">Archetypal Compass</p>

        <h3 className="mt-4 text-center text-3xl font-bold">
          Healthy archetypal access
        </h3>

        <p className="al-text mx-auto mt-4 max-w-3xl text-center">
          This map shows which healthy archetypal energies are currently most
          available. Lower availability does not mean weakness — it means that
          expression may be collapsed, compensated, or caught in collision under
          pressure.
        </p>

        <div className="mt-10 flex justify-center">
          <svg viewBox="0 0 400 400" className="h-[28rem] w-[28rem] max-w-full">
            <defs>
              <radialGradient id="alCompassGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(163,75,46,0.38)" />
                <stop offset="48%" stopColor="rgba(163,75,46,0.12)" />
                <stop offset="100%" stopColor="rgba(163,75,46,0)" />
              </radialGradient>

              <filter id="alSoftGlow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle cx="200" cy="200" r="150" fill="url(#alCompassGlow)" />

            {[40, 70, 100, 130, 160].map((radius) => (
              <circle
                key={radius}
                cx="200"
                cy="200"
                r={radius}
                fill="none"
                stroke="rgba(42,38,32,0.16)"
                strokeWidth="1"
              />
            ))}

            <line
              x1="200"
              y1="40"
              x2="200"
              y2="360"
              stroke="rgba(42,38,32,0.2)"
              strokeWidth="1.5"
            />

            <line
              x1="40"
              y1="200"
              x2="360"
              y2="200"
              stroke="rgba(42,38,32,0.2)"
              strokeWidth="1.5"
            />

            <polygon
              points={polygonPoints}
              fill="rgba(163,75,46,0.20)"
              stroke="rgba(163,75,46,0.95)"
              strokeWidth="2"
              filter="url(#alSoftGlow)"
            />

            {items.map((item) => (
              <circle
                key={`${item.name}-energy`}
                cx={item.energyX}
                cy={item.energyY}
                r="5"
                fill="rgb(163,75,46)"
                filter="url(#alSoftGlow)"
              />
            ))}

            <circle
              cx="200"
              cy="200"
              r="5"
              fill="rgba(163,75,46,0.9)"
              filter="url(#alSoftGlow)"
            />

            {items.map((item) => (
              <g key={item.name}>
                <circle
                  cx={item.x}
                  cy={item.y}
                  r="28"
                  fill="rgba(247,245,239,0.96)"
                  stroke="rgba(42,38,32,0.16)"
                />

                <text
                  x={item.x}
                  y={item.y - 4}
                  textAnchor="middle"
                  fill="rgb(42,38,32)"
                  fontSize="12"
                  fontWeight="700"
                >
                  {item.name}
                </text>

                <text
                  x={item.x}
                  y={item.y + 12}
                  textAnchor="middle"
                  fill="rgba(81,74,66,0.75)"
                  fontSize="10"
                >
                  {item.element}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="al-soft-card p-5">
            <p className="al-kicker">Most Available</p>
            <p className="mt-3 text-2xl font-bold">{mostAvailable.name}</p>
            <p className="al-text mt-2 text-sm">
              This archetypal energy currently has the strongest healthy access.
            </p>
          </div>

          <div className="al-soft-card p-5">
            <p className="al-kicker">Least Available</p>
            <p className="mt-3 text-2xl font-bold">{leastAvailable.name}</p>
            <p className="al-text mt-2 text-sm">
              This archetypal energy may need gentler integration, not force or
              judgment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Report v2 archetype summary card (Section 7 of this task): explains the
  // archetype's pattern rather than repeating the raw numbers the ArcheLoop
  // Wheel already shows in full.
  function ArchetypeSummaryCard({ item }: { item: any }) {
    const capacities = item.capacities || [];
    const strongest = [...capacities].sort(
      (a: any, b: any) => b.healthyAvailabilityScore - a.healthyAvailabilityScore
    )[0];
    const mostProtected = [...capacities].sort(
      (a: any, b: any) => b.shadowActivationScore - a.shadowActivationScore
    )[0];

    const formationEntries = [
      { label: "Collapse", value: item.formationProfile?.collapse ?? 0 },
      { label: "Compensate", value: item.formationProfile?.compensate ?? 0 },
      { label: "Collide", value: item.formationProfile?.collide ?? 0 },
    ];
    const dominantFormation = [...formationEntries].sort((a, b) => b.value - a.value)[0];

    return (
      <div className="al-panel-card p-8">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <h3 className="flex items-center gap-3 text-3xl font-bold">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 rounded-full"
                style={{ background: ARCHETYPE_ACCENT[item.archetype] ?? "var(--al-accent)" }}
              />
              {item.archetype}
            </h3>
            <p className="al-muted mt-1">{item.element}</p>
            <p className="al-muted mt-1 text-sm">
              {ARCHETYPE_CAPACITY_LABEL[item.archetype as keyof typeof ARCHETYPE_CAPACITY_LABEL]}
            </p>
          </div>

          <div className="text-right">
            <p className="al-kicker">Healthy · Shadow</p>
            <p className="text-xl font-bold text-[var(--al-accent)]">
              {item.healthyAvailability ?? item.healthyPercent ?? 0}% ·{" "}
              {item.shadowActivation ?? item.shadowPercent ?? 0}%
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {strongest && (
            <div className="al-soft-card p-4">
              <p className="al-kicker">Strongest Capacity</p>
              <p className="mt-2 font-semibold text-[var(--al-text)]">
                {strongest.developmentalCapacity}
              </p>
              <p className="al-muted mt-1 text-sm">
                {strongest.healthyAvailabilityScore}% Healthy Availability
              </p>
            </div>
          )}

          {mostProtected && (
            <div className="al-soft-card p-4">
              <p className="al-kicker">Most Protected Capacity</p>
              <p className="mt-2 font-semibold text-[var(--al-text)]">
                {mostProtected.developmentalCapacity}
              </p>
              <p className="al-muted mt-1 text-sm">
                {mostProtected.shadowActivationScore}% Shadow Activation
              </p>
            </div>
          )}
        </div>

        <div className="al-soft-card mt-4 p-4">
          <p className="al-kicker">Dominant Formation</p>
          <p className="mt-2 font-semibold text-[var(--al-text)]">
            {dominantFormation.label} ({dominantFormation.value}%)
          </p>
        </div>

        <p className="al-text mt-4 text-sm">
          {buildArchetypeCapacityInterpretation(item.archetype, capacities)}
        </p>
      </div>
    );
  }

  if (!lowestIntegratedArchetype) {
    return (
      <PageShell>
        <section className="al-section">
          <div className="al-card mx-auto max-w-3xl p-8 text-center">
            <h1 className="text-3xl font-semibold">No report data found</h1>

            <p className="al-text mt-4">
              Please complete the ArcheLoop assessment first to generate your
              report.
            </p>

            <a href="/assessment" className="al-button-primary mt-6 inline-flex">
              Start Assessment
            </a>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div id="report-top" className="al-report">
        {/* ============================================================
            CHAPTER 1 — YOUR RESULT
        ============================================================ */}
        <ChapterDivider
          number="1"
          kicker="Chapter One"
          title="Your Result"
          intro="Your primary pattern, at a glance — the loop, archetype, element, and protective formation your results point to right now."
        />

        <section className="al-section">
          <div className="al-container-wide">
            <div className="al-hero-card text-left">
              <div className="al-primary-loop-hero-layout">
                <div className="al-primary-loop-hero-art">
                  <Image
                    src={loopImages[selectedLoopName]}
                    alt={`${selectedLoopName} illustration`}
                    width={230}
                    height={230}
                    className="al-primary-loop-hero-art-image"
                  />
                </div>

                <div className="al-primary-loop-hero-heading">
                  {isLowDifferentiation ? (
                    <h1 className="al-heading-xl">
                      Your ArcheLoop Report
                      <br />
                      <span className="text-[var(--al-accent)]">
                        A broader pattern map
                      </span>
                    </h1>
                  ) : (
                    <>
                      {/* Dominant result area: Primary Shadow Loop, one
                          deterministic personalised sentence, then Developmental
                          Capacity -> Integration Direction. Everything else below
                          is restrained supporting metadata, not six equal cards. */}
                      <p
                        className="al-kicker"
                        style={{ color: primaryArchetypeAccent }}
                      >
                        Primary Shadow Loop
                      </p>

                      <h1 className="al-heading-xl">{primaryLoop.title}</h1>
                    </>
                  )}
                </div>

                <div className="al-primary-loop-hero-body">
                  {isLowDifferentiation ? (
                    <>
                      <p className="al-text-lg mt-6 max-w-2xl">
                        Your responses did not produce one clearly dominant Shadow
                        Loop. Several patterns scored similarly, so this report is
                        best read as a broader map of your current protective
                        patterns rather than one definitive result.
                      </p>

                      {responseQuality?.explanation && (
                        <p className="al-muted mt-4 max-w-3xl text-sm">
                          {responseQuality.explanation}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="al-text-lg mt-5 max-w-2xl">
                        {heroInterpretation}
                      </p>

                      {isV2 && (
                        <div className="al-soft-card mt-8 inline-flex max-w-fit flex-wrap items-center gap-3 p-5">
                          <span className="al-kicker">
                            {structuralMetadata.developmentalCapacity}
                          </span>
                          <span aria-hidden="true" className="al-muted">
                            →
                          </span>
                          <span className="font-semibold text-[var(--al-text)]">
                            {archeLoopPath.journey}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Restrained supporting metadata row (Level D). */}
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                    <span className="al-pill">
                      <span
                        aria-hidden="true"
                        className="mr-2 inline-block h-2 w-2 rounded-full"
                        style={{ background: primaryArchetypeAccent }}
                      />
                      {primaryLoop.archetype}
                    </span>

                    <span className="al-pill">{primaryLoop.element}</span>

                    <span className="al-pill">{formattedMechanism}</span>

                    {isV2 && (
                      <span className="al-pill">
                        Injured: {structuralMetadata.injuredArchetype}
                      </span>
                    )}
                  </div>

                  {isLowDifferentiation && (
                    <p className="al-muted mt-4 max-w-3xl text-sm">
                      These values reflect the single most prominent pattern in a
                      closely-scored field — see your Loop Landscape in Chapter
                      Three for the full picture.
                    </p>
                  )}

                  {isV2 && typeof reportData?.resultClarity === "number" && (
                    <p className="al-muted mt-6 max-w-3xl text-sm">
                      Result Clarity: {reportData.resultClarity}% — how clearly your
                      Primary Loop separates from your Secondary Loop in this
                      result. This describes pattern separation, not a statistical
                      or clinical certainty.
                    </p>
                  )}

                  {isV2 &&
                    !isLowDifferentiation &&
                    responseQuality &&
                    responseQuality.status !== "Clear" && (
                      <p className="al-muted mt-3 max-w-3xl text-sm">
                        {responseQuality.explanation}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm">
              <span className="al-muted">✓ Saved to My Account</span>

              <a
                href="/account"
                className="al-muted underline-offset-4 hover:underline hover:text-[var(--al-accent)]"
              >
                View saved reports
              </a>

              <PrintReportLink />
            </div>
          </div>
        </section>

        <section className="al-section-tight">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Your ArcheLoop Path"
              title="From loop to integrated self."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <PathCard
                label={isLowDifferentiation ? "Most Prominent Pattern" : "Shadow Loop"}
                value={primaryLoop.title}
                detail={
                  isLowDifferentiation
                    ? "One of several protective patterns that scored closely in your results."
                    : "The protective pattern most active in your results right now."
                }
              />

              <PathCard
                label="Integration Journey"
                value={archeLoopPath.journey}
                detail="The path that helps you interrupt and integrate the loop."
              />

              <PathCard
                label="Integrated Self"
                value={archeLoopPath.integratedSelf}
                detail="The healthier expression this loop is guiding you toward."
              />
            </div>
          </div>
        </section>

        <section className="al-section-tight">
          <div className="al-container">
            <div className="al-premium-card p-8 text-center">
              <p className="al-kicker">Remember</p>

              <h3 className="al-heading-md">
                Your Shadow Loop is not your identity.
              </h3>

              <p className="al-text-lg mx-auto mt-6 max-w-3xl">
                It is a protective pattern your mind and nervous system developed
                in an attempt to keep you safe. Protective patterns can be
                understood. What can be understood can be interrupted. What can be
                interrupted can gradually be integrated.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 2 — YOUR CURRENT STRUCTURE
        ============================================================ */}
        <ChapterDivider
          number="2"
          kicker="Chapter Two"
          title="Your Current Structure"
          intro={
            isLowDifferentiation
              ? "Because several patterns scored closely, the sections below describe the single most prominent (tied) pattern in detail — read them as one illustrative thread within your broader Loop Landscape, not a definitive result."
              : "How this pattern is built — the capacity it protects, the archetypes involved, and the belief underneath it."
          }
        />

        <section className="al-section-tight">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Your Pattern Synthesis"
              title="Putting the pieces together."
            />

            <div className="al-feature-card mx-auto max-w-4xl space-y-5">
              {patternSynthesisParagraphs.map((paragraph, index) => (
                <p key={index} className="al-text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="al-section-tight">
          <div className="al-container-wide">
            <SectionHeader
              kicker="What This Means in Everyday Life"
              title="Your pattern, in plain language."
              text="A short, practical translation of the same results above — into what you might notice day to day."
            />

            <div className="grid gap-6 md:grid-cols-3">
              <div className="al-panel-card p-8">
                <p className="al-kicker">Your Strengths</p>
                <p className="al-text mt-4">{everydaySummary.strengths}</p>
              </div>

              <div className="al-panel-card p-8">
                <p className="al-kicker">What Becomes Protected</p>
                <p className="al-text mt-4">{everydaySummary.protectedText}</p>
              </div>

              <div className="al-panel-card p-8">
                <p className="al-kicker">What May Help</p>
                <p className="al-text mt-4">{everydaySummary.mayHelp}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Structural Dynamic"
              title="How this loop forms."
              text="Your results suggest this dynamic is currently active for you:"
            />

            {isV2 ? (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <InfoCard
                    label="Developmental Capacity"
                    value={structuralMetadata.developmentalCapacity}
                  />
                  <InfoCard
                    label="Injured Archetype"
                    value={structuralMetadata.injuredArchetype}
                  />
                  <InfoCard
                    label="Protective Formation"
                    value={formattedMechanism}
                  />
                  {structuralMetadata.compensatingArchetype ? (
                    <InfoCard
                      label="Compensating Archetype"
                      value={structuralMetadata.compensatingArchetype}
                    />
                  ) : structuralMetadata.formation === "Compensate" ? (
                    <InfoCard
                      label="Protective Strategy"
                      value={`Self-compensating ${structuralMetadata.injuredArchetype}`}
                    />
                  ) : structuralMetadata.participatingArchetypes ? (
                    <InfoCard
                      label="Participating Archetypes"
                      value={structuralMetadata.participatingArchetypes.join(" + ")}
                    />
                  ) : null}
                </div>

                <p className="al-text">
                  <span className="font-semibold text-[var(--al-text)]">
                    {structuralMetadata.developmentalCapacity}:
                  </span>{" "}
                  {DEVELOPMENTAL_CAPACITY_PLAIN_LANGUAGE[
                    structuralMetadata.developmentalCapacity as keyof typeof DEVELOPMENTAL_CAPACITY_PLAIN_LANGUAGE
                  ]}
                </p>

                <div className="al-card space-y-5 p-8">
                  <p className="al-text-lg">{structuralMetadata.structuralDynamic}</p>

                  <p className="al-text">
                    <span className="font-semibold text-[var(--al-text)]">
                      What this protects against:
                    </span>{" "}
                    {String(detail.coreStructure.coreFear)}
                  </p>
                </div>

                {/* Protective Formation, defined once in plain language here
                    so Loop Formula / Loop Landscape / Formation Profile don't
                    need to repeat the definition later (Section 1 of this
                    task: "avoid repeating the same definition in every
                    section"). */}
                <div className="al-soft-card p-6">
                  <p className="al-kicker">Protective Formation, in plain language</p>
                  <div className="mt-3 space-y-2">
                    {(["Collapse", "Compensate", "Collide"] as const).map((formationName) => (
                      <p
                        key={formationName}
                        className={
                          formationName === formattedMechanism
                            ? "text-sm font-semibold text-[var(--al-text)]"
                            : "al-muted text-sm"
                        }
                      >
                        <span className="font-semibold">{formationName}</span> —{" "}
                        {FORMATION_PLAIN_LANGUAGE[formationName]}
                        {formationName === formattedMechanism && " (your current pattern)"}
                      </p>
                    ))}
                  </div>
                </div>

                {structuralMetadata.formation === "Compensate" &&
                  !structuralMetadata.compensatingArchetype &&
                  SELF_COMPENSATING_SUMMARY[selectedLoopName] && (
                    <div className="al-soft-card p-6">
                      <p className="al-kicker">Self-compensating</p>
                      <p className="al-text mt-3">
                        {SELF_COMPENSATING_SUMMARY[selectedLoopName]}
                      </p>
                    </div>
                  )}

                <p className="al-muted text-sm">
                  {describeInjuredArchetype(
                    structuralMetadata.injuredArchetype,
                    structuralMetadata.developmentalCapacity
                  )}
                </p>
              </div>
            ) : (
              <div className="al-card space-y-5 p-8">
                <p className="al-text-lg">{detail.structuralDynamic}</p>

                <p className="al-text">
                  <span className="font-semibold text-[var(--al-text)]">
                    What this protects against:
                  </span>{" "}
                  {String(detail.coreStructure.coreFear)}
                </p>
              </div>
            )}
          </div>
        </section>

        {isV2 && primaryCapacityScore && (
          <section className="al-section-tight">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Primary Capacity Profile"
                title={`${structuralMetadata.developmentalCapacity}: Healthy vs. Shadow evidence.`}
                text="Healthy Availability and Shadow Activation are reported separately. A capacity can be strongly available in some contexts and strongly protected in others at the same time."
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="al-card p-8">
                  <p className="al-kicker mb-5">Healthy Evidence</p>

                  <div className="space-y-5">
                    <ScoreBar
                      label="Healthy Capacity"
                      value={primaryCapacityScore.healthyCapacityScore ?? 0}
                    />
                    <ScoreBar
                      label="Healthy Expression"
                      value={primaryCapacityScore.healthyExpressionScore ?? 0}
                    />
                  </div>

                  <div className="al-soft-card mt-6 p-4 text-center">
                    <p className="al-kicker">Healthy Availability</p>
                    <p className="mt-2 text-2xl font-bold text-[var(--al-accent)]">
                      {primaryCapacityScore.healthyAvailabilityScore ?? 0}%
                    </p>
                    <p className="al-muted mt-2 text-sm">
                      {describeHealthyAvailability(primaryCapacityScore.healthyAvailabilityScore ?? 0)}
                    </p>
                  </div>
                </div>

                <div className="al-card p-8">
                  <p className="al-kicker mb-5">Protective Evidence</p>

                  <div className="space-y-5">
                    <ScoreBar
                      label="Protective Belief"
                      value={primaryCapacityScore.protectiveBeliefScore ?? 0}
                    />
                    <ScoreBar
                      label="Protective Emotion"
                      value={primaryCapacityScore.protectiveEmotionScore ?? 0}
                    />
                    <ScoreBar
                      label="Protective Behaviour"
                      value={primaryCapacityScore.protectiveBehaviourScore ?? 0}
                    />
                  </div>

                  <div className="al-soft-card mt-6 p-4 text-center">
                    <p className="al-kicker">Shadow Activation</p>
                    <p className="mt-2 text-2xl font-bold text-[var(--al-accent)]">
                      {primaryCapacityScore.shadowActivationScore ?? 0}%
                    </p>
                    <p className="al-muted mt-2 text-sm">
                      {describeShadowActivation(primaryCapacityScore.shadowActivationScore ?? 0)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="al-text-lg mx-auto mt-8 max-w-3xl text-center">
                {buildPrimaryCapacityInterpretation(
                  structuralMetadata.developmentalCapacity,
                  primaryCapacityScore.healthyAvailabilityScore ?? 0,
                  primaryCapacityScore.shadowActivationScore ?? 0
                )}
              </p>
            </div>
          </section>
        )}

        <section className="al-section">
          <div className="al-container-wide">
            {isV2 ? (
              <>
                <SectionHeader
                  kicker="Archetype Pattern"
                  title={`How ${primaryLoop.archetype} is currently organising this pattern.`}
                  text="Healthy Availability and Shadow Activation for the whole Archetype, reported separately — never netted into a single score."
                />

                {primaryArchetypeScore && (
                  <div className="space-y-8">
                    <div className="al-premium-card p-8">
                      <p className="al-text-lg">
                        {buildArchetypeRelationshipCopy(
                          primaryLoop.archetype,
                          primaryArchetypeScore.healthyAvailability ??
                            primaryArchetypeScore.healthyPercent ??
                            0,
                          primaryArchetypeScore.shadowActivation ??
                            primaryArchetypeScore.shadowPercent ??
                            0,
                          primaryLoop.title
                        )}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {(primaryArchetypeScore.capacities || []).map((c: any) => (
                        <div key={c.developmentalCapacity} className="al-soft-card p-5">
                          <p className="al-kicker">{c.developmentalCapacity}</p>
                          <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="al-muted">Healthy Availability</span>
                            <span className="font-semibold text-[var(--al-text)]">
                              {c.healthyAvailabilityScore}%
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-sm">
                            <span className="al-muted">Shadow Activation</span>
                            <span className="font-semibold text-[var(--al-text)]">
                              {c.shadowActivationScore}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <SectionHeader
                  kicker="Archetype Integration"
                  title={`How ${primaryLoop.archetype} energy is organising this pattern.`}
                  text={
                    primaryArchetypeScore
                      ? `Your results show ${primaryArchetypeScore.integratedPercent}% healthy integration currently available in ${primaryLoop.archetype}.`
                      : undefined
                  }
                />

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="al-card p-8">
                    <h3 className="mb-4 text-2xl font-bold">Lower Availability</h3>
                    <p className="al-text">{archetypeInsight.low}</p>
                  </div>

                  <div className="al-card p-8">
                    <h3 className="mb-4 text-2xl font-bold">Shadow Activation</h3>
                    <p className="al-text">{archetypeInsight.highShadow}</p>
                  </div>

                  <div className="al-premium-card p-8">
                    <h3 className="mb-4 text-2xl font-bold text-[var(--al-accent)]">
                      Healthy Integration
                    </h3>
                    <p className="al-text">{archetypeInsight.healthy}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="al-section-tight">
          <div className="al-container">
            <SectionHeader
              kicker="Core Protective Belief"
              title="The belief underneath the pattern."
            />

            <div className="al-premium-card p-10 text-center">
              <p className="al-text-lg leading-relaxed">
                A core protective belief can appear underneath{" "}
                {primaryLoop.title.toLowerCase()}:
              </p>

              <p className="mt-6 text-2xl font-semibold text-[var(--al-accent)] md:text-3xl">
                “{primaryLoop.coreBelief}”
              </p>

              <p className="al-text mx-auto mt-6 max-w-2xl">
                This belief is not a flaw. It formed for a reason, and it has
                been doing a job — keeping you safe through a {formattedMechanism}{" "}
                response, when that felt like the most available option.
              </p>
            </div>
          </div>
        </section>

        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Loop Formula"
              title="How this pattern protects you."
              text="This combination may create the following structure in your results:"
            />

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="al-card p-8">
                <h3 className="mb-4 text-2xl font-bold">Healthy Expression</h3>
                <p className="al-text">{formula.healthyExpression}</p>
              </div>

              <div className="al-card p-8">
                <h3 className="mb-4 text-2xl font-bold">
                  Protective Adaptation
                </h3>
                <p className="al-text">{formula.protectiveAdaptation}</p>
              </div>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-6 text-2xl font-bold">
                Observable Behaviours
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                {formula.observableBehaviours.map((item) => (
                  <div key={item} className="al-soft-card p-4 al-text">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 3 — YOUR PATTERN MAP
        ============================================================ */}
        <ChapterDivider
          number="3"
          kicker="Chapter Three"
          title="Your Pattern Map"
          intro="A wider view of your results — every loop, archetype, and capacity, ranked and scored side by side."
        />

        {loopLandscape.length > 0 && (
          <section className="al-section">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Loop Landscape"
                title="Your dominant loop ecosystem."
                text={
                  isLowDifferentiation
                    ? "Several patterns scored closely in your results, so no single loop stands out as clearly dominant. This ranked view is the most honest way to read your results right now."
                    : "These are the strongest shadow loop activations detected in your current assessment. Your primary loop is the strongest pattern, while the others may activate under different forms of stress, pressure, vulnerability, conflict, visibility, or relational activation."
                }
              />

              {!isLowDifferentiation && loopLandscape.length > 1 && (
                <p className="al-text-lg mx-auto mb-8 max-w-3xl text-center">
                  {buildLoopLandscapeInterpretation(loopLandscape)}
                </p>
              )}

              {typeof reportData?.confidence === "number" && (
                <p className="al-muted mb-8 text-center text-sm">
                  Pattern separation: {reportData.confidence}% — how clearly
                  your primary loop stands out from your secondary loop in
                  your results.
                </p>
              )}

              <div className="grid gap-5">
                {loopLandscape.slice(0, 5).map((item: any, index: number) => (
                  <div
                    key={item.loop}
                    className="al-panel-card flex flex-col gap-6 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between md:p-8"
                    style={{
                      borderLeft: `4px solid ${
                        ARCHETYPE_ACCENT[item.archetype] ?? "var(--al-border-strong)"
                      }`,
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full font-bold ${
                          index === 0
                            ? "bg-[var(--al-accent)] text-[var(--al-bg)]"
                            : "al-soft-card"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div>
                        <p className="al-kicker">
                          {index === 0
                            ? isLowDifferentiation
                              ? "Most Prominent (Tied)"
                              : "Primary Pattern"
                            : isV2 && index === 1
                            ? "Secondary Pattern"
                            : "Supporting Pattern"}
                        </p>

                        <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                          {item.loop}
                        </h3>

                        {isV2 && (
                          <p className="al-muted mt-1 text-xs">
                            {item.archetype} · {item.element} ·{" "}
                            {item.formation || formatMechanism(item.responseStyle || "")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="md:w-64">
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="al-text">Activation Score</span>
                        <span className="font-semibold text-[var(--al-accent)]">
                          {item.score}%
                        </span>
                      </div>

                      <div
                        className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]"
                        role="progressbar"
                        aria-valuenow={item.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${item.loop} activation score`}
                      >
                        <div
                          className="h-full rounded-full bg-[var(--al-accent)]"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>

                      <p className="al-muted mt-2 text-right text-xs">
                        {getActivationDescriptor(item.score)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="al-narrative-block mx-auto mt-12 max-w-4xl">
                <p className="al-kicker">Loop Family Insight</p>

                <p className="al-text-lg mt-4">
                  Your strongest shadow activation currently appears within the{" "}
                  <span className="font-semibold text-[var(--al-text)]">
                    {primaryLoop.archetype}
                  </span>{" "}
                  archetype family. This suggests that challenges related to{" "}
                  <span className="font-semibold text-[var(--al-text)]">
                    {primaryLoop.element}
                  </span>{" "}
                  energy may be playing a central role in the current pattern.
                  Rather than reflecting a single isolated loop, the assessment
                  indicates a broader ecosystem of related protective responses
                  that emerge under stress, vulnerability, relational activation,
                  uncertainty, or pressure.
                </p>
              </div>

              <div className="al-narrative-block mx-auto mt-6 max-w-4xl">
                <p className="al-kicker">Primary + Secondary Interaction</p>

                <p className="al-text-lg mt-4">
                  When your Primary and Secondary Loops interact, this is rarely
                  two separate patterns taking turns. {primaryLoop.title} tends
                  to lead, with {secondaryLoop.title} activating alongside it —
                  together forming one combined protective response.
                </p>
              </div>
            </div>
          </section>
        )}

        {archetypeScores.length > 0 && (
          <section className="al-section">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Archetypal Availability"
                title="Your archetypal availability at a glance."
                text="In plain terms, this is how easily you can access each Archetype's healthier capacities right now."
              />

              <div className="mb-10">
                {isV2 ? (
                  <ArcheLoopWheel
                    scores={archetypeScores.map((item: any) => ({
                      archetype: item.archetype,
                      element: item.element,
                      healthyAvailability: item.healthyAvailability ?? item.healthyPercent ?? 0,
                      shadowActivation: item.shadowActivation ?? item.shadowPercent ?? 0,
                    }))}
                  />
                ) : (
                  <ArchetypeCompass scores={archetypeScores} />
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {archetypeScores.map((item: any) =>
                  isV2 ? (
                    <ArchetypeSummaryCard key={item.archetype} item={item} />
                  ) : (
                    <div key={item.archetype} className="al-card p-8">
                      <div className="mb-8 flex items-center justify-between gap-6">
                        <div>
                          <h3 className="text-3xl font-bold">{item.archetype}</h3>
                          <p className="al-muted mt-1">{item.element}</p>
                        </div>

                        <p className="text-right text-2xl font-bold text-[var(--al-accent)]">
                          Healthy Availability:{" "}
                          {item.integratedPercent}%
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="al-kicker mb-4">Healthy Expression</p>

                          <ScoreBar
                            label="Healthy"
                            value={item.healthyPercent}
                          />
                        </div>

                        <div>
                          <p className="al-kicker mb-4">Shadow Expression</p>

                          <div className="space-y-5">
                            <ScoreBar
                              label="Shadow Pressure"
                              value={item.shadowPercent || 0}
                            />

                            <div className="space-y-5 border-t border-[var(--al-border)] pt-5">
                              <ScoreBar
                                label="Collapse"
                                value={item.suppressionPercent || 0}
                              />

                              <ScoreBar
                                label="Compensate"
                                value={item.compensationPercent || 0}
                              />

                              <ScoreBar
                                label="Collide"
                                value={item.collisionPercent || 0}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {isV2 && capacityScores.length > 0 && (
          <section className="al-section-tight">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Twelve-Capacity Profile"
                title="Every Developmental Capacity, at a glance."
                text="Healthy Availability and Shadow Activation for all twelve Developmental Capacities, grouped by Archetype."
              />

              <div className="grid gap-6 md:grid-cols-2">
                {["Sovereign", "Magician", "Lover", "Warrior"].map((archetypeName) => (
                  <div
                    key={archetypeName}
                    className="al-panel-card p-6"
                    style={{
                      borderLeft: `4px solid ${ARCHETYPE_ACCENT[archetypeName] ?? "var(--al-border-strong)"}`,
                    }}
                  >
                    <p className="al-kicker mb-4">{archetypeName}</p>

                    <div className="space-y-5">
                      {capacityScores
                        .filter((c: any) => c.archetype === archetypeName)
                        .map((c: any) => {
                          const isCurrentStrength =
                            !!topHealthyCapacityOverall &&
                            c.developmentalCapacity === topHealthyCapacityOverall.developmentalCapacity;
                          const isGrowthEdge =
                            !!reportData?.growthEdge &&
                            c.developmentalCapacity === reportData.growthEdge.developmentalCapacity;
                          const isHighlyProtected =
                            c.developmentalCapacity === structuralMetadata.developmentalCapacity;

                          return (
                            <div key={c.developmentalCapacity}>
                              <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
                                <span className="al-text flex flex-wrap items-center gap-2">
                                  {c.developmentalCapacity}
                                  {isCurrentStrength && (
                                    <span className="al-badge text-xs">Current Strength</span>
                                  )}
                                  {isGrowthEdge && (
                                    <span className="al-badge text-xs">Growth Edge</span>
                                  )}
                                  {isHighlyProtected && (
                                    <span className="al-badge text-xs">Highly Protected</span>
                                  )}
                                </span>
                                <span className="al-muted text-xs">
                                  Healthy {c.healthyAvailabilityScore}% · Shadow{" "}
                                  {c.shadowActivationScore}%
                                </span>
                              </div>

                            <div className="flex gap-1.5">
                              <div
                                className="al-progress-track h-3 flex-1"
                                role="progressbar"
                                aria-valuenow={c.healthyAvailabilityScore}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label={`${c.developmentalCapacity} Healthy Availability`}
                              >
                                <div
                                  className="al-progress-fill h-full"
                                  style={{ width: `${c.healthyAvailabilityScore}%` }}
                                />
                              </div>
                              <div
                                className="h-3 flex-1 overflow-hidden rounded-full bg-[var(--al-surface-deep)]"
                                role="progressbar"
                                aria-valuenow={c.shadowActivationScore}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label={`${c.developmentalCapacity} Shadow Activation`}
                              >
                                <div
                                  className="h-full rounded-full bg-[var(--al-secondary)]"
                                  style={{ width: `${c.shadowActivationScore}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              <p className="al-text-lg mx-auto mt-8 max-w-3xl text-center">
                {buildTwelveCapacityInterpretation(capacityScores)}
              </p>

              <p className="al-muted mt-3 text-center text-sm">
                Left track: Healthy Availability. Right track: Shadow Activation.
              </p>
            </div>
          </section>
        )}

        {isV2 && reportData?.formationScores && (
          <section className="al-section-tight">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Formation Profile"
                title="Collapse, Compensate, Collide."
              />

              <div className="grid gap-6 md:grid-cols-3">
                <div className="al-panel-card p-8">
                  <p className="al-kicker">Collapse</p>
                  <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                    {reportData.formationScores.collapse}%
                  </p>
                  <div
                    className="al-progress-track mt-4 h-3"
                    role="progressbar"
                    aria-valuenow={reportData.formationScores.collapse}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Collapse formation score"
                  >
                    <div
                      className="al-progress-fill h-full"
                      style={{ width: `${reportData.formationScores.collapse}%` }}
                    />
                  </div>
                  <p className="al-text mt-4 text-sm">What becomes unavailable.</p>
                </div>

                <div className="al-panel-card p-8">
                  <p className="al-kicker">Compensate</p>
                  <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                    {reportData.formationScores.compensate}%
                  </p>
                  <div
                    className="al-progress-track mt-4 h-3"
                    role="progressbar"
                    aria-valuenow={reportData.formationScores.compensate}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Compensate formation score"
                  >
                    <div
                      className="al-progress-fill h-full"
                      style={{ width: `${reportData.formationScores.compensate}%` }}
                    />
                  </div>
                  <p className="al-text mt-4 text-sm">
                    In everyday terms: a safer, protective version may
                    replace direct expression.
                  </p>
                </div>

                <div className="al-panel-card p-8">
                  <p className="al-kicker">Collide</p>
                  <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                    {reportData.formationScores.collide}%
                  </p>
                  <div
                    className="al-progress-track mt-4 h-3"
                    role="progressbar"
                    aria-valuenow={reportData.formationScores.collide}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Collide formation score"
                  >
                    <div
                      className="al-progress-fill h-full"
                      style={{ width: `${reportData.formationScores.collide}%` }}
                    />
                  </div>
                  <p className="al-text mt-4 text-sm">
                    What becomes caught in internal conflict.
                  </p>
                </div>
              </div>

              <p className="al-text-lg mx-auto mt-8 max-w-3xl text-center">
                {buildFormationInterpretation(reportData.formationScores)}
              </p>
            </div>
          </section>
        )}

        {isV2 && (
          <section className="al-section">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Developmental Direction"
                title="Where this points next."
                text="In plain terms: the area your results suggest may benefit most from attention and practice, and the fixed path your Primary Loop points toward — kept as two separate things below."
              />

              <div className="grid gap-6 md:grid-cols-3">
                {reportData?.mostAvailableArchetype && (
                  <div className="al-panel-card p-8">
                    <p className="al-kicker">Your Current Strength</p>
                    <h4 className="mt-3 text-2xl font-bold">
                      {reportData.mostAvailableArchetype.archetype}
                    </h4>
                    <p className="al-text mt-3 text-sm">
                      Highest Healthy Availability of the four Archetypes in
                      this result ({reportData.mostAvailableArchetype.healthyAvailability}%)
                      {mostAvailableStrongestCapacities.length > 0 && (
                        <>
                          , led by {joinWithAnd(mostAvailableStrongestCapacities)}
                        </>
                      )}
                      .
                    </p>
                  </div>
                )}

                {reportData?.growthEdge && (
                  <div className="al-panel-card p-8">
                    <p className="al-kicker">Your Current Growth Edge</p>
                    <h4 className="mt-3 text-2xl font-bold">
                      {reportData.growthEdge.developmentalCapacity}
                    </h4>
                    <p className="al-text mt-3 text-sm">
                      The Developmental Capacity with the lowest Healthy
                      Availability in this result ({reportData.growthEdge.healthyAvailabilityScore}%),
                      within {reportData.growthEdge.archetype}. Not the same
                      as your Injured or Compensating Archetype.
                    </p>
                  </div>
                )}

                <div className="al-panel-card p-8">
                  <p className="al-kicker">Your Integration Direction</p>
                  <h4 className="mt-3 text-2xl font-bold text-[var(--al-accent)]">
                    {archeLoopPath.journey}
                  </h4>
                  <p className="al-text mt-3 text-sm">
                    Fixed by {primaryLoop.title} specifically, leading toward{" "}
                    {archeLoopPath.integratedSelf}.
                  </p>
                </div>
              </div>

              {reportData?.mostAvailableArchetype && reportData?.growthEdge && (
                <div className="al-premium-card mx-auto mt-6 max-w-4xl p-10">
                  <p className="al-kicker">Why This Matters</p>
                  <p className="al-text-lg mt-4">
                    {buildDevelopmentalDirectionSynthesis({
                      mostAvailableArchetype: reportData.mostAvailableArchetype.archetype,
                      growthEdgeCapacity: reportData.growthEdge.developmentalCapacity,
                      growthEdgeArchetype: reportData.growthEdge.archetype,
                      integrationPath: archeLoopPath.journey,
                      integratedSelf: archeLoopPath.integratedSelf,
                    })}
                  </p>

                  {showBroaderGrowthArea && (
                    <p className="al-muted mt-4 text-sm">
                      Across all three of its capacities,{" "}
                      <span className="font-semibold text-[var(--al-text)]">
                        {reportData.growthEdgeArchetype.archetype}
                      </span>{" "}
                      also shows the lowest average Healthy Availability — a
                      broader, Archetype-wide version of the same signal.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {!isV2 && (
          <section className="al-section">
            <div className="al-container-wide">
              <SectionHeader
                kicker="Elemental Balance"
                title={`How ${primaryLoop.element} is moving through this pattern.`}
                text="Your pattern appears to move between these three expressions of the same element:"
              />

              <div className="grid gap-6 md:grid-cols-3">
                <div className="al-card p-8">
                  <h3 className="mb-4 text-2xl font-bold">Low Presence</h3>
                  <p className="al-text">{elementInsight.low}</p>
                </div>

                <div className="al-card p-8">
                  <h3 className="mb-4 text-2xl font-bold">High Activation</h3>
                  <p className="al-text">{elementInsight.high}</p>
                </div>

                <div className="al-premium-card p-8">
                  <h3 className="mb-4 text-2xl font-bold text-[var(--al-accent)]">
                    Healthy Balance
                  </h3>
                  <p className="al-text">{elementInsight.healthy}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            CHAPTER 4 — HOW IT SHOWS UP
        ============================================================ */}
        <ChapterDivider
          number="4"
          kicker="Chapter Four"
          title="How It Shows Up"
          intro="How this pattern tends to appear in daily life — in your body, your relationships, and your nervous system."
        />

        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Deeper Pattern Map"
              title="What this pattern reveals."
              text="Grouped into three clusters: how it shows up with other people, how your body and nervous system respond under pressure, and how the pattern tends to escalate."
            />

            <div className="grid gap-10 lg:grid-cols-3">
              <div>
                <ClusterHeading label="In Relationships" />

                <div className="space-y-6">
                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Relationship Pattern</h4>
                    <p className="al-text">{primaryLoop.relationshipPattern}</p>
                  </div>

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Communication Style</h4>
                    <p className="al-text">{primaryLoop.communicationStyle}</p>
                  </div>

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Relational Activators</h4>
                    <div className="mt-3 space-y-3">
                      {detail.relationalActivators.map((item) => (
                        <div key={item} className="al-soft-card p-4 al-text text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Identity Protection</h4>
                    <p className="al-text">{primaryLoop.identityProtection}</p>
                  </div>
                </div>
              </div>

              <div>
                <ClusterHeading label="Under Pressure" />

                <div className="space-y-6">
                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Nervous System</h4>
                    <p className="al-text">{detail.nervousSystemDetails}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {detail.nervousSystemSigns.map((sign) => (
                        <span key={sign} className="al-soft-card px-4 py-2 text-sm">
                          {sign}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Body Activation</h4>
                    <p className="al-text">{bodyMapText}</p>
                  </div>

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Protection Mechanism</h4>
                    <p className="al-text">{primaryLoop.protection}</p>
                  </div>
                </div>
              </div>

              <div>
                <ClusterHeading label="How the Loop Escalates" />

                <div className="space-y-6">
                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Escalation Pattern</h4>
                    <p className="al-text">{primaryLoop.escalationPattern}</p>
                  </div>

                  {primaryLoop.signs && primaryLoop.signs.length > 0 && (
                    <div className="al-narrative-block">
                      <h4 className="mb-3 text-xl font-bold">Observable Behaviours</h4>
                      <div className="space-y-3">
                        {primaryLoop.signs.map((sign) => (
                          <div key={sign} className="al-soft-card p-4 al-text text-sm">
                            {sign}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="al-narrative-block">
                    <h4 className="mb-3 text-xl font-bold">Loop Interaction</h4>

                    {cascadeSteps.length > 0 ? (
                      <>
                        <p className="al-text text-sm">
                          When {primaryLoop.title} intensifies, your results
                          suggest the pattern tends to move through a sequence
                          like this:
                        </p>

                        <div className="mt-4 space-y-2">
                          {cascadeSteps.map((step, index) => (
                            <p key={step} className="al-text text-sm">
                              {index + 1}. {step}
                            </p>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p className="al-text">
                        When {primaryLoop.title} combines with{" "}
                        {secondaryLoop.title}, the two patterns tend to
                        reinforce each other under pressure rather than
                        activating separately.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            CHAPTER 5 — YOUR INTEGRATION DIRECTION
        ============================================================ */}
        <ChapterDivider
          number="5"
          kicker="Chapter Five"
          title="Your Integration Direction"
          intro="Where your results point next, and how integration tends to unfold from here."
        />

        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Integration Blueprint"
              title="The direction of growth."
              text="Your Integration Direction is not about becoming a different person — it is about strengthening what is already available to you."
            />

            <div className="al-feature-card">
              <p className="al-text-lg">{integrationOpeningParagraph}</p>

              <p className="al-text-lg mt-6">{integrationPathParagraph}</p>

              {!hasIntegrationAccess && (
                <p className="al-muted mt-6 max-w-3xl">
                  You understand your pattern now. The later stages become
                  available through the Integration Journey.
                </p>
              )}

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {integrationJourneyStages.map((stage, index) => {
                  const locked = stage.requiresIntegration && !hasIntegrationAccess;

                  return (
                    <div key={stage.title} className="al-journey-card">
                      <div className="al-number-badge">{index + 1}</div>

                      <p className="al-kicker">{stage.phase}</p>

                      <h3 className="al-journey-title mt-2">{stage.title}</h3>

                      {stage.dynamicValue && (
                        <p className="mt-2 font-semibold text-[var(--al-accent)]">
                          {stage.dynamicValue}
                        </p>
                      )}

                      <p className="al-text mt-3">{stage.description}</p>

                      {locked ? (
                        <p className="al-muted mt-5 text-sm italic">
                          Included in the Integration Journey
                        </p>
                      ) : (
                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <a
                            href={stage.actionHref}
                            className="al-button-secondary px-5 py-2.5 text-sm"
                          >
                            {stage.actionLabel}
                          </a>

                          {stage.secondaryActionLabel && (
                            <a
                              href={stage.secondaryActionHref}
                              className="al-muted text-sm underline-offset-4 hover:underline hover:text-[var(--al-accent)]"
                            >
                              {stage.secondaryActionLabel}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="al-muted mx-auto mt-10 max-w-2xl text-center text-sm">
                Integration is rarely linear. You may move back and forth
                between awareness, interruption, and practice as different
                situations activate the pattern. Returning to the process is
                part of the work—not evidence that you have failed.
              </p>
            </div>
          </div>
        </section>

        <section id="meet-your-integrated-self" className="al-section">
          <div className="al-container">
            <SectionHeader
              kicker="Meet Your Integrated Self"
              title={archeLoopPath.integratedSelf}
            />

            <div className="al-premium-card p-10">
              <p className="al-text-lg leading-relaxed">
                Every Shadow Loop contains the seed of an integrated expression.
                Your assessment is not showing who you are permanently. It is
                showing the protective strategy your system currently trusts most.
              </p>

              <p className="al-text-lg mt-8 leading-relaxed">
                As you continue practising awareness, regulation, embodiment, and
                conscious choice, the loop gradually loses its automatic grip.
                Over time the integrated expression becomes more available than
                the protective pattern.
              </p>

              <p className="al-text-lg mt-8 leading-relaxed">
                Your {archeLoopPath.integratedSelf} may begin to show up in
                small, ordinary moments first — a pause before the old
                response, a choice that feels slightly less automatic than
                before.
              </p>
            </div>
          </div>
        </section>

        <section className="al-section">
          <div className="al-container">
            {hasIntegrationAccess ? (
              <div className="al-premium-card p-10 text-center">
                <p className="al-kicker">Continue Your Journey</p>

                <h3 className="al-heading-lg">Resume where you left off.</h3>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="/triggered-intelligence" className="al-button-primary">
                    Log a Trigger
                  </a>

                  <a href="/progress-dashboard" className="al-button-secondary">
                    Progress Dashboard
                  </a>
                </div>
              </div>
            ) : (
              <div className="al-card p-10 text-center">
                <p className="al-kicker">Continue Your Integration Journey</p>

                <p className="al-text-lg mx-auto mt-6 max-w-3xl">
                  Your report helps you understand your primary Shadow Loop.
                  The Integration Journey helps you recognise triggers,
                  interrupt automatic patterns, practise new responses, and
                  track your progress over time.
                </p>

                <div className="mt-8 flex justify-center">
                  <a href="/integration" className="al-button-primary">
                    Explore Integration
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="al-section-tight al-no-print">
          <div className="al-container">
            <ReportFeedback />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
