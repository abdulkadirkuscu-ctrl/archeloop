async function getAdminStats() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/admin-stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function AdminPage() {
  const stats = await getAdminStats();

  if (!stats) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-4 text-red-400">Could not load stats.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm mb-5">
          ArcheLoop Admin
        </p>

        <h1 className="text-5xl font-bold mb-4">Founder Dashboard</h1>

        <p className="text-gray-400 mb-12">
          Live overview of founding reports, feedback, waitlist growth, and early user signals.
        </p>

<div className="mb-8 rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-6">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm">
        Founding Progress
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {stats.reportsGenerated} / 50 Reports Claimed
      </h2>

      <p className="mt-2 text-gray-400">
        {stats.foundingRemaining} founding spots remaining.
      </p>
    </div>

    <div className="text-4xl font-bold text-yellow-300">
      {Math.min(Math.round((stats.reportsGenerated / 50) * 100), 100)}%
    </div>
  </div>

  <div className="mt-6 h-4 overflow-hidden rounded-full bg-zinc-800">
    <div
      className="h-full rounded-full bg-yellow-300"
      style={{
        width: `${Math.min((stats.reportsGenerated / 50) * 100, 100)}%`,
      }}
    />
  </div>
</div>
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Reports
            </p>
            <p className="mt-4 text-4xl font-bold text-yellow-300">
              {stats.reportsGenerated}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Feedback
            </p>
            <p className="mt-4 text-4xl font-bold text-yellow-300">
              {stats.feedbackReceived}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Waitlist
            </p>
            <p className="mt-4 text-4xl font-bold text-yellow-300">
              {stats.waitlistSignups}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Remaining
            </p>
            <p className="mt-4 text-4xl font-bold text-yellow-300">
              {stats.foundingRemaining}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-[#0B1018] p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Avg Accuracy
            </p>
            <p className="mt-4 text-4xl font-bold">
              {stats.averageAccuracy ? `${stats.averageAccuracy}/10` : "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0B1018] p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Recommend Yes
            </p>
            <p className="mt-4 text-4xl font-bold">
              {stats.recommendYes}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#0B1018] p-6">
            <p className="text-gray-500 text-sm uppercase tracking-[0.25em]">
              Testimonial Yes
            </p>
            <p className="mt-4 text-4xl font-bold">
              {stats.testimonialYes}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-8">
          <h2 className="text-3xl font-bold mb-6">Top Primary Loops</h2>

          {stats.topLoops.length > 0 ? (
            <div className="space-y-4">
              {stats.topLoops.map((item: any) => (
                <div
                  key={item.loop}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  <span className="text-gray-200">{item.loop}</span>
                  <span className="text-yellow-300 font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No report data yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}