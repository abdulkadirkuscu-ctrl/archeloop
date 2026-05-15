export default function SovereignPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-yellow-300">Home</a>
        <a href="/assessment" className="hover:text-yellow-300">Assessment</a>
        <a href="/triggered" className="hover:text-yellow-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-yellow-300">Practices</a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-yellow-300 mb-4">
            Fire Element
          </p>

          <h1 className="text-6xl font-bold mb-6">
            The Sovereign Archetype
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-12">
            The Sovereign is the archetype of inner authority, visibility,
            self-worth, leadership, and permission to exist fully.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="border border-yellow-400 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Healthy Fire</h2>
              <p className="text-gray-300">
                Grounded confidence, joy, self-trust, visibility, and the ability
                to lead your life without needing constant approval.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Core Emotion</h2>
              <p className="text-gray-300">
                Joy when integrated. Shame when collapsed or suppressed.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Body Map</h2>
              <p className="text-gray-300">
                Solar plexus, chest, posture, breath, visibility tension, and
                the felt sense of taking up space.
              </p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              When the Sovereign is Healthy
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Healthy Sovereign energy does not dominate others. It gives you
              permission to stand in your own life. It allows you to make
              decisions, be seen, express your gifts, and move with purpose
              without shrinking or performing.
            </p>

            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "You trust your inner authority.",
                "You make decisions without constant reassurance.",
                "You allow yourself to be visible.",
                "You can receive recognition without shame.",
                "You experience joy when following your own path.",
                "You lead without needing to control.",
              ].map((item) => (
                <li key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Sovereign Shadow Loops
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-yellow-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Dimmed Light Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Suppressed Fire. You shrink, hide your gifts, or avoid being
                  seen because visibility feels unsafe.
                </p>
                <p className="text-yellow-300">
                  Core belief: “If I shine, I will be rejected.”
                </p>
              </div>

              <div className="border border-yellow-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Paper Crown Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Inflated Fire. You may rely on achievement, admiration, status,
                  or control to feel worthy.
                </p>
                <p className="text-yellow-300">
                  Core belief: “I am only valuable if I appear impressive.”
                </p>
              </div>

              <div className="border border-yellow-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Stalled Flame Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Colliding Fire. You have vision or desire, but hesitation,
                  fear, or overthinking interrupts action.
                </p>
                <p className="text-yellow-300">
                  Core belief: “I want to act, but I might fail.”
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Somatic Signals
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              When Sovereign energy is blocked, the body may communicate through
              contraction around the solar plexus or heart. You may feel smaller,
              hold your breath, collapse your posture, or feel exposed when
              attention turns toward you.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Tightness in the chest or solar plexus",
                "Collapsed or shrinking posture",
                "Holding the breath when being seen",
                "Heat, shame, or discomfort under attention",
                "Difficulty speaking with authority",
                "Fear of being judged, mocked, or rejected",
              ].map((item) => (
                <div key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              How to Strengthen Healthy Sovereign
            </h2>

            <div className="bg-white text-black rounded-3xl p-8">
              <p className="text-lg mb-6">
                Sovereign integration begins with permission. The goal is not to
                become louder, superior, or performative. The goal is to stand in
                your own life without abandoning yourself.
              </p>

              <ul className="space-y-3">
                {[
                  "Make one small decision without seeking approval.",
                  "Share one honest opinion without overexplaining.",
                  "Stand tall and breathe into your solar plexus.",
                  "Name one strength without minimizing it.",
                  "Take one visible action toward something meaningful.",
                ].map((item) => (
                  <li key={item} className="border border-black rounded-xl p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/assessment"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Take Assessment
            </a>

            <a
              href="/practices"
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Explore Practices
            </a>

            <a
              href="/"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black"
            >
              Return Home
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}