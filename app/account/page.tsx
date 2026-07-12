import Link from "next/link";
import { cookies } from "next/headers";

import PageShell from "../components/PageShell";
import AccountAuthStatus from "../../components/AccountAuthStatus";
import CardTitle from "../../components/ui/CardTitle";
import Hero from "../../components/ui/Hero";
import Kicker from "../../components/ui/Kicker";
import PageIntro from "../../components/ui/PageIntro";
import PageTitle from "../../components/ui/PageTitle";

import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { supabaseServer } from "../../lib/supabaseServer";

type ReportSummary = {
  primaryLoop?: string;
  archetype?: string;
  journey?: string;
  integratedState?: string;
};

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  let latestReportId: string | null = null;
  let hasReportAccess = false;
  let hasIntegrationAccess = false;

  if (user) {
    const [{ data: latestReport }, { data: orders }] = await Promise.all([
      supabaseServer
        .from("archeloop_reports")
        .select("id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),

      supabaseServer
        .from("archeloop_orders")
        .select("product, status")
        .eq("user_id", user.id)
        .in("status", ["paid", "private_access", "founding_access"]),
    ]);

    latestReportId = latestReport?.id ?? null;

    hasReportAccess =
      orders?.some(
        (order) =>
          order.product === "report" || order.product === "bundle"
      ) ?? false;

    hasIntegrationAccess =
      orders?.some(
        (order) =>
          order.product === "integration" || order.product === "bundle"
      ) ?? false;
  }

  const reportSummaryCookie =
    cookieStore.get("archeloop_report_summary")?.value;

  let reportSummary: ReportSummary | null = null;

  if (reportSummaryCookie) {
    try {
      reportSummary = JSON.parse(
        decodeURIComponent(reportSummaryCookie)
      ) as ReportSummary;
    } catch {
      reportSummary = null;
    }
  }

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container">
          <Hero>
            <Kicker>My Account</Kicker>

            <PageTitle>Your ArcheLoop home.</PageTitle>

            <PageIntro>
              Return to your report, continue your Integration Journey, log
              triggers, review your progress, and reconnect with your
              Integrated Self.
            </PageIntro>

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
          </Hero>
        </div>
      </section>

      <AccountAuthStatus />

      <section className="al-section-tight">
        <div className="al-container-wide space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="al-premium-card p-7">
              <Kicker>My Report</Kicker>

              {hasReportAccess && reportSummary && (
                <div className="mt-5 grid gap-3 text-sm">
                  <InfoCard
                    label="Primary Loop"
                    value={reportSummary.primaryLoop}
                  />

                  <InfoCard
                    label="Archetype"
                    value={reportSummary.archetype}
                  />

                  <InfoCard
                    label="Current Journey"
                    value={reportSummary.journey}
                  />

                  <InfoCard
                    label="Integrated State"
                    value={reportSummary.integratedState}
                  />
                </div>
              )}

              <CardTitle
                level="h2"
                size="large"
                className="mt-5 text-[var(--al-accent)]"
              >
                ArcheLoop Report
              </CardTitle>

              <p className="al-text mt-4">
                Your report reveals your Shadow Loop, archetype, nervous system
                pattern, Integrated Self, and recommended Integration Journey.
              </p>

              <StatusBox
                label="Status"
                value={
                  hasReportAccess
                    ? "Report Access Active"
                    : "Report Not Active"
                }
              />

              <div className="mt-6 flex flex-wrap gap-3">
                {hasReportAccess && latestReportId && (
                  <Link
                    href={`/report/${latestReportId}`}
                    className="al-button-primary"
                  >
                    Open My Report
                  </Link>
                )}

                {!hasReportAccess && (
                  <Link href="/assessment" className="al-button-primary">
                    Start Find My Loop
                  </Link>
                )}

                {hasReportAccess && (
                  <Link href="/assessment" className="al-button-secondary">
                    Retake Find My Loop
                  </Link>
                )}
              </div>
            </div>

            <div className="al-card p-7">
              <Kicker>Integration Journey</Kicker>

              <CardTitle
                level="h2"
                size="large"
                className="mt-5 text-[var(--al-accent)]"
              >
                {hasIntegrationAccess
                  ? "Continue Integration"
                  : "Integration Not Active"}
              </CardTitle>

              <p className="al-text mt-4">
                ArcheLoop Integration helps you practise beyond the loop
                through Triggered Pro, Progress Dashboard, Monthly Review, and
                Integration Journeys.
              </p>

              <StatusBox
                label="Status"
                value={
                  hasIntegrationAccess
                    ? "Integration Access Active"
                    : "Requires Integration Access"
                }
              />

              <Link
                href={
                  hasIntegrationAccess
                    ? "/integration-home"
                    : "/checkout?product=integration"
                }
                className="al-button-primary mt-6"
              >
                {hasIntegrationAccess
                  ? "Open Integration Hub"
                  : "Start Integration"}
              </Link>
            </div>

            <div className="al-card p-7">
              <Kicker>My Integrated Vision</Kicker>

              <CardTitle
                level="h2"
                size="large"
                className="mt-5 text-[var(--al-accent)]"
              >
                {hasIntegrationAccess
                  ? "Your Future Self Statement"
                  : "Available With Integration"}
              </CardTitle>

              <p className="al-text mt-4">
                Write and return to the vision of how your Integrated Self
                thinks, responds, chooses, relates, and acts in real life.
              </p>

              <StatusBox
                label="Available Inside"
                value="Full Integration Journey"
              />

              <Link
                href={
                  hasIntegrationAccess
                    ? "/integration"
                    : "/checkout?product=integration"
                }
                className="al-button-secondary mt-6"
              >
                {hasIntegrationAccess
                  ? "Open Journeys"
                  : "Start Integration"}
              </Link>
            </div>
          </div>

          <div className="al-premium-card p-8">
            <Kicker>Quick Actions</Kicker>

            <CardTitle level="h2" size="large" className="mt-5">
              Continue where you are.
            </CardTitle>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <QuickAction href="/assessment" label="Find My Loop" />

              {hasReportAccess && latestReportId && (
                <QuickAction
                  href={`/report/${latestReportId}`}
                  label="My Report"
                />
              )}

              {hasIntegrationAccess && (
                <>
                  <QuickAction
                    href="/integration-home"
                    label="Integration Hub"
                  />

                  <QuickAction
                    href="/triggered-intelligence"
                    label="Triggered Pro"
                  />

                  <QuickAction
                    href="/progress-dashboard"
                    label="Progress Dashboard"
                  />

                  <QuickAction
                    href="/monthly-review"
                    label="Monthly Review"
                  />
                </>
              )}

              {!hasIntegrationAccess && (
                <QuickAction
                  href="/checkout?product=integration"
                  label="Start Integration"
                />
              )}
            </div>
          </div>

          <div className="al-card p-8 text-center">
            <Kicker>Your ArcheLoop Journey</Kicker>

            <CardTitle
              level="h2"
              size="large"
              className="mt-5 text-[var(--al-accent)]"
            >
              {hasReportAccess && hasIntegrationAccess
                ? "Full ArcheLoop Access Active"
                : hasReportAccess
                  ? "Report Access Active"
                  : "Begin Your Journey"}
            </CardTitle>

            <p className="al-text mx-auto mt-4 max-w-3xl">
              {hasReportAccess && hasIntegrationAccess
                ? "You have access to the full ArcheLoop experience. Continue logging triggers, reviewing your dashboard, and following your Integration Journey."
                : hasReportAccess
                  ? "You have report access. The next step is ArcheLoop Integration so you can practise the pattern in real life."
                  : "Start with Find My Loop to discover your Shadow Loop and receive your personalised ArcheLoop Report."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {hasIntegrationAccess ? (
                <Link
                  href="/integration-home"
                  className="al-button-primary"
                >
                  Continue Integration
                </Link>
              ) : hasReportAccess ? (
                <Link
                  href="/checkout?product=integration"
                  className="al-button-primary"
                >
                  Add Integration
                </Link>
              ) : (
                <Link href="/assessment" className="al-button-primary">
                  Start Find My Loop
                </Link>
              )}

              {!hasReportAccess && (
                <Link
                  href="/checkout?product=bundle"
                  className="al-button-secondary"
                >
                  Choose Report + Integration
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AccessCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="al-soft-card p-5">
      <p className="al-muted text-sm">{label}</p>

      <p className="mt-2 font-semibold text-[var(--al-accent)]">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="al-soft-card p-4">
      <p className="al-muted">{label}</p>

      <p className="mt-1 font-semibold text-[var(--al-accent)]">
        {value || "Not available"}
      </p>
    </div>
  );
}

function StatusBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="al-soft-card mt-6 p-4">
      <p className="al-muted text-sm">{label}</p>

      <p className="mt-1 font-semibold text-[var(--al-text)]">
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="al-soft-card flex min-h-24 items-center justify-center p-5 text-center font-semibold text-[var(--al-accent)] transition hover:border-[var(--al-accent)]"
    >
      {label}
    </Link>
  );
}