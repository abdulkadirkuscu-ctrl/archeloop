// Deterministic validation script for the ArcheLoop Assessment v2.0 question bank
// (app/data/questions.ts) and scoring engine (app/data/scoring.ts). Not a UI test -
// exercises the question bank's structure and the pure scoring function directly
// against constructed answer profiles.
//
// Run with:
//   node --experimental-strip-types app/data/scoring.test.ts
//
// No test framework dependency required. (No `npm test` script or CI currently
// runs this file - see docs/ASSESSMENT_V2_AUDIT.md Section 4, item 6. Run it by
// hand after any change to questions.ts or scoring.ts.)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  questions,
  assessmentOrder,
  CANONICAL_CAPACITY_TABLE,
  CANONICAL_LOOP_ORDER,
  type Question,
  type DevelopmentalCapacity,
  type ShadowLoopName,
} from "./questions.ts";
import { scoreAssessment } from "./scoring.ts";
import { LOOP_STRUCTURAL_METADATA } from "./loopStructuralMetadata.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`FAIL: ${message}`);
  }
}

const ARCHETYPES = ["Sovereign", "Magician", "Lover", "Warrior"] as const;

function idsForCapacity(capacity: DevelopmentalCapacity): string[] {
  return questions.filter((q) => q.developmentalCapacity === capacity).map((q) => q.id);
}

function idsForLoop(loop: ShadowLoopName): string[] {
  return questions.filter((q) => q.shadowLoop === loop).map((q) => q.id);
}

function buildResponses(overrides: Record<string, number>, baseline = 3): number[] {
  return assessmentOrder.map((id) => overrides[id] ?? baseline);
}

function highIds(ids: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  ids.forEach((id) => (out[id] = 5));
  return out;
}

// ---------------------------------------------------------------------------------
// Part 1: question-bank structure
// ---------------------------------------------------------------------------------

console.log("Part 1: question-bank structure");

assert(questions.length === 60, `expected 60 questions, found ${questions.length}`);
assert(
  assessmentOrder.length === 60,
  `expected 60 entries in assessmentOrder, found ${assessmentOrder.length}`
);
assert(
  new Set(assessmentOrder).size === 60,
  "assessmentOrder contains duplicate ids"
);

const idCounts = new Map<string, number>();
questions.forEach((q) => idCounts.set(q.id, (idCounts.get(q.id) || 0) + 1));
const duplicateIds = [...idCounts.entries()].filter(([, count]) => count > 1);
assert(duplicateIds.length === 0, `duplicate question ids found: ${duplicateIds.map(([id]) => id).join(", ")}`);

const canonicalIdCounts = new Map<string, number>();
questions.forEach((q) => canonicalIdCounts.set(q.canonicalId, (canonicalIdCounts.get(q.canonicalId) || 0) + 1));
const duplicateCanonicalIds = [...canonicalIdCounts.entries()].filter(([, count]) => count > 1);
assert(
  duplicateCanonicalIds.length === 0,
  `duplicate canonicalId values found: ${duplicateCanonicalIds.map(([id]) => id).join(", ")}`
);

const missingFromOrder = questions.filter((q) => !assessmentOrder.includes(q.id));
assert(
  missingFromOrder.length === 0,
  `questions missing from assessmentOrder: ${missingFromOrder.map((q) => q.id).join(", ")}`
);
const orderIdsNotInBank = assessmentOrder.filter((id) => !questions.some((q) => q.id === id));
assert(
  orderIdsNotInBank.length === 0,
  `assessmentOrder references ids that do not exist in questions: ${orderIdsNotInBank.join(", ")}`
);

ARCHETYPES.forEach((archetype) => {
  const archetypeQuestions = questions.filter((q) => q.archetype === archetype);
  assert(
    archetypeQuestions.length === 15,
    `${archetype} should have 15 questions, has ${archetypeQuestions.length}`
  );

  const inOrder = assessmentOrder.filter((id) => {
    const q = questions.find((question) => question.id === id);
    return q?.archetype === archetype;
  });
  assert(
    inOrder.length === 15,
    `${archetype} should contribute exactly 15 questions to assessmentOrder, contributes ${inOrder.length}`
  );

  const formations = new Set(archetypeQuestions.filter((q) => q.formation !== "Healthy").map((q) => q.formation));
  assert(
    formations.size === 3 && formations.has("Collapse") && formations.has("Compensate") && formations.has("Collide"),
    `${archetype} should have exactly one Collapse, one Compensate, and one Collide loop`
  );
});

