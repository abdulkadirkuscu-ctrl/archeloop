import type { Metadata } from "next"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "ArcheLoop Report",
  description:
    "Explore the ArcheLoop Personal Pattern Report — a symbolic self-awareness profile mapping archetypes, shadow loops, nervous system patterns, and relational dynamics.",
}

const previewIncludes = [
  "Primary shadow loop",
  "Basic archetype profile",
  "Elemental snapshot",
  "One loop breaker practice",
]

const premiumIncludes = [
  "Primary and secondary shadow loops",
  "Elemental interaction analysis",
  "Suppressed and overactive archetypes",
  "Nervous system pattern",
  "Relational activators",
  "Loop interaction map",
  "Body map interpretation",
  "Integration blueprint",
]

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-32 text-center border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_45%)]" />

        <div className="relative max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-6">
            ArcheLoop Report
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Your symbolic
            <br />
            self-awareness profile.
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Answer the ArcheLoop assessment, receive your profile preview,
            and unlock a deeper map of your shadow loops, elemental dynamics,
            relational activators, and integration pathway.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Start Assessment
            </a>

            <a
              href="#premium-report"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Explore Report
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              How It Works
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              From assessment to full pattern map.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["01", "Complete The Assessment", "Answer 60 questions exploring emotional, relational, behavioural, and nervous system patterns."],
              ["02", "Receive Your Preview", "See your primary loop, elemental balance, archetype profile, and first loop-breaking direction."],
              ["03", "Unlock Full Report", "Access deeper structural dynamics, relational activators, loop interactions, and integration guidance."],
            ].map(([number, title, body]) => (
              <div key={title} className="border border-zinc-800 rounded-[2rem] bg-black p-8">
                <div className="text-yellow-300 text-5xl font-bold mb-6">{number}</div>
                <h3 className="text-2xl font-bold mb-5">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="premium-report" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              Report Access
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Preview first. Unlock the deeper map.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border border-zinc-800 rounded-[2rem] bg-black p-10">
              <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-5">
                Free Profile Preview
              </p>

              <div className="space-y-4">
                {previewIncludes.map((item) => (
                  <p key={item} className="border border-zinc-800 rounded-2xl p-4 text-gray-300">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
              <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-5">
                Premium Report Unlocks
              </p>

              <div className="space-y-4">
                {premiumIncludes.map((item) => (
                  <p key={item} className="border border-zinc-800 rounded-2xl p-4 text-gray-200">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Founding Edition
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Unlock your full
            <br />
            ArcheLoop pattern report.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Founding Edition reports are available for early users helping shape
            the future ArcheLoop system.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Take Assessment
            </a>

            <a
              href="/founding-access"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Request Founding Access
            </a>
          </div>

          <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto mt-10">
            ArcheLoop reports are educational symbolic self-awareness tools and
            are not medical, psychiatric, therapeutic, or diagnostic services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}