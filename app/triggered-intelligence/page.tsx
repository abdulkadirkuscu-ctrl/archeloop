"use client";

import Link from "next/link";
import { useState } from "react";
import { detectLoop } from "../data/intelligenceEngine";
import { generateInsight } from "../data/insightGenerator";
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

  function saveActivation() {
    const savedActivations = JSON.parse(
      localStorage.getItem("archeloopActivations") || "[]"
    );

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
      bodyZone,
      emotionalFamily,
      responseStyle,
      triggerCategory,
      trigger,
      person,
      environment,
      thought,
    };

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
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                Triggered Pro™
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
                Decode the Loop Behind the Trigger
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
                Move through the core ArcheLoop sequence: body, emotional
                family, response style, trigger, context, and thought pattern.
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

            <CardStep number="1" title="Where do you feel it most?">
              <ChoiceGrid items={bodyZones} selected={bodyZone} onSelect={setBodyZone} />
            </CardStep>

            <CardStep number="2" title="What feels strongest?">
              <ChoiceGrid
                items={emotionalFamilies}
                selected={emotionalFamily}
                onSelect={setEmotionalFamily}
              />
            </CardStep>

            <CardStep number="3" title="What happened next?">
              <ChoiceGrid
                items={responseStyles}
                selected={responseStyle}
                onSelect={setResponseStyle}
              />
            </CardStep>

            <CardStep number="4" title="What kind of trigger was it?">
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

            <CardStep number="7" title="Which thought was closest?">
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
                Loop Match: {result.confidence}%
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