import Image from "next/image"

const elements = [
  {
    name: "Fire",
    archetype: "Sovereign",
    meaning: "Visibility, identity, presence, and self-worth.",
    image: "/sigils/fire-sigil.png",
    colour: "text-yellow-300",
    glow: "group-hover:border-yellow-300/50",
    bgGlow: "from-yellow-300/10",
  },
  {
    name: "Air",
    archetype: "Magician",
    meaning: "Perception, thought, awareness, and expression.",
    image: "/sigils/air-sigil.png",
    colour: "text-blue-400",
    glow: "group-hover:border-blue-400/50",
    bgGlow: "from-blue-400/10",
  },
  {
    name: "Water",
    archetype: "Lover",
    meaning: "Emotion, connection, vulnerability, and longing.",
    image: "/sigils/water-sigil.png",
    colour: "text-rose-500",
    glow: "group-hover:border-rose-500/50",
    bgGlow: "from-rose-500/10",
  },
  {
    name: "Earth",
    archetype: "Warrior",
    meaning: "Protection, grounding, boundaries, and structure.",
    image: "/sigils/earth-sigil.png",
    colour: "text-lime-400",
    glow: "group-hover:border-lime-400/50",
    bgGlow: "from-lime-400/10",
  },
]

export default function ElementalSigils() {
  return (
    <section className="px-6 py-28 border-y border-yellow-300/10 bg-[#0B1018]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            The Four Archetypal Energies
          </p>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Fire. Air. Water. Earth.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            ArcheLoop maps the way The Four Archetypal Energies shape emotional
            patterns, nervous system responses, relational dynamics,
            and the path toward integration.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {elements.map((element) => (
            <div
              key={element.name}
              className={`group relative overflow-hidden border border-yellow-300/10 rounded-[2rem] bg-gradient-to-b ${element.bgGlow} to-black p-5 transition-all duration-700 hover:-translate-y-1 ${element.glow}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
              </div>

              <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-black border border-zinc-900 mb-6">
                <Image
                  src={element.image}
                  alt={`${element.name} sigil`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain p-5 opacity-90 group-hover:scale-105 group-hover:-translate-y-1 group-hover:opacity-100 transition-all duration-700 animate-[float_8s_ease-in-out_infinite]" 
              />
                </div>

              <p
                className={`uppercase tracking-[0.25em] text-sm mb-3 ${element.colour}`}
              >
                {element.name}
              </p>

              <h3 className="text-2xl font-bold mb-4">
                {element.archetype}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {element.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}