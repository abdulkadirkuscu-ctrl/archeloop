import Link from "next/link";
import { cookies } from "next/headers";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default async function MyArcheLoopPage() {
  const cookieStore = await cookies();

  const hasReportAccess =
    cookieStore.get("archeloop_report_access")?.value === "true";

  const hasIntegrationAccess =
    cookieStore.get("archeloop_integration_access")?.value === "true";

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
            Your personal ArcheLoop home.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            Return here to access your report, continue Find My Loop™, open
            ArcheLoop Integration™, log triggers, view progress, and follow your
            Integration Journey™.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
              Product 1
            </p>

            <h2 className="mt-4 text-3xl font-bold text-yellow-300">
              Find My Loop™
            </h2>

            <p className="mt-4 leading-relaxed text-stone-300">
              Complete the 60-question assessment and unlock your full
              ArcheLoop Report™.
            </p>

            <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
              <p className="text-sm text-stone-400">Status</p>
              <p className="mt-1 font-semibold text-stone-100">
                {hasReportAccess ? "Report Access Active" : "Not Purchased Yet"}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/assessment"
                className="rounded-full bg-yellow-300 px-6 py-3 text-center font-semibold text-black transition hover:bg-yellow-200"
              >
                Start / Retake Find My Loop™
              </Link>

              {!hasReportAccess && (
                <Link
                  href="/checkout"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                >
                  Unlock Report™
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Product 2
            </p>

            <h2 className="mt-4 text-3xl font-bold text-yellow-300">
              ArcheLoop Integration™
            </h2>

            <p className="mt-4 leading-relaxed text-stone-300">
              Use Triggered Pro™, Dashboard™, Integration Journeys™, and My
              Integrated Vision™ to practise transformation over time.
            </p>

            <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
              <p className="text-sm text-stone-400">Status</p>
              <p className="mt-1 font-semibold text-stone-100">
                {hasIntegrationAccess
                  ? "Integration Access Active"
                  : "Not Active Yet"}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {hasIntegrationAccess ? (
                <>
                  <Link
                    href="/integration-home"
                    className="rounded-full bg-yellow-300 px-6 py-3 text-center font-semibold text-black transition hover:bg-yellow-200"
                  >
                    Open Integration Hub™
                  </Link>

                  <Link
                    href="/triggered-intelligence"
                    className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                  >
                    Open Triggered Pro™
                  </Link>

                  <Link
                    href="/progress-dashboard"
                    className="rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 text-center font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                  >
                    View Progress Dashboard™
                  </Link>
                </>
              ) : (
                <Link
                  href="/checkout"
                  className="rounded-full bg-yellow-300 px-6 py-3 text-center font-semibold text-black transition hover:bg-yellow-200"
                >
                  Upgrade To Integration™
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
              Continue
            </p>

            <h2 className="mt-4 text-3xl font-bold text-yellow-300">
              Your Next Step
            </h2>

            <p className="mt-4 leading-relaxed text-stone-300">
              ArcheLoop works best in order: discover the loop, understand the
              report, then practise integration in real life.
            </p>

            <div className="mt-6 space-y-3 text-sm text-stone-300">
              <p>1. Complete Find My Loop™</p>
              <p>2. Unlock your ArcheLoop Report™</p>
              <p>3. Begin ArcheLoop Integration™</p>
              <p>4. Track triggers and follow your journey</p>
            </div>

            <Link
              href="/integration"
              className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
            >
              View Integration Preview™
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}