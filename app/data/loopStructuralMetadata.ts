// ArcheLoop Report v2 — canonical Injured Archetype / Compensating Archetype metadata.
//
// Single source of truth for the Structural Dynamic concepts described in
// docs/ARCHELOOP_FRAMEWORK_ARCHITECTURE.md Section 7. Superseeds the overloaded,
// partly-incorrect `weakArchetype`/`overactiveArchetype` fields in
// app/data/loopDetails.ts for any new public-facing use (those fields remain in
// loopDetails.ts only for their original narrative content, corrected where wrong,
// not as a source for Report v2 metadata).
//
// injuredArchetype / developmentalCapacity / formation are read directly from
// CANONICAL_CAPACITY_TABLE (app/data/questions.ts) — the same table scoring.ts
// itself is built from — so loop ownership here can never drift from scoring.
//
// compensatingArchetype is set only where a genuinely distinct archetype is
// recruited as a protective substitute (Framework §6: Compensate = a single
// protective imitation). Two Compensate-formation loops (Smoky Mirrors, Fortress)
// are self-compensating — the injured archetype protects itself with its own
// native strategy, not a borrowed one — so no compensatingArchetype is set for
// them. Collide-formation loops never get a compensatingArchetype (Collide is
// multiple systems in conflict, not a single substitution); they get
// participatingArchetypes instead, naming the archetypes in conflict - but only
// where loopDetails.ts's own `dominantElement` field genuinely names two active
// elements (Stalled Flame "Fire + Air", Flooded Waters "Water + Earth", Barren
// Ground "Earth + Water"). Mind Maze's own dominantElement is "Air" alone
// (suppressedElement "Earth" is the missing/absent capacity, not a second
// active system) - so Mind Maze is self-colliding, like Smoky Mirrors and
// Fortress are self-compensating, and gets no participatingArchetypes. Adding
// Warrior there would be speculative: nothing in the loop's own canonical
// content describes Warrior as actively contributing to the conflict, only as
// the missing resolution (which belongs to Growth Edge / Integration
// Direction, not to the conflict roster). See
// docs/ASSESSMENT_RESPONSE_VALIDITY_AUDIT.md Part 2 for the full re-audit.
//
// integrationDirection values are identical to the existing, already-correct
// loopPathMap (components/FullReport.tsx) / journeyByLoop (app/assessment/page.tsx)
// tables — restated here as the canonical home for Report v2, not a new decision.

import {
  CANONICAL_CAPACITY_TABLE,
  type Archetype,
  type DevelopmentalCapacity,
  type ShadowLoopName,
} from "./questions.ts";

export type ProtectiveFormationPublic = "Collapse" | "Compensate" | "Collide";

export type LoopStructuralMetadata = {
  loop: ShadowLoopName;
  injuredArchetype: Archetype;
  developmentalCapacity: DevelopmentalCapacity;
  formation: ProtectiveFormationPublic;

  compensatingArchetype?: Archetype;
  participatingArchetypes?: Archetype[];

  structuralDynamic: string;
  integrationDirection: {
    path: string;
    integratedCapacity: string;
  };
};

const STRUCTURAL_DYNAMIC: Record<ShadowLoopName, string> = {
  "Dimmed Light":
    "When visibility feels unsafe, Sovereign's capacity for being seen withdraws, and the person becomes smaller, quieter, or less expressed than they actually are.",
  "Paper Crown":
    "When Sovereign's sense of worth feels unstable, Magician's capacity for image, narrative, and performance is recruited to manufacture proof of value through achievement, status, or recognition.",
  "Stalled Flame":
    "Sovereign's desire to act and Magician's tendency to analyse become caught in conflict, so movement repeatedly starts and then stalls under hesitation or over-thinking.",
  "Blank Page":
    "When expression feels unsafe, Magician's capacity for language and articulation withdraws, and thought or speech becomes difficult to access under pressure.",
  "Smoky Mirrors":
    "When direct truth feels unsafe, Magician protects itself using its own capacity for narrative and interpretation, reshaping or reinterpreting reality rather than facing it plainly.",
  "Mind Maze":
    "Magician's drive to analyse and Warrior's need for grounded movement become caught in conflict, so thinking loops without resolving into decisive action.",
  "Emotional Lockdown":
    "When feeling becomes unsafe, Lover's capacity for emotional openness withdraws, and the person disconnects from or numbs their own emotional experience.",
  "Fantasy Fog":
    "When real connection feels unavailable or unsafe, Magician's capacity for imagination is recruited to construct idealised or imagined connection in place of direct emotional contact.",
  "Flooded Waters":
    "Lover's emotional intensity and Warrior's capacity for grounded containment become caught in conflict, so feeling arrives faster than it can be regulated.",
  Compliance:
    "When boundaries feel unsafe to hold, Warrior's capacity for self-protection withdraws, and the person adapts, agrees, or accommodates instead of asserting their own needs.",
  Fortress:
    "When trust feels unsafe, Warrior protects itself using its own capacity for self-reliance, choosing distance and control over dependence on others.",
  "Barren Ground":
    "Warrior's drive to keep carrying responsibility and Lover's need for nourishment become caught in conflict, so the person keeps functioning while becoming emotionally depleted.",
};

