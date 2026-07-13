import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";

const DUPLICATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.reportData) {
      return NextResponse.json(
        { error: "Report data is required" },
        { status: 400 }
      );
    }

    const supabaseAuth = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to save this report." },
        { status: 401 }
      );
    }

    // Best-effort duplicate guard: no schema-level idempotency key exists,
    // so this compares deterministic, content-derived fields (primaryLoop +
    // the full 12-loop landscape) on the user's most recent report, bounded
    // to a short recent window. It cannot fully close a race between two
    // near-simultaneous requests, but it catches double-clicks and resume
    // replays without requiring a schema change.
    const { data: recentReport } = await supabaseServer
      .from("archeloop_reports")
      .select("id, report_data, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentReport?.report_data) {
      const isSameContent =
        recentReport.report_data.primaryLoop === body.reportData.primaryLoop &&
        JSON.stringify(recentReport.report_data.loopLandscape) ===
          JSON.stringify(body.reportData.loopLandscape);

      const age = Date.now() - new Date(recentReport.created_at).getTime();

      if (
        isSameContent &&
        Number.isFinite(age) &&
        age >= 0 &&
        age < DUPLICATE_WINDOW_MS
      ) {
        return NextResponse.json({
          success: true,
          reportId: recentReport.id,
        });
      }
    }

    const { data, error } = await supabaseServer
      .from("archeloop_reports")
      .insert({
        report_data: body.reportData,
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reportId: data.id,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}