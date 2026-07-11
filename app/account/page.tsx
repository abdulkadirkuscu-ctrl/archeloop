import Link from "next/link";
import { cookies } from "next/headers";
import PageShell from "../components/PageShell";
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
    <PageShell>
      <section className="al-section">
        <div className="al-container al-hero-card text-center">
          <p className="al-kicker">My Account</p>

          <h1 className="al-heading-xl">
            Your ArcheLoop™ home.
          </h1>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Return to your report, continue your Integration Journey™, log
            triggers, review your progress, and reconnect with your
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

      <section className="al-section-tight">
        <div className="al-container-wide space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="al-premium-card p-7">
              <p className="al-kicker">My Report™</p>

              {hasReportAccess && reportSummary && (
                <div className="mt-5 grid gap-3 text-sm">
                  <InfoCard label="Primary Loop" value={reportSummary.primaryLoop} />
                  <InfoCard label="Archetype" value={reportSummary.archetype} />
                  <InfoCard label="Current Journey" value={reportSummary.journey} />
                  <InfoCard label="Integrated State" value={reportSummary.integratedState} />
                </div>
              )}

              <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                ArcheLoop Report™
              </h2>

              <p className="al-text mt-4">
                Your report reveals your Shadow Loop™, archetype, nervous system pattern,
                Integrated Self™, and recommended Integration Journey™.
              </p>

              <StatusBox
                label="Status"
                value={hasReportAccess ? "Report Access Active" : "Report Not Active"}
              />

              <div className="mt-6 flex flex-wrap gap-3">
                {hasReportAccess && latestReportId && (
                  <Link href={`/report/${latestReportId}`} className="al-button-primary">
                    Open My Report™
                  </Link>
                )}

                {!hasReportAccess && (
                  <Link href="/assessment" className="al-button-primary">
                    Start Find My Loop™
                  </Link>
                )}

                {hasReportAccess && (
                  <Link href="/assessment" className="al-button-secondary">
                    Retake Find My Loop™
                  </Link>
                )}
              </div>
            </div>

            <div className="al-card p-7">
              <p className="al-kicker">Integration Journey™</p>

              <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                {hasIntegrationAccess ? "Continue Integration™" : "Integration Not Active"}
              </h2>

              <p className="al-text mt-4">
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
                className="al-button-primary mt-6"
              >
                {hasIntegrationAccess ? "Open Integration Hub™" : "Start Integration™"}
              </Link>
            </div>

            <div className="al-card p-7">
              <p className="al-kicker">My Integrated Vision™</p>

              <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                {hasIntegrationAccess ? "Your Future Self Statement" : "Available With Integration™"}
              </h2>

              <p className="al-text mt-4">
                Write and return to the vision of how your Integrated Self™ thinks,
                responds, chooses, relates, and acts in real life.
              </p>

              <StatusBox
                label="Available Inside"
                value="Full Integration Journey™"
              />

              <Link
                href={hasIntegrationAccess ? "/integration" : "/checkout?product=integration"}
                className="al-button-secondary mt-6"
              >
                {hasIntegrationAccess ? "Open Journeys™" : "Start Integration™"}
              </Link>
            </div>
          </div>

          <div className="al-premium-card p-8">
            <p className="al-kicker">Quick Actions</p>

            <h2 className="mt-4 text-3xl font-bold">
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

          <div className="al-card p-8 text-center">
            <p className="al-kicker">Your ArcheLoop Journey™</p>

            <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
              {hasReportAccess && hasIntegrationAccess
                ? "Full ArcheLoop Access Active"
                : hasReportAccess
                ? "Report Access Active"
                : "Begin Your Journey"}
            </h2>

            <p className="al-text mx-auto mt-4 max-w-3xl">
              {hasReportAccess && hasIntegrationAccess
                ? "You have access to the full ArcheLoop experience. Continue logging triggers, reviewing your dashboard, and following your Integration Journey™."
                : hasReportAccess
                ? "You have report access. The next step is ArcheLoop Integration™ so you can practise the pattern in real life."
                : "Start with Find My Loop™ to discover your Shadow Loop™ and receive your personalised ArcheLoop Report™."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {hasIntegrationAccess ? (
                <Link href="/integration-home" className="al-button-primary">
                  Continue Integration™
                </Link>
              ) : hasReportAccess ? (
                <Link href="/checkout?product=integration" className="al-button-primary">
                  Add Integration™
                </Link>
              ) : (
                <Link href="/assessment" className="al-button-primary">
                  Start Find My Loop™
                </Link>
              )}

              {!hasReportAccess && (
                <Link href="/checkout?product=bundle" className="al-button-secondary">
                  Choose Report + Integration™
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AccessCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="al-soft-card p-5">
      <p className="al-muted text-sm">{label}</p>
      <p className="mt-2 font-semibold text-[var(--al-accent)]">{value}</p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="al-soft-card p-4">
      <p className="al-muted">{label}</p>
      <p className="mt-1 font-semibold text-[var(--al-accent)]">{value}</p>
    </div>
  );
}

function StatusBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="al-soft-card mt-6 p-4">
      <p className="al-muted text-sm">{label}</p>
      <p className="mt-1 font-semibold text-[var(--al-text)]">{value}</p>
    </div>
  );
}

function QuickAction({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="al-soft-card p-5 text-center font-semibold text-[var(--al-accent)] transition hover:border-[var(--al-accent)]"
    >
      {label}
    </Link>
  );
}