const COMPENSATING_ARCHETYPE: Partial<Record<ShadowLoopName, Archetype>> = {
  "Paper Crown": "Magician",
  "Fantasy Fog": "Magician",
};

// Mind Maze deliberately has no entry here - see the comment above this
// table's declaration for why (self-colliding, not two archetypes).
const PARTICIPATING_ARCHETYPES: Partial<Record<ShadowLoopName, Archetype[]>> = {
  "Stalled Flame": ["Sovereign", "Magician"],
  "Flooded Waters": ["Lover", "Warrior"],
  "Barren Ground": ["Warrior", "Lover"],
};

const INTEGRATION_DIRECTION: Record<
  ShadowLoopName,
  { path: string; integratedCapacity: string }
> = {
  "Dimmed Light": { path: "Visibility Path", integratedCapacity: "Healthy Visibility" },
  "Paper Crown": { path: "Authentic Sovereignty Path", integratedCapacity: "Authentic Leadership" },
  "Stalled Flame": { path: "Action Path", integratedCapacity: "Purposeful Action" },
  "Blank Page": { path: "Creative Expression Path", integratedCapacity: "Authentic Expression" },
  "Smoky Mirrors": { path: "Truth Path", integratedCapacity: "Self-Honesty" },
  "Mind Maze": { path: "Clarity Path", integratedCapacity: "Clear Thinking" },
  "Emotional Lockdown": { path: "Vulnerability Path", integratedCapacity: "Emotional Openness" },
  "Fantasy Fog": { path: "Connection Path", integratedCapacity: "Genuine Connection" },
  "Flooded Waters": { path: "Emotional Regulation Path", integratedCapacity: "Emotional Flow" },
  Compliance: { path: "Boundaries Path", integratedCapacity: "Self-Respect" },
  Fortress: { path: "Trust Path", integratedCapacity: "Connected Strength" },
  "Barren Ground": { path: "Vitality Path", integratedCapacity: "Inner Vitality" },
};

export const LOOP_STRUCTURAL_METADATA: LoopStructuralMetadata[] = CANONICAL_CAPACITY_TABLE.map(
  (row) => ({
    loop: row.shadowLoop,
    injuredArchetype: row.archetype,
    developmentalCapacity: row.developmentalCapacity,
    formation: row.formation,
    compensatingArchetype: COMPENSATING_ARCHETYPE[row.shadowLoop],
    participatingArchetypes: PARTICIPATING_ARCHETYPES[row.shadowLoop],
    structuralDynamic: STRUCTURAL_DYNAMIC[row.shadowLoop],
    integrationDirection: INTEGRATION_DIRECTION[row.shadowLoop],
  })
);

export const LOOP_STRUCTURAL_METADATA_BY_LOOP: Record<ShadowLoopName, LoopStructuralMetadata> =
  Object.fromEntries(LOOP_STRUCTURAL_METADATA.map((entry) => [entry.loop, entry])) as Record<
    ShadowLoopName,
    LoopStructuralMetadata
  >;

export function getLoopStructuralMetadata(loop: ShadowLoopName): LoopStructuralMetadata {
  return LOOP_STRUCTURAL_METADATA_BY_LOOP[loop];
}
