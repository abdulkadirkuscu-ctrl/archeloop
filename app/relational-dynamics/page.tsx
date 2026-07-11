import type { Metadata } from "next";
import PageShell from "../components/PageShell";

const flow = [
  ["1", "Relational Trigger", "Something happens externally: criticism, confusion, pressure, distance, intensity, or invalidation."],
  ["2", "Nervous System Activation", "The body reacts: tight chest, foggy mind, heat, collapse, tension, shutdown, or hypervigilance."],
  ["3", "Archetypal Adaptation", "One archetypal function becomes defensive, inflated, suppressed, or compensatory."],
  ["4", "Shadow Loop", "A recurring loop begins: Paper Crown, Mind Maze, Fortress, Fantasy Fog, Compliance, or another pattern."],
  ["5", "Behavioural Response", "You may over-explain, withdraw, prove, freeze, defend, collapse, chase, or shut down."],
  ["6", "Integration / Exit", "You return through grounding, boundaries, clear expression, emotional regulation, or embodied action."],
];

const examples = [
  ["Status pressure", "Paper Crown / Dimmed Light", "proving, shrinking, over-performing"],
  ["Confusing communication", "Blank Page / Smoky Mirrors", "mental freeze, doubt, over-explaining"],
  ["Emotional unpredictability", "Fortress / Emotional Lockdown", "withdrawal, guardedness, shutdown"],
  ["Fantasy or inflated stories", "Mind Maze / Warrior compensation", "reality-checking, tension, control"],
];

const interactions = [
  [
    "Fantasy Fog ↔ Fortress",
    "Longing, projection, or emotional fantasy may activate distance, guardedness, or withdrawal. Withdrawal may then intensify longing.",
  ],
  [
    "Flooded Waters ↔ Emotional Lockdown",
    "Emotional intensity may activate shutdown. Shutdown may then increase urgency, protest, or fear of disconnection.",
  ],
  [
    "Paper Crown ↔ Compliance",
    "Achievement pressure, status, or conditional approval may activate adaptation, pleasing, or self-suppression.",
  ],
  [
    "Mind Maze ↔ Stalled Flame",
    "Over-analysis may interrupt action. Lack of movement may then create more uncertainty and mental looping.",
  ],
];

export const metadata: Metadata = {
  title: "Dynamic Relational Activation",
  description:
    "Explore how relationships, nervous system responses, and protective adaptations can activate recurring Shadow Loops.",
};

export default function RelationalDynamicsPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-14">
          <div className="al-hero-card">
            <p className="al-kicker">Dynamic Relational Activation</p>

            <h1 className="al-heading-xl">
              Different people can activate different loops.
            </h1>

            <p className="al-text-lg mt-8 max-w-4xl">
              Shadow Loops are not fixed personality traits. They can be
              adaptive states activated by relational environments, nervous
              system responses, and protective survival patterns.
            </p>
          </div>

          <div className="al-premium-card p-10">
            <p className="al-kicker">Core Idea</p>

            <p className="mt-6 text-2xl leading-relaxed">
              ArcheLoop asks not only{" "}
              <span className="text-[var(--al-accent)]">“What loop am I in?”</span>{" "}
              but also{" "}
              <span className="text-[var(--al-accent)]">
                “What interaction activated this adaptation?”
              </span>
            </p>
          </div>

          <section>
            <p className="al-kicker">Relational Activation Model</p>

            <h2 className="al-heading-lg">
              How a relational moment becomes a loop.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {flow.map(([number, title, text]) => (
                <div key={title} className="al-card p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--al-accent)] text-sm font-bold text-[var(--al-bg)]">
                    {number}
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-[var(--al-accent)]">
                    {title}
                  </h3>

                  <p className="al-text mt-4">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="al-kicker">Examples</p>

            <h2 className="al-heading-lg">
              Examples of relational activation.
            </h2>

            <div className="mt-10 space-y-5">
              {examples.map(([trigger, loop, response]) => (
                <div key={trigger} className="al-card grid gap-6 p-6 md:grid-cols-3">
                  <Info label="Relational Trigger" value={trigger} />
                  <Info label="Possible Loops" value={loop} highlight />
                  <Info label="Behavioural Response" value={response} />
                </div>
              ))}
            </div>
          </section>

          <section className="al-card p-10">
            <div className="text-center">
              <p className="al-kicker">Loop Interaction Examples</p>

              <h2 className="al-heading-lg">
                One loop can activate another.
              </h2>

              <p className="al-text-lg mx-auto mt-6 max-w-3xl">
                ArcheLoop looks at relational patterns dynamically: how one
                person’s activated state may trigger, intensify, protect, or
                compensate inside another system.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {interactions.map(([title, description]) => (
                <div key={title} className="al-soft-card p-8 transition hover:border-[var(--al-accent)]">
                  <h3 className="text-3xl font-bold text-[var(--al-accent)]">
                    {title}
                  </h3>

                  <p className="al-text mt-5">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="al-premium-card p-10">
            <h2 className="al-heading-lg">
              This is not blame. It is pattern recognition.
            </h2>

            <p className="al-text-lg mt-6">
              Relational dynamics do not mean another person “causes” your
              loop. They mean certain interactions can activate adaptive
              responses inside your body, mind, emotions, and archetypal
              system. Awareness creates the possibility of choice.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="al-kicker">{label}</p>

      <p
        className={`mt-3 text-xl font-semibold ${
          highlight ? "text-[var(--al-accent)]" : "text-[var(--al-text)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}