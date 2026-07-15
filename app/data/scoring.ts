// ArcheLoop Assessment v2.0 scoring engine.
//
// Single authoritative scoring source. app/assessment/page.tsx is the only live
// caller of scoreAssessment(); components/FullReport.tsx never calls it - it only
// renders a previously-computed, previously-saved result (see
// docs/ASSESSMENT_V2_AUDIT.md Section 4 and docs/ASSESSMENT_SCORING_SPECIFICATION.md
// for the full backward-compatibility analysis behind this file's shape).
//
// Canonical hierarchy (Framework Architecture, Section 8):
//   Developmental Capacity -> Protective Formation -> Shadow Loop
//   -> Belief / Emotion / Behaviour evidence
//
// This file computes, in order: per-capacity scores (§3-4), per-loop Shadow
// Activation (§5), Formation scores (§6), Archetype scores (§7), Primary/Secondary
// Shadow Loop (§8-9), Most Available Archetype (§10), Growth Edge (§11), and
// Result Clarity (§12) - section numbers refer to the implementation task and to
// docs/ASSESSMENT_SCORING_SPECIFICATION.md, which documents every formula in prose.

// Imported with an explicit .ts extension (tsconfig: allowImportingTsExtensions)
// so this module - and app/data/scoring.test.ts, which imports it directly - can
// both be executed by `node --experimental-strip-types` without a bundler, as
// well as built normally by Next.js.
import {
  questions as questionBank,
  CANONICAL_CAPACITY_TABLE,
  CANONICAL_LOOP_ORDER,
  type Archetype,
  type Element,
  type ProtectiveFormation,
  type MeasurementLens,
  type DevelopmentalCapacity,
  type ShadowLoopName,
  type Question,
} from "./questions.ts";

export type { Archetype, Element };

// Backward-compatible alias - app/assessment/page.tsx imports `type ScoredQuestion`.
export type ScoredQuestion = Question;

// --- Legacy internal vocabulary --------------------------------------------------
// app/data/loops.ts (public loop-description content, explicitly out of scope for
// this task) still stores each loop's mechanism using the pre-v2 internal words
// below, and app/loops/[slug]/page.tsx imports RESPONSE_STYLE_LABELS to translate
// them to the public Collapse/Compensate/Collide vocabulary for display. Nothing
// in the v2 question bank or in the scoring engine below uses these words
// internally any more - `formation` on every Question, and on every score object
// in this file, is already one of the public "Collapse"/"Compensate"/"Collide"
// values directly, so this translation layer is only needed for that one legacy
// content file.
export type QuestionMechanism = "Healthy" | "Suppression" | "Compensation" | "Collision";
export type ResponseStyle = "Collapse" | "Compensate" | "Collide";

export const RESPONSE_STYLE_LABELS: Record<
  Exclude<QuestionMechanism, "Healthy">,
  ResponseStyle
> = {
  Suppression: "Collapse",
  Compensation: "Compensate",
  Collision: "Collide",
};

export const LOOP_TO_ARCHETYPE: Record<ShadowLoopName, Archetype> = Object.fromEntries(
  CANONICAL_CAPACITY_TABLE.map((row) => [row.shadowLoop, row.archetype])
) as Record<ShadowLoopName, Archetype>;

export const LOOP_TO_MECHANISM: Record<
  ShadowLoopName,
  Exclude<QuestionMechanism, "Healthy">
> = Object.fromEntries(
  CANONICAL_CAPACITY_TABLE.map((row) => [
    row.shadowLoop,
    row.formation === "Collapse"
      ? "Suppression"
      : row.formation === "Compensate"
      ? "Compensation"
      : "Collision",
  ])
) as Record<ShadowLoopName, Exclude<QuestionMechanism, "Healthy">>;

