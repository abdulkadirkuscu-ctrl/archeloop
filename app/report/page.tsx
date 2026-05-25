import type { Metadata } from "next"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "ArcheLoop Report",
  description:
    "Explore the ArcheLoop Personal Pattern Report — a symbolic self-awareness profile mapping archetypes, shadow loops, nervous system patterns, and relational dynamics.",
}

const sections = [
  {
    title: "Archetype Map",
    description:
      "Explore which archetypal energies appear healthy, suppressed, inflated, or compensating inside your system.",
  },
  {
    title: "Shadow Loops",
    description:
      "Identify recurring emotional and behavioural patterns activated through stress, shame, conflict, pressure, or relational dynamics.",
  },
  {
    title: "Nervous System Patterns",
    description:
      "Understand how fight, flight, freeze, collapse, fawn, or hyper-vigilance may shape your reactions and protection strategies.",
  },
  {
    title: "Body Map",
    description:
      "Discover where emotional activation, suppression, tension, or overwhelm may appear physically within the body.",
  },
  {
    title: "Relational Dynamics",
    description:
      "Recognise attachment patterns, relational activators, protection mechanisms, and unconscious relational repetitions.",
  },
  {
    title: "Loop Breaking Practices",
    description:
      "Receive grounding practices, awareness prompts, and integration guidance designed to interrupt recurring loops.",
  },
]

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="relative overflow-hidden px-6 py-32 text-center border-b border-zinc-800">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.12),transparent_45%)]" />

        <div className="relative max-w-5xl mx-auto">

          <p className="uppercase tracking-[0.35em] text-gray-500 mb-6">
            ArcheLoop Report
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Your symbolic
            <br />
            self-awareness profile.
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            The ArcheLoop Personal Pattern Report maps archetypes,
            shadow loops, nervous system responses, relational dynamics,
            and behavioural patterns into a structured symbolic profile.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Take Assessment
            </a>

            <a
              href="/contact"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Contact ArcheLoop
            </a>

          </div>

        </div>
      </section>

      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-20">
            <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
              What The Report Includes
            </p>

            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              A deeper map of recurring patterns.
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              ArcheLoop combines symbolic psychology, archetypal dynamics,
              nervous system awareness, and emotional pattern recognition
              into a structured reflective report.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {sections.map((section) => (
              <div
                key={section.title}
                className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500"
              >

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative z-10">

                  <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
                    {section.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-lg">
                    {section.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
<section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-16">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Dynamic Pattern Mapping
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        Your loops do not exist in isolation.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        ArcheLoop reports are being designed to show how one activated pattern
        may trigger, protect, compensate for, or regulate another.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {[
  [
    "Fantasy Fog → Fortress",
    "When emotional longing or fantasy becomes unsafe, protection may appear as distance, control, or withdrawal.",
    "Integration Key: Healthy Warrior",
  ],
  [
    "Mind Maze → Stalled Flame",
    "When thought becomes recursive or over-analytical, movement, desire, and action may become interrupted.",
    "Integration Key: Healthy Warrior",
  ],
  [
    "Compliance → Dimmed Light",
    "When boundaries collapse to preserve safety or approval, visibility and authentic expression may become suppressed.",
    "Integration Key: Healthy Sovereign",
  ],
  [
    "Paper Crown → Emotional Lockdown",
    "When worth becomes tied to achievement or image, emotional authenticity may become harder to access.",
    "Integration Key: Healthy Lover",
  ],

      ].map(([title, description, integration]) => (
        <div
          key={title}
          className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 transition duration-500" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-5 group-hover:text-yellow-300 transition">
              {title}
            </h3>

            <p className="text-gray-300 leading-relaxed mb-6">
              {description}
            </p>

            <p className="text-yellow-300 font-semibold">
              {integration}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="px-6 py-28">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-20">
      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Inside The Report
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        A symbolic map of your inner patterns.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        ArcheLoop reports are designed to transform recurring emotional,
        behavioural, relational, and nervous system patterns into a structured
        symbolic profile.
      </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">

      {/* CARD 1 */}
      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-yellow-300/40 transition-all duration-700">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition duration-700" />

        <div className="relative z-10">

          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-4">
            Primary Pattern
          </p>

          <h3 className="text-3xl font-bold mb-6">
            Dimmed Light Loop
          </h3>

          <div className="space-y-4 mb-8">

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">Element</span>
              <span className="text-yellow-300 font-semibold">Fire</span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">Archetype</span>
              <span className="font-semibold">Sovereign</span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">Pattern</span>
              <span className="font-semibold">Suppression</span>
            </div>

          </div>

          <p className="text-gray-300 leading-relaxed">
            Visibility, expression, or self-trust may collapse when attention,
            pressure, shame, or emotional exposure feel unsafe.
          </p>

        </div>

      </div>

      {/* CARD 2 */}
      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-blue-400/40 transition-all duration-700">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition duration-700" />

        <div className="relative z-10">

          <p className="uppercase tracking-[0.25em] text-blue-400 text-sm mb-4">
            Nervous System
          </p>

          <h3 className="text-3xl font-bold mb-6">
            Activation Mapping
          </h3>

          <div className="space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span>Fight</span>
                <span>26%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[26%] bg-blue-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Freeze</span>
                <span>58%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[58%] bg-blue-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Fawn</span>
                <span>71%</span>
              </div>

              <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[71%] bg-blue-400 rounded-full" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CARD 3 */}
      <div className="group relative overflow-hidden border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-8 hover:border-rose-500/40 transition-all duration-700">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(225,29,72,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition duration-700" />

        <div className="relative z-10">

          <p className="uppercase tracking-[0.25em] text-rose-500 text-sm mb-4">
            Relational Dynamics
          </p>

          <h3 className="text-3xl font-bold mb-6">
            Trigger Patterns
          </h3>

          <div className="space-y-4">

            <div className="border border-zinc-800 rounded-2xl p-4">
              <p className="text-sm text-gray-500 mb-2">
                Trigger
              </p>

              <p className="font-semibold">
                Emotional unpredictability
              </p>
            </div>

            <div className="border border-zinc-800 rounded-2xl p-4">
              <p className="text-sm text-gray-500 mb-2">
                Activated Loop
              </p>

              <p className="font-semibold">
                Emotional Lockdown
              </p>
            </div>

            <div className="border border-zinc-800 rounded-2xl p-4">
              <p className="text-sm text-gray-500 mb-2">
                Integration Path
              </p>

              <p className="font-semibold text-rose-400">
                Healthy Lover
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

   <section className="px-6 py-28 border-y border-zinc-800 bg-[#0B1018]">

  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-16">

      <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
        Founding Edition
      </p>

      <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
        Unlock your full
        <br />
        ArcheLoop pattern report.
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Receive a deeper symbolic analysis of your emotional patterns,
        archetypal dynamics, nervous system responses, elemental balance,
        relational activators, and integration pathways.
      </p>

    </div>

    <div className="grid lg:grid-cols-2 gap-8 mb-14">

      {/* LEFT */}
      <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-10">

        <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-5">
          Included In The Report
        </p>

        <div className="space-y-5">

          {[
            "Primary and secondary shadow loops",
            "Elemental balance analysis",
            "Archetype integration mapping",
            "Nervous system activation patterns",
            "Relational trigger dynamics",
            "Body map interpretation",
            "Loop interruption practices",
            "Personalised integration guidance",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 border border-zinc-800 rounded-2xl p-4"
            >
              <div className="h-2 w-2 rounded-full bg-yellow-300" />

              <p className="text-gray-300">
                {item}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* RIGHT */}
      <div className="relative overflow-hidden border border-yellow-300/20 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_60%)]" />

        <div className="relative z-10">

          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-5">
            ArcheLoop Founding Report
          </p>

          <h3 className="text-5xl font-bold mb-6">
            Founding Access
          </h3>

          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            A limited number of Founding Edition reports are currently
available for early users helping shape the future ArcheLoop system.
          </p>

          <div className="space-y-4 mb-10">

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">
                Delivery
              </span>

              <span className="font-semibold">
                PDF Report
              </span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">
                Length
              </span>

              <span className="font-semibold">
                15–25 Pages
              </span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <span className="text-gray-400">
                Access
              </span>

              <span className="font-semibold">
                Founding Edition
              </span>
            </div>

          </div>

          <div className="flex flex-wrap gap-4">

            <a
              href="/assessment"
              className="bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-200 transition"
            >
              Take Assessment
            </a>

            <a
              href="/founding-access"
              className="border border-zinc-700 px-8 py-4 rounded-full font-semibold hover:border-yellow-300 hover:text-yellow-300 transition"
            >
              Request Founding Access
            </a>

          </div>

        </div>

      </div>

    </div>

    <p className="text-center text-sm text-gray-500 max-w-3xl mx-auto">
      ArcheLoop reports are educational symbolic self-awareness tools and are
      not medical, psychiatric, therapeutic, or diagnostic services.
    </p>

  </div>

</section>
      <Footer />
    </main>
  )
}