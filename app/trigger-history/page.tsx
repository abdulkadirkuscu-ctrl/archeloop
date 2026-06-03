"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Activation = {
  id: string;
  createdAt: string;
  primaryLoop: string;
  secondaryLoop?: string;
  confidence: number;
  archetype: string;
  journey: string;
  integratedIdentity: string;
  trigger: string;
  person: string;
  environment: string;
  thought: string;
};

export default function TriggerHistoryPage() {
  const [activations, setActivations] = useState<Activation[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("archeloopActivations") || "[]"
    );

    setActivations(saved);
  }, []);

  function clearHistory() {
    localStorage.removeItem("archeloopActivations");
    setActivations([]);
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-8">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Trigger History
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">
              Your Saved Activations
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
              Review the loops, triggers, people, environments, and thought
              patterns that have activated over time.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/triggered-intelligence"
                className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-2 text-sm text-yellow-200 transition hover:border-yellow-300/60"
              >
                Log New Activation
              </Link>

              <Link
                href="/progress-dashboard"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-5 py-2 text-sm text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
              >
                View Progress Dashboard
              </Link>

              {activations.length > 0 && (
                <button
                  type="button"
                  onClick={clearHistory}
                  className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-2 text-sm text-red-200 transition hover:border-red-300/70"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>

          {activations.length === 0 ? (
            <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
              <p className="text-stone-300">
                No activations saved yet. Go to Triggered Pro™ and save your
                first activation.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {activations.map((activation) => (
                <article
                  key={activation.id}
                  className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm text-yellow-300/60">
                        {new Date(activation.createdAt).toLocaleString()}
                      </p>

                      <h2 className="mt-3 text-3xl font-bold text-yellow-300">
                        {activation.primaryLoop}
                      </h2>

                      <p className="mt-2 text-stone-300">
                        {activation.archetype} · Loop Match{" "}
                        {activation.confidence}%
                      </p>
                    </div>

                    <div className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200">
                      {activation.journey}
                    </div>
                  </div>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <Info label="Trigger" value={activation.trigger} />
                    <Info label="Person" value={activation.person} />
                    <Info label="Environment" value={activation.environment} />
                    <Info label="Thought" value={activation.thought} />
                    <Info
                      label="Integrated State"
                      value={activation.integratedIdentity}
                    />
                    <Info
                      label="Secondary Loop"
                      value={activation.secondaryLoop || "—"}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4">
      <p className="text-sm uppercase tracking-[0.18em] text-yellow-300/60">
        {label}
      </p>

      <p className="mt-2 text-stone-100">{value}</p>
    </div>
  );
}