import Footer from "../../components/Footer"
export default function MagicianPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <nav className="flex justify-center gap-4 p-6 border-b border-zinc-800">
        <a href="/" className="hover:text-blue-300">Home</a>
        <a href="/assessment" className="hover:text-blue-300">Assessment</a>
        <a href="/triggered" className="hover:text-blue-300">I Am Triggered</a>
        <a href="/practices" className="hover:text-blue-300">Practices</a>
      </nav>

      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-blue-300 mb-4">
            Air Element
          </p>

          <h1 className="text-6xl font-bold mb-6">
            The Magician Archetype
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mb-12">
            The Magician governs perception, thought, interpretation,
            language, insight, understanding, and mental clarity.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">

            <div className="border border-blue-400 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">
                Healthy Air
              </h2>

              <p className="text-gray-300">
                Healthy Air creates clarity, insight, perception,
                curiosity, communication, and trusted thinking.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">
                Core Emotion
              </h2>

              <p className="text-gray-300">
                Clarity when integrated. Fear and confusion when distorted.
              </p>
            </div>

            <div className="border border-zinc-700 rounded-2xl p-6 bg-zinc-950">
              <h2 className="text-2xl font-bold mb-3">
                Body Map
              </h2>

              <p className="text-gray-300">
                Head, throat, eyes, ears, mental focus,
                cognitive overload, speech, and perception.
              </p>
            </div>

          </div>

          <section className="mb-16">

            <h2 className="text-4xl font-bold mb-6">
              When the Magician is Healthy
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Healthy Magician energy allows you to understand reality
              clearly without collapsing into fear or obsession.
              It creates insight without paralysis.
            </p>

            <ul className="grid md:grid-cols-2 gap-4">

              {[
                "You trust your perception.",
                "You can think clearly under pressure.",
                "You communicate ideas effectively.",
                "You notice patterns without spiralling.",
                "You can reflect without obsessing.",
                "You allow clarity to emerge through action.",
              ].map((item) => (
                <li
                  key={item}
                  className="border border-zinc-800 rounded-xl p-4"
                >
                  {item}
                </li>
              ))}

            </ul>

          </section>

          <section className="mb-16">

            <h2 className="text-4xl font-bold mb-6">
              Magician Shadow Loops
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="border border-blue-700 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-3">
                  Blank Page Loop
                </h3>

                <p className="text-gray-300 mb-4">
                  Suppressed Air. The mind freezes under pressure
                  and thoughts disappear when needed most.
                </p>

                <p className="text-blue-300">
                  Core belief: “Nothing comes to me when it matters.”
                </p>

              </div>

              <div className="border border-blue-700 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-3">
                  Smoky Mirrors Loop
                </h3>

                <p className="text-gray-300 mb-4">
                  Inflated Air. Reality becomes distorted through
                  rationalisation, reinterpretation, or mental control.
                </p>

                <p className="text-blue-300">
                  Core belief: “If I control the story, I will be safe.”
                </p>

              </div>

              <div className="border border-blue-700 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-3">
                  Mind Maze Loop
                </h3>

                <p className="text-gray-300 mb-4">
                  Colliding Air. Overthinking blocks movement,
                  creating endless mental rehearsal without action.
                </p>

                <p className="text-blue-300">
                  Core belief: “I must think more before acting.”
                </p>

              </div>

            </div>

          </section>

          <section className="mb-16">

            <h2 className="text-4xl font-bold mb-6">
              Somatic Signals
            </h2>

            <p className="text-gray-300 text-lg mb-6">
              Distorted Magician energy often appears through mental
              overload, cognitive fog, dissociation, throat tension,
              headaches, or nervous system activation around thinking and speaking.
            </p>

            <div className="grid md:grid-cols-2 gap-4">

              {[
                "Foggy thinking or confusion",
                "Head pressure or headaches",
                "Throat tightness while speaking",
                "Overthinking without movement",
                "Mental spirals and looping thoughts",
                "Difficulty accessing words under stress",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-zinc-800 rounded-xl p-4"
                >
                  {item}
                </div>
              ))}

            </div>

          </section>

          <section className="mb-16">

            <h2 className="text-4xl font-bold mb-6">
              How to Strengthen Healthy Magician
            </h2>

            <div className="bg-white text-black rounded-3xl p-8">

              <p className="text-lg mb-6">
                Magician integration happens when perception becomes grounded.
                Clarity grows through movement, embodiment, and reality contact —
                not endless thinking.
              </p>

              <ul className="space-y-3">

                {[
                  "Take one action before seeking complete certainty.",
                  "Separate facts from imagined stories.",
                  "Speak one sentence even if imperfect.",
                  "Write down one clear thought.",
                  "Pause and ask: what do I actually know right now?",
                ].map((item) => (
                  <li
                    key={item}
                    className="border border-black rounded-xl p-4"
                  >
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
              className="border border-blue-400 text-blue-300 px-6 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-black"
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
      <Footer />
    </main>
  )
}