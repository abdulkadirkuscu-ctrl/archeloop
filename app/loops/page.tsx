import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "The 12 Shadow Loops",
  description:
    "Explore the 12 ArcheLoop shadow patterns formed through suppression, compensation, collision, and relational activation.",
};

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
];

export default function LoopsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-16">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              The 12 Shadow Loops
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              Shadow Loops are recurring emotional and behavioural patterns
              formed through collapse, compensation, or collision between
              archetypal energies.
            </p>

            <a
              href="/assessment"
              className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Find My Loop
            </a>
          </div>

          <div className="space-y-20">
            {["Fire", "Air", "Water", "Earth"].map((element) => (
              <section
                key={element}
                className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_60px_rgba(216,183,120,0.06)]"
              >
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                      Elemental Pattern
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-yellow-300">
                      {element} Loops
                    </h2>
                  </div>

                  <p className="max-w-xl text-stone-400">
                    Explore the three Shadow Loops connected to this archetypal
                    element.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {loops
                    .filter((loop) => loop.element === element)
                    .map((loop) => (
                      <a
                        key={loop.slug}
                        href={`/loops/${loop.slug}`}
                        className="group relative overflow-hidden rounded-[2rem] border border-yellow-300/10 bg-black/30 transition duration-500 hover:border-yellow-300/50 hover:shadow-[0_0_55px_rgba(216,183,120,0.10)]"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                        <div className="relative h-72 overflow-hidden">
                          <Image
                            src={loop.image}
                            alt={loop.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="relative z-10 p-7">
                          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                            Shadow Loop
                          </p>

                          <h3 className="mt-4 text-3xl font-bold transition group-hover:text-yellow-300">
                            {loop.name}
                          </h3>

                          <p className="mt-5 leading-relaxed text-stone-300">
                            {loop.description}
                          </p>

                          <p className="mt-8 font-semibold text-yellow-300">
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
  );
}