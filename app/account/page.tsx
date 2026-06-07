import Link from "next/link";
import { cookies } from "next/headers";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default async function AccountPage() {
  const cookieStore = await cookies();

  const hasReportAccess =
    cookieStore.get("archeloop_report_access")?.value === "true";

  const hasIntegrationAccess =
    cookieStore.get("archeloop_integration_access")?.value === "true";

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
            Access your report, continue Find My Loop™, open ArcheLoop
            Integration™, log triggers, view progress, and return to your
            Integration Journey™.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left md:grid-cols-2">
            <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
              <p className="text-sm text-stone-400">Report Access</p>
              <p className="mt-2 font-semibold text-yellow-300">
                {hasReportAccess ? "Active" : "Not active"}
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
              <p className="text-sm text-stone-400">Integration Access</p>
              <p className="mt-2 font-semibold text-yellow-300">
                {hasIntegrationAccess ? "Active" : "Not active"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-7">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                My Report™
              </p>


{reportSummary && (
  <div className="mt-5 grid gap-3 text-sm text-stone-300">
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-stone-500">Primary Loop</p>
      <p className="mt-1 font-semibold text-yellow-300">
        {reportSummary.primaryLoop}
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-stone-500">Archetype</p>
      <p className="mt-1 font-semibold text-yellow-300">
        {reportSummary.archetype}
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-stone-500">Current Journey</p>
      <p className="mt-1 font-semibold text-yellow-300">
        {reportSummary.journey}
      </p>
    </div>

    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-stone-500">Integrated State</p>
      <p className="mt-1 font-semibold text-yellow-300">
        {reportSummary.integratedState}
      </p>
    </div>
  </div>
)}

              <h2 className="mt-4 text-3xl font-bold text-yellow-300">
                Your ArcheLoop Report™
              </h2>

              <p className="mt-4 leading-relaxed text-stone-300">
                Your report reveals your Shadow Loop™, archetype, nervous system
                pattern, Integrated Self™, and recommended Integration Journey™.
              </p>

              <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
                <p className="text-sm text-stone-400">Status</p>
                <p className="mt-1 font-semibold text-stone-100">
                  {hasReportAccess ? "Report Access Active" : "Report Not Active"}
                </p>
              </div>

              <Link
                href={hasReportAccess ? "/assessment" : "/checkout"}
                className="mt-6 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
              >
                {hasReportAccess ? "Open Find My Loop™" : "Unlock Report™"}
              </Link>
            </div>

            <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                Current Journey™
              </p>

              <h2 className="mt-4 text-3xl font-bold text-yellow-300">
                Integration Journey™
              </h2>

              <p className="mt-4 leading-relaxed text-stone-300">
                Your current pathway helps you move from Shadow Loop™ activation
                toward your Integrated Self™ through awareness, interruption,
                and embodiment.
              </p>

              <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
                <p className="text-sm text-stone-400">Recommended Flow</p>
                <p className="mt-1 font-semibold text-stone-100">
                  Report → Integration Hub → Journey
                </p>
              </div>

              <Link
                href={hasIntegrationAccess ? "/integration-home" : "/checkout"}
                className="mt-6 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
              >
                {hasIntegrationAccess ? "Continue Journey™" : "Unlock Integration™"}
              </Link>
            </div>

            <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                My Integrated Vision™
              </p>

              <h2 className="mt-4 text-3xl font-bold text-yellow-300">
                Your Future Self Statement
              </h2>

              <p className="mt-4 leading-relaxed text-stone-300">
                Write and return to the vision of how your Integrated Self™
                thinks, responds, chooses, relates, and acts in real life.
              </p>

              <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
                <p className="text-sm text-stone-400">Available Inside</p>
                <p className="mt-1 font-semibold text-stone-100">
                  Full Integration Journey™
                </p>
              </div>

              <Link
                href={hasIntegrationAccess ? "/integration" : "/checkout"}
                className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                {hasIntegrationAccess ? "Open Journeys™" : "Unlock Integration™"}
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

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <Link
                href="/assessment"
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Find My Loop™
              </Link>

              <Link
                href="/integration-home"
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Integration Hub™
              </Link>

              <Link
                href="/triggered-intelligence"
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Triggered Pro™
              </Link>

              <Link
                href="/progress-dashboard"
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Progress Dashboard™
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Your ArcheLoop Journey™
            </p>

            <h2 className="mt-4 text-3xl font-bold text-yellow-300">
              {hasReportAccess && hasIntegrationAccess
                ? "Full Access Active"
                : hasReportAccess
                ? "Report Active"
                : "Begin Your Journey"}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-stone-300">
              {hasReportAccess && hasIntegrationAccess
                ? "You have unlocked the full ArcheLoop experience. Continue logging activations, reviewing your dashboard, and following your Integration Journey™."
                : hasReportAccess
                ? "You have report access. The next step is ArcheLoop Integration™ so you can practise the pattern in real life."
                : "Start with Find My Loop™ to discover your Shadow Loop™ and unlock your personalised ArcheLoop Report™."}
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
                  href="/checkout"
                  className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Upgrade To Integration™
                </Link>
              ) : (
                <Link
                  href="/assessment"
                  className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
                >
                  Start Find My Loop™
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