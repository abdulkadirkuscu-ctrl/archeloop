import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.accuracyScore) {
      return NextResponse.json(
        { error: "Accuracy score is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("archeloop_feedback")
      .insert({
        report_id: body.reportId || null,
        primary_loop: body.primaryLoop || null,
        accuracy_score: body.accuracyScore,
        most_accurate: body.mostAccurate || null,
        least_accurate: body.leastAccurate || null,
        recommend: body.recommend || null,
        email: body.email || null,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}