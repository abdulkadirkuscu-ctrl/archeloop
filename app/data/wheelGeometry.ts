// ArcheLoop Wheel — pure geometry helpers.
//
// Deliberately kept out of components/ArcheLoopWheel.tsx (a "use client"
// JSX component) so this pure math can be imported directly by
// node --experimental-strip-types test scripts (app/data/reportSynthesis.test.ts),
// which strip TypeScript syntax but cannot parse JSX.
//
// Mobile label-clipping fix (see components/ArcheLoopWheel.tsx for the full
// explanation): on-wheel Archetype labels were clipping on every screen size
// because a textAnchor="middle" label centred at the sector's outer edge
// overflows a tight viewBox for long names ("Sovereign", "Warrior"). The fix
// combines a wider viewBox margin, a slightly reduced label radius, and
// (in the component) shorter Element-name labels. WHEEL_GEOMETRY bundles the
// numbers so a deterministic test can verify no label position - plus a
// conservative worst-case label half-width - ever falls outside the
// viewBox, for every sector angle actually used.

const CENTER = 200;
const MAX_RADIUS = 168;
const VIEWBOX_MARGIN = 20;
const LABEL_RADIUS = MAX_RADIUS + 22;

// The four sector centre angles used by the wheel: Magician (top),
// Sovereign (right), Lover (bottom), Warrior (left).
const SECTOR_ANGLES_DEG = [-90, 0, 90, 180];

export const WHEEL_GEOMETRY = {
  center: CENTER,
  maxRadius: MAX_RADIUS,
  viewBox: {
    minX: -VIEWBOX_MARGIN,
    minY: -VIEWBOX_MARGIN,
    width: 400 + VIEWBOX_MARGIN * 2,
    height: 400 + VIEWBOX_MARGIN * 2,
  },
  labelRadius: LABEL_RADIUS,
  sectorAngles: SECTOR_ANGLES_DEG,
};

export function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}
