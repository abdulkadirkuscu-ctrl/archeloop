import Image from "next/image"
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
  ["/images/elements/fire.png", "Dimmed Light", "You shrink your visibility to feel safe."],
  ["/images/elements/fire.png", "Paper Crown", "Your worth becomes tied to performance."],
  ["/images/elements/fire.png", "Stalled Flame", "You hesitate to fully commit or act."],

  ["/images/elements/air.png", "Blank Page", "You freeze when trying to express yourself."],
  ["/images/elements/air.png", "Smoky Mirrors", "You lose trust in your own perception."],
  ["/images/elements/air.png", "Mind Maze", "You become trapped in overthinking."],

  ["/images/elements/water.png", "Emotional Lockdown", "You disconnect from emotion to stay safe."],
  ["/images/elements/water.png", "Fantasy Fog", "You escape reality through imagination or fantasy."],
  ["/images/elements/water.png", "Flooded Waters", "Your emotions become overwhelming and consuming."],

  ["/images/elements/earth.png", "Compliance", "You abandon yourself to maintain safety or approval."],
  ["/images/elements/earth.png", "Fortress", "You protect yourself by shutting people out."],
  ["/images/elements/earth.png", "Barren Ground", "You feel emotionally disconnected and depleted."],
]
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-36 text-center">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,100,0.12),transparent_45%)]" />

  <div className="relative max-w-5xl mx-auto">

    <p className="uppercase tracking-[0.4em] text-gray-500 mb-6 text-sm">
      ArcheLoop™
    </p>

    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
      Identify the Shadow Loops
      <br />
      you keep repeating.
    </h1>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
      ArcheLoop helps you recognise emotional patterns,
      nervous system responses, and relational dynamics —
      so you can interrupt the loop instead of repeating it.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-5 mb-16">

      <a
        href="/assessment"
        className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
      >
        Identify Your Loop
      </a>

      <a
        href="/triggered"
        className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
      >
        I Am Triggered
      </a>

    </div>

    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">

      {[
        "Shadow Work",
        "Nervous System",
        "Relational Dynamics",
        "Somatics",
        "Archetypes",
      ].map((item) => (
        <span
          key={item}
          className="border border-zinc-800 rounded-full px-4 py-2 bg-zinc-950"
        >
          {item}
        </span>
      ))}

    </div>

  </div>
</section>

<section className="px-6 py-24 bg-[#0B1018] border-y border-zinc-800">
  <div className="max-w-6xl mx-auto text-center">
    <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
      Start Here
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-12">
      Where should you begin?
    </h2>

    <div className="grid md:grid-cols-3 gap-6 text-left">
      <a
        href="/triggered"
        className="group border border-zinc-800 rounded-3xl p-8 bg-black/60 hover:border-yellow-300/50 transition"
      >
        <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-300 transition">
          I feel triggered right now
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6">
          Use the guided check-in to identify what loop may be active in this moment.
        </p>
        <p className="text-yellow-300 font-semibold">Identify my loop →</p>
      </a>

      <a
        href="/assessment"
        className="group border border-zinc-800 rounded-3xl p-8 bg-black/60 hover:border-yellow-300/50 transition"
      >
        <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-300 transition">
          I want to understand my patterns
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6">
          Take the assessment to explore your dominant archetypal and shadow-loop patterns.
        </p>
        <p className="text-yellow-300 font-semibold">Take assessment →</p>
      </a>

      <a
        href="/what-is-archeloop"
        className="group border border-zinc-800 rounded-3xl p-8 bg-black/60 hover:border-yellow-300/50 transition"
      >
        <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-300 transition">
          I want to explore the system
        </h3>
        <p className="text-gray-400 leading-relaxed mb-6">
          Learn how ArcheLoop maps archetypes, nervous system responses, and relational dynamics.
        </p>
        <p className="text-yellow-300 font-semibold">Explore ArcheLoop →</p>
      </a>
    </div>
  </div>
