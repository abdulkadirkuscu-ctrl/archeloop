# Assessment v2 Audit Report

Status: Research only. No code, questions, or scoring were modified to produce this report.

Scope: `app/data/questions.ts`, `app/data/scoring.ts` (+ `scoring.test.ts`), `app/data/loops.ts`, `app/data/loopDetails.ts`, `app/data/loopFormulas.ts`, `app/data/archetypeInsights.ts`, `app/data/elementInsights.ts`, `components/FullReport.tsx`, cross-checked against `docs/ARCHELOOP_FRAMEWORK_ARCHITECTURE.md` and `docs/ARCHELOOP_FRAMEWORK_DICTIONARY.md`.

---

## 0. Headline Findings (read this first)

1. **The Healthy question bank has no capacity-level structure.** The Framework says each archetype has 3 named Healthy Capacities, each measured by 2 questions (Internal Capacity + Behavioural Expression) — 6 questions/archetype from 3 distinct constructs. The actual data groups all 6 Healthy questions per archetype under one undifferentiated element-level bucket (`"Healthy Fire"`, `"Healthy Air"`, etc.) tagged `Cognitive`/`Behavioural`/`Emotional` — the *Shadow* taxonomy, not the Capacity/Expression taxonomy the Framework specifies for Healthy items. There is currently no way to score or report "Healthy Visibility: 72%" vs "Purposeful Action: 40%" separately — only the pooled archetype-level Healthy score. This is the single biggest architecture gap ahead of v2. See §1 and §2.

2. **The "Injured Archetype" / "Compensating Archetype" model (Framework §7) is implemented but internally contradictory.** `loopDetails.ts` has the right fields (`weakArchetype`, `overactiveArchetype`) and gets Paper Crown exactly right — matching the Framework doc's own worked example (Injured: Sovereign, Compensating: Magician). But **Smoky Mirrors and Fortress have the wrong Injured Archetype** (`weakArchetype: "Lover"` for both, when Smoky Mirrors canonically belongs to Magician and Fortress to Warrior everywhere else in the codebase). Separately, `loops.ts`'s `integrationKey` (which actually drives the report's "Integration Path") disagrees with `loopDetails.ts`'s `weakArchetype` for **Paper Crown** and **Fantasy Fog**. See §3.1 for the full matrix.

3. **This concept is never shown to the user anyway.** Even where the data is correct, `FullReport.tsx`'s "Core Structure" section never renders `weakArchetype`/`overactiveArchetype` — the report never actually names the Injured or Compensating Archetype for the reader, despite the Framework treating this as central explanatory content.

4. **Question-level Cognitive/Emotional/Behavioural tagging is unreliable in ~15 of 60 questions** — the tag frequently doesn't match what the sentence actually measures (e.g. a question tagged "Cognitive" that opens with "I feel...", or a "Behavioural" question that's actually a self-report of an internal capacity with no observable action named). See §1.3.

5. **Public-facing copy still leaks the internal `Suppression`/`Compensation`/`Collision`/`Inflated` vocabulary** in several places outside what a prior pass already fixed. Full list in §3.2 (carried over and extended from the prior terminology audit).

6. **The scoring engine itself (`scoring.ts`) is mathematically sound and internally consistent** — see §4. It is not implicated in any of the above; the issues are entirely in the *input* (question bank structure) and the *narrative data* (loop metadata), not the arithmetic.

---

## 1. Question Audit

### 1.1 Structural facts (confirmed against `questions.ts`)

- 60 questions total. 15 per archetype (4 archetypes × 15 = 60). Confirmed by `scoring.test.ts`'s own structural assertions, which currently pass.
- Per archetype: 6 Healthy + 9 Shadow (3 Shadow Loops × 3 questions) = 15. Matches Framework §12 exactly.
- Every Shadow Loop has exactly 3 questions, and — critically — **the ID suffix rigidly determines the tag**: every `*1` id is `Cognitive`, every `*2` is `Emotional`, every `*3` is `Behavioural`, with zero exceptions across all 12 loops. This is a real structural strength: the Belief → Emotion → Behaviour sequence (Framework §8) is mechanically guaranteed by construction, not just by convention.
- Healthy questions have **no such guarantee**. `category` is only `"Healthy Fire"` / `"Healthy Air"` / `"Healthy Water"` / `"Healthy Earth"` — never a specific capacity — and the `questionType` rotation is Cognitive→Behavioural→Emotional→Cognitive→Behavioural→Emotional for 3 of 4 archetypes, but Earth breaks even that loose pattern (see §2.1).
- `expressionType` on Shadow questions is `"Collapsed"` / `"Inflated"` / `"Collision"` — three different grammatical forms for what should be one parallel triad (adjective, adjective, noun). "Inflated" doesn't correspond to any canonical term at all (canonical is Collapse/**Compensate**/Collide). This field is not currently rendered anywhere, but it's exactly the kind of leftover that will resurface if anyone wires it into v2 without checking it first.

