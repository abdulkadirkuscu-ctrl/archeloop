import type { Metadata } from "next";
import Image from "next/image";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Hero from "../../components/ui/Hero";
import Kicker from "../../components/ui/Kicker";
import PageIntro from "../../components/ui/PageIntro";
import PageTitle from "../../components/ui/PageTitle";

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
        <div className="al-container-wide">
          <Hero>
            <Kicker>ArcheLoop</Kicker>

            <PageTitle>The Four Archetypes</PageTitle>

            <PageIntro>
              ArcheLoop is built around four archetypal energies: Fire, Air,
              Water, and Earth. Each archetype represents a different way you
              express, protect, perceive, connect, and respond under pressure.
            </PageIntro>
          </Hero>

          <div className="al-page-gap grid gap-8 md:grid-cols-2">
            {archetypes.map((archetype) => (
              <a
                key={archetype.name}
                href={`/archetypes/${archetype.name.toLowerCase()}`}
                className="al-card group overflow-hidden transition duration-500 hover:border-[var(--al-accent)]"
              >
                <div className="relative h-[360px] overflow-hidden sm:h-[440px] lg:h-[520px]">
                  <Image
                    src={archetype.image}
                    alt={`${archetype.name} archetype`}
                    fill
                    priority={archetype.name === "Sovereign"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <Kicker>{archetype.element}</Kicker>

                  <h2 className="mt-3 text-3xl font-bold text-[var(--al-accent)] sm:text-4xl">
                    {archetype.name}
                  </h2>

                  <p className="al-text mt-5">{archetype.description}</p>

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