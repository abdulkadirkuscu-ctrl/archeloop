// Guardrail tests for the ArcheLoop Premium Report v2 refinement passes.
//
// This is a source-level validation script, not a DOM/rendering test - the
// project has no DOM test framework (see docs/ASSESSMENT_V2_AUDIT.md Section
// 4, item 6, and docs/ASSESSMENT_SCORING_SPECIFICATION.md Section 17). It
// covers:
//
//   1. app/data/reportSynthesis.ts's buildPatternSynthesis() - a pure
//      function, fully testable in isolation.
//   2. app/data/reportInterpretations.ts's deterministic sentence builders
//      (hero interpretation, chart interpretation sentences, activation
//      descriptor bands, Developmental Direction synthesis) - also pure.
//   3. Static assertions against the components/FullReport.tsx and
//      components/ArcheLoopWheel.tsx source text, confirming specific
//      strings are (or are not) present. This cannot verify runtime
//      rendering, layout, or visual behaviour (spacing, responsive
//      stacking, print pagination, on-wheel label collision) - those were
//      verified by code inspection while writing the report visual/
//      narrative polish pass, and are documented as such in the final
//      report rather than asserted here.
//
// Run with:
//   node --experimental-strip-types app/data/reportSynthesis.test.ts

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildPatternSynthesis } from "./reportSynthesis.ts";
import { LOOP_STRUCTURAL_METADATA_BY_LOOP, LOOP_STRUCTURAL_METADATA } from "./loopStructuralMetadata.ts";
import {
  buildHeroInterpretation,
  getActivationDescriptor,
  buildWheelInterpretation,
  buildTwelveCapacityInterpretation,
  buildFormationInterpretation,
  buildLoopLandscapeInterpretation,
  buildDevelopmentalDirectionSynthesis,
  joinWithAnd,
} from "./reportInterpretations.ts";

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

// ---------------------------------------------------------------------------------
// Part 1: buildPatternSynthesis - full v2 data (now 2-3 paragraphs)
// ---------------------------------------------------------------------------------

console.log("Part 1: buildPatternSynthesis - full v2 data");

const fullSynthesis = buildPatternSynthesis({
  primaryLoopTitle: "Fortress Loop",
  primaryArchetype: "Warrior",
  primaryFormation: "Compensate",
  primaryCapacityName: "Trust",
  primaryHealthyAvailability: 58,
  primaryShadowActivation: 82,
  secondaryLoopTitle: "Mind Maze Loop",
  mostAvailableArchetype: "Magician",
  mostAvailableHealthyAvailability: 74,
  growthEdgeCapacity: "Trust",
  growthEdgeArchetype: "Warrior",
});

assert(Array.isArray(fullSynthesis), "buildPatternSynthesis must return an array of paragraphs");
assert(
  fullSynthesis.length === 2 || fullSynthesis.length === 3,
  `full v2 data should produce two or three paragraphs, got ${fullSynthesis.length}`
);

const fullSynthesisJoined = fullSynthesis.join(" ");

assert(fullSynthesisJoined.includes("Trust"), "full synthesis should mention the primary capacity name");
assert(fullSynthesisJoined.includes("Fortress Loop"), "full synthesis should mention the primary loop title");
assert(fullSynthesisJoined.includes("Warrior"), "full synthesis should mention the primary archetype");
assert(fullSynthesisJoined.includes("58%"), "full synthesis should include the actual Healthy Availability number");
assert(fullSynthesisJoined.includes("82%"), "full synthesis should include the actual Shadow Activation number");
assert(fullSynthesisJoined.includes("Mind Maze Loop"), "full synthesis should mention the secondary loop");
assert(fullSynthesisJoined.includes("Magician"), "full synthesis should mention Most Available Archetype");
assert(fullSynthesisJoined.includes("74%"), "full synthesis should include Most Available Archetype's Healthy Availability");
assert(
  fullSynthesisJoined.includes("educational") || fullSynthesisJoined.includes("not a diagnosis"),
  "full synthesis must remain educational/non-diagnostic"
);
assert(
  fullSynthesisJoined.includes("does not mean it caused"),
  "synthesis must explicitly disclaim that Growth Edge caused the Primary Loop, not merely imply it"
);
assert(!fullSynthesisJoined.includes("undefined"), "full synthesis must never leak 'undefined'");
assert(!fullSynthesisJoined.includes("NaN"), "full synthesis must never leak 'NaN'");

