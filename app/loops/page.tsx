import Footer from "../components/Footer"
import Nav from "../components/Nav"

const loops = [
  ["🔥", "Dimmed Light", "Suppressed Fire"],
  ["🔥", "Paper Crown", "Inflated Fire"],
  ["🔥", "Stalled Flame", "Colliding Fire"],

  ["🌬", "Blank Page", "Suppressed Air"],
  ["🌬", "Smoky Mirrors", "Inflated Air"],
  ["🌬", "Mind Maze", "Colliding Air"],

  ["🌊", "Emotional Lockdown", "Suppressed Water"],
  ["🌊", "Fantasy Fog", "Inflated Water"],
  ["🌊", "Flooded Waters", "Colliding Water"],

  ["🌱", "Compliance", "Suppressed Earth"],
  ["🌱", "Fortress", "Inflated Earth"],
  ["🌱", "Barren Ground", "Colliding Earth"],
]

export default function LoopsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
<Nav />

      <section className="px-6 py-24">

        <div className="max-w-6xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Shadow Loop Library
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            The 12 Shadow Loops
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-16">
            Each Shadow Loop represents a recurring emotional,
            behavioural, and nervous system pattern connected
            to an archetypal distortion.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            {loops.map(([icon, title, type]) => (
              <a
                key={title}
                href={`/loops/${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="border border-zinc-700 rounded-3xl p-8 bg-zinc-950 hover:border-yellow-400 transition-all block"
              >
                <div className="text-5xl mb-5">
                  {icon}
                </div>

                <h2 className="text-3xl font-bold mb-3">
                  {title}
                </h2>

                <p className="text-gray-400">
                  {type}
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