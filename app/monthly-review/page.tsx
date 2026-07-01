import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { supabaseServer } from "../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";

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


export default async function MonthlyReviewPage() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />

        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Monthly Integration Review™
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              Log in to view your monthly review.
            </h1>

            <p className="mt-4 text-stone-300">
              Your Monthly Integration Review™ is connected to your ArcheLoop account.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/auth/login"
                className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black"
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-full border border-yellow-300/20 px-8 py-4 font-semibold text-yellow-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Monthly Integration Review™
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Integration access is required.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            Monthly Review™ is part of ArcheLoop Integration™. It helps you
            reflect on your recent triggers, recurring Shadow Loops™, relational
            patterns, breakthrough moments, and Integrated Self Alignment™.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/checkout?product=integration"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start Integration™
            </Link>

            <Link
              href="/checkout?product=bundle"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
            >
              Choose Report + Integration™
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
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

  const review = buildMonthlyReview(activations);

  function buildMonthlyReview(activations: Activation[]) {
  const now = new Date();

  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const monthlyActivations = activations.filter((activation) => {
    const date = new Date(activation.createdAt);
    return date >= thirtyDaysAgo && date <= now;
  });

  const topLoops = topCommon(monthlyActivations.map((a) => a.primaryLoop), 3);
  const topTriggers = topCommon(monthlyActivations.map((a) => a.trigger), 3);
  const topPeople = topCommon(monthlyActivations.map((a) => a.person), 3);
  const topEnvironments = topCommon(
    monthlyActivations.map((a) => a.environment),
    3
  );

  const mostActiveLoop = topLoops[0] || { label: "—", count: 0 };
  const mostActiveTrigger = topTriggers[0] || { label: "—", count: 0 };
  const mostActivePerson = topPeople[0] || { label: "—", count: 0 };
  const mostActiveEnvironment = topEnvironments[0] || {
    label: "—",
    count: 0,
  };

  const awarenessScore = averageScore(
    monthlyActivations.map((a) => a.awarenessLevel),
    {
      "Only afterwards": 25,
      "While it was happening": 50,
      "Before I reacted": 75,
      Immediately: 100,
    }
  );

  const recoveryScore = averageScore(
    monthlyActivations.map((a) => a.recoveryLevel),
    {
      "Still activated": 20,
      "Several hours": 40,
      "About an hour": 60,
      "A few minutes": 80,
      "Almost immediately": 100,
    }
  );

  const loopBreakScore = averageScore(
    monthlyActivations.map((a) => a.loopBreakLevel),
    {
      "No, the loop took over": 0,
      "I noticed it afterwards": 25,
      "I paused before reacting": 50,
      "I chose a different response": 75,
      "Yes — I broke the loop": 100,
    }
  );

  const embodimentScore = averageScore(
    monthlyActivations.map((a) => a.embodimentLevel),
    {
      "Not at all": 20,
      "A little": 40,
      Somewhat: 60,
      Mostly: 80,
      Completely: 100,
    }
  );

  const completedCheckIns = monthlyActivations.filter(
    (a) =>
      a.awarenessLevel &&
      a.recoveryLevel &&
      a.loopBreakLevel &&
      a.embodimentLevel
  ).length;

  const alignmentScore =
    completedCheckIns > 0
      ? Math.round(
          (awarenessScore + recoveryScore + loopBreakScore + embodimentScore) / 4
        )
      : 0;

  const breakthroughs = monthlyActivations.filter(
    (a) =>
      a.loopBreakLevel === "I chose a different response" ||
      a.loopBreakLevel === "Yes — I broke the loop"
  );

  return {
    monthName: now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
    monthlyActivations,
    topLoops,
    topTriggers,
    topPeople,
    topEnvironments,
    mostActiveLoop,
    mostActiveTrigger,
    mostActivePerson,
    mostActiveEnvironment,
    awarenessScore,
    recoveryScore,
    loopBreakScore,
    embodimentScore,
    completedCheckIns,
    alignmentScore,
    breakthroughs,
    currentJourney: mostCommon(monthlyActivations.map((a) => a.journey)),
    integratedState: mostCommon(
      monthlyActivations.map((a) => a.integratedIdentity)
    ),
  };
}
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-8">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Monthly Integration Review™
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Your {review.monthName} Integration Review
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
              Review the Shadow Loops™, triggers, relationships, environments,
              and Integrated Self™ patterns that shaped your month.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/triggered-intelligence"
                className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-200"
              >
                Log New Activation
              </Link>

              <Link
                href="/progress-dashboard"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 text-sm font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                View Progress Dashboard
              </Link>
            </div>
          </div>

          {review.monthlyActivations.length === 0 ? (
            <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_45px_rgba(216,183,120,0.05)]">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                No Monthly Data Yet
              </p>

              <h2 className="mt-5 text-3xl font-bold">
                Your Monthly Integration Review™ will build as you log triggers.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-300">
                Use Triggered Pro™ throughout the month to see your recurring
                loops, relational patterns, and Integrated Self Alignment™.
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
              <div className="grid gap-4 md:grid-cols-4">
                <ReviewStat
                  label="Activations Reviewed"
                  value={String(review.monthlyActivations.length)}
                />

                <ReviewStat
                  label="Most Active Loop"
                  value={review.mostActiveLoop.label}
                  detail={`${review.mostActiveLoop.count} activations`}
                />

                <ReviewStat
                  label="Integrated Self Alignment™"
                  value={
                    review.completedCheckIns > 0
                      ? `${review.alignmentScore}%`
                      : "Pending"
                  }
                  detail={`${review.completedCheckIns} completed check-in${
                    review.completedCheckIns === 1 ? "" : "s"
                  }`}
                />

                <ReviewStat
                  label="Breakthrough Moments"
                  value={String(review.breakthroughs.length)}
                  detail="I Broke The Loop™"
                />
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.10)]">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                  Monthly Summary™
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-yellow-300">
                  {review.currentJourney.label !== "—"
                    ? `You are walking the ${review.currentJourney.label}`
                    : "Your monthly pattern is forming"}
                </h2>

                <p className="mt-5 max-w-4xl text-lg leading-relaxed text-stone-300">
                  This month,{" "}
                  <span className="text-stone-100">
                    {review.mostActiveLoop.label}
                  </span>{" "}
                  was your most active Shadow Loop™. It appeared most often
                  around{" "}
                  <span className="text-stone-100">
                    {review.mostActivePerson.label}
                  </span>{" "}
                  in{" "}
                  <span className="text-stone-100">
                    {review.mostActiveEnvironment.label}
                  </span>{" "}
                  during{" "}
                  <span className="text-stone-100">
                    {review.mostActiveTrigger.label}
                  </span>{" "}
                  situations.
                </p>

                {review.integratedState.label !== "—" && (
                  <p className="mt-5 max-w-4xl text-lg leading-relaxed text-stone-300">
                    Your integration direction is{" "}
                    <span className="text-yellow-300">
                      {review.integratedState.label}
                    </span>
                    . The monthly practice is not to avoid activation, but to
                    notice the loop earlier and respond with more conscious
                    alignment.
                  </p>
                )}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <ReviewPanel title="Loop Landscape™">
                  <RankedProgress
                    items={review.topLoops}
                    total={review.monthlyActivations.length}
                  />
                </ReviewPanel>

                <ReviewPanel title="Relational Pattern™">
                  <div className="grid gap-4">
                    <MiniItem
                      label="Most Activating Person"
                      value={review.mostActivePerson.label}
                    />
                    <MiniItem
                      label="Most Activating Environment"
                      value={review.mostActiveEnvironment.label}
                    />
                    <MiniItem
                      label="Most Activating Trigger"
                      value={review.mostActiveTrigger.label}
                    />
                  </div>
                </ReviewPanel>
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.10)]">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                  Integrated Self Alignment™
                </p>

                {review.completedCheckIns > 0 ? (
                  <>
                    <h2 className="mt-4 text-6xl font-bold text-yellow-300">
                      {review.alignmentScore}%
                    </h2>

                    <p className="mt-4 max-w-3xl leading-relaxed text-stone-300">
                      This reflects how consistently you noticed the loop,
                      returned to centre, interrupted the automatic pattern, and
                      responded from your Integrated Self™ this month.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <ProgressMetric
                        label="Awareness"
                        value={review.awarenessScore}
                      />
                      <ProgressMetric
                        label="Recovery"
                        value={review.recoveryScore}
                      />
                      <ProgressMetric
                        label="Interruption"
                        value={review.loopBreakScore}
                      />
                      <ProgressMetric
                        label="Integrated Self"
                        value={review.embodimentScore}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 text-4xl font-bold">
                      Not enough check-in data yet
                    </h2>

                    <p className="mt-4 max-w-3xl leading-relaxed text-stone-300">
                      Complete the full Integration Check-In™ after logging
                      activations to begin measuring Integrated Self Alignment™.
                    </p>
                  </>
                )}
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                  Monthly Reassessment™
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-yellow-300">
                  Ready to compare your current loop profile?
                </h2>

                <p className="mt-4 max-w-3xl leading-relaxed text-stone-300">
  Retaking Find My Loop™ once per month helps you reflect on whether your Shadow Loop™ profile is shifting over time. As your history grows, ArcheLoop™ can compare your original pattern with your current integration progress.
