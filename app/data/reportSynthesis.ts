// ArcheLoop Report v2 — "Your Pattern Synthesis" paragraph builder.
//
// Pure, deterministic templating over already-computed report fields. Never
// recomputes any score itself (see docs/ASSESSMENT_SCORING_SPECIFICATION.md -
// this file only reads AssessmentResult output, it is not a second scoring
// engine). Produces a short, specific, educational, non-diagnostic paragraph.
//
// Falls back to a simpler paragraph when v2-only fields (secondary loop,
// Most Available Archetype, Growth Edge, capacity-level scores) are
// unavailable - e.g. for legacy saved reports predating scoringVersion "2.0",
// or an otherwise-v2 report missing an optional field.

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

export function buildPatternSynthesis(input: PatternSynthesisInput): string {
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
    const sentences = [
      `Your results point to ${primaryLoopTitle} as the strongest protective pattern currently active, centred in ${primaryArchetype}.`,
    ];

    if (secondaryLoopTitle) {
      sentences.push(
        `${secondaryLoopTitle} appears alongside it as a supporting pattern.`
      );
    }

    sentences.push(
      "As you build awareness of when this pattern activates, it gradually becomes something you can recognise and interrupt rather than something that runs automatically."
    );

    return sentences.join(" ");
  }

  const formationClause = primaryFormation
    ? ` through ${primaryFormation.toLowerCase()} — ${
        FORMATION_DESCRIPTION[primaryFormation] ?? "a protective response"
      }`
    : "";

  const sentences: string[] = [
    `Your results suggest that ${primaryCapacityName} is currently protected${formationClause}, showing up as ${primaryLoopTitle} within ${primaryArchetype} (${primaryHealthyAvailability}% Healthy Availability alongside ${primaryShadowActivation}% Shadow Activation for this capacity).`,
  ];

  if (secondaryLoopTitle) {
    sentences.push(
      `${secondaryLoopTitle} appears as a supporting pattern alongside it.`
    );
  }

  if (
    mostAvailableArchetype &&
    typeof mostAvailableHealthyAvailability === "number"
  ) {
    sentences.push(
      `Meanwhile, healthy access to ${mostAvailableArchetype} capacities remains comparatively available (${mostAvailableHealthyAvailability}% Healthy Availability) — currently the most available of the four Archetypes.`
    );
  }

  if (growthEdgeCapacity && growthEdgeArchetype) {
    sentences.push(
      `${growthEdgeCapacity}, within ${growthEdgeArchetype}, is the capacity where increasing Healthy Availability may matter most right now.`
    );
  }

  sentences.push(
    "This is a description of your current pattern, not a fixed identity — it is educational information intended to support your own self-understanding, not a diagnosis."
  );

  return sentences.join(" ");
}
