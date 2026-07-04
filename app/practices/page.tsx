import Footer from "../components/Footer";
import Nav from "../components/Nav";

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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-12">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Integration Practices
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Practise Your Integrated Response
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-stone-300">
              These practices help restore healthy expression in each archetype.
              Use them when an energy feels suppressed, inflated, distorted, or
              stuck.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {practices.map((practice) => (
              <div
                key={practice.archetype}
                className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_55px_rgba(216,183,120,0.06)]"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                  {practice.archetype} / {practice.element}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-yellow-300">
                  {practice.title}
                </h2>

                <p className="mt-5 leading-relaxed text-stone-300">
                  {practice.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {practice.exercises.map((exercise) => (
                    <li
                      key={exercise}
                      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 leading-relaxed text-stone-300"
                    >
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Practice is how the loop begins to change.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Small, repeatable actions help your Integrated Self become more
familiar than the old protective pattern.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
              >
                Return Home
              </a>

              <a
                href="/assessment"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Find My Loop
              </a>

              <a
                href="/triggered"
                className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                I Am Triggered
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}