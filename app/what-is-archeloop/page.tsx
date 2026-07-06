import Image from "next/image";
import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-7xl space-y-20">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              What Is ArcheLoop?
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
  ArcheLoop is an integrative archetypal self-awareness framework that
  helps people recognise recurring Shadow Loops, interrupt automatic
  reactions, and develop a more integrated way of being.
</p>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-400">
  Rather than asking "What's wrong with me?", ArcheLoop asks
  "What pattern am I repeating?" By recognising recurring protective
  strategies, we create the possibility for awareness, interruption,
  and integration.
</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/assessment"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Find My Loop
              </a>

              <a
                href="/loops"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Explore Shadow Loops
              </a>
            </div>
          </div>

<div className="mt-14 border-t border-b border-yellow-300/10 py-10 text-center">
  <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
    Understand • Interrupt • Integrate
  </p>

  <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
    ArcheLoop is an integrative archetypal self-awareness framework that
    helps people recognise recurring Shadow Loops, interrupt automatic
    reactions, and develop a more integrated way of being.
  </p>

  <p className="mx-auto mt-6 text-lg font-medium text-yellow-300">
    Helping people live from their Integrated Self.
  </p>
</div>

          <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Core Principle
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              You are not the loop.
            </h2>

           <div className="mx-auto mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-stone-300">
  <p>
    A Shadow Loop is not your identity.
  </p>

  <p>
    It is a recurring pattern of emotion, behaviour, and nervous system
    activation that emerges when archetypal energies collapse,
    compensate, or collide under pressure.
  </p>

  <p className="font-medium text-yellow-300">
    Awareness is the beginning of integration.
  </p>
</div>
          </section>

          <section>
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                The Foundation
              </p>

              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                The Four Archetypes
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
  Every person has access to four archetypal energies: Fire, Air,
  Water, and Earth.

  Together they shape how we think, relate, protect, express
  ourselves, and respond under pressure.
</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {archetypes.map((item) => (
                <div
                  key={item.archetype}
                  className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
                >
                  <div className="flex items-center gap-5">
                    <Image
                      src={item.image}
                      alt={`${item.element} Element`}
                      width={70}
                      height={70}
                      className="object-contain"
                    />

                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                        {item.element}
                      </p>

                      <h3 className="mt-2 text-3xl font-bold text-yellow-300">
                        {item.archetype}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 leading-relaxed text-stone-300">
                    {item.text}
                  </p>

                  <p className="mt-5 text-lg italic text-stone-500">
                    “{item.question}”
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                How Shadow Loops Form
              </p>

              <h2 className="mt-5 text-4xl font-bold md:text-5xl">
                Collapse. Compensate. Collide.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
                Shadow Loops emerge when archetypal energies collapse,
compensate, or collide under pressure. The
                surface behaviour may look different, but underneath it usually
                follows one of three patterns.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {formations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold text-yellow-300">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-xl leading-relaxed text-stone-100">
                    “{item.belief}”
                  </p>

                  <p className="mt-5 leading-relaxed text-stone-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Shadow Loop
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              What is a Shadow Loop?
            </h2>

            <div className="mt-8 max-w-4xl space-y-6 text-xl leading-relaxed text-stone-300">
              <p>
A Shadow Loop is a recurring pattern of emotion, behaviour, and nervous
system activation that emerges when archetypal energies collapse,
compensate, or collide under pressure.
</p>

<p>
Shadow Loops are not flaws or identities. They are protective strategies
that once helped you adapt.
</p>

<p>
ArcheLoop helps you recognise those patterns, interrupt automatic
reactions, and live from your Integrated Self.
</p>
            </div>
          </section>

          <section>
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
                How ArcheLoop Works
              </p>

             <h2 className="mt-5 text-4xl font-bold md:text-5xl">
  The ArcheLoop Process
</h2>

<p className="mt-5 text-lg uppercase tracking-[0.3em] text-yellow-300/70">
  Understand • Interrupt • Integrate
</p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-300 text-lg font-bold text-black">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-yellow-300">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-stone-300">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Begin Here
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
  Discover your Shadow Loop.
</h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
  Begin by discovering your Shadow Loop and receive your personalised
  ArcheLoop Report with your Integration Journey.
</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/assessment"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Find My Loop
              </a>

              <a
                href="/loops"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Explore the 12 Shadow Loops
              </a>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}