const practices = [
  {
    archetype: "Sovereign",
    element: "Fire",
    colour: "border-yellow-400",
    title: "Strengthen Healthy Sovereign",
    description:
      "Restore visibility, self-trust, permission, and grounded authority.",
    exercises: [
      "Make one decision today without asking for reassurance.",
      "Share one opinion clearly without apologising.",
      "Stand tall for 60 seconds and breathe into your solar plexus.",
      "Name one strength without minimizing it.",
      "Take one small visible action toward something meaningful.",
    ],
  },
  {
    archetype: "Magician",
    element: "Air",
    colour: "border-blue-400",
    title: "Strengthen Healthy Magician",
    description:
      "Restore clarity, perception, language, insight, and trusted thinking.",
    exercises: [
      "Write down one clear thought before trying to solve everything.",
      "Separate facts from stories in a stressful situation.",
      "Speak one sentence even if it is not perfect.",
      "Pause and name what you actually know.",
      "Take one action before seeking complete certainty.",
    ],
  },
  {
    archetype: "Lover",
    element: "Water",
    colour: "border-red-400",
    title: "Strengthen Healthy Lover",
    description:
      "Restore emotional flow, connection, creativity, intimacy, and feeling.",
    exercises: [
      "Name one feeling without judging it.",
      "Place a hand on your heart and breathe slowly for one minute.",
      "Share one honest emotion with a safe person.",
      "Notice beauty in one small thing today.",
      "Let yourself receive care without immediately giving back.",
    ],
  },
  {
    archetype: "Warrior",
    element: "Earth",
    colour: "border-green-500",
    title: "Strengthen Healthy Warrior",
    description:
      "Restore boundaries, protection, grounded action, discipline, and strength.",
    exercises: [
      "Say one honest no or not now.",
      "Take one practical action you have been avoiding.",
      "Feel your feet on the ground before responding.",
      "Protect one hour of your time today.",
      "State one boundary clearly and calmly.",
    ],
  },
]

export default function PracticesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-stone-950 to-black text-white">
      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-yellow-300">Home</a>
        <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
        <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-yellow-300">Practices</a>
      </nav>

      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-widest text-gray-400 mb-4">
            Integration Practices
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Strengthen Your Archetypal Energy
          </h1>

          <p className="text-gray-300 text-lg max-w-3xl mb-12">
            These practices help restore healthy expression in each archetype.
            Use them when an energy feels suppressed, inflated, distorted, or stuck.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {practices.map((practice) => (
              <div
                key={practice.archetype}
                className={`border ${practice.colour} rounded-2xl p-8 bg-zinc-950`}
              >
                <p className="text-sm text-gray-400 mb-2">
                  {practice.archetype} / {practice.element}
                </p>

                <h2 className="text-3xl font-bold mb-4">
                  {practice.title}
                </h2>

                <p className="text-gray-300 mb-6">
                  {practice.description}
                </p>

                <ul className="space-y-3">
                  {practice.exercises.map((exercise) => (
                    <li
                      key={exercise}
                      className="border border-zinc-800 rounded-xl p-4"
                    >
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-16 flex-wrap justify-center">
            <a
              href="/"
              className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              Return Home
            </a>

            <a
              href="/assessment"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold"
            >
              Take Assessment
            </a>

            <a
              href="/triggered"
              className="border border-yellow-400 text-yellow-300 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              I Am Triggered
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}