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
    <main className="al-page min-h-screen px-6 py-16">
      <section className="al-container space-y-8">
        <div>
          <p className="al-kicker">ArcheLoop Intelligence Engine V2</p>

          <h1 className="al-heading-lg">Intelligence Preview</h1>

          <p className="al-text-lg mt-4">
            This page tests whether ArcheLoop can predict a user&apos;s most
            likely Shadow Loop from body activation, emotion, thought, response
            style, trigger, person, and environment.
          </p>
        </div>

        <div className="al-card space-y-6 p-6">
          <ResultItem label="Primary Loop" value={result.primaryLoop} large />
          <ResultItem label="Confidence" value={`${result.confidence}%`} large />
          <ResultItem label="Secondary Loop" value={result.secondaryLoop || "—"} />
          <ResultItem label="Archetype" value={result.archetype} />
          <ResultItem label="Recommended Integration Journey" value={result.journey} />
          <ResultItem label="Emerging Integrated Identity" value={result.integratedIdentity} />
        </div>

        <div className="al-card p-6">
          <h3 className="text-xl font-semibold">Suggested Practices</h3>

          <ul className="al-text mt-4 space-y-3">
            {result.suggestedPractices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </div>

        <div className="al-card p-6">
          <h3 className="text-xl font-semibold">Raw Scores</h3>

          <pre className="al-soft-card mt-4 overflow-x-auto p-4 text-sm">
            {JSON.stringify(result.scores, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}

function ResultItem({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string | number;
  large?: boolean;
}) {
  return (
    <div>
      <p className="al-muted text-sm">{label}</p>
      <p
        className={
          large
            ? "mt-1 text-3xl font-semibold text-[var(--al-accent)]"
            : "mt-1 text-xl text-[var(--al-text)]"
        }
      >
        {value}
      </p>
    </div>
  );
}