import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
];

export const metadata: Metadata = {
  title: "The Four Archetypes",
  description:
    "Explore the four core ArcheLoop functions: Sovereign, Warrior, Lover, and Magician — adaptive intelligences connected to identity, protection, emotion, and perception.",
};

export default function ArchetypesPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-14">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop™
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              The Four Archetypes
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop is built around four core archetypal energies. Each
              archetype represents a different psychological function,
              elemental force, and survival intelligence within human
              consciousness.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {archetypes.map((archetype) => (
              <a
                key={archetype.name}
                href={`/archetypes/${archetype.name.toLowerCase()}`}
                className="group overflow-hidden rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] shadow-[0_0_45px_rgba(216,183,120,0.05)] transition hover:border-yellow-300/50 hover:shadow-[0_0_70px_rgba(216,183,120,0.10)]"
              >
                <div className="relative h-[520px] overflow-hidden">
                  <Image
  src={archetype.image}
  alt={archetype.name}
  fill
  priority={archetype.name === "Sovereign"}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover opacity-90 transition duration-700 group-hover:scale-105"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                    {archetype.element}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-yellow-300">
                    {archetype.name}
                  </h2>

                  <p className="mt-5 leading-relaxed text-stone-300">
                    {archetype.description}
                  </p>

                  <p className="mt-7 font-semibold text-yellow-300">
                    Explore Archetype →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}