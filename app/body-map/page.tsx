import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Image from "next/image"

const mappings = [
  {
    archetype: "Magician",
    element: "Air",
    area: "Head / Mind",
    image: "/images/elements/air.png",
    description:
      "Associated with perception, cognition, interpretation, confusion, overthinking, and mental clarity.",
  },
  {
    archetype: "Sovereign",
    element: "Fire",
    area: "Solar Plexus / Chest",
    image: "/images/elements/fire.png",
    description:
      "Associated with visibility, worth, confidence, identity, expression, and direction.",
  },
  {
    archetype: "Lover",
    element: "Water",
    area: "Heart / Gut",
    image: "/images/elements/water.png",
    description:
      "Associated with emotion, attachment, vulnerability, grief, intimacy, and emotional regulation.",
  },
  {
    archetype: "Warrior",
    element: "Earth",
    area: "Legs / Root / Lower Body",
    image: "/images/elements/earth.png",
    description:
      "Associated with grounding, boundaries, survival, protection, structure, and action.",
  },
]

export default function BodyMapPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* HERO */}

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <p className="uppercase tracking-[0.35em] text-gray-500 mb-4">
          Somatic Awareness
        </p>

        <h1 className="text-6xl md:text-7xl font-bold mb-8">
          The ArcheLoop Body Map
        </h1>

        <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Shadow loops are not only thoughts. They appear through body
          sensations, nervous system activation, emotional responses,
          and relational environments.
        </p>
      </section>

      {/* BODY IMAGE */}

      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="relative rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-950">
          <Image
            src="/images/body-map/body-map-main.png"
            alt="ArcheLoop Body Map"
            width={1400}
            height={1800}
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* MAPPINGS */}

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">

          {mappings.map((item) => (
            <div
              key={item.archetype}
              className="border border-zinc-800 rounded-3xl bg-zinc-950 overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.archetype}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90"
                />
              </div>

              <div className="p-8">
                <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
                  {item.element} Element
                </p>

                <h2 className="text-4xl font-bold mb-4">
                  {item.archetype}
                </h2>

                <p className="text-yellow-300 mb-5 text-lg">
                  {item.area}
                </p>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FINAL */}

      <section className="max-w-5xl mx-auto px-6 pb-28 text-center">
        <div className="border border-yellow-400 rounded-[2rem] bg-zinc-950 p-10">
          <h2 className="text-4xl font-bold mb-6">
            The body often recognises the loop before the mind does.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            ArcheLoop uses body awareness as part of recognising relational
            activation, nervous system shifts, and recurring archetypal adaptations.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}