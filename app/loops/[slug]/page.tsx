import Footer from "../../components/Footer"
import Nav from "../../components/Nav"
import { loops } from "../../data/loops"
import Image from "next/image"

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}

export default async function LoopPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const loopEntry = Object.entries(loops).find(
    ([name]) => slugify(name) === slug
  )

  if (!loopEntry) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-20">
        <h1 className="text-4xl font-bold mb-6">Loop not found</h1>
        <a href="/loops" className="underline text-yellow-300">
          Return to Shadow Loops
        </a>
      </main>
    )
  }

  const [loopName, loop] = loopEntry as [string, any]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
            {loop.element} Element • {loop.mechanism}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            {loop.title}
          </h1>

          {loop.image && (
            <div className="relative w-full h-[420px] rounded-[2rem] overflow-hidden border border-zinc-800 mb-12">
              <Image
                src={loop.image}
                alt={loop.title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          )}

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-14">
            {loop.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Archetype</h2>
              <p className="text-gray-300">{loop.archetype}</p>
            </div>

            <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Core Emotion</h2>
              <p className="text-gray-300">{loop.emotion}</p>
            </div>

            <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Body Map</h2>
              <p className="text-gray-300">{loop.body}</p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Core Belief</h2>
            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <p className="text-2xl text-yellow-300">
                “{loop.coreBelief}”
              </p>
            </div>
          </section>
{loop.coreQuestion && (
  <section className="mb-16">
    <h2 className="text-4xl font-bold mb-6">
      Core Reflection Question
    </h2>

    <div className="border border-yellow-300/20 rounded-3xl p-8 bg-gradient-to-b from-zinc-950 to-black">
      <p className="text-2xl text-yellow-300 leading-relaxed mb-8">
        “{loop.coreQuestion}”
      </p>

      {loop.prompts && (
        <div>
          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-4">
            Additional Prompts
          </p>

          <ul className="space-y-3 text-gray-300">
            {loop.prompts.map((prompt: string) => (
              <li key={prompt}>• {prompt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </section>
)}
          {loop.signs && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">
                This Loop May Appear As
              </h2>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
                <ul className="space-y-3 text-gray-300">
                  {loop.signs.map((sign: string) => (
                    <li key={sign}>• {sign}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {loop.nervousSystem && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Nervous System Pattern
              </h2>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
                <p className="text-xl text-gray-300">
                  {loop.nervousSystem}
                </p>
              </div>
            </section>
          )}

          {loop.protection && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">
                What This Pattern May Be Protecting
              </h2>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {loop.protection}
                </p>
              </div>
            </section>
          )}

          {loop.relationalActivators && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Relational Activators
              </h2>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
                <ul className="space-y-3 text-gray-300">
                  {loop.relationalActivators.map((item: string) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {loop.secondaryLoops && (
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">
                Related Dynamics
              </h2>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
                <p className="text-gray-300 mb-4">
                  Under pressure, this loop may interact with:
                </p>

                <ul className="space-y-3 text-gray-300">
                  {loop.secondaryLoops.map((item: string) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Loop Breaker Practice
            </h2>

            <div className="bg-white text-black rounded-3xl p-8">
              <p className="text-lg">{loop.loopBreaker}</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Integration Key</h2>

            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <p className="text-xl mb-3">
                <strong>Restoring Energy:</strong> {loop.integrationKey}
              </p>

              <p className="text-gray-300">
                {loop.integrationReason}
              </p>
            </div>
          </section>

          <section className="mb-16 border border-yellow-300/20 rounded-3xl bg-gradient-to-b from-zinc-950 to-black p-8">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm mb-4">
              Full Profile
            </p>

            <h2 className="text-3xl font-bold mb-4">
              Discover how this loop fits into your wider ArcheLoop profile.
            </h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              The full ArcheLoop report will explore primary and secondary
              loops, nervous system patterns, relational activators, body map,
              and integration pathways.
            </p>

            <a
              href="/assessment"
              className="inline-flex bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-200 transition"
            >
              Take Assessment
            </a>
          </section>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/loops"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              Back to Shadow Loops
            </a>

            <a
              href={`/archetypes/${loop.archetype.toLowerCase()}`}
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Explore {loop.archetype}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}