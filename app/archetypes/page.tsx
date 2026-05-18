import Nav from "../components/Nav"
import Footer from "../components/Footer"

const archetypes = [
  {
    name: "Sovereign",
    element: "Fire",
    image: "/images/archetypes/sovereign.jpg",
    description:
      "The Sovereign represents visibility, self-worth, leadership, direction, and the permission to take up space.",
  },
  {
    name: "Magician",
    element: "Air",
    image: "/images/archetypes/magician.jpg",
    description:
      "The Magician represents perception, interpretation, insight, symbolic thinking, and the power of the mind.",
  },
  {
    name: "Lover",
    element: "Water",
    image: "/images/archetypes/lover.jpg",
    description:
      "The Lover represents emotion, intimacy, creativity, connection, longing, and emotional truth.",
  },
  {
    name: "Warrior",
    element: "Earth",
    image: "/images/archetypes/warrior.jpg",
    description:
      "The Warrior represents protection, boundaries, groundedness, survival, discipline, and embodied strength.",
  },
]

export default function ArchetypesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold mb-6">
          The Four Archetypes
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mb-20 leading-relaxed">
          ArcheLoop is built around four core archetypal energies.
          Each archetype represents a different psychological function,
          elemental force, and survival intelligence within human consciousness.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {archetypes.map((archetype) => (
            <div
              key={archetype.name}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-yellow-400 transition"
            >
              <img
                src={archetype.image}
                alt={archetype.name}
                className="w-full h-[600px] object-cover"
              />

              <div className="p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300 mb-3">
                  {archetype.element}
                </p>

                <h2 className="text-3xl font-bold mb-4">
                  {archetype.name}
                </h2>

                <p className="text-gray-400 leading-relaxed">
                  {archetype.description}
                </p>

                <a
                  href={`/archetypes/${archetype.name.toLowerCase()}`}
                  className="inline-block mt-6 text-yellow-300 hover:text-yellow-200"
                >
                  Explore Archetype →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}