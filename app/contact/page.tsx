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
    <main className="al-page">
      <Nav />

      <section className="al-section">
        
        <div className="al-container space-y-10">
          <div className="al-premium-card p-10 text-center">
            <p className="al-kicker mb-5">
              Contact
            </p>

            <h1 className="al-heading-lg mb-8">
              Contact ArcheLoop
            </h1>

            <p className="mx-auto max-w-2xl al-text-lg">
              Questions, collaborations, feedback, media enquiries, partnerships,
              or support.
            </p>
          </div>

          <div className="al-card p-10 text-center">
            <p className="al-kicker">
              Email
            </p>

            <p className="mt-5 text-3xl font-semibold text-[var(--al-accent)]">
              info@archeloop.com
            </p>

            <p className="al-text mt-6">
              We aim to respond to all enquiries as quickly as possible.
            </p>

            <a
              href="mailto:info@archeloop.com?subject=Contact%20ArcheLoop"
              className="al-button-primary mt-8 inline-flex"
            >
              Email ArcheLoop
            </a>
          </div>

          <div className="al-card p-8 text-center">
            <p className="al-text text-sm">
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