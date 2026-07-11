import Image from "next/image";
import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "What Is ArcheLoop?",
  description:
    "ArcheLoop is an integrative archetypal self-awareness framework that helps people recognise recurring Shadow Loops, interrupt automatic reactions, and develop a more integrated way of being.",
};

const archetypes = [
  {
    element: "Fire",
    archetype: "Sovereign",
    image: "/images/elements/fire-element.png",
    text: "Visibility, agency, confidence, direction, self-worth, and permission to take up space.",
    question: "Am I allowed to exist visibly?",
  },
  {
    element: "Air",
    archetype: "Magician",
    image: "/images/elements/air-element.png",
    text: "Perception, interpretation, language, insight, clarity, and the power of meaning.",
    question: "Can I trust what I perceive and express?",
  },
  {
    element: "Water",
    archetype: "Lover",
    image: "/images/elements/water-element.png",
    text: "Emotion, intimacy, creativity, connection, longing, vulnerability, and emotional truth.",
    question: "Am I safe to feel and connect?",
  },
  {
    element: "Earth",
    archetype: "Warrior",
    image: "/images/elements/earth-element.png",
    text: "Boundaries, protection, grounded action, discipline, responsibility, and embodied strength.",
    question: "Am I allowed to protect what matters?",
  },
];

const formations = [
  {
    title: "Collapse",
    subtitle: "Suppression",
    belief: "This part of me is not allowed.",
    text: "A natural energy goes quiet, hidden, frozen, or unavailable. You may shrink, shut down, freeze, people please, or disconnect from a part of yourself.",
  },
  {
    title: "Compensate",
    subtitle: "Compensation",
    belief: "I must become something else to stay safe.",
    text: "A protective strategy takes over. You may perform, control, idealise, overthink, achieve, distance, or create an identity that protects the more vulnerable part underneath.",
  },
  {
    title: "Collide",
    subtitle: "Collision",
    belief: "Two inner forces are pulling me in opposite directions.",
    text: "Two energies become active at the same time but cannot integrate. This can create paralysis, overwhelm, emotional flooding, mental loops, or exhaustion.",
  },
];

const steps = [
  {
    number: "1",
    title: "Understand",
    text: "Recognise your Shadow Loop and understand the recurring protective pattern beneath your reactions.",
  },
  {
    number: "2",
    title: "Interrupt",
    text: "Learn to recognise the loop while it is happening instead of only noticing it afterwards.",
  },
  {
    number: "3",
    title: "Practise",
    text: "Use Integration Journeys, Triggered, and personalised practices to develop healthier responses.",
  },
  {
    number: "4",
    title: "Integrate",
    text: "Strengthen your Integrated Self until healthier ways of being become more available.",
  },
];

