"use client"

import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useState } from "react"

const bodyAreas = [
  { label: "Head / Throat", archetype: "Magician" },
  { label: "Chest / Solar Plexus", archetype: "Sovereign" },
  { label: "Gut / Lower Abdomen", archetype: "Lover" },
  { label: "Legs / Feet / Full Body", archetype: "Warrior" },
]

const states = [
  "Small / exposed",
  "Foggy / confused",
  "Defensive / tense",
  "Emotionally flooded",
  "Emotionally numb",
  "Pressured / inadequate",
  "Trapped / powerless",
  "Longing / rejected",
]

const triggers = [
  "Criticism",
  "Status pressure",
  "Misunderstanding",
  "Emotional withdrawal",
  "Conflict",
  "Uncertainty",
  "Invalidation",
  "Comparison",
]

function determineLoop(archetype: string, state: string) {
  if (archetype === "Magician") {
    if (state.includes("Foggy")) {
      return {
        loop: "Blank Page",
        nervousSystem: "Freeze",
        why: "Your system may be protecting you by temporarily shutting down clarity, speech, or expression.",
         protection:
  "This pattern may be protecting against judgement, embarrassment, exposure, criticism, or the fear of expressing something imperfectly.",
   signs: [
  "Expression may suddenly feel blocked or inaccessible.",
  "Thoughts can disappear under pressure.",
  "Speaking may begin to feel unsafe or difficult.",
  "The system may freeze while trying to communicate.",
],
secondaryLoops: [
  "Smoky Mirrors",
  "Mind Maze",
],
relationalActivators: [
  "People who interrupt or dominate conversations",
  "Highly judgemental environments",
  "Situations where expression feels unsafe",
  "Pressure to communicate perfectly",
],
        protocol: [
          "Lower the pressure.",
          "Take one slow breath.",
          "Say or write one simple sentence.",
          "Do not force clarity.",
          "Let one thought return at a time.",
        ],
      }
    }

    if (state.includes("Defensive") || state.includes("Trapped")) {
      return {
        loop: "Mind Maze",
        nervousSystem: "Flight / Freeze",
        why: "The mind may be trying to create safety through analysis, prediction, or overthinking.",
       protection:
  "This pattern may be protecting against uncertainty, mistakes, unpredictability, failure, or loss of control.",
   signs: [
  "The mind may begin replaying the situation repeatedly.",
  "A search for the perfect answer can replace action.",
  "Mental activity may feel trapped or circular.",
  "Thinking can become a way of creating temporary safety.",
],
secondaryLoops: [
  "Smoky Mirrors",
  "Fortress",
],
relationalActivators: [
  "Unpredictable or inconsistent people",
  "Ambiguous communication",
  "Emotionally confusing dynamics",
  "Situations requiring impossible certainty",
],
        protocol: [
          "Stop trying to solve the whole situation.",
          "Name one real fact.",
          "Feel your feet or hands for 20 seconds.",
          "Choose one small next step.",
          "Act before complete certainty arrives.",
        ],
      }
    }

    return {
      loop: "Smoky Mirrors",
      nervousSystem: "Flight",
      why: "Perception may feel distorted, unclear, or difficult to trust right now.",
      protection:
  "This pattern may be protecting against emotional confusion, manipulation, instability, or the fear of trusting the wrong perception.",
  signs: [
  "Reality may begin to feel unclear or difficult to trust.",
  "Confusion can increase through over-analysis.",
  "The mind may keep reinterpreting the situation.",
  "Simple truths can become harder to access.",
],
secondaryLoops: [
  "Blank Page",
  "Fantasy Fog",
],
relationalActivators: [
  "Manipulative or gaslighting dynamics",
  "People who constantly shift reality",
  "Emotionally unclear communication",
  "Situations with mixed signals",
],
      protocol: [
        "Pause the explanation.",
        "Ask: what actually happened?",
        "Ask: what am I adding to the story?",
        "Name the simplest factual truth.",
        "Return to one grounded reality.",
      ],
    }
  }

  if (archetype === "Sovereign") {
    if (state.includes("Small") || state.includes("exposed")) {
      return {
        loop: "Dimmed Light",
        nervousSystem: "Freeze",
        why: "Visibility may feel unsafe, so the system protects you by shrinking or hiding.",
        protection:
  "This pattern may be protecting against rejection, visibility, criticism, shame, or emotional exposure.",
  signs: [
  "Visibility may begin to feel unsafe.",
  "The system may shrink expression or presence.",
  "Needs or desires can become hidden or softened.",
  "Self-protection may appear as making oneself smaller.",
],
secondaryLoops: [
  "Compliance",
  "Stalled Flame",
],
relationalActivators: [
  "Critical authority figures",
  "People who shame visibility or confidence",
  "Environments where expression feels dangerous",
  "Dynamics that punish authenticity",
],
        protocol: [
          "Sit or stand slightly taller.",
          "Place a hand on your chest or solar plexus.",
          "Name one thing you are allowed to want.",
          "Take one small visible action.",
          "Do not apologise for existing.",
        ],
      }
    }

    if (state.includes("Pressured") || state.includes("inadequate")) {
      return {
        loop: "Paper Crown",
        nervousSystem: "Fight",
        why: "Worth may feel tied to proving, achieving, impressing, or appearing successful.",
        protection: "This pattern may be protecting against feelings of inadequacy, failure, invisibility, rejection, or loss of value.",
        signs: [
  "Worth may begin to feel connected to achievement.",
  "Comparison or status pressure can intensify.",
  "Performance may become linked to self-value.",
  "The system may seek validation through success or image.",
],
secondaryLoops: [
  "Compliance",
  "Dimmed Light",
], 
relationalActivators: [
  "Status-driven people",
  "Competitive environments",
  "People who tie worth to achievement",
  "Situations involving comparison or validation",
],
        protocol: [
          "Pause the urge to prove yourself.",
          "Name what you are trying to earn.",
          "Separate your worth from performance.",
          "Do one thing without trying to impress.",
          "Return to intrinsic value.",
        ],
      }
    }

    return {
      loop: "Stalled Flame",
      nervousSystem: "Freeze / Flight",
      why: "A part of you may want to move, but hesitation, doubt, or fear interrupts action.",
      protection: "This pattern may be protecting against failure, judgement, risk, disappointment, or the fear of making the wrong move.",
  signs: [
  "A part of the system may want to move forward while another hesitates.",
  "Action can feel blocked by uncertainty or fear.",
  "Momentum may disappear before commitment occurs.",
  "Starting may begin to feel heavier than expected.",
],
secondaryLoops: [
  "Fortress",
  "Mind Maze",
], 
relationalActivators: [
  "Highly critical people",
  "Pressure-heavy environments",
  "Dominant personalities",
  "Situations where failure feels unsafe",
],
      protocol: [
        "Stop planning the whole path.",
        "Choose the smallest next step.",
        "Move your body first.",
        "Take action imperfectly.",
        "Review after action, not before.",
      ],
    }
  }

  if (archetype === "Lover") {
    if (state.includes("numb")) {
      return {
        loop: "Emotional Lockdown",
        nervousSystem: "Freeze",
        why: "Emotion may feel unsafe, so the system protects you by disconnecting from feeling.",
       protection:
  "This pattern may be protecting against emotional overwhelm, vulnerability, grief, rejection, or feeling emotionally unsafe.",
   signs: [
  "Emotion may begin to feel distant or inaccessible.",
  "The system can disconnect from feeling to remain safe.",
  "Functioning may continue while emotional contact decreases.",
  "Vulnerability may begin to feel unsafe or overwhelming.",
],
secondaryLoops: [
  "Fortress",
  "Barren Ground",
],
relationalActivators: [
  "Emotionally unsafe relationships",
  "People who dismiss feelings",
  "Environments where vulnerability feels punished",
  "Conflict-heavy dynamics",
],
        protocol: [
          "Name one body sensation.",
          "Do not force emotion.",
          "Allow one small feeling to exist.",
          "Breathe slowly into the belly.",
          "Let feeling return gradually.",
        ],
      }
    }

    if (state.includes("flooded")) {
      return {
        loop: "Flooded Waters",
        nervousSystem: "Fight / Flight",
        why: "Emotion may be too intense to process all at once, creating flooding or urgency.",
       protection:
  "This pattern may be protecting against emotional suppression, abandonment, disconnection, or the fear of losing emotional control.",
   signs: [
  "Emotion may begin to feel overwhelming or consuming.",
  "The nervous system can struggle to contain intensity.",
  "Urgency may increase during emotional activation.",
  "The body may feel flooded by feeling or reaction.",
],
secondaryLoops: [
  "Emotional Lockdown",
  "Compliance",
],
relationalActivators: [
  "Emotionally overwhelming people",
  "Chaotic or volatile environments",
  "Situations involving abandonment or loss",
  "Dynamics with emotional unpredictability",
],
        protocol: [
          "Put both feet on the ground.",
          "Slow your breathing.",
          "Name the emotion in one word.",
          "Do not act from the peak.",
          "Anchor into the present moment.",
        ],
      }
    }

    return {
      loop: "Fantasy Fog",
      nervousSystem: "Freeze / Flight",
      why: "Longing, imagination, or fantasy may be replacing grounded emotional contact.",
      protection:
  "This pattern may be protecting against disappointment, loneliness, grief, emotional reality, or unmet longing.",
  signs: [
  "Imagination or longing may replace grounded engagement.",
  "The mind can drift toward idealised outcomes or realities.",
  "Action may become delayed through fantasy or escape.",
  "Emotional contact may feel safer in imagination than reality.",
],
secondaryLoops: [
  "Smoky Mirrors",
  "Emotional Lockdown",
], 
relationalActivators: [
  "Emotionally unavailable people",
  "Inconsistent attention or affection",
  "Unclear relational signals",
  "Situations that encourage longing over reality",
],
      protocol: [
        "Name the fantasy.",
        "Name the reality.",
        "Notice the gap between them.",
        "Take one real-world action.",
        "Return to your body.",
      ],
    }
  }

  if (archetype === "Warrior") {
    if (state.includes("Trapped") || state.includes("powerless")) {
      return {
        loop: "Compliance",
        nervousSystem: "Fawn",
        why: "Your system may choose approval, peace, or adaptation instead of boundaries.",
        protection:
  "This pattern may be protecting against rejection, conflict, abandonment, disapproval, or the loss of relational safety.",
  signs: [
  "Approval may begin to feel safer than honesty.",
  "The system can adapt quickly to maintain peace.",
  "Boundaries may weaken under relational pressure.",
  "Personal needs may become secondary to safety or acceptance.",
],
secondaryLoops: [
  "Dimmed Light",
  "Barren Ground",
],
relationalActivators: [
  "Controlling personalities",
  "People who withdraw approval easily",
  "Authority-heavy environments",
  "Situations where conflict feels unsafe",
],
        protocol: [
          "Pause before agreeing.",
          "Ask: what do I actually want?",
          "Name one boundary internally.",
          "Say one honest sentence.",
          "Let discomfort exist without abandoning yourself.",
        ],
      }
    }

    if (state.includes("Defensive") || state.includes("tense")) {
      return {
        loop: "Fortress",
        nervousSystem: "Fight",
        why: "Protection may become distance, control, walls, or hyper-independence.",
       protection:
  "This pattern may be protecting against vulnerability, emotional exposure, dependence, betrayal, or loss of control.",
  signs: [
  "Protection may begin to appear as emotional withdrawal.",
  "Distance or self-reliance can increase under stress.",
  "The system may become guarded or hyper-independent.",
  "Vulnerability may start to feel unsafe or threatening.",
],
secondaryLoops: [
  "Emotional Lockdown",
  "Mind Maze",
],
relationalActivators: [
  "Emotionally unpredictable people",
  "Boundary violations",
  "People who demand vulnerability too quickly",
  "Dynamics that feel intrusive or controlling",
],
        protocol: [
          "Notice the protective wall.",
          "Relax your jaw or hands.",
          "Ask: what am I protecting?",
          "Choose one safe softening.",
          "Stay protected without becoming closed.",
        ],
      }
    }

    return {
      loop: "Barren Ground",
      nervousSystem: "Freeze",
      why: "The system may be enduring, functioning, or carrying responsibility without enough restoration.",
      protection:
  "This pattern may be protecting against disappointment, emotional exhaustion, vulnerability, hope, or repeated unmet needs.",
  signs: [
  "Life may begin to feel focused on survival rather than aliveness.",
  "Emotional exhaustion or depletion can increase gradually.",
  "Restoration may feel difficult to prioritise.",
  "Joy, softness, or connection may begin to feel distant.",
],
secondaryLoops: [
  "Compliance",
  "Emotional Lockdown",
],
relationalActivators: [
  "Emotionally draining relationships",
  "Constant responsibility without support",
  "Environments focused only on survival or productivity",
  "Situations with little emotional nourishment",
],
      protocol: [
        "Stop adding new burdens.",
        "Name what is draining you.",
        "Choose one act of restoration.",
        "Ask for one form of support.",
        "Let rest become part of strength.",
      ],
    }
  }

  return null
}

