export default function Home() {
  const archetypes = [
    {
      name: "Sovereign",
      icon: "👑",
      element: "Fire",
      colour: "border-yellow-400",
      description:
        "The Sovereign governs identity, visibility, self-worth, leadership, and permission to exist fully.",
      healthy:
        "Healthy Fire creates grounded confidence, self-trust, purpose, and visibility.",
      shadow:
        "Distorted Fire may shrink into shame, overcompensate through status, or freeze before action.",
      body:
        "Solar plexus, chest tension, visibility anxiety, collapsed posture.",
    },
    {
      name: "Magician",
      icon: "🪞",
      element: "Air",
      colour: "border-blue-400",
      description:
        "The Magician governs perception, language, insight, interpretation, and mental clarity.",
      healthy:
        "Healthy Air creates clarity, understanding, insight, and trusted thinking.",
      shadow:
        "Distorted Air may overthink, rationalise reality, mentally freeze, or spiral into confusion.",
      body:
        "Head pressure, foggy thinking, throat tightness, dissociation, mental loops.",
    },
    {
      name: "Lover",
      icon: "❤️",
      element: "Water",
      colour: "border-red-400",
      description:
        "The Lover governs emotion, connection, intimacy, grief, beauty, and emotional openness.",
      healthy:
        "Healthy Water creates emotional flow, vulnerability, intimacy, and authentic connection.",
      shadow:
        "Distorted Water may suppress feelings, escape into fantasy, or become emotionally overwhelmed.",
      body:
        "Chest heaviness, emotional flooding, numbness, heart ache, belly sensitivity.",
    },
    {
      name: "Warrior",
      icon: "🛡️",
      element: "Earth",
      colour: "border-green-500",
      description:
        "The Warrior governs boundaries, protection, grounded action, discipline, and survival.",
      healthy:
        "Healthy Earth creates grounded strength, consistency, boundaries, and protection.",
      shadow:
        "Distorted Earth may collapse into compliance, build rigid walls, or endure exhaustion silently.",
      body:
        "Heavy legs, jaw tension, chronic exhaustion, rigidity, frozen action.",
    },
  ]

  const loops = [
    ["🔥", "Dimmed Light", "Suppressed Fire"],
    ["🔥", "Paper Crown", "Inflated Fire"],
    ["🔥", "Stalled Flame", "Colliding Fire"],
    ["🌬", "Blank Page", "Suppressed Air"],
    ["🌬", "Smoky Mirrors", "Inflated Air"],
    ["🌬", "Mind Maze", "Colliding Air"],
    ["🌊", "Emotional Lockdown", "Suppressed Water"],
    ["🌊", "Fantasy Fog", "Inflated Water"],
    ["🌊", "Flooded Waters", "Colliding Water"],
    ["🌱", "Compliance", "Suppressed Earth"],
    ["🌱", "Fortress", "Inflated Earth"],
    ["🌱", "Barren Ground", "Colliding Earth"],
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
</a><a href="/archetype-interactions" className="hover:text-yellow-300">
  Interactions
</a>
      </nav>

      <section className="text-center px-6 py-32">
        <p className="uppercase tracking-[0.3em] text-gray-400 mb-5">
          ArcheLoop™
        </p>

        <h1 className="text-6xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight mb-8">
          Break unconscious patterns before they keep repeating your life
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          ArcheLoop combines archetypes, shadow work, nervous system states,
          somatic awareness, and elemental psychology into one integration system.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/assessment"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:opacity-80"
          >
            Take Assessment
          </a>

          <a
            href="/triggered"
            className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black"
          >
            I Am Triggered
          </a>
        </div>
      </section>

      <section className="px-6 py-24 bg-zinc-950 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-10">
            How Shadow Loops Form
          </h2>

          <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16">
            Every archetype has a healthy expression. But under stress,
            conditioning, shame, fear, or survival pressure, that energy can become distorted.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-green-400">
                Healthy
              </h3>
              <p className="text-gray-300">
                The archetype flows naturally. Energy feels integrated, grounded,
                emotionally regulated, and authentic.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-yellow-300">
                Suppressed
              </h3>
              <p className="text-gray-300">
                Energy collapses inward through fear, shame, freezing,
                hiding, emotional shutdown, or self-suppression.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-red-400">
                Inflated
              </h3>
              <p className="text-gray-300">
                Energy compensates outward through performance, control,
                fantasy, perfectionism, walls, or overcompensation.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                Collision
              </h3>
              <p className="text-gray-300">
                Opposing energies clash internally, creating paralysis,
                overwhelm, looping thoughts, emotional flooding, or exhaustion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <h2 className="text-5xl font-bold text-center mb-16">
          The Four Archetypes
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {archetypes.map((item) => (
            <a
              key={item.name}
              href={`/archetypes/${item.name.toLowerCase()}`}
              className={`border ${item.colour} rounded-3xl p-8 bg-zinc-950 hover:scale-[1.02] transition-transform block`}
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold mb-3">
                {item.name}
              </h3>

              <p className="text-gray-400 mb-6">
                {item.element} Element
              </p>

              <p className="text-gray-300 mb-5">
                {item.description}
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-green-400 mb-1">
                    Healthy Expression
                  </p>
                  <p className="text-gray-300">
                    {item.healthy}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-red-400 mb-1">
                    Shadow Expression
                  </p>
                  <p className="text-gray-300">
                    {item.shadow}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-yellow-300 mb-1">
                    Somatic Signals
                  </p>
                  <p className="text-gray-300">
                    {item.body}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-yellow-300 font-semibold">
                Explore Archetype →
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 bg-zinc-950 border-y border-zinc-800">
        <h2 className="text-5xl font-bold text-center mb-6">
          The 12 Shadow Loops
        </h2>

        <p className="text-center text-gray-300 max-w-3xl mx-auto mb-16">
          Each loop reflects a repeated nervous system pattern connected
          to an archetype and elemental distortion.
        </p>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {loops.map(([icon, title, type]) => (
            <a
              key={title}
              href={`/loops/${title.toLowerCase().replace(/\s+/g, "-")}`}
              className="border border-zinc-700 rounded-2xl p-6 bg-black hover:scale-[1.02] transition-transform block"
            >
              <div className="text-4xl mb-4">
                {icon}
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {title}
              </h3>

              <p className="text-gray-400">
                {type}
              </p>

              <div className="mt-5 text-yellow-300 font-semibold">
                Explore Loop →
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">
            Your Body Remembers the Loop
          </h2>

          <p className="text-xl text-gray-300 mb-14">
            Shadow loops are not just thoughts. They also appear through
            the nervous system, emotions, posture, tension, and body sensations.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-300">
                Air / Magician
              </h3>
              <p className="text-gray-300">
                Brain fog, headaches, overthinking, throat tightness,
                mental spirals, dissociation, confusion.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                Fire / Sovereign
              </h3>
              <p className="text-gray-300">
                Chest tightness, shame, visibility anxiety,
                collapsing posture, fear of taking space.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-red-400">
                Water / Lover
              </h3>
              <p className="text-gray-300">
                Emotional flooding, numbness, grief,
                heart ache, emotional overwhelm, longing.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-400">
                Earth / Warrior
              </h3>
              <p className="text-gray-300">
                Heavy legs, exhaustion, jaw tension,
                hyper-vigilance, collapse, survival fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center px-6 py-32 bg-zinc-950 border-t border-zinc-800">
        <h2 className="text-5xl font-bold mb-8">
          Start breaking the loop
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Discover which archetypal energies are healthy, suppressed,
          inflated, or colliding inside your nervous system.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/assessment"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:opacity-80"
          >
            Take Assessment
          </a>

          <a
            href="/triggered"
            className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black"
          >
            I Am Triggered
          </a>

          <a
            href="/practices"
            className="border border-yellow-400 text-yellow-300 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
          >
            Explore Practices
          </a>
        </div>
      </section>
    </main>
  )
}