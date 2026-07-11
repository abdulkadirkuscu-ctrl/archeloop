"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "../../lib/supabaseClient";
import { detectLoop } from "../data/intelligenceEngine";
import { generateInsight } from "../data/insightGenerator";
import PageShell from "../components/PageShell";
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
  const [emotionalFamily, setEmotionalFamily] = useState(
    emotionalFamilies[0].value
  );
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
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasIntegrationAccess, setHasIntegrationAccess] = useState(false);

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

  useEffect(() => {
    async function checkAccess() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!session?.access_token) {
        setHasIntegrationAccess(false);
        setCheckingAccess(false);
        return;
      }

      const res = await fetch("/api/checkout/access", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await res.json();

      setHasIntegrationAccess(Boolean(data.hasIntegrationAccess));
      setCheckingAccess(false);
    }

    checkAccess();
  }, []);

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

  function journeySlug(journey: string) {
    return journey.toLowerCase().replaceAll("™", "").replaceAll(" ", "-");
  }

  if (checkingAccess) {
    return (
      <PageShell>
        <section className="al-section text-center">
          <p className="al-text">Loading Triggered Pro…</p>
        </section>
      </PageShell>
    );
  }

  if (!hasIntegrationAccess) {
    return (
      <PageShell>
        <section className="al-section text-center">
          <div className="al-premium-card mx-auto max-w-4xl p-10">
            <p className="al-kicker">Triggered Pro</p>

            <h1 className="al-heading-lg">
              Integration access is required.
            </h1>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Triggered Pro is part of ArcheLoop Integration. It helps you log
              real-life triggers, identify active Shadow Loops, complete
              Integration Check-Ins, and track progress over time.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/checkout?product=integration"
                className="al-button-primary"
              >
                Start Integration
              </Link>

              <Link
                href="/checkout?product=bundle"
                className="al-button-secondary"
              >
                Choose Report + Integration
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }
    return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="al-premium-card p-10">
              <p className="al-kicker">Triggered Pro</p>

              <h1 className="al-heading-lg">
                Identify the Shadow Loop Behind Your Reaction
              </h1>

              <p className="al-text-lg mt-6 max-w-3xl">
                Answer a few simple questions to identify the Shadow Loop
                driving your current reaction and receive guidance for your next
                integrated step.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/trigger-history" className="al-button-secondary">
                  View Trigger History
                </Link>

                <Link
                  href="/progress-dashboard"
                  className="al-button-secondary"
                >
                  View Progress Dashboard
                </Link>
              </div>
            </div>

            <CardStep number="1" title="Where did you feel it?">
              <ChoiceGrid
                items={bodyZones}
                selected={bodyZone}
                onSelect={setBodyZone}
              />
            </CardStep>

            <CardStep number="2" title="What did you feel?">
              <ChoiceGrid
                items={emotionalFamilies}
                selected={emotionalFamily}
                onSelect={setEmotionalFamily}
              />
            </CardStep>

            <CardStep number="3" title="What happened?">
              <ChoiceGrid
                items={triggerCategories}
                selected={triggerCategory}
                onSelect={handleTriggerCategoryChange}
              />

              <div className="mt-6">
                <label className="al-kicker">What specifically happened?</label>

                <select
                  value={trigger}
                  onChange={(event) => setTrigger(event.target.value)}
                  className="al-input mt-3"
                >
                  {triggers[triggerCategory as keyof typeof triggers].map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
            </CardStep>

            <CardStep number="4" title="How did you respond?">
              <ChoiceGrid
                items={responseStyles}
                selected={responseStyle}
                onSelect={setResponseStyle}
              />
            </CardStep>

            <CardStep number="5" title="Who was involved?">
              <select
                value={person}
                onChange={(event) => setPerson(event.target.value)}
                className="al-input"
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
                className="al-input"
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
                          ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
                          : "al-soft-card hover:border-[var(--al-accent)]"
                      }`}
                    >
                      <p className="font-medium">{item.title}</p>
                    </button>
                  );
                })}
              </div>
            </CardStep>
          </div>

          <aside className="al-premium-card h-fit space-y-7 p-7 lg:sticky lg:top-8">
            <div>
              <p className="al-kicker">ArcheLoop Result</p>

              <h2 className="mt-4 text-4xl font-bold text-[var(--al-accent)]">
                {result.primaryLoop}
              </h2>

              <p className="al-text mt-3">
                Pattern Match: {result.confidence}%
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
              <div
                className="h-full rounded-full bg-[var(--al-accent)]"
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            <div className="grid gap-4">
              <ResultItem label="Secondary Loop" value={result.secondaryLoop} />
              <ResultItem label="Archetype" value={result.archetype} />
              <ResultItem label="Integration Journey" value={result.journey} />
              <ResultItem
                label="Integrated State"
                value={result.integratedIdentity}
              />
            </div>

            <PremiumPanel title="Integration Reflection">
              <p className="text-lg font-semibold text-[var(--al-text)]">
                What would {result.integratedIdentity} do right now?
              </p>

              {integratedVision ? (
                <div className="al-soft-card mt-4 p-4">
                  <p className="al-kicker">My Integrated Vision</p>

                  <p className="al-text mt-3">{integratedVision}</p>
                </div>
              ) : (
                <p className="al-text mt-4">
                  Visit your {result.journey} page to write your personal
                  integrated vision.
                </p>
              )}

              <Link
                href={`/integration/${journeySlug(result.journey)}`}
                className="al-button-secondary mt-5 inline-flex"
              >
                Open {result.journey}
              </Link>
            </PremiumPanel>

            <PremiumPanel title="ArcheLoop Insight">
              <p className="al-text whitespace-pre-line">{insight}</p>
            </PremiumPanel>

                        <PremiumPanel title="Top 3 Loop Matches">
              <div className="space-y-5">
                {result.topMatches.map((match, index) => (
                  <div key={match.loop}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-[var(--al-text)]">
                          {index + 1}. {match.loop}
                        </p>

                        <p className="text-sm text-[var(--al-accent)]">
                          {match.archetype}
                        </p>
                      </div>

                      <p className="font-semibold text-[var(--al-accent)]">
                        {match.confidence}%
                      </p>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
                      <div
                        className="h-full rounded-full bg-[var(--al-accent)]"
                        style={{ width: `${match.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PremiumPanel>

            <PremiumPanel title="Integration Check-In">
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
                <div
  className="fixed inset-0 z-50 flex items-center justify-center px-6 backdrop-blur-md"
  style={{ background: "rgba(0,0,0,.45)" }}
>
                  <div className="al-breakthrough-glow" />

                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[...Array(28)].map((_, index) => (
                      <span
                        key={index}
                        className="absolute h-2 w-2 rounded-full bg-[var(--al-accent)]/70"
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

                  <div className="al-premium-card relative max-w-xl p-8 text-center">
                    <p className="al-kicker">ArcheLoop Breakthrough</p>

                    <h2 className="mt-5 text-4xl font-bold text-[var(--al-accent)]">
                      {result.integratedIdentity} Activated
                    </h2>

                    <p className="al-text-lg mt-5">
                      You interrupted {result.primaryLoop} and chose from your
                      Integrated Self.
                    </p>

                    <p className="al-kicker mt-5">
                      Awareness → Interruption → Integration
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowBreakthrough(false)}
                      className="al-button-primary mt-7"
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
              <ul className="al-text space-y-2">
                {result.suggestedPractices.map((practice) => (
                  <li key={practice}>• {practice}</li>
                ))}
              </ul>

              <button
                type="button"
                onClick={saveActivation}
                className="al-button-primary mt-6 w-full"
              >
                Save Activation
              </button>
            </PremiumPanel>
          </aside>
        </div>
      </section>
    </PageShell>
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
    <div className="al-card p-7">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--al-accent)] text-sm font-bold text-[var(--al-bg)]">
          {number}
        </span>

        <h2 className="text-2xl font-semibold text-[var(--al-accent)]">
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
                ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
                : "al-soft-card hover:border-[var(--al-accent)]"
            }`}
          >
            <p className="font-semibold">{item.title}</p>

            {item.description && (
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  active ? "text-[var(--al-bg)]/80" : "al-muted"
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

function ResultItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="al-soft-card p-4">
      <p className="al-kicker">{label}</p>
      <p className="mt-2 text-lg font-semibold text-[var(--al-text)]">
        {value || "—"}
      </p>
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
      <p className="mb-3 font-semibold text-[var(--al-text)]">{title}</p>

      <div className="space-y-3">
        {options.map((option) => {
          const active = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                active
                  ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
                  : "al-soft-card hover:border-[var(--al-accent)]"
              }`}
            >
              {option}
            </button>
          );
        })}
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
    <div className="al-soft-card p-5">
      <p className="al-kicker mb-4">{title}</p>
      {children}
    </div>
  );
}