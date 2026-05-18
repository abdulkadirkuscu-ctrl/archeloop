import Nav from "../components/Nav"
import Footer from "../components/Footer"
export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Disclaimer
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-10">
            ArcheLoop is an educational self-development tool.
          </h1>

          <div className="space-y-8 text-lg text-gray-300">

            <p>
              ArcheLoop is designed for educational, reflective, and personal
              development purposes only.
            </p>

            <p>
              ArcheLoop does not provide medical, psychiatric, psychological,
              legal, or therapeutic advice, diagnosis, or treatment.
            </p>

            <p>
              The archetypes, shadow loops, nervous system states, elemental
              dynamics, and practices presented on this website are symbolic
              frameworks intended to support self-awareness and reflection.
            </p>

            <p>
              ArcheLoop should not be used as a substitute for professional
              mental health care, medical treatment, crisis support, or therapy.
            </p>

            <p>
              If you are experiencing significant emotional distress, mental
              health symptoms, trauma, or crisis-related experiences, please
              seek support from a qualified healthcare professional.
            </p>

            <div className="border border-yellow-400 rounded-3xl p-8 mt-10">
              <p className="text-xl">
                By using ArcheLoop, you acknowledge that all decisions,
                interpretations, and actions remain your own responsibility.
              </p>
            </div>

          </div>

          <div className="flex gap-4 flex-wrap mt-12">
            <a
              href="/"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              Return Home
            </a>

            <a
              href="/assessment"
              className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black"
            >
              Take Assessment
            </a>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  )
}