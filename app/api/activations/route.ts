import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.activationData) {
      return NextResponse.json(
        { error: "Activation data is required" },
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
        { error: "You must be logged in to save activations." },
        { status: 401 }
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
      return NextResponse.json(
        { error: "ArcheLoop Integration access is required to save activations." },
        { status: 403 }
      );
    }

    const { error } = await supabaseServer
      .from("archeloop_activations")
      .insert({
        user_id: user.id,
        activation_data: body.activationData,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}