// ---------------------------------------------------------------------------------
// Part 2: buildPatternSynthesis - legacy / missing-field fallback
// ---------------------------------------------------------------------------------

console.log("Part 2: buildPatternSynthesis - legacy / missing-field fallback");

const legacySynthesis = buildPatternSynthesis({
  primaryLoopTitle: "Emotional Lockdown Loop",
  primaryArchetype: "Lover",
  secondaryLoopTitle: "Fortress Loop",
});

assert(Array.isArray(legacySynthesis), "legacy fallback must also return an array of paragraphs");
const legacyJoined = legacySynthesis.join(" ");

assert(
  legacyJoined.includes("Emotional Lockdown Loop"),
  "legacy fallback should still mention the primary loop title"
);
assert(legacyJoined.includes("Lover"), "legacy fallback should still mention the primary archetype");
assert(legacyJoined.includes("Fortress Loop"), "legacy fallback should mention the secondary loop when given");
assert(!legacyJoined.includes("undefined"), "legacy fallback must never leak 'undefined'");
assert(!legacyJoined.includes("NaN"), "legacy fallback must never leak 'NaN'");

const minimalSynthesis = buildPatternSynthesis({
  primaryLoopTitle: "Blank Page Loop",
  primaryArchetype: "Magician",
});

assert(Array.isArray(minimalSynthesis) && minimalSynthesis.length > 0, "minimal input must still produce paragraphs");
assert(
  minimalSynthesis.join(" ").includes("Blank Page Loop"),
  "minimal input (no secondary loop, no v2 fields) should still produce a usable sentence"
);
assert(!minimalSynthesis.join(" ").includes("undefined"), "minimal input must never leak 'undefined'");

// A v2-shaped report missing only the optional Most Available Archetype /
// Growth Edge fields (e.g. an edge-case snapshot) must still degrade
// gracefully rather than throwing or emitting broken text.
const partialV2Synthesis = buildPatternSynthesis({
  primaryLoopTitle: "Smoky Mirrors Loop",
  primaryArchetype: "Magician",
  primaryFormation: "Compensate",
  primaryCapacityName: "Truth",
  primaryHealthyAvailability: 40,
  primaryShadowActivation: 65,
});

const partialJoined = partialV2Synthesis.join(" ");
assert(
  !partialJoined.includes("undefined") && !partialJoined.includes("NaN"),
  "partial v2 input (missing Most Available Archetype / Growth Edge) must degrade gracefully"
);

// ---------------------------------------------------------------------------------
// Part 3: reportInterpretations.ts - hero interpretation and activation bands
// ---------------------------------------------------------------------------------

console.log("Part 3: reportInterpretations.ts - hero interpretation and activation bands");

const heroSentence = buildHeroInterpretation("Trust", "Warrior", [
  "Emotional walls",
  "Hyper-independence",
  "Control",
  "Guardedness",
]);
assert(heroSentence.includes("Trust"), "hero interpretation must mention the Developmental Capacity");
assert(
  heroSentence.includes("emotional walls") && heroSentence.includes("hyper-independence"),
  "hero interpretation must use the loop's own observable behaviours, lowercased"
);
assert(
  !heroSentence.includes("Guardedness".toLowerCase() + ".") || heroSentence.split(",").length <= 4,
  "hero interpretation should use at most the first three observable behaviours"
);

const heroSentenceNoBehaviours = buildHeroInterpretation("Clarity", "Magician", []);
assert(
  heroSentenceNoBehaviours.includes("Clarity") && heroSentenceNoBehaviours.includes("Magician"),
  "hero interpretation must degrade gracefully with no observable behaviours"
);

