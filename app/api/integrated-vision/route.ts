import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const journeySlug = searchParams.get("journeySlug");

  if (!journeySlug) {
    return NextResponse.json(
      { error: "Journey slug is required." },
      { status: 400 }
    );
  }

  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ visionText: "" });
  }

  const { data, error } = await supabaseServer
    .from("archeloop_integrated_visions")
    .select("vision_text")
    .eq("user_id", user.id)
    .eq("journey_slug", journeySlug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    visionText: data?.vision_text || "",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.journeySlug || !body.visionText) {
      return NextResponse.json(
        { error: "Journey and vision text are required." },
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
        { error: "You must be logged in to save your vision." },
        { status: 401 }
      );
    }

    const { error } = await supabaseServer
      .from("archeloop_integrated_visions")
      .upsert(
        {
          user_id: user.id,
          email: user.email || null,
          journey_slug: body.journeySlug,
          vision_text: body.visionText,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,journey_slug",
        }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabaseServer.from("archeloop_events").insert({
      event_name: "integrated_vision_saved",
      event_value: body.journeySlug,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}