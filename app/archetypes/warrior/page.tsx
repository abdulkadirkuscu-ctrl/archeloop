export default function WarriorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-green-300">Home</a>
        <a href="/assessment" className="hover:text-green-300">Assessment</a>
        <a href="/triggered" className="hover:text-green-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-green-300">Practices</a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-green-300 mb-4">
            Earth Element
          </p>

          <h1 className="text-6xl font-bold mb-6">
            The Warrior Archetype
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-12">
            The Warrior governs boundaries, grounded action, protection,
            discipline, responsibility, and the capacity to act with strength
            without becoming rigid or aggressive.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="border border-green-500 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Healthy Earth</h2>
              <p className="text-gray-300">
                Healthy Earth creates boundaries, consistency, grounded action,
                protection, discipline, and embodied strength.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Core Emotion</h2>
              <p className="text-gray-300">
                Anger as protection when integrated. Fear, resentment, or
                survival pressure when distorted.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Body Map</h2>
              <p className="text-gray-300">
                Legs, feet, root, jaw, arms, hands, posture, survival energy,
                fatigue, rigidity, and grounded movement.
              </p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              When the Warrior is Healthy
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Healthy Warrior energy does not mean fighting everyone. It means
              knowing where you stand, protecting your values, taking grounded
              action, and setting boundaries without abandoning connection.
            </p>

            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "You can say no without excessive guilt.",
                "You take action without overexplaining.",
                "You protect your time, energy, and values.",
                "You respond to conflict without collapsing or attacking.",
                "You stay grounded when challenged.",
                "You can act consistently even when motivation changes.",
              ].map((item) => (
                <li key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Warrior Shadow Loops
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-green-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Compliance Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Suppressed Earth. Boundaries collapse and you over-adapt to
                  avoid conflict, rejection, or disapproval.
                </p>
                <p className="text-green-300">
                  Core belief: “It is safer to go along.”
                </p>
              </div>

              <div className="border border-green-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Fortress Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Inflated Earth. Protection becomes rigid control,
                  hyper-independence, walls, or emotional distance.
                </p>
                <p className="text-green-300">
                  Core belief: “I must protect myself at all costs.”
                </p>
              </div>

              <div className="border border-green-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Barren Ground Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Colliding Earth. You keep enduring responsibility while losing
                  nourishment, rest, joy, or support.
                </p>
                <p className="text-green-300">
                  Core belief: “I must endure.”
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Somatic Signals
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Distorted Warrior energy often appears through jaw tension, heavy
              legs, exhaustion, rigid posture, clenched hands, survival fatigue,
              or difficulty moving from thought into action.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Heavy legs or frozen movement",
                "Jaw tension or clenched fists",
                "Rigid posture or guarded body",
                "Exhaustion from carrying too much",
                "Difficulty saying no",
                "Feeling responsible for keeping everything together",
              ].map((item) => (
                <div key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              How to Strengthen Healthy Warrior
            </h2>

            <div className="bg-white text-black rounded-3xl p-8">
              <p className="text-lg mb-6">
                Warrior integration begins with grounded action. The goal is not
                to become harsh. The goal is to protect your life, energy, and
                values with clarity and steadiness.
              </p>

              <ul className="space-y-3">
                {[
                  "Say one honest no or not now.",
                  "Take one practical action you have been avoiding.",
                  "Feel your feet on the ground before responding.",
                  "Protect one hour of your time today.",
                  "State one boundary clearly and calmly.",
                ].map((item) => (
                  <li key={item} className="border border-black rounded-xl p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="flex gap-4 flex-wrap">
            <a href="/assessment" className="bg-white text-black px-6 py-3 rounded-full font-semibold">
              Take Assessment
            </a>

            <a
              href="/practices"
              className="border border-green-500 text-green-300 px-6 py-3 rounded-full font-semibold hover:bg-green-500 hover:text-black"
            >
              Explore Practices
            </a>

            <a href="/" className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black">
              Return Home
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}