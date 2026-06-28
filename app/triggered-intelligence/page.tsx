"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { detectLoop } from "../data/intelligenceEngine";
import { generateInsight } from "../data/insightGenerator";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {
  bodyZones,
  emotionalFamilies,
  responseStyles,
  triggerCategories,
  triggers,
  people,
  environments,
  thoughtPatterns,
} from "../data/triggeredProOptions";

export default function TriggeredIntelligencePage() {
  const [bodyZone, setBodyZone] = useState(bodyZones[0].value);
  const [emotionalFamily, setEmotionalFamily] = useState(emotionalFamilies[0].value);
  const [responseStyle, setResponseStyle] = useState(responseStyles[0].value);
  const [triggerCategory, setTriggerCategory] = useState("visibility");
  const [trigger, setTrigger] = useState(triggers.visibility[0]);
  const [person, setPerson] = useState(people[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  const [thought, setThought] = useState(thoughtPatterns[0].value);
  const [integratedVision, setIntegratedVision] = useState("");
  const [loopBreakLevel, setLoopBreakLevel] = useState("");
  const [showBreakthrough, setShowBreakthrough] = useState(false);
  const [awarenessLevel, setAwarenessLevel] = useState("");
const [recoveryLevel, setRecoveryLevel] = useState("");
const [embodimentLevel, setEmbodimentLevel] = useState("");

  const result = detectLoop({
    bodyActivation: [bodyZone],
    emotions: [emotionalFamily],
    thoughts: [thought],
    responseStyle,
    trigger: trigger.toLowerCase(),
    person: person.toLowerCase(),
    environment: environment.toLowerCase(),
  });

  const insight = generateInsight(
    result.primaryLoop,
    result.journey,
    result.integratedIdentity
  );

  const hasBrokenLoop =
  loopBreakLevel === "I chose a different response" ||
  loopBreakLevel === "Yes — I broke the loop";

  useEffect(() => {
  if (hasBrokenLoop) {
    setShowBreakthrough(true);
  }
}, [hasBrokenLoop]);

  useEffect(() => {
  const storageKey = `archeloop-integrated-vision-${result.journey}`;
  const savedVision = localStorage.getItem(storageKey);

  setIntegratedVision(savedVision || "");
}, [result.journey]);

 async function saveActivation() {
  const activation = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    primaryLoop: result.primaryLoop,
    secondaryLoop: result.secondaryLoop,
    confidence: result.confidence,
    archetype: result.archetype,
    journey: result.journey,
    integratedIdentity: result.integratedIdentity,
    topMatches: result.topMatches,
    loopBreakLevel,
    awarenessLevel,
    recoveryLevel,
    embodimentLevel,
    bodyZone,
    emotionalFamily,
    responseStyle,
    triggerCategory,
    trigger,
    person,
    environment,
    thought,
  };

  const res = await fetch("/api/activations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activationData: activation,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Could not save activation.");
    return;
  }

  const savedActivations = JSON.parse(
    localStorage.getItem("archeloopActivations") || "[]"
  );

  localStorage.setItem(
    "archeloopActivations",
    JSON.stringify([activation, ...savedActivations])
  );

  alert("Activation saved.");
}

  function handleTriggerCategoryChange(category: string) {
    setTriggerCategory(category);
    const categoryTriggers = triggers[category as keyof typeof triggers];
    setTrigger(categoryTriggers[0]);
  }

  return (
  <main className="min-h-screen bg-[#030712] text-stone-100">
    <Nav />

    <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                Triggered Pro™
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
                Identify the Shadow Loop™ Behind Your Reaction
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
               Answer a few simple questions to identify the Shadow Loop™ driving your current reaction and receive guidance for your next integrated step.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/trigger-history"
                  className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
                >
                  View Trigger History
                </Link>

                <Link
                  href="/progress-dashboard"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-5 py-2 text-sm text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  View Progress Dashboard
                </Link>
              </div>
            </div>

           <CardStep number="1" title="Where did you feel it?">
              <ChoiceGrid items={bodyZones} selected={bodyZone} onSelect={setBodyZone} />
            </CardStep>

            <CardStep number="2" title="What did you feel?">
              <ChoiceGrid
                items={emotionalFamilies}
                selected={emotionalFamily}
                onSelect={setEmotionalFamily}
              />
            </CardStep>

            <CardStep number="3" title="How did you respond?">
              <ChoiceGrid
                items={responseStyles}
                selected={responseStyle}
                onSelect={setResponseStyle}
              />
            </CardStep>

           <CardStep number="4" title="What happened?">
              <ChoiceGrid
                items={triggerCategories}
                selected={triggerCategory}
                onSelect={handleTriggerCategoryChange}
              />

              <div className="mt-6">
                <label className="text-sm uppercase tracking-[0.2em] text-yellow-300/60">
                  Specific trigger
                </label>

                <select
                  value={trigger}
                  onChange={(event) => setTrigger(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-yellow-300/10 bg-black/40 px-4 py-4 text-stone-100 outline-none transition focus:border-yellow-300/50"
                >
                  {triggers[triggerCategory as keyof typeof triggers].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </CardStep>

            <CardStep number="5" title="Who was involved?">
              <select
                value={person}
                onChange={(event) => setPerson(event.target.value)}
                className="w-full rounded-2xl border border-yellow-300/10 bg-black/40 px-4 py-4 text-stone-100 outline-none transition focus:border-yellow-300/50"
              >
                {people.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </CardStep>

            <CardStep number="6" title="Where did it happen?">
              <select
                value={environment}
                onChange={(event) => setEnvironment(event.target.value)}
                className="w-full rounded-2xl border border-yellow-300/10 bg-black/40 px-4 py-4 text-stone-100 outline-none transition focus:border-yellow-300/50"
              >
                {environments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </CardStep>

           <CardStep number="7" title="What was running through your mind?">
              <div className="grid gap-3 md:grid-cols-2">
                {thoughtPatterns.map((item) => {
                  const active = thought === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setThought(item.value)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_35px_rgba(216,183,120,0.18)]"
                          : "border-yellow-300/10 bg-black/30 text-stone-300 hover:border-yellow-300/50 hover:bg-[#0B1018]"
                      }`}
                    >
                      <p className="font-medium">{item.title}</p>
                    </button>
                  );
                })}
              </div>
            </CardStep>
          </div>

          <aside className="lg:sticky lg:top-8 h-fit rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-7 shadow-[0_0_80px_rgba(216,183,120,0.10)] space-y-7">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/70">
                ArcheLoop Result
              </p>

              <h2 className="mt-4 text-4xl font-bold text-yellow-300">
                {result.primaryLoop}
              </h2>

              <p className="mt-3 text-stone-300">
                Pattern Match: {result.confidence}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-black/50">
              <div
                className="h-full rounded-full bg-yellow-300"
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            <div className="grid gap-4">
              <ResultItem label="Secondary Loop" value={result.secondaryLoop} />
              <ResultItem label="Archetype" value={result.archetype} />
              <ResultItem label="Integration Journey" value={result.journey} />
              <ResultItem label="Integrated State" value={result.integratedIdentity} />
            </div>


<PremiumPanel title="Integration Reflection™">
  <p className="text-lg font-semibold text-stone-100">
    What would {result.integratedIdentity} do right now?
  </p>

  {integratedVision ? (
    <div className="mt-4 rounded-2xl border border-yellow-300/10 bg-yellow-300/5 p-4">
      <p className="text-sm uppercase tracking-[0.18em] text-yellow-300/60">
        My Integrated Vision™
      </p>

      <p className="mt-3 leading-relaxed text-stone-300">
        {integratedVision}
      </p>
    </div>
  ) : (
    <p className="mt-4 leading-relaxed text-stone-300">
      Visit your {result.journey} page to write your personal integrated
      vision.
    </p>
  )}

  <Link
    href={`/integration/${result.journey
      .replace("™", "")
      .toLowerCase()
      .replaceAll(" ", "-")}`}
    className="mt-5 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
  >
    Open {result.journey}
  </Link>
</PremiumPanel>

            <PremiumPanel title="ArcheLoop Insight">
              <p className="leading-relaxed whitespace-pre-line text-stone-300">
                {insight}
              </p>
            </PremiumPanel>

            <PremiumPanel title="Top 3 Loop Matches">
              <div className="space-y-5">
                {result.topMatches.map((match, index) => (
                  <div key={match.loop}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-stone-100">
                          {index + 1}. {match.loop}
                        </p>

                        <p className="text-sm text-yellow-300/60">
                          {match.archetype}
                        </p>
                      </div>

                      <p className="font-semibold text-yellow-300">
                        {match.confidence}%
                      </p>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/50">
                      <div
                        className="h-full rounded-full bg-yellow-300"
                        style={{ width: `${match.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PremiumPanel>

<PremiumPanel title="Integration Check-In™">
  <div className="space-y-6">
    <CheckInQuestion
      title="When did you become aware you were in the loop?"
      selected={awarenessLevel}
      onSelect={setAwarenessLevel}
      options={[
        "Only afterwards",
        "While it was happening",
        "Before I reacted",
        "Immediately",
      ]}
    />

    <CheckInQuestion
      title="How quickly did you return to your centre?"
      selected={recoveryLevel}
      onSelect={setRecoveryLevel}
      options={[
        "Still activated",
        "Several hours",
        "About an hour",
        "A few minutes",
        "Almost immediately",
      ]}
    />

    <CheckInQuestion
      title="Did you break the loop?"
      selected={loopBreakLevel}
      onSelect={setLoopBreakLevel}
      options={[
        "No, the loop took over",
        "I noticed it afterwards",
        "I paused before reacting",
        "I chose a different response",
        "Yes — I broke the loop",
      ]}
    />

    <CheckInQuestion
      title={`How much did ${result.integratedIdentity} guide your response?`}
      selected={embodimentLevel}
      onSelect={setEmbodimentLevel}
      options={[
        "Not at all",
        "A little",
        "Somewhat",
        "Mostly",
        "Completely",
      ]}
    />
  </div>

{showBreakthrough && hasBrokenLoop && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.35),transparent_35%,transparent_70%)] animate-pulse" />

    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(28)].map((_, index) => (
        <span
          key={index}
          className="absolute h-2 w-2 rounded-full bg-yellow-300/70 shadow-[0_0_18px_rgba(250,204,21,0.9)]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-gold ${
              2 + Math.random() * 2
            }s ease-out infinite`,
            animationDelay: `${Math.random() * 1.5}s`,
          }}
        />
      ))}
    </div>

    <div className="relative max-w-xl rounded-[2rem] border border-yellow-300/30 bg-gradient-to-br from-[#15100A] via-[#0B1018] to-black p-8 text-center shadow-[0_0_120px_rgba(250,204,21,0.35)]">
      <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
        ArcheLoop Breakthrough™
      </p>

      <h2 className="mt-5 text-4xl font-bold text-yellow-200">
        {result.integratedIdentity} Activated
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-stone-200">
        You interrupted {result.primaryLoop} and chose from your Integrated
        Self™.
      </p>

      <p className="mt-5 text-sm uppercase tracking-[0.25em] text-yellow-300/70">
        Awareness → Interruption → Integration
      </p>
      <button
  type="button"
  onClick={() => setShowBreakthrough(false)}
  className="mt-7 rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
>
  Continue
</button>
    </div>

  <style>{`
      @keyframes float-gold {
        0% {
          transform: translateY(30px) scale(0.7);
          opacity: 0;
        }
        35% {
          opacity: 1;
        }
        100% {
          transform: translateY(-80px) scale(1.2);
          opacity: 0;
        }
      }
    `}</style>
  </div>
)}

</PremiumPanel>

            <PremiumPanel title="Suggested Practices">
              <ul className="space-y-2 text-stone-300">
                {result.suggestedPractices.map((practice) => (
                  <li key={practice}>• {practice}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={saveActivation}
                className="mt-6 w-full rounded-2xl bg-yellow-300 px-5 py-4 font-semibold text-black transition hover:bg-yellow-200"
              >
                Save Activation
              </button>
            </PremiumPanel>
          </aside>
                </div>
      </section>

      <Footer />
    </main>
  );
}

function CardStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
          {number}
        </span>

        <h2 className="text-2xl font-semibold text-yellow-300">
          {title}
        </h2>
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceGrid({
  items,
  selected,
  onSelect,
}: {
  items: {
    id: string;
    title: string;
    value?: string;
    description?: string;
  }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => {
        const value = item.value || item.id;
        const active = selected === value;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(value)}
            className={`rounded-2xl border p-5 text-left transition ${
              active
                ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_35px_rgba(216,183,120,0.18)]"
                : "border-yellow-300/10 bg-black/30 text-stone-300 hover:border-yellow-300/50 hover:bg-[#0B1018]"
            }`}
          >
            <p className="font-semibold">{item.title}</p>

            {item.description && (
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  active ? "text-black/70" : "text-stone-500"
                }`}
              >
                {item.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ResultItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-sm uppercase tracking-[0.18em] text-yellow-300/60">
        {label}
      </p>
      <p className="mt-2 text-lg text-stone-100">{value || "—"}</p>
    </div>
  );
}
function CheckInQuestion({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 font-semibold text-stone-100">{title}</p>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`w-full rounded-2xl border p-4 text-left transition ${
              selected === option
                ? "border-yellow-300 bg-yellow-300 text-black"
                : "border-yellow-300/10 bg-black/30 text-stone-300 hover:border-yellow-300/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}


function PremiumPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <p className="mb-4 text-sm uppercase tracking-[0.18em] text-yellow-300/60">
        {title}
      </p>

      {children}
    </div>
  );
}