CANONICAL_CAPACITY_TABLE.forEach((row) => {
  const capacityQuestions = questions.filter((q) => q.developmentalCapacity === row.developmentalCapacity);
  assert(
    capacityQuestions.length === 5,
    `${row.developmentalCapacity} should have exactly 5 questions, has ${capacityQuestions.length}`
  );

  const healthy = capacityQuestions.filter((q) => q.formation === "Healthy");
  assert(
    healthy.length === 2,
    `${row.developmentalCapacity} should have exactly 2 Healthy questions, has ${healthy.length}`
  );
  assert(
    healthy.some((q) => q.lens === "Healthy Capacity") && healthy.some((q) => q.lens === "Healthy Expression"),
    `${row.developmentalCapacity} should have one Healthy Capacity and one Healthy Expression question`
  );
  healthy.forEach((q) => {
    assert(q.shadowLoop === null, `Healthy question ${q.id} should have shadowLoop === null`);
    assert(
      q.healthyCapacity === row.healthyCapacity,
      `${q.id} healthyCapacity should be "${row.healthyCapacity}", got "${q.healthyCapacity}"`
    );
    assert(q.archetype === row.archetype, `${q.id} archetype should be ${row.archetype}`);
    assert(q.element === row.element, `${q.id} element should be ${row.element}`);
  });

  const shadow = capacityQuestions.filter((q) => q.formation !== "Healthy");
  assert(
    shadow.length === 3,
    `${row.developmentalCapacity}'s loop (${row.shadowLoop}) should have exactly 3 Shadow questions, has ${shadow.length}`
  );
  assert(
    shadow.every((q) => q.shadowLoop === row.shadowLoop),
    `all Shadow questions for ${row.developmentalCapacity} should have shadowLoop === "${row.shadowLoop}"`
  );
  assert(
    shadow.every((q) => q.formation === row.formation),
    `all Shadow questions for ${row.shadowLoop} should have formation === "${row.formation}"`
  );

  const lenses = shadow.map((q) => q.lens).sort();
  assert(
    JSON.stringify(lenses) ===
      JSON.stringify(["Protective Behaviour", "Protective Belief", "Protective Emotion"].sort()),
    `${row.shadowLoop} should have exactly one Protective Belief, one Protective Emotion, and one Protective Behaviour question, got ${lenses.join(", ")}`
  );
});

CANONICAL_LOOP_ORDER.forEach((loop) => {
  const ids = idsForLoop(loop);
  assert(ids.length === 3, `${loop} should have exactly 3 dedicated question ids, has ${ids.length}`);
});

// No legacy public terminology in v2 metadata.
const bannedTerms = ["Suppression", "Compensation", "Collision", "Collapsed", "Inflated"];
questions.forEach((q) => {
  const fields: [string, string | null][] = [
    ["formation", q.formation],
    ["lens", q.lens],
    ["developmentalCapacity", q.developmentalCapacity],
    ["healthyCapacity", q.healthyCapacity],
    ["shadowLoop", q.shadowLoop],
    ["text", q.text],
  ];
  fields.forEach(([field, value]) => {
    if (value === null) return;
    bannedTerms.forEach((term) => {
      assert(
        !value.includes(term),
        `question ${q.id} field "${field}" contains banned legacy term "${term}": "${value}"`
      );
    });
  });
});

// ---------------------------------------------------------------------------------
// Part 2: canonical wording fidelity
// ---------------------------------------------------------------------------------

console.log("Part 2: canonical wording fidelity");

// Verbatim transcription of docs/ASSESSMENT_V2_CANONICAL_QUESTIONS.md, keyed by
// canonicalId. This is intentionally a second, independent copy of the wording -
// its only purpose is to catch any transcription drift in questions.ts.
const CANONICAL_TEXT: Record<string, string> = {
  F1: "I allow myself to be seen without hiding important parts of who I am.",
  F2: "I allow myself to take up space in social, professional, or creative environments.",
  F3: "I believe it is safer to stay unnoticed than to be fully seen.",
  F4: "I feel ashamed when I take up space or draw attention to myself.",
  F5: "I hide my talents, opinions, or achievements to avoid scrutiny.",
  F6: "I can acknowledge my strengths without feeling arrogant or ashamed.",
  F7: "I continue putting effort into things that matter to me, even when others do not notice.",
  F8: "I believe my value depends on what I achieve or how other people see me.",
  F9: "I feel inadequate when others do not recognise what I have achieved.",
  F10: "I work hard to prove my worth, even when I have nothing to prove.",
  F11: "I trust myself to move forward even when the outcome is uncertain.",
  F12: "I take action on what matters instead of waiting for perfect conditions.",
  F13: "I believe I need to get everything right before I begin.",
  F14: "I feel frustrated when I cannot turn my intentions into action.",
  F15: "I start projects with excitement but often stall before completing them.",

  A1: "I know what's really going on for me inside, even before I can put it into words.",
  A2: "I can put what I think or feel into words that others actually understand.",
  A3: "I believe I will lose access to my words when they matter most.",
  A4: "I feel mentally blank or frozen when I am under pressure.",
  A5: "I stumble over my words or lose my train of thought under pressure.",
  A6: "I trust my perception without needing complete certainty.",
  A7: "I speak honestly even when it feels uncomfortable.",
  A8: "I believe controlling the story is safer than facing the truth.",
  A9: "I feel unsettled when reality does not match how I understand it.",
  A10: "I rationalise or reshape situations to avoid feeling vulnerable or uncertain.",
  A11: "I can clearly understand situations and think through complex problems.",
  A12: "I check my understanding before reaching conclusions.",
  A13: "I believe I need to think more before I can act.",
  A14: "I feel mentally overwhelmed when I need to make important decisions.",
  A15: "I replay the same thoughts over and over instead of deciding.",

  W1: "I feel safe allowing myself to experience vulnerable emotions.",
  W2: "I express my feelings openly instead of holding them back.",
  W3: "I believe it is not safe to fully feel my emotions.",
  W4: "I often feel emotionally numb or disconnected.",
  W5: "I withdraw emotionally when vulnerability or closeness arises.",
  W6: "I feel free to form close relationships without fearing emotional closeness.",
  W7: "I connect deeply with others without losing myself.",
  W8: "I believe imagined connection feels safer than real intimacy.",
  W9: "I feel disappointed when real relationships do not match what I hoped they would be.",
  W10: "I retreat into fantasy instead of engaging with difficult relationships.",
  W11: "I can experience strong emotions without becoming overwhelmed by them.",
  W12: "I pause and steady myself before responding to strong emotions.",
  W13: "I believe that if I fully experience my emotions, they will become too much for me.",
  W14: "I feel emotionally overwhelmed when my feelings become intense.",
  W15: "When my emotions become intense, I react before I have time to think clearly.",

  E1: "I recognise that my own needs and boundaries deserve respect.",
  E2: "I set clear boundaries without excessive guilt.",
  E3: "I believe it is safer to go along than to stand up for my needs.",
  E4: "I feel guilty when I put my own needs first.",
  E5: "I agree when I would rather say no, just to avoid conflict.",
  E6: "I trust that I can rely on others without losing my independence.",
  E7: "I reach out for support when I need it.",
  E8: "I believe I am safer when I rely only on myself.",
  E9: "I feel uncomfortable depending on other people.",
  E10: "I handle difficulties alone rather than asking other people for support.",
  E11: "I recognise when my energy needs rest and restoration.",
  E12: "I make time to rest and recover, even when I am busy.",
  E13: "I believe resting means I am neglecting my responsibilities.",
  E14: "I feel drained and depleted by everything I am carrying.",
  E15: "I keep pushing through my responsibilities without pausing to recover.",
};