// Bands are display-only: 0-24 Low, 25-49 Emerging, 50-74 Moderate,
// 75-89 High, 90-100 Very high.
assert(getActivationDescriptor(0) === "Low activation", "0% must be Low activation");
assert(getActivationDescriptor(24) === "Low activation", "24% must still be Low activation");
assert(getActivationDescriptor(25) === "Emerging activation", "25% must be Emerging activation");
assert(getActivationDescriptor(49) === "Emerging activation", "49% must still be Emerging activation");
assert(getActivationDescriptor(50) === "Moderate activation", "50% must be Moderate activation");
assert(getActivationDescriptor(74) === "Moderate activation", "74% must still be Moderate activation");
assert(getActivationDescriptor(75) === "High activation", "75% must be High activation");
assert(getActivationDescriptor(89) === "High activation", "89% must still be High activation");
assert(getActivationDescriptor(90) === "Very high activation", "90% must be Very high activation");
assert(getActivationDescriptor(100) === "Very high activation", "100% must be Very high activation");

assert(joinWithAnd(["A"]) === "A", "joinWithAnd must handle a single item");
assert(joinWithAnd(["A", "B"]) === "A and B", "joinWithAnd must join two items with 'and'");
assert(
  joinWithAnd(["A", "B", "C"]) === "A, B, and C",
  "joinWithAnd must Oxford-comma-join three or more items"
);

// ---------------------------------------------------------------------------------
// Part 4: reportInterpretations.ts - chart interpretation sentences
// ---------------------------------------------------------------------------------

console.log("Part 4: reportInterpretations.ts - chart interpretation sentences");

const wheelSentence = buildWheelInterpretation([
  { archetype: "Sovereign", healthyAvailability: 40, shadowActivation: 30 },
  { archetype: "Magician", healthyAvailability: 80, shadowActivation: 20 },
  { archetype: "Lover", healthyAvailability: 55, shadowActivation: 45 },
  { archetype: "Warrior", healthyAvailability: 50, shadowActivation: 90 },
]);
assert(
  wheelSentence.includes("Magician") && wheelSentence.includes("Warrior"),
  "Wheel interpretation must name the actual Healthy Availability and Shadow Activation leaders"
);

const wheelSameLeaderSentence = buildWheelInterpretation([
  { archetype: "Sovereign", healthyAvailability: 90, shadowActivation: 90 },
  { archetype: "Magician", healthyAvailability: 40, shadowActivation: 40 },
  { archetype: "Lover", healthyAvailability: 30, shadowActivation: 30 },
  { archetype: "Warrior", healthyAvailability: 20, shadowActivation: 20 },
]);
assert(
  wheelSameLeaderSentence.includes("Sovereign") &&
    wheelSameLeaderSentence.toLowerCase().includes("independent"),
  "Wheel interpretation must handle one Archetype leading both measurements without implying they are the same thing"
);

const capacityInterpretation = buildTwelveCapacityInterpretation([
  { developmentalCapacity: "Trust", healthyAvailabilityScore: 40, shadowActivationScore: 90 },
  { developmentalCapacity: "Worth", healthyAvailabilityScore: 85, shadowActivationScore: 20 },
  { developmentalCapacity: "Truth", healthyAvailabilityScore: 80, shadowActivationScore: 15 },
  { developmentalCapacity: "Vitality", healthyAvailabilityScore: 30, shadowActivationScore: 10 },
]);
assert(
  capacityInterpretation.includes("Trust") &&
    capacityInterpretation.includes("Worth") &&
    capacityInterpretation.includes("Truth"),
  "Twelve-Capacity interpretation must name the most-protected capacity and the strongest-available capacities"
);

const formationInterpretation = buildFormationInterpretation({
  collapse: 30,
  compensate: 40,
  collide: 75,
});
assert(
  formationInterpretation.startsWith("Collide is currently the most active Protective Formation"),
  "Formation interpretation must name the actual leading Formation"
);
assert(
  formationInterpretation.includes("internal conflict is more prominent than withdrawal or protective substitution"),
  "Formation interpretation must describe the leading Formation relative to the other two"
);

const loopLandscapeInterpretation = buildLoopLandscapeInterpretation([
  { loop: "Fortress", score: 88 },
  { loop: "Mind Maze", score: 80 },
  { loop: "Compliance", score: 40 },
]);
assert(
  loopLandscapeInterpretation.includes("Fortress") && loopLandscapeInterpretation.includes("Mind Maze"),
  "Loop Landscape interpretation must name the actual top two loops"
);
assert(
  loopLandscapeInterpretation.includes("closely related"),
  "Loop Landscape interpretation must flag a close gap between Primary and Secondary as closely related"
);

