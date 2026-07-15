"use client";

import { buildWheelInterpretation, getWheelLeaders, ARCHETYPE_ACCENT } from "../app/data/reportInterpretations";
import { WHEEL_GEOMETRY, polarToCartesian } from "../app/data/wheelGeometry";

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
// number for accessibility and for print/no-JS fallback, and a one-sentence,
// deterministic interpretation (built from the actual score leaders, never a
// speculative reading of a minor difference) is rendered underneath so the
// chart explains itself without requiring the reader to compare four sectors
// by eye.
//
// Mobile label fix: on-wheel labels show the short Element name (Fire/Air/
// Water/Earth) rather than the full Archetype name. Full Archetype names
// remain prominent in the legend/summary grid directly below the SVG. This
// is necessary because a textAnchor="middle" label sits with its centre at
// the sector's outer edge - for the longest Archetype names ("Sovereign",
// "Warrior") the rendered text overflows the viewBox at any screen size
// (the overflow is proportional to the viewBox, not the rendered pixel
// size, so it clips identically on mobile and desktop; mobile only makes it
// look worse because the whole chart is smaller). Element names are short
// enough, combined with the widened viewBox and reduced label radius below,
// to never overflow. WHEEL_GEOMETRY is exported so this claim is verified
// by a deterministic test (app/data/reportSynthesis.test.ts) rather than
// asserted only by inspection.

export type WheelArchetypeScore = {
  archetype: string;
  element: string;
  healthyAvailability: number;
  shadowActivation: number;
};

const CENTER = WHEEL_GEOMETRY.center;
const MAX_RADIUS = WHEEL_GEOMETRY.maxRadius;
const MIN_RADIUS = 46;
const SHADOW_MAX_RADIUS = 118;
const SECTOR_HALF_WIDTH_DEG = 36;

