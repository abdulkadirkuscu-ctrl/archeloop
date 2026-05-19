import Nav from "../components/Nav"
import Footer from "../components/Footer"

const loops = [
  {
    name: "Dimmed Light",
    element: "Fire",
    image: "/images/loops/dimmed-light.png",
    description:
      "You hide your visibility, expression, or potential because being fully seen feels unsafe.",
    slug: "dimmed-light",
  },
  {
    name: "Paper Crown",
    element: "Fire",
    image: "/images/loops/paper-crown.png",
    description:
      "You rely on achievement, appearance, status, or performance to feel worthy or secure.",
    slug: "paper-crown",
  },
  {
    name: "Stalled Flame",
    element: "Fire",
    image: "/images/loops/stalled-flame.png",
    description:
      "You feel desire, vision, or ambition inside you, but hesitation interrupts movement.",
    slug: "stalled-flame",
  },

  {
    name: "Blank Page",
    element: "Air",
    image: "/images/loops/blank-page.png",
    description:
      "Your mind goes empty when expression, clarity, or creative movement is needed.",
    slug: "blank-page",
  },
  {
    name: "Smoky Mirrors",
    element: "Air",
    image: "/images/loops/smoky-mirrors.png",
    description:
      "Perception becomes distorted through confusion, performance, rationalisation, or self-deception.",
    slug: "smoky-mirrors",
  },
  {
    name: "Mind Maze",
    element: "Air",
    image: "/images/loops/mind-maze.png",
    description:
      "Thought loops, over-analysis, and mental recursion interrupt action and clarity.",
    slug: "mind-maze",
  },

  {
    name: "Emotional Lockdown",
    element: "Water",
    image: "/images/loops/emotional-lockdown.png",
    description:
      "Emotion is sealed away so you can function, but connection and feeling become harder to access.",
    slug: "emotional-lockdown",
  },
  {
    name: "Fantasy Fog",
    element: "Water",
    image: "/images/loops/fantasy-fog.png",
    description:
      "Longing, imagination, and emotional fantasy begin replacing grounded connection.",
    slug: "fantasy-fog",
  },
  {
    name: "Flooded Waters",
    element: "Water",
    image: "/images/loops/flooded-waters.png",
    description:
      "Emotion becomes overwhelming, intense, and difficult to contain or regulate.",
    slug: "flooded-waters",
  },

  {
    name: "Compliance",
    element: "Earth",
    image: "/images/loops/compliance.png",
    description:
      "You abandon your boundaries or anger in order to stay safe, approved of, or accepted.",
    slug: "compliance",
  },
  {
    name: "Fortress",
    element: "Earth",
    image: "/images/loops/fortress.png",
    description:
      "Protection becomes isolation. Distance feels safer than vulnerability or dependence.",
    slug: "fortress",
  },
  {
    name: "Barren Ground",
    element: "Earth",
    image: "/images/loops/barren-ground.png",
    description:
      "Life becomes endurance, duty, and survival while vitality, softness, and joy feel out of reach.",
    slug: "barren-ground",
  },
]

export default function LoopsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-20">
          <h1 className="text-6xl font-bold mb-6">
            Shadow Loops
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Shadow Loops are recurring emotional and behavioural patterns
            formed through suppression, compensation, or collision between
            archetypal energies.
          </p>
        </div>

        <div className="space-y-20">
          {["Fire", "Air", "Water", "Earth"].map((element) => (
  <section key={element}>
    <h2 className="text-3xl font-bold mb-8">
      {element} Loops
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      {loops
        .filter((loop) => loop.element === element)
        .map((loop) => (
          <a
            key={loop.name}
            href={`/loops/${loop.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 hover:border-zinc-600 transition duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={loop.image}
                alt={loop.name}
                className="w-full h-[360px] object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6">
                <p className="uppercase tracking-[0.25em] text-xs text-gray-400 mb-2">
                  Shadow Loop
                </p>

                <h3 className="text-2xl font-bold mb-3">
                  {loop.name}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {loop.description}
                </p>
              </div>
            </div>
          </a>
        ))}
    </div>
  </section>
))}
        </div>
      </div>

      <Footer />
    </main>
  )
}