assert(
  Object.keys(CANONICAL_TEXT).length === 60,
  `expected 60 canonical text fixtures, found ${Object.keys(CANONICAL_TEXT).length}`
);

questions.forEach((q) => {
  const expected = CANONICAL_TEXT[q.canonicalId];
  assert(
    expected !== undefined,
    `question ${q.id} has canonicalId "${q.canonicalId}" not present in the canonical document fixture`
  );
  if (expected !== undefined) {
    assert(
      q.text === expected,
      `question ${q.id} (${q.canonicalId}) text does not match canonical document.\n  got:      "${q.text}"\n  expected: "${expected}"`
    );
  }
});

// ---------------------------------------------------------------------------------
// Part 3: scoring
// ---------------------------------------------------------------------------------

console.log("Part 3: scoring");

const orderedQuestions: Question[] = assessmentOrder
  .map((id) => questions.find((q) => q.id === id))
  .filter((q): q is Question => Boolean(q));

// 1. Minimum answers (all 1s)
{
  const responses = buildResponses({}, 1);
  const result = scoreAssessment(responses, orderedQuestions);
  result.archetypeScores.forEach((a) => {
    assert(a.healthyAvailability === 0, `Min profile: ${a.archetype} healthyAvailability should be 0, got ${a.healthyAvailability}`);
    assert(a.shadowActivation === 0, `Min profile: ${a.archetype} shadowActivation should be 0, got ${a.shadowActivation}`);
  });
  assert(result.answerCompleteness === 1, "Min profile: answerCompleteness should be 1 when all 60 are answered");
}

// 2. Maximum answers (all 5s)
{
  const responses = buildResponses({}, 5);
  const result = scoreAssessment(responses, orderedQuestions);
  result.archetypeScores.forEach((a) => {
    assert(a.healthyAvailability === 100, `Max profile: ${a.archetype} healthyAvailability should be 100, got ${a.healthyAvailability}`);
    assert(a.shadowActivation === 100, `Max profile: ${a.archetype} shadowActivation should be 100, got ${a.shadowActivation}`);
  });
}

// 3. All-neutral answers
{
  const responses = buildResponses({}, 3);
  const result = scoreAssessment(responses, orderedQuestions);
  result.capacityScores.forEach((c) => {
    assert(c.healthyAvailabilityScore === 50, `Neutral profile: ${c.developmentalCapacity} healthyAvailabilityScore should be 50`);
    assert(c.shadowActivationScore === 50, `Neutral profile: ${c.developmentalCapacity} shadowActivationScore should be 50`);
  });
  assert(result.primaryLoop !== null, "Neutral profile: expected a deterministically selected primary loop");
  assert(result.resultClarity <= 55, `Neutral profile: expected low resultClarity, got ${result.resultClarity}`);
}

// 4. All-high Healthy answers, all-low Shadow answers
{
  const healthyIds = questions.filter((q) => q.formation === "Healthy").map((q) => q.id);
  const responses = buildResponses(highIds(healthyIds), 1);
  const result = scoreAssessment(responses, orderedQuestions);
  result.archetypeScores.forEach((a) => {
    assert(a.healthyAvailability === 100, `Healthy-high profile: ${a.archetype} healthyAvailability should be 100`);
    assert(a.shadowActivation === 0, `Healthy-high profile: ${a.archetype} shadowActivation should be 0`);
    assert(a.integratedPercent === 100, `Healthy-high profile: ${a.archetype} integratedPercent should be 100`);
  });
  const scores = result.loopScores.map((l) => l.score);
  assert(Math.max(...scores) === 0, `Healthy-high profile: expected all loop scores to be 0, max was ${Math.max(...scores)}`);
}

// 5. All-high Shadow answers, all-low Healthy answers
{
  const shadowIds = questions.filter((q) => q.formation !== "Healthy").map((q) => q.id);
  const responses = buildResponses(highIds(shadowIds), 1);
  const result = scoreAssessment(responses, orderedQuestions);
  result.archetypeScores.forEach((a) => {
    assert(a.healthyAvailability === 0, `Shadow-high profile: ${a.archetype} healthyAvailability should be 0`);
    assert(a.shadowActivation === 100, `Shadow-high profile: ${a.archetype} shadowActivation should be 100`);
    assert(a.integratedPercent === 0, `Shadow-high profile: ${a.archetype} integratedPercent should be 0`);
  });
}

