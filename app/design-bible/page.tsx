import PageShell from "../components/PageShell";

const foundations = [
  ["Night", "#070B12", "Depth, shadow, inner world"],
  ["Mist", "#121A26", "Transition, reflection, atmosphere"],
  ["Dawn", "#243248", "Emergence, integration, movement"],
  ["Light", "#F5F1E8", "Clarity, consciousness, readability"],
  ["Consciousness", "#D8B778", "Insight, awareness, signal"],
  ["Stone", "#D8D3C7", "Grounding, structure, calm"],
];

const archetypes = [
  ["Fire", "Sovereign", "#D8B778", "Visibility, worth, leadership"],
  ["Air", "Magician", "#8FA5C8", "Clarity, perception, meaning"],
  ["Water", "Lover", "#5E8FA3", "Emotion, connection, flow"],
  ["Earth", "Warrior", "#65705D", "Boundaries, safety, action"],
];

const principles = [
  "Understand • Interrupt • Integrate",
  "You are not the loop.",
  "Awareness is the beginning of integration.",
  "The trigger is the messenger.",
  "The loop is the pattern.",
  "The journey is the integration.",
];

export default function ArcheLoopUniversePage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-14">
          <div className="al-hero-card">
            <p className="al-kicker">ArcheLoop Universe</p>

            <h1 className="al-heading-xl">
              The visual and symbolic language of ArcheLoop.
            </h1>

            <p className="al-text-lg mx-auto mt-8 max-w-4xl">
              This page documents the foundations of the ArcheLoop design
              system: colour, atmosphere, archetypal accents, typography,
              language, and reusable UI direction.
            </p>
          </div>

          <section className="al-card p-8">
            <p className="al-kicker">Core Philosophy</p>

            <h2 className="al-heading-lg">
              Understand. Interrupt. Integrate.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item} className="al-soft-card p-5">
                  <p className="text-xl font-semibold text-[var(--al-accent)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="al-card p-8">
            <p className="al-kicker">Foundation Palette</p>

            <h2 className="al-heading-lg">States of consciousness.</h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {foundations.map(([name, hex, meaning]) => (
                <div key={name} className="al-soft-card overflow-hidden">
                  <div
                    className="h-28"
                    style={{ backgroundColor: hex }}
                  />

                  <div className="p-5">
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="al-muted mt-1 text-sm">{hex}</p>
                    <p className="al-text mt-4">{meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="al-card p-8">
            <p className="al-kicker">Archetypal Accents</p>

            <h2 className="al-heading-lg">
              Four energies, four visual signals.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {archetypes.map(([element, archetype, hex, meaning]) => (
                <div key={element} className="al-soft-card p-5">
                  <div
                    className="mb-5 h-16 w-16 rounded-full"
                    style={{ backgroundColor: hex }}
                  />

                  <p className="al-kicker">{element}</p>

                  <h3 className="mt-3 text-2xl font-bold">
                    {archetype}
                  </h3>

                  <p className="al-text mt-4">{meaning}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="al-premium-card p-10">
            <p className="al-kicker">Design Direction</p>

            <h2 className="al-heading-lg">
              Premium, symbolic, calm, and alive.
            </h2>

            <p className="al-text-lg mt-6 max-w-4xl">
              ArcheLoop should feel like a serious self-awareness system, not a
              generic wellness brand. The design language combines depth,
              elegance, symbolic meaning, and clarity. It should feel grounded
              enough to trust, beautiful enough to remember, and simple enough
              to use every day.
            </p>
          </section>
        </div>
      </section>
    </PageShell>
  );
}