import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { integrationJourneys } from "../../data/integrationJourneys";
import { supabaseServer } from "../../../lib/supabaseServer";
import IntegratedVisionBox from "../../components/IntegratedVisionBox";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function IntegrationJourneyPage({ params }: Props) {
  const { slug } = await params;

  const journey = integrationJourneys.find((item) => item.slug === slug);

  if (!journey) {
    notFound();
  }

  await supabaseServer.from("archeloop_events").insert({
    event_name: "journey_viewed",
    event_value: journey.slug,
  });

 const supabaseAuth = await createSupabaseServerClient();

const {
  data: { user },
} = await supabaseAuth.auth.getUser();

let hasIntegrationAccess = false;

if (user) {
  const { data: orders } = await supabaseServer
    .from("archeloop_orders")
    .select("product, status")
    .eq("user_id", user.id)
    .in("status", ["paid", "private_access", "founding_access"]);

  hasIntegrationAccess =
    orders?.some(
      (order) => order.product === "integration" || order.product === "bundle"
    ) || false;
}

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <Link
              href="/integration"
              className="text-sm text-yellow-300/70 hover:text-yellow-300"
            >
              ← Back to Integration
            </Link>

            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop Integration™
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              {journey.path}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>{journey.loop}</Badge>
              <Badge>{journey.archetype}</Badge>
              <Badge>{journey.element}</Badge>
              <Badge>{journey.integratedState}</Badge>
            </div>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              {journey.overview}
            </p>
          </div>

          {hasIntegrationAccess ? (
            <div className="space-y-10">
              <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                  Full Integration Journey™
                </p>

                <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                  Your full {journey.path}
                </h2>

                <p className="mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
                  Use this path to practise moving from {journey.loop} toward{" "}
                  {journey.integratedState}.
                </p>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {[
                    ["Core Belief", journey.coreBelief],
                    ["Core Fear", journey.coreFear],
                    ["Hidden Longing", journey.hiddenLonging],
                    ["Body Activation", journey.bodyActivation],
                    ["Primary State", journey.primaryState],
                    ["Suppression Pattern", journey.suppression],
                    ["Compensation Pattern", journey.compensation],
                    ["Inner Collision", journey.collision],
                  ].map(([title, text]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5"
                    >
                      <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                        {title}
                      </p>
                      <p className="mt-3 leading-relaxed text-stone-300">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                  The Three Stages
                </p>

                <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                  Awareness. Interruption. Embodiment.
                </h2>

                <div className="mt-10 space-y-8">
                  {journey.stages.map((stage) => (
                    <div
                      key={stage.title}
                      className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-7"
                    >
                      <h3 className="text-3xl font-bold text-yellow-300">
                        {stage.title}
                      </h3>

                      <p className="mt-4 text-stone-300">
                        <span className="font-semibold text-stone-100">
                          Objective:
                        </span>{" "}
                        {stage.objective}
                      </p>

                      <p className="mt-4 text-stone-300">
                        <span className="font-semibold text-stone-100">
                          Realisation:
                        </span>{" "}
                        {stage.realisation}
                      </p>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="font-semibold text-stone-100">
                            Practices
                          </p>
                          <div className="mt-3 space-y-2">
                            {stage.practices.map((practice) => (
                              <p key={practice} className="text-stone-300">
                                ✓ {practice}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold text-stone-100">
                            Reflection Prompts
                          </p>
                          <div className="mt-3 space-y-2">
                            {stage.prompts.map((prompt) => (
                              <p key={prompt} className="text-stone-300">
                                → {prompt}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-[#030712] p-5">
                        <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                          Success Marker
                        </p>
                        <p className="mt-3 text-stone-300">
                          {stage.successMarker}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                  Meet Your Integrated Self™
                </p>

                <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                  Becoming {journey.integratedState}
                </h2>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {journey.integratedSelf &&
                    Object.entries(journey.integratedSelf).map(
                      ([category, items]) => (
                        <div
                          key={category}
                          className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5"
                        >
                          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                            {category}
                          </p>

                          <div className="mt-4 space-y-2">
                            {items.map((item) => (
                              <p key={item} className="text-stone-300">
                                ✓ {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                  My Integrated Vision™
                </p>

                <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                  Write the vision of {journey.integratedState}.
                </h2>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
                  Use this space to describe how {journey.integratedState} would
                  look in your real life. What would change in how you speak,
                  respond, choose, relate, pause, create, protect, or express
                  yourself?
                </p>

                <IntegratedVisionBox
                  journeySlug={journey.slug}
                  integratedState={journey.integratedState}
                />
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/20 bg-black/40 p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                  Integrated Identity
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {journey.integratedIdentity.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                  Final Integration Statement
                </p>

                <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-stone-100">
                  “{journey.finalStatement}”
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/triggered-intelligence"
                    className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
                  >
                    Log Trigger In Triggered Pro™
                  </Link>

                  <Link
                    href="/progress-dashboard"
                    className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                  >
                    View Progress Dashboard™
                  </Link>

                  <Link
                    href="/integration"
                    className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                  >
                    Back to Integration
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.12)]">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
                Integration Journey Preview
              </p>

              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                Continue into the full {journey.path}
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
                This preview shows the direction of your path. The full
                Integration Journey™ is available inside ArcheLoop
                Integration™, where you can work with the complete structure,
                practices, prompts, and progress tools.
              </p>

              <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
                {[
                  "Loop structure",
                  "Core belief",
                  "Core fear",
                  "Hidden longing",
                  "Awareness stage",
                  "Interruption stage",
                  "Embodiment stage",
                  "Practices & reflection prompts",
                  "Meet Your Integrated Self™",
                  "My Integrated Vision™",
                  "Final integration statement",
                  "Triggered Pro™ & Progress Dashboard™",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-yellow-300/20 bg-black/30 p-6">
                <p className="text-lg text-stone-500 line-through">
                  £29/month
                </p>

                <p className="mt-1 text-3xl font-bold text-yellow-300">
                  £14.99/month
                </p>

                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  Launch price. Includes full Integration Journeys™, Triggered
                  Pro™, Progress Dashboard™, My Integrated Vision™, and personal
                  integration tracking.
                </p>

                <p className="mt-4 text-sm text-stone-500">
                  Cancel anytime. Subscription renews monthly.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/checkout?product=integration"
                  className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
                >
                  Start Integration™
                </Link>

                <Link
                  href="/checkout?product=bundle"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  Choose Report + Integration™
                </Link>

                <Link
                  href="/integration"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  Back to Integration
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200">
      {children}
    </span>
  );
}