// 6. One clearly dominant loop
{
  const ids = idsForLoop("Paper Crown");
  const responses = buildResponses(highIds(ids), 1);
  const result = scoreAssessment(responses, orderedQuestions);
  assert(
    result.primaryLoop !== null && result.primaryLoop.loop === "Paper Crown",
    `Dominant-loop profile: expected primary loop Paper Crown, got ${result.primaryLoop?.loop}`
  );
}

// 7. Synthetic fixtures for all 12 Shadow Loops
CANONICAL_LOOP_ORDER.forEach((loop) => {
  const ids = idsForLoop(loop);
  const responses = buildResponses(highIds(ids), 1);
  const result = scoreAssessment(responses, orderedQuestions);
  assert(
    result.primaryLoop !== null && result.primaryLoop.loop === loop,
    `${loop}-high profile: expected primary loop ${loop}, got ${result.primaryLoop?.loop}`
  );
});

// 8. Primary/Secondary tie -> deterministic tie-break
{
  // Dimmed Light and Compliance (different archetypes, same Collapse formation)
  // maxed identically on Belief/Emotion, but Dimmed Light's Behaviour answer is
  // higher - it must win on the documented tie-break (higher Protective
  // Behaviour), and Compliance must be Secondary.
  const overrides: Record<string, number> = {};
  idsForLoop("Dimmed Light").forEach((id) => (overrides[id] = 5));
  idsForLoop("Compliance").forEach((id, index) => (overrides[id] = index === 2 ? 4 : 5));

  const responses = buildResponses(overrides, 1);
  const result = scoreAssessment(responses, orderedQuestions);

  assert(
    result.primaryLoop !== null && result.primaryLoop.loop === "Dimmed Light",
    `Tie-break profile: expected primary Dimmed Light, got ${result.primaryLoop?.loop}`
  );
  assert(
    result.secondaryLoop !== null && result.secondaryLoop.loop === "Compliance",
    `Tie-break profile: expected secondary Compliance, got ${result.secondaryLoop?.loop}`
  );
}

// 8b. Full tie (identical Belief/Emotion/Behaviour) -> resolved by canonical loop order
{
  const overrides: Record<string, number> = {};
  idsForLoop("Smoky Mirrors").forEach((id) => (overrides[id] = 5));
  idsForLoop("Mind Maze").forEach((id) => (overrides[id] = 5));

  const responses = buildResponses(overrides, 1);
  const result = scoreAssessment(responses, orderedQuestions);

  const smokyIndex = CANONICAL_LOOP_ORDER.indexOf("Smoky Mirrors");
  const mazeIndex = CANONICAL_LOOP_ORDER.indexOf("Mind Maze");
  const expectedPrimary = smokyIndex < mazeIndex ? "Smoky Mirrors" : "Mind Maze";

  assert(
    result.primaryLoop !== null && result.primaryLoop.loop === expectedPrimary,
    `Full-tie profile: expected primary ${expectedPrimary} (canonical order), got ${result.primaryLoop?.loop}`
  );
}

// 9. Archetype tie -> deterministic (stable sort), does not crash
{
  const responses = buildResponses({}, 3);
  const result = scoreAssessment(responses, orderedQuestions);
  const result2 = scoreAssessment(responses, orderedQuestions);
  assert(
    result.mostAvailableArchetype !== null &&
      result2.mostAvailableArchetype !== null &&
      result.mostAvailableArchetype.archetype === result2.mostAvailableArchetype.archetype,
    "Archetype tie: mostAvailableArchetype must resolve identically on repeat runs"
  );
}

// 10. Capacity with high Healthy AND high Shadow simultaneously
{
  const overrides: Record<string, number> = {};
  idsForCapacity("Worth").forEach((id) => (overrides[id] = 5));
  const responses = buildResponses(overrides, 3);
  const result = scoreAssessment(responses, orderedQuestions);
  const worth = result.capacityScores.find((c) => c.developmentalCapacity === "Worth")!;
  assert(
    worth.healthyAvailabilityScore === 100,
    `Worth healthyAvailabilityScore should be 100 (both Healthy items maxed), got ${worth.healthyAvailabilityScore}`
  );
  assert(
    worth.shadowActivationScore === 100,
    `Worth shadowActivationScore should be 100 (all 3 Shadow items maxed), got ${worth.shadowActivationScore}`
  );
  assert(
    worth.healthyAvailabilityScore === 100 && worth.shadowActivationScore === 100,
    "Healthy Availability must not be silently reduced by Shadow Activation - both should be independently reportable as 100"
  );
}

// 11. Missing / incomplete answers
{
  const partial = buildResponses({}, 3).slice(0, 30);
  const result = scoreAssessment(partial, orderedQuestions);
  assert(result.loopScores.length === 12, "Partial responses: loopScores should always contain all 12 loops");
  assert(result.answerCompleteness === 0.5, `Partial responses: expected answerCompleteness 0.5, got ${result.answerCompleteness}`);
  assert(Number.isFinite(result.resultClarity), "Partial responses: resultClarity must remain a finite number");
}

