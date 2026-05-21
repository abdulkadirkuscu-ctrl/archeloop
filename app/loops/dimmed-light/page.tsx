import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import Image from "next/image"

export default function DimmedLightPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      {/* HERO */}

      <section className="relative h-[80vh] overflow-hidden">
        <Image
          src="/images/loops/dimmed-light.png"
          alt="Dimmed Light Loop"
          fill
          priority
          className="object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />

        <div className="absolute bottom-0 left-0 w-full p-10 md:p-20">
          <p className="uppercase tracking-[0.4em] text-yellow-300 mb-4">
            Fire Loop • Suppression
          </p>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Dimmed Light
          </h1>

          <p className="text-2xl text-gray-300 max-w-3xl leading-relaxed">
            You hide your visibility, expression, or potential because
            being fully seen no longer feels safe.
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        {/* EXPERIENCE */}

        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-8">
            What this loop feels like
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-gray-300 text-lg leading-relaxed">
            <p>
              Dimmed Light often appears as self-suppression, shrinking,
              hesitation, hiding, self-monitoring, or making yourself
              smaller around other people.
            </p>

            <p>
              The nervous system learns that visibility may lead to shame,
              criticism, rejection, conflict, or emotional exposure.
              Over time, expression itself begins to feel unsafe.
            </p>
          </div>
        </div>

        {/* FORMATION */}

        <div className="border border-zinc-800 rounded-3xl p-10 bg-zinc-950 mb-24">
          <p className="uppercase tracking-[0.3em] text-yellow-300 mb-4">
            Loop Formation
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Air suppresses Fire
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed">
            Thought, self-monitoring, prediction, and fear override
            spontaneous self-expression and visibility.
          </p>
        </div>

        {/* CORE BELIEF */}

        <div className="mb-24">
          <p className="uppercase tracking-[0.3em] text-gray-500 mb-4">
            Core Belief
          </p>

          <h2 className="text-5xl font-bold text-yellow-300 max-w-4xl leading-tight">
            “If I fully shine, I will be rejected.”
          </h2>
        </div>

        {/* BODY + NS */}

        <div className="grid md:grid-cols-2 gap-8 mb-24">

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-6">
              Body Map
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              Often felt in the chest, solar plexus, throat,
              or upper back through collapse, tightness,
              shrinking posture, or inhibited breathing.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
            <h3 className="text-3xl font-bold mb-6">
              Nervous System Pattern
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              Freeze, collapse, self-monitoring, visibility anxiety,
              and anticipatory shame responses.
            </p>
          </div>

        </div>

        {/* QUESTIONS */}

        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-10">
            Reflection Questions
          </h2>

          <div className="space-y-8">

            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <p className="text-yellow-300 uppercase tracking-[0.3em] mb-3">
                Trigger Question
              </p>

              <p className="text-2xl text-gray-200">
                Where am I shrinking myself right now?
              </p>
            </div>

            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <p className="text-yellow-300 uppercase tracking-[0.3em] mb-3">
                Root Question
              </p>

              <p className="text-2xl text-gray-200">
                What do I believe will happen if I am fully seen?
              </p>
            </div>

            <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <p className="text-yellow-300 uppercase tracking-[0.3em] mb-3">
                Integration Question
              </p>

              <p className="text-2xl text-gray-200">
                What would expression look like without apology?
              </p>
            </div>

          </div>
        </div>

        {/* PRACTICE */}

        <div className="border border-yellow-400 rounded-3xl p-10 bg-zinc-950">
          <p className="uppercase tracking-[0.3em] text-yellow-300 mb-4">
            Loop Breaker Practice
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Practise safe visibility
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Share one thought, preference, opinion, or creative expression
            today without immediately softening, apologising, or withdrawing it.
          </p>
        </div>

      </section>

      <Footer />
    </main>
  )
}