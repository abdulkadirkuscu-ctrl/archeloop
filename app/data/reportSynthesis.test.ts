// Guardrail tests for the ArcheLoop Premium Report v2 refinement pass.
//
// This is a source-level validation script, not a DOM/rendering test - the
// project has no DOM test framework (see docs/ASSESSMENT_V2_AUDIT.md Section
// 4, item 6, and docs/ASSESSMENT_SCORING_SPECIFICATION.md Section 17). It
// covers two things:
//
//   1. app/data/reportSynthesis.ts's buildPatternSynthesis() - a pure
//      function, fully testable in isolation.
//   2. Static assertions against the components/FullReport.tsx and
//      components/ArcheLoopWheel.tsx source text, confirming specific
//      strings are (or are not) present. This cannot verify runtime
//      rendering, layout, or visual behaviour - those were verified by code
//      inspection while writing the report refinement pass (chapter
//      structure, self-compensating card gating, low-differentiation
//      framing, dedup of repeated sections). Anything that depends on
//      actual DOM output (spacing, responsive stacking, print layout,
//      on-wheel label collision) is documented as "verified by code
//      inspection" in the final report, not asserted here.
//
// Run with:
//   node --experimental-strip-types app/data/reportSynthesis.test.ts

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildPatternSynthesis } from "./reportSynthesis.ts";
import { LOOP_STRUCTURAL_METADATA_BY_LOOP } from "./loopStructuralMetadata.ts";

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
// Part 1: buildPatternSynthesis - full v2 data
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

assert(fullSynthesis.includes("Trust"), "full synthesis should mention the primary capacity name");
assert(fullSynthesis.includes("Fortress Loop"), "full synthesis should mention the primary loop title");
assert(fullSynthesis.includes("Warrior"), "full synthesis should mention the primary archetype");
assert(fullSynthesis.includes("58%"), "full synthesis should include the actual Healthy Availability number");
assert(fullSynthesis.includes("82%"), "full synthesis should include the actual Shadow Activation number");
assert(fullSynthesis.includes("Mind Maze Loop"), "full synthesis should mention the secondary loop");
assert(fullSynthesis.includes("Magician"), "full synthesis should mention Most Available Archetype");
assert(fullSynthesis.includes("74%"), "full synthesis should include Most Available Archetype's Healthy Availability");
assert(
  fullSynthesis.includes("educational") || fullSynthesis.includes("not a diagnosis"),
  "full synthesis must remain educational/non-diagnostic"
);
assert(!fullSynthesis.includes("undefined"), "full synthesis must never leak 'undefined'");
assert(!fullSynthesis.includes("NaN"), "full synthesis must never leak 'NaN'");

// ---------------------------------------------------------------------------------
// Part 2: buildPatternSynthesis - legacy / missing-field fallback
// ---------------------------------------------------------------------------------

console.log("Part 2: buildPatternSynthesis - legacy / missing-field fallback");

const legacySynthesis = buildPatternSynthesis({
  primaryLoopTitle: "Emotional Lockdown Loop",
  primaryArchetype: "Lover",
  secondaryLoopTitle: "Fortress Loop",
});

assert(
  legacySynthesis.includes("Emotional Lockdown Loop"),
  "legacy fallback should still mention the primary loop title"
);
assert(legacySynthesis.includes("Lover"), "legacy fallback should still mention the primary archetype");
assert(legacySynthesis.includes("Fortress Loop"), "legacy fallback should mention the secondary loop when given");
assert(!legacySynthesis.includes("undefined"), "legacy fallback must never leak 'undefined'");
assert(!legacySynthesis.includes("NaN"), "legacy fallback must never leak 'NaN'");

const minimalSynthesis = buildPatternSynthesis({
  primaryLoopTitle: "Blank Page Loop",
  primaryArchetype: "Magician",
});

assert(
  minimalSynthesis.includes("Blank Page Loop"),
  "minimal input (no secondary loop, no v2 fields) should still produce a usable sentence"
);
assert(!minimalSynthesis.includes("undefined"), "minimal input must never leak 'undefined'");

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

assert(
  !partialV2Synthesis.includes("undefined") && !partialV2Synthesis.includes("NaN"),
  "partial v2 input (missing Most Available Archetype / Growth Edge) must degrade gracefully"
);

// ---------------------------------------------------------------------------------
// Part 3: FullReport.tsx source-level guardrails
// ---------------------------------------------------------------------------------

console.log("Part 3: FullReport.tsx source-level guardrails");

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

// Distinct Compensating Archetype cases.
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Paper Crown"].compensatingArchetype === "Magician",
  "Paper Crown must display Magician as its Compensating Archetype"
);
assert(
  LOOP_STRUCTURAL_METADATA_BY_LOOP["Fantasy Fog"].compensatingArchetype === "Magician",
  "Fantasy Fog must display Magician as its Compensating Archetype"
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

// Detected-result hero must remain for normal profiles.
assert(
  fullReportSourceNormalised.includes(
    "as your primary pattern. This report interprets what that means specifically"
  ),
  "Detected-result hero copy must remain unchanged for normal profiles"
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

// Personalised synthesis section exists and is wired to buildPatternSynthesis.
assert(
  fullReportSource.includes('kicker="Your Pattern Synthesis"'),
  "expected a 'Your Pattern Synthesis' section"
);
assert(
  fullReportSource.includes("buildPatternSynthesis("),
  "'Your Pattern Synthesis' section must be driven by buildPatternSynthesis(), not static copy"
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
// Part 4: ArcheLoopWheel.tsx source-level guardrails
// ---------------------------------------------------------------------------------

console.log("Part 4: ArcheLoopWheel.tsx source-level guardrails");

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

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
