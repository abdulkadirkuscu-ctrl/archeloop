import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabaseServer";

const FOUNDING_CODES = ["FOUNDING50", "FOUNDINGFREE"];

const productPrices: Record<string, number> = {
  report: 29,
  integration: 29,
  bundle: 39,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = body.product;
    const email = body.email || null;
    const accessCode = (body.accessCode || "").trim().toUpperCase();

    if (!product || !productPrices[product]) {
      return NextResponse.json(
        { error: "Valid product is required." },
        { status: 400 }
      );
    }

    if (!FOUNDING_CODES.includes(accessCode)) {
      return NextResponse.json(
        { error: "Enter a valid Founding Access code." },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from("archeloop_orders").insert({
      product,
      email,
      access_code: accessCode,
      amount_due: 0,
      status: "founding_access",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabaseServer.from("archeloop_events").insert({
      event_name: "checkout_completed",
      event_value: product,
    });

    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}