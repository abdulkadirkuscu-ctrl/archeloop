import type { Metadata } from "next"
import Image from "next/image"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "The 12 Shadow Loops",
  description:
    "Explore the 12 ArcheLoop shadow patterns formed through suppression, compensation, collision, and relational activation.",
}

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
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              ArcheLoop
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              The 12 Shadow Loops
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Shadow Loops are recurring emotional and behavioural patterns
              formed through suppression, compensation, or collision between
              archetypal energies.
            </p>
          </div>

          <div className="space-y-24">
            {["Fire", "Air", "Water", "Earth"].map((element) => (
              <section key={element}>
                <h2 className="text-4xl font-bold mb-8">
                  {element} Loops
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {loops
                    .filter((loop) => loop.element === element)
                    .map((loop) => (
                      <a
                        key={loop.slug}
                        href={`/loops/${loop.slug}`}
                        className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black hover:border-yellow-300/40 transition-all duration-500"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

                        <div className="relative h-72 overflow-hidden">
                          <Image
                            src={loop.image}
                            alt={loop.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <div className="relative z-10 p-8">
                          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-4">
                            Shadow Loop
                          </p>

                          <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
                            {loop.name}
                          </h3>

                          <p className="text-gray-300 leading-relaxed mb-8">
                            {loop.description}
                          </p>

                          <p className="text-yellow-300 font-semibold">
                            Explore Loop →
                          </p>
                        </div>
                      </a>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}