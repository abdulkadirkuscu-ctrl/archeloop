import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import Image from "next/image";

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
];

export const metadata: Metadata = {
  title: "ArcheLoop Body Map",
  description:
    "Explore how Shadow Loops can appear through body sensations, nervous system shifts, emotions, and relational patterns.",
};

export default function BodyMapPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-14">
          <div className="al-hero-card text-center">
            <p className="al-kicker">Somatic Awareness</p>

            <h1 className="al-heading-xl">The ArcheLoop Body Map</h1>

            <p className="al-text-lg mx-auto mt-8 max-w-4xl">
              Shadow Loops are not only thoughts. They can appear through body
              sensations, nervous system shifts, emotional responses, and
              relational patterns.
            </p>
          </div>

          <div className="al-card mx-auto max-w-4xl overflow-hidden p-4">
            <Image
              src="/images/body-map/body-map-main.png"
              alt="ArcheLoop Body Map"
              width={1400}
              height={1800}
              priority
              className="w-full rounded-[2rem] object-cover"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {mappings.map((item) => (
              <div key={item.archetype} className="al-card overflow-hidden">
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
                  <p className="al-kicker">{item.element} Element</p>

                  <h2 className="mt-3 text-4xl font-bold text-[var(--al-accent)]">
                    {item.archetype}
                  </h2>

                  <p className="mt-4 text-lg font-semibold text-[var(--al-accent)]">
                    {item.area}
                  </p>

                  <p className="al-text-lg mt-5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="al-premium-card mx-auto max-w-5xl p-10 text-center">
            <h2 className="al-heading-lg">
              The body often recognises the loop before the mind does.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              ArcheLoop uses body awareness to help you recognise triggers,
              nervous system shifts, and recurring patterns before they fully
              take over.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}