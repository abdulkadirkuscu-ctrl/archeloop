import { loopDetectionProfiles } from "./loopDetectionProfiles";

export type DetectionInput = {
  bodyActivation: string[];
  emotions: string[];
  thoughts: string[];
  responseStyle: string;
  trigger: string;
  person: string;
  environment: string;
};

export type TopLoopMatch = {
  loop: string;
  archetype: string;
  confidence: number;
  score: number;
};

export type DetectionResult = {
  primaryLoop: string;
  secondaryLoop?: string;
  confidence: number;

  archetype: string;

  journey: string;
  integratedIdentity: string;

  suggestedPractices: string[];

  scores: Record<string, number>;

  topMatches: TopLoopMatch[];
};

const WEIGHTS = {
  bodyActivation: 5,
  emotion: 5,
  responseStyle: 5,
  thought: 4,
  trigger: 2,
};

const TOTAL_POSSIBLE_SCORE =
  WEIGHTS.bodyActivation +
  WEIGHTS.emotion +
  WEIGHTS.responseStyle +
  WEIGHTS.thought +
  WEIGHTS.trigger;

export function detectLoop(input: DetectionInput): DetectionResult {
  const scores: Record<string, number> = {};

  Object.entries(loopDetectionProfiles).forEach(([key, profile]) => {
    let score = 0;

    input.bodyActivation.forEach((item) => {
      if (profile.bodyActivations.includes(item)) {
        score += WEIGHTS.bodyActivation;
      }
    });

    input.emotions.forEach((emotion) => {
      if (profile.emotions.includes(emotion)) {
        score += WEIGHTS.emotion;
      }
    });

    if (profile.responseStyles.includes(input.responseStyle)) {
      score += WEIGHTS.responseStyle;
    }

    input.thoughts.forEach((thought) => {
      if (profile.thoughts.includes(thought)) {
        score += WEIGHTS.thought;
      }
    });

    if (profile.triggers.includes(input.trigger)) {
      score += WEIGHTS.trigger;
    }

    scores[key] = score;
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const primaryKey = sorted[0]?.[0] as keyof typeof loopDetectionProfiles;
  const secondaryKey = sorted[1]?.[0] as keyof typeof loopDetectionProfiles;

  const primaryProfile = loopDetectionProfiles[primaryKey];
  const secondaryProfile = loopDetectionProfiles[secondaryKey];

  if (!primaryProfile) {
    return {
      primaryLoop: "Unknown Loop",
      secondaryLoop: undefined,
      confidence: 0,
      archetype: "Unknown",
      journey: "Unknown Journey",
      integratedIdentity: "Unknown State",
      suggestedPractices: [],
      scores,
      topMatches: [],
    };
  }

  const primaryScore = sorted[0]?.[1] || 0;

  const confidence = Math.min(
    100,
    Math.round((primaryScore / TOTAL_POSSIBLE_SCORE) * 100)
  );

  const topMatches = sorted.slice(0, 3).map(([key, score]) => {
    const profile =
      loopDetectionProfiles[key as keyof typeof loopDetectionProfiles];

    return {
      loop: profile.name,
      archetype: profile.archetype,
      score,
      confidence: Math.min(
        100,
        Math.round((score / TOTAL_POSSIBLE_SCORE) * 100)
      ),
    };
  });

  return {
    primaryLoop: primaryProfile.name,
    secondaryLoop: secondaryProfile?.name,
    confidence,
    archetype: primaryProfile.archetype,
    journey: primaryProfile.journey,
    integratedIdentity: primaryProfile.integratedIdentity,
    suggestedPractices: primaryProfile.suggestedPractices,
    scores,
    topMatches,
  };
}