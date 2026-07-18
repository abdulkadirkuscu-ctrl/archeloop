import Link from "next/link";
import PageShell from "../components/PageShell";
import { supabaseServer } from "../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { stripTrademark } from "../../lib/text";

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
  loopBreakLevel?: string;
  awarenessLevel?: string;
  recoveryLevel?: string;
  embodimentLevel?: string;
};

type RankedItem = {
  label: string;
  count: number;
};

export default async function ProgressDashboardPage() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return (
      <PageShell>
        
        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl al-card p-10">
            <p className="text-sm uppercase tracking-[0.3em] al-kicker">
              Progress Dashboard
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              Log in to view your dashboard.
            </h1>

            <p className="mt-4 al-text-lg">
              Your progress dashboard is connected to your ArcheLoop account.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/auth/login"
                className="rounded-full al-button-primary px-8 py-4 font-semibold text-black"
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-full border border-var(--al-accent)/20 px-8 py-4 font-semibold text-[var(--al-accent)]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }
const { data: orders } = await supabaseServer
  .from("archeloop_orders")
  .select("product, status")
  .eq("user_id", user.id)
  .in("status", ["paid", "private_access", "founding_access"]);

const hasIntegrationAccess =
  orders?.some(
    (order) => order.product === "integration" || order.product === "bundle"
  ) || false;

