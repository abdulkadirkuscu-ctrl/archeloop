// Admin dashboard data. Extracted from app/api/admin-stats/route.ts so both
// the API route and the /admin Server Component can call it directly -
// avoiding an internal HTTP round trip (a same-server fetch() from a Server
// Component does not forward the caller's cookies, which would otherwise
// make the route's own auth check impossible to satisfy from the page).
// Each caller performs its own independent authorization check
// (lib/adminAuth.ts) before calling this - this file has no auth check of
// its own, on purpose, since it is only ever invoked after one.
import { supabaseServer } from "./supabaseServer";
import { stripTrademark } from "./text";

export async function getAdminStatsData() {
  const { count: reportCount, error: reportError } = await supabaseServer
    .from("archeloop_reports")
    .select("*", { count: "exact", head: true });

  const { count: feedbackCount, error: feedbackError } = await supabaseServer
    .from("archeloop_feedback")
    .select("*", { count: "exact", head: true });

  const { count: waitlistCount, error: waitlistError } = await supabaseServer
    .from("archeloop_waitlist")
    .select("*", { count: "exact", head: true });

  if (reportError || feedbackError || waitlistError) {
    throw new Error("Could not load admin stats");
  }

  const { data: feedbackRows } = await supabaseServer
    .from("archeloop_feedback")
    .select("accuracy_score, recommend, testimonial_permission, primary_loop");

  const { data: reportRows } = await supabaseServer
    .from("archeloop_reports")
    .select("report_data");

  const accuracyScores =
    feedbackRows
      ?.map((row) => row.accuracy_score)
      .filter((score) => typeof score === "number") || [];

  const averageAccuracy =
    accuracyScores.length > 0
      ? Number(
          (
            accuracyScores.reduce((sum, score) => sum + score, 0) /
            accuracyScores.length
          ).toFixed(1)
        )
      : null;

  const recommendYes =
    feedbackRows?.filter((row) => row.recommend === "Yes").length || 0;

  const testimonialYes =
    feedbackRows?.filter((row) => row.testimonial_permission === "Yes")
      .length || 0;

  const loopCounts: Record<string, number> = {};

  reportRows?.forEach((row) => {
    const loop = stripTrademark(row.report_data?.primaryLoop);

    if (loop) {
      loopCounts[loop] = (loopCounts[loop] || 0) + 1;
    }
  });

  const topLoops = Object.entries(loopCounts)
    .map(([loop, count]) => ({ loop, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    reportsGenerated: reportCount || 0,
    feedbackReceived: feedbackCount || 0,
    waitlistSignups: waitlistCount || 0,
    averageAccuracy,
    recommendYes,
    testimonialYes,
    topLoops,
    foundingRemaining: Math.max(50 - (reportCount || 0), 0),
  };
}
