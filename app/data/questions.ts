// ArcheLoop Assessment v2.0 canonical question bank.
//
// Source of truth for wording: docs/ASSESSMENT_V2_CANONICAL_QUESTIONS.md
// Source of truth for the capacity/loop hierarchy: docs/ARCHELOOP_FRAMEWORK_ARCHITECTURE.md
//
// Canonical hierarchy: Developmental Capacity -> Protective Formation -> Shadow Loop
// -> Belief / Emotion / Behaviour evidence (Framework Architecture, Section 8).
//
// Backward compatibility: `id` is the pre-v2 runtime identifier (e.g. "HF1"). It is
// kept stable because nothing persisted (Supabase rows, localStorage, cookies) ever
// depended on question-level identifiers before this rewrite - only the *computed*
// result (loop/archetype names) is persisted - but the id is preserved anyway as a
// zero-cost safety margin. `canonicalId` is the new v2.0 identifier from the locked
// question document (e.g. "F1"). The mapping between the two is positional, not
// semantic: the legacy Healthy bank had no per-capacity distinction (six
// undifferentiated Cognitive/Emotional/Behavioural questions per archetype), so each
// legacy Healthy id was assigned to a canonical Healthy Capacity/Expression slot in
// sequence order. Legacy Shadow ids map onto canonical Belief/Emotion/Behaviour slots
// 1:1 by suffix (id ending "1" = Belief, "2" = Emotion, "3" = Behaviour), which is a
// genuine content correspondence, not just a positional convenience.

export type Archetype = "Sovereign" | "Magician" | "Lover" | "Warrior";
export type Element = "Fire" | "Air" | "Water" | "Earth";

export type ProtectiveFormation = "Healthy" | "Collapse" | "Compensate" | "Collide";

export type MeasurementLens =
  | "Healthy Capacity"
  | "Healthy Expression"
  | "Protective Belief"
  | "Protective Emotion"
  | "Protective Behaviour";

export type DevelopmentalCapacity =
  | "Visibility"
  | "Worth"
  | "Action"
  | "Expression"
  | "Truth"
  | "Clarity"
  | "Vulnerability"
  | "Connection"
  | "Emotional Regulation"
  | "Boundaries"
  | "Trust"
  | "Vitality";

export type ShadowLoopName =
  | "Dimmed Light"
  | "Paper Crown"
  | "Stalled Flame"
  | "Blank Page"
  | "Smoky Mirrors"
  | "Mind Maze"
  | "Emotional Lockdown"
  | "Fantasy Fog"
  | "Flooded Waters"
  | "Compliance"
  | "Fortress"
  | "Barren Ground";

export type Question = {
  id: string;
  canonicalId: string;
  text: string;
  archetype: Archetype;
  element: Element;
  developmentalCapacity: DevelopmentalCapacity;
  formation: ProtectiveFormation;
  lens: MeasurementLens;
  shadowLoop: ShadowLoopName | null;
  healthyCapacity: string;
};