// 12. Deterministic results across repeated runs
{
  const responses = buildResponses(highIds(idsForLoop("Fortress")), 2);
  const result1 = scoreAssessment(responses, orderedQuestions);
  const result2 = scoreAssessment(responses, orderedQuestions);
  assert(
    JSON.stringify(result1.loopScores) === JSON.stringify(result2.loopScores),
    "Determinism: identical answers must produce identical loopScores on repeat runs"
  );
  assert(
    result1.primaryLoop?.loop === result2.primaryLoop?.loop &&
      result1.resultClarity === result2.resultClarity,
    "Determinism: identical answers must produce identical primaryLoop/resultClarity on repeat runs"
  );
}

// 13. Bounds check: every score stays within [0, 100]
{
  const responses = buildResponses(highIds(idsForLoop("Barren Ground")), 5);
  const result = scoreAssessment(responses, orderedQuestions);

  result.capacityScores.forEach((c) => {
    [
      c.healthyCapacityScore,
      c.healthyExpressionScore,
      c.healthyAvailabilityScore,
      c.protectiveBeliefScore,
      c.protectiveEmotionScore,
      c.protectiveBehaviourScore,
      c.shadowActivationScore,
    ].forEach((value) => {
      assert(value >= 0 && value <= 100, `Bounds check: ${c.developmentalCapacity} produced out-of-range value ${value}`);
    });
  });

  result.loopScores.forEach((l) => {
    assert(l.score >= 0 && l.score <= 100, `Bounds check: ${l.loop} produced out-of-range score ${l.score}`);
  });

  assert(
    result.resultClarity >= 0 && result.resultClarity <= 100,
    `Bounds check: resultClarity out of range ${result.resultClarity}`
  );

  [result.formationScores.collapse, result.formationScores.compensate, result.formationScores.collide].forEach(
    (value) => {
      assert(value >= 0 && value <= 100, `Bounds check: formationScores produced out-of-range value ${value}`);
    }
  );
}

// ---------------------------------------------------------------------------------
// Part 4: Report v2 - structural metadata and data-contract checks
// ---------------------------------------------------------------------------------

console.log("Part 4: Report v2 structural metadata and data contract");

{
  // All 12 loops present, and injuredArchetype matches canonical loop
  // ownership (CANONICAL_CAPACITY_TABLE) exactly - the table scoring.ts
  // itself is built from, so this can never drift from scoring.
  assert(
    LOOP_STRUCTURAL_METADATA.length === 12,
    `LOOP_STRUCTURAL_METADATA should have 12 entries, got ${LOOP_STRUCTURAL_METADATA.length}`
  );

  CANONICAL_CAPACITY_TABLE.forEach((row) => {
    const entry = LOOP_STRUCTURAL_METADATA.find((m) => m.loop === row.shadowLoop);
    assert(!!entry, `LoopStructuralMetadata missing entry for ${row.shadowLoop}`);
    assert(
      entry?.injuredArchetype === row.archetype,
      `${row.shadowLoop}: injuredArchetype should be ${row.archetype}, got ${entry?.injuredArchetype}`
    );
    assert(
      entry?.developmentalCapacity === row.developmentalCapacity,
      `${row.shadowLoop}: developmentalCapacity should be ${row.developmentalCapacity}, got ${entry?.developmentalCapacity}`
    );
    assert(
      entry?.formation === row.formation,
      `${row.shadowLoop}: formation should be ${row.formation}, got ${entry?.formation}`
    );
  });

  // Compensating Archetype is optional and genuinely rare - only set where a
  // distinct archetype is recruited, never inferred merely from Formation.
  const withCompensating = LOOP_STRUCTURAL_METADATA.filter((m) => m.compensatingArchetype);
  assert(
    withCompensating.length === 2,
    `Expected exactly 2 loops with a distinct compensatingArchetype, got ${withCompensating.length}`
  );
  assert(
    withCompensating.every((m) => m.compensatingArchetype !== m.injuredArchetype),
    "compensatingArchetype must always be distinct from injuredArchetype (never inferred as a duplicate)"
  );
  assert(
    LOOP_STRUCTURAL_METADATA.find((m) => m.loop === "Paper Crown")?.compensatingArchetype === "Magician",
    "Paper Crown should have compensatingArchetype Magician"
  );
  assert(
    LOOP_STRUCTURAL_METADATA.find((m) => m.loop === "Fantasy Fog")?.compensatingArchetype === "Magician",
    "Fantasy Fog should have compensatingArchetype Magician"
  );
  assert(
    !LOOP_STRUCTURAL_METADATA.find((m) => m.loop === "Smoky Mirrors")?.compensatingArchetype,
    "Smoky Mirrors should not have a distinct compensatingArchetype (self-compensating)"
  );
  assert(
    !LOOP_STRUCTURAL_METADATA.find((m) => m.loop === "Fortress")?.compensatingArchetype,
    "Fortress should not have a distinct compensatingArchetype (self-compensating)"
  );

  // Collide loops never get a compensatingArchetype (Collide = multiple
  // systems in conflict, not a single substitution). participatingArchetypes
  // is set only where the loop's own canonical content genuinely names two
  // active archetypes (Stalled Flame, Flooded Waters, Barren Ground); Mind
  // Maze is self-colliding (see docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md
  // Part 2) and deliberately has none, matching how Smoky Mirrors/Fortress
  // are self-compensating with no compensatingArchetype.
  const collideLoops = LOOP_STRUCTURAL_METADATA.filter((m) => m.formation === "Collide");
  assert(collideLoops.length === 4, `Expected 4 Collide loops, got ${collideLoops.length}`);
  collideLoops.forEach((m) => {
    assert(
      !m.compensatingArchetype,
      `${m.loop}: Collide-formation loops must not have a compensatingArchetype`
    );
  });

  const twoArchetypeCollideLoops = ["Stalled Flame", "Flooded Waters", "Barren Ground"];
  twoArchetypeCollideLoops.forEach((loopName) => {
    const m = LOOP_STRUCTURAL_METADATA.find((entry) => entry.loop === loopName)!;
    assert(
      Array.isArray(m.participatingArchetypes) && m.participatingArchetypes.length === 2,
      `${m.loop}: expected 2 participatingArchetypes, got ${JSON.stringify(m.participatingArchetypes)}`
    );
    assert(
      m.participatingArchetypes!.includes(m.injuredArchetype),
      `${m.loop}: participatingArchetypes should include its own injuredArchetype`
    );
  });

  assert(
    !LOOP_STRUCTURAL_METADATA.find((m) => m.loop === "Mind Maze")?.participatingArchetypes,
    "Mind Maze should not have participatingArchetypes (self-colliding, not two archetypes)"
  );

  // Collapse loops get neither - nothing is substituted in a withdrawal.
  const collapseLoops = LOOP_STRUCTURAL_METADATA.filter((m) => m.formation === "Collapse");
  assert(collapseLoops.length === 4, `Expected 4 Collapse loops, got ${collapseLoops.length}`);
  collapseLoops.forEach((m) => {
    assert(
      !m.compensatingArchetype && !m.participatingArchetypes,
      `${m.loop}: Collapse-formation loops must have neither compensatingArchetype nor participatingArchetypes`
    );
  });

  // integrationDirection must be defined for every loop and use the public
  // Integration Journey / Integrated Self names unchanged from loopPathMap.
  LOOP_STRUCTURAL_METADATA.forEach((m) => {
    assert(
      typeof m.integrationDirection?.path === "string" && m.integrationDirection.path.length > 0,
      `${m.loop}: integrationDirection.path missing`
    );
    assert(
      typeof m.integrationDirection?.integratedCapacity === "string" &&
        m.integrationDirection.integratedCapacity.length > 0,
      `${m.loop}: integrationDirection.integratedCapacity missing`
    );
  });
}

