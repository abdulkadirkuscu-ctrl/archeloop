import Nav from "../components/Nav"
import Footer from "../components/Footer"

const previewIncludes = [
  "Primary emotional loop",
  "Core protection pattern",
  "Emotional activation snapshot",
  "One starting loop breaker",
]

const premiumIncludes = [
  "Primary and secondary loops",
  "Nervous system response patterns",
  "Suppressed and compensating archetypes",
  "Relational activators and emotional triggers",
  "Body activation map",
  "Loop interaction dynamics",
  "Integration guidance and loop breakers",
]

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      {/* HERO */}

      <section className="relative overflow-hidden px-6 py-32 text-center border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_45%)]" />

        <div className="relative max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-6">
            ArcheLoop Report
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            See the loop beneath
            <br />
            your emotional patterns.
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Your ArcheLoop Report reveals the deeper structure behind recurring
            emotional reactions, relationship dynamics, nervous system patterns,
            and protective responses.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Find My Loop
            </a>

            <a
              href="#premium-report"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Unlock Full Report
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="px-6 py-24 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              How It Works
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              From emotional patterns
              <br />
              to deeper recognition.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                className="border border-zinc-800 rounded-[2rem] bg-black p-8"
              >
                <div className="text-yellow-300 text-5xl font-bold mb-6">
                  {number}
                </div>

                <h3 className="text-2xl font-bold mb-5">
                  {title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}

      <section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Why This Matters
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-10">
            The behaviour is not
            <br />
            the whole pattern.
          </h2>

          <div className="space-y-8 text-xl text-gray-300 leading-relaxed">
            <p>
              Many people try to change behaviours without understanding
              the loop underneath them.
            </p>

            <p>
              But overthinking, people pleasing, emotional shutdown,
              emotional flooding, defensiveness, confusion, and validation
              seeking are often protective responses — not random flaws.
            </p>

            <p>
              The ArcheLoop Report helps make those deeper patterns visible
              so they can finally be interrupted consciously.
            </p>
          </div>
        </div>
      </section>

      {/* REPORT ACCESS */}

      <section id="premium-report" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              Report Access
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              What becomes visible
              <br />
              in the full report?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* FREE */}

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-10">
              <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-5">
                Free Profile Preview
              </p>

              <div className="space-y-4">
                {previewIncludes.map((item) => (
                  <p
                    key={item}
                    className="border border-zinc-800 rounded-2xl p-4 text-gray-300"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* PREMIUM */}

            <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
              <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-5">
                Full ArcheLoop Report
              </p>

              <div className="space-y-4">
                {premiumIncludes.map((item) => (
                  <p
                    key={item}
                    className="border border-zinc-800 rounded-2xl p-4 text-gray-200"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Founding Edition
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Unlock your deeper
            <br />
            pattern map.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Founding Edition reports are available for early users helping
            shape the future ArcheLoop system.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Find My Loop
            </a>

            <a
              href="/founding-access"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Request Founding Access
            </a>
          </div>

          <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto mt-10">
            ArcheLoop reports are educational self-development tools and are
            not medical, psychiatric, therapeutic, or diagnostic services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}