import Nav from "../components/Nav";
import Footer from "../components/Footer";

const previewIncludes = [
  "Primary emotional loop",
  "Core protection pattern",
  "Emotional activation snapshot",
  "One starting loop breaker",
];

const reportIncludes = [
  "Primary and secondary Shadow Loops",
  "Nervous system response patterns",
  "Archetype and element analysis",
  "Relational activators and emotional triggers",
  "Body activation map",
  "Loop interaction dynamics",
  "Integration guidance and loop breakers",
];

const bundleIncludes = [
  "Full ArcheLoop Report",
  "First month ArcheLoop Integration",
  "Triggered Pro",
  "Progress Dashboard",
  "Integration Journeys",
  "My Integrated Vision",
];

export default function ReportPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="relative overflow-hidden px-6 py-28">
        <div className="al-hero-glow" />

        <div className="al-premium-card mx-auto max-w-6xl p-10 text-center">
          <p className="al-kicker">
            ArcheLoop Report
          </p>

          <h1 className="al-heading-xl mt-6">
            See the loop beneath
            <br />
            your emotional patterns.
          </h1>

         <p className="al-text-lg mx-auto mt-8 max-w-3xl">
  Your ArcheLoop Report reveals the deeper patterns behind recurring
  emotional reactions, relationship dynamics, nervous system responses,
  and protective strategies.
</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/assessment"
              className="al-button-primary"
            >
              Start Find My Loop
            </a>

            <a
              href="/checkout?product=report"
              className="al-button-secondary"
            >
              Continue to Full Report
            </a>
          </div>

          <p className="al-muted mt-6 text-sm">
            Launch price: £19, normally £29.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] al-kicker">
              How It Works
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              From emotional patterns
              <br />
              to deeper recognition.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
    "01",
    "Complete Find My Loop",
    "Answer 60 questions exploring recurring emotional, relational, and nervous system patterns.",
  ],
  [
    "02",
    "Preview Your Report",
    "See your primary Shadow Loop, protection pattern, and first direction for interrupting the loop.",
  ],
  [
    "03",
    "Continue to Your Full Report",
    "Explore nervous system dynamics, relational activators, body patterns, loop interactions, and your Integration Journey.",
  ],
].map(([number, title, body]) => (
              <div
                key={title}
                className="al-card p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--al-accent)] text-[var(--al-bg)] font-bold">
                  {number}
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-[var(--al-accent)]">
                  {title}
                </h3>

                <p className="al-text mt-4">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl al-premium-card">
          <p className="text-sm uppercase tracking-[0.35em] al-kicker">
            Why This Matters
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            The behaviour is not
            <br />
            the whole pattern.
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-7 text-xl leading-relaxed al-text">
            <p>
              Many people try to change behaviours without understanding the
              loop underneath them.
            </p>

            <p>
              Overthinking, people pleasing, emotional shutdown, emotional
              flooding, defensiveness, confusion, and validation seeking are
              often protective responses — not random flaws.
            </p>

            <p>
              The ArcheLoop Report helps make those deeper patterns visible so
              they can be interrupted consciously.
            </p>
          </div>
        </div>
      </section>

      <section id="full-report" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] al-kicker">
              Inside Your Report
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Go beyond a single result and uncover the deeper architecture
              shaping your emotional patterns.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <ReportCard
              eyebrow="Result Preview"
              title="Start with the pattern."
              items={previewIncludes}
              premium={false}
            />

            <ReportCard
              eyebrow="Full ArcheLoop Report"
              title="Understand the architecture."
              items={reportIncludes}
              premium
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="al-premium-card mx-auto max-w-6xl p-10">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] al-kicker">
            Your Next Step
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Choose your next step.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed al-text">
              Start with your full ArcheLoop Report, or choose the bundle if
              you want your report plus your first month of ArcheLoop
              Integration.
            </p>
          </div>

        <div className="grid gap-8 lg:grid-cols-2">
  <div className="al-card p-8">
    <p className="text-sm uppercase tracking-[0.25em] al-kicker">
      Personal Report
    </p>

    <h3 className="mt-5 text-3xl font-bold text-[var(--al-accent)]">
      ArcheLoop Report
    </h3>

   <div className="mt-4">
  <p className="text-3xl font-semibold text-[var(--al-accent)]">£19</p>
  <p className="mt-1 text-sm al-muted">
    Launch price · <span className="line-through">£29</span> regular price
  </p>
</div>

              <p className="mt-5 leading-relaxed al-text">
                Your personalised report showing your primary and secondary
                Shadow Loops, nervous system pattern, relationship dynamics,
                body activation map, and integration guidance.
              </p>

              <div className="mt-7 space-y-3">
                {reportIncludes.map((item) => (
                  <p key={item}>✓ {item}</p>
                ))}
              </div>

              <a
                href="/checkout?product=report"
                className="al-button-primary mt-8"
              >
                Continue to Full Report
              </a>
            </div>

          <div className="al-premium-card p-8">
              <p className="text-sm uppercase tracking-[0.25em] al-kicker">
                Most Complete Experience
              </p>

             <h3 className="mt-5 text-3xl font-bold text-[var(--al-accent)]">
  Report + First Month Integration
</h3>

<div className="mt-4">
  <p className="text-3xl font-semibold text-[var(--al-accent)]">£29</p>
  <p className="mt-1 text-sm al-muted">
    Launch bundle · <span className="line-through">£58</span> regular value
  </p>
</div>

              <p className="mt-5 leading-relaxed al-text">
                Everything in the ArcheLoop Report, plus your first month of
                ArcheLoop Integration to help you recognise patterns, track
                triggers, and build lasting change.
              </p>

              <div className="mt-7 space-y-3">
                {bundleIncludes.map((item) => (
                  <p key={item}>✓ {item}</p>
                ))}
              </div>

              <a
                href="/checkout?product=bundle"
                className="al-button-primary mt-8"
              >
                Choose Report + Integration
              </a>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm al-muted">
            ArcheLoop reports are educational self-development tools and are not
            medical, psychiatric, therapeutic, or diagnostic services.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="al-premium-card mx-auto max-w-4xl p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] al-kicker">
            Continue The Work
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            ArcheLoop Integration
          </h2>

         <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed al-text">
  After your report, Integration helps you recognise real-life triggers,
  interrupt recurring patterns, follow your Integration Journey, and move
  toward your Integrated Self over time.
</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/integration"
              className="al-button-secondary"
            >
              Explore Integration
            </a>

            <a
              href="/triggered"
              className="al-button-primary"
            >
              Try I Am Triggered
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ReportCard({
  eyebrow,
  title,
  items,
  premium,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  premium: boolean;
}) {
  return (
    <div className={premium ? "al-premium-card p-8" : "al-card p-8"}>
      <p className="al-kicker">{eyebrow}</p>

      <h3 className="mt-5 text-3xl font-bold">{title}</h3>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <p key={item} className="al-soft-card p-4 al-text">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}