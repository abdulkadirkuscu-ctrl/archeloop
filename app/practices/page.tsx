import PageShell from "../components/PageShell";

const practices = [
  {
    archetype: "Sovereign",
    element: "Fire",
    title: "Strengthen Healthy Sovereign",
    description:
      "Restore visibility, self-trust, permission, and grounded authority.",
    exercises: [
      "Make one decision today without asking for reassurance.",
      "Share one opinion clearly without apologising.",
      "Stand tall for 60 seconds and breathe into your solar plexus.",
      "Name one strength without minimizing it.",
      "Take one small visible action toward something meaningful.",
    ],
  },
  {
    archetype: "Magician",
    element: "Air",
    title: "Strengthen Healthy Magician",
    description:
      "Restore clarity, perception, language, insight, and trusted thinking.",
    exercises: [
      "Write down one clear thought before trying to solve everything.",
      "Separate facts from stories in a stressful situation.",
      "Speak one sentence even if it is not perfect.",
      "Pause and name what you actually know.",
      "Take one action before seeking complete certainty.",
    ],
  },
  {
    archetype: "Lover",
    element: "Water",
    title: "Strengthen Healthy Lover",
    description:
      "Restore emotional flow, connection, creativity, intimacy, and feeling.",
    exercises: [
      "Name one feeling without judging it.",
      "Place a hand on your heart and breathe slowly for one minute.",
      "Share one honest emotion with a safe person.",
      "Notice beauty in one small thing today.",
      "Let yourself receive care without immediately giving back.",
    ],
  },
  {
    archetype: "Warrior",
    element: "Earth",
    title: "Strengthen Healthy Warrior",
    description:
      "Restore boundaries, protection, grounded action, discipline, and strength.",
    exercises: [
      "Say one honest no or not now.",
      "Take one practical action you have been avoiding.",
      "Feel your feet on the ground before responding.",
      "Protect one hour of your time today.",
      "State one boundary clearly and calmly.",
    ],
  },
];

export default function PracticesPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-12">
          <div className="al-hero-card">
            <p className="al-kicker">Integration Practices</p>

            <h1 className="al-heading-xl">
              Practise Your Integrated Response
            </h1>

            <p className="al-text-lg mt-8 max-w-4xl">
              These practices help restore healthy expression in each archetype.
              Use them when an energy feels suppressed, inflated, distorted, or
              stuck.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {practices.map((practice) => (
              <div key={practice.archetype} className="al-card p-8">
                <p className="al-kicker">
                  {practice.archetype} / {practice.element}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                  {practice.title}
                </h2>

                <p className="al-text mt-5">
                  {practice.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {practice.exercises.map((exercise) => (
                    <li key={exercise} className="al-soft-card p-4">
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="al-premium-card mx-auto max-w-5xl p-10 text-center">
            <h2 className="al-heading-lg">
              Practice is how the loop begins to change.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Small, repeatable actions help your Integrated Self become more
              familiar than the old protective pattern.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/" className="al-button-secondary">
                Return Home
              </a>

              <a href="/assessment" className="al-button-primary">
                Find My Loop
              </a>

              <a href="/triggered" className="al-button-secondary">
                I Am Triggered
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}