const loopLandscapeWideGap = buildLoopLandscapeInterpretation([
  { loop: "Fortress", score: 95 },
  { loop: "Mind Maze", score: 40 },
]);
assert(
  !loopLandscapeWideGap.includes("closely related"),
  "Loop Landscape interpretation must not call a wide gap 'closely related'"
);

// ---------------------------------------------------------------------------------
// Part 5: Developmental Direction synthesis - distinctness
// ---------------------------------------------------------------------------------

console.log("Part 5: Developmental Direction synthesis - distinctness");

const directionSynthesis = buildDevelopmentalDirectionSynthesis({
  mostAvailableArchetype: "Magician",
  growthEdgeCapacity: "Trust",
  growthEdgeArchetype: "Warrior",
  integrationPath: "Trust Path",
  integratedSelf: "Connected Strength",
});
assert(directionSynthesis.includes("Magician"), "direction synthesis must name Most Available Archetype");
assert(directionSynthesis.includes("Trust"), "direction synthesis must name Growth Edge capacity");
assert(directionSynthesis.includes("Trust Path"), "direction synthesis must name the Integration Direction path");
assert(
  directionSynthesis.includes("Connected Strength"),
  "direction synthesis must name the Integrated Self"
);
assert(
  directionSynthesis.includes("did not cause"),
  "direction synthesis must explicitly state Growth Edge did not cause the Primary Loop"
);
assert(
  directionSynthesis.includes("separate things"),
  "direction synthesis must explicitly keep Most Available Archetype, Growth Edge, and Integration Direction distinct"
);

// ---------------------------------------------------------------------------------
// Part 6: FullReport.tsx source-level guardrails
// ---------------------------------------------------------------------------------

console.log("Part 6: FullReport.tsx source-level guardrails");

const fullReportSource = readFileSync(
  resolve(__dirname, "../../components/FullReport.tsx"),
  "utf-8"
);

// JSX text nodes wrap across source lines with arbitrary indentation, so
// prose-matching assertions below compare against whitespace-normalised
// source rather than the raw file text.
const fullReportSourceNormalised = fullReportSource.replace(/\s+/g, " ");

// Report v2 must never present integratedPercent as Healthy Availability or
// "healthy integration" - that sentence must survive only inside the legacy
// (!isV2) branch, exactly once.
const healthyIntegrationOccurrences = (
  fullReportSource.match(/healthy integration currently available/g) || []
).length;
assert(
  healthyIntegrationOccurrences === 1,
  `expected exactly 1 occurrence of the legacy "healthy integration" sentence, found ${healthyIntegrationOccurrences}`
);
assert(
  fullReportSource.includes('kicker="Archetype Pattern"'),
  "Report v2 must have a distinct 'Archetype Pattern' section replacing the legacy 'Archetype Integration' copy"
);
assert(
  fullReportSource.includes("never netted into a single score"),
  "Report v2 Archetype Pattern section must state Healthy Availability / Shadow Activation are not netted"
);

// Self-compensating presentation (Smoky Mirrors, Fortress) - no invented
// second Archetype.
assert(
  fullReportSource.includes("Self-compensating ${structuralMetadata.injuredArchetype}"),
  "Structural Dynamic section must render a Self-compensating card driven by the injured Archetype, not a separate invented Archetype"
);
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Smoky Mirrors"].compensatingArchetype === undefined &&
    LOOP_STRUCTURAL_METADATA_BY_LOOP["Smoky Mirrors"].formation === "Compensate",
  "Smoky Mirrors must be self-compensating (Compensate formation, no distinct Compensating Archetype)"
);
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Fortress"].compensatingArchetype === undefined &&
    LOOP_STRUCTURAL_METADATA_BY_LOOP["Fortress"].formation === "Compensate",
  "Fortress must be self-compensating (Compensate formation, no distinct Compensating Archetype)"
);