export default function TriggeredPage() {
  const [selectedBody, setSelectedBody] = useState<any>(null)
  const [selectedState, setSelectedState] = useState("")
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [finished, setFinished] = useState(false)

  if (finished && selectedBody) {
  const result = determineLoop(selectedBody.archetype, selectedState)

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Triggered Pattern
          </h1>

          {result && (
            <>
              <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
                <h2 className="text-2xl font-semibold mb-4">
                  Your system may currently be in:
                </h2>

                <p className="text-4xl font-bold text-yellow-300 mb-6">
                  {result.loop}
                </p>

                <p className="text-gray-300 leading-relaxed">
                  This does not define who you are.
                  It may be a protective pattern activated by stress,
                  pressure, emotion, or relational dynamics.
                </p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
                <h2 className="text-2xl font-semibold mb-4">
                  Why This May Be Happening
                </h2>

                <p className="text-gray-300 leading-relaxed">
                  {result.why}
                </p>
              </div>
{result.protection && (
  <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
    <h2 className="text-2xl font-semibold mb-4">
      What This Pattern May Be Protecting
    </h2>

    <p className="text-gray-300 leading-relaxed">
      {result.protection}
    </p>
  </div>
)}
              <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
                <h2 className="text-2xl font-semibold mb-4">
                  Nervous System Pattern
                </h2>

                <p className="text-xl text-yellow-300">
                  {result.nervousSystem}
                </p>
              </div>

             {result.signs && (
  <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
    <h2 className="text-2xl font-semibold mb-5">
      Common Signs
    </h2>

    <ul className="space-y-3 text-gray-300">
      {result.signs.map((sign: string) => (
        <li key={sign}>
          • {sign}
        </li>
      ))}
    </ul>
  </div>
)}
{result.relationalActivators && (
  <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
    <h2 className="text-2xl font-semibold mb-5">
      Relational Activators
    </h2>

    <ul className="space-y-3 text-gray-300">
      {result.relationalActivators.map((item: string) => (
        <li key={item}>
          • {item}
        </li>
      ))}
    </ul>
  </div>
)}
{result.secondaryLoops && (
  <div className="border border-zinc-800 rounded-2xl p-8 mb-6 bg-zinc-950">
    <h2 className="text-2xl font-semibold mb-5">
      Secondary Activations
    </h2>

    <p className="text-gray-300 mb-4">
      Under pressure, this pattern may also activate:
    </p>

    <ul className="space-y-3 text-gray-300">
      {result.secondaryLoops.map((loop: string) => (
        <li key={loop}>
          • {loop}
        </li>
      ))}
    </ul>
  </div>
)}
              <div className="bg-white text-black rounded-2xl p-8 mb-6">
                <h2 className="text-2xl font-semibold mb-5">
                  Loop Breaking Protocol
                </h2>

                <ol className="space-y-3 list-decimal list-inside">
                  {result.protocol.map((step: string) => (
                    <li key={step}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-4 flex-wrap mt-8">
                <a
                  href="/triggered"
                  className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
                >
                  Start Again
                </a>

                <a
                  href={`/loops/${result.loop.toLowerCase().replace(/\s+/g, "-")}`}
                  className="border border-yellow-300 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 hover:text-black"
                >
                  Explore {result.loop} Loop
                </a>

                <a
                  href="/break-the-loop"
                  className="bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold"
                >
                  Break the Loop
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">I Am Triggered</h1>

          <p className="text-gray-300 mb-10">
            Use this when you feel uneasy, foggy, ashamed, overwhelmed, defensive, numb, pressured, or stuck.
          </p>

          <div className="border border-zinc-800 rounded-2xl p-8 mb-8 bg-zinc-950">
            <h2 className="text-2xl font-semibold mb-6">
              Where do you feel it?
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {bodyAreas.map((area) => (
                <button
                  key={area.label}
                  onClick={() => setSelectedBody(area)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedBody?.label === area.label
                      ? "bg-white text-black"
                      : "border-zinc-700 hover:bg-white hover:text-black"
                  }`}
                >
                  {area.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-8 mb-8 bg-zinc-950">
            <h2 className="text-2xl font-semibold mb-6">
              What state emerged?
            </h2>

            <div className="grid gap-3">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedState === state
                      ? "bg-white text-black"
                      : "border-zinc-700 hover:bg-white hover:text-black"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-8 mb-8 bg-zinc-950">
            <h2 className="text-2xl font-semibold mb-6">
              What triggered this?
            </h2>

            <div className="grid gap-3">
              {triggers.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => setSelectedTrigger(trigger)}
                  className={`border rounded-xl p-4 text-left ${
                    selectedTrigger === trigger
                      ? "bg-white text-black"
                      : "border-zinc-700 hover:bg-white hover:text-black"
                  }`}
                >
                  {trigger}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setFinished(true)}
            disabled={!selectedBody || !selectedState || !selectedTrigger}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold disabled:opacity-40"
          >
            Identify My Loop
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}