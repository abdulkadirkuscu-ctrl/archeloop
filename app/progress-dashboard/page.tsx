"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Activation = {
  id: string;
  createdAt: string;
  primaryLoop: string;
  secondaryLoop?: string;
  confidence: number;
  archetype: string;
  journey: string;
  integratedIdentity: string;
  trigger: string;
  person: string;
  environment: string;
  thought: string;
};

type RankedItem = {
  label: string;
  count: number;
};

export default function ProgressDashboardPage() {
  const [activations, setActivations] = useState<Activation[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("archeloopActivations") || "[]"
    );

    setActivations(saved);
  }, []);

  const stats = useMemo(() => {
    const topLoops = topCommon(activations.map((a) => a.primaryLoop), 3);
    const topArchetypes = topCommon(activations.map((a) => a.archetype), 3);
    const topTriggers = topCommon(activations.map((a) => a.trigger), 3);
    const topPeople = topCommon(activations.map((a) => a.person), 3);
    const topEnvironments = topCommon(activations.map((a) => a.environment), 3);

    const currentJourney = mostCommon(activations.map((a) => a.journey));

    return {
      topLoops,
      topArchetypes,
      topTriggers,
      topPeople,
      topEnvironments,
      patternInsight: generatePatternInsight(
        topLoops[0]?.label,
        topTriggers[0]?.label,
        topPeople[0]?.label,
        currentJourney.label
      ),
      mostActiveLoop: topLoops[0],
      mostActiveArchetype: topArchetypes[0],
      currentJourney,
      emergingState: mostCommon(activations.map((a) => a.integratedIdentity)),
    };
  }, [activations]);

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Progress Dashboard
            </p>

            <div className="mt-4 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-xs text-yellow-200">
              Last 30 Days
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
              Your ArcheLoop Patterns
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
              Track your recurring Shadow Loops, triggers, people, and
              environments over time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/triggered-intelligence"
                className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
              >
                Log New Activation
              </Link>

              <Link
                href="/trigger-history"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-5 py-2 text-sm text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
              >
                View Trigger History
              </Link>
            </div>
          </div>

          {activations.length === 0 ? (
            <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
              <p className="text-stone-300">
                No saved activations yet. Save activations from Triggered Pro™
                to begin tracking your patterns.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.10)]">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                  ArcheLoop Pattern Insight™
                </p>

                <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-stone-200">
                  {stats.patternInsight}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                  label="Saved Activations"
                  value={String(activations.length)}
                />

                <StatCard
                  label="Most Active Loop"
                  value={stats.mostActiveLoop?.label || "—"}
                  detail={`${stats.mostActiveLoop?.count || 0} activations`}
                />

                <StatCard
                  label="Most Active Archetype"
                  value={stats.mostActiveArchetype?.label || "—"}
                  detail={`${stats.mostActiveArchetype?.count || 0} activations`}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <RankedCard title="Top 3 Recurring Loops" items={stats.topLoops} />
                <RankedCard title="Top 3 Active Archetypes" items={stats.topArchetypes} />
                <RankedCard title="Top 3 Triggers" items={stats.topTriggers} />
                <RankedCard title="Top 3 People" items={stats.topPeople} />
                <RankedCard title="Top 3 Environments" items={stats.topEnvironments} />

                <div className="grid gap-4">
                  <StatCard
                    label="Current Integration Journey"
                    value={stats.currentJourney.label}
                  />

                  <StatCard
                    label="Emerging Integrated State"
                    value={stats.emergingState.label}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
                <h2 className="text-3xl font-semibold text-yellow-300">
                  Recent Activations
                </h2>

                <div className="mt-6 space-y-4">
                  {activations.slice(0, 5).map((activation) => (
                    <div
                      key={activation.id}
                      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5"
                    >
                      <p className="text-sm text-yellow-300/60">
                        {new Date(activation.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-xl font-semibold text-stone-100">
                            {activation.primaryLoop}
                          </p>

                          <p className="mt-1 text-sm text-stone-400">
                            {activation.trigger} · {activation.person} ·{" "}
                            {activation.environment}
                          </p>
                        </div>

                        <div className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200">
                          Loop Match {activation.confidence}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/60">
        {label}
      </p>

      <p className="mt-4 text-3xl font-bold text-stone-100">{value || "—"}</p>

      {detail && <p className="mt-2 text-sm text-stone-500">{detail}</p>}
    </div>
  );
}

function RankedCard({
  title,
  items,
}: {
  title: string;
  items: RankedItem[];
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <h2 className="text-2xl font-semibold text-yellow-300">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-stone-400">No data yet.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-2xl border border-yellow-300/10 bg-black/30 p-4"
            >
              <div>
                <p className="font-medium text-stone-100">
                  {index + 1}. {item.label}
                </p>

                <p className="mt-1 text-sm text-yellow-300/60">
                  {item.count}{" "}
                  {item.count === 1 ? "activation" : "activations"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function mostCommon(items: string[]) {
  return topCommon(items, 1)[0] || {
    label: "—",
    count: 0,
  };
}

function topCommon(items: string[], limit: number) {
  const counts: Record<string, number> = {};

  items.forEach((item) => {
    if (!item) return;
    counts[item] = (counts[item] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, count]) => ({
      label,
      count,
    }));
}

function generatePatternInsight(
  loop?: string,
  trigger?: string,
  person?: string,
  journey?: string
) {
  if (!loop) {
    return "Begin saving activations to uncover recurring patterns.";
  }

  return `Your most recurring loop is ${loop}.

The trigger appearing most often is ${trigger || "unknown"}.

The person most frequently involved is ${person || "unknown"}.

Your current developmental focus appears to be ${
    journey || "your integration journey"
  }.

Notice what repeatedly activates this pattern. Awareness creates choice, and choice creates transformation.`;
}