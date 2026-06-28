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
  body: 7,
  emotion: 9,
  behaviour: 9,
  situation: 7,
  thought: 9,
};

const MAX_RAW_SCORE =
  WEIGHTS.body +
  WEIGHTS.emotion +
  WEIGHTS.behaviour +
  WEIGHTS.situation +
  WEIGHTS.thought;

const ARCHETYPE_LOOPS = {
  sovereign: ["Dimmed Light", "Paper Crown", "Stalled Flame"],
  magician: ["Blank Page", "Smoky Mirrors", "Mind Maze"],
  lover: ["Emotional Lockdown", "Fantasy Fog", "Flooded Waters"],
  warrior: ["Compliance", "Fortress", "Barren Ground"],
};

const RESPONSE_STYLE_LOOPS = {
  collapse: ["Dimmed Light", "Blank Page", "Emotional Lockdown", "Compliance"],
  compensation: ["Paper Crown", "Smoky Mirrors", "Fantasy Fog", "Fortress"],
  collision: ["Stalled Flame", "Mind Maze", "Flooded Waters", "Barren Ground"],
};

const THOUGHT_TO_LOOP: Record<string, string> = {
  "i'm not good enough": "Dimmed Light",
  "i need to prove myself": "Paper Crown",
  "why bother": "Stalled Flame",

  "my mind has gone blank": "Blank Page",
  "maybe i'm wrong": "Smoky Mirrors",
  "i need to figure this out": "Mind Maze",

  "i have to hide how i feel": "Emotional Lockdown",
  "maybe they will change": "Fantasy Fog",
  "this hurts too much": "Flooded Waters",

  "my needs don't matter": "Compliance",
  "i can't rely on anyone else": "Fortress",
  "i can't keep doing this": "Barren Ground",
};

const TRIGGER_TO_ARCHETYPE: Record<string, keyof typeof ARCHETYPE_LOOPS> = {
  criticism: "sovereign",
  comparison: "sovereign",
  visibility: "sovereign",

  uncertainty: "magician",
  change: "magician",
  "performance pressure": "magician",

  rejection: "lover",
  disappointment: "lover",
  "need for approval": "lover",

  conflict: "warrior",
  "boundary challenge": "warrior",
  responsibility: "warrior",
};

function normalise(value: string) {
  return value.trim().toLowerCase().replace(/[.?!]/g, "");
}

function getLoopKeyByName(loopName: string) {
  return Object.entries(loopDetectionProfiles).find(
    ([, profile]) => profile.name === loopName
  )?.[0];
}

function addToLoop(
  scores: Record<string, number>,
  loopName: string,
  points: number
) {
  const key = getLoopKeyByName(loopName);
  if (!key) return;

  scores[key] = (scores[key] || 0) + points;
}

function addToLoops(
  scores: Record<string, number>,
  loopNames: string[],
  points: number
) {
  loopNames.forEach((loopName) => addToLoop(scores, loopName, points));
}

function calculatePatternMatch(score: number, topScore: number, rank: number) {
  if (score <= 0 || topScore <= 0) return 0;

  const rawMatch = score / MAX_RAW_SCORE;
  const relativeMatch = score / topScore;

  let match = Math.round(rawMatch * 72 + relativeMatch * 24);

  if (rank === 0 && score === topScore) {
    match += 4;
  }

  if (rank > 0) {
    match -= rank * 4;
  }

  return Math.max(18, Math.min(96, match));
}

export function detectLoop(input: DetectionInput): DetectionResult {
  const scores: Record<string, number> = {};

  Object.keys(loopDetectionProfiles).forEach((key) => {
    scores[key] = 0;
  });

  input.bodyActivation.forEach((body) => {
    const value = normalise(body);

    if (value.includes("head") || value.includes("throat")) {
      addToLoops(scores, ARCHETYPE_LOOPS.magician, WEIGHTS.body);
    }

    if (value.includes("chest") || value.includes("solar plexus")) {
      addToLoops(scores, ARCHETYPE_LOOPS.sovereign, WEIGHTS.body);
    }

    if (value.includes("gut") || value.includes("lower abdomen")) {
      addToLoops(scores, ARCHETYPE_LOOPS.lover, WEIGHTS.body);
    }

    if (
      value.includes("legs") ||
      value.includes("feet") ||
      value.includes("full body")
    ) {
      addToLoops(scores, ARCHETYPE_LOOPS.warrior, WEIGHTS.body);
    }
  });

  input.emotions.forEach((emotion) => {
    const value = normalise(emotion);

    if (value.includes("inadequate") || value.includes("exposed")) {
      addToLoops(scores, ARCHETYPE_LOOPS.sovereign, WEIGHTS.emotion);
    }

    if (value.includes("confused") || value.includes("overthinking")) {
      addToLoops(scores, ARCHETYPE_LOOPS.magician, WEIGHTS.emotion);
    }

    if (value.includes("hurt") || value.includes("longing")) {
      addToLoops(scores, ARCHETYPE_LOOPS.lover, WEIGHTS.emotion);
    }

    if (value.includes("defensive") || value.includes("tense")) {
      addToLoops(scores, ARCHETYPE_LOOPS.warrior, WEIGHTS.emotion);
    }
  });

  const responseStyle = normalise(input.responseStyle);

  if (responseStyle === "collapse") {
    addToLoops(scores, RESPONSE_STYLE_LOOPS.collapse, WEIGHTS.behaviour);
  }

  if (responseStyle === "compensation" || responseStyle === "compensate") {
    addToLoops(scores, RESPONSE_STYLE_LOOPS.compensation, WEIGHTS.behaviour);
  }

  if (responseStyle === "collision" || responseStyle === "collide") {
    addToLoops(scores, RESPONSE_STYLE_LOOPS.collision, WEIGHTS.behaviour);
  }

  const trigger = normalise(input.trigger);
  const triggerArchetype = TRIGGER_TO_ARCHETYPE[trigger];

  if (triggerArchetype) {
    addToLoops(scores, ARCHETYPE_LOOPS[triggerArchetype], WEIGHTS.situation);
  }

  input.thoughts.forEach((thought) => {
    const value = normalise(thought);
    const matchedLoop = THOUGHT_TO_LOOP[value];

    if (matchedLoop) {
      addToLoop(scores, matchedLoop, WEIGHTS.thought);
    }
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

  const topScore = sorted[0]?.[1] || 0;

  const topMatches = sorted.slice(0, 3).map(([key, score], index) => {
    const profile =
      loopDetectionProfiles[key as keyof typeof loopDetectionProfiles];

    return {
      loop: profile.name,
      archetype: profile.archetype,
      score,
      confidence: calculatePatternMatch(score, topScore, index),
    };
  });

  return {
    primaryLoop: primaryProfile.name,
    secondaryLoop: secondaryProfile?.name,
    confidence: topMatches[0]?.confidence || 0,
    archetype: primaryProfile.archetype,
    journey: primaryProfile.journey,
    integratedIdentity: primaryProfile.integratedIdentity,
    suggestedPractices: primaryProfile.suggestedPractices,
    scores,
    topMatches,
  };
}