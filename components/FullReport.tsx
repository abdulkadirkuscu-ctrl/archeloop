import { loopFormulas } from "../app/data/loopFormulas";
import { archetypeInsights } from "../app/data/archetypeInsights";
import { loopDetails } from "../app/data/loopDetails";
import PageShell from "../app/components/PageShell";
import { loops } from "../app/data/loops";
import { elementInsights } from "../app/data/elementInsights";
import ReportFeedback from "./ReportFeedback";
import { getLoopStructuralMetadata } from "../app/data/loopStructuralMetadata";
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

// Formation-appropriate replacement for the old "Collapsed Energy" heading,
// which named only one Formation regardless of the loop it was describing.
function formationEnergyLabel(formation: string) {
  if (formation === "Collapse") return "Protected Capacity";
  if (formation === "Compensate") return "Protective Substitution";
  if (formation === "Collide") return "Internal Conflict";
  return "Underlying Activation";
}

export default function FullReport({
  reportData,
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
  };
}) {
  const archetypeScores = reportData?.integratedScores || [];
  const loopLandscape = reportData?.loopLandscape || [];

  // Report v2 gate: newly generated reports carry scoringVersion "2.0" and
  // the full AssessmentResult snapshot. Reports saved before this field
  // existed simply don't have it, so every Report v2 addition below is
  // additive and skipped for them - they keep rendering exactly as before.
  const isV2 = reportData?.scoringVersion === "2.0";
  const capacityScores = reportData?.capacityScores || [];

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

  const highestIntegratedArchetype = [...archetypeScores].sort(
    (a: any, b: any) => b.integratedPercent - a.integratedPercent
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

  const bodyMapText = `Your results point to activation centred in the ${primaryLoop.body}. This is consistent with your ${formattedMechanism} response style — before ${primaryLoop.title.toLowerCase()} becomes a conscious thought, it is often felt here first, as tension, shutdown, urgency, or protective contraction.`;

  const cascadeSteps: string[] =
    "cascade" in detail && Array.isArray(detail.cascade)
      ? [...detail.cascade]
      : [];

  const integrationBlueprintText = `${detail.coreStructure.integrationShift} This process usually begins through small, repeatable moments of awareness, regulation, and behaviour change rather than forcing the system to transform all at once.`;

  function ScoreBar({ label, value }: { label: string; value: number }) {
    return (
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="al-text">{label}</span>
          <span className="font-semibold text-[var(--al-accent)]">
            {value}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
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

        <h2 className="al-heading-lg">{title}</h2>

        {text && <p className="al-text-lg mx-auto mt-6 max-w-3xl">{text}</p>}
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
      <section className="al-section">
        <div className="al-container-wide">
          <div className="al-hero-card text-left">
            <p className="al-kicker">Your ArcheLoop Report</p>

            <div className="al-soft-card my-10 p-6">
              <p className="font-semibold text-[var(--al-accent)]">
                Your report has been saved.
              </p>

              <p className="al-text mt-3">
                You can return to this report from My Account whenever you log
                in. You can also save it as a PDF from your browser if you'd
                like an offline copy.
              </p>
            </div>

            <h1 className="al-heading-xl">
              Your ArcheLoop Report
              <br />
              <span className="text-[var(--al-accent)]">
                {primaryLoop.title}
              </span>
            </h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              Your results point to {primaryLoop.title} as your primary
              pattern. This report interprets what that means specifically
              for you — how it forms, how it shows up in your body and
              relationships, and where your Integration Direction leads from
              here.
            </p>

            <div
              className={`mt-10 grid max-w-4xl gap-4 ${
                isV2 ? "md:grid-cols-3 lg:grid-cols-5" : "md:grid-cols-3"
              }`}
            >
              <InfoCard label="Archetype" value={primaryLoop.archetype} />

              <InfoCard label="Element" value={primaryLoop.element} />

              <InfoCard
                label="Protective Formation"
                value={formattedMechanism}
              />

              {isV2 && (
                <>
                  <InfoCard
                    label="Developmental Capacity"
                    value={structuralMetadata.developmentalCapacity}
                  />

                  <InfoCard
                    label="Injured Archetype"
                    value={structuralMetadata.injuredArchetype}
                  />
                </>
              )}
            </div>

            {isV2 && typeof reportData?.resultClarity === "number" && (
              <p className="al-muted mt-6 max-w-3xl text-sm">
                Result Clarity: {reportData.resultClarity}% — how clearly your
                Primary Loop separates from your Secondary Loop in this
                result. This describes pattern separation, not a statistical
                or clinical certainty.
              </p>
            )}
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
              label="Shadow Loop"
              value={primaryLoop.title}
              detail="The protective pattern currently shaping your reactions."
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

            <h2 className="al-heading-md">
              Your Shadow Loop is not your identity.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              It is a protective pattern your mind and nervous system developed
              in an attempt to keep you safe. Protective patterns can be
              understood. What can be understood can be interrupted. What can be
              interrupted can gradually be integrated.
            </p>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Structural Dynamic"
            title="How this loop forms."
            text="Your results point to this dynamic as currently active for you:"
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
                ) : structuralMetadata.participatingArchetypes ? (
                  <InfoCard
                    label="Participating Archetypes"
                    value={structuralMetadata.participatingArchetypes.join(" + ")}
                  />
                ) : null}
              </div>

              <div className="al-card p-8">
                <p className="al-text-lg">{structuralMetadata.structuralDynamic}</p>
              </div>

              <p className="al-muted text-sm">
                “Injured” does not mean damaged or permanently weak. It
                identifies the archetypal capacity currently being protected
                by the Shadow Loop.
              </p>
            </div>
          ) : (
            <div className="al-card p-8">
              <p className="al-text-lg">{detail.structuralDynamic}</p>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
                {formationEnergyLabel(formattedMechanism)}
              </h3>
              <p className="al-text">{formula.collapsedEnergy}</p>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Protective Adaptation
              </h3>
              <p className="al-text">{formula.protectiveAdaptation}</p>
            </div>

            <div className="al-premium-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-[var(--al-accent)]">
                Integration Shift
              </h3>
              <p className="al-text">{formula.integrationShift}</p>
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

      <section className="al-section">
        <div className="al-container-wide grid gap-8 lg:grid-cols-3">
          <div className="al-premium-card p-10 lg:col-span-2">
            <p className="al-kicker">Primary Loop</p>

            <h2 className="al-heading-lg">{primaryLoop.title}</h2>

            <p className="al-text-lg mt-6">{primaryLoop.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <InfoCard label="Archetype" value={primaryLoop.archetype} />
              <InfoCard label="Element" value={primaryLoop.element} />
              <InfoCard label="Protective Formation" value={formattedMechanism} />
            </div>
          </div>

          <div className="al-card p-8">
            <p className="al-kicker">Secondary Activation</p>

            <h3 className="mt-5 text-3xl font-bold">
              {secondaryLoop.title}
            </h3>

            <p className="al-text mt-5">{secondaryLoop.description}</p>

            <p className="al-text mt-5 text-sm">
              When your Primary and Secondary Loops interact, this is rarely
              two separate patterns taking turns. {primaryLoop.title} tends
              to lead, with {secondaryLoop.title} activating alongside it —
              together forming one combined protective response.
            </p>
          </div>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-container">
          <SectionHeader
            kicker="Why This Loop Appeared"
            title="Why this became your primary Shadow Loop"
          />

          <div className="al-card p-10">
            <p className="al-text-lg">
              <span className="font-semibold text-[var(--al-text)]">
                Primary Loop Formation:
              </span>{" "}
              {formattedMechanism}
            </p>

            <p className="al-text-lg mt-8">
              Your strongest assessment pattern emerged as{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {primaryLoop.title}
              </span>
              . This does not mean this loop is your identity. It means this
              protective pattern is currently the most visible expression of how
              your system adapts under pressure.
            </p>
          </div>
        </div>
      </section>

      {loopLandscape.length > 0 && (
        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Loop Landscape"
              title="Your dominant loop ecosystem."
              text="These are the strongest shadow loop activations detected in your current assessment. Your primary loop is the strongest pattern, while the others may activate under different forms of stress, pressure, vulnerability, conflict, visibility, or relational activation."
            />

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
                  className={`flex flex-col gap-6 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between md:p-8 ${
                    index === 0 ? "al-premium-card" : "al-card"
                  }`}
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
                          ? "Primary Pattern"
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
                        {item.score}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
                      <div
                        className="h-full rounded-full bg-[var(--al-accent)]"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="al-card mx-auto mt-12 max-w-4xl p-8">
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
          </div>
        </section>
      )}
            <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Core Structure"
            title="The architecture beneath the pattern."
            text="Your results suggest this pattern is currently organised around:"
          />

          <div className="grid gap-5 md:grid-cols-3">
            <div className="al-card p-6">
              <p className="al-kicker">What This Protects Against</p>
              <p className="al-text-lg mt-4">
                {String(detail.coreStructure.coreFear)}
              </p>
            </div>

            <div className="al-card p-6">
              <p className="al-kicker">Core Dynamic</p>
              <p className="al-text-lg mt-4">
                {String(detail.coreStructure.coreDynamic)}
              </p>
            </div>

            <div className="al-card p-6">
              <p className="al-kicker">Psychological Mechanism</p>
              <p className="al-text-lg mt-4">
                {String(detail.coreStructure.psychologicalMechanism)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {archetypeScores.length > 0 && (
        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Archetypal Availability"
              title="Your archetypal availability at a glance."
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
              {archetypeScores.map((item: any) => (
                <div key={item.archetype} className="al-card p-8">
                  <div className="mb-8 flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-3xl font-bold">{item.archetype}</h3>
                      <p className="al-muted mt-1">{item.element}</p>
                    </div>

                    <p className="text-right text-2xl font-bold text-[var(--al-accent)]">
                      Healthy Availability:{" "}
                      {isV2
                        ? item.healthyAvailability ?? item.healthyPercent ?? 0
                        : item.integratedPercent}
                      %
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
              ))}
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
                <div key={archetypeName} className="al-card p-6">
                  <p className="al-kicker mb-4">{archetypeName}</p>

                  <div className="space-y-4">
                    {capacityScores
                      .filter((c: any) => c.archetype === archetypeName)
                      .map((c: any) => (
                        <div key={c.developmentalCapacity}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="al-text">{c.developmentalCapacity}</span>
                            <span className="al-muted text-xs">
                              H {c.healthyAvailabilityScore}% · S {c.shadowActivationScore}%
                            </span>
                          </div>

                          <div className="flex gap-1">
                            <div className="al-progress-track h-2 flex-1">
                              <div
                                className="al-progress-fill h-full"
                                style={{ width: `${c.healthyAvailabilityScore}%` }}
                              />
                            </div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
                              <div
                                className="h-full rounded-full bg-[var(--al-secondary)]"
                                style={{ width: `${c.shadowActivationScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="al-muted mt-6 text-center text-sm">
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
              <div className="al-card p-8">
                <p className="al-kicker">Collapse</p>
                <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                  {reportData.formationScores.collapse}%
                </p>
                <p className="al-text mt-4 text-sm">What becomes unavailable.</p>
              </div>

              <div className="al-card p-8">
                <p className="al-kicker">Compensate</p>
                <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                  {reportData.formationScores.compensate}%
                </p>
                <p className="al-text mt-4 text-sm">
                  What becomes protectively substituted or performative.
                </p>
              </div>

              <div className="al-card p-8">
                <p className="al-kicker">Collide</p>
                <p className="mt-3 text-3xl font-bold text-[var(--al-accent)]">
                  {reportData.formationScores.collide}%
                </p>
                <p className="al-text mt-4 text-sm">
                  What becomes caught in internal conflict.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isV2 && (
        <section className="al-section">
          <div className="al-container-wide">
            <SectionHeader
              kicker="Developmental Direction"
              title="Where this points next."
            />

            <div className="al-premium-card p-10 text-center">
              <p className="al-kicker">Integration Direction</p>
              <h3 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                {archeLoopPath.journey}
              </h3>
              <p className="al-text-lg mx-auto mt-4 max-w-2xl">
                The fixed developmental pathway associated with{" "}
                {primaryLoop.title}, leading toward {archeLoopPath.integratedSelf}.
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {reportData?.growthEdge && (
                <div className="al-card p-8">
                  <p className="al-kicker">Growth Edge</p>
                  <h4 className="mt-3 text-2xl font-bold">
                    {reportData.growthEdge.developmentalCapacity}
                  </h4>
                  <p className="al-text mt-3 text-sm">
                    The Developmental Capacity with the lowest Healthy
                    Availability in this result ({reportData.growthEdge.healthyAvailabilityScore}%),
                    within {reportData.growthEdge.archetype}.
                  </p>
                </div>
              )}

              {reportData?.mostAvailableArchetype && (
                <div className="al-card p-8">
                  <p className="al-kicker">Most Available Archetype</p>
                  <h4 className="mt-3 text-2xl font-bold">
                    {reportData.mostAvailableArchetype.archetype}
                  </h4>
                  <p className="al-text mt-3 text-sm">
                    The Archetype with the highest Healthy Availability in
                    this result ({reportData.mostAvailableArchetype.healthyAvailability}%).
                  </p>
                </div>
              )}
            </div>

            {reportData?.growthEdgeArchetype && (
              <div className="al-soft-card mx-auto mt-6 max-w-xl p-5 text-center">
                <p className="al-kicker">Broader Archetypal Growth Area</p>
                <p className="al-text mt-2 text-sm">
                  Across all three of its capacities,{" "}
                  <span className="font-semibold text-[var(--al-text)]">
                    {reportData.growthEdgeArchetype.archetype}
                  </span>{" "}
                  currently shows the lowest average Healthy Availability.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="al-section">
        <div className="al-container-wide">
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
        </div>
      </section>

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

      <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Deeper Pattern Map"
            title="What this pattern reveals."
            text="In relationships, this may become visible in the following ways:"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Relationship Pattern
              </h3>

              <p className="al-text">{primaryLoop.relationshipPattern}</p>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Communication Style
              </h3>

              <p className="al-text">{primaryLoop.communicationStyle}</p>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Escalation Pattern
              </h3>

              <p className="al-text">{primaryLoop.escalationPattern}</p>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Identity Protection
              </h3>

              <p className="al-text">{primaryLoop.identityProtection}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide grid gap-8 lg:grid-cols-2">
          <div className="al-card p-8">
            <p className="al-kicker">Nervous System</p>

            <h2 className="mt-5 text-3xl font-bold">
              How your nervous system responds under pressure.
            </h2>

            <p className="al-text mt-6">{detail.nervousSystemDetails}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {detail.nervousSystemSigns.map((sign) => (
                <span key={sign} className="al-soft-card px-4 py-2 text-sm">
                  {sign}
                </span>
              ))}
            </div>

            <div className="al-premium-card mt-8 p-6">
              <p className="font-semibold text-[var(--al-accent)]">
                Protection Mechanism
              </p>

              <p className="al-text mt-3">{primaryLoop.protection}</p>
            </div>
          </div>

          <div className="al-card p-8">
            <p className="al-kicker">Relational Activators</p>

            <h2 className="mt-5 text-3xl font-bold">
              What tends to activate this pattern for you.
            </h2>

            <div className="mt-6 space-y-4">
              {detail.relationalActivators.map((item) => (
                <div key={item} className="al-soft-card p-4 al-text">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide grid gap-8 lg:grid-cols-2">
          <div className="al-card p-8">
            <p className="al-kicker">Body Activation</p>

            <h2 className="mt-5 text-3xl font-bold">
              Where this pattern lives in the body.
            </h2>

            <p className="al-text mt-6">{bodyMapText}</p>
          </div>

          <div className="al-card p-8">
            <p className="al-kicker">Loop Interaction</p>

            <h2 className="mt-5 text-3xl font-bold">
              How this pattern tends to escalate.
            </h2>

            {cascadeSteps.length > 0 ? (
              <>
                <p className="al-text mt-6 text-sm">
                  When {primaryLoop.title} intensifies, your results suggest
                  the pattern tends to move through a sequence like this:
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
              <p className="al-text mt-6">
                When {primaryLoop.title} combines with {secondaryLoop.title},
                the two patterns tend to reinforce each other under pressure
                rather than activating separately.
              </p>
            )}
          </div>
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
              Your results point to a core protective belief currently
              shaping {primaryLoop.title.toLowerCase()}:
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
            kicker="Integration Blueprint"
            title="The direction of growth."
            text="Your Integration Direction is not about becoming a different person — it is about strengthening what is already available to you."
          />

          <div className="al-premium-card p-10">
            <p className="al-text-lg">{integrationBlueprintText}</p>

            <p className="al-text-lg mt-6">
              For you, that direction moves from{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {primaryLoop.title}
              </span>{" "}
              toward{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {archeLoopPath.integratedSelf}
              </span>{" "}
              via your {archeLoopPath.journey}.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <InfoCard
                label="Current Loop"
                value={primaryLoop.title}
              />

              <InfoCard
                label="Integration Journey"
                value={archeLoopPath.journey}
              />

              <InfoCard
                label="Integrated Self"
                value={archeLoopPath.integratedSelf}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section">
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

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PathCard
                label="Current Pattern"
                value={primaryLoop.title}
                detail="The protective adaptation."
              />

              <PathCard
                label="Integration Journey"
                value={archeLoopPath.journey}
                detail="The developmental pathway."
              />

              <PathCard
                label="Integrated Self"
                value={archeLoopPath.integratedSelf}
                detail="The healthier way of responding."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container">
          <div className="al-premium-card p-10 text-center">
            <p className="al-kicker">
              Continue Your Journey
            </p>

            <h2 className="al-heading-lg">
              Understanding is the beginning.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Your report shows where your system currently protects you.
              Integration happens through repeated awareness, recognising
              activations in real time, and practising new responses until they
              become familiar.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/integration"
                className="al-button-primary"
              >
                Continue With Integration
              </a>

              <a
                href="/triggered"
                className="al-button-secondary"
              >
                I Am Triggered
              </a>

              <a
                href="/progress-dashboard"
                className="al-button-secondary"
              >
                Progress Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-container">
          <ReportFeedback />
        </div>
      </section>
    </PageShell>
  );
}