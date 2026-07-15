# ArcheLoop Assessment v2.0 (Canonical)

**Status:** Frozen  
**Version:** 2.0  
**Locked:** 14 July 2026

---

# Purpose

This document defines the canonical question bank for the ArcheLoop Assessment.

It serves as the single source of truth for every assessment question used throughout the ArcheLoop platform.

The question bank has been developed directly from the ArcheLoop Framework Architecture, Framework Dictionary, Assessment Design Specification, and Assessment Design Standard.

Every question has been individually reviewed to ensure it measures a single psychological construct and aligns with the underlying theoretical architecture of the framework.

This document should be treated as the authoritative reference for:

- Assessment implementation
- Scoring logic
- Shadow Loop detection
- Personalised reports
- Archetype availability
- Growth Edge calculation
- Integration Path recommendations
- Future assessment development
- Research and validation

---

# Assessment Structure

The ArcheLoop Assessment contains **60 questions** organised into a balanced developmental architecture.

## Healthy Development

- 12 Developmental Capacities
- 2 Healthy questions per Capacity
  - Healthy Capacity
  - Healthy Expression

**24 Healthy questions**

---

## Protective Adaptations

- 12 Shadow Loops
- 3 Protective questions per Shadow Loop
  - Protective Belief
  - Protective Emotion
  - Protective Behaviour

**36 Shadow questions**

---

## Total

- 60 Questions
- 4 Archetypes
- 12 Developmental Capacities
- 12 Shadow Loops
- 24 Healthy items
- 36 Protective items

---

# Design Principles

Every question within this document follows the ArcheLoop Assessment Design Standard.

Each question:

- Measures one psychological construct only.
- Uses clear, everyday language.
- Measures observable psychological processes rather than personality labels.
- Avoids double-barrelled wording.
- Belongs to exactly one Developmental Capacity or one Shadow Loop.
- Measures either Healthy Capacity, Healthy Expression, Protective Belief, Protective Emotion, or Protective Behaviour.
- Contributes to balanced assessment coverage across all four Archetypes.
- Supports accurate scoring and report generation.

Every Shadow Loop is measured through three independent forms of evidence:

**Protective Belief → Protective Emotion → Protective Behaviour**

These are evidence used to identify the underlying Protective Formation.

The assessment measures evidence.

The ArcheLoop Framework explains the underlying mechanism.

---

# Canonical Status

This document is considered **frozen**.

The wording of every question has been intentionally chosen and should not be changed during routine development.

Questions should only be modified if one of the following conditions is met:

- Empirical validation identifies a genuine measurement problem.
- Psychometric testing demonstrates that a question reduces reliability or validity.
- The ArcheLoop Framework itself undergoes an intentional architectural revision.
- A genuine ambiguity, wording error, or construct mismatch is discovered.

Stylistic preference alone is **not** sufficient reason to change a question.

---

# Implementation Rule

All technical implementations must follow this document exactly.

This includes:

- `questions.ts`
- scoring logic
- report generation
- assessment UI
- analytics
- future mobile applications
- future APIs
- future research datasets

If implementation and this document ever differ, **this document takes precedence**.

---

# Version History

## Version 2.0 — 14 July 2026

Major redesign of the ArcheLoop Assessment following the Framework Architecture review.

Key improvements included:

- Introduction of the 12 Developmental Capacity model.
- Healthy Capacity / Healthy Expression measurement.
- Protective Belief / Emotion / Behaviour evidence model.
- Balanced measurement across all four Archetypes.
- Full alignment with Collapse, Compensate, and Collide.
- Canonical alignment with the ArcheLoop Framework.
- Removal of redundant, overlapping, and double-barrelled questions.
- Complete structural audit and refinement of all 60 assessment items.

This version represents the canonical assessment for ArcheLoop v2.0 and serves as the foundation for all future implementation and validation.