// Likert response (1-5) to a 0-100 scale. 3 (Neutral) maps to the midpoint; the
// scale is symmetric. Neither Healthy nor Shadow questions are reverse-scored:
// every Healthy Capacity/Healthy Expression question in the canonical v2 bank is
// phrased so agreement affirms health (e.g. "I allow myself to be seen..."), and
// every Protective Belief/Emotion/Behaviour question is phrased so agreement
// affirms Shadow activation (e.g. "I believe it is safer to stay unnoticed...") -
// verified against every one of the 60 canonical questions, not assumed.
export function likertToPercent(value: number): number {
  const scale: Record<number, number> = { 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 };
  return scale[value] ?? 0;
}

// --- Score shapes -----------------------------------------------------------------

export type CapacityScore = {
  developmentalCapacity: DevelopmentalCapacity;
  archetype: Archetype;
  element: Element;
  healthyCapacity: string;
  shadowLoop: ShadowLoopName;
  formation: Exclude<ProtectiveFormation, "Healthy">;
  healthyCapacityScore: number;
  healthyExpressionScore: number;
  healthyAvailabilityScore: number;
  protectiveBeliefScore: number;
  protectiveEmotionScore: number;
  protectiveBehaviourScore: number;
  shadowActivationScore: number;
  developmentalBalanceScore: number;
};

export type LoopScore = {
  loop: ShadowLoopName;
  archetype: Archetype;
  element: Element;
  developmentalCapacity: DevelopmentalCapacity;
  formation: Exclude<ProtectiveFormation, "Healthy">;
  protectiveBeliefScore: number;
  protectiveEmotionScore: number;
  protectiveBehaviourScore: number;
  shadowActivationScore: number;
  // legacy fields (components/FullReport.tsx and app/loops/[slug]/page.tsx read
  // `.loop` and `.score`; scoring.test.ts historically read `.score`/`.loop` too)
  responseStyle: ResponseStyle;
  score: number; // === shadowActivationScore
};

export type FormationScores = {
  collapse: number;
  compensate: number;
  collide: number;
};

export type ArchetypeScore = {
  archetype: Archetype;
  element: Element;
  capacities: CapacityScore[];
  healthyAvailability: number;
  shadowActivation: number;
  formationProfile: { healthy: number; collapse: number; compensate: number; collide: number };
  // legacy fields (components/FullReport.tsx destructures all six of these per
  // archetype) - derived from the fields above, never computed independently.
  healthyPercent: number;
  shadowPercent: number;
  suppressionPercent: number;
  compensationPercent: number;
  collisionPercent: number;
  integratedPercent: number;
};

export type MostAvailableArchetypeResult = {
  archetype: Archetype;
  element: Element;
  healthyAvailability: number;
  capacities: {
    developmentalCapacity: DevelopmentalCapacity;
    healthyAvailabilityScore: number;
  }[];
};

export type GrowthEdgeResult = {
  developmentalCapacity: DevelopmentalCapacity;
  archetype: Archetype;
  element: Element;
  healthyAvailabilityScore: number;
  shadowActivationScore: number;
  developmentalBalanceScore: number;
};

export type ElementBalance = {
  element: Element;
  archetype: Archetype;
  percentage: number;
};

