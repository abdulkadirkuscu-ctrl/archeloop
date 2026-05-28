export type FormationType = "Suppression" | "Compensation" | "Collision"

export const loopFormulas = {
  "Dimmed Light": {
    loop: "Dimmed Light",
    archetype: "Sovereign",
    element: "Fire",
    formation: "Suppression" as FormationType,
    healthyExpression:
      "Authentic visibility, self-trust, grounded confidence, and the ability to take up space without apology.",
    collapsedEnergy:
      "Visibility feels unsafe. Being seen, praised, noticed, or expressed may feel exposing, risky, or connected to rejection.",
    protectiveAdaptation:
      "Shrink, hide, minimise, stay quiet, soften expression, or reduce personal presence to preserve safety and belonging.",
    observableBehaviours: [
      "Hiding strengths",
      "Avoiding attention",
      "Downplaying achievements",
      "Holding back ideas",
      "Making yourself smaller",
      "Avoiding visibility",
    ],
    underlyingNeed:
      "To feel safe being seen without needing to shrink, apologise, or disappear.",
    integrationShift:
      "Safe visibility restores authentic Sovereign expression and grounded Fire energy.",
  },

  "Paper Crown": {
    loop: "Paper Crown",
    archetype: "Sovereign",
    element: "Fire",
    formation: "Compensation" as FormationType,
    healthyExpression:
      "Stable self-worth, authentic confidence, grounded leadership, and identity that does not depend on external validation.",
    collapsedEnergy:
      "Worth feels conditional. The system does not fully trust its value unless it is recognised, admired, approved, or proven.",
    protectiveAdaptation:
      "Perform, achieve, impress, manage image, seek recognition, or create a stronger external identity to protect unstable worth.",
    observableBehaviours: [
      "Proving yourself",
      "Perfectionism",
      "Image management",
      "Achievement pressure",
      "Validation seeking",
      "Fear of failure",
    ],
    underlyingNeed:
      "To feel worthy without needing performance, status, approval, or comparison.",
    integrationShift:
      "Authentic self-worth replaces performance-based worth.",
  },

  "Stalled Flame": {
    loop: "Stalled Flame",
    archetype: "Sovereign",
    element: "Fire",
    formation: "Collision" as FormationType,
    healthyExpression:
      "Clear desire, creative movement, courageous expression, and the ability to act from inner vision.",
    collapsedEnergy:
      "Desire is present, but visibility, failure, judgement, or consequence make action feel unsafe.",
    protectiveAdaptation:
      "Hesitate, delay, overthink, freeze, or hold back from action even when energy, vision, or longing is present.",
    observableBehaviours: [
      "Procrastination",
      "Hesitation",
      "Starting but not continuing",
      "Fear of being seen trying",
      "Overthinking action",
      "Holding back desire",
    ],
    underlyingNeed:
      "To move from desire into safe, embodied action without needing certainty or permission.",
    integrationShift:
      "Grounded action allows Fire to move without being blocked by fear or over-analysis.",
  },

  "Blank Page": {
    loop: "Blank Page",
    archetype: "Magician",
    element: "Air",
    formation: "Suppression" as FormationType,
    healthyExpression:
      "Clear perception, trusted thought, language, insight, and the ability to communicate what is internally known.",
    collapsedEnergy:
      "Thought, language, or perception becomes inaccessible under pressure. The system loses trust in its own mind or voice.",
    protectiveAdaptation:
      "Go blank, freeze mentally, lose words, disconnect from clarity, or retreat from expression when communication feels unsafe.",
    observableBehaviours: [
      "Mind going blank",
      "Losing words",
      "Freezing during pressure",
      "Avoiding expression",
      "Second-guessing thoughts",
      "Silence when clarity is needed",
    ],
    underlyingNeed:
      "To trust perception and expression even when pressure, judgement, or uncertainty is present.",
    integrationShift:
      "Safe expression and trusted perception restore healthy Magician energy.",
  },

  "Smoky Mirrors": {
    loop: "Smoky Mirrors",
    archetype: "Magician",
    element: "Air",
    formation: "Compensation" as FormationType,
    healthyExpression:
      "Clear truth, direct perception, honest communication, and the ability to understand without controlling meaning.",
    collapsedEnergy:
      "Direct truth or perception feels unsafe, insufficient, or vulnerable. The system doubts that clarity alone will protect it.",
    protectiveAdaptation:
      "Over-explain, distort, intellectualise, manage narratives, control meaning, or use complexity to avoid direct exposure.",
    observableBehaviours: [
      "Over-explaining",
      "Defending with logic",
      "Controlling narratives",
      "Mental gymnastics",
      "Confusing yourself or others",
      "Avoiding direct truth",
    ],
    underlyingNeed:
      "To trust clarity without needing to control how everything is interpreted.",
    integrationShift:
      "Direct perception replaces distortion, over-explanation, and meaning control.",
  },

  "Mind Maze": {
    loop: "Mind Maze",
    archetype: "Magician",
    element: "Air",
    formation: "Collision" as FormationType,
    healthyExpression:
      "Insight, perspective, clear thought, and the ability to use thinking in service of grounded action.",
    collapsedEnergy:
      "Action, certainty, or grounded movement feels unsafe. The mind tries to solve risk before the body can move.",
    protectiveAdaptation:
      "Analyse, rehearse, loop, compare possibilities, delay action, or keep thinking in order to avoid uncertainty or mistakes.",
    observableBehaviours: [
      "Overthinking",
      "Mental looping",
      "Second-guessing",
      "Decision paralysis",
      "Rehearsing conversations",
      "Avoiding action through analysis",
    ],
    underlyingNeed:
      "To let clarity emerge through movement rather than endless thought.",
    integrationShift:
      "Grounded action interrupts mental looping and restores healthy connection between Air and Earth.",
  },

  "Emotional Lockdown": {
    loop: "Emotional Lockdown",
    archetype: "Lover",
    element: "Water",
    formation: "Suppression" as FormationType,
    healthyExpression:
      "Emotional presence, vulnerability, intimacy, compassion, and the ability to safely feel and connect.",
    collapsedEnergy:
      "Feeling becomes unsafe. Vulnerability may feel overwhelming, exposing, destabilising, or dangerous.",
    protectiveAdaptation:
      "Numb, shut down, disconnect, intellectualise, stay functional, or suppress emotion in order to maintain safety and control.",
    observableBehaviours: [
      "Emotional numbness",
      "Avoiding vulnerability",
      "Functioning while disconnected",
      "Not knowing what you feel",
      "Changing subject from emotion",
      "Containing instead of processing",
    ],
    underlyingNeed:
      "To feel emotion safely without being overwhelmed, exposed, rejected, or destabilised.",
    integrationShift:
      "Safe emotional contact restores healthy Lover energy and Water flow.",
  },

  "Fantasy Fog": {
    loop: "Fantasy Fog",
    archetype: "Lover",
    element: "Water",
    formation: "Compensation" as FormationType,
    healthyExpression:
      "Grounded intimacy, emotional truth, real connection, and the capacity to relate to what is actually present.",
    collapsedEnergy:
      "Real emotional contact feels unavailable, unsafe, disappointing, or uncertain.",
    protectiveAdaptation:
      "Retreat into fantasy, idealisation, imagined connection, future possibility, longing, or emotional projection.",
    observableBehaviours: [
      "Idealising people",
      "Attachment to potential",
      "Imagined relationships",
      "Avoiding reality",
      "Living in possibility",
      "Longing without grounded action",
    ],
    underlyingNeed:
      "To experience real emotional connection without escaping into fantasy or projection.",
    integrationShift:
      "Grounded emotional truth reconnects longing with reality, embodiment, and relational action.",
  },

  "Flooded Waters": {
    loop: "Flooded Waters",
    archetype: "Lover",
    element: "Water",
    formation: "Collision" as FormationType,
    healthyExpression:
      "Emotional flow, connection, vulnerability, and the capacity to feel deeply while remaining regulated.",
    collapsedEnergy:
      "Emotional intensity exceeds the system’s ability to contain, ground, or organise experience.",
    protectiveAdaptation:
      "Flood, spiral, cling, collapse, react from attachment pain, or become overwhelmed by emotional intensity.",
    observableBehaviours: [
      "Emotional flooding",
      "Crying or spiralling",
      "Attachment panic",
      "Feeling consumed by emotion",
      "Difficulty regulating",
      "Urgent need for reassurance",
    ],
    underlyingNeed:
      "To feel deeply while remaining grounded, bounded, and emotionally safe.",
    integrationShift:
      "Grounded containment allows Water to flow without overwhelming the system.",
  },

  Compliance: {
    loop: "Compliance",
    archetype: "Warrior",
    element: "Earth",
    formation: "Suppression" as FormationType,
    healthyExpression:
      "Boundaries, grounded protection, honest no, embodied agency, and the ability to stay connected without self-abandonment.",
    collapsedEnergy:
      "Boundaries feel unsafe. Directness, conflict, refusal, or self-protection may feel like a threat to belonging or safety.",
    protectiveAdaptation:
      "Agree, adapt, appease, soften, over-accommodate, or suppress needs to avoid conflict, rejection, anger, or withdrawal.",
    observableBehaviours: [
      "People pleasing",
      "Saying yes when you mean no",
      "Avoiding conflict",
      "Suppressing needs",
      "Apologising quickly",
      "Self-abandonment for approval",
    ],
    underlyingNeed:
      "To protect yourself and express needs without losing connection or safety.",
    integrationShift:
      "Healthy boundaries restore Warrior energy without requiring emotional disconnection.",
  },

  Fortress: {
    loop: "Fortress",
    archetype: "Warrior",
    element: "Earth",
    formation: "Compensation" as FormationType,
    healthyExpression:
      "Grounded boundaries, protection, stability, embodied safety, and the ability to remain open while protected.",
    collapsedEnergy:
      "Vulnerability feels unsafe. Emotional openness, dependency, or relational need may feel intrusive, risky, or dangerous.",
    protectiveAdaptation:
      "Build walls, distance, control, harden, become hyper-independent, or rely on self-protection instead of relational trust.",
    observableBehaviours: [
      "Emotional walls",
      "Hyper-independence",
      "Control",
      "Guardedness",
      "Withdrawal",
      "Difficulty receiving support",
    ],
    underlyingNeed:
      "To experience safety, trust, and vulnerability without losing protection or selfhood.",
    integrationShift:
      "Boundaries remain, but connection becomes possible.",
  },

  "Barren Ground": {
    loop: "Barren Ground",
    archetype: "Warrior",
    element: "Earth",
    formation: "Collision" as FormationType,
    healthyExpression:
      "Sustainable action, grounded endurance, protection, rest, and the ability to move without abandoning nourishment.",
    collapsedEnergy:
      "The system keeps functioning while emotional nourishment, vitality, softness, or replenishment becomes depleted.",
    protectiveAdaptation:
      "Endure, push through, stay responsible, keep going, disconnect from need, or continue functioning while internally depleted.",
    observableBehaviours: [
      "Burnout",
      "Emotional dryness",
      "Over-responsibility",
      "Pushing through exhaustion",
      "Feeling depleted",
      "Losing access to softness",
    ],
    underlyingNeed:
      "To restore nourishment, rest, support, and emotional replenishment without losing grounded capacity.",
    integrationShift:
      "Sustainable protection replaces survival endurance.",
  },
} as const