"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
  const [integratedVision, setIntegratedVision] = useState("");

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
    const topEnvironments = topCommon(
      activations.map((a) => a.environment),
      3
    );

    const currentJourney = mostCommon(activations.map((a) => a.journey));

    return {
      topLoops,
      topArchetypes,
      topTriggers,
      topPeople,
      topEnvironments,
      mostActiveLoop: topLoops[0],
      mostActiveArchetype: topArchetypes[0],
      mostActiveTrigger: topTriggers[0],
      mostActivePerson: topPeople[0],
      mostActiveEnvironment: topEnvironments[0],
      currentJourney,
      emergingState: mostCommon(activations.map((a) => a.integratedIdentity)),
    };
  }, [activations]);

  useEffect(() => {
    if (!stats.currentJourney?.label || stats.currentJourney.label === "—") {
      setIntegratedVision("");
      return;
    }

    const storageKey = `archeloop-integrated-vision-${stats.currentJourney.label}`;
    const savedVision = localStorage.getItem(storageKey);

    setIntegratedVision(savedVision || "");
  }, [stats.currentJourney?.label]);

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                  Progress Dashboard™
                </p>

                <div className="mt-4 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-xs text-yellow-200">
                  Last 30 Days
                </div>

                <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                  Your ArcheLoop Patterns
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
                  Track recurring Shadow Loops™, triggers, people,
                  environments, and the pathway toward your Integrated Self™.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/triggered-intelligence"
                  className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200"
                >
                  Log New Activation
                </Link>

                <Link
                  href="/trigger-history"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 text-sm font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  View Trigger History
                </Link>
              </div>
            </div>
          </div>

          {activations.length === 0 ? (
            <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_45px_rgba(216,183,120,0.05)]">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                No Activations Yet
              </p>

              <h2 className="mt-5 text-3xl font-bold text-stone-100">
                Your dashboard will build as you log triggers.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-300">
                Save activations from Triggered Pro™ to begin seeing your most
                recurring loops, triggers, people, environments, and integration
                focus.
              </p>

              <Link
                href="/triggered-intelligence"
                className="mt-8 inline-flex rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
              >
                Log First Activation
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.10)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                    Current Pattern
                  </p>

                  <h2 className="mt-5 text-5xl font-bold text-yellow-300">
                    {stats.mostActiveLoop?.label || "—"}
                  </h2>

                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-300">
                    Your system most often enters{" "}
                    <span className="text-stone-100">
                      {stats.mostActiveLoop?.label || "this loop"}
                    </span>{" "}
                    when{" "}
                    <span className="text-stone-100">
                      {stats.mostActiveTrigger?.label || "a recurring trigger"}
                    </span>{" "}
                    appears. Awareness helps you interrupt the pattern and
                    practise a different response.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <MiniInsight
                      label="Most Common Trigger"
                      value={stats.mostActiveTrigger?.label || "—"}
                    />

                    <MiniInsight
                      label="Most Involved Person"
                      value={stats.mostActivePerson?.label || "—"}
                    />

                    <MiniInsight
                      label="Most Common Environment"
                      value={stats.mostActiveEnvironment?.label || "—"}
                    />

                    <MiniInsight
                      label="Current Focus"
                      value={stats.currentJourney.label}
                    />
                  </div>
                </div>

                <div className="rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                    Integrated Direction
                  </p>

                  <h2 className="mt-5 text-3xl font-bold text-yellow-300">
                    {stats.emergingState.label}
                  </h2>

                  <p className="mt-5 leading-relaxed text-stone-300">
                    Your current developmental movement points toward{" "}
                    <span className="text-stone-100">
                      {stats.emergingState.label}
                    </span>
                    . Use each activation as practice for this integrated
                    state.
                  </p>

                  {stats.currentJourney.label !== "—" && (
                    <Link
                      href={`/integration/${stats.currentJourney.label
                        .replace("™", "")
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      className="mt-8 inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                    >
                      Open {stats.currentJourney.label}
                    </Link>
                  )}
                </div>
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
                  detail={`${
                    stats.mostActiveArchetype?.count || 0
                  } activations`}
                />
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.10)]">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                  My Integrated Vision™
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-stone-100">
                  {stats.emergingState.label !== "—"
                    ? `Becoming ${stats.emergingState.label}`
                    : "Your Future Self Vision"}
                </h2>

                {integratedVision ? (
                  <blockquote className="mt-6 rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6 text-xl leading-relaxed text-stone-200">
                    “{integratedVision}”
                  </blockquote>
                ) : (
                  <p className="mt-5 text-lg leading-relaxed text-stone-300">
                    Visit your {stats.currentJourney.label} page to write the
                    vision of the integrated self you are becoming.
                  </p>
                )}

                {stats.currentJourney.label !== "—" && (
                  <Link
                    href={`/integration/${stats.currentJourney.label
                      .replace("™", "")
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
                  >
                    Open {stats.currentJourney.label}
                  </Link>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <RankedCard title="Top 3 Recurring Loops" items={stats.topLoops} />
                <RankedCard
                  title="Top 3 Active Archetypes"
                  items={stats.topArchetypes}
                />
                <RankedCard title="Top 3 Triggers" items={stats.topTriggers} />
                <RankedCard title="Top 3 People" items={stats.topPeople} />
                <RankedCard
                  title="Top 3 Environments"
                  items={stats.topEnvironments}
                />

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

              <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                      Recent Activations
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold text-yellow-300">
                      Latest trigger logs
                    </h2>
                  </div>

                  <Link
                    href="/trigger-history"
                    className="rounded-full border border-yellow-300/20 bg-black/30 px-5 py-2 text-sm font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                  >
                    View Full History
                  </Link>
                </div>

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

      <Footer />
    </main>
  );
}

function MiniInsight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-yellow-300/50">
        {label}
      </p>

      <p className="mt-3 text-xl font-semibold text-stone-100">{value}</p>
    </div>
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
  return (
    topCommon(items, 1)[0] || {
      label: "—",
      count: 0,
    }
  );
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