{
  // Report v2 payload: scoreAssessment's output already contains every field
  // the widened computedReportData snapshot (app/assessment/page.tsx) spreads
  // into the saved report - this is what guarantees "the full score snapshot
  // is saved" without needing a second, hand-maintained field list.
  const responses = buildResponses(highIds(idsForLoop("Fortress")), 3);
  const result = scoreAssessment(responses, orderedQuestions);

  assert(result.scoringVersion === "2.0", "AssessmentResult.scoringVersion should be '2.0'");

  const requiredFields = [
    "capacityScores",
    "loopScores",
    "archetypeScores",
    "formationScores",
    "primaryLoop",
    "secondaryLoop",
    "mostAvailableArchetype",
    "growthEdge",
    "growthEdgeArchetype",
    "resultClarity",
    "answerCompleteness",
  ] as const;

  requiredFields.forEach((field) => {
    assert(
      Object.prototype.hasOwnProperty.call(result, field),
      `AssessmentResult is missing required Report v2 field: ${field}`
    );
  });
}

{
  // Source-level guardrails: confirm the two Part 4 presentation fixes are
  // actually gated correctly in components/FullReport.tsx, not just present
  // in scoring.ts. This is a text-level check (no DOM/render harness exists
  // in this project - see docs/ASSESSMENT_V2_AUDIT.md Section 4, item 6) but
  // it catches the specific regression this task was asked to fix: labelling
  // integratedPercent as "Healthy Availability" unconditionally, or
  // recomputing Most Available Archetype locally for Report v2.
  const fullReportSource = readFileSync(
    resolve(__dirname, "../../components/FullReport.tsx"),
    "utf8"
  );

  assert(
    fullReportSource.includes("isV2") && fullReportSource.includes("healthyAvailability"),
    "FullReport.tsx should read healthyAvailability (not only integratedPercent) for Report v2"
  );
  assert(
    !/Healthy Availability:\s*\{item\.integratedPercent\}%/.test(fullReportSource),
    "FullReport.tsx must not unconditionally label integratedPercent as Healthy Availability"
  );
  assert(
    fullReportSource.includes("reportData?.mostAvailableArchetype") ||
      fullReportSource.includes("reportData.mostAvailableArchetype"),
    "FullReport.tsx should source Most Available Archetype from reportData.mostAvailableArchetype for Report v2"
  );
  assert(
    fullReportSource.includes("ArcheLoopWheel"),
    "FullReport.tsx should use the new ArcheLoopWheel component for Report v2"
  );
}

// ---------------------------------------------------------------------------------
// Part 5: response validity - extreme, contradictory, careless, and incomplete
// profiles (docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md)
// ---------------------------------------------------------------------------------

console.log("Part 5: response validity");

function loopsTiedAtMax(result: ReturnType<typeof scoreAssessment>): number {
  const top = result.loopScores[0]?.shadowActivationScore ?? 0;
  return result.loopScores.filter((l) => l.shadowActivationScore === top).length;
}

function allValue(value: number): number[] {
  return assessmentOrder.map(() => value);
}

