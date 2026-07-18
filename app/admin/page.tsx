import { redirect, notFound } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { isAdminEmail } from "../../lib/adminAuth";
import { getAdminStatsData } from "../../lib/adminStats";

export default async function AdminPage() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  // Guest: no session at all - send to login, same pattern as
  // app/report/[id]/page.tsx.
  if (!user) {
    redirect("/auth/login?redirectTo=/admin");
  }

  // Logged in, but not on the admin allowlist: deny without confirming
  // that an admin panel exists at this URL.
  if (!isAdminEmail(user.email)) {
    notFound();
  }

  // Data is only ever queried after both checks above have passed.
  const stats = await getAdminStatsData().catch(() => null);

  if (!stats) {
    return (
      <main className="al-page min-h-screen px-6 py-24">
        <div className="al-container">
          <h1 className="al-heading-lg">Admin Dashboard</h1>
          <p className="mt-4 text-red-700">Could not load stats.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="al-page min-h-screen px-6 py-24">
      <div className="al-container-wide">
        <p className="al-kicker mb-5">ArcheLoop Admin</p>

        <h1 className="al-heading-xl">Founder Dashboard</h1>

        <p className="al-text-lg mb-12">
          Live overview of launch reports, feedback, waitlist growth, and early user signals.
        </p>

        <div className="al-premium-card mb-8 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="al-kicker">Launch Progress</p>

              <h2 className="mt-3 text-3xl font-bold">
                {stats.reportsGenerated} / 50 Reports Claimed
              </h2>

              <p className="al-text mt-2">
                {stats.foundingRemaining} launch spots remaining.
              </p>
            </div>

            <div className="text-4xl font-bold text-[var(--al-accent)]">
              {Math.min(Math.round((stats.reportsGenerated / 50) * 100), 100)}%
            </div>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-[var(--al-surface-deep)]">
            <div
              className="h-full rounded-full bg-[var(--al-accent)]"
              style={{
                width: `${Math.min((stats.reportsGenerated / 50) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          <StatCard label="Reports" value={stats.reportsGenerated} />
          <StatCard label="Feedback" value={stats.feedbackReceived} />
          <StatCard label="Waitlist" value={stats.waitlistSignups} />
          <StatCard label="Launch Spots" value={stats.foundingRemaining} />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            label="Avg Accuracy"
            value={stats.averageAccuracy ? `${stats.averageAccuracy}/10` : "—"}
          />
          <StatCard label="Recommend Yes" value={stats.recommendYes} />
          <StatCard label="Testimonial Yes" value={stats.testimonialYes} />
        </div>

        <div className="al-card mt-8 p-8">
          <h2 className="text-3xl font-bold">Top Primary Loops</h2>

          {stats.topLoops.length > 0 ? (
            <div className="mt-6 space-y-4">
              {stats.topLoops.map((item: any) => (
                <div
                  key={item.loop}
                  className="al-soft-card flex items-center justify-between p-4"
                >
                  <span className="text-[var(--al-text-soft)]">{item.loop}</span>
                  <span className="font-semibold text-[var(--al-accent)]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="al-muted mt-6">No report data yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="al-card p-6">
      <p className="al-kicker">{label}</p>
      <p className="mt-4 text-4xl font-bold text-[var(--al-accent)]">
        {value}
      </p>
    </div>
  );
}
