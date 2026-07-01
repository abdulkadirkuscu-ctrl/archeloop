"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function ReportPreviewContent() {
  const searchParams = useSearchParams();
  const selectedLoopName = searchParams.get("loop") || "";

  if (!selectedLoopName) {
    return (
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />

        <section className="px-6 py-28 text-center">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-10">
            <h1 className="text-4xl font-bold">No report data found</h1>

            <p className="mt-5 text-stone-400">
              Please complete Find My Loop™ first to generate your ArcheLoop
              Report™.
            </p>

            <a
              href="/assessment"
              className="mt-8 inline-flex rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black hover:bg-yellow-200"
            >
              Start Find My Loop™
            </a>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Report Preview
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Your ArcheLoop Report™
            <br />
            is ready.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            Your assessment has identified your primary Shadow Loop™ and
            generated a personalised ArcheLoop profile. Continue to your full
            report to explore the deeper structure beneath your pattern.
          </p>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Primary Shadow Loop™
          </p>

          <h2 className="mt-5 text-4xl font-bold text-yellow-300 md:text-6xl">
            {selectedLoopName}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            This is a preview of your ArcheLoop Report. Your full report
explains why this pattern may have formed, what activates it, how it
affects your relationships, and the Integration Journey that helps
you move toward your Integrated Self.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Choose Your Next Step
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              Continue to your full report or begin integration.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Start with your complete personalised report, or choose the bundle
              if you want the report plus your first month of ArcheLoop
              Integration™.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                Personal Report
              </p>

              <h3 className="mt-4 text-4xl font-bold text-yellow-300">
                ArcheLoop Report™
              </h3>

              <p className="text-2xl font-semibold text-yellow-300">£19</p>

<p className="mt-2 text-sm text-stone-500">
  Regular price £29
</p>

              <p className="mt-5 leading-relaxed text-stone-300">
                Continue to your full personalised report and understand the
                deeper structure beneath your Shadow Loop™.
              </p>

              <div className="mt-7 grid gap-3 text-left">
                {[
                  "Primary & Secondary Shadow Loops™",
                  "Core belief and core fear",
                  "Nervous system pattern",
                  "Relationship dynamics",
                  "Body map interpretation",
                  "Integration blueprint",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <a
                href="/checkout?product=report"
                className="mt-8 block rounded-full bg-yellow-300 px-8 py-4 text-center text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Continue To Full Report
              </a>
            </div>

            <div className="rounded-[2.5rem] border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Most Complete Experience
              </p>

              <h3 className="mt-4 text-4xl font-bold text-yellow-300">
                Report + First Month Integration™
              </h3>

              <p className="text-2xl font-semibold text-yellow-300">£29</p>

<p className="mt-2 text-sm text-stone-500">
  Regular price £58
</p>

              <p className="mt-5 leading-relaxed text-stone-300">
                Everything in the ArcheLoop Report, plus your first month of
ArcheLoop Integration to help you recognise patterns, track
triggers, and build lasting change.
              </p>

              <div className="mt-7 grid gap-3 text-left">
                {[
                  "Full ArcheLoop Report™",
                  "First month ArcheLoop Integration™",
                  "Triggered Pro™",
                  "Progress Dashboard™",
                  "Integration Journeys™",
                  "My Integrated Vision™",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <a
                href="/checkout?product=bundle"
                className="mt-8 block rounded-full bg-yellow-300 px-8 py-4 text-center text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Choose Report + Integration
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ReportPreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#030712] text-stone-100">
          <Nav />
          <section className="px-6 py-28 text-center">
            <p className="text-stone-400">Loading your ArcheLoop Report™...</p>
          </section>
          <Footer />
        </main>
      }
    >
      <ReportPreviewContent />
    </Suspense>
  );
}