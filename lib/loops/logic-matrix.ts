export type FormationType =
  | "Suppression"
  | "Compensation"
  | "Collision"

export type NervousSystemPattern =
  | "Fight"
  | "Flight"
  | "Freeze"
  | "Fawn"

export interface ShadowLoop {
  slug: string
  name: string

  element: "Fire" | "Air" | "Water" | "Earth"

  archetype:
    | "Sovereign"
    | "Magician"
    | "Lover"
    | "Warrior"

  formation: FormationType

  dominantElements: string[]
  suppressedElements: string[]
  weakArchetypes: string[]
  overactiveArchetypes: string[]

  nervousSystemPatterns: NervousSystemPattern[]

  coreEmotion: string
  coreFear: string

  bodyMap: string

  coreBelief: string
  coreReflectionQuestion: string

  coreDynamic: string
  psychologicalMechanism: string

  integrationElement: string
  integrationArchetype: string
  integrationShift: string

  loopBreaker: string

  relationalActivators: string[]
  relatedDynamics: string[]

  appearsAs: string[]
  additionalPrompts: string[]

  protectsAgainst: string[]

  activates: string[]
  triggeredBy: string[]
}

export const logicMatrix: ShadowLoop[] = [
  {
    slug: "mind-maze",
    name: "Mind Maze Loop",

    element: "Air",
    archetype: "Magician",

    formation: "Collision",

    dominantElements: ["Air", "Fire"],
    suppressedElements: ["Earth"],

    weakArchetypes: ["Warrior"],
    overactiveArchetypes: ["Magician"],

    nervousSystemPatterns: ["Freeze", "Flight"],

    coreEmotion: "Fear",
    coreFear: "Mistake, uncertainty, wrong action",

    bodyMap: "Head / Throat",

    coreBelief: "I must think more before acting.",

    coreReflectionQuestion:
      "Where does overthinking replace grounded movement or action?",

    coreDynamic:
      "Thought and analysis interrupt movement, action, and grounded execution.",

    psychologicalMechanism:
      "The mind attempts to create safety through anticipation, rehearsal, and over-analysis.",

    integrationElement: "Earth",
    integrationArchetype: "Warrior",

    integrationShift:
      "Grounded action restores movement and interrupts excessive cognitive looping.",

    loopBreaker:
      "Choose one small next action before certainty arrives.",

    relationalActivators: [
      "Ambiguous communication",
      "Pressure-heavy environments",
      "Fear of judgement",
      "High expectations",
    ],

    relatedDynamics: [
      "Stalled Flame",
      "Blank Page",
      "Smoky Mirrors",
    ],

    appearsAs: [
      "Overthinking instead of acting",
      "Mental rehearsal",
      "Second-guessing decisions",
      "Difficulty committing",
      "Analysis paralysis",
    ],

    additionalPrompts: [
      "What action keeps getting delayed?",
      "Where do I wait for certainty before moving?",
      "What happens when I try to act without overthinking?",
    ],

    protectsAgainst: [
      "Failure",
      "Mistakes",
      "Judgement",
      "Uncertainty",
      "Emotional risk",
    ],

    activates: [
      "Stalled Flame",
      "Blank Page",
      "Dimmed Light",
    ],

    triggeredBy: [
      "Smoky Mirrors",
      "Flooded Waters",
      "High-pressure dynamics",
    ],
  },
  {
    slug: "blank-page",
    name: "Blank Page Loop",

    element: "Air",
    archetype: "Magician",

    formation: "Suppression",

    dominantElements: ["Earth"],
    suppressedElements: ["Air"],

    weakArchetypes: ["Magician"],
    overactiveArchetypes: ["Warrior"],

    nervousSystemPatterns: ["Freeze"],

    coreEmotion: "Fear",
    coreFear: "Judgement, criticism, expressive exposure",

    bodyMap: "Head / Throat",

    coreBelief: "Nothing comes to me when it matters.",

    coreReflectionQuestion:
      "Where does my mind go blank when expression, clarity, or communication is needed?",

    coreDynamic:
      "Internal voice, perception, or expression collapses under pressure.",

    psychologicalMechanism:
      "Expression becomes unsafe, so the system protects itself through cognitive shutdown.",

    integrationElement: "Air",
    integrationArchetype: "Magician",

    integrationShift:
      "Safe expression and trusted perception restore healthy Air flow.",

    loopBreaker:
      "Pause, breathe, and reduce the pressure. Start with one small sentence, one small thought, or one small action.",

    relationalActivators: [
      "Public speaking or visibility",
      "Critical conversations",
      "Emotional confrontation",
      "Situations requiring spontaneous expression",
    ],

    relatedDynamics: [
      "Mind Maze",
      "Dimmed Light",
      "Emotional Lockdown",
    ],

    appearsAs: [
      "Mind going blank under pressure",
      "Difficulty speaking or expressing clearly",
      "Creative or verbal shutdown",
      "Knowing something internally but being unable to say it",
    ],

    additionalPrompts: [
      "When do I lose trust in my own thinking?",
      "What situations make me mentally freeze?",
      "Where do I struggle to access my voice?",
    ],

    protectsAgainst: [
      "Judgement",
      "Exposure",
      "Misunderstanding",
      "Criticism",
      "Expressive vulnerability",
    ],

    activates: [
      "Mind Maze",
      "Dimmed Light",
      "Emotional Lockdown",
    ],

    triggeredBy: [
      "Fortress",
      "Paper Crown",
      "Critical Fire",
    ],
  },
  {
    slug: "smoky-mirrors",
    name: "Smoky Mirrors Loop",

    element: "Air",
    archetype: "Magician",

    formation: "Compensation",

    dominantElements: ["Air"],
    suppressedElements: ["Water"],

    weakArchetypes: ["Lover"],
    overactiveArchetypes: ["Magician"],

    nervousSystemPatterns: ["Flight", "Fight"],

    coreEmotion: "Fear",
    coreFear: "Vulnerability, uncertainty, emotional truth, loss of control",

    bodyMap: "Head / Throat",

    coreBelief: "If I control the story, I will be safe.",

    coreReflectionQuestion:
      "Where do I distrust my own perception or become lost in distortion, confusion, or mixed signals?",

    coreDynamic:
      "Perception reshapes reality to avoid emotional vulnerability or loss of control.",

    psychologicalMechanism:
      "Narrative control replaces emotional contact.",

    integrationElement: "Water",
    integrationArchetype: "Lover",

    integrationShift:
      "Emotional honesty softens defensive mental control patterns.",

    loopBreaker:
      "Ask: What is actually happening, and what story am I adding? Seek one grounded reality check.",

    relationalActivators: [
      "Ambiguous communication",
      "Emotional confrontation",
      "Contradiction or criticism",
      "Situations where reality feels difficult to face",
    ],

    relatedDynamics: [
      "Mind Maze",
      "Fortress",
      "Emotional Lockdown",
    ],

    appearsAs: [
      "Losing trust in perception or interpretation",
      "Rationalising, over-explaining, or distorting reality",
      "Feeling mentally unclear or hard to ground",
      "Thinking instead of feeling what is true",
    ],

    additionalPrompts: [
      "What feels mentally foggy or unclear?",
      "Where do I second-guess reality?",
      "When do I rationalise instead of seeing clearly?",
    ],

    protectsAgainst: [
      "Uncertainty",
      "Emotional truth",
      "Shame",
      "Vulnerability",
      "Loss of control",
    ],

    activates: [
      "Mind Maze",
      "Fortress",
      "Emotional Lockdown",
    ],

    triggeredBy: [
      "Fortress",
      "Flooded Waters",
      "Ambiguous communication",
    ],
  }
  ,
  {
    slug: "dimmed-light",
    name: "Dimmed Light Loop",

    element: "Fire",
    archetype: "Sovereign",

    formation: "Suppression",

    dominantElements: ["Air", "Earth"],
    suppressedElements: ["Fire"],

    weakArchetypes: ["Sovereign"],
    overactiveArchetypes: ["Magician", "Warrior"],

    nervousSystemPatterns: ["Freeze", "Fawn"],

    coreEmotion: "Shame",
    coreFear: "Rejection, criticism, exposure, envy",

    bodyMap: "Solar Plexus / Heart",

    coreBelief: "If I shine, I will be rejected.",

    coreReflectionQuestion:
      "Where do I suppress or reduce myself to feel safe, accepted, or avoid conflict?",

    coreDynamic:
      "Visibility, expression, and self-trust become psychologically unsafe.",

    psychologicalMechanism:
      "Self-suppression maintains safety, belonging, or emotional protection.",

    integrationElement: "Fire",
    integrationArchetype: "Sovereign",

    integrationShift:
      "Healthy self-trust and safe visibility restore collapsed Fire energy.",

    loopBreaker:
      "Practise one small act of visibility today. Share an idea, take up space, or name one strength without apologising.",

    relationalActivators: [
      "Critical or shaming environments",
      "Attention, praise, or visibility",
      "People who minimise your expression",
      "Situations where being seen feels unsafe",
    ],

    relatedDynamics: [
      "Blank Page",
      "Emotional Lockdown",
      "Compliance",
    ],

    appearsAs: [
      "Shrinking around visibility or attention",
      "Holding back expression, creativity, or ambition",
      "Feeling unsafe when fully seen",
      "Minimising gifts, needs, or presence",
    ],

    additionalPrompts: [
      "Where do I make myself smaller?",
      "When do I hide visibility or expression?",
      "What feels unsafe about being fully seen?",
    ],

    protectsAgainst: [
      "Shame",
      "Rejection",
      "Criticism",
      "Envy",
      "Emotional exposure",
    ],

    activates: [
      "Compliance",
      "Blank Page",
      "Emotional Lockdown",
    ],

    triggeredBy: [
      "Paper Crown",
      "Critical Fortress",
      "Shaming dynamics",
    ],
  },
  {
    slug: "paper-crown",
    name: "Paper Crown Loop",

    element: "Fire",
    archetype: "Sovereign",

    formation: "Compensation",

    dominantElements: ["Air"],
    suppressedElements: ["Fire"],

    weakArchetypes: ["Sovereign"],
    overactiveArchetypes: ["Magician"],

    nervousSystemPatterns: ["Fight", "Fawn"],

    coreEmotion: "Shame / Anxiety",
    coreFear: "Inadequacy, failure, invisibility, loss of value",

    bodyMap: "Solar Plexus / Heart",

    coreBelief: "I am only valuable if I appear impressive.",

    coreReflectionQuestion:
      "Where do I seek external validation, status, achievement, or performance to feel worthy?",

    coreDynamic:
      "Image, achievement, intelligence, or status substitute for genuine self-worth.",

    psychologicalMechanism:
      "External validation regulates unstable identity and self-value.",

    integrationElement: "Water",
    integrationArchetype: "Lover",

    integrationShift:
      "Authentic emotional connection restores intrinsic worth and genuine self-trust.",

    loopBreaker:
      "Return to intrinsic worth. Name one value you hold even when nobody is watching.",

    relationalActivators: [
      "Status-driven people",
      "Competitive environments",
      "Conditional approval",
      "Comparison-based dynamics",
    ],

    relatedDynamics: [
      "Emotional Lockdown",
      "Compliance",
      "Barren Ground",
    ],

    appearsAs: [
      "Feeling worth tied to achievement or image",
      "Pressure to prove, perform, or appear successful",
      "Comparison becoming emotionally intense",
      "Difficulty resting without guilt",
      "Curating identity to appear important or valuable",
    ],

    additionalPrompts: [
      "What do I feel I must prove?",
      "Who am I without achievement or recognition?",
      "When do I perform instead of simply being?",
    ],

    protectsAgainst: [
      "Inadequacy",
      "Failure",
      "Invisibility",
      "Rejection",
      "Shame",
    ],

    activates: [
      "Emotional Lockdown",
      "Compliance",
      "Barren Ground",
    ],

    triggeredBy: [
      "Dimmed Light",
      "Fortress",
      "Conditional approval",
    ],
  },
  {
    slug: "stalled-flame",
    name: "Stalled Flame Loop",

    element: "Fire",
    archetype: "Sovereign",

    formation: "Collision",

    dominantElements: ["Fire", "Air"],
    suppressedElements: [],

    weakArchetypes: ["Warrior"],
    overactiveArchetypes: ["Sovereign", "Magician"],

    nervousSystemPatterns: ["Flight", "Freeze"],

    coreEmotion: "Fear / Shame",
    coreFear: "Failure, judgement, uncertainty, consequences of action",

    bodyMap: "Solar Plexus / Heart",

    coreBelief: "I want to act, but I might fail.",

    coreReflectionQuestion:
      "Where do hesitation, fear, or self-protection interrupt movement and action?",

    coreDynamic:
      "Desire and momentum collide with hesitation, analysis, or self-protection.",

    psychologicalMechanism:
      "Action activates fear, causing hesitation and withdrawal.",

    integrationElement: "Earth",
    integrationArchetype: "Warrior",

    integrationShift:
      "Grounded action restores movement and stabilises Fire energy.",

    loopBreaker:
      "Choose one small visible action. Do not wait for full confidence before beginning.",

    relationalActivators: [
      "Pressure-heavy environments",
      "High expectations",
      "Fear of failure or success",
      "Situations requiring decisive movement",
    ],

    relatedDynamics: [
      "Mind Maze",
      "Blank Page",
      "Dimmed Light",
    ],

    appearsAs: [
      "Wanting to move forward but repeatedly delaying",
      "Waiting for certainty before acting",
      "Feeling desire or vision without momentum",
      "Starting to act, then freezing or pulling back",
    ],

    additionalPrompts: [
      "What desire keeps getting delayed?",
      "Where do I stop myself before beginning?",
      "What happens when I feel momentum?",
    ],

    protectsAgainst: [
      "Failure",
      "Judgement",
      "Uncertainty",
      "Overwhelm",
      "Consequences of action",
    ],

    activates: [
      "Mind Maze",
      "Dimmed Light",
      "Blank Page",
    ],

    triggeredBy: [
      "Smoky Mirrors",
      "Paper Crown",
      "High-pressure dynamics",
    ],
  }
  ,
  {
    slug: "emotional-lockdown",
    name: "Emotional Lockdown Loop",

    element: "Water",
    archetype: "Lover",

    formation: "Suppression",

    dominantElements: ["Earth", "Air"],
    suppressedElements: ["Water"],

    weakArchetypes: ["Lover"],
    overactiveArchetypes: ["Warrior", "Magician"],

    nervousSystemPatterns: ["Freeze"],

    coreEmotion: "Grief / Longing",
    coreFear: "Vulnerability, overwhelm, rejection, betrayal",

    bodyMap: "Heart / Sacral",

    coreBelief: "Feeling is dangerous.",

    coreReflectionQuestion:
      "Where do I shut down emotion in order to stay functional, safe, or in control?",

    coreDynamic:
      "Emotional connection and vulnerability become psychologically unsafe.",

    psychologicalMechanism:
      "Feeling becomes suppressed to maintain control, functionality, or emotional safety.",

    integrationElement: "Water",
    integrationArchetype: "Lover",

    integrationShift:
      "Safe emotional contact restores connection, vulnerability, and intimacy.",

    loopBreaker:
      "Name one feeling gently without needing to fix it. Let the body register a small amount of emotion safely.",

    relationalActivators: [
      "Emotional intensity",
      "Vulnerability or intimacy",
      "Conflict-heavy dynamics",
      "People who dismiss or punish emotion",
    ],

    relatedDynamics: [
      "Fortress",
      "Barren Ground",
      "Blank Page",
    ],

    appearsAs: [
      "Feeling emotionally numb or distant",
      "Functioning while disconnected from feeling",
      "Avoiding vulnerability or emotional conversations",
      "Not knowing what you feel",
    ],

    additionalPrompts: [
      "What emotions feel unsafe to express?",
      "Where have I disconnected from vulnerability?",
      "What am I containing but not processing?",
    ],

    protectsAgainst: [
      "Overwhelm",
      "Rejection",
      "Vulnerability",
      "Betrayal",
      "Emotional instability",
    ],

    activates: [
      "Fortress",
      "Barren Ground",
      "Blank Page",
    ],

    triggeredBy: [
      "Flooded Waters",
      "Fantasy Fog",
      "Emotionally overwhelming dynamics",
    ],
  },
  {
    slug: "fantasy-fog",
    name: "Fantasy Fog Loop",

    element: "Water",
    archetype: "Lover",

    formation: "Compensation",

    dominantElements: ["Air"],
    suppressedElements: ["Water"],

    weakArchetypes: ["Lover"],
    overactiveArchetypes: ["Magician"],

    nervousSystemPatterns: ["Flight", "Freeze"],

    coreEmotion: "Grief / Longing",
    coreFear: "Loneliness, rejection, disappointment, unavailable intimacy",

    bodyMap: "Heart / Sacral",

    coreBelief: "It is safer in my inner world.",

    coreReflectionQuestion:
      "Where do fantasy, longing, or imagination replace grounded emotional reality?",

    coreDynamic:
      "Fantasy and imagination replace grounded emotional connection and reality.",

    psychologicalMechanism:
      "Fantasy creates emotional safety without relational risk.",

    integrationElement: "Earth",
    integrationArchetype: "Warrior",

    integrationShift:
      "Grounded embodiment reconnects emotion with reality and action.",

    loopBreaker:
      "Ground the fantasy into one real action. Ask: What is true here, and what am I imagining?",

    relationalActivators: [
      "Unavailable people",
      "Ambiguous relationships",
      "Loneliness or emotional deprivation",
      "Situations where real intimacy feels uncertain",
    ],

    relatedDynamics: [
      "Fortress",
      "Flooded Waters",
      "Emotional Lockdown",
    ],

    appearsAs: [
      "Idealising people or imagined futures",
      "Longing replacing grounded connection",
      "Feeling attached to fantasy more than reality",
      "Escaping into emotional imagination",
    ],

    additionalPrompts: [
      "What am I hoping for instead of facing?",
      "Where do I escape into possibility or illusion?",
      "What reality feels difficult to accept?",
    ],

    protectsAgainst: [
      "Loneliness",
      "Rejection",
      "Disappointment",
      "Emotional deprivation",
      "Unavailable connection",
    ],

    activates: [
      "Fortress",
      "Mind Maze",
      "Emotional Lockdown",
    ],

    triggeredBy: [
      "Fortress",
      "Compliance",
      "Unavailable relationships",
    ],
  },
  {
    slug: "flooded-waters",
    name: "Flooded Waters Loop",

    element: "Water",
    archetype: "Lover",

    formation: "Collision",

    dominantElements: ["Water", "Earth"],
    suppressedElements: [],

    weakArchetypes: ["Warrior"],
    overactiveArchetypes: ["Lover"],

    nervousSystemPatterns: ["Fight", "Flight", "Freeze"],

    coreEmotion: "Grief / Longing",
    coreFear: "Abandonment, rejection, emotional instability, loss of connection",

    bodyMap: "Heart / Sacral",

    coreBelief: "My feelings are too much.",

    coreReflectionQuestion:
      "Where do emotions become overwhelming, consuming, or difficult to regulate?",

    coreDynamic:
      "Emotional intensity exceeds grounded regulation capacity.",

    psychologicalMechanism:
      "Emotion seeks reassurance and connection faster than the system can stabilise safely.",

    integrationElement: "Earth",
    integrationArchetype: "Warrior",

    integrationShift:
      "Grounded regulation stabilises emotional intensity safely.",

    loopBreaker:
      "Slow the emotional wave. Breathe, name the feeling, and take one grounding action before responding.",

    relationalActivators: [
      "Emotional distance",
      "Rejection or abandonment cues",
      "Inconsistent communication",
      "Conflict or relational uncertainty",
    ],

    relatedDynamics: [
      "Fortress",
      "Emotional Lockdown",
      "Fantasy Fog",
    ],

    appearsAs: [
      "Emotion feeling too intense to contain",
      "Relational fear becoming urgent or overwhelming",
      "Seeking reassurance intensely",
      "Feeling consumed by emotional activation",
    ],

    additionalPrompts: [
      "What emotions feel too big to hold?",
      "When do I lose grounding emotionally?",
      "What pulls me into emotional intensity?",
    ],

    protectsAgainst: [
      "Abandonment",
      "Rejection",
      "Emotional instability",
      "Loss of connection",
      "Unmet attachment needs",
    ],

    activates: [
      "Fortress",
      "Emotional Lockdown",
      "Mind Maze",
    ],

    triggeredBy: [
      "Fortress",
      "Emotional distance",
      "Relational inconsistency",
    ],
  }
  ,
  {
    slug: "compliance",
    name: "Compliance Loop",

    element: "Earth",
    archetype: "Warrior",

    formation: "Suppression",

    dominantElements: ["Water", "Fire"],
    suppressedElements: ["Earth"],

    weakArchetypes: ["Warrior"],
    overactiveArchetypes: ["Lover", "Sovereign"],

    nervousSystemPatterns: ["Fawn", "Freeze"],

    coreEmotion: "Anger / Fear",
    coreFear: "Conflict, rejection, punishment, emotional withdrawal",

    bodyMap: "Root / Legs",

    coreBelief: "It is safer to go along.",

    coreReflectionQuestion:
      "Where do I abandon my boundaries, truth, or anger to maintain approval, safety, or connection?",

    coreDynamic:
      "Boundaries collapse to maintain safety, approval, or belonging.",

    psychologicalMechanism:
      "Self-suppression protects connection and reduces threat.",

    integrationElement: "Earth",
    integrationArchetype: "Warrior",

    integrationShift:
      "Boundaries and grounded action restore self-protection and stability.",

    loopBreaker:
      "Practise one small boundary today. Say one honest no, pause before agreeing, or name one need clearly.",

    relationalActivators: [
      "Dominant personalities",
      "Criticism or anger",
      "Emotional unpredictability",
      "Situations where approval feels conditional",
    ],

    relatedDynamics: [
      "Dimmed Light",
      "Emotional Lockdown",
      "Barren Ground",
    ],

    appearsAs: [
      "Difficulty saying no",
      "Suppressing needs to avoid conflict",
      "Over-adapting to keep peace or approval",
      "Feeling resentment after agreeing",
    ],

    additionalPrompts: [
      "Where do I say yes when I mean no?",
      "What conflict am I avoiding?",
      "What part of myself gets sacrificed for acceptance?",
    ],

    protectsAgainst: [
      "Conflict",
      "Rejection",
      "Punishment",
      "Emotional withdrawal",
      "Loss of belonging",
    ],

    activates: [
      "Barren Ground",
      "Emotional Lockdown",
      "Dimmed Light",
    ],

    triggeredBy: [
      "Paper Crown",
      "Dominant Fire",
      "Conditional approval",
    ],
  },
  {
    slug: "fortress",
    name: "Fortress Loop",

    element: "Earth",
    archetype: "Warrior",

    formation: "Compensation",

    dominantElements: ["Earth"],
    suppressedElements: ["Water"],

    weakArchetypes: ["Lover"],
    overactiveArchetypes: ["Warrior"],

    nervousSystemPatterns: ["Fight", "Freeze", "Flight"],

    coreEmotion: "Anger / Fear",
    coreFear: "Betrayal, engulfment, dependency, emotional exposure",

    bodyMap: "Root / Legs",

    coreBelief: "I must protect myself at all costs.",

    coreReflectionQuestion:
      "Where has protection become isolation, distance, or emotional self-containment?",

    coreDynamic:
      "Protection becomes emotional isolation, rigidity, or defensive self-reliance.",

    psychologicalMechanism:
      "Defensive self-protection prevents vulnerability and emotional dependence.",

    integrationElement: "Water",
    integrationArchetype: "Lover",

    integrationShift:
      "Safe emotional connection softens defensive isolation and rigidity.",

    loopBreaker:
      "Soften one protective wall safely. Let someone support you in one small, low-risk way.",

    relationalActivators: [
      "Emotional demands",
      "Vulnerability or dependency",
      "Inconsistent trust",
      "Relationships that feel intrusive or unpredictable",
    ],

    relatedDynamics: [
      "Emotional Lockdown",
      "Barren Ground",
      "Smoky Mirrors",
    ],

    appearsAs: [
      "Emotional distance or guardedness",
      "Difficulty asking for help or receiving care",
      "Using control, withdrawal, or independence to feel safe",
      "Pushing people away before vulnerability appears",
    ],

    additionalPrompts: [
      "Where do I keep people out?",
      "What feels unsafe about relying on others?",
      "When does independence become disconnection?",
    ],

    protectsAgainst: [
      "Betrayal",
      "Engulfment",
      "Dependency",
      "Emotional exposure",
      "Loss of control",
    ],

    activates: [
      "Emotional Lockdown",
      "Fantasy Fog",
      "Barren Ground",
    ],

    triggeredBy: [
      "Flooded Waters",
      "Fantasy Fog",
      "Emotional demands",
    ],
  },
  {
    slug: "barren-ground",
    name: "Barren Ground Loop",

    element: "Earth",
    archetype: "Warrior",

    formation: "Collision",

    dominantElements: ["Earth", "Water"],
    suppressedElements: [],

    weakArchetypes: ["Lover"],
    overactiveArchetypes: ["Warrior"],

    nervousSystemPatterns: ["Freeze"],

    coreEmotion: "Anger / Fear",
    coreFear: "Collapse, exhaustion, unmet needs, losing stability",

    bodyMap: "Root / Legs",

    coreBelief: "I must endure.",

    coreReflectionQuestion:
      "Where has life become survival, endurance, or emotional dryness instead of vitality and connection?",

    coreDynamic:
      "Functionality continues while emotional vitality, nourishment, or restoration disappears.",

    psychologicalMechanism:
      "Survival mode suppresses restoration, pleasure, emotional replenishment, and aliveness.",

    integrationElement: "Water",
    integrationArchetype: "Lover",

    integrationShift:
      "Restoration, nourishment, and emotional connection replenish exhausted Earth energy.",

    loopBreaker:
      "Choose one act of restoration. Delegate, rest, ask for help, or remove one unnecessary burden.",

    relationalActivators: [
      "Chronic responsibility",
      "Emotionally dry environments",
      "Lack of reciprocity or nourishment",
      "Survival pressure or burnout",
    ],

    relatedDynamics: [
      "Emotional Lockdown",
      "Compliance",
      "Dimmed Light",
    ],

    appearsAs: [
      "Feeling emotionally depleted or flat",
      "Functioning without vitality or joy",
      "Living in endurance, duty, or survival mode",
      "Difficulty accessing rest, pleasure, or aliveness",
    ],

    additionalPrompts: [
      "Where am I only functioning?",
      "What part of me feels emotionally depleted?",
      "When did joy begin feeling distant?",
    ],

    protectsAgainst: [
      "Exhaustion",
      "Disappointment",
      "Unmet needs",
      "Emotional deprivation",
      "Fear that stopping will cause collapse",
    ],

    activates: [
      "Emotional Lockdown",
      "Dimmed Light",
      "Compliance",
    ],

    triggeredBy: [
      "Paper Crown",
      "Compliance",
      "Chronic responsibility",
    ],
  }
]