export default function WhatIsArcheLoopPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container-wide space-y-20">
          <div className="al-hero-card text-center">
            <p className="al-kicker">ArcheLoop</p>

            <h1 className="al-heading-xl">What Is ArcheLoop?</h1>

            <p className="al-text-lg mx-auto mt-8 max-w-3xl">
              ArcheLoop is an integrative archetypal self-awareness framework
              that helps people recognise recurring Shadow Loops, interrupt
              automatic reactions, and develop a more integrated way of being.
            </p>

            <p className="al-text mx-auto mt-6 max-w-3xl">
              Rather than asking “What’s wrong with me?”, ArcheLoop asks “What
              pattern am I repeating?” By recognising recurring protective
              strategies, we create the possibility for awareness, interruption,
              and integration.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/assessment" className="al-button-primary">
                Find My Loop
              </a>

              <a href="/loops" className="al-button-secondary">
                Explore Shadow Loops
              </a>
            </div>
          </div>

          <div className="al-philosophy-strip">
            <p className="al-kicker">Understand • Interrupt • Integrate</p>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              ArcheLoop is an integrative archetypal self-awareness framework
              that helps people recognise recurring Shadow Loops, interrupt
              automatic reactions, and develop a more integrated way of being.
            </p>

            <p className="al-gold mx-auto mt-6 text-lg font-semibold">
              Helping people live from their Integrated Self.
            </p>
          </div>

          <section className="al-premium-card p-10 text-center">
            <p className="al-kicker">Core Principle</p>

            <h2 className="al-heading-lg al-gold">You are not the loop.</h2>

            <div className="al-text-lg mx-auto mt-6 max-w-3xl space-y-6">
              <p>A Shadow Loop is not your identity.</p>

              <p>
                It is a recurring pattern of emotion, behaviour, and nervous
                system activation that emerges when archetypal energies
                collapse, compensate, or collide under pressure.
              </p>

              <p className="al-gold font-semibold">
                Awareness is the beginning of integration.
              </p>
            </div>
          </section>

          <section>
            <SectionIntro
              kicker="The Foundation"
              title="The Four Archetypes"
              text="Every person has access to four archetypal energies: Fire, Air, Water, and Earth. Together they shape how we think, relate, protect, express ourselves, and respond under pressure."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {archetypes.map((item) => (
                <div key={item.archetype} className="al-card p-8">
                  <div className="flex items-center gap-5">
                    <Image
                      src={item.image}
                      alt={`${item.element} Element`}
                      width={70}
                      height={70}
                      className="object-contain"
                    />

                    <div>
                      <p className="al-kicker">{item.element}</p>

                      <h3 className="mt-2 text-3xl font-bold text-[var(--al-accent)]">
                        {item.archetype}
                      </h3>
                    </div>
                  </div>

                  <p className="al-text mt-6">{item.text}</p>

                  <p className="al-muted mt-5 text-lg italic">
                    “{item.question}”
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionIntro
              kicker="How Shadow Loops Form"
              title="Collapse. Compensate. Collide."
              text="Shadow Loops emerge when archetypal energies collapse, compensate, or collide under pressure. The surface behaviour may look different, but underneath it usually follows one of three patterns."
            />

            <div className="grid gap-6 md:grid-cols-3">
              {formations.map((item) => (
                <div key={item.title} className="al-card p-8">
                  <p className="al-kicker">{item.subtitle}</p>

                  <h3 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-xl leading-relaxed text-[var(--al-text)]">
                    “{item.belief}”
                  </p>

                  <p className="al-text mt-5">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="al-card p-10">
            <p className="al-kicker">Shadow Loop</p>

            <h2 className="al-heading-lg">What is a Shadow Loop?</h2>

            <div className="al-text-lg mt-8 max-w-4xl space-y-6">
              <p>
                A Shadow Loop is a recurring pattern of emotion, behaviour, and
                nervous system activation that emerges when archetypal energies
                collapse, compensate, or collide under pressure.
              </p>

              <p>
                Shadow Loops are not flaws or identities. They are protective
                strategies that once helped you adapt.
              </p>

              <p>
                ArcheLoop helps you recognise those patterns, interrupt
                automatic reactions, and live from your Integrated Self.
              </p>
            </div>
          </section>

          <section>
            <SectionIntro
              kicker="How ArcheLoop Works"
              title="The ArcheLoop Process"
              text="Understand • Interrupt • Integrate"
            />

            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="al-card p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--al-accent)] text-lg font-bold text-[var(--al-bg)]">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-[var(--al-accent)]">
                    {step.title}
                  </h3>

                  <p className="al-text mt-4">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="al-premium-card p-10 text-center">
            <p className="al-kicker">Begin Here</p>

            <h2 className="al-heading-lg">Discover your Shadow Loop.</h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Begin by discovering your Shadow Loop and receive your
              personalised ArcheLoop Report with your Integration Journey.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/assessment" className="al-button-primary">
                Find My Loop
              </a>

              <a href="/loops" className="al-button-secondary">
                Explore the 12 Shadow Loops
              </a>
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}

function SectionIntro({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-12 text-center">
      <p className="al-kicker">{kicker}</p>

      <h2 className="al-heading-lg">{title}</h2>

      <p className="al-text-lg mx-auto mt-6 max-w-3xl">{text}</p>
    </div>
  );
}