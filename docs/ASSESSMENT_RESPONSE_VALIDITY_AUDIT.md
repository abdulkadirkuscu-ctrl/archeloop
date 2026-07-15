# Assessment Response Validity Audit

Status: Implemented (low-risk corrections only). No canonical question wording, scoring formula, Primary/Secondary ranking, Healthy Availability formula, Shadow Activation formula, Most Available Archetype formula, or Growth Edge formula was changed.

Scope: platform-wide terminology, `app/data/loopStructuralMetadata.ts`, the live Likert scale and normalisation, extreme/contradictory/careless/incomplete response handling, a new response-quality metadata layer, a Primary Loop minimum-evidence policy, and pre-assessment respondent guidance.

---

## 1. Platform-wide terminology audit

Full file-and-line audit of every search term, classified 1–5 (1 = public, must correct; 2 = internal legacy identifier, safe; 3 = historical compatibility field, must remain temporarily; 4 = dead code/technical debt; 5 = canonical and correct).

| File : Line | Term found | Class | Action |
|---|---|---|---|
| `app/what-is-archeloop/page.tsx:45,51,57` | subtitles `"Suppression"`/`"Compensation"`/`"Collision"` under Collapse/Compensate/Collide cards | 1 | **Fixed** → subtitles now read the Framework's own one-line definitions: "What becomes unavailable" / "What becomes performative" / "What becomes psychologically conflicted" (verbatim from Framework Architecture §6). |
| `app/integration/[slug]/page.tsx:100-102` | labels `"Suppression Pattern"` / `"Compensation Pattern"` / `"Inner Collision"` | 1 | **Fixed** → "Collapse Pattern" / "Compensate Pattern" / "Collide Pattern". |
| `app/archetypes/{sovereign,magician,lover,warrior}/page.tsx` (12 lines, 3 per file) | `"Suppressed {Element}."` / `"Inflated {Element}."` / `"Colliding {Element}."` prefixes on Shadow Loop cards | 1 | **Fixed** → `"Collapse ({Element})."` / `"Compensate ({Element})."` / `"Collide ({Element})."` — uses the locked nouns directly rather than inventing new adjective conjugations of them. |
| `app/archetype-interactions/page.tsx:56` | `"Collapsed Air ... Weak Fire ... Suppressed Warrior ..."` | 1 | **Fixed** → `"Collapse in Air ... Lower Fire availability ... Collapse in Warrior ..."` — removes the explicit Copy-Guide-banned "Weak Fire" framing and the internal "Suppressed" term, preserves the original sentence's meaning and structure. |
| `components/FullReport.tsx:766` | `InfoCard label="Response Style"` (one remaining instance; every other occurrence in this file already read "Protective Formation" from the prior Report v2 pass) | 1 | **Fixed** → "Protective Formation", for consistency with the rest of the report and with the Framework Dictionary's official term. |
| `app/data/loops.ts` (`mechanism` field, all 12 loops) | `"Suppression"` / `"Compensation"` / `"Collision"` | 2 | Safe. Never rendered directly — `formatMechanism()` in `FullReport.tsx` and `RESPONSE_STYLE_LABELS` in `scoring.ts` translate it to the public term at render time (confirmed: no direct `{loop.mechanism}` interpolation exists anywhere in `.tsx`). |
| `app/data/scoring.ts` (`QuestionMechanism` type, `LOOP_TO_MECHANISM`) | `"Suppression"` / `"Compensation"` / `"Collision"` | 2 | Safe. Exists only to translate `loops.ts`'s legacy vocabulary via `RESPONSE_STYLE_LABELS`; every score object in this file already uses the public `Collapse`/`Compensate`/`Collide` values directly (`LoopScore.formation`, `CapacityScore.formation`). |
| `app/loops/[slug]/page.tsx` | comment referencing "internal Suppression/Compensation/Collision" | 2 | Safe — code comment, not rendered. |
| `app/data/loopDetails.ts` (`weakArchetype`, `overactiveArchetype`, `dominantElement`, `suppressedElement`, all 12 loops) | field names and values | 3 | **Must remain temporarily.** These fields are never rendered directly by any live page (confirmed by grep — `FullReport.tsx`'s "Core Structure" section renders only `coreFear`/`coreDynamic`/`psychologicalMechanism`). They still back some of this file's own narrative prose (`structuralDynamic`, `integrationKey`) and are the input the Part 2 re-audit below cross-checked against. Superseded for any *new* public-facing use by `app/data/loopStructuralMetadata.ts`, which is now the canonical source. Renaming or removing these fields outright was judged higher-risk than leaving them as an internal, unread compatibility layer — flagged as a future cleanup, not done here. |
| `app/data/loopDetails.ts` `Fortress.structuralDynamic` / `Paper Crown.structuralDynamic` | `"Collapsed Water compensates through..."` / `"Collapsed Fire compensates through..."` | 3 | Not rendered for Report v2 (which uses `loopStructuralMetadata.ts`'s `structuralDynamic` instead, gated on `scoringVersion === "2.0"`); still rendered for pre-v2 saved reports as `detail.structuralDynamic`. Left unchanged — editing it would change what a legacy report displays, which is explicitly out of scope for this task ("do not redesign the premium report"). |
| `app/data/archeloopMethodology.ts` | `responseStyles.compensation` / `.collision` (object keys), `"Growth Edge"` (one return value) | 4 | **Dead code.** Grepped for every possible import path — nothing in the app imports `archeloopMethodology`. Not fixed; flagged for a founder decision (delete, or finish wiring it into Triggered Pro). |
| `lib/loops/logic-matrix.ts`, `lib/report-engine/generate-report.ts`, `lib/report-engine/get-loop-profile.ts` | `FormationType = "Suppression"\|"Compensation"\|"Collision"`, `weakArchetypes`/`overactiveArchetypes` (plural arrays), `dominantElements`/`suppressedElements` | 4 | **Dead code — a second, entirely separate report-generation system.** `generateReport()` and `getLoopProfile()` are exported but never imported by any route, page, component, or API handler in the repository (confirmed by exhaustive grep for `generateReport(`, `get-loop-profile`, `logic-matrix`, `report-engine`). Not fixed or deleted — this is a genuine "which system is authoritative" question for the founder, out of scope for a terminology-only correction, and deleting untouched files wasn't requested. |
| `components/ArchetypeCompass` (in `FullReport.tsx`, legacy-only) `"Most Available"` / `"Least Available"` cards | computed locally from `integratedPercent` | 3 | Must remain — this component only renders for reports without `scoringVersion: "2.0"` (per the prior Report v2 task's compatibility gate). Changing it would alter how an already-saved legacy report displays. |
| `FullReport.tsx` (Report v2 "Developmental Direction" section) `"Growth Edge"` / `"Most Available Archetype"` | sourced from `reportData.growthEdge` / `reportData.mostAvailableArchetype` with their precise scoring definitions given inline | 5 | Canonical and correct — already implemented in the prior task, satisfies "Growth Edge, only where its precise scoring definition is explained." |
| `app/data/loopStructuralMetadata.ts` | `injuredArchetype`, `compensatingArchetype`, `participatingArchetypes` | 5 | Canonical and correct (re-verified in Part 2 below, one correction applied). |
| `app/data/questions.ts`, `app/data/scoring.ts` (`Formation`, `ProtectiveFormation` types) | `"Collapse"` / `"Compensate"` / `"Collide"` throughout | 5 | Canonical and correct — this has been the case since the v2.0 question-bank rewrite. |

No occurrences of "Weak Archetype," "Weakest Archetype," "Least Available Archetype," "Compensating Archetype," "Injured Archetype," or "Protective Archetype" as literal public-facing strings were found outside the classifications above.

---

## 2. Canonical Injured / Compensating / Participating Archetype re-audit

The existing `loopStructuralMetadata.ts` was **not** assumed correct because its own tests passed. Every entry was re-validated against `loops.ts` (core belief, description, signs, protective mechanism) and `loopDetails.ts` (structural dynamic, `dominantElement`/`suppressedElement`, `compensationPattern`, `psychologicalMechanism`) directly, not against the prior turn's own reasoning.

### Injured Archetype ownership

Unchanged — sourced directly from `CANONICAL_CAPACITY_TABLE` (the same table `scoring.ts` itself is built from), which already matches the table given in this task exactly. No drift is structurally possible between loop ownership and scoring, since both read the same table.

### Compensating Archetype — re-evaluated against canonical evidence

| Loop | Injured capacity | Protective substitute (from `loops.ts`/`loopDetails.ts`) | Distinct Archetype? | Verdict |
|---|---|---|---|---|
| **Paper Crown** | Sovereign/Worth — "I am only valuable if I appear impressive." | Image, status, achievement-narrative, "symbolic authority" (`loopDetails.ts`: `dominantElement: "Air"`, `compensationPattern: "Air creates symbolic authority to compensate for unstable Fire"`) | Yes — image/narrative-construction is Magician's own domain (Expression/Truth), genuinely borrowed, not Sovereign's native toolkit | **Magician** (unchanged — also matches the Framework Architecture's own worked example, Injured: Sovereign / Compensating: Magician) |
| **Fantasy Fog** | Lover/Connection — "It is safer in my inner world." | Fantasy, idealisation, imagined connection (`loopDetails.ts`: `dominantElement: "Air"`, `psychologicalMechanism: "Fantasy creates emotional safety without relational risk"`) | Yes — imagination/narrative-construction is Magician's domain, distinct from Lover's own Connection capacity | **Magician** (unchanged) |
| **Smoky Mirrors** | Magician/Truth — "If I control the story, I will be safe." | Reshaping perception, narrative control, rationalisation (`loopDetails.ts`: `compensationPattern: "Perception reshapes reality..."`, `psychologicalMechanism: "Narrative control replaces emotional contact"`) | **No** — narrative control/reshaping perception is Magician's *own* native toolkit, applied defensively to protect Magician's *own* Truth capacity. Water/Lover ("emotional vulnerability") is what's being *avoided*, not a substitute being *recruited*. | **Self-compensating — no distinct Compensating Archetype.** (unchanged, re-confirmed) |
| **Fortress** | Warrior/Trust — "I must protect myself at all costs." | Control, distance, self-containment, hyper-independence (`loopDetails.ts`: `compensationPattern: "Control, distance, and self-containment compensate for unsafe vulnerability"`) | **No** — control/self-reliance is Warrior's own native domain (Boundaries/Trust/Vitality), applied defensively to protect Warrior's *own* Trust capacity. Water/Lover ("vulnerability") is what's being avoided, not recruited. | **Self-compensating — no distinct Compensating Archetype.** (unchanged, re-confirmed) |

**Correction applied to Paper Crown / Fantasy Fog:** none — both were re-derived from the underlying loop content independently in this pass (not merely carried forward) and reached the same conclusion the prior pass did, for the reasons in the table above.

### Participating Archetypes for Collide — re-evaluated, one correction made

`loopDetails.ts`'s own `dominantElement` field turns out to be the cleanest, least speculative evidence source here: for three of the four Collide loops it names **two** elements as actively, jointly present; for the fourth it names only **one**, with the second element marked `suppressedElement` (missing/absent, not active).

| Loop | `loopDetails.ts` `dominantElement` | Reading | Verdict |
|---|---|---|---|
| **Stalled Flame** | `"Fire + Air"` (`suppressedElement: "Grounded Earth action"`) | Two systems genuinely co-active: Fire/Sovereign's desire and momentum vs. Air/Magician's hesitation and over-analysis, explicitly described as colliding. Earth/Warrior is named only as the *missing* resolution. | **[Sovereign, Magician]** — unchanged |
| **Flooded Waters** | `"Water + Earth"` (`suppressedElement: "Grounded regulation"`) | Structural dynamic text: *"Water seeks... while Earth struggles to maintain grounding"* — Earth/Warrior is actively straining, not merely absent. | **[Lover, Warrior]** — unchanged |
| **Barren Ground** | `"Earth + Water"` (`suppressedElement: "Emotional nourishment"`) | Structural dynamic text: *"Earth continues carrying... while Water becomes emotionally depleted"* — Water/Lover is actively depleting (an active process), not merely absent. | **[Warrior, Lover]** — unchanged |
| **Mind Maze** | `"Air"` only (`suppressedElement: "Earth"`) | **Only one element is named as dominant/active.** Earth/Warrior is marked `suppressedElement` — the same status "missing capacity" has for every other loop's Growth Edge target, not an actively colliding second system. The conflict described (*"Overthinking disconnects the system from action and clarity"*) reads as intra-Magician: the capacity to analyse colliding with the capacity to reach closure, both Air-domain functions — not a second archetype's energy actively present. | **Corrected: no `participatingArchetypes` — self-colliding**, matching how Smoky Mirrors and Fortress are self-compensating. Assigning Warrior here (as the prior pass did) was speculative: nothing in the loop's own canonical content describes Warrior as *actively* contributing, only as the *missing* resolution, which is what Growth Edge and Integration Direction already exist to represent. |

This is the one substantive correction from this audit: **`Mind Maze` no longer has a `participatingArchetypes` field.** `app/data/loopStructuralMetadata.ts` and its test suite (`scoring.test.ts` Part 4) were both updated accordingly.

### Collapse loops

Re-confirmed: all four Collapse loops (Dimmed Light, Blank Page, Emotional Lockdown, Compliance) have an Injured Archetype and neither a Compensating Archetype nor Participating Archetypes. This isn't an oversight — Collapse is definitionally a withdrawal (Framework §6: "Authentic expression becomes unavailable"), with nothing manufactured or recruited to substitute for it, so there is nothing for either field to name. No extra Archetypes were added to any Collapse loop to make the table symmetrical.

### Final canonical table

| Loop | Injured Archetype | Capacity | Formation | Compensating Archetype | Participating Archetypes |
|---|---|---|---|---|---|
| Dimmed Light | Sovereign | Visibility | Collapse | — | — |
| Paper Crown | Sovereign | Worth | Compensate | **Magician** | — |
| Stalled Flame | Sovereign | Action | Collide | — | **Sovereign, Magician** |
| Blank Page | Magician | Expression | Collapse | — | — |
| Smoky Mirrors | Magician | Truth | Compensate | — (self-compensating) | — |
| Mind Maze | Magician | Clarity | Collide | — | — (self-colliding — **corrected**) |
| Emotional Lockdown | Lover | Vulnerability | Collapse | — | — |
| Fantasy Fog | Lover | Connection | Compensate | **Magician** | — |
| Flooded Waters | Lover | Emotional Regulation | Collide | — | **Lover, Warrior** |
| Compliance | Warrior | Boundaries | Collapse | — | — |
| Fortress | Warrior | Trust | Compensate | — (self-compensating) | — |
| Barren Ground | Warrior | Vitality | Collide | — | **Warrior, Lover** |

Roles were kept strictly distinct throughout — no "main Archetype" / "secondary Archetype" field exists anywhere; Injured, Compensating, Participating, Most Available, and Growth Edge Archetype remain five separate, independently-sourced concepts (Most Available and Growth Edge come from `scoring.ts`, computed from the person's actual answers; Injured/Compensating/Participating come from `loopStructuralMetadata.ts`, fixed content that never varies by respondent).

---

## 3. Live response scale and normalisation

Confirmed directly from code, not assumed.

**Live answer options** (`app/assessment/page.tsx`, `answerOptions`):

```
Strongly agree     → value 5
Agree               → value 4
Neutral             → value 3
Disagree            → value 2
Strongly disagree   → value 1
```

**Normalisation formula** (`app/data/scoring.ts`, `likertToPercent`):

```
1 → 0
2 → 25
3 → 50
4 → 75
5 → 100
```

This is exactly the expected transparent mapping — confirmed, not assumed.

- **Healthy-item direction:** agreement affirms health (verified against wording of all 60 canonical Healthy Capacity/Healthy Expression questions).
- **Shadow-item direction:** agreement affirms Shadow evidence (verified against wording of all 60 canonical Protective Belief/Emotion/Behaviour questions).
- **No reverse scoring exists anywhere** in the 60-question bank.
- **Unanswered items** contribute 0 to their lens score (not a fabricated neutral 50) and are separately tracked via `answerCompleteness = answeredCount / 60`, which both `resultClarity` and the new `responseQuality`/`primaryLoopStatus` layer read.
- **Neutral genuinely maps to 50** — the literal numeric midpoint, applied identically to Healthy and Shadow items.
- **Strongly Agree on a Shadow item correctly means stronger Shadow evidence** — confirmed by Profile G below (Shadow=5 across the board → every archetype's `shadowActivation` = 100).
- **Strongly Agree on a Healthy item correctly means stronger Healthy Availability** — confirmed by Profile F below (Healthy=5 across the board → every archetype's `healthyAvailability` = 100).
- **Healthy and Shadow scores are never netted** — confirmed structurally (`scoring.ts` computes `healthyAvailabilityScore` and `shadowActivationScore` independently; `integratedPercent`, the one place they interact, is explicitly documented as legacy-only and not used by Growth Edge, Most Available Archetype, or the new response-quality layer) and empirically (Profile H below).

---

## 4. Extreme and contradictory profile outputs (actual, not assumed)

All profiles run against the live `scoreAssessment()` via a temporary analysis script (deleted after use — not committed); the same fixtures are now permanent, deterministic assertions in `scoring.test.ts` Part 5.

| Profile | resultClarity | Loops tied at max | Primary Loop selected | Verdict |
|---|---|---|---|---|
| **A** — all Strongly Disagree (1) | 50 | **12 of 12** | Dimmed Light (canonical tie-break, zero evidence) | Not defensible as presented pre-fix — `resultClarity`'s 50 floor is designed for a top-2 tie, not a 12-way tie, and gave no signal that this is a zero-information profile. **Now flagged**: `primaryLoopStatus: "Low Differentiation"`, `responseQuality.flags` includes `Flat Response Pattern`, `Low Answer Variability`, `Indiscriminate Disagreement`. |
| **B** — all Disagree (2) | 50 | 12 of 12 | Dimmed Light | Same pattern as A, scaled. Same flags apply. |
| **C** — all Neutral (3) | 50 | 12 of 12 | Dimmed Light | The exact scenario named in the task. `resultClarity` alone is silent on this; `primaryLoopStatus`/`responseQuality` now catch it (`High Neutral Use`, `Flat Response Pattern`, `Low Answer Variability`). |
| **D** — all Agree (4) | 50 | 12 of 12 | Dimmed Light | High Healthy Availability and high Shadow Activation simultaneously across every one of the 12 capacities (both = 75). Correctly **not** netted — both numbers are preserved. Flagged `Indiscriminate Agreement` and `High Healthy and Shadow Endorsement` (12 of 12 capacities high-high). |
| **E** — all Strongly Agree (5) | 50 | 12 of 12 | Dimmed Light | Confirmed: this is **not** presented as a clean, specific Fortress/Dimmed Light/etc. result — it is now explicitly `Low Differentiation`. |
| **F** — Healthy=5, Shadow=1 | 50 | 12 of 12 | Dimmed Light (score 0) | Healthy Availability 100% everywhere, Shadow Activation 0% everywhere — no loop has genuine evidence. `primaryLoopStatus: "Low Differentiation"` — no loop is presented as detected. |
| **G** — Healthy=1, Shadow=5 | 50 | 12 of 12 | Dimmed Light (score 100) | Strong, genuine Shadow evidence across the board, but undifferentiated between loops — still `Low Differentiation` at the *Primary Loop* level even though Shadow Activation itself is real and high; the ranked Loop Landscape (all 12 at 100%) remains fully visible and honest. |
| **H** — Trust capacity Healthy=5 & Shadow=5, rest Neutral | 100 | **1** | **Fortress** (100) | Genuine, specific result — `primaryLoopStatus: "Detected"`. Both Healthy (100) and Shadow (100) preserved simultaneously for the Trust capacity, never cancelled. **Not** flagged as broad endorsement (only 1 of 12 capacities is high-high) — correctly distinguished from Profile D. |
| **I** — alternating 5,1,5,1... | 50 | **6** | Dimmed Light (100) | Raw answer variance is high (not `Low Answer Variability`), yet the round-robin archetype ordering in `assessmentOrder` produces a 6-way tie downstream — an "artificially precise"-looking 100%-score result that is in fact a careless-pattern artifact. Caught by `Flat Response Pattern`, independent of the variance flag. |
| **J** — straight-line 1/2/3/4/5 | 50 (all) | 12 (all) | Dimmed Light (all) | Covered by A/C/D/E above plus explicit 2-value coverage in tests. |
| **K** — seeded random (3 seeds) | 58–59 | **1** each | Genuinely differentiated (e.g. Emotional Lockdown, Fantasy Fog ×2) | Confirms random noise does **not** produce false high-certainty results in the current design — `primaryLoopStatus: "Detected"` correctly, `resultClarity` in a moderate, plausible range, no spurious "Low Differentiation." |
| **L** — incomplete (1/15/30/45/59 of 60) | 1 / 13 / 25 / 38 / 49 | 12 / 9 / 6 / 3 / 11 | Dimmed Light or another tie-break result each time | `resultClarity` scales down transparently with completeness (confirmed proportional, not silently reusing the full-completion formula). `loopScores`/`capacityScores` still report all 12 entries at every completeness level (never narrowed). `responseQuality.flags` includes `Incomplete Responses` at every level, plus other flags depending on which answers happened to be given. |

**Headline finding:** in every fully-tied or heavily-incomplete profile, the tie-break cascade lands on the same loop — **Dimmed Light** — because it is first in `CANONICAL_LOOP_ORDER`. Before this task, every person who answered indiscriminately (straight-lining, all-neutral, or heavily incomplete) would have been told "Your Primary Shadow Loop is Dimmed Light" with no indication this was a fallback rather than a finding. This is now surfaced honestly via `primaryLoopStatus` and `responseQuality`, without changing which loop the tie-break selects (Primary/Secondary Loop ranking itself is unchanged, per the "do not change" constraint).

---

## 5. Response-quality policy

### Weakness in `resultClarity` alone

`resultClarity` measures only the score gap between Primary and Secondary Loop (scaled by completeness). It has a structural blind spot: its "tie" floor of 50 looks identical whether exactly two loops are tied among an otherwise well-differentiated field, or all twelve are tied in a flat, uninformative profile (Profiles A–E, J all report `resultClarity: 50`, indistinguishable from a real close call). It also cannot detect indiscriminate agreement/disagreement, straight-lining, or excessive Neutral use — a profile can show a large Primary–Secondary gap while still being unreliable for any of those reasons.

### Model implemented

A new, purely additive `responseQuality: ResponseQuality` field, computed in `scoreAssessment()` from the raw `responses` array and the already-computed `capacityScores`/`loopScores` — **never** fed back into `shadowActivationScore`, `healthyAvailabilityScore`, ranking, or `resultClarity`.

```ts
type ResponseQualityFlag =
  | "Flat Response Pattern"
  | "High Neutral Use"
  | "Indiscriminate Agreement"
  | "Indiscriminate Disagreement"
  | "Low Answer Variability"
  | "High Healthy and Shadow Endorsement"
  | "Incomplete Responses";

type ResponseQuality = {
  status: "Clear" | "Mixed" | "Low Differentiation";
  flags: ResponseQualityFlag[];
  responseVariance: number;
  neutralRate: number;
  agreementRate: number;
  disagreementRate: number;
  healthyShadowContradictionRate: number;
  explanation: string;
};
```

**Documented, tested thresholds** (chosen against the fixtures in Part 4, not picked silently):

| Threshold | Value | Why |
|---|---|---|
| Loops tied at maximum Shadow Activation | > 2 | 1 (clear winner) or 2 (Primary/Secondary genuinely tied, already reflected in `resultClarity`'s own 50 floor) are normal outcomes for a real profile. 3+ occurred in every degenerate fixture tested (A–E, I, most of L) and in none of the random fixtures (K). |
| Neutral rate | > 50% | Well beyond normal response spread. |
| Agreement / disagreement rate | > 85% | Regardless of item content — catches indiscriminate responding independent of the Healthy/Shadow semantic split. |
| Raw answer variance | < 0.3 | Straight-lining (variance 0) and near-straight-lining. Deliberately does **not** catch alternating 5/1 (variance 4) — that pattern is instead caught by the loop-tie signal, which measures a genuinely different thing (see Profile I). |
| Capacities scoring ≥75/≥75 on Healthy and Shadow simultaneously | ≥ 50% of the 12 | Distinguishes broad, instrument-wide endorsement (Profile D: 12/12) from genuine contextual duality (Profile H: 1/12, not flagged). |

`status` is `"Low Differentiation"` when `Flat Response Pattern` is present or 3+ flags co-occur; `"Mixed"` for 1–2 flags; `"Clear"` for none.

**Language used** (all copy in `FLAG_EXPLANATIONS`, `app/data/scoring.ts`) is neutral and non-accusatory throughout — no instance of "dishonest," "invalid," "manipulative," "deceptive," or "failed assessment." Example: *"Several patterns scored very similarly, so the assessment could not clearly distinguish one from another."*

---

## 6. Primary Loop minimum-evidence policy

**Option B was implemented** — a `primaryLoopStatus: "Detected" | "Low Differentiation"` interpretive wrapper, computed from the same tied-at-maximum count that drives `responseQuality`'s `Flat Response Pattern` flag (kept as one shared signal, not two independently-tuned ones, so they can never disagree with each other).

- **Option A** (always return a Primary Loop) is what the code did before this task — rejected as the status quo the task asked to fix.
- **Option C** (minimum Primary score + minimum spread) was considered but rejected for now: it requires a second, independent threshold on top of the tie count, and the fixtures don't clearly demonstrate it catches anything the tie-count threshold doesn't already catch (every degenerate fixture in Part 4 already has 3+ loops tied at the maximum). Introducing an extra threshold without fixture evidence that it's needed would be exactly the "speculative threshold" the task says not to add silently.
- **Loop Landscape is never discarded.** `loopScores`/`capacityScores` continue to report all 12 entries at every completeness and every tie level (verified in tests) — only the *Primary Loop label's* certainty is qualified, never the underlying ranked data.
- Primary/Secondary Loop ranking itself is **unchanged** — `primaryLoopStatus` is purely an added interpretive field, exactly the "wrapper" the task's "do not change" list explicitly permits.

---

## 7. High Healthy and high Shadow — confirmed by design, not a bug

Profile H (Part 4) confirms directly: a capacity can score 100% Healthy Availability and 100% Shadow Activation simultaneously, and both values are preserved, never netted or cancelled. This is correct and intentional (Scoring Spec §5). The system distinguishes this from indiscriminate agreement purely by *breadth*: one high-high capacity out of twelve (Profile H) is not flagged; twelve out of twelve (Profile D) is flagged as `High Healthy and Shadow Endorsement`. The report-facing language for this flag explicitly avoids calling it contradictory or invalid (see Part 5's `FLAG_EXPLANATIONS`).

---

## 8. Assessment introduction and scale-explanation copy (implemented)

Added to `app/assessment/page.tsx`, directly below the existing hero intro, before the first question:

> **How to Answer**
>
> Choose the response that best reflects how you usually think, feel, or behave — particularly under pressure. Answer according to what is most consistently true for you, not what you believe should be true.
>
> You may recognise both Healthy and Protective expressions in yourself. This is normal — choose the response that best represents how strongly each statement applies to you. There are no good or bad answers. This is educational, not diagnostic, and more honest responses produce a clearer result.
>
> **The Scale**
> - **Strongly disagree** — rarely or almost never true for me.
> - **Disagree** — usually not true for me.
> - **Neutral** — sometimes true, depends on the situation, or I am unsure.
> - **Agree** — often true for me.
> - **Strongly agree** — consistently or strongly true for me.
>
> *When two answers feel possible, choose the one that describes your more automatic response under pressure.*

Kept to one short guidance block plus a five-line scale legend, on the theory that anything longer risks not being read at all.

---

## 9. Unresolved theoretical questions (not implemented — flagged for founder judgement)

1. **Should Option C (minimum Primary score threshold) be added later?** Not implemented now for lack of fixture evidence it's needed beyond the tie-count rule; would need new fixtures demonstrating a gap the current rule misses.
2. **`lib/loops/logic-matrix.ts` / `lib/report-engine/*`** — an entire second, unused report-generation system with the old vocabulary and a `weakArchetypes`/`overactiveArchetypes` (plural) model. Delete, or finish integrating? Left untouched pending a decision.
3. **`app/data/archeloopMethodology.ts`** — unused, old-vocabulary Triggered Pro content. Same question as above.
4. **`loopDetails.ts`'s `weakArchetype`/`overactiveArchetype` fields** — now confirmed never read by any live public page, but still back some internal prose. Worth a future pass to either delete or fully migrate to `loopStructuralMetadata.ts`.
5. **Should `responseQuality`/`primaryLoopStatus` be surfaced in the Report v2 UI?** This task added the computation and saved-data contract only (per "do not redesign the premium report"); whether/how to display it is a design decision for a future report task.

---

## 10. Implementation summary

**Files changed:**
- `app/what-is-archeloop/page.tsx`, `app/integration/[slug]/page.tsx`, `app/archetypes/{sovereign,magician,lover,warrior}/page.tsx`, `app/archetype-interactions/page.tsx`, `components/FullReport.tsx` — terminology corrections (Part 1).
- `app/data/loopStructuralMetadata.ts` — Mind Maze `participatingArchetypes` correction (Part 2).
- `app/data/scoring.ts` — added `ResponseQualityFlag`, `ResponseQuality`, `PrimaryLoopStatus` types and `computeResponseQuality()`; added `responseQuality`/`primaryLoopStatus` to `AssessmentResult`. No existing field, formula, or ranking changed.
- `app/assessment/page.tsx` — assessment introduction and scale-explanation copy (Part 8).
- `app/data/scoring.test.ts` — Part 4 (structural metadata) test update for the Mind Maze correction; new Part 5 (response validity) test suite.

**Tests:** `node --experimental-strip-types app/data/scoring.test.ts` → **2399 passed, 0 failed.**

**Build:** `npm run build` → see final response.

**Confirmed unchanged:** all 60 canonical question wordings, `Healthy Availability`/`Shadow Activation`/`Most Available Archetype`/`Growth Edge` formulas, Primary/Secondary Loop ranking algorithm, premium report design, pricing, Stripe, Supabase schema, authentication, checkout, product names, Integration Journey names.
