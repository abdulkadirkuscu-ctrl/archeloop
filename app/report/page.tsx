import Nav from "../components/Nav";
import Footer from "../components/Footer";

const previewIncludes = [
  "Primary emotional loop",
  "Core protection pattern",
  "Emotional activation snapshot",
  "One starting loop breaker",
];

const premiumIncludes = [
  "Primary and secondary loops",
  "Nervous system response patterns",
  "Suppressed and compensating archetypes",
  "Relational activators and emotional triggers",
  "Body activation map",
  "Loop interaction dynamics",
  "Integration guidance and loop breakers",
];

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            ArcheLoop Report
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            See the loop beneath
            <br />
            your emotional patterns.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            Your ArcheLoop Report reveals the deeper structure behind recurring
            emotional reactions, relationship dynamics, nervous system patterns,
            and protective responses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Find My Loop
            </a>

            <a
              href="#premium-report"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Unlock Full Report
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
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
                "Complete The Assessment",
                "Answer 60 questions exploring recurring emotional, relational, and nervous system patterns.",
              ],
              [
                "02",
                "Receive Your Preview",
                "See your primary loop, emotional protection patterns, and first loop-breaking direction.",
              ],
              [
                "03",
                "Unlock Full Report",
                "Access deeper nervous system dynamics, relational activators, loop interactions, body patterns, and integration guidance.",
              ],
            ].map(([number, title, body]) => (
              <div
                key={title}
                className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                  {number}
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-yellow-300">
                  {title}
                </h3>

                <p className="mt-4 leading-relaxed text-stone-300">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Why This Matters
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            The behaviour is not
            <br />
            the whole pattern.
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-7 text-xl leading-relaxed text-stone-300">
            <p>
              Many people try to change behaviours without understanding the
              loop underneath them.
            </p>

            <p>
              But overthinking, people pleasing, emotional shutdown, emotional
              flooding, defensiveness, confusion, and validation seeking are
              often protective responses — not random flaws.
            </p>

            <p>
              The ArcheLoop Report helps make those deeper patterns visible so
              they can finally be interrupted consciously.
            </p>
          </div>
        </div>
      </section>

      <section id="premium-report" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Inside Your Premium Report
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Go beyond a single loop and uncover the deeper architecture
              shaping your emotional patterns.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <ReportCard
              eyebrow="Free Profile Preview"
              title="Start with the pattern."
              items={previewIncludes}
              premium={false}
            />

            <ReportCard
              eyebrow="Full ArcheLoop Report"
              title="Unlock the architecture."
              items={premiumIncludes}
              premium
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Founding Access
            </p>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Become one of the first
              <br />
              ArcheLoop members.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Help shape the future of ArcheLoop while receiving your full
              premium report, early feature access, and priority invitations to
              future releases.
            </p>
          </div>

          <div className="mb-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                What You Receive
              </p>

              <div className="mt-6 space-y-4 text-stone-300">
                {[
                  "Full Premium ArcheLoop Report",
                  "Loop Landscape Analysis",
                  "Archetype Score Map",
                  "Nervous System Pattern Mapping",
                  "Relational Activators",
                  "Body Map Interpretation",
                  "Integration Blueprint",
                  "Personalised Loop Breakers",
                  "Early Access To Future Features",
                  "Priority Access To I Am Triggered™",
                ].map((item) => (
                  <p key={item}>✓ {item}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_50px_rgba(216,183,120,0.08)]">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
                Founding Member Opportunity
              </p>

              <h3 className="mt-6 text-3xl font-bold">
                Help build ArcheLoop.
              </h3>

              <p className="mt-5 leading-relaxed text-stone-300">
                Founding Members help improve the assessment through real-world
                feedback while gaining access to the most advanced version of
                the ArcheLoop system before public launch.
              </p>

              <div className="mt-7 space-y-4 text-stone-300">
                <p>✓ Early member access</p>
                <p>✓ Priority feature invitations</p>
                <p>✓ Future Triggered Tracker access</p>
                <p>✓ Opportunity to shape the platform</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/assessment"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Find My Loop
              </a>

              <a
                href="/founding-access"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
              >
                Request Founding Access
              </a>
            </div>

            <p className="mx-auto mt-10 max-w-3xl text-sm text-stone-500">
              ArcheLoop reports are educational self-development tools and are
              not medical, psychiatric, therapeutic, or diagnostic services.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Coming Soon
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            I Am Triggered™
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Track which shadow loops activate throughout the week. Discover
            recurring triggers, emotional patterns, relational activators, and
            integration progress over time.
          </p>

          <p className="mt-8 text-stone-500">
            The assessment reveals your architecture.
            <br />
            Triggered reveals what is happening right now.
          </p>
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
    <div
      className={`rounded-[2rem] border p-8 shadow-[0_0_55px_rgba(216,183,120,0.06)] ${
        premium
          ? "border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black"
          : "border-yellow-300/10 bg-[#0B1018]"
      }`}
    >
      <p
        className={`text-sm uppercase tracking-[0.25em] ${
          premium ? "text-yellow-300" : "text-yellow-300/60"
        }`}
      >
        {eyebrow}
      </p>

      <h3 className="mt-5 text-3xl font-bold">{title}</h3>

      <div className="mt-7 space-y-4">
        {items.map((item) => (
          <p
            key={item}
            className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}