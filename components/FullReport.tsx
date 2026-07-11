import { loopFormulas } from "../app/data/loopFormulas";
import { archetypeInsights } from "../app/data/archetypeInsights";
import { loopDetails } from "../app/data/loopDetails";
import PageShell from "../app/components/PageShell";
import { loops } from "../app/data/loops";
import { elementInsights } from "../app/data/elementInsights";
import ReportFeedback from "./ReportFeedback";

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

  const primaryLoop = loops[selectedLoopName as keyof typeof loops];
  const detail = loopDetails[selectedLoopName as keyof typeof loopDetails];
  const formula = loopFormulas[selectedLoopName as keyof typeof loopFormulas];

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

  const archeLoopPath = loopPathMap[selectedLoopName] || {
    journey: primaryLoop.integrationKey || "Integration Journey",
    integratedSelf: primaryLoop.integrationKey || "Integrated Self",
  };

  const formattedMechanism = formatMechanism(primaryLoop.mechanism);

  const secondaryLoopName = detail.relatedDynamics?.[0] || "Fortress";
  const secondaryLoop = loops[secondaryLoopName as keyof typeof loops];

  const bodyMapText =
    "bodyMapInterpretation" in detail &&
    typeof detail.bodyMapInterpretation === "string"
      ? detail.bodyMapInterpretation
      : `${primaryLoop.body} may become a key area of activation when this loop is under pressure. The body may hold tension, shutdown, urgency, or protective contraction depending on the loop pattern.`;

  const secondaryInteractionText =
    "secondaryInteraction" in detail &&
    typeof detail.secondaryInteraction === "string"
      ? detail.secondaryInteraction
      : `When ${primaryLoop.title} combines with ${secondaryLoop.title}, the system may move between the primary protective pattern and a secondary response that reinforces the loop under pressure.`;

  const integrationBlueprintText =
    "integrationBlueprint" in detail &&
    typeof detail.integrationBlueprint === "string"
      ? detail.integrationBlueprint
      : `${detail.coreStructure.integrationShift} This process usually begins through small, repeatable moments of awareness, regulation, and behaviour change rather than forcing the system to transform all at once.`;

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
              This report maps the deeper structure beneath your{" "}
              {primaryLoop.title}, including emotional reactions, protective
              responses, relational activators, nervous system patterns, and
              integration pathway.
            </p>

            <div className="mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
              <InfoCard label="Archetype" value={primaryLoop.archetype} />

              <InfoCard label="Element" value={primaryLoop.element} />

              <InfoCard
                label="Response Style"
                value={
                  primaryLoop.mechanism === "Suppression"
                    ? "Collapsed"
                    : primaryLoop.mechanism === "Compensation"
                    ? "Compensated"
                    : primaryLoop.mechanism
                }
              />
            </div>
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
          />

          <div className="al-card p-8">
            <p className="al-text-lg">{detail.structuralDynamic}</p>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Loop Formula"
            title="How this pattern protects you."
          />

          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">Healthy Expression</h3>
              <p className="al-text">{formula.healthyExpression}</p>
            </div>

            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">Collapsed Energy</h3>
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
              <InfoCard
                label="Response Style"
                value={
                  primaryLoop.mechanism === "Suppression"
                    ? "Collapsed"
                    : primaryLoop.mechanism === "Compensation"
                    ? "Compensated"
                    : primaryLoop.mechanism
                }
              />
            </div>
          </div>

          <div className="al-card p-8">
            <p className="al-kicker">Secondary Activation</p>

            <h3 className="mt-5 text-3xl font-bold">
              {secondaryLoop.title}
            </h3>

            <p className="al-text mt-5">{secondaryLoop.description}</p>
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

            <p className="al-text-lg mt-10">
              <span className="font-semibold text-[var(--al-text)]">
                Archetype Family:
              </span>{" "}
              {primaryLoop.archetype}
            </p>

            <p className="al-text-lg mt-8">
              This loop belongs to the{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {primaryLoop.archetype}
              </span>{" "}
              archetype family and the{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {primaryLoop.element}
              </span>{" "}
              element. The report is not saying this archetype is weak. It is
              showing how this archetypal energy is currently forming a shadow
              pattern through{" "}
              <span className="font-semibold text-[var(--al-text)]">
                {primaryLoop.mechanism === "Suppression"
                  ? "collapse"
                  : primaryLoop.mechanism === "Compensation"
                  ? "compensation"
                  : "collision"}
              </span>
              .
            </p>

            <p className="al-text-lg mt-10">
              <span className="font-semibold text-[var(--al-text)]">
                Integration Direction:
              </span>{" "}
              {archeLoopPath.journey} → {archeLoopPath.integratedSelf}
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
                          : "Supporting Pattern"}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold md:text-3xl">
                        {item.loop}
                      </h3>
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
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(detail.coreStructure).map(([label, value]) => (
              <div key={label} className="al-card p-6">
                <p className="al-kicker">
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

                <p className="al-text-lg mt-4">{String(value)}</p>
              </div>
            ))}
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
              <ArchetypeCompass scores={archetypeScores} />
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
                      Healthy Availability: {item.integratedPercent}%
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

      <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Archetype Integration"
            title={`How ${primaryLoop.archetype} energy may be organising this pattern.`}
          />

          <div className="grid gap-6 md:grid-cols-3">
            <div className="al-card p-8">
              <h3 className="mb-4 text-2xl font-bold">Low Integration</h3>

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
            title={`How ${primaryLoop.element} may be moving through this pattern.`}
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
            title="What this loop may reveal."
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
              How your system may protect itself.
            </h2>

            <p className="al-text mt-6">{primaryLoop.nervousSystem}</p>

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
              What may activate the loop.
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
            <p className="al-kicker">Body Map Interpretation</p>

            <h2 className="mt-5 text-3xl font-bold">
              Where the loop may live in the body.
            </h2>

            <p className="al-text mt-6">{bodyMapText}</p>
          </div>

          <div className="al-card p-8">
            <p className="al-kicker">Secondary Loop Interaction</p>

            <h2 className="mt-5 text-3xl font-bold">
              How protective patterns reinforce each other.
            </h2>

            <p className="al-text mt-6">{secondaryInteractionText}</p>
          </div>
        </div>
      </section>
            <section className="al-section">
        <div className="al-container-wide">
          <SectionHeader
            kicker="Integration Blueprint"
            title="The direction of growth."
          />

          <div className="al-premium-card p-10">
            <p className="al-text-lg">{integrationBlueprintText}</p>

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