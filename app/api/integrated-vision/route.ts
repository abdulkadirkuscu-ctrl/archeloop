import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.journeySlug || !body.visionText) {
      return NextResponse.json(
        { error: "Journey and vision text are required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("archeloop_integrated_visions")
      .insert({
        email: body.email || null,
        journey_slug: body.journeySlug,
        vision_text: body.visionText,
      });

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