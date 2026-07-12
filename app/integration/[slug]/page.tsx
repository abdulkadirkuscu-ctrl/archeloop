import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";
import PageShell from "../../components/PageShell";
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
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-10">
          <div className="al-hero-card">
            <Link
              href="/integration"
              className="text-sm text-[var(--al-accent)] transition hover:opacity-70"
            >
              ← Back to Integration
            </Link>

            <p className="al-kicker mt-8">ArcheLoop Integration</p>

            <p className="al-kicker mt-4">Understand • Interrupt • Integrate</p>

            <h1 className="al-heading-xl">{journey.path}</h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>{journey.loop}</Badge>
              <Badge>{journey.archetype}</Badge>
              <Badge>{journey.element}</Badge>
              <Badge>{journey.integratedState}</Badge>
            </div>

            <p className="al-text-lg mt-8 max-w-3xl">
              {journey.overview}
            </p>
          </div>

          {hasIntegrationAccess ? (
            <div className="space-y-10">
              <div className="al-premium-card p-10">
                <p className="al-kicker">Full Integration Journey</p>

                <h2 className="al-heading-lg">Your {journey.path}</h2>

                <p className="al-text-lg mt-6 max-w-3xl">
                  This journey helps you move from {journey.loop} toward{" "}
                  {journey.integratedState}  by recognising recurring patterns, 
                  interrupting automatic reactions, and developing a more integrated way of being.
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
                    <div key={title} className="al-soft-card p-5">
                      <p className="al-kicker">{title}</p>
                      <p className="al-text mt-3">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

<div className="al-card p-10">
  <p className="al-kicker">The Integration Journey</p>

  <h2 className="al-heading-lg">
    <span className="al-understand-word">Understand</span>

    <span className="al-brand-divider"> • </span>

    <span className="al-interrupt-word">Interrupt</span>

    <span className="al-brand-divider"> • </span>

    <span className="al-integrate-word">Integrate</span>
  </h2>

  <div className="mt-10 space-y-8">
    {journey.stages.map((stage) => (
                    <div key={stage.title} className="al-soft-card p-7">
                      <h3 className="text-3xl font-bold text-[var(--al-accent)]">
                        {stage.title}
                      </h3>

                      <p className="al-text mt-4">
                        <span className="font-semibold text-[var(--al-text)]">
                          Objective:
                        </span>{" "}
                        {stage.objective}
                      </p>

                      <p className="al-text mt-4">
                        <span className="font-semibold text-[var(--al-text)]">
                          Realisation:
                        </span>{" "}
                        {stage.realisation}
                      </p>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="font-semibold text-[var(--al-text)]">
                            Practices
                          </p>
                          <div className="al-text mt-3 space-y-2">
                            {stage.practices.map((practice) => (
                              <p key={practice}>✓ {practice}</p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold text-[var(--al-text)]">
                            Reflection Prompts
                          </p>
                          <div className="al-text mt-3 space-y-2">
                            {stage.prompts.map((prompt) => (
                              <p key={prompt}>→ {prompt}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="al-card mt-6 p-5">
                        <p className="al-kicker">Success Marker</p>
                        <p className="al-text mt-3">{stage.successMarker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="al-premium-card p-10">
                <p className="al-kicker">Meet Your Integrated Self</p>

                <h2 className="al-heading-lg">
                  Becoming {journey.integratedState}
                </h2>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  {journey.integratedSelf &&
                    Object.entries(journey.integratedSelf).map(
                      ([category, items]) => (
                        <div key={category} className="al-soft-card p-5">
                          <p className="al-kicker">{category}</p>

                          <div className="al-text mt-4 space-y-2">
                            {items.map((item) => (
                              <p key={item}>✓ {item}</p>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>

              <IntegratedVisionBox
                journeySlug={journey.slug}
                integratedState={journey.integratedState}
              />

              <div className="al-card p-10">
                <p className="al-kicker">Living From Your Integrated Self</p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {journey.integratedIdentity.map((item) => (
                    <div key={item} className="al-soft-card p-4">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="al-premium-card p-10 text-center">
                <p className="al-kicker">Your Integration Statement</p>

                <p className="mx-auto mt-6 max-w-3xl text-2xl leading-relaxed text-[var(--al-text)]">
                  “{journey.finalStatement}”
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/triggered-intelligence"
                    className="al-button-primary"
                  >
                    Log a Trigger
                  </Link>

                  <Link
                    href="/progress-dashboard"
                    className="al-button-secondary"
                  >
                    View Progress Dashboard
                  </Link>

                  <Link href="/integration" className="al-button-secondary">
                    Back to Integration
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="al-premium-card p-10 text-center">
              <p className="al-kicker">Integration Journey Preview</p>

              <h2 className="al-heading-lg">
                Continue your {journey.path}
              </h2>

              <p className="al-text-lg mx-auto mt-6 max-w-3xl">
                This preview introduces your Integration Journey. 
                Continue into ArcheLoop Integration to explore the complete path, 
                including practices, reflection prompts, your Integrated Self, and personal progress tracking.
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
                  "Meet Your Integrated Self",
                  "My Integrated Vision",
                  "Final integration statement",
                  "Triggered Pro & Progress Dashboard",
                ].map((item) => (
                  <div key={item} className="al-soft-card p-4">
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="al-soft-card mx-auto mt-10 max-w-2xl p-6">
                <p className="al-muted text-lg line-through">
                  £29/month
                </p>

                <p className="mt-1 text-3xl font-bold text-[var(--al-accent)]">
                  £14.99/month
                </p>

                <p className="al-text mt-3 text-sm">
                  Launch Offer
                  Includes full Integration Journeys, Triggered Pro, Progress Dashboard, 
                  My Integrated Vision, and personal integration tracking.
                </p>

                <p className="al-muted mt-4 text-sm">
                  Cancel anytime. Subscription renews monthly.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/checkout?product=integration"
                  className="al-button-primary"
                >
                  Start Integration
                </Link>

                <Link
                  href="/checkout?product=bundle"
                  className="al-button-secondary"
                >
                  Choose Report + Integration
                </Link>

                <Link href="/integration" className="al-button-secondary">
                  Back to Integration
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="al-badge">{children}</span>;
}