</section>
<section className="px-6 py-24">
  <div className="max-w-5xl mx-auto text-center">

    <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
      Emotional Recognition
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-8">
      You may recognise yourself in…
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-14">
      ArcheLoop is designed to help recognise recurring emotional,
      relational, and nervous system patterns that often operate automatically.
    </p>

    <div className="grid md:grid-cols-2 gap-6 text-left">

      {[
        "Overthinking instead of acting",
        "Feeling emotionally flooded or emotionally numb",
        "Seeking validation through achievement or performance",
        "Shutting down during conflict or pressure",
        "Losing trust in your own perception",
        "Wanting connection but fearing vulnerability",
        "Feeling trapped in recurring emotional patterns",
        "Repeating relationship dynamics despite awareness",
      ].map((item) => (
        <div
          key={item}
          className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
        >
          <p className="text-lg text-gray-200 leading-relaxed">
            • {item}
          </p>
        </div>
      ))}

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

<section className="w-full px-6 py-24 border-y border-zinc-800 bg-black">
  <div className="max-w-6xl mx-auto text-center">
    <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
      The ArcheLoop Method
    </p>

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Notice the loop. Interrupt the pattern. Integrate the energy.
    </h2>

    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed">
      ArcheLoop helps you move from automatic reaction to conscious choice
      by mapping what gets activated in your body, emotions, relationships,
      and behaviour.
    </p>

    <div className="grid md:grid-cols-5 gap-5 text-left">
      {[
        ["1", "Notice", "What became activated?"],
        ["2", "Map", "Where did you feel it in the body?"],
        ["3", "Understand", "What loop started forming?"],
        ["4", "Interrupt", "What action stops reinforcing it?"],
        ["5", "Integrate", "What healthy energy restores balance?"],
      ].map(([number, title, text]) => (
        <div
          key={title}
          className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
        >
          <p className="text-yellow-300 text-3xl font-bold mb-4">
            {number}
          </p>

          <h3 className="text-xl font-bold mb-3">
            {title}
          </h3>

          <p className="text-gray-400 leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-28 bg-zinc-950 border-y border-zinc-800">
  <h2 className="text-5xl font-bold text-center mb-6">
    The 12 Shadow Loops
  </h2>

  <p className="text-center text-gray-300 max-w-3xl mx-auto mb-16">
    Shadow Loops are repeating emotional patterns we enter under
    stress, pressure, conflict, or emotional overwhelm.
  </p>

        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {loops.map(([icon, title, type]) => (
            <a
              key={title}
              href={`/loops/${title.toLowerCase().replace(/\s+/g, "-")}`}
             className="group border border-zinc-800 rounded-3xl p-4 bg-black/80 hover:border-yellow-300/40 hover:scale-[1.02] transition-all duration-300 block overflow-hidden shadow-lg"
            >
<div className="relative h-40 rounded-2xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-800">
 <Image
  src={icon}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
/>
</div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-300 transition">
                {title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
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

     <section className="px-6 py-36 text-center">
  <div className="max-w-4xl mx-auto">

    <p className="uppercase tracking-[0.3em] text-gray-500 mb-5">
      Begin the Process
    </p>

    <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
      The loop can only change
      <br />
      once it becomes visible.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed mb-14 max-w-2xl mx-auto">
      Identify the archetypal patterns, nervous system responses,
      and relational dynamics shaping your reactions —
      and begin interrupting the loop consciously.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-5">

      <a
        href="/assessment"
        className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
      >
        Take Assessment
      </a>

      <a
        href="/triggered"
        className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
      >
        I Am Triggered
      </a>

    </div>

  </div>
  <section className="px-6 py-28 border-t border-zinc-800 bg-[#0B1018]">
  <div className="max-w-4xl mx-auto text-center">

    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
      Join ArcheLoop
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
      Receive future ArcheLoop tools,
      reports, practices, and early access.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
      ArcheLoop is evolving into a deeper symbolic self-awareness system.
      Join the mailing list for future releases, practices, assessments,
      reports, and app updates.
    </p>

    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-6">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 bg-black border border-zinc-700 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300"
      />

      <button
        type="submit"
        className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-200 transition"
      >
        Join ArcheLoop
      </button>
    </form>

    <p className="text-sm text-gray-500">
      No spam. Only meaningful updates, tools, and future releases.
    </p>

  </div>
</section>
</section>
      <Footer />
    </main>
  )
}