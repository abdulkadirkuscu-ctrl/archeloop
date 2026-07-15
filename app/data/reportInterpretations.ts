// ArcheLoop Report v2 — deterministic interpretation-sentence builders.
//
// This file adds no new psychological theory. Every function here is a pure,
// deterministic template applied uniformly across all twelve loops/four
// Archetypes, reading only fields that already exist on AssessmentResult
// (see docs/ASSESSMENT_SCORING_SPECIFICATION.md) or on the canonical loop
// data (app/data/loopFormulas.ts, app/data/loopStructuralMetadata.ts). None
// of these functions recompute a score, re-rank loops/archetypes, or invent
// a net/combined number - they only describe values that already exist,
// side by side, in careful ("may", "currently", "can appear") language.

// --- Hero interpretation ----------------------------------------------------------
//
// One personalised sentence for the Chapter One hero, built the same way for
// every loop: take the loop's own canonical observable behaviours (already
// authored per loop in loopFormulas.ts - not written here) and drop them
// into one shared sentence shape. This is deliberately NOT a lookup keyed by
// loop name (that would be "hard-coding Fortress copy") - it is one template
// applied to whichever loop the person's result actually surfaces.
export function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function buildHeroInterpretation(
  developmentalCapacity: string,
  archetype: string,
  observableBehaviours: readonly string[]
): string {
  const descriptors = joinWithAnd(
    observableBehaviours.slice(0, 3).map((behaviour) => behaviour.toLowerCase())
  );

  if (!descriptors) {
    return `Your system currently protects ${developmentalCapacity} through a pattern associated with ${archetype}.`;
  }

  return `Your system currently protects ${developmentalCapacity} through ${descriptors}.`;
}

// --- Activation descriptor bands (Loop Landscape) ---------------------------------
//
// Presentation labels only. These bands describe an already-computed
// shadowActivationScore/score in plain language; they never change the
// score, the ranking, Result Clarity, or any other report logic.
//
//   0-24   Low activation
//   25-49  Emerging activation
//   50-74  Moderate activation
//   75-89  High activation
//   90-100 Very high activation
export type ActivationDescriptor =
  | "Low activation"
  | "Emerging activation"
  | "Moderate activation"
  | "High activation"
  | "Very high activation";

export function getActivationDescriptor(percent: number): ActivationDescriptor {
  if (percent >= 90) return "Very high activation";
  if (percent >= 75) return "High activation";
  if (percent >= 50) return "Moderate activation";
  if (percent >= 25) return "Emerging activation";
  return "Low activation";
}

// --- Archetype accent colours ------------------------------------------------------
//
// Restrained accent mapping onto the existing Fire/Air/Water/Earth tokens
// already defined in app/globals.css - no new colours introduced.
export const ARCHETYPE_ACCENT: Record<string, string> = {
  Sovereign: "var(--fire)",
  Magician: "var(--air)",
  Lover: "var(--water)",
  Warrior: "var(--earth)",
};

// --- ArcheLoop Wheel interpretation -------------------------------------------------

export type WheelInterpretationInput = {
  archetype: string;
  healthyAvailability: number;
  shadowActivation: number;
}[];

function topByKey<T>(items: T[], key: (item: T) => number): T[] {
  if (items.length === 0) return [];
  const max = Math.max(...items.map(key));
  return items.filter((item) => key(item) === max);
}

export function buildWheelInterpretation(scores: WheelInterpretationInput): string {
  if (scores.length === 0) return "";

  const topHealthy = topByKey(scores, (s) => s.healthyAvailability);
  const topShadow = topByKey(scores, (s) => s.shadowActivation);

  const topHealthyNames = joinWithAnd(topHealthy.map((s) => s.archetype));
  const topShadowNames = joinWithAnd(topShadow.map((s) => s.archetype));

  const sameArchetypeLeadsBoth =
    topHealthy.length === 1 &&
    topShadow.length === 1 &&
    topHealthy[0].archetype === topShadow[0].archetype;

  if (sameArchetypeLeadsBoth) {
    return `${topHealthyNames} currently shows both the strongest Healthy Availability and the highest Shadow Activation — availability and activation are independent, so both can be true at once.`;
  }

  return `${topHealthyNames} currently shows the strongest Healthy Availability, while ${topShadowNames} carries the highest Shadow Activation.`;
}