function byLens(healthyValue: number, shadowValue: number): number[] {
  const healthyLenses = new Set(["Healthy Capacity", "Healthy Expression"]);
  return assessmentOrder.map((id) => {
    const q = questions.find((x) => x.id === id)!;
    return healthyLenses.has(q.lens) ? healthyValue : shadowValue;
  });
}

// Straight-line profiles (1-5): every loop ties at the same score, and the
// result must not present one of the 12 as a confidently distinguished
// Primary Loop - this is exactly the false-certainty risk the audit flags.
[1, 2, 3, 4, 5].forEach((value) => {
  const result = scoreAssessment(allValue(value), orderedQuestions);
  const expectedScore = { 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 }[value]!;

  assert(
    result.loopScores.every((l) => l.shadowActivationScore === expectedScore),
    `Straight-line ${value}: expected every loop at ${expectedScore}`
  );
  assert(
    loopsTiedAtMax(result) === 12,
    `Straight-line ${value}: expected all 12 loops tied, got ${loopsTiedAtMax(result)}`
  );
  assert(
    result.primaryLoopStatus === "Low Differentiation",
    `Straight-line ${value}: primaryLoopStatus should be "Low Differentiation", got ${result.primaryLoopStatus}`
  );
  assert(
    result.responseQuality.flags.includes("Flat Response Pattern"),
    `Straight-line ${value}: responseQuality should flag "Flat Response Pattern"`
  );
  assert(
    result.responseQuality.flags.includes("Low Answer Variability"),
    `Straight-line ${value}: responseQuality should flag "Low Answer Variability"`
  );
  // Deterministic: running the same input twice must produce the same result.
  const repeat = scoreAssessment(allValue(value), orderedQuestions);
  assert(
    JSON.stringify(result) === JSON.stringify(repeat),
    `Straight-line ${value}: result must be deterministic across repeated runs`
  );
});

// Straight-line 1/2/4/5 also read as indiscriminate agreement/disagreement.
{
  const r1 = scoreAssessment(allValue(1), orderedQuestions);
  assert(
    r1.responseQuality.flags.includes("Indiscriminate Disagreement"),
    "All-1 profile should flag Indiscriminate Disagreement"
  );
  const r2 = scoreAssessment(allValue(2), orderedQuestions);
  assert(
    r2.responseQuality.flags.includes("Indiscriminate Disagreement"),
    "All-2 profile should flag Indiscriminate Disagreement"
  );
  const r4 = scoreAssessment(allValue(4), orderedQuestions);
  assert(
    r4.responseQuality.flags.includes("Indiscriminate Agreement"),
    "All-4 profile should flag Indiscriminate Agreement"
  );
  const r5 = scoreAssessment(allValue(5), orderedQuestions);
  assert(
    r5.responseQuality.flags.includes("Indiscriminate Agreement"),
    "All-5 profile should flag Indiscriminate Agreement"
  );
}

// All-neutral (3): must not be presented with false certainty either.
{
  const result = scoreAssessment(allValue(3), orderedQuestions);
  assert(result.resultClarity === 50, `All-neutral: expected resultClarity 50, got ${result.resultClarity}`);
  assert(
    result.primaryLoopStatus === "Low Differentiation",
    "All-neutral: primaryLoopStatus should be Low Differentiation despite resultClarity's 50 floor - this is exactly why primaryLoopStatus exists as a separate signal from resultClarity"
  );
  assert(
    result.responseQuality.flags.includes("High Neutral Use"),
    "All-neutral: responseQuality should flag High Neutral Use"
  );
  assert(
    result.responseQuality.status === "Low Differentiation",
    `All-neutral: responseQuality.status should be "Low Differentiation", got ${result.responseQuality.status}`
  );
}

// Healthy=5 / Shadow=1: full Healthy Availability, zero Shadow Activation -
// no loop has genuine evidence, so this must not read as a confident result.
{
  const result = scoreAssessment(byLens(5, 1), orderedQuestions);
  assert(
    result.archetypeScores.every((a) => a.healthyAvailability === 100),
    "Healthy=5/Shadow=1: every archetype should show 100% Healthy Availability"
  );
  assert(
    result.archetypeScores.every((a) => a.shadowActivation === 0),
    "Healthy=5/Shadow=1: every archetype should show 0% Shadow Activation"
  );
  assert(
    result.primaryLoopStatus === "Low Differentiation",
    "Healthy=5/Shadow=1: primaryLoopStatus should be Low Differentiation (no loop has genuine Shadow evidence)"
  );
}

// Healthy=1 / Shadow=5: zero Healthy Availability, full Shadow Activation -
// strong pattern detected, but every loop ties, so still Low Differentiation
// at the Primary Loop level even though Shadow evidence is genuinely strong.
{
  const result = scoreAssessment(byLens(1, 5), orderedQuestions);
  assert(
    result.archetypeScores.every((a) => a.healthyAvailability === 0),
    "Healthy=1/Shadow=5: every archetype should show 0% Healthy Availability"
  );
  assert(
    result.archetypeScores.every((a) => a.shadowActivation === 100),
    "Healthy=1/Shadow=5: every archetype should show 100% Shadow Activation"
  );
  assert(
    result.primaryLoopStatus === "Low Differentiation",
    "Healthy=1/Shadow=5: primaryLoopStatus should be Low Differentiation (all 12 loops tie at maximum)"
  );
}

