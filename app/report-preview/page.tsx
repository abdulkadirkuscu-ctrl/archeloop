"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function safeJsonParse(value: string | null) {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function ReportPreviewContent() {
  const searchParams = useSearchParams();
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedLoopName = searchParams.get("loop") || "";
  const integratedScores = safeJsonParse(searchParams.get("scores"));
  const loopLandscape = safeJsonParse(searchParams.get("loops"));

  const hasFoundingAccess =
    accessCode.trim().toUpperCase() === "FOUNDING50";

  async function unlockReport() {
    if (!hasFoundingAccess || !selectedLoopName) return;

    setLoading(true);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportData: {
            primaryLoop: selectedLoopName,
            integratedScores,
            loopLandscape,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not create report.");
        setLoading(false);
        return;
      }

      window.location.href = `/report/${data.reportId}`;
    } catch {
      alert("Something went wrong while creating your report.");
      setLoading(false);
    }
  }

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
          Find My Loop™ Complete
        </p>

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          Your ArcheLoop Report™
          <br />
          is ready.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
          Your 60-question assessment has been analysed. We identified your
          Shadow Loop™, archetypal pattern, nervous system pattern, Integrated
          Self™, and recommended Integration Journey™.
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
        Understand the pattern or begin integration.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
        You can unlock your full ArcheLoop Report™ on its own, or begin with
        your report and first month of ArcheLoop Integration™ together.
      </p>
    </div>

    <div className="mt-12 grid gap-8 md:grid-cols-2">
      <div className="rounded-[2.5rem] border border-yellow-300/20 bg-[#0B1018] p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
          Product 1
        </p>

        <h3 className="mt-4 text-4xl font-bold text-yellow-300">
          ArcheLoop Report™
        </h3>

        <p className="mt-4 text-2xl font-semibold text-stone-100">£29</p>

        <p className="mt-2 text-sm text-stone-400">
          Free during Founding Access.
        </p>

        <p className="mt-5 leading-relaxed text-stone-300">
          Unlock your full personalised report and understand the deeper
          structure beneath your Shadow Loop™.
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
      </div>

      <div className="rounded-[2.5rem] border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
          Recommended
        </p>

        <h3 className="mt-4 text-4xl font-bold text-yellow-300">
          Find My Loop™ + First Month Integration™
        </h3>

        <p className="mt-4 text-2xl font-semibold text-stone-100">£39</p>

        <p className="mt-2 text-sm text-stone-400">
          Free during Founding Access. Future launch offer may be £19.99.
          After the first month, ArcheLoop Integration™ continues at the
          monthly subscription price.
        </p>

        <p className="mt-5 leading-relaxed text-stone-300">
          Includes your full ArcheLoop Report™ and first month of ArcheLoop
          Integration™ so you can understand the pattern and immediately begin
          practising transformation.
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
      </div>
    </div>

    <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-yellow-300/20 bg-black/40 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
        Founding Access
      </p>

      <p className="mt-4 text-stone-300">
        Enter your Founding Access code to unlock your full ArcheLoop Report™
        during the founding phase.
      </p>

      <input
        type="text"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
        placeholder="Enter access code"
        className="mt-6 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 text-white placeholder:text-gray-500 focus:border-yellow-300 focus:outline-none"
      />

      <button
        type="button"
        disabled={!hasFoundingAccess || loading}
        onClick={unlockReport}
        className={`mt-5 w-full rounded-full px-8 py-4 text-lg font-semibold transition ${
          hasFoundingAccess
            ? "bg-yellow-300 text-black hover:bg-yellow-200"
            : "cursor-not-allowed bg-zinc-800 text-gray-500"
        }`}
      >
        {loading
          ? "Creating Your Report..."
          : hasFoundingAccess
          ? "Unlock My ArcheLoop Report™"
          : "Enter Code To Unlock"}
      </button>

      <p className="mt-5 text-xs text-stone-600">
        No payment is required during Founding Access. Public pricing will
        begin later.
      </p>
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