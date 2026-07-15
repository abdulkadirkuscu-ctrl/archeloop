"use client";

// ArcheLoop Wheel — Report v2's replacement for the old point-radar
// "Archetypal Compass". A radar/spider chart plots one blended number per
// archetype, which cannot show Healthy Availability and Shadow Activation as
// the two distinct, non-netted measurements the Framework requires (see
// docs/ASSESSMENT_SCORING_SPECIFICATION.md Section 5: "Healthy Availability
// and Shadow Activation are never netted against each other"). This wheel
// plots both explicitly, per archetype, as two concentric wedges.
//
// Pure SVG + CSS, no charting dependency. Static paths only (no animation),
// so it prints cleanly. A visible text table beneath the wheel repeats every
// number for accessibility and for print/no-JS fallback.

export type WheelArchetypeScore = {
  archetype: string;
  element: string;
  healthyAvailability: number;
  shadowActivation: number;
};

const SECTOR_ORDER: { archetype: string; centerAngleDeg: number; colorVar: string }[] = [
  { archetype: "Magician", centerAngleDeg: -90, colorVar: "var(--air)" },
  { archetype: "Sovereign", centerAngleDeg: 0, colorVar: "var(--fire)" },
  { archetype: "Lover", centerAngleDeg: 90, colorVar: "var(--water)" },
  { archetype: "Warrior", centerAngleDeg: 180, colorVar: "var(--earth)" },
];

const SECTOR_HALF_WIDTH_DEG = 36;
const CENTER = 200;
const MIN_RADIUS = 46;
const MAX_RADIUS = 168;
const SHADOW_MAX_RADIUS = 118;

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function wedgePath(centerAngleDeg: number, radius: number) {
  const start = polarToCartesian(centerAngleDeg - SECTOR_HALF_WIDTH_DEG, radius);
  const end = polarToCartesian(centerAngleDeg + SECTOR_HALF_WIDTH_DEG, radius);
  const largeArcFlag = SECTOR_HALF_WIDTH_DEG * 2 > 180 ? 1 : 0;

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function scaledRadius(percent: number, maxRadius: number) {
  const clamped = Math.max(0, Math.min(100, percent));
  return MIN_RADIUS + (clamped / 100) * (maxRadius - MIN_RADIUS);
}

export default function ArcheLoopWheel({ scores }: { scores: WheelArchetypeScore[] }) {
  const bySector = SECTOR_ORDER.map((sector) => {
    const score = scores.find((s) => s.archetype === sector.archetype);
    return {
      ...sector,
      healthyAvailability: score?.healthyAvailability ?? 0,
      shadowActivation: score?.shadowActivation ?? 0,
      element: score?.element ?? "",
    };
  });

  return (
    <div className="al-premium-card p-8">
      <p className="al-kicker text-center">ArcheLoop Wheel</p>

      <h3 className="mt-4 text-center text-3xl font-bold">
        Healthy Availability and Shadow Activation, by Archetype
      </h3>

      <p className="al-text mx-auto mt-4 max-w-3xl text-center">
        Each sector shows two separate measurements for that Archetype: the
        outer, softer wedge is Healthy Availability, and the inner, stronger
        wedge is Shadow Activation. A person can have high availability and
        high activation at the same time — these are not opposites.
      </p>

      <div className="mt-10 flex justify-center">
        <svg
          viewBox="0 0 400 400"
          role="img"
          aria-label="ArcheLoop Wheel showing Healthy Availability and Shadow Activation for Sovereign, Magician, Lover, and Warrior"
          className="h-[26rem] w-[26rem] max-w-full"
        >
          {[MIN_RADIUS, (MIN_RADIUS + MAX_RADIUS) / 2, MAX_RADIUS].map((radius) => (
            <circle
              key={radius}
              cx={CENTER}
              cy={CENTER}
              r={radius}
              fill="none"
              stroke="rgba(245,243,238,0.10)"
              strokeWidth="1"
            />
          ))}

          {bySector.map((sector) => (
            <path
              key={`${sector.archetype}-healthy`}
              d={wedgePath(sector.centerAngleDeg, scaledRadius(sector.healthyAvailability, MAX_RADIUS))}
              fill={sector.colorVar}
              fillOpacity="0.22"
              stroke={sector.colorVar}
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          ))}

          {bySector.map((sector) => (
            <path
              key={`${sector.archetype}-shadow`}
              d={wedgePath(sector.centerAngleDeg, scaledRadius(sector.shadowActivation, SHADOW_MAX_RADIUS))}
              fill={sector.colorVar}
              fillOpacity="0.65"
            />
          ))}

          <circle cx={CENTER} cy={CENTER} r={MIN_RADIUS - 8} fill="var(--al-surface)" stroke="var(--al-border-strong)" />
          <text
            x={CENTER}
            y={CENTER - 4}
            textAnchor="middle"
            fill="var(--al-text)"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.04em"
          >
            ArcheLoop
          </text>
          <text
            x={CENTER}
            y={CENTER + 12}
            textAnchor="middle"
            fill="var(--al-text-muted)"
            fontSize="9"
            letterSpacing="0.06em"
          >
            Integrated Self
          </text>

          {bySector.map((sector) => {
            const labelPoint = polarToCartesian(sector.centerAngleDeg, MAX_RADIUS + 26);
            return (
              <text
                key={`${sector.archetype}-label`}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                fill="var(--al-text)"
                fontSize="13"
                fontWeight="700"
              >
                {sector.archetype}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bySector.map((sector) => (
          <div key={sector.archetype} className="al-soft-card p-4">
            <p className="al-kicker" style={{ color: sector.colorVar }}>
              {sector.archetype} · {sector.element}
            </p>

            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <dt className="al-muted">Healthy Availability</dt>
                <dd className="font-semibold text-[var(--al-text)]">
                  {sector.healthyAvailability}%
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="al-muted">Shadow Activation</dt>
                <dd className="font-semibold text-[var(--al-text)]">
                  {sector.shadowActivation}%
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
