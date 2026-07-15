# Assessment Design Specification

## Purpose

This document defines the psychological architecture of the ArcheLoop Assessment.

It explains:

- what the Assessment measures
- how each question contributes to measurement
- how Healthy Capacities are assessed
- how Shadow Loops are detected
- how assessment results are calculated
- how the final personalised report is generated

This document is the authoritative reference for assessment design, scoring, and future assessment development.

The implementation in `questions.ts`, `scoring.ts`, and report generation should always remain consistent with the principles defined here.

---

# Assessment Architecture

The ArcheLoop Assessment follows a layered measurement model.

```
60 Questions
        ↓
12 Developmental Capacities
        ↓
24 Healthy Measurements
        ↓
36 Shadow Measurements
        ↓
Healthy Capacity Scores
        ↓
Shadow Loop Scores
        ↓
Primary Shadow Loop
        ↓
Secondary Shadow Loop
        ↓
Archetypal Availability
        ↓
Developmental Imbalance
        ↓
Growth Edge
        ↓
Integration Path
        ↓
Integrated Self
```

The Assessment measures Developmental Capacities.

Shadow Loops are derived from those measurements.

---

# Developmental Domains

The Assessment measures four Developmental Domains.

| Archetype | Element | Developmental Capacities |
|------------|----------|--------------------------|
| Sovereign | Fire | Visibility • Worth • Action |
| Magician | Air | Expression • Truth • Clarity |
| Lover | Water | Vulnerability • Connection • Emotional Regulation |
| Warrior | Earth | Boundaries • Trust • Vitality |

These twelve Developmental Capacities represent the primary constructs measured by the Assessment.

---

# Assessment Measurement Model

Every Developmental Capacity is measured through five questions.

```
Healthy Capacity
Healthy Expression

↓

Protective Belief
Protective Emotion
Protective Behaviour
```

This creates five measurements for every Developmental Capacity.

Across twelve capacities this produces a balanced sixty-question Assessment.

---

# Healthy Measurement

Healthy functioning is measured through two complementary questions.

## Healthy Capacity

Measures the person's internal access to the psychological ability.

Examples:

- Can I express this naturally?
- Is this capacity psychologically available?

---

## Healthy Expression

Measures how consistently that healthy capacity appears in everyday life.

Examples:

- Do I actually behave this way?
- Is this capacity expressed consistently across situations?

Healthy questions measure **availability**, not perfection.

---

# Shadow Measurement

When a Developmental Capacity becomes disrupted, protective patterns emerge.

These protective patterns are measured through three complementary questions.

## Protective Belief

Measures the underlying belief maintaining the protective pattern.

Examples:

- What do I believe?

---

## Protective Emotion

Measures the emotional experience associated with the protective pattern.

Examples:

- What do I consistently feel?

---

## Protective Behaviour

Measures the observable behaviour used to maintain psychological safety.

Examples:

- What do I repeatedly do?

Together these three questions describe one coherent psychological process.

```
Belief

↓

Emotion

↓

Protective Behaviour
```

---

# Protective Formations

Every Shadow Loop belongs to one Protective Formation.

Protective Formations describe **how** a Developmental Capacity becomes disrupted.

## Collapse

Authentic expression becomes psychologically unavailable.

The person withdraws from the healthy capacity.

Question focus:

- Protective Belief
- Protective Emotion
- Protective Behaviour

---

## Compensate

Authentic expression no longer feels reliable or sufficient.

The psyche manufactures a protective imitation.

Question focus:

- Protective Belief
- Protective Emotion
- Protective Behaviour

---

## Collide

Multiple psychological systems become activated simultaneously but cannot work together.

Internal conflict interrupts healthy functioning.

Question focus:

- Protective Belief
- Protective Emotion
- Protective Behaviour

Protective Formation is fixed for every Shadow Loop.

---

# Assessment Outputs

The Assessment derives:

- Healthy Capacity Scores
- Shadow Loop Scores
- Primary Shadow Loop
- Secondary Shadow Loop
- Most Available Archetype
- Growth Edge
- Developmental Imbalance
- Integration Path
- Integrated Self

The Assessment does not diagnose personality.

It identifies the person's current developmental pattern.

---

# Scoring Philosophy

The Assessment measures Developmental Capacities rather than personality traits.

Healthy measurements determine the availability of each Developmental Capacity.

Shadow measurements identify the protective pattern associated with that capacity.

Together they allow ArcheLoop to derive:

- Shadow Loop activation
- Relative Archetypal Availability
- Developmental Imbalance
- Growth Edge
- Integration Direction

The Assessment measures the visible developmental pattern.

The Framework explains the underlying protective dynamics that created it.

---

# Design Principles

The Assessment is intentionally balanced.

- Four Archetypes
- Twelve Developmental Capacities
- Twenty-four Healthy Measurements
- Thirty-six Shadow Measurements
- Sixty Total Questions

Every Developmental Capacity receives identical measurement coverage.

Every Shadow Loop is measured through:

- Protective Belief
- Protective Emotion
- Protective Behaviour

Every Healthy Capacity is measured through:

- Healthy Capacity
- Healthy Expression

This ensures consistent psychological coverage across the entire Assessment.

---

## Version

**Assessment Design Specification v1.0**

This document defines the canonical design of the ArcheLoop Assessment.

All future assessment questions, scoring logic, reports, and technical implementation should remain consistent with the principles defined within this document.

## Question Writing Principles

Every Assessment question must satisfy the following principles:

- Measures exactly one Developmental Capacity.
- Measures exactly one psychological construct.
- Measures exactly one assessment lens.
- Avoids combining multiple Archetypes within a single item.
- Uses clear, natural language.
- Contributes unique information to the Assessment.

## Construct Mirror Principle

Where appropriate, Healthy and Shadow questions should reflect opposite developmental movements.

Healthy questions describe increasing availability of a Developmental Capacity.

Shadow questions describe the protective beliefs, emotions, and behaviours that reduce, imitate, or conflict with that same capacity.

This creates conceptual symmetry between healthy functioning and protective adaptation while preserving clear construct boundaries.

## Domain Anchoring Principle

Healthy and Shadow questions should, where appropriate, remain anchored to the same real-world psychological domain.

Healthy questions measure increasing availability of a Developmental Capacity.

Shadow questions measure the protective beliefs, emotions, and behaviours that reduce, imitate, or conflict with that same capacity.

Anchoring both healthy and protective items to the same psychological domain improves construct clarity, scoring interpretation, and report coherence.

Every Developmental Capacity is expressed in two possible ways:

• Healthy Functioning
• Protective Functioning

Protective Functioning develops through one of three Protective Formations:

• Collapse
• Compensate
• Collide

Each Protective Formation is measured through three complementary forms of evidence:

• Protective Belief
• Protective Emotion
• Protective Behaviour