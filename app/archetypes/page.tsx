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
    "Explore the four core ArcheLoop archetypes: Sovereign, Magician, Lover, and Warrior — connected to Fire, Air, Water, and Earth.",
};

export default function ArchetypesPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container-wide space-y-14">
          <div className="al-hero-card text-center">
            <p className="al-kicker">ArcheLoop</p>

            <h1 className="al-heading-xl">The Four Archetypes</h1>

            <p className="al-text-lg mx-auto mt-8 max-w-3xl">
              ArcheLoop is built around four archetypal energies: Fire, Air,
              Water, and Earth. Each archetype represents a different way you
              express, protect, perceive, connect, and respond under pressure.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {archetypes.map((archetype) => (
              <a
                key={archetype.name}
                href={`/archetypes/${archetype.name.toLowerCase()}`}
                className="al-card group overflow-hidden transition hover:border-[var(--al-accent)]"
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
                </div>

                <div className="p-8">
                  <p className="al-kicker">{archetype.element}</p>

                  <h2 className="mt-3 text-4xl font-bold text-[var(--al-accent)]">
                    {archetype.name}
                  </h2>

                  <p className="al-text mt-5">
                    {archetype.description}
                  </p>

                  <p className="mt-7 font-semibold text-[var(--al-accent)]">
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