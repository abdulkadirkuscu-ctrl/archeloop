import Link from "next/link";
import PageShell from "../components/PageShell";
import { supabaseServer } from "../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { stripTrademark } from "../../lib/text";

export default async function TriggerHistoryPage() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return (
      <PageShell>
        <section className="al-section text-center">
          <div className="al-card mx-auto max-w-3xl p-10">
            <p className="al-kicker">Trigger History</p>

            <h1 className="al-heading-md">Log in to view your history.</h1>

            <p className="al-text mt-4">
              Your trigger history is saved to your ArcheLoop account.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/auth/login" className="al-button-primary">
                Log In
              </Link>

              <Link href="/auth/signup" className="al-button-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
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
    return (
      <PageShell>
        <section className="al-section text-center">
          <div className="al-premium-card mx-auto max-w-4xl p-10">
            <p className="al-kicker">Trigger History</p>

            <h1 className="al-heading-lg">
              Integration access is required.
            </h1>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Trigger History is part of ArcheLoop Integration. It lets you
              review saved triggers, active Shadow Loops, Integration Check-Ins,
              and the patterns you are learning to interrupt.
            </p>

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
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  const { data: rows } = await supabaseServer
    .from("archeloop_activations")
    .select("id, created_at, activation_data")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activations = rows || [];

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide">
          <p className="al-kicker">Trigger History</p>

          <h1 className="al-heading-xl">Your saved activations</h1>

          <p className="al-text-lg mt-5 max-w-3xl">
            Review the moments you logged, the Shadow Loops that appeared, and
            the patterns you are learning to interrupt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/triggered-intelligence"
              className="al-button-primary"
            >
              Log New Activation
            </Link>

            <Link
              href="/progress-dashboard"
              className="al-button-secondary"
            >
              View Progress Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-container-wide">
          {activations.length === 0 ? (
            <div className="al-card p-10 text-center">
              <h2 className="text-3xl font-bold text-[var(--al-accent)]">
                No activations saved yet.
              </h2>

              <p className="al-text mt-4">
                Use Triggered Pro to log your first activation.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {activations.map((row: any) => {
                const activation = row.activation_data || {};

                return (
                  <div key={row.id} className="al-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="al-muted text-sm">
                          {new Date(row.created_at).toLocaleString()}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[var(--al-accent)]">
                          {stripTrademark(activation.primaryLoop) || "Unknown Loop"}
                        </h2>

                        <p className="al-text mt-2">
                          {activation.trigger || "Unknown trigger"} ·{" "}
                          {activation.person || "Unknown person"} ·{" "}
                          {activation.environment || "Unknown environment"}
                        </p>
                      </div>

                      <div className="al-soft-card px-5 py-3 text-right">
                        <p className="al-muted text-sm">Loop Match</p>

                        <p className="text-xl font-bold text-[var(--al-accent)]">
                          {activation.confidence || 0}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-4">
                      <MiniStat label="Archetype" value={stripTrademark(activation.archetype)} />
                      <MiniStat label="Journey" value={stripTrademark(activation.journey)} />
                      <MiniStat
                        label="Response"
                        value={activation.responseStyle}
                      />
                      <MiniStat label="Body Zone" value={activation.bodyZone} />
                    </div>

                    {activation.loopBreakLevel && (
                      <div className="al-premium-card mt-5 p-4">
                        <p className="al-kicker">Integration Check-In</p>

                        <p className="mt-2 font-semibold">
                          {activation.loopBreakLevel}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function MiniStat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="al-soft-card p-4">
      <p className="al-kicker">{label}</p>
      <p className="mt-2 font-semibold">{value || "—"}</p>
    </div>
  );
}