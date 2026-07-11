import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function DisclaimerPage() {
  return (
    <main className="al-page">
      <Nav />

      <section className="al-section">
        
        <div className="al-container space-y-10">
          <div className="al-premium-card p-10">
            <p className="al-kicker">
              Disclaimer
            </p>

            <h1 className="mt-6 al-heading-lg">
              ArcheLoop is an educational self-development tool.
            </h1>

            <p className="mt-8 max-w-3xl al-text-lg">
              ArcheLoop is designed to support self-awareness, reflection,
              personal growth, and understanding of recurring emotional and
              behavioural patterns.
            </p>
          </div>

          <div className="al-card p-8">
            <div className="space-y-6 al-text-lg">
              <p>
                ArcheLoop is designed for educational, reflective, and personal
                development purposes only.
              </p>

              <p>
                ArcheLoop does not provide medical, psychiatric,
                psychological, legal, or therapeutic advice, diagnosis, or
                treatment.
              </p>

              <p>
                The archetypes, Shadow Loops, nervous system states,
                elemental dynamics, integration journeys, and practices
                presented on this website are symbolic frameworks intended to
                support self-awareness and reflection.
              </p>

              <p>
                ArcheLoop should not be used as a substitute for professional
                mental health care, medical treatment, crisis support, therapy,
                counselling, or legal advice.
              </p>

              <p>
                If you are experiencing significant emotional distress,
                mental health symptoms, trauma, or crisis-related experiences,
                please seek support from a qualified healthcare professional.
              </p>
            </div>
          </div>

          <div className="al-premium-card p-10">
            <p className="al-kicker">
              Personal Responsibility
            </p>

            <p className="mt-6 text-2xl leading-relaxed">
              By using ArcheLoop, you acknowledge that all interpretations,
              decisions, actions, and outcomes remain your own responsibility.
            </p>

            <p className="al-text mt-6">
              ArcheLoop provides symbolic frameworks for reflection. It does
              not determine your choices, diagnose conditions, or replace
              professional guidance.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/"
              className="al-button-primary"
            >
              Return Home
            </a>

            <a
              href="/assessment"
              className="al-button-secondary"
            >
              Find My Loop
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}