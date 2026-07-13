import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "../../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRIVATE_ACCESS_CODES = ["FOUNDING50"];

const products = {
  report: {
    name: "Find My Loop",
    amount: 1900,
    mode: "payment" as const,
  },
  integration: {
    name: "ArcheLoop Integration",
    amount: 1500,
    mode: "subscription" as const,
  },
  bundle: {
    name: "Report + First Month Integration",
    amount: 2900,
    mode: "payment" as const,
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = body.product as keyof typeof products;
    const email = body.email || null;
    const accessCode = (body.accessCode || "").trim().toUpperCase();

    if (!product || !products[product]) {
      return NextResponse.json(
        { error: "Valid product is required." },
        { status: 400 }
      );
    }

    let user = null;

    if (body.accessToken) {
      const {
        data: { user: tokenUser },
      } = await supabaseServer.auth.getUser(body.accessToken);

      user = tokenUser;
    }

    if (!user) {
      const supabaseAuth = await createSupabaseServerClient();

      const {
        data: { user: cookieUser },
      } = await supabaseAuth.auth.getUser();

      user = cookieUser;
    }

    if (!user) {
      return NextResponse.json(
        { error: "Please log in before checkout." },
        { status: 401 }
      );
    }

    if (PRIVATE_ACCESS_CODES.includes(accessCode)) {
      const { error } = await supabaseServer.from("archeloop_orders").insert({
        product,
        email: user.email || email,
        access_code: accessCode,
        amount_due: 0,
        status: "private_access",
        user_id: user.id,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        product,
        privateAccess: true,
      });
    }

    const selected = products[product];

    const session = await stripe.checkout.sessions.create({
      mode: selected.mode,
      customer_email: user.email || email || undefined,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: selected.name,
            },
            unit_amount: selected.amount,
            ...(selected.mode === "subscription"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?checkout=cancelled`,
      metadata: {
        user_id: user.id,
        product,
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}