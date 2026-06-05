import Nav from "../components/Nav";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ArcheLoop for questions, collaborations, feedback, or support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative max-w-4xl mx-auto space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70 mb-5">
              Contact
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Contact ArcheLoop
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-stone-300 leading-relaxed">
              Questions, collaborations, feedback, media enquiries, partnerships,
              or support.
            </p>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_45px_rgba(216,183,120,0.05)]">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
              Email
            </p>

            <p className="mt-5 text-3xl font-semibold text-yellow-300">
              info@archeloop.com
            </p>

            <p className="mt-6 text-stone-300 leading-relaxed">
              We aim to respond to all enquiries as quickly as possible.
            </p>

            <a
              href="mailto:info@archeloop.com?subject=Contact%20ArcheLoop"
              className="mt-8 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Email ArcheLoop
            </a>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-8 text-center">
            <p className="text-sm text-stone-400 leading-relaxed">
              ArcheLoop is an educational self-development system and is not a
              crisis, medical, psychiatric, psychological, legal, or therapeutic
              service.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}