// --- Response-quality / validity metadata (docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md) --
//
// This is interpretive metadata computed alongside the scores above, never fed
// back into them. It never changes shadowActivationScore, healthyAvailabilityScore,
// primary/secondary ranking, or resultClarity - it only describes how reliable a
// given response profile appears to be, for transparent display alongside the
// result it accompanies.
//
// Thresholds are documented and tested against synthetic fixtures (see the audit
// doc, Part 4-5) rather than picked silently:
//   - LOW_DIFFERENTIATION_TIE_THRESHOLD: more than 2 of the 12 loops sharing the
//     exact maximum Shadow Activation score. 1 (a clear winner) or 2 (primary and
//     secondary genuinely tied - already reflected in resultClarity's 50 floor) are
//     normal outcomes for a differentiated profile; 3+ only occurs in degenerate
//     profiles (all-identical answers, heavily incomplete answers, certain careless
//     patterns) in every fixture tested.
//   - HIGH_NEUTRAL_RATE / INDISCRIMINATE_RATE: >50% Neutral, or >85% Agree/Disagree
//     regardless of item content, are both well outside normal response spread.
//   - LOW_VARIANCE_THRESHOLD: population variance of raw 1-5 answers below 0.3
//     indicates answers cluster on essentially one value (straight-lining).
//   - BROAD_ENDORSEMENT_CAPACITY_RATE: at least half of the 12 capacities scoring
//     >=75 on both Healthy Availability and Shadow Activation simultaneously
//     distinguishes broad, instrument-wide endorsement from genuine contextual
//     duality in one or two capacities (which is expected and not flagged - see
//     Part 7 of the audit doc).
const LOW_DIFFERENTIATION_TIE_THRESHOLD = 2;
const HIGH_NEUTRAL_RATE = 0.5;
const INDISCRIMINATE_RATE = 0.85;
const LOW_VARIANCE_THRESHOLD = 0.3;
const BROAD_ENDORSEMENT_CAPACITY_RATE = 0.5;

export type ResponseQualityFlag =
  | "Flat Response Pattern"
  | "High Neutral Use"
  | "Indiscriminate Agreement"
  | "Indiscriminate Disagreement"
  | "Low Answer Variability"
  | "High Healthy and Shadow Endorsement"
  | "Incomplete Responses";

export type ResponseQuality = {
  status: "Clear" | "Mixed" | "Low Differentiation";
  flags: ResponseQualityFlag[];
  responseVariance: number;
  neutralRate: number;
  agreementRate: number;
  disagreementRate: number;
  healthyShadowContradictionRate: number;
  explanation: string;
};

export type PrimaryLoopStatus = "Detected" | "Low Differentiation";

const FLAG_EXPLANATIONS: Record<ResponseQualityFlag, string> = {
  "Flat Response Pattern":
    "Several patterns scored very similarly, so the assessment could not clearly distinguish one from another.",
  "High Neutral Use":
    "Neutral was chosen for more than half of the questions, which narrows how much the result can differentiate.",
  "Indiscriminate Agreement":
    "Agree or Strongly agree was chosen for almost every question, regardless of its content.",
  "Indiscriminate Disagreement":
    "Disagree or Strongly disagree was chosen for almost every question, regardless of its content.",
  "Low Answer Variability":
    "Responses were highly similar across many questions, so the assessment could not clearly distinguish one pattern from another.",
  "High Healthy and Shadow Endorsement":
    "You endorsed both Healthy and Protective expressions strongly across most of the assessment. This may reflect different responses in different contexts, or it may mean the result needs to be interpreted with additional care.",
  "Incomplete Responses":
    "Not all questions were answered, so this result is based on partial information.",
};

function buildResponseQualityExplanation(flags: ResponseQualityFlag[]): string {
  if (flags.length === 0) {
    return "Your responses showed clear differentiation between patterns, with no response-quality concerns detected.";
  }
  return flags.map((flag) => FLAG_EXPLANATIONS[flag]).join(" ");
}

export type AssessmentResult = {
  scoringVersion: "2.0";
  capacityScores: CapacityScore[];
  loopScores: LoopScore[];
  archetypeScores: ArchetypeScore[];
  formationScores: FormationScores;
  primaryLoop: LoopScore | null;
  secondaryLoop: LoopScore | null;
  mostAvailableArchetype: MostAvailableArchetypeResult | null;
  growthEdge: GrowthEdgeResult | null;
  resultClarity: number;
  answerCompleteness: number;

  // Response-quality / validity metadata (additive, never fed back into the
  // scores above). See docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md.
  responseQuality: ResponseQuality;
  primaryLoopStatus: PrimaryLoopStatus;

  // Legacy fields - preserved so app/assessment/page.tsx and
  // components/FullReport.tsx continue to build and render unchanged. Every
  // field below is derived from the v2 scores above; there is no second
  // calculation path.
  confidence: number; // === resultClarity
  loopLandscape: LoopScore[]; // === loopScores (same array)
  growthEdgeArchetype: ArchetypeScore | null; // legacy archetype-level definition
  elementalActivation: ElementBalance[];
  elementalPercentages: { element: Element; percentage: number }[];
};

