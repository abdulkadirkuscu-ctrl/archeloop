// ArcheLoop Report v2 — plain-language glossary.
//
// Static, canonical content only (no scoring, no ranking, no new theory).
// This file exists to explain the framework's official terms in everyday
// language, immediately beneath the canonical heading - never to replace
// the canonical term itself (see docs/ARCHELOOP_FRAMEWORK_DICTIONARY.md,
// whose defined terms remain the headings throughout the report).
//
// Kept separate from app/data/reportInterpretations.ts (the deterministic
// sentence *builders* that read real score data) because this file is pure,
// unparameterised reference content - the twelve Developmental Capacity
// descriptions, the three Protective Formation descriptions, and the
// score-banded Healthy Availability / Shadow Activation phrasings never
// change per person, only which one is shown does.

import type { Archetype, DevelopmentalCapacity } from "./questions.ts";

// One everyday-language sentence per Developmental Capacity. Written to
// describe the capacity itself, not a person's score on it - the score-
// dependent phrasing lives in describeHealthyAvailability/
// describeShadowActivation below.
export const DEVELOPMENTAL_CAPACITY_PLAIN_LANGUAGE: Record<DevelopmentalCapacity, string> = {
  Visibility:
    "This reflects how comfortable you feel being seen, noticed, or standing out, without needing to shrink or hide.",
  Worth:
    "This reflects how much you can feel genuinely valuable without needing to prove it through achievement or approval.",
  Action:
    "This reflects how easily you can move from an idea or desire into confident, decisive action.",
  Expression:
    "This reflects how freely you can say what you actually think or feel, even under pressure.",
  Truth:
    "This reflects how easily you can face things directly, without needing to reshape or explain them away.",
  Clarity:
    "This reflects how easily your thinking settles into a clear next step, rather than looping.",
  Vulnerability:
    "This reflects how safe it feels to let your true feelings show, even when that feels exposing.",
  Connection:
    "This reflects how easily you can feel close to someone without needing distance or fantasy to feel safe.",
  "Emotional Regulation":
    "This reflects how steady you can stay while still feeling things fully, without being overwhelmed.",
  Boundaries:
    "This reflects how easily you can say no, protect your needs, and stay yourself around other people.",
  Trust:
    "This reflects how easily you can rely on other people while still feeling independent and safe.",
  Vitality:
    "This reflects how much steady energy and aliveness you have available, rather than just getting through the day.",
};

// The three capacities each Archetype contains (Section 7 of this task) -
// a short, consistent tagline for Archetype summary cards.
export const ARCHETYPE_CAPACITY_LABEL: Record<Archetype, string> = {
  Sovereign: "Visibility · Worth · Action",
  Magician: "Expression · Truth · Clarity",
  Lover: "Vulnerability · Connection · Emotional Regulation",
  Warrior: "Boundaries · Trust · Vitality",
};

// The three Protective Formations, defined once in plain language (Section
// 1 of this task). Shown together in one place (Structural Dynamic) so
// later mentions of Collapse/Compensate/Collide elsewhere in the report
// don't need to repeat the definition.
export const FORMATION_PLAIN_LANGUAGE: Record<"Collapse" | "Compensate" | "Collide", string> = {
  Collapse: "the capacity becomes harder to access.",
  Compensate: "protection replaces direct expression.",
  Collide: "two inner needs pull in different directions.",
};

// Healthy Availability, in plain language, banded by the actual score -
// display-only, same bands used nowhere else in scoring (never feeds back
// into any score, ranking, or Result Clarity).
export function describeHealthyAvailability(percent: number): string {
  if (percent >= 75) {
    return "This capacity currently feels reliably accessible to you, even under pressure.";
  }
  if (percent >= 50) {
    return "This capacity is often available to you, though it may feel less consistent under pressure.";
  }
  if (percent >= 25) {
    return "This capacity may currently feel harder to access consistently, especially under pressure.";
  }
  return "This capacity currently feels quite hard to access consistently, particularly under pressure.";
}

// Shadow Activation, in plain language, banded by the actual score.
export function describeShadowActivation(percent: number): string {
  if (percent >= 75) {
    return "Protective reactions around this capacity appear strongly active in your current responses.";
  }
  if (percent >= 50) {
    return "Protective reactions around this capacity are moderately active, especially under stress.";
  }
  if (percent >= 25) {
    return "Protective reactions around this capacity show up sometimes, particularly under pressure.";
  }
  return "Protective reactions around this capacity appear relatively minor right now.";
}

// Injured Archetype, in plain language (Section 1 example, parameterised
// rather than hard-coded to Warrior/Trust).
export function describeInjuredArchetype(archetype: string, capacity: string): string {
  return `This means the ${archetype} capacity linked to ${capacity} is currently being protected. It does not mean the Archetype is damaged or weak.`;
}

// Growth Edge and Integration Direction, defined once and kept distinct
// (Locked foundations: these must never be merged or treated as the same
// concept).
export const GROWTH_EDGE_PLAIN_LANGUAGE =
  "The area your results suggest may benefit most from attention and practice right now.";

export const INTEGRATION_DIRECTION_PLAIN_LANGUAGE =
  "The developmental path your results point toward, based on your Primary Loop specifically.";

export const MOST_AVAILABLE_ARCHETYPE_PLAIN_LANGUAGE =
  "The Archetype where healthy expression currently feels most accessible to you overall.";