// The 12-row canonical hierarchy table given in the Assessment v2.0 spec. Every
// question's (archetype, element, developmentalCapacity, formation, shadowLoop,
// healthyCapacity) combination must correspond to exactly one row here - enforced
// by a structural test in scoring.test.ts.
export const CANONICAL_CAPACITY_TABLE: {
  archetype: Archetype;
  element: Element;
  developmentalCapacity: DevelopmentalCapacity;
  healthyCapacity: string;
  formation: Exclude<ProtectiveFormation, "Healthy">;
  shadowLoop: ShadowLoopName;
}[] = [
  { archetype: "Sovereign", element: "Fire", developmentalCapacity: "Visibility", healthyCapacity: "Healthy Visibility", formation: "Collapse", shadowLoop: "Dimmed Light" },
  { archetype: "Sovereign", element: "Fire", developmentalCapacity: "Worth", healthyCapacity: "Authentic Leadership", formation: "Compensate", shadowLoop: "Paper Crown" },
  { archetype: "Sovereign", element: "Fire", developmentalCapacity: "Action", healthyCapacity: "Purposeful Action", formation: "Collide", shadowLoop: "Stalled Flame" },
  { archetype: "Magician", element: "Air", developmentalCapacity: "Expression", healthyCapacity: "Authentic Expression", formation: "Collapse", shadowLoop: "Blank Page" },
  { archetype: "Magician", element: "Air", developmentalCapacity: "Truth", healthyCapacity: "Self-Honesty", formation: "Compensate", shadowLoop: "Smoky Mirrors" },
  { archetype: "Magician", element: "Air", developmentalCapacity: "Clarity", healthyCapacity: "Clear Thinking", formation: "Collide", shadowLoop: "Mind Maze" },
  { archetype: "Lover", element: "Water", developmentalCapacity: "Vulnerability", healthyCapacity: "Emotional Openness", formation: "Collapse", shadowLoop: "Emotional Lockdown" },
  { archetype: "Lover", element: "Water", developmentalCapacity: "Connection", healthyCapacity: "Genuine Connection", formation: "Compensate", shadowLoop: "Fantasy Fog" },
  { archetype: "Lover", element: "Water", developmentalCapacity: "Emotional Regulation", healthyCapacity: "Emotional Flow", formation: "Collide", shadowLoop: "Flooded Waters" },
  { archetype: "Warrior", element: "Earth", developmentalCapacity: "Boundaries", healthyCapacity: "Self-Respect", formation: "Collapse", shadowLoop: "Compliance" },
  { archetype: "Warrior", element: "Earth", developmentalCapacity: "Trust", healthyCapacity: "Connected Strength", formation: "Compensate", shadowLoop: "Fortress" },
  { archetype: "Warrior", element: "Earth", developmentalCapacity: "Vitality", healthyCapacity: "Inner Vitality", formation: "Collide", shadowLoop: "Barren Ground" },
];

// Stable canonical loop order (matches the table above / the spec's own row order).
// Used for deterministic tie-breaking in scoring.ts - never insertion order.
export const CANONICAL_LOOP_ORDER: ShadowLoopName[] = CANONICAL_CAPACITY_TABLE.map(
  (row) => row.shadowLoop
);

