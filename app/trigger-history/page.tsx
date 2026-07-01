import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { supabaseServer } from "../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";

export default async function TriggerHistoryPage() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />
        <section className="px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Trigger History™
            </p>
            <h1 className="mt-4 text-4xl font-bold">Log in to view your history.</h1>
            <p className="mt-4 text-stone-300">
              Your trigger history is saved to your ArcheLoop account.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/auth/login" className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black">
                Log In
              </Link>
              <Link href="/auth/signup" className="rounded-full border border-yellow-300/20 px-8 py-4 font-semibold text-yellow-200">
                Create Account
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Trigger History™
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Integration access is required.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            Trigger History™ is part of ArcheLoop Integration™. It lets you
            review saved triggers, active Shadow Loops™, Integration Check-Ins™,
            and the patterns you are learning to interrupt.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/checkout?product=integration"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start Integration™
            </Link>

            <Link
              href="/checkout?product=bundle"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
            >
              Choose Report + Integration™
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

  const { data: rows } = await supabaseServer
    .from("archeloop_activations")
    .select("id, created_at, activation_data")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activations = rows || [];

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Trigger History™
          </p>

          <h1 className="mt-5 text-5xl font-bold">Your saved activations</h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-300">
           Review the moments you logged, the Shadow Loops™ that appeared, and the patterns you are learning to interrupt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/triggered-intelligence"
              className="rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
            >
              Log New Activation
            </Link>

            <Link
              href="/progress-dashboard"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
            >
              View Progress Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          {activations.length === 0 ? (
            <div className="rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-10 text-center">
              <h2 className="text-3xl font-bold text-yellow-300">
                No activations saved yet.
              </h2>
              <p className="mt-4 text-stone-300">
                Use Triggered Pro™ to log your first activation.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {activations.map((row: any) => {
                const activation = row.activation_data || {};

                return (
                  <div
                    key={row.id}
                    className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-stone-500">
                          {new Date(row.created_at).toLocaleString()}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-yellow-300">
                          {activation.primaryLoop || "Unknown Loop"}
                        </h2>

                        <p className="mt-2 text-stone-300">
                          {activation.trigger || "Unknown trigger"} ·{" "}
                          {activation.person || "Unknown person"} ·{" "}
                          {activation.environment || "Unknown environment"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-yellow-300/10 bg-black/30 px-5 py-3 text-right">
                        <p className="text-sm text-stone-500">Loop Match</p>
                        <p className="text-xl font-bold text-yellow-300">
                          {activation.confidence || 0}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-4">
                      <MiniStat label="Archetype" value={activation.archetype} />
                      <MiniStat label="Journey" value={activation.journey} />
                      <MiniStat label="Response" value={activation.responseStyle} />
                      <MiniStat label="Body Zone" value={activation.bodyZone} />
                    </div>

                    {activation.loopBreakLevel && (
                      <div className="mt-5 rounded-2xl border border-yellow-300/10 bg-yellow-300/5 p-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/60">
                          Integration Check-In™
                        </p>
                        <p className="mt-2 text-stone-200">
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

      <Footer />
    </main>
  );
}

function MiniStat({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-yellow-300/50">
        {label}
      </p>
      <p className="mt-2 font-semibold text-stone-100">{value || "—"}</p>
    </div>
  );
}