import Footer from "../components/Footer"
import Nav from "../components/Nav"
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            About ArcheLoop
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            A system for understanding the patterns you keep repeating.
          </h1>

          <p className="text-xl text-gray-300 mb-10">
            ArcheLoop was created by Abdulkadir Kuscu as a self-development
            framework for identifying recurring emotional and behavioural patterns
            through archetypes, shadow work, nervous system states, somatic awareness,
            and elemental dynamics.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">Why I created ArcheLoop</h2>
              <p className="text-gray-300 text-lg">
                I became fascinated by the way people repeat emotional patterns
                even when they consciously want to change. Sometimes we know what
                we should do, but something inside us freezes, hides, overthinks,
                overreacts, shuts down, or keeps choosing the same familiar response.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">The idea behind the system</h2>
              <p className="text-gray-300 text-lg">
                ArcheLoop is based on the idea that our recurring patterns are not
                random. They are often protective loops formed around fear, shame,
                grief, anger, uncertainty, visibility, connection, and boundaries.
                By naming the loop, we can begin to interrupt it.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">What makes ArcheLoop different</h2>
              <p className="text-gray-300 text-lg">
                ArcheLoop connects symbolic archetypes with practical nervous system
                awareness. It is not just about knowing your type. It is about noticing
                what happens in your body, what loop gets activated, and what energy
                needs to be restored.
              </p>
            </section>

            <section className="border border-yellow-400 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-4">The core philosophy</h2>
              <p className="text-gray-300 text-lg">
                You are not your loop. A loop is a pattern, not your identity.
                ArcheLoop helps you understand the pattern, interrupt the reaction,
                and integrate the part of you that has been suppressed, inflated,
                or stuck.
              </p>
            </section>
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
        </div>
      </section>
      <Footer />
    </main>
  )
}