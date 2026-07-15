import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function LoverPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container space-y-16">
          <div>
            <p className="al-kicker">Water Element</p>

            <h1 className="al-heading-xl">The Lover Archetype</h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              The Lover governs emotion, connection, intimacy, grief, beauty,
              creativity, and the capacity to feel deeply without losing
              yourself.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Healthy Water"
              text="Healthy Water creates emotional flow, connection, vulnerability, intimacy, creativity, and the ability to feel without collapse."
            />

            <InfoCard
              title="Core Emotion"
              text="Love and connection when integrated. Grief, longing, or numbness when distorted."
            />

            <InfoCard
              title="Body Map"
              text="Heart, belly, sacral area, emotional breath, tenderness, openness, numbness, and emotional flooding."
            />
          </div>

          <ContentSection title="When the Lover is Healthy">
            <p className="al-text-lg mb-6">
              Healthy Lover energy allows you to feel, connect, create, and
              receive without abandoning yourself. It does not mean emotional
              chaos. It means safe emotional flow.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "You can feel deeply without becoming overwhelmed.",
                "You express affection without losing yourself.",
                "You can receive care without guilt.",
                "You stay connected to your body and emotions.",
                "You create beauty and meaning through feeling.",
                "You can grieve, love, and open without collapsing.",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="Lover Shadow Loops">
            <div className="grid gap-6 md:grid-cols-3">
              <ShadowCard
                title="Emotional Lockdown Loop"
                text="Collapse (Water). Feelings are numbed, hidden, or avoided because vulnerability feels unsafe."
                belief="Feeling is dangerous."
              />

              <ShadowCard
                title="Fantasy Fog Loop"
                text="Compensate (Water). Imagination, longing, or idealisation replaces direct contact with reality."
                belief="It is safer in my inner world."
              />

              <ShadowCard
                title="Flooded Waters Loop"
                text="Collide (Water). Emotion becomes too intense to regulate, creating overwhelm, urgency, or collapse."
                belief="My feelings are too much."
              />
            </div>
          </ContentSection>

          <ContentSection title="Somatic Signals">
            <p className="al-text-lg mb-6">
              Distorted Lover energy often appears through emotional flooding,
              numbness, chest heaviness, belly sensitivity, longing, or the
              feeling of being overwhelmed by connection.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Chest heaviness or heart ache",
                "Emotional numbness or shutdown",
                "Belly sensitivity or sinking feeling",
                "Overwhelming waves of grief or longing",
                "Difficulty receiving care",
                "Escaping into fantasy or imagined connection",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="How to Strengthen Healthy Lover" variant="accent">
            <p className="text-lg leading-relaxed mb-6">
              Lover integration begins with safe contact. You do not have to
              feel everything at once. The practice is to allow emotion in
              small, grounded doses.
            </p>

            <div className="space-y-3">
              {[
                "Name one feeling without judging it.",
                "Place a hand on your heart and breathe slowly for one minute.",
                "Share one honest emotion with a safe person.",
                "Notice beauty in one small thing today.",
                "Let yourself receive care without immediately giving back.",
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