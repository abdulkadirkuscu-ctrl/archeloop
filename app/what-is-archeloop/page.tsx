import Nav from "../components/Nav"
import Footer from "../components/Footer"

export default function WhatIsArcheLoopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[0.3em] text-gray-400 mb-6">
          ArcheLoop™
        </p>

        <h1 className="text-6xl font-bold mb-10 leading-tight">
          What Is ArcheLoop?
        </h1>

        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          ArcheLoop is a symbolic self-awareness framework designed to help
          people recognise recurring emotional, behavioural, and nervous system
          patterns called Shadow Loops.
        </p>

        <p className="text-xl text-gray-300 leading-relaxed mb-16">
          Rather than seeing people as “broken,” ArcheLoop views many difficult
          patterns as adaptive survival responses that once protected us — but
          now repeat automatically outside conscious awareness.
        </p>

        <div className="border border-yellow-400 rounded-3xl p-8 bg-zinc-950 mb-20">
          <h2 className="text-3xl font-bold mb-6">
            You are not the loop.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            A Shadow Loop is not your identity. It is a recurring internal
            pattern of perception, emotion, behaviour, and protection.
            ArcheLoop helps bring these patterns into awareness so they can
            become more conscious, flexible, and integrated over time.
          </p>
        </div>

        <h2 className="text-4xl font-bold mb-10">
          The Four Archetypes
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4 text-yellow-300">
              🔥 Fire — Sovereign
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4">
              Visibility, agency, confidence, direction, permission to exist.
            </p>

            <p className="text-lg italic text-gray-400">
              “Am I allowed to shine?”
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4 text-blue-300">
              🌬 Air — Magician
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4">
              Mind, perception, meaning, interpretation, awareness.
            </p>

            <p className="text-lg italic text-gray-400">
              “Can I trust my mind?”
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4 text-red-300">
              🌊 Water — Lover
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4">
              Emotion, intimacy, creativity, connection, feeling.
            </p>

            <p className="text-lg italic text-gray-400">
              “Am I safe to love?”
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4 text-green-300">
              🌱 Earth — Warrior
            </h3>

            <p className="text-gray-300 leading-relaxed mb-4">
              Boundaries, protection, discipline, survival, grounding.
            </p>

            <p className="text-lg italic text-gray-400">
              “Am I allowed to protect myself?”
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-10">
          The Three Ways Shadow Loops Form
        </h2>

        <div className="space-y-8 mb-24">
          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4">
              1. Suppression
            </h3>

            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              “This part of me is not allowed.”
            </p>

            <p className="text-gray-400 leading-relaxed">
              One archetypal energy becomes dominant while another collapses,
              hides, or goes offline.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4">
              2. Compensation
            </h3>

            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              “I must become something else to survive.”
            </p>

            <p className="text-gray-400 leading-relaxed">
              A wounded archetype borrows another energy to create safety,
              identity, approval, or control.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-4">
              3. Collision
            </h3>

            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              “Two inner forces pull me in opposite directions.”
            </p>

            <p className="text-gray-400 leading-relaxed">
              Two archetypal energies are both active but unintegrated,
              creating inner conflict, paralysis, overwhelm, or looping.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-10">
          What Is a Shadow Loop?
        </h2>

        <div className="border border-zinc-800 rounded-3xl p-10 bg-zinc-950 mb-24">
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            A Shadow Loop is a closed internal pattern of perception, emotion,
            behaviour, and nervous system protection that repeats automatically.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Many loops originally formed as intelligent survival responses.
            However, over time they can become rigid, unconscious, and
            self-reinforcing.
          </p>

          <p className="text-xl text-gray-300 leading-relaxed">
            ArcheLoop helps identify these patterns so people can interrupt
            automatic reactions and move toward healthier integration.
          </p>
        </div>

        <div className="text-center">
          <a
            href="/assessment"
            className="border border-yellow-400 text-yellow-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 hover:text-black"
          >
            Take the ArcheLoop Assessment
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}