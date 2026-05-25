import ElementalSigils from "./components/ElementalSigils"
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
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.14),transparent_42%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(59,130,246,0.10),transparent_32%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(225,29,72,0.10),transparent_32%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,rgba(132,204,22,0.08),transparent_35%)]" />

  <div className="relative max-w-5xl mx-auto">
    <p className="uppercase tracking-[0.4em] text-gray-500 mb-6 text-sm">
      ArcheLoop™
    </p>

    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
      The patterns you repeat
      <br />
      are not random.
    </h1>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
      ArcheLoop helps you recognise emotional patterns, shadow loops,
      nervous system responses, and relational dynamics — so you can understand
      the loop, interrupt the pattern, and integrate the energy.
    </p>
 <div className="relative mx-auto mb-14 h-72 w-72 md:h-96 md:w-96">
  <div className="absolute inset-0 rounded-full border border-zinc-800 bg-black/40" />
  <div className="absolute inset-8 rounded-full border border-yellow-300/20 animate-[spin_40s_linear_infinite]" />
  <div className="absolute inset-16 rounded-full border border-zinc-700/60 animate-[spin_60s_linear_infinite_reverse]" />

  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,215,0,0.12),transparent_65%)] rounded-full" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.12),transparent_45%)] rounded-full" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(225,29,72,0.10),transparent_45%)] rounded-full" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(132,204,22,0.10),transparent_45%)] rounded-full" />

  {[
    ["/sigils/fire-sigil.png", "top-0 left-1/2 -translate-x-1/2", "Fire"],
    ["/sigils/air-sigil.png", "right-0 top-1/2 -translate-y-1/2", "Air"],
    ["/sigils/water-sigil.png", "bottom-0 left-1/2 -translate-x-1/2", "Water"],
    ["/sigils/earth-sigil.png", "left-0 top-1/2 -translate-y-1/2", "Earth"],
  ].map(([src, position, alt]) => (
    <div
      key={alt}
      className={`absolute ${position} h-20 w-20 md:h-24 md:w-24 rounded-full bg-black/70 border border-zinc-800 p-3 shadow-2xl animate-[float_8s_ease-in-out_infinite]`}
    >
      <Image
        src={src}
        alt={`${alt} sigil`}
        fill
        sizes="96px"
        className="object-contain p-2"
      />
    </div>
  ))}

  <div className="absolute left-1/2 top-1/2 h-32 w-32 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/25 bg-zinc-950 flex flex-col items-center justify-center shadow-2xl">
    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">
      ArcheLoop
    </p>
    <p className="text-yellow-300 font-semibold text-sm md:text-base">
      Inner System Map
    </p>
  </div>
