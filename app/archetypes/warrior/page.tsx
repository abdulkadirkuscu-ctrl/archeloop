import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function WarriorPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container space-y-16">
          <div>
            <p className="al-kicker">Earth Element</p>

            <h1 className="al-heading-xl">The Warrior Archetype</h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              The Warrior governs boundaries, grounded action, protection,
              discipline, responsibility, and the capacity to act with strength
              without becoming rigid or aggressive.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Healthy Earth"
              text="Healthy Earth creates boundaries, consistency, grounded action, protection, discipline, and embodied strength."
            />

            <InfoCard
              title="Core Emotion"
              text="Anger as protection when integrated. Fear, resentment, or survival pressure when distorted."
            />

            <InfoCard
              title="Body Map"
              text="Legs, feet, root, jaw, arms, hands, posture, survival energy, fatigue, rigidity, and grounded movement."
            />
          </div>

          <ContentSection title="When the Warrior is Healthy">
            <p className="al-text-lg mb-6">
              Healthy Warrior energy does not mean fighting everyone. It means
              knowing where you stand, protecting your values, taking grounded
              action, and setting boundaries without abandoning connection.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "You can say no without excessive guilt.",
                "You take action without overexplaining.",
                "You protect your time, energy, and values.",
                "You respond to conflict without collapsing or attacking.",
                "You stay grounded when challenged.",
                "You can act consistently even when motivation changes.",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="Warrior Shadow Loops">
            <div className="grid gap-6 md:grid-cols-3">
              <ShadowCard
                title="Compliance Loop"
                text="Suppressed Earth. Boundaries collapse and you over-adapt to avoid conflict, rejection, or disapproval."
                belief="It is safer to go along."
              />

              <ShadowCard
                title="Fortress Loop"
                text="Inflated Earth. Protection becomes rigid control, hyper-independence, walls, or emotional distance."
                belief="I must protect myself at all costs."
              />

              <ShadowCard
                title="Barren Ground Loop"
                text="Colliding Earth. You keep enduring responsibility while losing nourishment, rest, joy, or support."
                belief="I must endure."
              />
            </div>
          </ContentSection>

          <ContentSection title="Somatic Signals">
            <p className="al-text-lg mb-6">
              Distorted Warrior energy often appears through jaw tension, heavy
              legs, exhaustion, rigid posture, clenched hands, survival fatigue,
              or difficulty moving from thought into action.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Heavy legs or frozen movement",
                "Jaw tension or clenched fists",
                "Rigid posture or guarded body",
                "Exhaustion from carrying too much",
                "Difficulty saying no",
                "Feeling responsible for keeping everything together",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="How to Strengthen Healthy Warrior" variant="accent">
            <p className="mb-6 text-lg leading-relaxed">
              Warrior integration begins with grounded action. The goal is not
              to become harsh. The goal is to protect your life, energy, and
              values with clarity and steadiness.
            </p>

            <div className="space-y-3">
              {[
                "Say one honest no or not now.",
                "Take one practical action you have been avoiding.",
                "Feel your feet on the ground before responding.",
                "Protect one hour of your time today.",
                "State one boundary clearly and calmly.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[var(--al-bg)]/40 p-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <div className="flex flex-wrap gap-4">
            <a href="/assessment" className="al-button-primary">
              Find My Loop
            </a>

            <a href="/practices" className="al-button-secondary">
              Explore Practices
            </a>

            <a href="/" className="al-button-secondary">
              Return Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="al-card p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="al-text mt-3">{text}</p>
    </div>
  );
}

function ShadowCard({
  title,
  text,
  belief,
}: {
  title: string;
  text: string;
  belief: string;
}) {
  return (
    <div className="al-card p-6">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="al-text mt-4">{text}</p>
      <p className="mt-5 font-semibold text-[var(--al-accent)]">
        Core belief: “{belief}”
      </p>
    </div>
  );
}

function ContentSection({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "accent";
}) {
  return (
    <section
      className={`p-8 ${
        variant === "accent" ? "al-accent-card" : "al-card"
      }`}
    >
      <h2 className="al-heading-md mb-6">{title}</h2>
      {children}
    </section>
  );
}