const SECTOR_ORDER: { archetype: string; centerAngleDeg: number; colorVar: string }[] = [
  { archetype: "Magician", centerAngleDeg: WHEEL_GEOMETRY.sectorAngles[0], colorVar: ARCHETYPE_ACCENT.Magician },
  { archetype: "Sovereign", centerAngleDeg: WHEEL_GEOMETRY.sectorAngles[1], colorVar: ARCHETYPE_ACCENT.Sovereign },
  { archetype: "Lover", centerAngleDeg: WHEEL_GEOMETRY.sectorAngles[2], colorVar: ARCHETYPE_ACCENT.Lover },
  { archetype: "Warrior", centerAngleDeg: WHEEL_GEOMETRY.sectorAngles[3], colorVar: ARCHETYPE_ACCENT.Warrior },
];

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

  const interpretation = buildWheelInterpretation(scores);
  const leaders = getWheelLeaders(scores);

  return (
    <div className="al-feature-card">
      <p className="al-kicker text-center">ArcheLoop Wheel</p>

      <h3 className="mt-4 text-center text-3xl font-bold">
        Healthy Availability and Shadow Activation, by Archetype
      </h3>

      <p className="al-text mx-auto mt-4 max-w-3xl text-center">
        Each sector shows two separate measurements for that Archetype: the
        outer, softer wedge is Healthy Availability, and the inner, stronger
        wedge is Shadow Activation. A person can have high availability and
        high activation at the same time — these are not opposites. Full
        Archetype names are shown in the legend below; the wheel itself
        labels each sector by Element (Fire, Air, Water, Earth) to stay
        readable on narrow screens.
      </p>

      <div className="mt-10 flex justify-center">
        <svg
          viewBox={`${WHEEL_GEOMETRY.viewBox.minX} ${WHEEL_GEOMETRY.viewBox.minY} ${WHEEL_GEOMETRY.viewBox.width} ${WHEEL_GEOMETRY.viewBox.height}`}
          role="img"
          aria-label="ArcheLoop Wheel showing Healthy Availability and Shadow Activation for Sovereign, Magician, Lover, and Warrior"
          className="h-[15rem] w-[15rem] max-w-full sm:h-[19rem] sm:w-[19rem] lg:h-[26rem] lg:w-[26rem]"
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
              aria-hidden="true"
            />
          ))}

          {bySector.map((sector) => {
            const isMostAvailable = leaders.mostAvailable.includes(sector.archetype);
            return (
              <path
                key={`${sector.archetype}-healthy`}
                d={wedgePath(sector.centerAngleDeg, scaledRadius(sector.healthyAvailability, MAX_RADIUS))}
                fill={sector.colorVar}
                fillOpacity={isMostAvailable ? "0.34" : "0.22"}
                stroke={sector.colorVar}
                strokeOpacity={isMostAvailable ? "0.85" : "0.55"}
                strokeWidth={isMostAvailable ? "2.5" : "1.5"}
                aria-hidden="true"
              />
            );
          })}

          {bySector.map((sector) => {
            const isMostProtected = leaders.mostProtected.includes(sector.archetype);
            return (
              <path
                key={`${sector.archetype}-shadow`}
                d={wedgePath(sector.centerAngleDeg, scaledRadius(sector.shadowActivation, SHADOW_MAX_RADIUS))}
                fill={sector.colorVar}
                fillOpacity={isMostProtected ? "0.85" : "0.65"}
                aria-hidden="true"
              />
            );
          })}

          {/* Numeric values, always visible - never dependent on hover. Fixed
              annotation radii (independent of each wedge's own scaled size)
              keep every label readable even when a value is near 0%. */}
          {bySector.map((sector) => {
            const healthyLabelPoint = polarToCartesian(sector.centerAngleDeg, MAX_RADIUS - 20);
            return (
              <text
                key={`${sector.archetype}-healthy-value`}
                x={healthyLabelPoint.x}
                y={healthyLabelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--al-text)"
                stroke="var(--al-bg)"
                strokeWidth="3"
                paintOrder="stroke"
                fontSize="12"
                fontWeight="800"
              >
                {sector.healthyAvailability}%
              </text>
            );
          })}

          {bySector.map((sector) => {
            const shadowLabelPoint = polarToCartesian(
              sector.centerAngleDeg,
              (MIN_RADIUS + SHADOW_MAX_RADIUS) / 2
            );
            return (
              <text
                key={`${sector.archetype}-shadow-value`}
                x={shadowLabelPoint.x}
                y={shadowLabelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--al-text)"
                stroke="var(--al-bg)"
                strokeWidth="3"
                paintOrder="stroke"
                fontSize="11"
                fontWeight="800"
              >
                {sector.shadowActivation}%
              </text>
            );
          })}

          <circle
            cx={CENTER}
            cy={CENTER}
            r={MIN_RADIUS - 6}
            fill="var(--al-surface)"
            stroke="var(--al-border-strong)"
            strokeWidth="1.5"
            aria-hidden="true"
          />
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

          {/* On-wheel label shows the short Element name only - see the
              file-header comment for why the full Archetype name (e.g.
              "Sovereign", "Warrior") cannot be used here without clipping.
              The colour-matched legend and summary grid below carry the
              full Archetype name. */}
          {bySector.map((sector) => {
            const labelPoint = polarToCartesian(sector.centerAngleDeg, WHEEL_GEOMETRY.labelRadius);
            return (
              <text
                key={`${sector.archetype}-label`}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                fill="var(--al-text)"
                fontSize="14"
                fontWeight="750"
              >
                {sector.element}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <span className="flex items-center gap-2 al-muted">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-full border border-[var(--al-border-strong)]"
            style={{ background: "var(--al-text-muted)", opacity: 0.35 }}
          />
          Outer wedge — Healthy Availability
        </span>
        <span className="flex items-center gap-2 al-muted">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 rounded-full"
            style={{ background: "var(--al-text-muted)", opacity: 0.75 }}
          />
          Inner wedge — Shadow Activation
        </span>
      </div>

      {interpretation && (
        <p className="al-text-lg mx-auto mt-6 max-w-3xl text-center">
          {interpretation}
        </p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bySector.map((sector) => (
          <div key={sector.archetype} className="al-soft-card p-5">
            <p className="al-kicker" style={{ color: sector.colorVar }}>
              {sector.archetype} · {sector.element}
            </p>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="al-muted">Healthy Availability</dt>
                <dd className="font-semibold text-[var(--al-text)]">
                  {sector.healthyAvailability}%
                </dd>
              </div>

              <div className="flex items-center justify-between gap-3">
                <dt className="al-muted">Shadow Activation</dt>
                <dd className="font-semibold text-[var(--al-text)]">
                  {sector.shadowActivation}%
                </dd>
              </div>
            </dl>

            {(leaders.mostAvailable.includes(sector.archetype) ||
              leaders.mostProtected.includes(sector.archetype)) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {leaders.mostAvailable.includes(sector.archetype) && (
                  <span className="al-badge text-xs">Most Available</span>
                )}
                {leaders.mostProtected.includes(sector.archetype) && (
                  <span className="al-badge text-xs">Most Protected</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