</div>
    <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
      <a
        href="/assessment"
        className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
      >
        Identify Your Loop
      </a>

      <a
        href="/what-is-archeloop"
        className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
      >
        Explore the System
      </a>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
      {[
        "Shadow Loops",
        "Archetypes",
        "Nervous System",
        "Relational Dynamics",
        "Integration",
      ].map((item) => (
        <span
          key={item}
          className="border border-zinc-800 rounded-full px-4 py-2 bg-zinc-950/80"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-28 bg-[#0B1018] border-y border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Start Here
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        Understand the pattern.
        <br />
        Interrupt the loop.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        ArcheLoop helps you recognise recurring emotional patterns,
        archetypal adaptations, nervous system responses, and relational dynamics.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <a
        href="/triggered"
        className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] p-8 bg-black/60 hover:border-yellow-300/40 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-4">
            Immediate Check-In
          </p>

          <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
            I feel triggered right now
          </h3>

          <p className="text-gray-400 leading-relaxed mb-8">
            Use the guided check-in to identify what loop may be active in this moment.
          </p>

          <p className="text-yellow-300 font-semibold">
            Identify my loop →
          </p>
        </div>
      </a>

      <a
        href="/assessment"
        className="group relative overflow-hidden border border-yellow-300/25 rounded-[2rem] p-8 bg-gradient-to-b from-zinc-950 to-black hover:border-yellow-300/50 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_55%)]" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-4">
            ArcheLoop Assessment
          </p>

          <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
            Discover your dominant patterns
          </h3>

          <p className="text-gray-300 leading-relaxed mb-8">
            Explore your archetypal energies, shadow loops, emotional patterns,
            and integration pathways.
          </p>

          <p className="text-yellow-300 font-semibold">
            Take assessment →
          </p>
        </div>
      </a>

      <a
        href="/what-is-archeloop"
        className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] p-8 bg-black/60 hover:border-yellow-300/40 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-4">
            Explore The System
          </p>

          <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
            Learn how ArcheLoop works
          </h3>

          <p className="text-gray-400 leading-relaxed mb-8">
            Understand the elemental system, archetypes, shadow loops,
            relational dynamics, and nervous system patterns.
          </p>

          <p className="text-yellow-300 font-semibold">
            Explore ArcheLoop →
          </p>
        </div>
      </a>
    </div>
  </div>
</section>
<section className="px-6 py-28">
  <div className="max-w-5xl mx-auto text-center">

    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
      Emotional Recognition
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-8">
      Patterns often become visible
      <br />
      before they become changeable.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-16">
      ArcheLoop helps recognise recurring emotional, relational,
      behavioural, and nervous system patterns that may operate automatically
      beneath awareness.
    </p>

    <div className="grid md:grid-cols-2 gap-6 text-left">

      {[
        "Overthinking instead of moving forward",
        "Feeling emotionally overwhelmed or emotionally disconnected",
        "Seeking worth through achievement or validation",
        "Shutting down during pressure, conflict, or uncertainty",
        "Questioning your own perception or emotional reality",
        "Wanting connection while fearing vulnerability",
        "Repeating emotional patterns despite self-awareness",
        "Feeling trapped inside recurring relational dynamics",
      ].map((item) => (
        <div
          key={item}
          className="group border border-zinc-800 rounded-[2rem] p-7 bg-zinc-950 hover:border-yellow-300/25 transition-all duration-500"
        >
          <p className="text-lg text-gray-200 leading-relaxed group-hover:text-white transition">
            {item}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>

<section className="px-6 py-28">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-20">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        The Architecture of Shadow Loops
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        How Shadow Loops form
      </h2>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Shadow Loops form when an archetypal energy becomes suppressed,
        overused, or pulled into conflict with another part of the system.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-4">
            Suppression
          </p>

          <h3 className="text-3xl font-bold mb-5">
            A part of you goes underground.
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">
            An archetypal energy becomes hidden, blocked, or disallowed because
            it once felt unsafe to express.
          </p>

          <p className="text-gray-500 text-sm leading-relaxed">
            Example: visibility becomes unsafe, and Fire turns into Dimmed Light.
          </p>
        </div>
      </div>

      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-blue-400 text-sm mb-4">
            Compensation
          </p>

          <h3 className="text-3xl font-bold mb-5">
            Another pattern steps in to protect you.
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">
            When one energy feels unsafe or unavailable, another may become
            exaggerated to preserve worth, safety, control, or connection.
          </p>

          <p className="text-gray-500 text-sm leading-relaxed">
            Example: worth feels unsafe, and Fire becomes Paper Crown.
          </p>
        </div>
      </div>

      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,29,72,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.25em] text-rose-500 text-sm mb-4">
            Collision
          </p>

          <h3 className="text-3xl font-bold mb-5">
            Two inner truths pull against each other.
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6">
            Multiple energies become active at once, but they do not yet move
            together. This can create overwhelm, hesitation, confusion, or paralysis.
          </p>

          <p className="text-gray-500 text-sm leading-relaxed">
            Example: desire wants movement, but fear interrupts action.
          </p>
        </div>
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

<section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
  <div className="max-w-5xl mx-auto text-center">

    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
      The ArcheLoop Method
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-8">
      Notice the loop.
      <br />
      Interrupt the pattern.
      <br />
      Integrate the energy.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-20">
      ArcheLoop helps move unconscious reactions into awareness by mapping
      emotional patterns, nervous system responses, relational dynamics,
      and archetypal adaptations.
    </p>

    <div className="grid md:grid-cols-5 gap-5">

      {[
        [
          "01",
          "Notice",
          "What became activated?",
        ],
        [
          "02",
          "Map",
          "Where did the response appear in the body, emotions, or mind?",
        ],
        [
          "03",
          "Understand",
          "What loop, protection, or adaptation began forming?",
        ],
        [
          "04",
          "Interrupt",
          "What action stops reinforcing the pattern?",
        ],
        [
          "05",
          "Integrate",
          "What healthy energy restores balance and movement?",
        ],
      ].map(([number, title, description]) => (
        <div
          key={title}
          className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-7 hover:border-yellow-300/40 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.06),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

          <div className="relative z-10">
            <p className="text-yellow-300 text-sm tracking-[0.25em] mb-5">
              {number}
            </p>

            <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition">
              {title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

<section className="px-6 py-28 bg-[#0B1018] border-y border-zinc-800">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Shadow Loops
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        The 12 patterns of unconscious repetition.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Shadow Loops are recurring emotional and behavioural patterns that may
        activate under stress, pressure, conflict, or relational intensity.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-5">
      {loops.map(([icon, title, type]) => (
        <a
          key={title}
          href={`/loops/${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] p-4 bg-gradient-to-b from-zinc-950 to-black hover:border-yellow-300/40 transition-all duration-500 block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.07),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

          <div className="relative z-10">
            <div className="relative h-44 rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-950 border border-zinc-800">
              <Image
                src={icon}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-3">
              Shadow Loop
            </p>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-300 transition">
              {title}
            </h3>

            <p className="text-gray-400 leading-relaxed min-h-[3.5rem]">
              {type}
            </p>

            <div className="mt-6 text-yellow-300 font-semibold">
              Explore Loop →
            </div>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-28">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Body Map
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        The body remembers the loop.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Shadow Loops are not only thoughts. They can appear through posture,
        tension, breath, emotion, energy, and nervous system responses.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        [
          "Fire / Sovereign",
          "text-yellow-300",
          "Chest tightness, visibility anxiety, shame, collapsing posture, or fear of taking space.",
        ],
        [
          "Air / Magician",
          "text-blue-400",
          "Brain fog, overthinking, throat tightness, mental spirals, confusion, or disconnection from expression.",
        ],
        [
          "Water / Lover",
          "text-rose-500",
          "Emotional flooding, numbness, grief, heart ache, overwhelm, longing, or difficulty staying emotionally present.",
        ],
        [
          "Earth / Warrior",
          "text-lime-400",
          "Jaw tension, heavy legs, exhaustion, guardedness, collapse, survival fatigue, or difficulty grounding.",
        ],
      ].map(([title, colour, description]) => (
        <div
          key={title}
          className="group border border-zinc-800 rounded-[2rem] p-8 bg-gradient-to-b from-zinc-950 to-black hover:border-yellow-300/30 transition-all duration-500"
        >
          <h3 className={`text-3xl font-bold mb-5 ${colour}`}>
            {title}
          </h3>

          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-36 text-center border-t border-zinc-800">
  <div className="max-w-4xl mx-auto">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
      Begin the Process
    </p>

    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
      The loop can only change
      <br />
      once it becomes visible.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed mb-14 max-w-2xl mx-auto">
      Identify the archetypal patterns, nervous system responses, and relational
      dynamics shaping your reactions. Then begin interrupting the loop with
      awareness and choice.
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
</section>

<section className="px-6 py-28 border-t border-zinc-800 bg-[#0B1018]">
  <div className="max-w-4xl mx-auto text-center">
    <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
      Join ArcheLoop
    </p>

    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
      Receive future tools,
      <br />
      reports, practices, and early access.
    </h2>

    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
      ArcheLoop is evolving into a deeper symbolic self-awareness system.
      Join the list for future releases, assessments, reports, and app updates.
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
<ElementalSigils />
      <Footer />
    </main>
  )
}