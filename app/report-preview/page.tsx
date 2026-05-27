import { loopDetails } from "../data/loopDetails"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { loops } from "../data/loops"

export default async function ReportPreviewPage({
  searchParams,
}: {
  searchParams?: Promise<{ loop?: string }>
}) {
  const params = await searchParams

  const selectedLoopName =
    params?.loop && params.loop in loopDetails
      ? params.loop
      : "Emotional Lockdown"

  const primaryLoop = loops[selectedLoopName as keyof typeof loops]
  const detail = loopDetails[selectedLoopName as keyof typeof loopDetails]

  const secondaryLoopName = detail.relatedDynamics?.[0] || "Fortress"
  const secondaryLoop = loops[secondaryLoopName as keyof typeof loops]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-32 border-b border-zinc-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_45%)]" />

        <div className="relative max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm mb-6">
            Premium Report Preview
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Your ArcheLoop
            <br />
            Pattern Report
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            This report maps the deeper structure beneath your emotional
            reactions, protective responses, relational activators, and
            integration pathway.
          </p>
        </div>
      </section>

<section className="px-6 py-12 border-b border-zinc-800 bg-black">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-6 text-center">
      Test Report Loop
    </p>

    <div className="flex flex-wrap justify-center gap-3">
      {Object.keys(loopDetails).map((loopName) => (
        <a
          key={loopName}
          href={`/report-preview?loop=${encodeURIComponent(loopName)}`}
          className="border border-zinc-800 rounded-full px-5 py-3 text-sm text-gray-300 hover:border-yellow-300 hover:text-yellow-300 transition"
        >
          {loopName}
        </a>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-28 border-b border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Structural Dynamic
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-10 text-center">
      How this loop forms.
    </h2>

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="text-xl text-gray-300 leading-relaxed">
        {detail.structuralDynamic}
      </p>
    </div>
  </div>
</section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
              Primary Loop
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {primaryLoop.title}
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {primaryLoop.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Archetype
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.archetype}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Element
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.element}</p>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-5 bg-black/40">
                <p className="text-gray-500 uppercase tracking-[0.25em] text-xs mb-2">
                  Mechanism
                </p>
                <p className="text-2xl font-semibold">{primaryLoop.mechanism}</p>
              </div>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Secondary Activation
            </p>

            <h3 className="text-3xl font-bold mb-5">
              {secondaryLoop.title}
            </h3>

            <p className="text-gray-300 leading-relaxed">
              {secondaryLoop.description}
            </p>
          </div>
        </div>
      </section>

<section className="px-6 py-28 border-b border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
      Core Structure
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
      The architecture beneath the pattern.
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Object.entries(detail.coreStructure).map(([label, value]) => (
        <div
          key={label}
          className="border border-zinc-800 rounded-2xl bg-black p-6"
        >
          <p className="uppercase tracking-[0.25em] text-gray-500 text-xs mb-3">
            {label
  .replace(/([A-Z])/g, " $1")
  .replace(/^./, (str) => str.toUpperCase())}
          </p>

          <p className="text-lg text-gray-200 leading-relaxed">
            {value}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5 text-center">
            Deeper Pattern Map
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
            What this loop may reveal.
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Relationship Pattern
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.relationshipPattern}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Communication Style
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.communicationStyle}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Escalation Pattern
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.escalationPattern}
              </p>
            </div>

            <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
              <h3 className="text-2xl font-bold mb-4">
                Identity Protection
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.identityProtection}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Nervous System
            </p>

            <h2 className="text-3xl font-bold mb-5">
              How your system may protect itself.
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              {primaryLoop.nervousSystem}
            </p>

            <div className="border border-yellow-300/20 rounded-2xl p-6 bg-black/40">
              <p className="text-yellow-300 font-semibold mb-3">
                Protection Mechanism
              </p>

              <p className="text-gray-300 leading-relaxed">
                {primaryLoop.protection}
              </p>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Relational Activators
            </p>

            <h2 className="text-3xl font-bold mb-5">
              What may activate the loop.
            </h2>

            <div className="space-y-4">
              {detail.relationalActivators.map((item) => (
                <div
                  key={item}
                  className="border border-zinc-800 rounded-2xl p-4 text-gray-300 bg-black/40"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
        Body Map Interpretation
      </p>

      <h2 className="text-3xl font-bold mb-5">
        Where the loop may live in the body.
      </h2>

      <p className="text-gray-300 leading-relaxed">
        {detail.bodyMapInterpretation ||
  `${primaryLoop.body} may become a key area of activation when this loop is under pressure. The body may hold tension, shutdown, urgency, or protective contraction depending on the loop pattern.`}
      </p>
    </div>

    <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
      <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
        Secondary Loop Interaction
      </p>

      <h2 className="text-3xl font-bold mb-5">
        How protective patterns reinforce each other.
      </h2>

      <p className="text-gray-300 leading-relaxed">
        {detail.secondaryInteraction ||
  `When ${primaryLoop.title} combines with ${secondaryLoop.title}, the system may move between the primary protective pattern and a secondary response that reinforces the loop under pressure.`}
      </p>
    </div>

  </div>
</section>

      <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <div className="border border-zinc-800 rounded-[2rem] bg-black p-8">
            <p className="uppercase tracking-[0.3em] text-gray-500 text-sm mb-5">
              Core Belief
            </p>

            <h2 className="text-4xl font-bold text-yellow-300 mb-6">
              “{primaryLoop.coreBelief}”
            </h2>

            <p className="text-gray-300 leading-relaxed">
              This belief is not a fixed identity. It is a protective
              interpretation that may have formed around safety, vulnerability,
              belonging, or control.
            </p>
          </div>

          <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
              Integration Focus
            </p>

            <h2 className="text-3xl font-bold mb-5">
              {primaryLoop.healingFocus}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Restoring Energy:{" "}
              <span className="text-yellow-300">
                {primaryLoop.integrationKey}
              </span>
            </p>

            <p className="text-gray-300 leading-relaxed">
              {primaryLoop.integrationReason}
            </p>
          </div>
        </div>
      </section>

<section className="px-6 py-28">
  <div className="max-w-5xl mx-auto">

    <div className="border border-yellow-300/25 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">
      <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-5">
        Integration Blueprint
      </p>

      <h2 className="text-4xl md:text-5xl font-bold mb-8">
        Rebuilding safety beyond the loop.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        {detail.integrationBlueprint ||
  `${detail.coreStructure.integrationShift} This process usually begins through small, repeatable moments of awareness, regulation, and behaviour change rather than forcing the system to transform all at once.`}
      </p>
    </div>

  </div>
</section>

      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            First Practices
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Begin interrupting the loop.
          </h2>

          <div className="bg-white text-black rounded-[2rem] p-8 text-left mb-10">
            <p className="font-semibold mb-3">
              Loop Breaker
            </p>

            <p className="text-lg leading-relaxed">
              {detail.loopBreaker}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 text-left">
            {detail.prompts.map((prompt) => (
              <div
                key={prompt}
                className="border border-zinc-800 rounded-2xl p-5 bg-black"
              >
                <p className="text-gray-300">
                  {prompt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}