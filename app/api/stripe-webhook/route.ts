import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "../../../lib/supabaseServer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id || null;
    const product = session.metadata?.product || null;

    await supabaseServer.from("archeloop_orders").insert({
      user_id: userId,
      product,
      email: session.customer_email || null,
      amount_due: session.amount_total ? session.amount_total / 100 : null,
      status: "paid",
      stripe_session_id: session.id,
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      stripe_subscription_id:
        typeof session.subscription === "string" ? session.subscription : null,
      paid_at: new Date().toISOString(),
    });

    await supabaseServer.from("archeloop_events").insert({
      event_name: "stripe_checkout_completed",
      event_value: product,
    });
  }

  return NextResponse.json({ received: true });
}