function computeResponseQuality(
  responses: number[],
  orderedQuestions: Question[],
  capacityScores: CapacityScore[],
  loopScores: LoopScore[],
  answerCompleteness: number
): { responseQuality: ResponseQuality; primaryLoopStatus: PrimaryLoopStatus } {
  const answeredValues: number[] = [];
  let neutralCount = 0;
  let agreeCount = 0;
  let disagreeCount = 0;

  responses.forEach((rawValue, index) => {
    const question = orderedQuestions[index];
    if (!question) return;
    if (rawValue === undefined || rawValue === null) return;
    answeredValues.push(rawValue);
    if (rawValue === 3) neutralCount++;
    if (rawValue === 4 || rawValue === 5) agreeCount++;
    if (rawValue === 1 || rawValue === 2) disagreeCount++;
  });

  const answeredCount = answeredValues.length;
  const neutralRate = answeredCount > 0 ? neutralCount / answeredCount : 0;
  const agreementRate = answeredCount > 0 ? agreeCount / answeredCount : 0;
  const disagreementRate = answeredCount > 0 ? disagreeCount / answeredCount : 0;

  const mean =
    answeredCount > 0 ? answeredValues.reduce((sum, v) => sum + v, 0) / answeredCount : 0;
  const responseVariance =
    answeredCount > 0
      ? Math.round(
          (answeredValues.reduce((sum, v) => sum + (v - mean) ** 2, 0) / answeredCount) * 100
        ) / 100
      : 0;

  const highHighCapacities = capacityScores.filter(
    (c) => c.healthyAvailabilityScore >= 75 && c.shadowActivationScore >= 75
  ).length;
  const healthyShadowContradictionRate =
    capacityScores.length > 0
      ? Math.round((highHighCapacities / capacityScores.length) * 100) / 100
      : 0;

  const topScore = loopScores[0]?.shadowActivationScore ?? 0;
  const loopsTiedAtMax = loopScores.filter(
    (l) => l.shadowActivationScore === topScore
  ).length;

  const flags: ResponseQualityFlag[] = [];

  if (loopsTiedAtMax > LOW_DIFFERENTIATION_TIE_THRESHOLD) {
    flags.push("Flat Response Pattern");
  }
  if (neutralRate > HIGH_NEUTRAL_RATE) {
    flags.push("High Neutral Use");
  }
  if (agreementRate > INDISCRIMINATE_RATE) {
    flags.push("Indiscriminate Agreement");
  }
  if (disagreementRate > INDISCRIMINATE_RATE) {
    flags.push("Indiscriminate Disagreement");
  }
  if (answeredCount > 0 && responseVariance < LOW_VARIANCE_THRESHOLD) {
    flags.push("Low Answer Variability");
  }
  if (healthyShadowContradictionRate > BROAD_ENDORSEMENT_CAPACITY_RATE) {
    flags.push("High Healthy and Shadow Endorsement");
  }
  if (answerCompleteness < 1) {
    flags.push("Incomplete Responses");
  }

  const status: ResponseQuality["status"] =
    flags.includes("Flat Response Pattern") || flags.length >= 3
      ? "Low Differentiation"
      : flags.length > 0
      ? "Mixed"
      : "Clear";

  const primaryLoopStatus: PrimaryLoopStatus =
    loopsTiedAtMax > LOW_DIFFERENTIATION_TIE_THRESHOLD ? "Low Differentiation" : "Detected";

  return {
    responseQuality: {
      status,
      flags,
      responseVariance,
      neutralRate: Math.round(neutralRate * 100) / 100,
      agreementRate: Math.round(agreementRate * 100) / 100,
      disagreementRate: Math.round(disagreementRate * 100) / 100,
      healthyShadowContradictionRate,
      explanation: buildResponseQualityExplanation(flags),
    },
    primaryLoopStatus,
  };
}

