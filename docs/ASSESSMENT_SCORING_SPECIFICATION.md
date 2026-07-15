# Assessment Scoring Specification

## Purpose

This document is the authoritative reference for how the ArcheLoop Assessment is scored.

It explains the input scale, every scoring formula, tie-breaking rules, incomplete-answer handling, and backward compatibility for `app/data/questions.ts` and `app/data/scoring.ts`.

It complements — and does not replace — `docs/ASSESSMENT_DESIGN_SPECIFICATION.md` (the psychological design rationale) and `docs/ARCHELOOP_FRAMEWORK_ARCHITECTURE.md` (the canonical framework itself).

## Version

Scoring version: **2.0** (`AssessmentResult.scoringVersion === "2.0"`).

There is one calculation engine, `app/data/scoring.ts`. Legacy fields on its output are compatibility views derived from the v2.0 scores below, never a second, independently-maintained formula set.

---

## 1. Assessment Inputs

The Assessment measures twelve Developmental Capacities, three per Archetype/Element, each mapped to one Healthy Capacity name and one Shadow Loop. This table (`CANONICAL_CAPACITY_TABLE` in `app/data/questions.ts`) is the single source every score in this document is derived from:

| Archetype | Element | Capacity | Healthy Capacity | Formation | Shadow Loop |
|---|---|---|---|---|---|
| Sovereign | Fire | Visibility | Healthy Visibility | Collapse | Dimmed Light |
| Sovereign | Fire | Worth | Authentic Leadership | Compensate | Paper Crown |
| Sovereign | Fire | Action | Purposeful Action | Collide | Stalled Flame |
| Magician | Air | Expression | Authentic Expression | Collapse | Blank Page |
| Magician | Air | Truth | Self-Honesty | Compensate | Smoky Mirrors |
| Magician | Air | Clarity | Clear Thinking | Collide | Mind Maze |
| Lover | Water | Vulnerability | Emotional Openness | Collapse | Emotional Lockdown |
| Lover | Water | Connection | Genuine Connection | Compensate | Fantasy Fog |
| Lover | Water | Emotional Regulation | Emotional Flow | Collide | Flooded Waters |
| Warrior | Earth | Boundaries | Self-Respect | Collapse | Compliance |
| Warrior | Earth | Trust | Connected Strength | Compensate | Fortress |
| Warrior | Earth | Vitality | Inner Vitality | Collide | Barren Ground |

Each Developmental Capacity has exactly 5 questions: **Healthy Capacity**, **Healthy Expression**, **Protective Belief**, **Protective Emotion**, **Protective Behaviour** (12 × 5 = 60 total). This replaces the v1 bank, in which the 6 Healthy questions per Archetype were pooled at the element level with no per-capacity distinction — see `docs/ASSESSMENT_V2_AUDIT.md` (Sections 0–2) for why that was the primary driver of this rewrite.

## 2. Response Scale