// --- Twelve-Capacity Profile interpretation -----------------------------------------

export type CapacityInterpretationInput = {
  developmentalCapacity: string;
  healthyAvailabilityScore: number;
  shadowActivationScore: number;
}[];

export function buildTwelveCapacityInterpretation(
  capacities: CapacityInterpretationInput
): string {
  if (capacities.length === 0) return "";

  const mostProtected = topByKey(capacities, (c) => c.shadowActivationScore)[0];

  const rankedByHealthy = [...capacities].sort(
    (a, b) => b.healthyAvailabilityScore - a.healthyAvailabilityScore
  );
  const strongestTwo = rankedByHealthy
    .filter((c) => c.developmentalCapacity !== mostProtected.developmentalCapacity)
    .slice(0, 2);

  if (strongestTwo.length === 0) {
    return `${mostProtected.developmentalCapacity} is currently the most protected capacity in this result.`;
  }

  return `${mostProtected.developmentalCapacity} is currently the most protected capacity, while ${joinWithAnd(
    strongestTwo.map((c) => c.developmentalCapacity)
  )} remain strongly available.`;
}

// --- Formation Profile interpretation ------------------------------------------------

export type FormationInterpretationInput = {
  collapse: number;
  compensate: number;
  collide: number;
};

const FORMATION_CONTRAST: Record<keyof FormationInterpretationInput, string> = {
  collapse: "withdrawal is more prominent than protective substitution or internal conflict",
  compensate:
    "protective substitution is more prominent than withdrawal or internal conflict",
  collide: "internal conflict is more prominent than withdrawal or protective substitution",
};

const FORMATION_LABEL: Record<keyof FormationInterpretationInput, string> = {
  collapse: "Collapse",
  compensate: "Compensate",
  collide: "Collide",
};

export function buildFormationInterpretation(
  formationScores: FormationInterpretationInput
): string {
  const entries = Object.entries(formationScores) as [
    keyof FormationInterpretationInput,
    number
  ][];
  const [leadingKey] = entries.reduce((best, entry) => (entry[1] > best[1] ? entry : best));

  return `${FORMATION_LABEL[leadingKey]} is currently the most active Protective Formation, suggesting that ${FORMATION_CONTRAST[leadingKey]}.`;
}

// --- Loop Landscape interpretation ----------------------------------------------------

const CLOSE_ACTIVATION_GAP = 15;

export function buildLoopLandscapeInterpretation(
  loopLandscape: { loop: string; score: number }[]
): string {
  if (loopLandscape.length === 0) return "";
  if (loopLandscape.length === 1) {
    return `${loopLandscape[0].loop} leads the current pattern.`;
  }

  const [first, second] = loopLandscape;
  const gap = first.score - second.score;
  const relation = gap <= CLOSE_ACTIVATION_GAP ? "closely related supporting" : "supporting";

  return `${first.loop} leads the current pattern, with ${second.loop} operating as a ${relation} activation.`;
}

// --- Developmental Direction "why this matters" --------------------------------------
//
// Explicitly keeps three concepts distinct in one deterministic paragraph:
// Most Available Archetype, Growth Edge, and Integration Direction. Never
// implies Growth Edge caused the Primary Loop, and never merges Growth Edge
// with Integration Direction.
export function buildDevelopmentalDirectionSynthesis(params: {
  mostAvailableArchetype: string;
  growthEdgeCapacity: string;
  growthEdgeArchetype: string;
  integrationPath: string;
  integratedSelf: string;
}): string {
  const {
    mostAvailableArchetype,
    growthEdgeCapacity,
    growthEdgeArchetype,
    integrationPath,
    integratedSelf,
  } = params;

  return (
    `These describe three separate things, not one. ${mostAvailableArchetype} is currently where healthy expression is most available to you - this is not necessarily the Archetype your Primary Loop belongs to. ` +
    `${growthEdgeCapacity}, within ${growthEdgeArchetype}, is simply the capacity with the most room to grow right now - it did not cause your Primary Loop, and it is not the same as your Injured or Compensating Archetype. ` +
    `Your Integration Direction - the ${integrationPath} toward ${integratedSelf} - is fixed by your Primary Loop specifically, independent of the other two. ` +
    `Together they offer three different angles on the same developmental picture.`
  );
}
