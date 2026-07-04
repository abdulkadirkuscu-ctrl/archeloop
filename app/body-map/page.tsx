import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-14">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Somatic Awareness
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              The ArcheLoop Body Map
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-xl leading-relaxed text-stone-300">
              Shadow Loops are not only thoughts. They can appear through body
sensations, nervous system shifts, emotional responses, and
relational patterns.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-4 shadow-[0_0_60px_rgba(216,183,120,0.06)]">
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
              <div
                key={item.archetype}
                className="overflow-hidden rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] shadow-[0_0_45px_rgba(216,183,120,0.05)]"
              >
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
                  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                    {item.element} Element
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-yellow-300">
                    {item.archetype}
                  </h2>

                  <p className="mt-4 text-lg text-yellow-300/80">
                    {item.area}
                  </p>

                  <p className="mt-5 text-lg leading-relaxed text-stone-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              The body often recognises the loop before the mind does.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop uses body awareness to help you recognise triggers,
nervous system shifts, and recurring patterns before they fully take over.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}