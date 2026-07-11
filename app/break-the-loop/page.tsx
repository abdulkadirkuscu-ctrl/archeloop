import type { Metadata } from "next";
import PageShell from "../components/PageShell";

const steps = [
  ["1", "Name the Loop", "Notice the pattern without becoming it."],
  ["2", "Locate It in the Body", "Where do you feel it: head, chest, belly, legs, throat?"],
  ["3", "Ask the Trigger Question", "What activated this response right now?"],
  ["4", "Choose One Exit Action", "Interrupt the loop physically before analysing it."],
  ["5", "Return to Witness State", "What is actually happening right now, without story?"],
];

export const metadata: Metadata = {
  title: "Break the Loop Protocol",
  description:
    "A five-step ArcheLoop practice for recognising shadow loops, locating activation in the body, interrupting automatic reactions, and returning to conscious choice.",
};

export default function BreakTheLoopPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide">
          <p className="al-kicker">
            ArcheLoop Practice
          </p>

          <h1 className="al-heading-xl">
            Break the Loop Protocol
          </h1>

          <p className="al-text-lg mt-8 max-w-3xl">
            A simple five-step practice for recognising a Shadow Loop,
            interrupting the automatic reaction, and returning to conscious
            choice.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-5">
            {steps.map(([number, title, text]) => (
              <div key={title} className="al-card p-6">
                <p className="text-3xl font-bold text-[var(--al-accent)]">
                  {number}
                </p>

                <h2 className="mt-4 text-xl font-semibold">
                  {title}
                </h2>

                <p className="al-text mt-4 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="al-premium-card mt-20 p-8">
            <h2 className="al-heading-md">
              The Witness State
            </h2>

            <p className="al-text-lg mt-6">
              The goal is not to fight the loop. The goal is to notice it
              clearly enough that you are no longer fully identified with it.
            </p>

            <p className="mt-8 text-2xl font-semibold text-[var(--al-accent)]">
              “What is actually happening right now, without the story?”
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}