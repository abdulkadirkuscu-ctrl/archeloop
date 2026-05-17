import Nav from "../components/Nav"
import Footer from "../components/Footer"

const archetypes = [
  {
    name: "Sovereign",
    element: "Fire",
    colour: "border-yellow-400",
    text: "Visibility, self-worth, leadership, agency, and permission to shine.",
    href: "/archetypes/sovereign",
  },
  {
    name: "Magician",
    element: "Air",
    colour: "border-blue-300",
    text: "Mind, perception, meaning, clarity, interpretation, and trusted thought.",
    href: "/archetypes/magician",
  },
  {
    name: "Lover",
    element: "Water",
    colour: "border-red-400",
    text: "Emotion, intimacy, connection, beauty, creativity, and feeling.",
    href: "/archetypes/lover",
  },
  {
    name: "Warrior",
    element: "Earth",
    colour: "border-green-500",
    text: "Boundaries, protection, grounded action, discipline, and survival.",
    href: "/archetypes/warrior",
  },
]

export default function ArchetypesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Archetype Library
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            The Four Archetypes
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-16">
            ArcheLoop uses four archetypal energies to understand how people
            act, think, feel, protect, collapse, compensate, and repeat patterns.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {archetypes.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`border ${item.colour} rounded-3xl p-8 bg-zinc-950 hover:scale-[1.02] transition-transform block`}
              >
                <p className="text-gray-400 mb-3">{item.element} Element</p>

                <h2 className="text-4xl font-bold mb-4">
                  {item.name}
                </h2>

                <p className="text-gray-300 text-lg">
                  {item.text}
                </p>

                <p className="text-yellow-300 font-semibold mt-6">
                  Explore {item.name} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}