### 1.2 Per-archetype question tables

**Sovereign / Fire**

| ID | Loop/Capacity bucket | Tag | Text (abridged) | Note |
|---|---|---|---|---|
| HF1 | Healthy Fire | Cognitive | "I feel confident making decisions..." | Text opens "I feel" — Emotional-sounding, tagged Cognitive |
| HF2 | Healthy Fire | Behavioural | "I allow myself to take up space..." | Overlaps HF5 (both = Visibility) |
| HF3 | Healthy Fire | Emotional | "I experience steady joy when I follow my own path." | — |
| HF4 | Healthy Fire | Cognitive | "I trust my inner authority..." | Genuine belief statement, tag fits |
| HF5 | Healthy Fire | Behavioural | "I allow myself to be visible without excessive fear..." | Near-duplicate of HF2 |
| HF6 | Healthy Fire | Emotional | "I can acknowledge my strengths without feeling arrogant or ashamed." | — |
| DL1 | Dimmed Light (Collapse) | Cognitive | "I fear being noticed or visible..." | Fits |
| DL2 | Dimmed Light | Emotional | "I feel ashamed of being myself..." | Fits |
| DL3 | Dimmed Light | Behavioural | "I hide my talents, opinions, or achievements..." | Fits — clean triad |
| PC1 | Paper Crown (Compensate) | Cognitive | "I rely on status, achievements... to feel important." | Fits |
| PC2 | Paper Crown | Emotional | "I feel anxious when I am not admired..." | Fits |
| PC3 | Paper Crown | Behavioural | "I overperform or control situations..." | Fits — clean triad |
| SF1 | Stalled Flame (Collide) | Cognitive | "I get stuck planning instead of taking action." | Reads Behavioural, tagged Cognitive |
| SF2 | Stalled Flame | Emotional | "I struggle to trust my choices..." | Reads Cognitive/belief, tagged Emotional |
| SF3 | Stalled Flame | Behavioural | "I start projects with excitement but often stall..." | Fits |

Sovereign summary: Healthy set has a real redundancy (HF2/HF5) and no distinct Purposeful-Action-flavoured item; Stalled Flame's Cognitive/Emotional tags look swapped relative to their actual content.

**Magician / Air**

| ID | Loop/Capacity bucket | Tag | Text (abridged) | Note |
|---|---|---|---|---|
| HA1 | Healthy Air | Cognitive | "I can clearly understand situations..." | Fits, but overlaps HA2 |
| HA2 | Healthy Air | Behavioural | "I notice patterns and subtle cues..." | Overlaps HA1 (both = Clarity) |
| HA3 | Healthy Air | Emotional | "I can pause and reflect without overthinking." | — |
| HA4 | Healthy Air | Cognitive | "I feel clear and confident in my judgments." | Opens "I feel" — Emotional-sounding, tagged Cognitive |
| HA5 | Healthy Air | Behavioural | "I can explain ideas clearly..." | Fits |
| HA6 | Healthy Air | Emotional | "I trust my perception without needing complete certainty." | "I trust" — Cognitive-sounding, tagged Emotional |
| BP1 | Blank Page (Collapse) | Cognitive | "I struggle to find words or thoughts under stress." | Weak as belief; overlaps BP3 |
| BP2 | Blank Page | Emotional | "I feel mentally blank or frozen under pressure." | Fits |
| BP3 | Blank Page | Behavioural | "I become unable to think clearly or communicate..." | Not really an observable behaviour — restates BP1/BP2 |
| SM1 | Smoky Mirrors (Compensate) | Cognitive | "I reinterpret situations in ways that help me feel more in control." | Reads as behaviour, overlaps SM3 |
| SM2 | Smoky Mirrors | Emotional | "I feel uncomfortable when reality doesn't match expectations." | Fits |
| SM3 | Smoky Mirrors | Behavioural | "I rationalize or reshape situations to avoid feeling vulnerable." | Overlaps SM1 |
| MM1 | Mind Maze (Collide) | Cognitive | "I question myself so much that I struggle to trust my own mind." | Fits |
| MM2 | Mind Maze | Emotional | "I feel mentally overwhelmed when trying to make decisions." | Fits |
| MM3 | Mind Maze | Behavioural | "I overthink situations until I struggle to take action." | Fits — clean triad (Mind Maze is the best-formed Air loop) |

Magician summary: Blank Page's three questions don't clearly differentiate belief → emotion → behaviour (all three describe "mental blankness" from different angles rather than a causal chain); Smoky Mirrors' Cognitive/Behavioural items overlap.