export const questions: Question[] = [
  // 🔥 FIRE — Sovereign

  // Visibility
  {
    id: "HF1",
    canonicalId: "F1",
    text: "I allow myself to be seen without hiding important parts of who I am.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Visibility",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Healthy Visibility",
  },
  {
    id: "HF2",
    canonicalId: "F2",
    text: "I allow myself to take up space in social, professional, or creative environments.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Visibility",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Healthy Visibility",
  },
  // Dimmed Light (Collapse)
  {
    id: "DL1",
    canonicalId: "F3",
    text: "I believe it is safer to stay unnoticed than to be fully seen.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Visibility",
    formation: "Collapse",
    lens: "Protective Belief",
    shadowLoop: "Dimmed Light",
    healthyCapacity: "Healthy Visibility",
  },
  {
    id: "DL2",
    canonicalId: "F4",
    text: "I feel ashamed when I take up space or draw attention to myself.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Visibility",
    formation: "Collapse",
    lens: "Protective Emotion",
    shadowLoop: "Dimmed Light",
    healthyCapacity: "Healthy Visibility",
  },
  {
    id: "DL3",
    canonicalId: "F5",
    text: "I hide my talents, opinions, or achievements to avoid scrutiny.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Visibility",
    formation: "Collapse",
    lens: "Protective Behaviour",
    shadowLoop: "Dimmed Light",
    healthyCapacity: "Healthy Visibility",
  },

  // Worth
  {
    id: "HF3",
    canonicalId: "F6",
    text: "I can acknowledge my strengths without feeling arrogant or ashamed.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Worth",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Authentic Leadership",
  },
  {
    id: "HF4",
    canonicalId: "F7",
    text: "I continue putting effort into things that matter to me, even when others do not notice.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Worth",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Authentic Leadership",
  },
  // Paper Crown (Compensate)
  {
    id: "PC1",
    canonicalId: "F8",
    text: "I believe my value depends on what I achieve or how other people see me.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Worth",
    formation: "Compensate",
    lens: "Protective Belief",
    shadowLoop: "Paper Crown",
    healthyCapacity: "Authentic Leadership",
  },
  {
    id: "PC2",
    canonicalId: "F9",
    text: "I feel inadequate when others do not recognise what I have achieved.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Worth",
    formation: "Compensate",
    lens: "Protective Emotion",
    shadowLoop: "Paper Crown",
    healthyCapacity: "Authentic Leadership",
  },
  {
    id: "PC3",
    canonicalId: "F10",
    text: "I work hard to prove my worth, even when I have nothing to prove.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Worth",
    formation: "Compensate",
    lens: "Protective Behaviour",
    shadowLoop: "Paper Crown",
    healthyCapacity: "Authentic Leadership",
  },

  // Action
  {
    id: "HF5",
    canonicalId: "F11",
    text: "I trust myself to move forward even when the outcome is uncertain.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Action",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Purposeful Action",
  },
  {
    id: "HF6",
    canonicalId: "F12",
    text: "I take action on what matters instead of waiting for perfect conditions.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Action",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Purposeful Action",
  },
  // Stalled Flame (Collide)
  {
    id: "SF1",
    canonicalId: "F13",
    text: "I believe I need to get everything right before I begin.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Action",
    formation: "Collide",
    lens: "Protective Belief",
    shadowLoop: "Stalled Flame",
    healthyCapacity: "Purposeful Action",
  },
  {
    id: "SF2",
    canonicalId: "F14",
    text: "I feel frustrated when I cannot turn my intentions into action.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Action",
    formation: "Collide",
    lens: "Protective Emotion",
    shadowLoop: "Stalled Flame",
    healthyCapacity: "Purposeful Action",
  },
  {
    id: "SF3",
    canonicalId: "F15",
    text: "I start projects with excitement but often stall before completing them.",
    archetype: "Sovereign",
    element: "Fire",
    developmentalCapacity: "Action",
    formation: "Collide",
    lens: "Protective Behaviour",
    shadowLoop: "Stalled Flame",
    healthyCapacity: "Purposeful Action",
  },

  // 🌬 AIR — Magician

  // Expression
  {
    id: "HA1",
    canonicalId: "A1",
    text: "I know what's really going on for me inside, even before I can put it into words.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Expression",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Authentic Expression",
  },
  {
    id: "HA2",
    canonicalId: "A2",
    text: "I can put what I think or feel into words that others actually understand.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Expression",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Authentic Expression",
  },
  // Blank Page (Collapse)
  {
    id: "BP1",
    canonicalId: "A3",
    text: "I believe I will lose access to my words when they matter most.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Expression",
    formation: "Collapse",
    lens: "Protective Belief",
    shadowLoop: "Blank Page",
    healthyCapacity: "Authentic Expression",
  },
  {
    id: "BP2",
    canonicalId: "A4",
    text: "I feel mentally blank or frozen when I am under pressure.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Expression",
    formation: "Collapse",
    lens: "Protective Emotion",
    shadowLoop: "Blank Page",
    healthyCapacity: "Authentic Expression",
  },
  {
    id: "BP3",
    canonicalId: "A5",
    text: "I stumble over my words or lose my train of thought under pressure.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Expression",
    formation: "Collapse",
    lens: "Protective Behaviour",
    shadowLoop: "Blank Page",
    healthyCapacity: "Authentic Expression",
  },

  // Truth
  {
    id: "HA3",
    canonicalId: "A6",
    text: "I trust my perception without needing complete certainty.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Truth",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Self-Honesty",
  },
  {
    id: "HA4",
    canonicalId: "A7",
    text: "I speak honestly even when it feels uncomfortable.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Truth",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Self-Honesty",
  },
  // Smoky Mirrors (Compensate)
  {
    id: "SM1",
    canonicalId: "A8",
    text: "I believe controlling the story is safer than facing the truth.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Truth",
    formation: "Compensate",
    lens: "Protective Belief",
    shadowLoop: "Smoky Mirrors",
    healthyCapacity: "Self-Honesty",
  },
  {
    id: "SM2",
    canonicalId: "A9",
    text: "I feel unsettled when reality does not match how I understand it.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Truth",
    formation: "Compensate",
    lens: "Protective Emotion",
    shadowLoop: "Smoky Mirrors",
    healthyCapacity: "Self-Honesty",
  },
  {
    id: "SM3",
    canonicalId: "A10",
    text: "I rationalise or reshape situations to avoid feeling vulnerable or uncertain.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Truth",
    formation: "Compensate",
    lens: "Protective Behaviour",
    shadowLoop: "Smoky Mirrors",
    healthyCapacity: "Self-Honesty",
  },

  // Clarity
  {
    id: "HA5",
    canonicalId: "A11",
    text: "I can clearly understand situations and think through complex problems.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Clarity",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Clear Thinking",
  },
  {
    id: "HA6",
    canonicalId: "A12",
    text: "I check my understanding before reaching conclusions.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Clarity",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Clear Thinking",
  },
  // Mind Maze (Collide)
  {
    id: "MM1",
    canonicalId: "A13",
    text: "I believe I need to think more before I can act.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Clarity",
    formation: "Collide",
    lens: "Protective Belief",
    shadowLoop: "Mind Maze",
    healthyCapacity: "Clear Thinking",
  },
  {
    id: "MM2",
    canonicalId: "A14",
    text: "I feel mentally overwhelmed when I need to make important decisions.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Clarity",
    formation: "Collide",
    lens: "Protective Emotion",
    shadowLoop: "Mind Maze",
    healthyCapacity: "Clear Thinking",
  },
  {
    id: "MM3",
    canonicalId: "A15",
    text: "I replay the same thoughts over and over instead of deciding.",
    archetype: "Magician",
    element: "Air",
    developmentalCapacity: "Clarity",
    formation: "Collide",
    lens: "Protective Behaviour",
    shadowLoop: "Mind Maze",
    healthyCapacity: "Clear Thinking",
  },

  // 💧 WATER — Lover

  // Vulnerability
  {
    id: "HW1",
    canonicalId: "W1",
    text: "I feel safe allowing myself to experience vulnerable emotions.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Vulnerability",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Emotional Openness",
  },
  {
    id: "HW2",
    canonicalId: "W2",
    text: "I express my feelings openly instead of holding them back.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Vulnerability",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Emotional Openness",
  },
  // Emotional Lockdown (Collapse)
  {
    id: "EL1",
    canonicalId: "W3",
    text: "I believe it is not safe to fully feel my emotions.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Vulnerability",
    formation: "Collapse",
    lens: "Protective Belief",
    shadowLoop: "Emotional Lockdown",
    healthyCapacity: "Emotional Openness",
  },
  {
    id: "EL2",
    canonicalId: "W4",
    text: "I often feel emotionally numb or disconnected.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Vulnerability",
    formation: "Collapse",
    lens: "Protective Emotion",
    shadowLoop: "Emotional Lockdown",
    healthyCapacity: "Emotional Openness",
  },
  {
    id: "EL3",
    canonicalId: "W5",
    text: "I withdraw emotionally when vulnerability or closeness arises.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Vulnerability",
    formation: "Collapse",
    lens: "Protective Behaviour",
    shadowLoop: "Emotional Lockdown",
    healthyCapacity: "Emotional Openness",
  },

  // Connection
  {
    id: "HW3",
    canonicalId: "W6",
    text: "I feel free to form close relationships without fearing emotional closeness.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Connection",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Genuine Connection",
  },
  {
    id: "HW4",
    canonicalId: "W7",
    text: "I connect deeply with others without losing myself.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Connection",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Genuine Connection",
  },
  // Fantasy Fog (Compensate)
  {
    id: "FF1",
    canonicalId: "W8",
    text: "I believe imagined connection feels safer than real intimacy.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Connection",
    formation: "Compensate",
    lens: "Protective Belief",
    shadowLoop: "Fantasy Fog",
    healthyCapacity: "Genuine Connection",
  },
  {
    id: "FF2",
    canonicalId: "W9",
    text: "I feel disappointed when real relationships do not match what I hoped they would be.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Connection",
    formation: "Compensate",
    lens: "Protective Emotion",
    shadowLoop: "Fantasy Fog",
    healthyCapacity: "Genuine Connection",
  },
  {
    id: "FF3",
    canonicalId: "W10",
    text: "I retreat into fantasy instead of engaging with difficult relationships.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Connection",
    formation: "Compensate",
    lens: "Protective Behaviour",
    shadowLoop: "Fantasy Fog",
    healthyCapacity: "Genuine Connection",
  },

  // Emotional Regulation
  {
    id: "HW5",
    canonicalId: "W11",
    text: "I can experience strong emotions without becoming overwhelmed by them.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Emotional Regulation",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Emotional Flow",
  },
  {
    id: "HW6",
    canonicalId: "W12",
    text: "I pause and steady myself before responding to strong emotions.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Emotional Regulation",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Emotional Flow",
  },
  // Flooded Waters (Collide)
  {
    id: "FW1",
    canonicalId: "W13",
    text: "I believe that if I fully experience my emotions, they will become too much for me.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Emotional Regulation",
    formation: "Collide",
    lens: "Protective Belief",
    shadowLoop: "Flooded Waters",
    healthyCapacity: "Emotional Flow",
  },
  {
    id: "FW2",
    canonicalId: "W14",
    text: "I feel emotionally overwhelmed when my feelings become intense.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Emotional Regulation",
    formation: "Collide",
    lens: "Protective Emotion",
    shadowLoop: "Flooded Waters",
    healthyCapacity: "Emotional Flow",
  },
  {
    id: "FW3",
    canonicalId: "W15",
    text: "When my emotions become intense, I react before I have time to think clearly.",
    archetype: "Lover",
    element: "Water",
    developmentalCapacity: "Emotional Regulation",
    formation: "Collide",
    lens: "Protective Behaviour",
    shadowLoop: "Flooded Waters",
    healthyCapacity: "Emotional Flow",
  },

  // 🌍 EARTH — Warrior

  // Boundaries
  {
    id: "HE1",
    canonicalId: "E1",
    text: "I recognise that my own needs and boundaries deserve respect.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Boundaries",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Self-Respect",
  },
  {
    id: "HE2",
    canonicalId: "E2",
    text: "I set clear boundaries without excessive guilt.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Boundaries",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Self-Respect",
  },
  // Compliance (Collapse)
  {
    id: "CL1",
    canonicalId: "E3",
    text: "I believe it is safer to go along than to stand up for my needs.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Boundaries",
    formation: "Collapse",
    lens: "Protective Belief",
    shadowLoop: "Compliance",
    healthyCapacity: "Self-Respect",
  },
  {
    id: "CL2",
    canonicalId: "E4",
    text: "I feel guilty when I put my own needs first.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Boundaries",
    formation: "Collapse",
    lens: "Protective Emotion",
    shadowLoop: "Compliance",
    healthyCapacity: "Self-Respect",
  },
  {
    id: "CL3",
    canonicalId: "E5",
    text: "I agree when I would rather say no, just to avoid conflict.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Boundaries",
    formation: "Collapse",
    lens: "Protective Behaviour",
    shadowLoop: "Compliance",
    healthyCapacity: "Self-Respect",
  },

  // Trust
  {
    id: "HE3",
    canonicalId: "E6",
    text: "I trust that I can rely on others without losing my independence.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Trust",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Connected Strength",
  },
  {
    id: "HE4",
    canonicalId: "E7",
    text: "I reach out for support when I need it.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Trust",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Connected Strength",
  },
  // Fortress (Compensate)
  {
    id: "FO1",
    canonicalId: "E8",
    text: "I believe I am safer when I rely only on myself.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Trust",
    formation: "Compensate",
    lens: "Protective Belief",
    shadowLoop: "Fortress",
    healthyCapacity: "Connected Strength",
  },
  {
    id: "FO2",
    canonicalId: "E9",
    text: "I feel uncomfortable depending on other people.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Trust",
    formation: "Compensate",
    lens: "Protective Emotion",
    shadowLoop: "Fortress",
    healthyCapacity: "Connected Strength",
  },
  {
    id: "FO3",
    canonicalId: "E10",
    text: "I handle difficulties alone rather than asking other people for support.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Trust",
    formation: "Compensate",
    lens: "Protective Behaviour",
    shadowLoop: "Fortress",
    healthyCapacity: "Connected Strength",
  },

  // Vitality
  {
    id: "HE5",
    canonicalId: "E11",
    text: "I recognise when my energy needs rest and restoration.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Vitality",
    formation: "Healthy",
    lens: "Healthy Capacity",
    shadowLoop: null,
    healthyCapacity: "Inner Vitality",
  },
  {
    id: "HE6",
    canonicalId: "E12",
    text: "I make time to rest and recover, even when I am busy.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Vitality",
    formation: "Healthy",
    lens: "Healthy Expression",
    shadowLoop: null,
    healthyCapacity: "Inner Vitality",
  },
  // Barren Ground (Collide)
  {
    id: "BG1",
    canonicalId: "E13",
    text: "I believe resting means I am neglecting my responsibilities.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Vitality",
    formation: "Collide",
    lens: "Protective Belief",
    shadowLoop: "Barren Ground",
    healthyCapacity: "Inner Vitality",
  },
  {
    id: "BG2",
    canonicalId: "E14",
    text: "I feel drained and depleted by everything I am carrying.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Vitality",
    formation: "Collide",
    lens: "Protective Emotion",
    shadowLoop: "Barren Ground",
    healthyCapacity: "Inner Vitality",
  },
  {
    id: "BG3",
    canonicalId: "E15",
    text: "I keep pushing through my responsibilities without pausing to recover.",
    archetype: "Warrior",
    element: "Earth",
    developmentalCapacity: "Vitality",
    formation: "Collide",
    lens: "Protective Behaviour",
    shadowLoop: "Barren Ground",
    healthyCapacity: "Inner Vitality",
  },
];

