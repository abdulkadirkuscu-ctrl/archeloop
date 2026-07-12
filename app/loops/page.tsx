import type { Metadata } from "next";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Hero from "../../components/ui/Hero";
import Kicker from "../../components/ui/Kicker";
import PageTitle from "../../components/ui/PageTitle";
import PageIntro from "../../components/ui/PageIntro";
import SectionTitle from "../../components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "The 12 Shadow Loops",
  description:
    "Explore the 12 Shadow Loops inside ArcheLoop: recurring protective patterns connected to Fire, Air, Water, and Earth.",
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
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container-wide">
          <Hero>
            <Kicker>ArcheLoop</Kicker>

            <PageTitle>The 12 Shadow Loops</PageTitle>

            <PageIntro>
              Every recurring pattern has a name.{" "}
              <span className="al-shadow-word">Shadow Loops</span> are
              protective patterns your mind and nervous system may use when
              visibility, clarity, connection, or safety feels threatened.
            </PageIntro>

            <a href="/assessment" className="al-button-primary mt-10">
              Find My Loop
            </a>
          </Hero>

          <div className="al-page-gap space-y-20">
            {["Fire", "Air", "Water", "Earth"].map((element) => (
              <section key={element} className="al-premium-card p-6 sm:p-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <Kicker>Elemental Pattern</Kicker>

                    <SectionTitle className="text-[var(--al-accent)]">
                      {element} Loops
                    </SectionTitle>
                  </div>

                  <p className="al-text max-w-xl">
                    Explore the three Shadow Loops connected to this element and
                    archetype.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {loops
                    .filter((loop) => loop.element === element)
                    .map((loop) => (
                      <a
                        key={loop.slug}
                        href={`/loops/${loop.slug}`}
                        className="al-card group overflow-hidden transition duration-500 hover:-translate-y-1 hover:border-[var(--al-accent)]"
                      >
                        <div className="relative h-64 overflow-hidden sm:h-72">
                          <Image
                            src={loop.image}
                            alt={`${loop.name} Shadow Loop`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-6 sm:p-7">
                          <Kicker>Shadow Loop</Kicker>

                          <h3 className="mt-4 text-3xl font-bold transition group-hover:text-[var(--al-accent)]">
                            {loop.name}
                          </h3>

                          <p className="al-text mt-5">
                            {loop.description}
                          </p>

                          <p className="mt-8 font-semibold text-[var(--al-accent)]">
                            Explore Loop →
                          </p>
                        </div>
                      </a>
                    ))}
                </div>
              </section>
            ))}
          </div>

          <div className="al-page-gap text-center">
            <div className="al-cta-panel">
              <Kicker>Begin With Awareness</Kicker>

              <SectionTitle>
                Discover which{" "}
                <span className="al-shadow-word">Shadow Loop</span> is most
                active for you.
              </SectionTitle>

              <p className="al-text-lg mx-auto mt-6 max-w-3xl">
                Complete Find My Loop and receive your personalised ArcheLoop
                Report.
              </p>

              <a href="/assessment" className="al-button-primary mt-10">
                Find My Loop
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}