- Likert scale, 1–5: 1 = Strongly disagree, 2 = Disagree, 3 = Neutral, 4 = Agree, 5 = Strongly agree.
- `likertToPercent`: 1→0, 2→25, 3→50, 4→75, 5→100. Unchanged from v1.0 — no defect was found that would justify changing it.
- **No reverse-scoring.** Every Healthy Capacity/Healthy Expression question is phrased so agreement affirms health; every Protective Belief/Emotion/Behaviour question is phrased so agreement affirms Shadow activation. Verified against the wording of all 60 canonical questions, not assumed.
- **Unanswered questions**: a missing response (or a response whose index doesn't resolve to a known question) contributes nothing. Since v2.0 has exactly one question per (capacity, lens) pair — no averaging across multiple questions within a lens — an unanswered lens has no data at all, and is treated as 0 rather than a fabricated neutral value, matching the v1.0 convention of `sum / (count || 1)`.

## 3. Question Metadata

Every question exposes:

```ts
{
  id: string;                          // legacy runtime id, e.g. "HF1" - kept stable
  canonicalId: string;                 // v2.0 id, e.g. "F1" - see Section 12
  text: string;                        // verbatim from docs/ASSESSMENT_V2_CANONICAL_QUESTIONS.md
  archetype: Archetype;
  element: Element;
  developmentalCapacity: DevelopmentalCapacity;
  formation: "Healthy" | "Collapse" | "Compensate" | "Collide";
  lens: "Healthy Capacity" | "Healthy Expression"
      | "Protective Belief" | "Protective Emotion" | "Protective Behaviour";
  shadowLoop: ShadowLoopName | null;    // null only for Healthy questions
  healthyCapacity: string;             // present on both Healthy and Shadow questions
}
```

`formation` on Shadow questions carries the public Collapse/Compensate/Collide vocabulary directly — there is no internal Suppression/Compensation/Collision translation layer for questions or scores in v2.0. That legacy vocabulary is retained only where `app/data/loops.ts` (public loop-description content, out of scope for this task) still uses it; `RESPONSE_STYLE_LABELS` in `app/data/scoring.ts` continues to translate it for `app/loops/[slug]/page.tsx`.

## 4. Developmental Capacity Scoring

For each of the 12 capacities, every response contributes to exactly one of five measurements (question-level evidence):

```
healthyCapacityScore      = percent(this capacity's Healthy Capacity question)
healthyExpressionScore    = percent(this capacity's Healthy Expression question)
protectiveBeliefScore     = percent(this capacity's Protective Belief question)
protectiveEmotionScore    = percent(this capacity's Protective Emotion question)
protectiveBehaviourScore  = percent(this capacity's Protective Behaviour question)
```

All scores are 0–100. These are framework scores for personalised interpretation, not diagnostic instruments — one Healthy Capacity item and one Healthy Expression item are not claimed to provide clinical precision.

## 5. Healthy Availability

```
healthyAvailabilityScore = round((healthyCapacityScore + healthyExpressionScore) / 2)
```

**Healthy Availability and Shadow Activation are never netted against each other.** A capacity can score 100 on both simultaneously — available in some contexts, protected in others — and both numbers are always reported side by side. This is verified by an explicit test (`scoring.test.ts`, "Capacity with high Healthy AND high Shadow simultaneously").

## 6. Shadow Loop Activation

Each capacity maps to exactly one Shadow Loop (1:1, per Section 1's table), so a loop's activation is its capacity's Shadow-side numbers, equally weighted:

```
shadowActivationScore = round(mean(protectiveBeliefScore, protectiveEmotionScore, protectiveBehaviourScore))
```

No hidden multipliers. This is a deliberate simplification from v1.0, whose loop score blended the loop's own average (80% weight) with a "how unintegrated is this loop's parent archetype overall" pressure term (20% weight). That blend is removed in v2.0: Primary/Secondary Loop selection (Sections 9–10) operates on this pure per-loop mean.

`developmentalBalanceScore = healthyAvailabilityScore − shadowActivationScore` is also computed per capacity (signed, range −100…100) and returned as supplementary context. It does not drive Growth Edge selection (Section 12) or any other decision in this engine.

## 7. Protective Formation Scores

`Collapse`, `Compensate`, and `Collide` are each the mean of their four corresponding Shadow Loops' `shadowActivationScore` (one loop per Archetype per formation):

```
formationScores.collapse   = mean(Dimmed Light, Blank Page, Emotional Lockdown, Compliance)
formationScores.compensate = mean(Paper Crown, Smoky Mirrors, Fantasy Fog, Fortress)
formationScores.collide    = mean(Stalled Flame, Mind Maze, Flooded Waters, Barren Ground)
```

These are interpretive summaries only. They do not replace the individual Shadow Loop scores, which remain fully exposed via `loopScores`.

## 8. Archetype Scores

For each of the four Archetypes:

- **Healthy Availability** = mean of its 3 capacities' `healthyAvailabilityScore`.
- **Shadow Activation** = mean of its 3 loops' `shadowActivationScore`.
- **Capacity profile** = the 3 `CapacityScore` objects for this archetype, individually — never collapsed into one ambiguous "element total".
- **Formation profile** = `{ healthy, collapse, compensate, collide }` — the archetype's Healthy Availability plus its own Collapse/Compensate/Collide loop scores.

Legacy fields, derived (not independently computed) from the above for `components/FullReport.tsx` and `app/assessment/page.tsx`, which read these exact names: `healthyPercent` (= healthyAvailability), `shadowPercent` (= shadowActivation), `suppressionPercent` / `compensationPercent` / `collisionPercent` (= formationProfile.collapse / compensate / collide), and:

```
integratedPercent = clamp(round(healthyAvailability − shadowActivation × 0.6), 0, 100)
```

Unchanged from v1.0 (same 0.6 weight), kept only for backward compatibility with the existing report UI, which this task does not modify. It is **not** used for Most Available Archetype (Section 11) or Growth Edge (Section 12).

## 9. Primary Shadow Loop

The loop with the highest `shadowActivationScore`. See Section 14 for tie-breaking.

## 10. Secondary Shadow Loop

The mathematically second-highest loop under the identical ordering used for Primary Shadow Loop (Section 14) — no requirement that it come from a different Archetype or a different Formation.

This was chosen over the two alternatives (force a different Archetype; force a different Formation) for one reason: the report already displays a full ranked "Loop Landscape" of all 12 loops elsewhere on the same page, and the Secondary Loop must always equal that list's #2 entry. Forcing a different Archetype/Formation would let "Secondary Loop" and "Loop Landscape" disagree — precisely the contradiction a prior fix to this codebase already removed (v1.0's report once derived "secondary loop" from a static per-primary-loop lookup table, which could contradict the assessment's own computed ranking). The simplest rule that cannot contradict itself elsewhere in the same report was chosen over a more elaborate diversity rule.

## 11. Most Available Archetype

**Definition**: the Archetype with the highest mean Healthy Availability across its three Developmental Capacities.

**Explicitly not**: the Archetype with the highest total including Shadow items; the most Shadow-activated Archetype; Healthy score minus Shadow score (i.e. not `integratedPercent`).

Ties are broken by JavaScript's stable sort over the fixed `["Sovereign", "Magician", "Lover", "Warrior"]` order — deterministic, verified by a repeat-run test.

Return shape includes both the winning Archetype and the three individual `healthyAvailabilityScore` values (one per capacity) that produced it:

```ts
{
  archetype: Archetype;
  element: Element;
  healthyAvailability: number;
  capacities: { developmentalCapacity: DevelopmentalCapacity; healthyAvailabilityScore: number }[];
}
```

## 12. Growth Edge

**Definition**: the Developmental Capacity with the lowest `healthyAvailabilityScore`.

Two candidates were evaluated before implementation:

- **Candidate A** — lowest Healthy Availability. *(Chosen.)*
- **Candidate B** — largest positive `shadowActivation − healthyAvailability` gap.

**Why A, not B**: Candidate B can rank a capacity that is already strongly Healthy (but also strongly triggered — e.g. 80% Healthy Availability, 75% Shadow Activation) *above* a capacity that is simply underdeveloped on both counts (e.g. 30% Healthy Availability, 20% Shadow Activation), because the first capacity's gap (−5) is arithmetically "larger" (less negative) than the second's (−10). That would misrepresent someone with both strong Healthy and strong Shadow expression by treating their already-reasonably-healthy-but-triggered capacity as the priority, while ignoring the capacity that is genuinely least developed. Candidate A always answers the same, simpler, developmental question — "where would increasing Healthy Availability matter most?" — which is the Framework's own definition of Integration (Framework Architecture §10: "Integration increases access to Healthy Capacities"). `developmentalBalanceScore` (the Candidate-B gap) is still computed and returned per capacity as supplementary context; it just doesn't drive this selection.

Tie-break: canonical capacity order (Section 14).

Language note: this engine never labels an Archetype or Capacity "weak" — Growth Edge is a number and a name, not a judgement. (Report copy that presents this to users is out of scope for this task.)

## 13. Result Clarity

Legacy field name: `confidence`. Describes how clearly the Primary Loop separates from the Secondary Loop in this specific result. **It is not a statistical or clinical confidence interval** and should never be presented as one.

```
separationScore = clamp(round(50 + (primaryLoop.score − secondaryLoop.score)), 0, 100)
resultClarity   = clamp(round(separationScore × answerCompleteness), 0, 100)
```

- A tie between Primary and Secondary yields the 50% floor (a genuine coin-flip); the gap between them pushes the figure toward 100.
- Multiplying by `answerCompleteness` (Section 15) means a partially-completed assessment is transparently reported as less clear, rather than silently reusing the full-completion formula on incomplete data. When all 60 questions are answered, `answerCompleteness = 1` and this reduces to the v1.0 formula exactly (preserving all prior test expectations for fully-completed assessments).
- The legacy field name `confidence` is retained on `AssessmentResult` (identical value to `resultClarity`) because `components/FullReport.tsx` renders it as "Pattern separation: X%" and this task does not change report UI. `resultClarity` is the v2.0 canonical name for any future UI work.

## 14. Tie Breaking

**Primary/Secondary Shadow Loop** (loops are sorted once; Primary = index 0, Secondary = index 1):

1. Higher `shadowActivationScore`.
2. Then higher `protectiveBehaviourScore`.
3. Then higher `protectiveEmotionScore`.
4. Then higher `protectiveBeliefScore`.
5. Then a fixed canonical loop order (`CANONICAL_LOOP_ORDER`, matching Section 1's table row order: Dimmed Light, Paper Crown, Stalled Flame, Blank Page, Smoky Mirrors, Mind Maze, Emotional Lockdown, Fantasy Fog, Flooded Waters, Compliance, Fortress, Barren Ground).

**Growth Edge**: lowest `healthyAvailabilityScore`, tie-broken by the same canonical capacity order (the row order of Section 1's table).

**Most Available Archetype**: highest mean Healthy Availability, tie-broken by stable sort over the fixed `["Sovereign", "Magician", "Lover", "Warrior"]` order.

None of these rules ever depend on object or array insertion order at runtime — every tie-break resolves against an explicit, hardcoded, documented order.

## 15. Output Object

```ts
{
  scoringVersion: "2.0";
  capacityScores: CapacityScore[];       // 12
  loopScores: LoopScore[];                // 12, sorted per Section 14
  archetypeScores: ArchetypeScore[];      // 4
  formationScores: { collapse; compensate; collide };
  primaryLoop: LoopScore | null;
  secondaryLoop: LoopScore | null;
  mostAvailableArchetype: MostAvailableArchetypeResult | null;
  growthEdge: GrowthEdgeResult | null;
  resultClarity: number;
  answerCompleteness: number;             // answeredCount / 60

  // legacy (derived from the above, not a second engine)
  confidence: number;                     // === resultClarity
  loopLandscape: LoopScore[];             // === loopScores (same array)
  growthEdgeArchetype: ArchetypeScore | null; // legacy archetype-level definition
  elementalActivation: ElementBalance[];
  elementalPercentages: { element: Element; percentage: number }[];
}
```

`loopScores`/`capacityScores` always contain all 12/12 entries regardless of completeness — a partial assessment narrows Result Clarity, it never narrows which loops/capacities are reported (Section 16).

## 16. Design Principles

- One calculation engine. Legacy fields are compatibility views, never a parallel formula set — see Section 12 of `docs/ASSESSMENT_V2_AUDIT.md`'s recommendations, which this rewrite implements.
- Healthy Availability and Shadow Activation are always reported as two distinct numbers, never netted into a single "the truth about this capacity" score.
- Every tie-break is a documented, fixed order — never incidental object-key or array order.
- `scoreAssessment` never throws on missing or short `responses` arrays; every unresolved question/lens contributes 0 (Section 2).
- No hidden multipliers exist anywhere in this engine that exist only to force a particular loop or archetype to win.

## 17. Future Validation

Not yet done, and out of scope for this implementation:

- No real user-response data has been used to validate that these formulas produce psychologically meaningful separations in practice (all current tests use synthetic, hand-constructed response profiles).
- `capacityScores`/`loopScores` are not currently surfaced anywhere in `components/FullReport.tsx` (report content/layout is explicitly out of scope for this task) — a future task should decide how (or whether) to add a per-capacity report section now that the data exists at that granularity.
- `scoring.test.ts` is a manual validation script (`node --experimental-strip-types app/data/scoring.test.ts`), not wired into `npm run build` or any CI pipeline — see `docs/ASSESSMENT_V2_AUDIT.md` Section 4, item 6. It should be run by hand after any future change to `questions.ts` or `scoring.ts` until that gap is closed.

## 18. Version History

- **v1.0** (pre-existing, undocumented as a formal spec): element-level Healthy pooling (6 undifferentiated questions per Archetype), loop scores blended with a parent-archetype pressure term, `confidence` as the only clarity/separation field, no capacity-level scores at all.
- **v2.0** (this document): capacity-level scoring introduced (`capacityScores`, 12 entries), Shadow Loop activation simplified to a pure 3-question mean, `resultClarity`/`answerCompleteness`/`mostAvailableArchetype`/`growthEdge` added as first-class v2.0 outputs with explicitly documented definitions and tie-breaks, all legacy fields preserved as derived compatibility views. Implemented in `app/data/questions.ts` and `app/data/scoring.ts`; question wording sourced verbatim from `docs/ASSESSMENT_V2_CANONICAL_QUESTIONS.md`.
