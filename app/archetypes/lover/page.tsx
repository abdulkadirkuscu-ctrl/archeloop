import Footer from "../../components/Footer"
export default function LoverPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-red-300">Home</a>
        <a href="/assessment" className="hover:text-red-300">Assessment</a>
        <a href="/triggered" className="hover:text-red-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-red-300">Practices</a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-red-300 mb-4">
            Water Element
          </p>

          <h1 className="text-6xl font-bold mb-6">
            The Lover Archetype
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-12">
            The Lover governs emotion, connection, intimacy, grief, beauty,
            creativity, and the capacity to feel deeply without losing yourself.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="border border-red-400 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Healthy Water</h2>
              <p className="text-gray-300">
                Healthy Water creates emotional flow, connection, vulnerability,
                intimacy, creativity, and the ability to feel without collapse.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Core Emotion</h2>
              <p className="text-gray-300">
                Love and connection when integrated. Grief, longing, or numbness
                when distorted.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">Body Map</h2>
              <p className="text-gray-300">
                Heart, belly, sacral area, emotional breath, tenderness,
                openness, numbness, and emotional flooding.
              </p>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              When the Lover is Healthy
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Healthy Lover energy allows you to feel, connect, create, and
              receive without abandoning yourself. It does not mean emotional
              chaos. It means safe emotional flow.
            </p>

            <ul className="grid md:grid-cols-2 gap-4">
              {[
                "You can feel deeply without becoming overwhelmed.",
                "You express affection without losing yourself.",
                "You can receive care without guilt.",
                "You stay connected to your body and emotions.",
                "You create beauty and meaning through feeling.",
                "You can grieve, love, and open without collapsing.",
              ].map((item) => (
                <li key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Lover Shadow Loops
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-red-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Emotional Lockdown Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Suppressed Water. Feelings are numbed, hidden, or avoided
                  because vulnerability feels unsafe.
                </p>
                <p className="text-red-300">
                  Core belief: “Feeling is dangerous.”
                </p>
              </div>

              <div className="border border-red-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Fantasy Fog Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Inflated Water. Imagination, longing, or idealisation replaces
                  direct contact with reality.
                </p>
                <p className="text-red-300">
                  Core belief: “It is safer in my inner world.”
                </p>
              </div>

              <div className="border border-red-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-3">
                  Flooded Waters Loop
                </h3>
                <p className="text-gray-300 mb-4">
                  Colliding Water. Emotion becomes too intense to regulate,
                  creating overwhelm, urgency, or collapse.
                </p>
                <p className="text-red-300">
                  Core belief: “My feelings are too much.”
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Somatic Signals
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Distorted Lover energy often appears through emotional flooding,
              numbness, chest heaviness, belly sensitivity, longing, or the
              feeling of being overwhelmed by connection.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Chest heaviness or heart ache",
                "Emotional numbness or shutdown",
                "Belly sensitivity or sinking feeling",
                "Overwhelming waves of grief or longing",
                "Difficulty receiving care",
                "Escaping into fantasy or imagined connection",
              ].map((item) => (
                <div key={item} className="border border-zinc-800 rounded-xl p-4">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-6">
              How to Strengthen Healthy Lover
            </h2>

            <div className="bg-white text-black rounded-3xl p-8">
              <p className="text-lg mb-6">
                Lover integration begins with safe contact. You do not have to
                feel everything at once. The practice is to allow emotion in
                small, grounded doses.
              </p>

              <ul className="space-y-3">
                {[
                  "Name one feeling without judging it.",
                  "Place a hand on your heart and breathe slowly for one minute.",
                  "Share one honest emotion with a safe person.",
                  "Notice beauty in one small thing today.",
                  "Let yourself receive care without immediately giving back.",
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
              className="border border-red-400 text-red-300 px-6 py-3 rounded-full font-semibold hover:bg-red-400 hover:text-black"
            >
              Explore Practices
            </a>

            <a href="/" className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black">
              Return Home
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}