**Lover / Water**

| ID | Loop/Capacity bucket | Tag | Text (abridged) | Note |
|---|---|---|---|---|
| HW1 | Healthy Water | Cognitive | "I can express my feelings authentically..." | "Can express" = behavioural, tagged Cognitive |
| HW2 | Healthy Water | Behavioural | "I connect deeply with others without losing myself." | Overlaps HW4 |
| HW3 | Healthy Water | Emotional | "I feel emotionally present and safely connected to my body." | Overlaps HW6 |
| HW4 | Healthy Water | Behavioural | "I can give and receive affection while maintaining boundaries." | Overlaps HW2 |
| HW5 | Healthy Water | Cognitive | "I feel free to love and connect without shutting down." | Opens "I feel" — Emotional-sounding, tagged Cognitive |
| HW6 | Healthy Water | Emotional | "I can experience strong emotions without becoming overwhelmed." | Overlaps HW3 |
| EL1 | Emotional Lockdown (Collapse) | Cognitive | "I suppress or avoid emotions to feel safe." | Reads as behaviour, overlaps EL3 |
| EL2 | Emotional Lockdown | Emotional | "I often feel emotionally numb or disconnected." | Fits |
| EL3 | Emotional Lockdown | Behavioural | "I withdraw emotionally when vulnerability or closeness arises." | Overlaps EL1 |
| FF1 | Fantasy Fog (Compensate) | Cognitive | "I idealize people or situations because real connection feels unsafe." | Fits |
| FF2 | Fantasy Fog | Emotional | "I feel safer imagining connection than experiencing it directly." | Fits |
| FF3 | Fantasy Fog | Behavioural | "I retreat into fantasies... instead of engaging with reality." | Fits — clean triad |
| FW1 | Flooded Waters (Collide) | Cognitive | "I worry that my emotions will overwhelm me or others." | Borderline (worry = anxious cognition, acceptable) |
| FW2 | Flooded Waters | Emotional | "I feel emotionally overwhelmed or flooded easily." | Fits, slight overlap with FW1 |
| FW3 | Flooded Waters | Behavioural | "I struggle to regulate my emotions once they become intense." | Internal-capacity statement, not an observable behaviour |

Lover summary: the weakest Healthy set of the four — two pairs of near-duplicate questions (HW2/HW4, HW3/HW6) and **zero** genuine Cognitive/belief-type item (HW1 and HW5 both read as Behavioural/Emotional despite their tags). This is the most imbalanced Healthy set in the bank.

**Warrior / Earth**

| ID | Loop/Capacity bucket | Tag | Text (abridged) | Note |
|---|---|---|---|---|
| HE1 | Healthy Earth | Cognitive | "I can set clear boundaries without excessive guilt." | Reads as behaviour, overlaps HE3/HE5 |
| HE2 | Healthy Earth | Behavioural | "I act decisively without needing to overexplain myself." | Fits |
| HE3 | Healthy Earth | Behavioural | "I protect my time, energy, and values effectively." | Second Behavioural in a row; overlaps HE1/HE5 |
| HE4 | Healthy Earth | Cognitive | "I take responsibility without blaming myself or others unfairly." | Fits |
| HE5 | Healthy Earth | Behavioural | "I defend my boundaries calmly when challenged." | Third boundary-themed item; overlaps HE1/HE3 |
| HE6 | Healthy Earth | Emotional | "I can take grounded action while remaining emotionally balanced." | Only Emotional-tagged item in the set |
| CL1 | Compliance (Collapse) | Cognitive | "I adapt myself to avoid conflict or rejection." | Fits |
| CL2 | Compliance | Emotional | "I feel guilty or anxious when I prioritize my own needs." | Fits |
| CL3 | Compliance | Behavioural | "I sacrifice my needs or boundaries to keep peace with others." | Fits — clean triad |
| FO1 | Fortress (Compensate) | Cognitive | "I believe relying on others can make me unsafe or vulnerable." | Fits (explicit "I believe") |
| FO2 | Fortress | Emotional | "I feel uncomfortable when people get emotionally close to me." | Fits |
| FO3 | Fortress | Behavioural | "I create emotional distance, rigid control, or hyper-independence..." | Fits — clean triad |
| BG1 | Barren Ground (Collide) | Cognitive | "I believe I must keep going even when I feel depleted." | Fits |
| BG2 | Barren Ground | Emotional | "I feel emotionally drained by responsibility or survival pressure." | Fits |
| BG3 | Barren Ground | Behavioural | "I continue carrying burdens without allowing rest, support..." | Fits — clean triad |