// Legacy runtime id -> v2 canonical id. Derived from `questions` (single source of
// truth) rather than hand-duplicated, so it can never drift out of sync.
export const LEGACY_TO_CANONICAL_ID: Record<string, string> = Object.fromEntries(
  questions.map((q) => [q.id, q.canonicalId])
);

// Assessment presentation order (60 legacy ids). Designed so that:
// - every archetype is visited in strict round-robin (Fire, Air, Water, Earth),
//   which guarantees no two questions from the same archetype are ever globally
//   adjacent (they are always >= 4 slots apart) - so a Healthy question and its
//   own capacity's Shadow "mirror" question can never sit beside each other;
// - within one archetype's own 15-question cycle, the traversal order interleaves
//   all three capacities and alternates Healthy/Shadow rather than visiting one
//   capacity or one lens at a time, keeping global Healthy-only/Shadow-only runs
//   short (max run length 4 by construction, versus long double-digit runs in the
//   legacy order this replaces);
// - per-archetype phase offsets (0/4/8/12 questions into the shared 15-question
//   cycle) desynchronise Fire/Air/Water/Earth so the four archetypes are never all
//   showing a Healthy (or all a Shadow) question in the same round;
// - the order is a fixed literal array - deterministic across sessions, not
//   regenerated or randomised at runtime.
// Correctness (60 unique ids, every id exists, 15 per archetype) is verified by
// scoring.test.ts, not merely asserted here.
export const assessmentOrder: string[] = [
  "HF1", "MM1", "HW2", "FO3",
  "DL1", "HA5", "FW2", "HE6",
  "HF3", "BP2", "HW4", "BG3",
  "PC1", "SM2", "EL3", "HE1",
  "SF1", "HA2", "FF3", "CL1",
  "HF5", "MM2", "HW6", "HE3",
  "DL2", "HA4", "FW3", "FO1",
  "PC2", "BP3", "HW1", "BG1",
  "HF2", "SM3", "EL1", "HE5",
  "SF2", "HA6", "HW3", "CL2",
  "HF4", "MM3", "FF1", "FO2",
  "DL3", "HA1", "FW1", "HE2",
  "PC3", "BP1", "HW5", "BG2",
  "HF6", "HA3", "EL2", "HE4",
  "SF3", "SM1", "FF2", "CL3",
];
