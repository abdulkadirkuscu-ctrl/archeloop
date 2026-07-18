import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";
import { hasIntegrationAccess } from "../../../lib/entitlements";
import { stripTrademark } from "../../../lib/text";
import FullReport from "../../../components/FullReport";
import PageShell from "../../components/PageShell";

export default async function SavedReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    redirect(`/auth/login?redirectTo=${encodeURIComponent(`/report/${id}`)}`);
  }

  const { data: report, error } = await supabaseServer
    .from("archeloop_reports")
    .select("report_data, user_id")
    .eq("id", id)
    .single();

  if (error || !report?.report_data) {
    notFound();
  }

  if (report.user_id !== user.id) {
    notFound();
  }

  const { data: orders } = await supabaseServer
    .from("archeloop_orders")
    .select("product, status")
    .eq("user_id", user.id)
    .in("status", ["paid", "private_access", "founding_access"]);

  const hasReportAccess =
    orders?.some(
      (order) => order.product === "report" || order.product === "bundle"
    ) ?? false;

  if (!hasReportAccess) {
    const primaryLoop = stripTrademark(report.report_data?.primaryLoop) || null;

    return (
      <PageShell>
        <section className="al-section">
          <div className="al-container max-w-3xl text-center">
            <p className="al-kicker">Your ArcheLoop Report</p>

            <h1 className="al-heading-xl">
              {primaryLoop ? primaryLoop : "Your report"} is ready.
            </h1>

            <p className="al-text-lg mx-auto mt-6 max-w-2xl">
              This is a preview of your ArcheLoop Report. Your full report
              explores why this pattern developed, what activates it, how it
              influences your relationships and nervous system, and how to
              move toward your Integrated Self.
            </p>
          </div>
        </section>

        <section className="al-section-tight">
          <div className="al-container-wide">
            <div className="mt-4 grid gap-8 md:grid-cols-2">
              <div className="al-card p-8">
                <p className="text-sm uppercase tracking-[0.3em] al-kicker">
                  Personal Report
                </p>

                <h3 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                  Find My Loop Report
                </h3>

                <p className="text-2xl font-semibold text-[var(--al-accent)]">
                  £19
                </p>

                <p className="al-text mt-5 leading-relaxed">
                  Unlock your full personalised report: primary and secondary
                  Shadow Loops, nervous system pattern, relational dynamics,
                  body map interpretation, and Integration blueprint.
                </p>

                <Link
                  href="/checkout?product=report"
                  className="al-button-secondary mt-8 w-full"
                >
                  Find My Loop Report — £19
                </Link>
              </div>

              <div className="al-premium-card p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--al-accent)]">
                  Recommended · Complete Path
                </p>

                <h3 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                  Report + Integration
                </h3>

                <p className="text-2xl font-semibold text-[var(--al-accent)]">
                  £29
                </p>

                <p className="al-text mt-5 leading-relaxed">
                  Everything in the full report, plus your first month of
                  ArcheLoop Integration — Triggered Pro, Progress Dashboard,
                  Integration Journeys, and My Integrated Vision.
                </p>

                <Link
                  href="/checkout?product=bundle"
                  className="al-button-primary mt-8 w-full"
                >
                  Report + Integration — £29
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  await supabaseServer.from("archeloop_events").insert({
    event_name: "report_viewed",
    event_value: report.report_data?.primaryLoop || null,
  });

  return (
    <FullReport
      reportData={report.report_data}
      hasIntegrationAccess={hasIntegrationAccess(orders)}
    />
  );
}