Warrior summary: Healthy Earth over-indexes on Boundaries (HE1, HE3, HE5 all boundary statements) at the expense of the other two domains the Framework assigns to Warrior — **Trust has zero explicit Healthy question**, and Vitality is only weakly covered by HE6. All three Shadow triads (Compliance, Fortress, Barren Ground) are clean.

### 1.3 Cross-archetype wording-quality patterns

Two systemic issues recur across all four archetypes, not just isolated typos:

- **"I feel..." sentences tagged Cognitive, and "I trust/believe..." sentences tagged Emotional.** Confirmed instances: HF1, HA4, HW5 (Cognitive-tagged but emotionally worded); HA6 (Emotional-tagged but a belief statement); SF2 (Emotional-tagged but a belief statement). This suggests the tagging wasn't derived from a rule applied to the final wording, but assigned first and the wording drifted afterward (or vice versa).
- **"Behavioural" Shadow questions that describe an internal capacity deficit rather than a named action.** BP3, FW3, and to a lesser extent HE1/HW1 describe *inability* ("become unable to...", "struggle to regulate...") rather than an *observable protective behaviour* (compare to the strong examples: DL3 "I hide my talents...", FO3 "I create emotional distance..."). This matters for construct validity — a Behavioural item should be answerable by an outside observer, in principle; several currently aren't.

### 1.4 Overlap summary (candidates for merging/replacing in v2)

| Pair | Loop/Capacity | Why redundant |
|---|---|---|
| HF2 / HF5 | Healthy Fire | Both are "visibility/taking up space", both Behavioural |
| HW2 / HW4 | Healthy Water | Both are "connect with others / boundaries", both Behavioural |
| HW3 / HW6 | Healthy Water | Both are "emotional presence/regulation", both Emotional |
| HE1 / HE3 / HE5 | Healthy Earth | All three are boundary-setting statements |
| BP1 / BP3 | Blank Page | Both describe generic "mental blankness" without a Belief→Behaviour distinction |
| SM1 / SM3 | Smoky Mirrors | Both describe "reshaping/reinterpreting situations" |
| EL1 / EL3 | Emotional Lockdown | Both describe avoidant withdrawal behaviour |

---

## 2. Coverage Audit

### 2.1 Healthy Capacities — target vs. actual

Framework target: 12 named capacities (3 per archetype), 2 questions each (Internal Capacity + Behavioural Expression) = 24 questions, individually reportable.

Actual: 4 undifferentiated buckets (1 per archetype/element), 6 questions each = 24 questions total (count matches), **0 of 12 capacities individually measured or reportable.**

| Archetype | Its 3 named capacities (Framework §4) | Currently distinguished in data? | Implicit coverage from question content |
|---|---|---|---|
| Sovereign | Healthy Visibility, Authentic Leadership, Purposeful Action | No — one "Healthy Fire" pool | Visibility: over-covered (HF2, HF5, partially HF6). Authentic Leadership: HF4 only. Purposeful Action: HF3 only, weakly. |
| Magician | Authentic Expression, Self-Honesty, Clear Thinking | No — one "Healthy Air" pool | Clear Thinking: HA1, HA2 (overlap). Authentic Expression: HA5. Self-Honesty: HA3, HA6 (ambiguous). |
| Lover | Emotional Openness, Genuine Connection, Emotional Flow | No — one "Healthy Water" pool | Connection: HW2, HW4 (duplicate). Emotional Flow: HW3, HW6 (duplicate). Emotional Openness/expression: HW1, HW5 (both mistagged, ambiguous). |
| Warrior | Self-Respect, Connected Strength, Inner Vitality | No — one "Healthy Earth" pool | Self-Respect/Boundaries: HE1, HE3, HE5 (triple-covered). Inner Vitality: HE6 only. Connected Strength: **no clearly dedicated item.** |

Useful fact for the redesign: **the exact Loop ↔ Capacity pairing v2 needs already exists in the codebase**, in `components/FullReport.tsx`'s `loopPathMap` (lines 9–58) — e.g. Dimmed Light → Healthy Visibility, Paper Crown → Authentic Leadership, Stalled Flame → Purposeful Action. Restructuring the Healthy question bank around these 12 existing pairings (2 questions each: Capacity + Expression) would directly implement Framework §4/§8 with no new naming decisions required.

### 2.2 Shadow Loops — target vs. actual

Framework target: 12 loops, 3 questions each (Cognitive/belief, Emotional, Behavioural), individually reportable.

Actual: **Quantitatively perfect** — every loop has exactly 3 questions in the right tag distribution, mechanically guaranteed by the ID-suffix convention (§1.1).

Qualitatively:

| Well-formed triads (belief → emotion → behaviour genuinely distinct) | Triads with a tagging or overlap issue |
|---|---|
| Paper Crown, Mind Maze, Fantasy Fog, Compliance, Fortress, Barren Ground, Dimmed Light (minor) | Stalled Flame (Cognitive/Emotional tags appear swapped), Blank Page (all 3 items redundant, weak Behavioural item), Smoky Mirrors (Cognitive/Behavioural overlap), Emotional Lockdown (Cognitive/Behavioural overlap), Flooded Waters (weak Behavioural specificity) |

7 of 12 loops are clean; 5 of 12 have a genuine construct-validity issue worth fixing in v2 (see §1.2 tables for specifics).

---

## 3. Loop Architecture Audit

### 3.1 Injured Archetype / Compensating Archetype — the full consistency matrix

Framework §7 defines: **Injured Archetype** = whose healthy capacity is disrupted, and **determines loop ownership**. **Compensating Archetype** = the archetype protectively recruited; does *not* determine ownership. The Framework's own worked example: *Paper Crown → Injured: Sovereign, Compensating: Magician.*

The codebase models this in two places that don't agree with each other or, in two cases, with the canonical loop-ownership table (Framework §5 / `scoring.ts`'s `LOOP_TO_ARCHETYPE`):

| Loop | Canonical owner (Framework §5, `scoring.ts`) | `loopDetails.ts` `weakArchetype` | `loopDetails.ts` `overactiveArchetype` | `loops.ts` `integrationKey` (healing path) | Verdict |
|---|---|---|---|---|---|
| Dimmed Light | Sovereign (Collapse) | Sovereign | Magician or Warrior | Healthy Sovereign | Consistent |
| Blank Page | Magician (Collapse) | Magician | Warrior | Healthy Magician | Consistent |
| Emotional Lockdown | Lover (Collapse) | Lover | Warrior or Magician | Healthy Lover | Consistent |
| Compliance | Warrior (Collapse) | Warrior | Lover or Sovereign | Healthy Warrior | Consistent |
| **Paper Crown** | Sovereign (Compensate) | **Sovereign** ✓ matches Framework's own example | **Magician** ✓ matches Framework's own example | **Healthy Lover** | **`loops.ts` disagrees with `loopDetails.ts` and with the Framework doc's own worked example** |
| **Smoky Mirrors** | Magician (Compensate) | **Lover** ✗ | Magician | Healthy Lover | **`weakArchetype` contradicts canonical ownership — Smoky Mirrors belongs to Magician everywhere else in the codebase** |
| **Fantasy Fog** | Lover (Compensate) | Lover ✓ | Magician | **Healthy Warrior** | **`loops.ts` disagrees with `loopDetails.ts`** |
| **Fortress** | Warrior (Compensate) | **Lover** ✗ | Warrior | Healthy Lover | **`weakArchetype` contradicts canonical ownership — Fortress belongs to Warrior everywhere else in the codebase** |
| Stalled Flame | Sovereign (Collide) | Warrior* | Sovereign + Magician | Healthy Warrior | Internally consistent (see note) |
| Mind Maze | Magician (Collide) | Warrior* | Magician | Healthy Warrior | Internally consistent (see note) |
| Flooded Waters | Lover (Collide) | Warrior* | Lover | Healthy Warrior | Internally consistent (see note) |
| Barren Ground | Warrior (Collide) | Lover* | Warrior | Healthy Lover | Internally consistent (see note) |

\* For Collide loops, `weakArchetype` appears to mean something different than for Collapse/Compensate loops: not "who owns/is injured by this loop" but "whose capacity is missing and would resolve the collision" — and `overactiveArchetype` plays the "canonical owner" role instead. This is internally consistent loop-to-loop (all 4 Collide loops follow the same pattern, and `loops.ts` agrees with `loopDetails.ts` for all 4), but it means **the field name `weakArchetype` is silently overloaded with two different meanings** depending on formation type. That's worth resolving explicitly in v2 even where the values themselves aren't wrong.

**Net finding:** Paper Crown and Fantasy Fog have a real cross-file disagreement (which archetype does integration actually route through?). Smoky Mirrors and Fortress have a wrong `weakArchetype` value that contradicts their own canonical ownership. Only Dimmed Light, Blank Page, Emotional Lockdown, Compliance, Mind Maze, Flooded Waters, and Barren Ground are unambiguous everywhere.

**Also:** Even where correct, this data is never shown to the user — `FullReport.tsx`'s Core Structure section (line 739) renders only `coreFear`, `coreDynamic`, and `psychologicalMechanism`, never `weakArchetype`/`overactiveArchetype`. The concept the Framework treats as central explanatory content (§7, §9: "the Framework explains the underlying protective dynamics that created it") currently has no user-facing surface at all.

