// ArcheLoop Report v2 — "Your Pattern Synthesis" paragraph builder.
//
// Pure, deterministic templating over already-computed report fields. Never
// recomputes any score itself (see docs/ASSESSMENT_SCORING_SPECIFICATION.md -
// this file only reads AssessmentResult output, it is not a second scoring
// engine). Produces two to three short, specific, educational, non-diagnostic
// paragraphs rather than one dense paragraph carrying every metric:
//
//   1. Primary structure   - Primary Loop, Developmental Capacity, Healthy
//                             Availability, Shadow Activation, Formation.
//   2. Supporting pattern   - Secondary Loop and how it may interact with the
//                             Primary Loop, plus Most Available Archetype.
//   3. Developmental direction - Growth Edge and Integration Direction,
//                             framed as a current pattern rather than a
//                             fixed identity.
//
// Falls back to a shorter one-or-two-paragraph version when v2-only fields
// (secondary loop, Most Available Archetype, Growth Edge, capacity-level
// scores) are unavailable - e.g. for legacy saved reports predating
// scoringVersion "2.0", or an otherwise-v2 report missing an optional field.
// buildPatternSynthesis() never implies Growth Edge caused the Primary Loop -
// paragraph 3 only ever describes Growth Edge as "where growth may matter
// most", never as an explanation for paragraph 1's pattern.

export type PatternSynthesisInput = {
  primaryLoopTitle: string;
  primaryArchetype: string;
  primaryFormation?: string; // "Collapse" | "Compensate" | "Collide"
  primaryCapacityName?: string;
  primaryHealthyAvailability?: number;
  primaryShadowActivation?: number;
  secondaryLoopTitle?: string;
  mostAvailableArchetype?: string;
  mostAvailableHealthyAvailability?: number;
  growthEdgeCapacity?: string;
  growthEdgeArchetype?: string;
};

const FORMATION_DESCRIPTION: Record<string, string> = {
  Collapse: "withdrawing rather than being expressed directly",
  Compensate: "substituting a protective imitation for direct expression",
  Collide: "getting caught between two competing responses",
};

export function buildPatternSynthesis(input: PatternSynthesisInput): string[] {
  const {
    primaryLoopTitle,
    primaryArchetype,
    primaryFormation,
    primaryCapacityName,
    primaryHealthyAvailability,
    primaryShadowActivation,
    secondaryLoopTitle,
    mostAvailableArchetype,
    mostAvailableHealthyAvailability,
    growthEdgeCapacity,
    growthEdgeArchetype,
  } = input;

  const hasFullV2Data =
    typeof primaryHealthyAvailability === "number" &&
    typeof primaryShadowActivation === "number" &&
    !!primaryCapacityName &&
    !!mostAvailableArchetype;

  if (!hasFullV2Data) {
    const paragraphs: string[] = [
      `Your results point to ${primaryLoopTitle} as the strongest protective pattern currently active, centred in ${primaryArchetype}.`,
    ];

    if (secondaryLoopTitle) {
      paragraphs.push(
        `${secondaryLoopTitle} appears alongside it as a supporting pattern, sometimes reinforcing it under pressure.`
      );
    }

    paragraphs.push(
      "As you build awareness of when this pattern activates, it gradually becomes something you can recognise and interrupt rather than something that runs automatically. This is a description of your current pattern, not a fixed identity."
    );

    return paragraphs;
  }

  // Paragraph 1 — primary structure.
  const formationClause = primaryFormation
    ? ` through ${primaryFormation.toLowerCase()} — ${
        FORMATION_DESCRIPTION[primaryFormation] ?? "a protective response"
      }`
    : "";

  const paragraphs: string[] = [
    `Your results suggest that ${primaryCapacityName} is currently protected${formationClause}, showing up as ${primaryLoopTitle} within ${primaryArchetype} (${primaryHealthyAvailability}% Healthy Availability alongside ${primaryShadowActivation}% Shadow Activation for this capacity).`,
  ];

  // Paragraph 2 — supporting pattern.
  const supportingSentences: string[] = [];

  if (secondaryLoopTitle) {
    supportingSentences.push(
      `${secondaryLoopTitle} appears as a supporting pattern, and can reinforce ${primaryLoopTitle} rather than activating on its own.`
    );
  }

  if (
    mostAvailableArchetype &&
    typeof mostAvailableHealthyAvailability === "number"
  ) {
    supportingSentences.push(
      `Meanwhile, healthy access to ${mostAvailableArchetype} capacities remains comparatively available (${mostAvailableHealthyAvailability}% Healthy Availability) — currently the most available of the four Archetypes.`
    );
  }

  if (supportingSentences.length > 0) {
    paragraphs.push(supportingSentences.join(" "));
  }

  // Paragraph 3 — developmental direction. Growth Edge is presented only as
  // "where growth may matter most", never as a cause of the Primary Loop.
  const directionSentences: string[] = [];

  if (growthEdgeCapacity && growthEdgeArchetype) {
    directionSentences.push(
      `${growthEdgeCapacity}, within ${growthEdgeArchetype}, is the capacity where increasing Healthy Availability may matter most right now — this does not mean it caused ${primaryLoopTitle}.`
    );
  }

  directionSentences.push(
    "This is a description of your current pattern, not a fixed identity — it is educational information intended to support your own self-understanding, not a diagnosis."
  );

  paragraphs.push(directionSentences.join(" "));

  return paragraphs;
}