// Distinct Compensating Archetype cases - and only these two.
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Paper Crown"].compensatingArchetype === "Magician",
  "Paper Crown must display Magician as its Compensating Archetype"
);
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Fantasy Fog"].compensatingArchetype === "Magician",
  "Fantasy Fog must display Magician as its Compensating Archetype"
);
const compensatingArchetypeCount = LOOP_STRUCTURAL_METADATA.filter(
  (entry) => entry.compensatingArchetype !== undefined
).length;
assert(
  compensatingArchetypeCount === 2,
  `expected exactly 2 loops with a distinct Compensating Archetype, found ${compensatingArchetypeCount}`
);

// Mind Maze: self-colliding, no Participating Archetype.
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Mind Maze"].participatingArchetypes === undefined,
  "Mind Maze must have no Participating Archetypes (self-colliding)"
);

// Collapse loops: no Compensating/Participating Archetype card should ever
// be shown - confirmed structurally (metadata has neither field), and the
// FullReport ternary only renders a card when one of the three is present.
for (const loop of ["Dimmed Light", "Blank Page", "Emotional Lockdown", "Compliance"] as const) {
  const meta = LOOP_STRUCTURAL_METADATA_BY_LOOP[loop];
  assert(
    meta.compensatingArchetype === undefined && meta.participatingArchetypes === undefined,
    `${loop} (Collapse) must have neither a Compensating nor a Participating Archetype`
  );
}

// Low-differentiation hero copy.
assert(
  fullReportSourceNormalised.includes(
    "Your responses did not produce one clearly dominant Shadow Loop."
  ),
  "Low-differentiation hero copy must be present"
);
assert(
  fullReportSourceNormalised.includes(
    "this report is best read as a broader map of your current protective patterns rather than one definitive result"
  ),
  "Low-differentiation hero copy must frame the report as a broader pattern map"
);

// Five-chapter structure.
for (const chapterTitle of [
  "Your Result",
  "Your Current Structure",
  "Your Pattern Map",
  "How It Shows Up",
  "Your Integration Direction",
]) {
  assert(
    fullReportSource.includes(chapterTitle),
    `expected chapter heading "${chapterTitle}" to be present`
  );
}

// Chapter Four clusters (Section 11 of this task).
for (const clusterLabel of ["In Relationships", "Under Pressure", "How the Loop Escalates"]) {
  assert(
    fullReportSource.includes(clusterLabel),
    `expected Chapter Four cluster "${clusterLabel}" to be present`
  );
}

// Developmental Direction (Section 10): Growth Edge and Integration
// Direction must never be merged into one labelled block.
for (const label of [
  "Your Current Strength",
  "Your Current Growth Edge",
  "Your Integration Direction",
  "Why This Matters",
]) {
  assert(
    fullReportSource.includes(label),
    `expected distinct Developmental Direction label "${label}" to be present`
  );
}
assert(
  fullReportSource.includes("buildDevelopmentalDirectionSynthesis("),
  "Developmental Direction 'Why This Matters' must be driven by buildDevelopmentalDirectionSynthesis(), not static copy"
);

// Integration Timeline (Section 12).
assert(
  fullReportSource.includes("INTEGRATION_TIMELINE_STAGES"),
  "Chapter Five must render the Integration Timeline"
);
assert(
  fullReportSourceNormalised.includes(
    "Integration is rarely linear. These stages may repeat as new situations activate the pattern."
  ),
  "Integration Timeline must include the non-linear disclaimer"
);
// The Current-Loop/Journey/Integrated-Self triad must appear near the hero
// (Chapter One's PathCard row) and once more in the final Integration
// Direction chapter (now the Timeline) - not as a third, separate InfoCard
// grid inside the Integration Blueprint.
assert(
  !fullReportSource.includes('label="Current Loop"'),
  "the old third Current Loop/Journey/Integrated Self InfoCard grid must be replaced by the Integration Timeline"
);

// Personalised synthesis section exists, is wired to buildPatternSynthesis,
// and renders multiple paragraphs (not one dense block).
assert(
  fullReportSource.includes('kicker="Your Pattern Synthesis"'),
  "expected a 'Your Pattern Synthesis' section"
);
assert(
  fullReportSource.includes("patternSynthesisParagraphs.map("),
  "'Your Pattern Synthesis' section must render each paragraph from buildPatternSynthesis(), not one joined string"
);

