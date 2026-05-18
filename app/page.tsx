import Footer from "./components/Footer"
import Nav from "./components/Nav"
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
      <Nav />

      <section className="relative overflow-hidden px-6 py-40 text-center">

  {/* Atmospheric background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,140,0.12),transparent_45%)]" />

  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.7))]" />

  {/* Mist / glow */}
  <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-200/10 blur-3xl rounded-full" />

  <div className="relative z-10 max-w-5xl mx-auto">

    <p className="uppercase tracking-[0.4em] text-gray-500 mb-6">
      ArcheLoop™
    </p>

    <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] mb-8">
      Break unconscious
      <span className="block text-yellow-300">
        shadow loops
      </span>
      before they keep
      repeating your life
    </h1>

    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
      A symbolic self-awareness system for recognising recurring emotional,
      behavioural, nervous system, and archetypal patterns.
    </p>

    <div className="flex flex-wrap justify-center gap-5">

      <a
        href="/assessment"
        className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
      >
        Discover Your Shadow Loop
      </a>

      <a
        href="/what-is-archeloop"
        className="border border-zinc-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
      >
        What Is ArcheLoop?
      </a>

    </div>

    <div className="mt-20 flex flex-wrap justify-center gap-6 text-sm uppercase tracking-[0.2em] text-gray-500">

      <span>Shadow Work</span>
      <span>Archetypes</span>
      <span>Nervous System</span>
      <span>Somatics</span>
      <span>Symbolic Psychology</span>

    </div>
  </div>
</section>
<section className="px-6 py-28">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-20">
      <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
        The Architecture of Shadow Loops
      </p>

      <h2 className="text-5xl md:text-6xl font-bold mb-8">
        How Shadow Loops Form
      </h2>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        ArcheLoop is built around the idea that recurring emotional and behavioural
        patterns emerge through interactions between archetypal energies.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Suppression */}
      <div className="relative overflow-hidden border border-zinc-800 rounded-3xl bg-zinc-950 p-10 hover:border-yellow-300/40 transition">

        <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300/5 blur-3xl rounded-full" />

        <p className="uppercase tracking-[0.2em] text-yellow-300 mb-4">
          Suppression
        </p>

        <h3 className="text-3xl font-bold mb-6">
          “This part of me is not allowed.”
        </h3>

        <p className="text-gray-300 leading-relaxed mb-6">
          One archetypal energy becomes dominant while another collapses,
          disconnects, or goes underground.
        </p>

        <p className="text-gray-500 text-sm leading-relaxed">
          Example: Air suppressing Fire → Dimmed Light Loop
        </p>
      </div>

      {/* Compensation */}
      <div className="relative overflow-hidden border border-zinc-800 rounded-3xl bg-zinc-950 p-10 hover:border-blue-300/40 transition">

        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300/5 blur-3xl rounded-full" />

        <p className="uppercase tracking-[0.2em] text-blue-300 mb-4">
          Compensation
        </p>

        <h3 className="text-3xl font-bold mb-6">
          “I must become something else to survive.”
        </h3>

        <p className="text-gray-300 leading-relaxed mb-6">
          A collapsed archetype borrows another energy in order to feel safe,
          worthy, powerful, loved, or accepted.
        </p>

        <p className="text-gray-500 text-sm leading-relaxed">
          Example: Collapsed Fire compensating through Air → Paper Crown Loop
        </p>
      </div>

      {/* Collision */}
      <div className="relative overflow-hidden border border-zinc-800 rounded-3xl bg-zinc-950 p-10 hover:border-red-300/40 transition">

        <div className="absolute top-0 right-0 w-40 h-40 bg-red-300/5 blur-3xl rounded-full" />

        <p className="uppercase tracking-[0.2em] text-red-300 mb-4">
          Collision
        </p>

        <h3 className="text-3xl font-bold mb-6">
          “Two truths pull me in opposite directions.”
        </h3>

        <p className="text-gray-300 leading-relaxed mb-6">
          Multiple archetypal energies become activated simultaneously without
          integration, creating paralysis, overwhelm, confusion, or inner conflict.
        </p>

        <p className="text-gray-500 text-sm leading-relaxed">
          Example: Fire colliding with Air → Stalled Flame / Mind Maze dynamics
        </p>
      </div>

    </div>
  </div>
</section>
      
     <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

  {/* Fire */}
  <a
    href="/archetypes/sovereign"
    className="group relative overflow-hidden border border-yellow-300/20 rounded-3xl bg-zinc-950 p-10 hover:border-yellow-300/50 transition duration-300"
  >
    <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-300/10 blur-3xl rounded-full group-hover:scale-125 transition duration-500" />

    <p className="uppercase tracking-[0.3em] text-yellow-300 mb-4">
      Fire Archetype
    </p>

    <h3 className="text-5xl font-bold mb-6">
      Sovereign
    </h3>

    <p className="text-gray-300 text-lg leading-relaxed mb-8">
      Visibility, agency, self-worth, leadership, direction, and permission to exist fully.
    </p>

    <p className="text-yellow-300 font-semibold">
      Explore Sovereign →
    </p>
  </a>

  {/* Air */}
  <a
    href="/archetypes/magician"
    className="group relative overflow-hidden border border-blue-300/20 rounded-3xl bg-zinc-950 p-10 hover:border-blue-300/50 transition duration-300"
  >
    <div className="absolute top-0 right-0 w-56 h-56 bg-blue-300/10 blur-3xl rounded-full group-hover:scale-125 transition duration-500" />

    <p className="uppercase tracking-[0.3em] text-blue-300 mb-4">
      Air Archetype
    </p>

    <h3 className="text-5xl font-bold mb-6">
      Magician
    </h3>

    <p className="text-gray-300 text-lg leading-relaxed mb-8">
      Perception, meaning, thought, interpretation, symbolic awareness, and mental clarity.
    </p>

    <p className="text-blue-300 font-semibold">
      Explore Magician →
    </p>
  </a>

  {/* Water */}
  <a
    href="/archetypes/lover"
    className="group relative overflow-hidden border border-red-300/20 rounded-3xl bg-zinc-950 p-10 hover:border-red-300/50 transition duration-300"
  >
    <div className="absolute top-0 right-0 w-56 h-56 bg-red-300/10 blur-3xl rounded-full group-hover:scale-125 transition duration-500" />

    <p className="uppercase tracking-[0.3em] text-red-300 mb-4">
      Water Archetype
    </p>

    <h3 className="text-5xl font-bold mb-6">
      Lover
    </h3>

    <p className="text-gray-300 text-lg leading-relaxed mb-8">
      Emotion, intimacy, creativity, attachment, longing, sensitivity, and connection.
    </p>

    <p className="text-red-300 font-semibold">
      Explore Lover →
    </p>
  </a>

  {/* Earth */}
  <a
    href="/archetypes/warrior"
    className="group relative overflow-hidden border border-green-400/20 rounded-3xl bg-zinc-950 p-10 hover:border-green-400/50 transition duration-300"
  >
    <div className="absolute top-0 right-0 w-56 h-56 bg-green-400/10 blur-3xl rounded-full group-hover:scale-125 transition duration-500" />

    <p className="uppercase tracking-[0.3em] text-green-400 mb-4">
      Earth Archetype
    </p>

    <h3 className="text-5xl font-bold mb-6">
      Warrior
    </h3>

    <p className="text-gray-300 text-lg leading-relaxed mb-8">
      Boundaries, grounded action, protection, discipline, survival, and structure.
    </p>

    <p className="text-green-400 font-semibold">
      Explore Warrior →
    </p>
  </a>

</div>
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
      <Footer />
    </main>
  )
}