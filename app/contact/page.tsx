import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ArcheLoop for questions, collaborations, feedback, or support.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="px-6 py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
            Contact
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Contact ArcheLoop
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            For questions, collaborations, feedback, technical issues, or
            support, you can reach ArcheLoop directly by email.
          </p>

          <div className="border border-zinc-800 rounded-3xl bg-zinc-950 p-8 mb-10">
            <p className="text-gray-400 mb-3">
              Email
            </p>

            <p className="text-2xl font-semibold text-yellow-300 mb-8">
              info@archeloop.com
            </p>
 
            <a
              href="mailto:info@archeloop.com?subject=Contact%20ArcheLoop"
              className="inline-flex bg-yellow-300 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-200 transition"
            >
              Email ArcheLoop
            </a>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            ArcheLoop is an educational self-development system and is not a
            crisis, medical, psychiatric, psychological, legal, or therapeutic
            service.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}