// Hero interpretation (Section 1): built deterministically, not hard-coded.
// Genericity of buildHeroInterpretation() itself (one template applied to
// every loop's own observableBehaviours, no per-loop branching) is unit
// tested directly in Part 3 - this only confirms FullReport wires the hero
// to that function rather than to static per-loop copy.
assert(
  fullReportSource.includes("buildHeroInterpretation("),
  "hero must render a sentence built by buildHeroInterpretation(), not static per-loop copy"
);

// Chart interpretation sentences (Section 8) are wired to real score data.
for (const call of [
  "buildTwelveCapacityInterpretation(capacityScores)",
  "buildFormationInterpretation(reportData.formationScores)",
  "buildLoopLandscapeInterpretation(loopLandscape)",
]) {
  assert(
    fullReportSource.includes(call),
    `expected chart interpretation call: ${call}`
  );
}

// Activation descriptor bands (Section 9) - display-only, wired to real
// Loop Landscape scores, never altering them.
assert(
  fullReportSource.includes("getActivationDescriptor(item.score)"),
  "Loop Landscape rows must render an activation descriptor alongside the percentage"
);

// Card hierarchy (Section 6): signature visuals promoted, narrative
// sections de-emphasised from bordered cards.
for (const marker of ["al-feature-card", "al-panel-card", "al-narrative-block"]) {
  assert(
    fullReportSource.includes(marker),
    `expected card-hierarchy class "${marker}" to be used`
  );
}

// Healthy Availability and Shadow Activation remain independently
// displayed - every score section still exposes both labels as separate
// values (a subtraction used only for internal branching in
// buildArchetypeRelationshipCopy, approved in the prior report pass, is not
// a "netted display" - it never appears in rendered output).
assert(
  (fullReportSource.match(/Healthy Availability/g) || []).length >= 5 &&
    (fullReportSource.match(/Shadow Activation/g) || []).length >= 5,
  "Healthy Availability and Shadow Activation must both keep appearing as independently labelled values throughout the report"
);

// Terminology audit: no banned public copy patterns rendered as literal JSX
// text. This intentionally checks for text-node patterns (">Word<") rather
// than bare substrings, since legitimate non-public uses exist elsewhere in
// this same file (e.g. `formatMechanism()`'s internal string comparisons
// against legacy data values, and legacy field names like
// `suppressionPercent` that are never displayed as literal words).
const bannedTextPatterns = [
  ">Weak Archetype<",
  ">Response Style<",
  ">Suppression<",
  ">Compensation<",
  ">Collision<",
  ">Inflated ",
  "Low Integration",
];
for (const pattern of bannedTextPatterns) {
  assert(
    !fullReportSource.includes(pattern),
    `FullReport.tsx must not render banned public copy pattern: ${pattern}`
  );
}

// Legacy rendering paths must remain intact.
for (const legacyMarker of [
  "ArchetypeCompass",
  "detail.structuralDynamic",
  "archetypeInsight.low",
  "item.integratedPercent",
]) {
  assert(
    fullReportSource.includes(legacyMarker),
    `legacy rendering path marker missing: ${legacyMarker}`
  );
}

// ---------------------------------------------------------------------------------
// Part 7: ArcheLoopWheel.tsx source-level guardrails
// ---------------------------------------------------------------------------------

console.log("Part 7: ArcheLoopWheel.tsx source-level guardrails");

const wheelSource = readFileSync(
  resolve(__dirname, "../../components/ArcheLoopWheel.tsx"),
  "utf-8"
);

assert(
  wheelSource.includes("healthy-value") && wheelSource.includes("shadow-value"),
  "ArcheLoop Wheel must render on-wheel numeric labels (no hover required)"
);
assert(
  !/\bhover:/.test(wheelSource),
  "ArcheLoop Wheel must not require hover to reveal any value"
);
assert(
  wheelSource.includes("buildWheelInterpretation("),
  "ArcheLoop Wheel must render its own chart-interpretation sentence"
);
assert(
  (wheelSource.match(/aria-hidden="true"/g) || []).length >= 3,
  "ArcheLoop Wheel must mark decorative shapes aria-hidden"
);

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
