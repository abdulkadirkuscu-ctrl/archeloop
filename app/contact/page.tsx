import Footer from "../components/Footer"
import Nav from "../components/Nav"
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
<Nav />

      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
            Contact
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Get in touch
          </h1>

          <p className="text-xl text-gray-300 mb-12">
            For questions, collaborations, partnerships, feedback,
            or future coaching and educational opportunities,
            you can contact ArcheLoop below.
          </p>

          <div className="border border-zinc-700 rounded-3xl p-8 bg-zinc-950">

            <p className="text-gray-400 mb-3">
              Email
            </p>

            <p className="text-2xl font-semibold text-yellow-300">
              info@archeloop.com
            </p>

          </div>

          <div className="mt-12 space-y-4 text-gray-300">

            <p>
              Founder: Abdulkadir Kuscu
            </p>

            <p>
              ArcheLoop™
            </p>

            <p>
              Understand. Interrupt. Integrate.
            </p>

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
              Discover Your Shadow Loop
            </a>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  )
}