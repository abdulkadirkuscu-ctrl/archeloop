export default function ArchetypeInteractionsPage() {

  const interactions = [

    {
      title: "Magician ↔ Sovereign",
      colour: "border-blue-400",
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
      colour: "border-red-400",
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
      colour: "border-cyan-400",
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
      colour: "border-yellow-400",
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
      colour: "border-green-500",
      healthy:
        "People naturally learn from archetypes they admire. Healthy relationships help integrate undeveloped energy safely.",
      shadow:
        "When an archetype becomes deeply suppressed, people may unconsciously seek others to carry that energy for them instead of developing it internally.",
      loops:
        "Collapsed Air may seek external Magicians. Weak Fire may attach to dominant Sovereigns. Suppressed Warrior may seek protectors instead of boundaries.",
      dynamic:
        "Projection creates temporary relief but long-term dependency if the energy is never integrated internally.",
    },

  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-yellow-300">Home</a>
        <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
        <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-yellow-300">Practices</a>
        <a href="/nervous-system" className="hover:text-yellow-300">
          Nervous System
        </a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Archetypal Dynamics
          </p>

          <h1 className="text-6xl font-bold mb-8">
            Archetype Interactions
          </h1>

          <p className="text-xl text-gray-300 max-w-4xl mb-16">
            Archetypes do not exist in isolation.
            Different energies attract, stabilise, provoke,
            suppress, challenge, or compensate for one another.
            Many shadow loops form relationally through these interactions.
          </p>

          <div className="space-y-10">

            {interactions.map((interaction) => (
              <div
                key={interaction.title}
                className={`border ${interaction.colour} rounded-3xl p-8 bg-zinc-950`}
              >

                <h2 className="text-4xl font-bold mb-8">
                  {interaction.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-green-400">
                      Healthy Dynamic
                    </h3>

                    <p className="text-gray-300 text-lg">
                      {interaction.healthy}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-red-400">
                      Shadow Dynamic
                    </h3>

                    <p className="text-gray-300 text-lg">
                      {interaction.shadow}
                    </p>
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-8">

                  <div className="border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">
                      Common Loops
                    </h3>

                    <p className="text-gray-300">
                      {interaction.loops}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">
                      Core Dynamic
                    </h3>

                    <p className="text-gray-300">
                      {interaction.dynamic}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="flex gap-4 flex-wrap mt-16">

            <a
              href="/assessment"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Take Assessment
            </a>

            <a
              href="/triggered"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              I Am Triggered
            </a>

            <a
              href="/"
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Return Home
            </a>

          </div>

        </div>
      </section>
    </main>
  )
}