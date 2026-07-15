import PageShell from "../components/PageShell";

export default function ArchetypeInteractionsPage() {
  const interactions = [
    {
      title: "Magician ↔ Sovereign",
      healthy:
        "Healthy Air helps Fire gain perspective, insight, strategy, reflection, and wisdom. The Magician becomes the trusted advisor to the Sovereign.",
      shadow:
        "Distorted Air may provoke Fire through ambiguity, mockery, intellectual superiority, criticism, or subtle invalidation. Distorted Fire may suppress Air through ego, dominance, or refusal to listen.",
      loops:
        "This pairing may create Mind Maze, Dimmed Light, Smoky Mirrors, or Paper Crown loops.",
      dynamic:
        "Air can destabilise Fire through uncertainty. Fire may seek Air for clarity when self-trust collapses.",
    },
    {
      title: "Lover ↔ Warrior",
      healthy:
        "Healthy Earth protects Water safely. Healthy Water softens Earth and restores emotional connection, intimacy, and nourishment.",
      shadow:
        "Distorted Warrior may become emotionally unavailable, rigid, controlling, or defensive. Distorted Lover may overwhelm, emotionally flood, collapse boundaries, or seek rescue.",
      loops:
        "This pairing may create Fortress, Compliance, Flooded Waters, or Emotional Lockdown loops.",
      dynamic:
        "Water often seeks Earth for protection. Earth may seek Water to reconnect with emotion and softness.",
    },
    {
      title: "Magician ↔ Warrior",
      healthy:
        "Healthy Air gives Earth strategy, adaptability, planning, and perception. Healthy Earth grounds Air into action and embodiment.",
      shadow:
        "Distorted Air may provoke Earth indirectly through sarcasm, ambiguity, avoidance, or endless theorising. Distorted Earth may reject Air through rigidity or aggressive certainty.",
      loops:
        "This pairing commonly creates Mind Maze, Blank Page, Fortress, or Barren Ground loops.",
      dynamic:
        "Air may struggle to act. Earth may struggle to reflect. Together they either stabilise each other or intensify internal conflict.",
    },
    {
      title: "Sovereign ↔ Lover",
      healthy:
        "Healthy Fire gives Water confidence, warmth, permission, and direction. Healthy Water gives Fire emotional depth, tenderness, beauty, and humanity.",
      shadow:
        "Distorted Fire may dominate or invalidate emotional vulnerability. Distorted Water may collapse identity through emotional dependency or longing.",
      loops:
        "This pairing may create Dimmed Light, Fantasy Fog, Flooded Waters, or Paper Crown loops.",
      dynamic:
        "Water often seeks Fire for certainty and direction. Fire may seek Water for emotional meaning and connection.",
    },
    {
      title: "Outsourcing Archetypal Energy",
      healthy:
        "People naturally learn from archetypes they admire. Healthy relationships help integrate undeveloped energy safely.",
      shadow:
        "When an archetype becomes deeply suppressed, people may unconsciously seek others to carry that energy for them instead of developing it internally.",
      loops:
        "Collapse in Air may seek external Magicians. Lower Fire availability may attach to dominant Sovereigns. Collapse in Warrior may seek protectors instead of boundaries.",
      dynamic:
        "Projection creates temporary relief but long-term dependency if the energy is never integrated internally.",
    },
  ];

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide">
          <p className="al-kicker">Archetypal Dynamics</p>

          <h1 className="al-heading-xl">Archetype Interactions</h1>

          <p className="al-text-lg mt-8 max-w-4xl">
            Archetypes do not exist in isolation.
            Different energies attract, stabilise, provoke,
            suppress, challenge, or compensate for one another.
            Many shadow loops form relationally through these interactions.
          </p>

          <div className="mt-16 space-y-10">
            {interactions.map((interaction) => (
              <div key={interaction.title} className="al-card p-8">
                <h2 className="al-heading-md">
                  {interaction.title}
                </h2>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-2xl font-semibold text-[var(--al-accent)]">
                      Healthy Dynamic
                    </h3>

                    <p className="al-text-lg">
                      {interaction.healthy}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-2xl font-semibold text-[var(--al-accent)]">
                      Shadow Dynamic
                    </h3>

                    <p className="al-text-lg">
                      {interaction.shadow}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-2">
                  <div className="al-soft-card p-6">
                    <h3 className="mb-4 text-2xl font-semibold">
                      Common Loops
                    </h3>

                    <p className="al-text">
                      {interaction.loops}
                    </p>
                  </div>

                  <div className="al-soft-card p-6">
                    <h3 className="mb-4 text-2xl font-semibold">
                      Core Dynamic
                    </h3>

                    <p className="al-text">
                      {interaction.dynamic}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <a href="/assessment" className="al-button-primary">
              Take Assessment
            </a>

            <a href="/triggered" className="al-button-secondary">
              I Am Triggered
            </a>

            <a href="/" className="al-button-secondary">
              Return Home
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}