</p>

                <Link
                  href="/assessment"
                  className="mt-6 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Retake Find My Loop™
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ReviewStat({
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

      <p className="mt-4 text-3xl font-bold text-stone-100">{value}</p>

      {detail && <p className="mt-2 text-sm text-stone-500">{detail}</p>}
    </div>
  );
}

function ReviewPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <h2 className="text-2xl font-semibold text-yellow-300">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function MiniItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-yellow-300/50">
        {label}
      </p>

      <p className="mt-3 text-xl font-semibold text-stone-100">{value}</p>
    </div>
  );
}

function RankedProgress({
  items,
  total,
}: {
  items: RankedItem[];
  total: number;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const percentage = Math.round((item.count / total) * 100);

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-stone-100">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  {item.count}{" "}
                  {item.count === 1 ? "activation" : "activations"}
                </p>
              </div>

              <p className="text-xl font-bold text-yellow-300">
                {percentage}%
              </p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/50">
              <div
                className="h-full rounded-full bg-yellow-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-stone-100">{label}</p>
        <p className="font-bold text-yellow-300">{value}%</p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/50">
        <div
          className="h-full rounded-full bg-yellow-300"
          style={{ width: `${value}%` }}
        />
      </div>
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

function averageScore(
  items: (string | undefined)[],
  scoreMap: Record<string, number>
) {
  const validScores = items
    .map((item) => (item ? scoreMap[item] : undefined))
    .filter((score): score is number => typeof score === "number");

  if (validScores.length === 0) return 0;

  const total = validScores.reduce((sum, score) => sum + score, 0);

  return Math.round(total / validScores.length);
}