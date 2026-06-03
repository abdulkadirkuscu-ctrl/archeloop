import { detectLoop } from "../data/intelligenceEngine";

export default function IntelligencePreviewPage() {
  const result = detectLoop({
    bodyActivation: ["chest tightness", "face heat"],
    emotions: ["ashamed", "invisible"],
    thoughts: ["I am not enough", "Nobody sees me"],
    responseStyle: "collapse",
    trigger: "criticism",
    person: "manager",
    environment: "work",
  });

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 px-6 py-16">
      <section className="max-w-3xl mx-auto space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-400">
            ArcheLoop Intelligence Engine V2™
          </p>

          <h1 className="mt-4 text-4xl font-semibold">
            Intelligence Preview
          </h1>

          <p className="mt-4 text-stone-300">
            This page tests whether ArcheLoop can predict a user&apos;s most
            likely Shadow Loop from body activation, emotion, thought,
            response style, trigger, person, and environment.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6 space-y-6">
          <div>
            <p className="text-sm text-stone-400">Primary Loop</p>
            <h2 className="text-3xl font-semibold">
              {result.primaryLoop}
            </h2>
          </div>

          <div>
            <p className="text-sm text-stone-400">Confidence</p>
            <p className="text-2xl font-semibold">
              {result.confidence}%
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-400">Secondary Loop</p>
            <p className="text-xl">
              {result.secondaryLoop}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-400">Archetype</p>
            <p className="text-xl">
              {result.archetype}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-400">
              Recommended Integration Journey
            </p>
            <p className="text-xl">
              {result.journey}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-400">
              Emerging Integrated Identity
            </p>
            <p className="text-xl">
              {result.integratedIdentity}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h3 className="text-xl font-semibold">
            Suggested Practices
          </h3>

          <ul className="mt-4 space-y-3 text-stone-300">
            {result.suggestedPractices.map((practice) => (
              <li key={practice}>
                {practice}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h3 className="text-xl font-semibold">
            Raw Scores
          </h3>

          <pre className="mt-4 overflow-x-auto text-sm text-stone-300">
            {JSON.stringify(result.scores, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}