import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function MagicianPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container space-y-16">
          <div>
            <p className="al-kicker">Air Element</p>

            <h1 className="al-heading-xl">The Magician Archetype</h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              The Magician governs perception, thought, interpretation,
              language, insight, understanding, and mental clarity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Healthy Air"
              text="Healthy Air creates clarity, insight, perception, curiosity, communication, and trusted thinking."
            />

            <InfoCard
              title="Core Emotion"
              text="Clarity when integrated. Fear and confusion when distorted."
            />

            <InfoCard
              title="Body Map"
              text="Head, throat, eyes, ears, mental focus, cognitive overload, speech, and perception."
            />
          </div>

          <ContentSection title="When the Magician is Healthy">
            <p className="al-text-lg mb-6">
              Healthy Magician energy allows you to understand reality clearly
              without collapsing into fear or obsession. It creates insight
              without paralysis.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "You trust your perception.",
                "You can think clearly under pressure.",
                "You communicate ideas effectively.",
                "You notice patterns without spiralling.",
                "You can reflect without obsessing.",
                "You allow clarity to emerge through action.",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="Magician Shadow Loops">
            <div className="grid gap-6 md:grid-cols-3">
              <ShadowCard
                title="Blank Page Loop"
                text="Collapse (Air). The mind freezes under pressure and thoughts disappear when needed most."
                belief="Nothing comes to me when it matters."
              />

              <ShadowCard
                title="Smoky Mirrors Loop"
                text="Compensate (Air). Reality becomes distorted through rationalisation, reinterpretation, or mental control."
                belief="If I control the story, I will be safe."
              />

              <ShadowCard
                title="Mind Maze Loop"
                text="Collide (Air). Overthinking blocks movement, creating endless mental rehearsal without action."
                belief="I must think more before acting."
              />
            </div>
          </ContentSection>

          <ContentSection title="Somatic Signals">
            <p className="al-text-lg mb-6">
              Distorted Magician energy often appears through mental overload,
              cognitive fog, dissociation, throat tension, headaches, or nervous
              system activation around thinking and speaking.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Foggy thinking or confusion",
                "Head pressure or headaches",
                "Throat tightness while speaking",
                "Overthinking without movement",
                "Mental spirals and looping thoughts",
                "Difficulty accessing words under stress",
              ].map((item) => (
                <div key={item} className="al-soft-card p-4">
                  {item}
                </div>
              ))}
            </div>
          </ContentSection>

          <ContentSection title="How to Strengthen Healthy Magician" variant="accent">
            <p className="mb-6 text-lg leading-relaxed">
              Magician integration happens when perception becomes grounded.
              Clarity grows through movement, embodiment, and reality contact —
              not endless thinking.
            </p>

            <div className="space-y-3">
              {[
                "Take one action before seeking complete certainty.",
                "Separate facts from imagined stories.",
                "Speak one sentence even if imperfect.",
                "Write down one clear thought.",
                "Pause and ask: what do I actually know right now?",
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