const ARCHETYPES: Archetype[] = ["Sovereign", "Magician", "Lover", "Warrior"];
const ARCHETYPE_TO_ELEMENT: Record<Archetype, Element> = {
  Sovereign: "Fire",
  Magician: "Air",
  Lover: "Water",
  Warrior: "Earth",
};

export function scoreAssessment(
  responses: number[],
  orderedQuestions: Question[]
): AssessmentResult {
  // --- Response normalisation -----------------------------------------------------
  // Input scale: Likert 1-5 (1 = Strongly disagree ... 5 = Strongly agree).
  // Unanswered handling: a missing/undefined response, or a question missing from
  // orderedQuestions, contributes nothing (its lens score is treated as 0 further
  // down, matching this module's pre-v2 convention of sum/(count||1) rather than
  // fabricating a neutral 50 for data that doesn't exist).
  const percentById = new Map<string, number>();

  responses.forEach((rawValue, index) => {
    const question = orderedQuestions[index];
    if (!question) return;
    if (rawValue === undefined || rawValue === null) return;
    percentById.set(question.id, likertToPercent(rawValue));
  });

  const answeredCount = orderedQuestions.filter(
    (q) => q && percentById.has(q.id)
  ).length;
  const answerCompleteness =
    questionBank.length > 0 ? answeredCount / questionBank.length : 0;

  // --- Question-level evidence -----------------------------------------------------
  // Every one of the 60 canonical questions maps to exactly one
  // (developmentalCapacity, lens) pair, so this lookup is always unique.
  function percentFor(capacity: DevelopmentalCapacity, lens: MeasurementLens): number {
    const question = questionBank.find(
      (q) => q.developmentalCapacity === capacity && q.lens === lens
    );
    if (!question) return 0;
    return percentById.get(question.id) ?? 0;
  }

  // --- Developmental Capacity scores ------------------------------------------------
  const capacityScores: CapacityScore[] = CANONICAL_CAPACITY_TABLE.map((row) => {
    const healthyCapacityScore = percentFor(row.developmentalCapacity, "Healthy Capacity");
    const healthyExpressionScore = percentFor(row.developmentalCapacity, "Healthy Expression");
    const protectiveBeliefScore = percentFor(row.developmentalCapacity, "Protective Belief");
    const protectiveEmotionScore = percentFor(row.developmentalCapacity, "Protective Emotion");
    const protectiveBehaviourScore = percentFor(row.developmentalCapacity, "Protective Behaviour");

    // Healthy Availability (§4): the two Healthy items for this capacity, averaged
    // transparently. This is never reduced by Shadow Activation - a capacity can be
    // both strongly available AND strongly protected at the same time, in
    // different contexts, and both numbers are reported side by side rather than
    // netted into one.
    const healthyAvailabilityScore = Math.round(
      (healthyCapacityScore + healthyExpressionScore) / 2
    );

    // Shadow Loop activation (§5): equal-weighted mean of the loop's three
    // evidence questions. No hidden multipliers.
    const shadowActivationScore = Math.round(
      (protectiveBeliefScore + protectiveEmotionScore + protectiveBehaviourScore) / 3
    );

    return {
      developmentalCapacity: row.developmentalCapacity,
      archetype: row.archetype,
      element: row.element,
      healthyCapacity: row.healthyCapacity,
      shadowLoop: row.shadowLoop,
      formation: row.formation,
      healthyCapacityScore,
      healthyExpressionScore,
      healthyAvailabilityScore,
      protectiveBeliefScore,
      protectiveEmotionScore,
      protectiveBehaviourScore,
      shadowActivationScore,
      developmentalBalanceScore: healthyAvailabilityScore - shadowActivationScore,
    };
  });

  // --- Shadow Loop scores (one per capacity - the mapping is 1:1) -------------------
  const loopScoresUnsorted: LoopScore[] = capacityScores.map((capacity) => ({
    loop: capacity.shadowLoop,
    archetype: capacity.archetype,
    element: capacity.element,
    developmentalCapacity: capacity.developmentalCapacity,
    formation: capacity.formation,
    protectiveBeliefScore: capacity.protectiveBeliefScore,
    protectiveEmotionScore: capacity.protectiveEmotionScore,
    protectiveBehaviourScore: capacity.protectiveBehaviourScore,
    shadowActivationScore: capacity.shadowActivationScore,
    responseStyle: capacity.formation,
    score: capacity.shadowActivationScore,
  }));

  // Deterministic ordering (§8): highest Shadow Activation first; ties broken by
  // higher Protective Behaviour, then higher Protective Emotion, then higher
  // Protective Belief, then a fixed canonical loop order (CANONICAL_LOOP_ORDER,
  // from docs/ASSESSMENT_V2_CANONICAL_QUESTIONS.md's own row order) - never
  // object/array insertion order.
  const loopScores = [...loopScoresUnsorted].sort((a, b) => {
    if (b.shadowActivationScore !== a.shadowActivationScore) {
      return b.shadowActivationScore - a.shadowActivationScore;
    }
    if (b.protectiveBehaviourScore !== a.protectiveBehaviourScore) {
      return b.protectiveBehaviourScore - a.protectiveBehaviourScore;
    }
    if (b.protectiveEmotionScore !== a.protectiveEmotionScore) {
      return b.protectiveEmotionScore - a.protectiveEmotionScore;
    }
    if (b.protectiveBeliefScore !== a.protectiveBeliefScore) {
      return b.protectiveBeliefScore - a.protectiveBeliefScore;
    }
    return (
      CANONICAL_LOOP_ORDER.indexOf(a.loop) - CANONICAL_LOOP_ORDER.indexOf(b.loop)
    );
  });

  // Primary Shadow Loop (§8): highest Shadow Activation under the ordering above.
  const primaryLoop = loopScores[0] ?? null;

  // Secondary Shadow Loop (§9): the simplest defensible rule - the mathematically
  // next-highest score under the identical deterministic ordering, with no
  // requirement that it come from a different Archetype or Formation. This keeps
  // the Secondary Loop always identical to entry #2 of the ranked Loop Landscape
  // shown elsewhere in the same report; requiring a different Archetype/Formation
  // would let the two sections disagree with each other, which is precisely the
  // contradiction a prior fix to this codebase already removed (see
  // docs/ASSESSMENT_V2_AUDIT.md).
  const secondaryLoop = loopScores[1] ?? null;

  // --- Formation scores (§6): interpretive summaries, not a replacement for the
  // individual Shadow Loop scores above --------------------------------------------
  function meanFormationScore(formation: Exclude<ProtectiveFormation, "Healthy">): number {
    const rows = loopScores.filter((l) => l.formation === formation);
    if (rows.length === 0) return 0;
    return Math.round(
      rows.reduce((sum, l) => sum + l.shadowActivationScore, 0) / rows.length
    );
  }

  const formationScores: FormationScores = {
    collapse: meanFormationScore("Collapse"),
    compensate: meanFormationScore("Compensate"),
    collide: meanFormationScore("Collide"),
  };

  // --- Archetype scores (§7) --------------------------------------------------------
  const archetypeScores: ArchetypeScore[] = ARCHETYPES.map((archetype) => {
    const capacities = capacityScores.filter((c) => c.archetype === archetype);
    const loops = loopScores.filter((l) => l.archetype === archetype);

    const healthyAvailability = Math.round(
      capacities.reduce((sum, c) => sum + c.healthyAvailabilityScore, 0) /
        (capacities.length || 1)
    );
    const shadowActivation = Math.round(
      loops.reduce((sum, l) => sum + l.shadowActivationScore, 0) / (loops.length || 1)
    );

    const collapseLoop = loops.find((l) => l.formation === "Collapse");
    const compensateLoop = loops.find((l) => l.formation === "Compensate");
    const collideLoop = loops.find((l) => l.formation === "Collide");

    const formationProfile = {
      healthy: healthyAvailability,
      collapse: collapseLoop?.shadowActivationScore ?? 0,
      compensate: compensateLoop?.shadowActivationScore ?? 0,
      collide: collideLoop?.shadowActivationScore ?? 0,
    };

    // Legacy integratedPercent formula, unchanged from v1: Healthy Availability
    // discounted by Shadow Activation at a 0.6 weight, clamped to [0,100]. Kept
    // only for existing consumers - the new mostAvailableArchetype/growthEdge
    // logic below deliberately does not use this discounted figure (§10-11).
    const integratedPercent = Math.max(
      0,
      Math.min(100, Math.round(healthyAvailability - shadowActivation * 0.6))
    );

    return {
      archetype,
      element: ARCHETYPE_TO_ELEMENT[archetype],
      capacities,
      healthyAvailability,
      shadowActivation,
      formationProfile,
      healthyPercent: healthyAvailability,
      shadowPercent: shadowActivation,
      suppressionPercent: formationProfile.collapse,
      compensationPercent: formationProfile.compensate,
      collisionPercent: formationProfile.collide,
      integratedPercent,
    };
  });

  // --- Most Available Archetype (§10) -----------------------------------------------
  // Precisely: the Archetype with the highest mean Healthy Availability across its
  // three Developmental Capacities. Deliberately NOT integratedPercent (which nets
  // out Shadow Activation), NOT a raw sum across all 15 answers, and NOT the most
  // Shadow-activated Archetype.
  const mostAvailableArchetype: MostAvailableArchetypeResult | null =
    archetypeScores.length > 0
      ? (() => {
          const best = [...archetypeScores].sort(
            (a, b) => b.healthyAvailability - a.healthyAvailability
          )[0];
          return {
            archetype: best.archetype,
            element: best.element,
            healthyAvailability: best.healthyAvailability,
            capacities: best.capacities.map((c) => ({
              developmentalCapacity: c.developmentalCapacity,
              healthyAvailabilityScore: c.healthyAvailabilityScore,
            })),
          };
        })()
      : null;

  // --- Growth Edge (§11) -------------------------------------------------------------
  // Candidate A (lowest Healthy Availability) was chosen over Candidate B (largest
  // shadowActivation - healthyAvailability gap). Candidate B can rank a capacity
  // that is already strongly Healthy (but also strongly triggered) above a
  // capacity that is simply underdeveloped on both counts - misrepresenting
  // someone with both strong Healthy and strong Shadow expression, which is
  // exactly the failure mode the spec asks to avoid. Candidate A always answers
  // the same, simpler, developmental question - "where would increasing Healthy
  // Availability matter most?" - which matches the Framework's own definition of
  // Integration (Framework Architecture, Section 10: "Integration increases access
  // to Healthy Capacities"). developmentalBalanceScore (the Candidate-B gap) is
  // still computed and returned per capacity for supplementary context, but does
  // not drive this selection.
  // Tie-break: canonical capacity order (CANONICAL_CAPACITY_TABLE row order).
  const growthEdge: GrowthEdgeResult | null =
    capacityScores.length > 0
      ? (() => {
          const sorted = [...capacityScores].sort((a, b) => {
            if (a.healthyAvailabilityScore !== b.healthyAvailabilityScore) {
              return a.healthyAvailabilityScore - b.healthyAvailabilityScore;
            }
            const aIndex = CANONICAL_CAPACITY_TABLE.findIndex(
              (row) => row.developmentalCapacity === a.developmentalCapacity
            );
            const bIndex = CANONICAL_CAPACITY_TABLE.findIndex(
              (row) => row.developmentalCapacity === b.developmentalCapacity
            );
            return aIndex - bIndex;
          });
          const lowest = sorted[0];
          return {
            developmentalCapacity: lowest.developmentalCapacity,
            archetype: lowest.archetype,
            element: lowest.element,
            healthyAvailabilityScore: lowest.healthyAvailabilityScore,
            shadowActivationScore: lowest.shadowActivationScore,
            developmentalBalanceScore: lowest.developmentalBalanceScore,
          };
        })()
      : null;

  // --- Result Clarity / legacy Confidence (§12) --------------------------------------
  // Describes how clearly the Primary Loop separates from the Secondary Loop - not
  // a statistical or clinical certainty measure. A tie between Primary and
  // Secondary yields the 50% floor (a genuine coin-flip); the gap between them
  // pushes it toward 100. The whole figure is then scaled by answer completeness,
  // so a partially-completed assessment is transparently reported as less clear
  // rather than silently reusing the full-completion formula.
  const separationScore = primaryLoop
    ? secondaryLoop
      ? Math.max(
          0,
          Math.min(100, Math.round(50 + (primaryLoop.score - secondaryLoop.score)))
        )
      : 100
    : 0;

  const resultClarity = Math.max(
    0,
    Math.min(100, Math.round(separationScore * answerCompleteness))
  );

  // --- Legacy elemental balance ------------------------------------------------------
  // Unchanged formulas from v1, kept only for the currently-unread
  // premiumDataReady passthrough in app/assessment/page.tsx (see
  // docs/ASSESSMENT_V2_AUDIT.md Section 5) - not part of the v2.0 canonical output.
  const elementalPresenceRaw = archetypeScores.map((item) => ({
    element: item.element,
    archetype: item.archetype,
    percentage: Math.max(
      1,
      Math.round(item.healthyAvailability - item.shadowActivation * 0.35)
    ),
  }));
  const totalElementalPresence = elementalPresenceRaw.reduce(
    (sum, item) => sum + item.percentage,
    0
  );
  const elementalActivation: ElementBalance[] = elementalPresenceRaw.map((item) => ({
    element: item.element,
    archetype: item.archetype,
    percentage: Math.round((item.percentage / totalElementalPresence) * 100),
  }));

  const totalIntegrated = archetypeScores.reduce(
    (sum, item) => sum + item.integratedPercent,
    0
  );
  const elementalPercentages = archetypeScores.map((item) => ({
    element: item.element,
    percentage:
      totalIntegrated > 0
        ? Math.round((item.integratedPercent / totalIntegrated) * 100)
        : 25,
  }));

  // Legacy archetype-level "Growth Edge" (lowest integratedPercent) - distinct
  // from the new capacity-level `growthEdge` above. Kept only because
  // app/assessment/page.tsx still reads `result.growthEdgeArchetype` into a field
  // that nothing currently reads back (docs/ASSESSMENT_V2_AUDIT.md Section 5) -
  // preserved for zero-risk compatibility, not because any live UI depends on it.
  const growthEdgeArchetype =
    [...archetypeScores].sort((a, b) => a.integratedPercent - b.integratedPercent)[0] ??
    null;

  // --- Response quality / Primary Loop status (docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md) --
  // Computed from the scores already derived above - never fed back into them.
  const { responseQuality, primaryLoopStatus } = computeResponseQuality(
    responses,
    orderedQuestions,
    capacityScores,
    loopScores,
    answerCompleteness
  );

  return {
    scoringVersion: "2.0",
    capacityScores,
    loopScores,
    archetypeScores,
    formationScores,
    primaryLoop,
    secondaryLoop,
    mostAvailableArchetype,
    growthEdge,
    resultClarity,
    answerCompleteness,

    responseQuality,
    primaryLoopStatus,

    confidence: resultClarity,
    loopLandscape: loopScores,
    growthEdgeArchetype,
    elementalActivation,
    elementalPercentages,
  };
}
