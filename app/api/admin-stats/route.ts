import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
import { stripTrademark } from "../../../lib/text";

export async function GET() {
  try {
    const { count: reportCount, error: reportError } = await supabaseServer
      .from("archeloop_reports")
      .select("*", { count: "exact", head: true });

    const { count: feedbackCount, error: feedbackError } = await supabaseServer
      .from("archeloop_feedback")
      .select("*", { count: "exact", head: true });

    const { count: waitlistCount, error: waitlistError } = await supabaseServer
      .from("archeloop_waitlist")
      .select("*", { count: "exact", head: true });

    const { data: feedbackRows } = await supabaseServer
      .from("archeloop_feedback")
      .select("accuracy_score, recommend, testimonial_permission, primary_loop");

    const { data: reportRows } = await supabaseServer
      .from("archeloop_reports")
      .select("report_data");

    if (reportError || feedbackError || waitlistError) {
      return NextResponse.json(
        { error: "Could not load admin stats" },
        { status: 500 }
      );
    }

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

    return NextResponse.json({
      reportsGenerated: reportCount || 0,
      feedbackReceived: feedbackCount || 0,
      waitlistSignups: waitlistCount || 0,
      averageAccuracy,
      recommendYes,
      testimonialYes,
      topLoops,
      foundingRemaining: Math.max(50 - (reportCount || 0), 0),
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected admin stats error" },
      { status: 500 }
    );
  }
}