import Footer from "../components/Footer"
import Nav from "../components/Nav"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-10">
          About ArcheLoop
        </h1>

        <p className="text-2xl text-gray-300 leading-relaxed mb-12">
          A symbolic self-awareness system for recognising and interrupting recurring shadow patterns.
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              How ArcheLoop began
            </h2>

            <p className="mb-6">
              ArcheLoop began through years of personal shadow work, self-observation,
              journaling, archetypal psychology, nervous system work, and studying the
              relationship between human behaviour, emotion, and unconscious patterns.
            </p>

            <p className="mb-6">
              For around two years, I worked closely with a shadow work coach exploring
              recurring emotional reactions, childhood conditioning, identity patterns,
              archetypes, and unconscious protective behaviours.
            </p>

            <p>
              Later, when I could no longer continue formal coaching, I carried on the
              work independently — studying archetypes, elemental dynamics, symbolic
              psychology, somatic awareness, and recurring behavioural loops in my own life.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Naming the shadows
            </h2>

            <p className="mb-6">
              During this process, I noticed that many painful experiences were not
              isolated incidents. Different memories often carried the same emotional
              structure underneath.
            </p>

            <p className="mb-6">
              I began giving these repeating patterns names. One of the earliest was
              what I called the “Obedient Boy Trap” — a pattern where loyalty,
              suppression, and fear of disapproval kept healthy agency and boundaries
              trapped long after childhood had ended.
            </p>

            <p>
              Over time, I realised these patterns were not random. They appeared to
              form through recurring interactions between archetypal energies:
              suppression, compensation, inflation, collapse, and inner conflict.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              The ArcheLoop framework
            </h2>

            <p className="mb-6">
              ArcheLoop eventually evolved into a system of four archetypal energies
              and twelve core Shadow Loops.
            </p>

            <p className="mb-6">
              The system is based on the idea that every person has access to all four
              archetypal energies — Fire, Air, Water, and Earth — but different life
              experiences can distort, suppress, inflate, or disconnect these energies
              from one another.
            </p>

            <p>
              Instead of seeing shadow work only as revisiting painful memories,
              ArcheLoop attempts to provide a structured symbolic map that helps people
              recognise the loop they are currently living inside.
            </p>
          </div>

          <div className="border border-yellow-400 rounded-3xl p-8 bg-zinc-950">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Name it to break it
            </h2>

            <p className="mb-6">
              One of the central ideas behind ArcheLoop is simple:
            </p>

            <p className="text-2xl text-yellow-300 font-semibold mb-6">
              “You cannot interrupt a pattern you cannot see.”
            </p>

            <p className="mb-6">
              By naming recurring shadow patterns, people often begin recognising them
              in real time — in thoughts, relationships, emotional reactions,
              behaviours, and nervous system states.
            </p>

            <p>
              ArcheLoop is built around the belief that awareness creates choice.
              You are not the loop. The loop is a pattern — and patterns can change.
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap mt-12">
          <a
            href="/assessment"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Discover Your Shadow Loop
          </a>

          <a
            href="/"
            className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
          >
            Return Home
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}