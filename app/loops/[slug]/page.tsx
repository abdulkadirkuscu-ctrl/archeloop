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
        <p className="text-gray-300 mb-6">Could not find: {slug}</p>
        <a href="/" className="underline text-yellow-300">Return Home</a>
      </main>
    )
  }

  const [loopName, loop] = loopEntry as [string, any]
const imagePath = `/images/loops/${slug}.png`
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            {loop.element} Element • {loop.mechanism}
          </p>

          <h1 className="text-6xl font-bold mb-6">{loop.title}</h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-12">
            {loop.description}
          </p>
<div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-zinc-800 mb-16 bg-zinc-950">
  <Image
    src={imagePath}
    alt={loop.title}
    fill
    sizes="(max-width: 768px) 100vw, 900px"
    className="object-cover"
    priority
  />
</div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Archetype</h2>
              <p className="text-gray-300">{loop.archetype}</p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Core Emotion</h2>
              <p className="text-gray-300">{loop.emotion}</p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Body Map</h2>
              <p className="text-gray-300">{loop.body}</p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Core Belief</h2>
            <div className="border border-zinc-700 rounded-2xl p-8">
              <p className="text-2xl text-yellow-300">“{loop.coreBelief}”</p>
            </div>
          </section>
          
{loop.protection && (
  <section className="mb-16">
    <h2 className="text-4xl font-bold mb-6">
      What This Pattern May Be Protecting
    </h2>

    <div className="border border-zinc-700 rounded-2xl p-8 bg-zinc-950">
      <p className="text-gray-300 text-lg leading-relaxed">
        {loop.protection}
      </p>
    </div>
  </section>
)}

{loop.signs && (
  <section className="mb-16">
    <h2 className="text-4xl font-bold mb-6">
      Common Signs
    </h2>

    <div className="border border-zinc-700 rounded-2xl p-8 bg-zinc-950">
      <ul className="space-y-3 text-gray-300">
        {loop.signs.map((sign: string) => (
          <li key={sign}>• {sign}</li>
        ))}
      </ul>
    </div>
  </section>
)}

{loop.relationalActivators && (
  <section className="mb-16">
    <h2 className="text-4xl font-bold mb-6">
      Relational Activators
    </h2>

    <div className="border border-zinc-700 rounded-2xl p-8 bg-zinc-950">
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
      Secondary Activations
    </h2>

    <div className="border border-zinc-700 rounded-2xl p-8 bg-zinc-950">
      <p className="text-gray-300 mb-4">
        Under pressure, this pattern may also activate:
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
            <h2 className="text-4xl font-bold mb-6">Loop Breaker Practice</h2>
            <div className="bg-white text-black rounded-3xl p-8">
              <p className="text-lg">{loop.loopBreaker}</p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">Integration Key</h2>
            <div className="border border-zinc-700 rounded-3xl p-8">
              <p className="text-xl mb-3">
                <strong>Restoring Energy:</strong> {loop.integrationKey}
              </p>
              <p className="text-gray-300">{loop.integrationReason}</p>
            </div>
          </section>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/assessment"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Take Assessment
            </a>

            <a
              href={`/archetypes/${loop.archetype.toLowerCase()}`}
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              Explore {loop.archetype}
            </a>

            <a
              href="/"
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Return Home
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}