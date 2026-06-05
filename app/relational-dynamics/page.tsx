import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
    "Explore how different interactions activate archetypal adaptations, nervous system responses, and recurring shadow loops.",
};

export default function RelationalDynamicsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-14">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Dynamic Relational Activation
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              Different people can activate different loops.
            </h1>

            <p className="mt-8 max-w-4xl text-xl leading-relaxed text-stone-300">
              Shadow Loops are not always fixed personality traits. They can be
              adaptive states activated by relational environments, nervous
              system responses, and archetypal survival patterns.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Core Idea
            </p>

            <p className="mt-6 text-2xl leading-relaxed text-stone-100">
              ArcheLoop asks not only{" "}
              <span className="text-yellow-300">“What loop am I in?”</span>{" "}
              but also{" "}
              <span className="text-yellow-300">
                “What interaction activated this adaptation?”
              </span>
            </p>
          </div>

          <section>
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Relational Activation Model
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              How a relational moment becomes a loop.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {flow.map(([number, title, text]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                    {number}
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-yellow-300">
                    {title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-stone-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Examples
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Examples of relational activation.
            </h2>

            <div className="mt-10 space-y-5">
              {examples.map(([trigger, loop, response]) => (
                <div
                  key={trigger}
                  className="grid gap-6 rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_45px_rgba(216,183,120,0.05)] md:grid-cols-3"
                >
                  <Info label="Relational Trigger" value={trigger} />
                  <Info label="Possible Loops" value={loop} highlight />
                  <Info label="Behavioural Response" value={response} />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 shadow-[0_0_60px_rgba(216,183,120,0.06)]">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                Loop Interaction Examples
              </p>

              <h2 className="mt-5 text-4xl font-bold md:text-6xl">
                One loop can activate another.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
                ArcheLoop looks at relational patterns dynamically: how one
                person’s activated state may trigger, intensify, protect, or
                compensate inside another system.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {interactions.map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-8 transition hover:border-yellow-300/50 hover:shadow-[0_0_55px_rgba(216,183,120,0.10)]"
                >
                  <h3 className="text-3xl font-bold text-yellow-300">
                    {title}
                  </h3>

                  <p className="mt-5 leading-relaxed text-stone-300">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              This is not blame. It is pattern recognition.
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-stone-300">
              Relational dynamics do not mean another person “causes” your
              loop. They mean certain interactions can activate adaptive
              responses inside your body, mind, emotions, and archetypal
              system. Awareness creates the possibility of choice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
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
      <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/60">
        {label}
      </p>

      <p
        className={`mt-3 text-xl font-semibold ${
          highlight ? "text-yellow-300" : "text-stone-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}