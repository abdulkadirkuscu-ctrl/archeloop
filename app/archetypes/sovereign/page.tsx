import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function SovereignPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container space-y-16">
          <div>
            <p className="al-kicker">Fire Element</p>

            <h1 className="al-heading-xl">The Sovereign Archetype</h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              The Sovereign is the archetype of inner authority, visibility,
              self-worth, leadership, and permission to exist fully.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Healthy Fire"
              text="Grounded confidence, joy, self-trust, visibility, and the ability to lead your life without needing constant approval."
            />

            <InfoCard
              title="Core Emotion"
              text="Joy when integrated. Shame when collapsed or suppressed."
            />

            <InfoCard
              title="Body Map"
              text="Solar plexus, chest, posture, breath, visibility tension, and the felt sense of taking up space."
            />
          </div>

          <ContentSection title="When the Sovereign is Healthy">
            <p className="al-text-lg mb-6">
              Healthy Sovereign energy does not dominate others. It gives you
              permission to stand in your own life. It allows you to make
              decisions, be seen, express your gifts, and move with purpose
              without shrinking or performing.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "You trust your inner authority.",
                "You make decisions without constant reassurance.",
                "You allow yourself to be visible.",
                "You can receive recognition without shame.",
                "You experience joy when following your own path.",
                "You lead without needing to control.",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="Sovereign Shadow Loops">
            <div className="grid gap-6 md:grid-cols-3">
              <ShadowCard
                title="Dimmed Light Loop"
                text="Suppressed Fire. You shrink, hide your gifts, or avoid being seen because visibility feels unsafe."
                belief="If I shine, I will be rejected."
              />

              <ShadowCard
                title="Paper Crown Loop"
                text="Inflated Fire. You may rely on achievement, admiration, status, or control to feel worthy."
                belief="I am only valuable if I appear impressive."
              />

              <ShadowCard
                title="Stalled Flame Loop"
                text="Colliding Fire. You have vision or desire, but hesitation, fear, or overthinking interrupts action."
                belief="I want to act, but I might fail."
              />
            </div>
          </ContentSection>

          <ContentSection title="Somatic Signals">
            <p className="al-text-lg mb-6">
              When Sovereign energy is blocked, the body may communicate through
              contraction around the solar plexus or heart. You may feel smaller,
              hold your breath, collapse your posture, or feel exposed when
              attention turns toward you.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Tightness in the chest or solar plexus",
                "Collapsed or shrinking posture",
                "Holding the breath when being seen",
                "Heat, shame, or discomfort under attention",
                "Difficulty speaking with authority",
                "Fear of being judged, mocked, or rejected",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="How to Strengthen Healthy Sovereign" variant="accent">
            <p className="mb-6 text-lg leading-relaxed">
              Sovereign integration begins with permission. The goal is not to
              become louder, superior, or performative. The goal is to stand in
              your own life without abandoning yourself.
            </p>

            <div className="space-y-3">
              {[
                "Make one small decision without seeking approval.",
                "Share one honest opinion without overexplaining.",
                "Stand tall and breathe into your solar plexus.",
                "Name one strength without minimizing it.",
                "Take one visible action toward something meaningful.",
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