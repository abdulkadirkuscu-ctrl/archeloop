import Link from "next/link";
import { cookies } from "next/headers";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AccountAuthStatus from "../../components/AccountAuthStatus";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { supabaseServer } from "../../lib/supabaseServer";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  let latestReportId: string | null = null;

  if (user) {
    const { data: latestReport } = await supabaseServer
      .from("archeloop_reports")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    latestReportId = latestReport?.id || null;
  }

  let hasReportAccess = false;
  let hasIntegrationAccess = false;

  if (user) {
    const { data: orders } = await supabaseServer
      .from("archeloop_orders")
      .select("product, status")
      .eq("user_id", user.id)
      .in("status", ["paid", "private_access", "founding_access"]);

    hasReportAccess =
      orders?.some(
        (order) => order.product === "report" || order.product === "bundle"
      ) || false;

    hasIntegrationAccess =
      orders?.some(
        (order) => order.product === "integration" || order.product === "bundle"
      ) || false;
  }

  const reportSummaryCookie = cookieStore.get("archeloop_report_summary")?.value;

  const reportSummary = reportSummaryCookie
    ? JSON.parse(decodeURIComponent(reportSummaryCookie))
    : null;

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            My Account
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Your ArcheLoop™ home.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            Return to your report, continue your Integration Journey™, log
            activations, review your progress, and reconnect with your
            Integrated Self™.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left md:grid-cols-2">
            <AccessCard
              label="Report Access"
              value={hasReportAccess ? "Active" : "Not active"}
            />

            <AccessCard
              label="Integration Access"
              value={hasIntegrationAccess ? "Active" : "Not active"}
            />
          </div>
        </div>
      </section>

      <AccountAuthStatus />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
         <div className="grid gap-6 lg:grid-cols-3">
  <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-7">
    <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
      My Report™
    </p>

    {hasReportAccess && reportSummary && (
      <div className="mt-5 grid gap-3 text-sm text-stone-300">
        <InfoCard label="Primary Loop" value={reportSummary.primaryLoop} />
        <InfoCard label="Archetype" value={reportSummary.archetype} />
        <InfoCard label="Current Journey" value={reportSummary.journey} />
        <InfoCard label="Integrated State" value={reportSummary.integratedState} />
      </div>
    )}

    <h2 className="mt-4 text-3xl font-bold text-yellow-300">
      ArcheLoop Report™
    </h2>

    <p className="mt-4 leading-relaxed text-stone-300">
      Your report reveals your Shadow Loop™, archetype, nervous system pattern,
      Integrated Self™, and recommended Integration Journey™.
    </p>

    <StatusBox
      label="Status"
      value={hasReportAccess ? "Report Access Active" : "Report Not Active"}
    />

    <div className="mt-6 flex flex-wrap gap-3">
      {hasReportAccess && latestReportId && (
        <Link
          href={`/report/${latestReportId}`}
          className="inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
        >
          Open My Report™
        </Link>
      )}

      {!hasReportAccess && (
        <Link
          href="/assessment"
          className="inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
        >
          Start Find My Loop™
        </Link>
      )}

      {hasReportAccess && (
        <Link
          href="/assessment"
          className="inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
        >
          Retake Find My Loop™
        </Link>
      )}
    </div>
  </div>

  <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
    <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
      Integration Journey™
    </p>

    <h2 className="mt-4 text-3xl font-bold text-yellow-300">
      {hasIntegrationAccess ? "Continue Integration™" : "Integration Not Active"}
    </h2>

    <p className="mt-4 leading-relaxed text-stone-300">
      ArcheLoop Integration™ helps you practise beyond the loop through
      Triggered Pro™, Progress Dashboard™, Monthly Review™, and Integration
      Journeys™.
    </p>

    <StatusBox
      label="Status"
      value={hasIntegrationAccess ? "Integration Access Active" : "Requires Integration Access"}
    />

    <Link
      href={hasIntegrationAccess ? "/integration-home" : "/checkout?product=integration"}
      className="mt-6 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
    >
      {hasIntegrationAccess ? "Open Integration Hub™" : "Start Integration™"}
    </Link>
  </div>

  <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
    <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
      My Integrated Vision™
    </p>

    <h2 className="mt-4 text-3xl font-bold text-yellow-300">
      {hasIntegrationAccess ? "Your Future Self Statement" : "Available With Integration™"}
    </h2>

    <p className="mt-4 leading-relaxed text-stone-300">
      Write and return to the vision of how your Integrated Self™ thinks,
      responds, chooses, relates, and acts in real life.
    </p>

    <StatusBox
      label="Available Inside"
      value="Full Integration Journey™"
    />

    <Link
      href={hasIntegrationAccess ? "/integration" : "/checkout?product=integration"}
      className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
    >
      {hasIntegrationAccess ? "Open Journeys™" : "Start Integration™"}
    </Link>
  </div>
</div>

          <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Quick Actions
            </p>

            <h2 className="mt-4 text-3xl font-bold text-stone-100">
              Continue where you are.
            </h2>

           <div className="mt-8 grid gap-4 md:grid-cols-5">
  <QuickAction href="/assessment" label="Find My Loop™" />

  {hasReportAccess && latestReportId && (
    <QuickAction href={`/report/${latestReportId}`} label="My Report™" />
  )}

  {hasIntegrationAccess && (
    <>
      <QuickAction href="/integration-home" label="Integration Hub™" />
      <QuickAction href="/triggered-intelligence" label="Triggered Pro™" />
      <QuickAction href="/progress-dashboard" label="Progress Dashboard™" />
      <QuickAction href="/monthly-review" label="Monthly Review™" />
    </>
  )}

  {!hasIntegrationAccess && (
    <QuickAction href="/checkout?product=integration" label="Start Integration™" />
  )}
</div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Your ArcheLoop Journey™
            </p>

            <h2 className="mt-4 text-3xl font-bold text-yellow-300">
              {hasReportAccess && hasIntegrationAccess
                ? "Premium Access Active"
                : hasReportAccess
                ? "Report Access Active"
                : "Begin Your Journey"}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-stone-300">
              {hasReportAccess && hasIntegrationAccess
                ? "You have access to the full ArcheLoop experience. Continue logging activations, reviewing your dashboard, and following your Integration Journey™."
                : hasReportAccess
                ? "You have report access. The next step is ArcheLoop Integration™ so you can practise the pattern in real life."
                : "Start with Find My Loop™ to discover your Shadow Loop™ and receive your personalised ArcheLoop Report™."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {hasIntegrationAccess ? (
                <Link
                  href="/integration-home"
                  className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Continue Integration™
                </Link>
              ) : hasReportAccess ? (
                <Link
                  href="/checkout?product=integration"
                  className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Add Integration™
                </Link>
              ) : (
                <Link
                  href="/assessment"
                  className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Start Find My Loop™
                </Link>
              )}

              {!hasReportAccess && (
                <Link
                  href="/checkout?product=bundle"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                >
                  Choose Report + Integration™
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function AccessCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-2 font-semibold text-yellow-300">{value}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-yellow-300">{value}</p>
    </div>
  );
}

function StatusBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-1 font-semibold text-stone-100">{value}</p>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
    >
      {label}
    </Link>
  );
}