// Healthy=5 / Shadow=5: high-high across the entire instrument - flagged as
// broad endorsement, distinct from genuine contextual duality (see Profile H).
{
  const result = scoreAssessment(allValue(5), orderedQuestions);
  assert(
    result.responseQuality.flags.includes("High Healthy and Shadow Endorsement"),
    "Healthy=5/Shadow=5 (all-5): should flag High Healthy and Shadow Endorsement"
  );
  assert(
    result.responseQuality.healthyShadowContradictionRate === 1,
    `Healthy=5/Shadow=5: expected healthyShadowContradictionRate 1, got ${result.responseQuality.healthyShadowContradictionRate}`
  );
}

// One capacity high Healthy AND high Shadow, rest neutral: genuine contextual
// duality - both scores preserved (never netted), and NOT flagged as broad
// endorsement since only 1 of 12 capacities is high-high.
{
  const responses = assessmentOrder.map((id) => {
    const q = questions.find((x) => x.id === id)!;
    return q.developmentalCapacity === "Trust" ? 5 : 3;
  });
  const result = scoreAssessment(responses, orderedQuestions);
  const trustCapacity = result.capacityScores.find((c) => c.developmentalCapacity === "Trust")!;

  assert(
    trustCapacity.healthyAvailabilityScore === 100 && trustCapacity.shadowActivationScore === 100,
    `Trust capacity should show both Healthy=100 and Shadow=100 simultaneously, got Healthy=${trustCapacity.healthyAvailabilityScore} Shadow=${trustCapacity.shadowActivationScore}`
  );
  assert(
    result.primaryLoop?.loop === "Fortress",
    `Single-spiked Trust capacity should produce Fortress as Primary Loop, got ${result.primaryLoop?.loop}`
  );
  assert(
    result.primaryLoopStatus === "Detected",
    "Single-spiked capacity: primaryLoopStatus should be Detected (one clear winner)"
  );
  assert(
    !result.responseQuality.flags.includes("High Healthy and Shadow Endorsement"),
    "Single-spiked capacity: should NOT flag High Healthy and Shadow Endorsement (only 1 of 12 capacities is high-high, not broad endorsement)"
  );
}

// Alternating 5/1/5/1...: high raw variance (not flagged as low-variability),
// but the resulting loop scores still tie broadly due to the assessment's
// round-robin archetype ordering - flagged via Flat Response Pattern instead.
// This demonstrates why the two variance-based flags measure different things.
{
  const responses = assessmentOrder.map((_, i) => (i % 2 === 0 ? 5 : 1));
  const result = scoreAssessment(responses, orderedQuestions);

  assert(
    !result.responseQuality.flags.includes("Low Answer Variability"),
    "Alternating 5/1: raw answer variance is high, should NOT flag Low Answer Variability"
  );
  assert(
    loopsTiedAtMax(result) > 2,
    `Alternating 5/1: expected a broad tie at the top (got ${loopsTiedAtMax(result)} tied) despite high raw variance`
  );
  assert(
    result.responseQuality.flags.includes("Flat Response Pattern"),
    "Alternating 5/1: should flag Flat Response Pattern despite high raw answer variance"
  );
}

// Seeded deterministic random profiles: realistic, differentiated responses
// should NOT be flagged as low-differentiation, and must remain deterministic.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}
[1, 42, 12345].forEach((seed) => {
  const rand = seededRandom(seed);
  const responses = assessmentOrder.map(() => 1 + Math.floor(rand() * 5));
  const result = scoreAssessment(responses, orderedQuestions);
  const repeatRand = seededRandom(seed);
  const repeatResponses = assessmentOrder.map(() => 1 + Math.floor(repeatRand() * 5));
  const repeat = scoreAssessment(repeatResponses, orderedQuestions);

  assert(
    JSON.stringify(result) === JSON.stringify(repeat),
    `Seeded random (seed=${seed}): must be deterministic across repeated runs with the same seed`
  );
  assert(
    result.primaryLoopStatus === "Detected",
    `Seeded random (seed=${seed}): a genuinely differentiated random profile should not produce a false Low Differentiation result (tiedAtMax=${loopsTiedAtMax(result)})`
  );
  assert(
    result.answerCompleteness === 1,
    `Seeded random (seed=${seed}): expected full completeness`
  );
});

// Incomplete profiles: completeness must be reported honestly, and resultClarity
// must scale down rather than silently reusing the full-completion formula.
[1, 15, 30, 45, 59].forEach((n) => {
  const responses = assessmentOrder.map((_, i) =>
    i < n ? 3 : (undefined as unknown as number)
  );
  const result = scoreAssessment(responses, orderedQuestions);
  const expectedCompleteness = Math.round((n / 60) * 100) / 100;

  assert(
    Math.abs(result.answerCompleteness - expectedCompleteness) < 0.01,
    `Incomplete (${n} answered): expected answerCompleteness ~${expectedCompleteness}, got ${result.answerCompleteness}`
  );
  assert(
    result.loopScores.length === 12 && result.capacityScores.length === 12,
    `Incomplete (${n} answered): loopScores/capacityScores must still report all 12 entries`
  );
  assert(
    result.responseQuality.flags.includes("Incomplete Responses"),
    `Incomplete (${n} answered): responseQuality should flag Incomplete Responses`
  );
  assert(
    result.resultClarity <= 50,
    `Incomplete (${n} answered): resultClarity should never exceed the 50 (neutral-answer) ceiling for this fixture, got ${result.resultClarity}`
  );
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