**Secondary data mismatch:** `loops.ts`'s `secondaryLoops` and `loopDetails.ts`'s `relatedDynamics` agree for 11 of 12 loops. For **Smoky Mirrors**, `loops.ts` lists `[Mind Maze, Fortress, Emotional Lockdown]` while `loopDetails.ts` lists `[Fantasy Fog, Mind Maze, Emotional Lockdown]` — "Fortress" vs "Fantasy Fog" as the third related loop. Every other loop's list is reciprocal with its neighbors (e.g. Fortress's own list includes Smoky Mirrors in both files); `loops.ts`'s version preserves that reciprocity, `loopDetails.ts`'s doesn't — suggesting `loopDetails.ts` has the error here.

**Duplicated content risk:** `loopDetails.ts`'s `coreStructure.integrationShift` and `loopFormulas.ts`'s `integrationShift` cover the same idea in separately-written prose for every loop. They don't currently contradict each other, but they can drift out of sync silently since nothing keeps them in agreement (this is exactly the mechanism that produced the Smoky Mirrors mismatch above).

### 3.2 Collapse/Compensate/Collide terminology still leaking into user-facing copy

(Carried over and extended from the prior terminology-consistency pass; not yet fixed as of this audit.)

- `app/what-is-archeloop/page.tsx:45,51,57` — Three C's cards show subtitles literally reading "Suppression"/"Compensation"/"Collision"
- `components/FullReport.tsx:267` — "expression may be collapsed, compensated, or caught in collision" (Archetypal Compass copy)
- `components/FullReport.tsx:551` — card heading "Collapsed Energy" (paired with `loopFormulas.ts`'s `collapsedEnergy` field)
- `app/data/loopDetails.ts:359,540,810` — `structuralDynamic` text for Paper Crown, Fantasy Fog, Fortress: "Collapsed Fire/Water compensates through..."
- `app/integration/[slug]/page.tsx:100-102` — labels "Suppression Pattern" / "Compensation Pattern" / "Inner Collision"
- `app/archetype-interactions/page.tsx:56` — "Collapsed Air", "Suppressed Warrior", "Weak Fire" (also a Growth-Edge/Weak-Archetype language-rule violation)
- `app/archetypes/sovereign/page.tsx:30` — "Shame when collapsed or suppressed"
- All four archetype pages (sovereign/magician/lover/warrior) — Shadow Loop tags read "Suppressed X." / "Inflated X." / "Colliding X." instead of Collapse/Compensate/Collide (12 lines total; "Inflated" isn't a canonical term at all)
- `app/data/loops.ts:16,555` — `integrationReason` text: "collapsed Fire/Earth energy"
- `app/report/[id]/page.tsx:89` — "Unlock your full personalised report" (Copy Guide "Avoid" list)
- `app/progress-dashboard/page.tsx:265` — stat label "Loops Broken" (Copy Guide "Avoid" list)

### 3.3 What's confirmed clean

- **Archetype names** (Sovereign/Magician/Lover/Warrior), **Element names** (Fire/Air/Water/Earth), and the **12 Shadow Loop names** are spelled identically everywhere: `scoring.ts`, `questions.ts`, `loops.ts`, `loopDetails.ts`, `loopFormulas.ts`, `FullReport.tsx`, the four `app/archetypes/*` pages, and the loop slug pages.
- **The 12 Integration Path names** and **12 Integrated Self Capacity names** (`FullReport.tsx`'s `loopPathMap`, lines 9–58) match Framework Architecture §4 and Framework Dictionary §7 exactly, word for word, and are used consistently in `integrationJourneys.ts`, `integrationSuccessMetrics.ts`, and the homepage sample report.
- No `™`/`®` symbols remain anywhere in `.ts`/`.tsx` source.

---

## 4. Scoring Audit (explanation only — current logic, unchanged)

All logic lives in `app/data/scoring.ts`, a single pure function `scoreAssessment(responses, orderedQuestions)` consumed identically by the live assessment (`app/assessment/page.tsx`) and by nothing else that recomputes it — reports read the saved output, they don't rescore.

**Per-archetype scores** (`ArchetypeScore`): for each archetype, average its 6 Healthy answers → `healthyPercent`; average its 3 Suppression / 3 Compensation / 3 Collision answers separately → `suppressionPercent` / `compensationPercent` / `collisionPercent`; `shadowPercent` = the unweighted mean of those three. `integratedPercent = healthyPercent − shadowPercent × 0.6`, clamped to [0,100]. This is the archetype's "healthy energy available once shadow pressure is discounted" — not a raw average of all 15 questions, and not Healthy-only.

**Elemental balance**: a separate, secondary metric. `elementalPresenceRaw` per archetype = `healthyPercent − shadowPercent × 0.35` (a *different* discount weight than `integratedPercent`'s 0.6 — intentional, per the inline comment, for a softer "presence" reading), then normalised so all four elements' `percentage` sum to 100. A second normalisation (`elementalPercentages`) does the same starting from `integratedPercent` instead, giving two different "elemental %" views that are both exposed on `AssessmentResult` (`elementalActivation` vs `elementalPercentages`) — worth knowing this isn't one number reused twice, but two independently-derived numbers with different formulas answering a similar-sounding question.

**Loop scores**: for each of the 12 loops, `loopAverage` = the mean of its own 3 dedicated questions. The code comments confirm (and the arithmetic bears out) that a loop's parent archetype's own `suppressionPercent`/`compensationPercent`/`collisionPercent` is *mathematically identical* to that loop's `loopAverage`, because each archetype has exactly one loop per formation and no other question feeds that percentage. So the final loop `score = loopAverage × 0.8 + (100 − archetype's integratedPercent) × 0.2` has exactly two independent inputs — the loop's own 3-question average, and how unintegrated its parent archetype is overall — not three, even though it reads like three terms.

**Primary/Secondary loop**: `loopLandscape` is all 12 loops sorted by score descending (loop-name ascending as an explicit tie-break). Primary = index 0, Secondary = index 1. This computed ranking is what the assessment now hands the report as `secondaryLoop` (a prior fix — previously the report derived "secondary loop" from a static per-primary-loop lookup table in `loops.ts`'s `secondaryLoops`/`loopDetails.ts`'s `relatedDynamics`, which could contradict the actual computed Loop Landscape ranking shown two sections later on the same page. That static table is now only a fallback for legacy saved reports that predate this field).

**Confidence**: `50 + (primaryScore − secondaryScore)`, clamped to [0,100]. A tie yields exactly 50 (framed as a genuine coin-flip); confidence rises toward 100 as the gap widens. It measures *separation between the top two patterns*, not the primary loop's absolute strength restated.

**Most Available / Growth Edge Archetype**: both read off the same `integratedPercent` ranking, from opposite ends — guaranteed never to be computed by different formulas from each other.

`scoring.test.ts` is a deterministic, framework-free assertion script (not wired into any CI I can see referenced) that currently validates: structural counts (60 questions, 15/archetype, 6 Healthy + 3×3 Shadow), extreme single-archetype profiles resolve to that archetype's own loop as primary, an all-Healthy profile yields 100% integration and near-zero loop scores, each of the 12 loops maxed individually resolves to itself as primary, six hand-constructed mixed Primary+Secondary cases resolve correctly, a fully neutral (all-3) profile is deterministic and low-confidence, a one-point near-tie resolves to the expected ordering with moderate (not extreme) confidence, partial/incomplete responses don't crash, and every produced percentage stays in [0,100] under a maxed profile. All currently pass.

---

## 5. Report Audit

Everything renders from one component, `components/FullReport.tsx`, driven by a single `primaryLoop` string plus the assessment's saved `integratedScores`/`loopLandscape`/`secondaryLoop`/`confidence`.

**Data origins per section:**

| Section | Source | Genuinely personalised, or templated per primary-loop only? |
|---|---|---|
| Hero (Archetype/Element/Response Style) | `loops[primaryLoop]` | Templated — same for every user with this primary loop |
| Your ArcheLoop Path (Loop→Journey→Integrated Self) | `loopPathMap[primaryLoop]` (static lookup) | Templated |
| Structural Dynamic | `loopDetails[primaryLoop].structuralDynamic` | Templated |
| Loop Formula (4 cards + Observable Behaviours) | `loopFormulas[primaryLoop]` | Templated |
| Primary Loop card | `loops[primaryLoop]` | Templated |
| **Secondary Activation** | `reportData.secondaryLoop` (real computed rank #2) | **Personalised** |
| Loop Landscape (ranked list + scores) | `reportData.loopLandscape` (all 12, real scores) | **Personalised** |
| Pattern separation % | `reportData.confidence` | **Personalised** |
| Core Structure (coreFear/coreDynamic/psychologicalMechanism) | `loopDetails[primaryLoop].coreStructure` | Templated — and never surfaces `weakArchetype`/`overactiveArchetype` at all (§3.1) |
| Archetypal Compass + per-archetype bars | `reportData.integratedScores` (all 4 archetypes, real numbers) | **Personalised** |
| Archetype Integration intro % | `primaryArchetypeScore.integratedPercent` | **Personalised** (one number); the three cards below it (Low/Shadow/Healthy) are templated per-archetype |
| Elemental Balance (Low/High/Healthy cards) | `elementInsights[primaryElement]` | Templated — same 3 cards shown for every user sharing that element, regardless of their own elemental score |
| Deeper Pattern Map (4 cards) | `loops[primaryLoop]` | Templated |
| Nervous System / Relational Activators | `loopDetails[primaryLoop]` | Templated |
| Body Activation | Computed client-side from `primaryLoop.body`/`.title` + `formattedMechanism` | Templated (loop-determined, not score-magnitude-determined) |
| Loop Interaction / cascade | `loopDetails[primaryLoop].cascade`, or a fallback sentence naming the real `secondaryLoop` | Templated content, but references the real secondary loop where no cascade array exists |
| Core Protective Belief | `loops[primaryLoop].coreBelief` | Templated |
| Integration Blueprint / Meet Your Integrated Self | `loopDetails[primaryLoop].coreStructure.integrationShift` + `loopPathMap` | Templated |

**Net picture:** of ~18 report sections, **5 use the person's actual computed numbers** (secondary loop, loop landscape ranking + scores, confidence %, the archetype compass + bars, the one integration-% sentence). The remaining ~13 are pulled entirely from which of the 12 static loop/archetype/element templates matches the person's *primary loop selection* — the same paragraph is shown to every user who lands on the same primary loop, regardless of how strong or borderline that result was, and regardless of their answers to anything else. That's not a bug (it's a reasonable MVP design — templated-per-loop is exactly what "12 Shadow Loops" implies), but it is the natural next lever for v2 if deeper personalisation is a launch goal: e.g. varying Body Activation or Structural Dynamic phrasing by the archetype's actual `shadowPercent` intensity, or by which of the three formation percentages is most elevated, rather than only by which loop won.

**Where v2 could plug in the redesigned Healthy-Capacity data**: none of the current report sections reference a specific Healthy Capacity's own score (only the pooled archetype `healthyPercent`/`integratedPercent`). If §1/§2's 12-capacity restructure happens, the report has an obvious new section to add: a per-capacity breakdown under "Archetypal Availability", parallel to the existing per-loop breakdown.

---

## 6. Final Recommendations — Implementation Roadmap for Assessment v2

Ordered by dependency (each step assumes the ones above it are done), not by size:

1. **Decide the Injured/Compensating Archetype model once, in the Framework Architecture doc, with all 12 loops enumerated explicitly** — not just the Paper Crown example. Right now the doc gives one example and the codebase has silently split into two different interpretations (Collapse/some-Compensate loops = "injured archetype owns the loop"; Collide loops = "weakArchetype is the missing resolving capacity"). Pick one consistent semantic before touching code, then rename `weakArchetype`/`overactiveArchetype` → `injuredArchetype`/`compensatingArchetype` everywhere, and fix Smoky Mirrors' and Fortress' values to match canonical ownership. Reconcile `loops.ts`'s `integrationKey` against the corrected values for Paper Crown and Fantasy Fog so there's one authoritative healing-archetype per loop, not two disagreeing sources.
2. **Redesign the Healthy question bank around the 12 existing Loop↔Capacity pairings** (`loopPathMap` already defines them). Replace each archetype's undifferentiated 6-question pool with 3 named capacities × 2 questions (Internal Capacity, Behavioural Expression), removing the redundant pairs identified in §1.4 in the process. This is the change with the highest ratio of framework-alignment value to implementation effort, since the target structure is already implied by data that exists.
3. **Re-derive the Shadow-loop Cognitive/Emotional/Behavioural tags from the actual sentence content**, fixing the ~10 mismatches in §1.3 (Stalled Flame's apparent swap, Blank Page's non-differentiated triad, Smoky Mirrors/Emotional Lockdown's Cognitive/Behavioural overlaps, Flooded Waters' weak Behavioural item) rather than trusting the existing tag. Keep the ID-suffix-determines-tag convention — it's a genuine strength worth preserving in v2's schema.
4. **Only after 1–3 are settled**, revisit `scoring.ts`: nothing in it needs to change for the Shadow side (it's sound), but a capacity-level Healthy score (from step 2) will need its own aggregation path if the report is going to show per-capacity results rather than only per-archetype `healthyPercent`.
5. **Add the Injured/Compensating Archetype and (if built) per-capacity breakdown to `FullReport.tsx`** once steps 1–4 land — the report currently has no section for either, and both are now well-defined enough to write copy for.
6. **Copy pass**: fix the Collapse/Compensate/Collide leaks in §3.2 and the two Copy-Guide "Avoid" list hits, and fix the Smoky Mirrors `relatedDynamics` mismatch in `loopDetails.ts`. These are independent of 1–5 and can happen anytime; lowest risk, smallest scope.

Explicitly out of scope per your instructions and not touched in this pass: any rewrite of question wording, any change to scoring formulas, and any file edits — this document is the plan, not the change.