if (!hasIntegrationAccess) {
  return (
    <PageShell>
      

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 al-hero-glow" />

        <div className="relative mx-auto max-w-4xl al-premium-card">
          <p className="text-sm uppercase tracking-[0.35em] al-kicker">
            Progress Dashboard
          </p>

          <h1 className="mt-5 al-heading-xl">
            Integration access is required.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed al-text-lg">
            The Progress Dashboard is part of ArcheLoop Integration. It helps
            you track recurring Shadow Loops, triggers, people, environments,
            Integration Check-Ins, and your progress over time.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/checkout?product=integration"
              className="rounded-full al-button-primary px-8 py-4 text-lg font-semibold text-black transition hover:al-button-primary"
            >
              Start Integration
            </Link>

            <Link
              href="/checkout?product=bundle"
              className="rounded-full al-button-secondary px-8 py-4 text-lg font-semibold text-[var(--al-accent)] transition hover:border-var(--al-accent)/60"
            >
              Choose Report + Integration
            </Link>
          </div>
        </div>
      </section>

    </PageShell>
  );
}

  const { data: rows } = await supabaseServer
    .from("archeloop_activations")
    .select("id, created_at, activation_data")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activations: Activation[] =
    rows?.map((row: any) => ({
      id: row.id,
      createdAt: row.created_at,
      ...(row.activation_data || {}),
    })) || [];

  const stats = buildStats(activations);

  return (
    <PageShell>
      

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 al-hero-glow" />

        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="al-premium-card p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] al-kicker">
                  Progress Dashboard
                </p>

                <h1 className="mt-6 al-heading-xl">
                  Your ArcheLoop Patterns
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed al-text-lg">
                  Track recurring Shadow Loops, triggers, people,
                  environments, and the pathway toward your Integrated Self.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/triggered-intelligence"
                  className="rounded-full al-button-primary px-6 py-3 text-sm font-semibold text-black transition hover:al-button-primary"
                >
                  Log New Activation
                </Link>

                <Link
                  href="/trigger-history"
                  className="rounded-full al-button-secondary px-6 py-3 text-sm font-semibold al-text-lg transition hover:border-var(--al-accent)/60 hover:text-[var(--al-accent)]"
                >
                  View Trigger History
                </Link>
              </div>
            </div>
          </div>

          {activations.length === 0 ? (
            <div className="al-premium-card p-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                No Activations Yet
              </p>

              <h2 className="mt-5 text-3xl font-bold text-[var(--al-text)]">
                Your dashboard will build as you log triggers.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed al-text-lg">
                Save activations from Triggered Pro to begin seeing your most
                recurring loops, triggers, people, environments, and integration
                focus.
              </p>

              <Link
                href="/triggered-intelligence"
                className="mt-8 inline-flex rounded-full al-button-primary px-8 py-4 font-semibold text-black transition hover:al-button-primary"
              >
                Log First Activation
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="al-premium-card p-8">
                  <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                    Current Pattern
                  </p>

                  <h2 className="mt-5 text-5xl font-bold text-[var(--al-accent)]">
                    {stats.mostActiveLoop?.label || "—"}
                  </h2>

                  <p className="mt-5 max-w-3xl text-lg leading-relaxed al-text-lg">
                    Your system most often enters{" "}
                    <span className="text-[var(--al-text)]">
                      {stats.mostActiveLoop?.label || "this loop"}
                    </span>{" "}
                    when{" "}
                    <span className="text-[var(--al-text)]">
                      {stats.mostActiveTrigger?.label || "a recurring trigger"}
                    </span>{" "}
                    appears. Awareness helps you interrupt the pattern and
                    practise a different response.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <MiniInsight label="Most Common Trigger" value={stats.mostActiveTrigger?.label || "—"} />
                    <MiniInsight label="Most Involved Person" value={stats.mostActivePerson?.label || "—"} />
                    <MiniInsight label="Most Common Environment" value={stats.mostActiveEnvironment?.label || "—"} />
                    <MiniInsight label="Current Focus" value={stats.currentJourney.label} />
                  </div>
                </div>

                <div className="al-card p-8">
                  <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                    Integrated Direction
                  </p>

                  <h2 className="mt-5 text-3xl font-bold text-[var(--al-accent)]">
                    {stats.emergingState.label}
                  </h2>

                  <p className="mt-5 leading-relaxed al-text-lg">
                    Your current developmental movement points toward{" "}
                    <span className="text-[var(--al-text)]">{stats.emergingState.label}</span>.
                    Use each activation as practice for this integrated state.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <StatCard label="Saved Activations" value={String(activations.length)} />
                <StatCard
                  label="Loops Broken"
                  value={`${stats.loopsBroken} / ${stats.totalActivations}`}
                  detail={
                    stats.loopsBroken > 0
                      ? `${stats.loopBreakRate}% interruption rate`
                      : "Start interrupting loops to build this score."
                  }
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
                  <StatCard label="Current Integration Journey" value={stats.currentJourney.label} />
                  <StatCard label="Emerging Integrated State" value={stats.emergingState.label} />
                </div>
              </div>

              <DashboardSection title="Loop Landscape" subtitle="Which Shadow Loops are most active right now?">
                <div className="mt-8 space-y-4">
                  {stats.topLoops.map((loop) => {
                    const percentage = Math.round((loop.count / stats.totalActivations) * 100);
                    return (
                      <ProgressRow
                        key={loop.label}
                        label={loop.label}
                        detail={`${loop.count} ${loop.count === 1 ? "activation" : "activations"}`}
                        value={percentage}
                      />
                    );
                  })}
                </div>
              </DashboardSection>

              <DashboardSection title="Integrated Self Alignment" subtitle="How consistently are you interrupting the loop?">
                {stats.hasIntegrationScore ? (
                  <>
                    <h2 className="mt-4 text-6xl font-bold text-[var(--al-accent)]">
                      {stats.integrationScore}%
                    </h2>

                    <p className="mt-4 max-w-3xl leading-relaxed al-text-lg">
                      This reflects how consistently you notice the loop, return
                      to centre, interrupt the automatic pattern, and respond
                      from your Integrated Self.
                    </p>

                    <p className="mt-3 text-sm al-muted">
                      Based on {stats.completedCheckIns} completed Integration Check-In
                      {stats.completedCheckIns === 1 ? "" : "s"}.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <ProgressMetric label="Awareness" value={stats.awarenessScore} />
                      <ProgressMetric label="Recovery" value={stats.recoveryScore} />
                      <ProgressMetric label="Loop Breaking" value={stats.loopBreakScore} />
                      <ProgressMetric label="Integrated Self" value={stats.embodimentScore} />
                    </div>
                  </>
                ) : (
                  <p className="mt-4 max-w-3xl leading-relaxed al-text-lg">
                    Your Integrated Self Alignment will appear once you begin
                    completing Integration Check-In questions.
                  </p>
                )}
              </DashboardSection>

             <DashboardSection title="Loop Trend" subtitle="How have your dominant Shadow Loops changed over time?">
                <div className="mt-8 space-y-4">
                  {stats.loopTrend.length === 0 ? (
                    <p className="al-muted">Not enough trend data yet.</p>
                  ) : (
                    stats.loopTrend.map((loop) => (
                      <div key={loop.label} className="al-soft-card p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-xl font-semibold text-[var(--al-text)]">{loop.label}</p>
                            <p className="mt-1 text-sm al-muted">
                              Previous 30 days: {loop.previousCount} · Last 30 days: {loop.currentCount}
                            </p>
                          </div>

                          <div className="rounded-full border border-var(--al-accent)/20 al-button-primary/10 px-4 py-2 text-sm font-semibold text-[var(--al-accent)]">
                            {loop.previousCount === 0 && loop.currentCount > 0
                              ? "New in last 30 days"
                              : loop.change > 0
                              ? `↑ ${loop.change}% more influential`
                              : loop.change < 0
                              ? `↓ ${Math.abs(loop.change)}% less influential`
                              : "No change"}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DashboardSection>

              <div className="al-premium-card p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                      Recent Activations
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-[var(--al-accent)]">
                      Latest trigger logs
                    </h2>
                  </div>

                  <Link
                    href="/trigger-history"
                    className="rounded-full al-button-secondary px-5 py-2 text-sm font-semibold text-[var(--al-accent)] transition hover:border-var(--al-accent)/60"
                  >
                    View Full History
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {activations.slice(0, 5).map((activation) => (
                    <div key={activation.id} className="al-soft-card p-5">
                      <p className="text-sm al-kicker">
                        {new Date(activation.createdAt).toLocaleString()}
                      </p>

                      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-xl font-semibold text-[var(--al-text)]">
                            {stripTrademark(activation.primaryLoop)}
                          </p>

                          <p className="mt-1 text-sm al-muted">
                            {activation.trigger} · {activation.person} · {activation.environment}
                          </p>
                        </div>

                        <div className="rounded-full border border-var(--al-accent)/20 al-button-primary/10 px-4 py-2 text-sm text-[var(--al-accent)]">
                          Loop Match {activation.confidence}%
                        </div>
                      </div>

                      {activation.loopBreakLevel && (
                        <p className="mt-3 text-sm text-[var(--al-accent)]">
                          Integration Check-In: {activation.loopBreakLevel}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

     </PageShell>
  );
}

function buildStats(activations: Activation[]) {
  const topLoops = topCommon(activations.map((a) => a.primaryLoop), 3);
  const topArchetypes = topCommon(activations.map((a) => a.archetype), 3);
  const topTriggers = topCommon(activations.map((a) => a.trigger), 3);
  const topPeople = topCommon(activations.map((a) => a.person), 3);
  const topEnvironments = topCommon(activations.map((a) => a.environment), 3);

  const loopsBroken = activations.filter(
    (a) =>
      a.loopBreakLevel === "I chose a different response" ||
      a.loopBreakLevel === "Yes — I broke the loop"
  ).length;

  const loopBreakRate =
    activations.length > 0 ? Math.round((loopsBroken / activations.length) * 100) : 0;

  const awarenessScore = averageScore(activations.map((a) => a.awarenessLevel), {
    "Only afterwards": 25,
    "While it was happening": 50,
    "Before I reacted": 75,
    Immediately: 100,
  });

  const recoveryScore = averageScore(activations.map((a) => a.recoveryLevel), {
    "Still activated": 20,
    "Several hours": 40,
    "About an hour": 60,
    "A few minutes": 80,
    "Almost immediately": 100,
  });

  const loopBreakScore = averageScore(activations.map((a) => a.loopBreakLevel), {
    "No, the loop took over": 0,
    "I noticed it afterwards": 25,
    "I paused before reacting": 50,
    "I chose a different response": 75,
    "Yes — I broke the loop": 100,
  });

  const embodimentScore = averageScore(activations.map((a) => a.embodimentLevel), {
    "Not at all": 20,
    "A little": 40,
    Somewhat: 60,
    Mostly: 80,
    Completely: 100,
  });

  const completedCheckIns = activations.filter(
    (a) => a.awarenessLevel && a.recoveryLevel && a.loopBreakLevel && a.embodimentLevel
  ).length;

  const integrationScore = Math.round(
    (awarenessScore + recoveryScore + loopBreakScore + embodimentScore) / 4
  );

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(now.getDate() - 60);

  const current30Days = activations.filter((a) => new Date(a.createdAt) >= thirtyDaysAgo);
  const previous30Days = activations.filter((a) => {
    const date = new Date(a.createdAt);
    return date >= sixtyDaysAgo && date < thirtyDaysAgo;
  });

  const loopTrend = topCommon([...new Set(activations.map((a) => a.primaryLoop))], 12).map((loop) => {
    const currentCount = current30Days.filter((a) => a.primaryLoop === loop.label).length;
    const previousCount = previous30Days.filter((a) => a.primaryLoop === loop.label).length;
    const change =
      previousCount > 0
        ? Math.round(((currentCount - previousCount) / previousCount) * 100)
        : currentCount > 0
        ? 100
        : 0;

    return { label: loop.label, currentCount, previousCount, change };
  });

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
    currentJourney: mostCommon(activations.map((a) => a.journey)),
    emergingState: mostCommon(activations.map((a) => a.integratedIdentity)),
    loopsBroken,
    loopBreakRate,
    totalActivations: activations.length,
    awarenessScore,
    recoveryScore,
    loopBreakScore,
    embodimentScore,
    integrationScore,
    completedCheckIns,
    hasIntegrationScore: completedCheckIns > 0,
    loopTrend,
  };
}

function DashboardSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="al-premium-card p-8">
      <p className="text-sm uppercase tracking-[0.3em] al-kicker">
        {title}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-[var(--al-text)]">{subtitle}</h2>
      {children}
    </div>
  );
}

function ProgressRow({
  label,
  detail,
  value,
}: {
  label: string;
  detail: string;
  value: number;
}) {
  return (
    <div className="al-soft-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-[var(--al-text)]">{label}</p>
          <p className="mt-1 text-sm al-muted">{detail}</p>
        </div>
        <p className="text-xl font-bold text-[var(--al-accent)]">{value}%</p>
      </div>

      <div className="mt-4 al-progress-track">
        <div className="h-full rounded-full bg-[var(--al-accent)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ProgressMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="al-soft-card p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-[var(--al-text)]">{label}</p>
        <p className="font-bold text-[var(--al-accent)]">{value}%</p>
      </div>

      <div className="mt-4 al-progress-track">
        <div
    className="al-progress-fill"
    style={{ width: `${value}%` }}
/>
      </div>
    </div>
  );
}

function MiniInsight({ label, value }: { label: string; value: string }) {
  return (
    <div className="al-soft-card p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--al-accent)]/50">
        {label}
      </p>
      <p className="mt-3 text-xl font-semibold text-[var(--al-text)]">{value}</p>
    </div>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="al-card p-6">
      <p className="text-sm uppercase tracking-[0.2em] al-kicker">{label}</p>
      <p className="mt-4 text-3xl font-bold text-[var(--al-text)]">{value || "—"}</p>
      {detail && <p className="mt-2 text-sm al-muted">{detail}</p>}
    </div>
  );
}

function RankedCard({ title, items }: { title: string; items: RankedItem[] }) {
  return (
    <div className="al-card p-6">
      <h2 className="text-2xl font-semibold text-[var(--al-accent)]">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-4 al-muted">No data yet.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 al-soft-card p-4"
            >
              <div>
                <p className="font-medium text-[var(--al-text)]">
                  {index + 1}. {item.label}
                </p>
                <p className="mt-1 text-sm al-kicker">
                  {item.count} {item.count === 1 ? "activation" : "activations"}
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
  return topCommon(items, 1)[0] || { label: "—", count: 0 };
}

function averageScore(items: (string | undefined)[], scoreMap: Record<string, number>) {
  const validScores = items
    .map((item) => (item ? scoreMap[item] : undefined))
    .filter((score): score is number => typeof score === "number");

  if (validScores.length === 0) return 0;

  const total = validScores.reduce((sum, score) => sum + score, 0);
  return Math.round(total / validScores.length);
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
    .map(([label, count]) => ({ label: stripTrademark(label), count }));
}