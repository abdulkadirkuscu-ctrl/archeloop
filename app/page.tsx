import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FoundingCounter from "../components/FoundingCounter";

const patterns = [
  "Overthinking instead of taking action",
  "Freezing when trying to express yourself",
  "People pleasing to avoid conflict",
  "Seeking validation to feel worthy",
  "Shutting down under pressure",
  "Feeling emotionally overwhelmed",
  "Wanting connection while fearing vulnerability",
  "Feeling stuck in cycles you cannot explain",
];

const discoveries = [
  "Your Primary Shadow Loop™",
  "Your Secondary Shadow Loop™",
  "Your Archetype & Element",
  "Your Nervous System Pattern",
  "Your Integrated Self™",
  "Your Personalised ArcheLoop Report™",
];

const userJourney = [
  {
    number: "1",
    title: "Find My Loop™",
    text: "Complete the 60-question assessment and discover your Primary Shadow Loop™, Secondary Shadow Loop™, Archetype, and Integrated Self™.",
  },
  {
    number: "2",
    title: "ArcheLoop Report™",
    text: "Receive your personalised report and understand why the loop repeats, what activates it, and how it shapes your reactions and relationships.",
  },
  {
    number: "3",
    title: "I Am Triggered™",
    text: "Use the free tool to notice which Shadow Loop™ may be active in real life when you feel triggered.",
  },
  {
    number: "4",
    title: "ArcheLoop Integration™",
    text: "Continue into the premium integration system to practise becoming the integrated version of yourself.",
  },
  {
    number: "5",
    title: "Progress Dashboard™",
    text: "Track recurring loops, triggers, people, environments, and progress over time.",
  },
  {
    number: "6",
    title: "Integrated Self™",
    text: "Move beyond the protective pattern and embody the healthier state your loop points toward.",
  },
];

const archeLoopPath = [
  {
    number: "1",
    title: "Discover Your Shadow Loop™",
    text: "Find the repeating unconscious pattern beneath your reactions.",
  },
  {
    number: "2",
    title: "Understand Why It Repeats",
    text: "See the core fear, belief, body activation, and protective response behind the loop.",
  },
  {
    number: "3",
    title: "Meet Your Integrated Self™",
    text: "Discover the healthier identity waiting underneath the pattern.",
  },
  {
    number: "4",
    title: "Notice Real-Life Activations",
    text: "Use I Am Triggered™ to notice what activates you, where, when, and around whom.",
  },
  {
    number: "5",
    title: "Follow Your Integration Journey™",
    text: "Move from awareness into interruption, embodiment, and transformation.",
  },
];

const products = [
  {
    label: "Free",
    title: "Explore ArcheLoop™",
    priceType: "free",
    items: [
      "The 12 Shadow Loops™",
      "Archetypes, Body Map, Nervous System & Practices",
      "Basic I Am Triggered™",
      "Educational self-development pages",
    ],
    href: "/loops",
    cta: "Explore Free Resources",
  },
  {
    label: "Recommended First Step",
    title: "Find My Loop™",
    priceType: "founding-report",
    items: [
      "60-question Find My Loop™ assessment",
      "Primary & Secondary Shadow Loops™",
      "Archetype & Element",
      "Nervous System Pattern",
      "Integrated Self™",
      "Full ArcheLoop Report™",
    ],
    href: "/assessment",
    cta: "Find My Loop™",
  },
  {
    label: "Transformation",
    title: "ArcheLoop Integration™",
    priceType: "founding-integration",
    items: [
      "Triggered Pro™",
      "Progress Dashboard™",
      "Integration Journeys™",
      "My Integrated Vision™",
      "Practices & Reflection Prompts™",
      "Personal Integration Tracking™",
    ],
    href: "/integration",
    cta: "Explore Integration™",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.4em] text-yellow-300/70">
            ArcheLoop™
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Why do you keep repeating
            <br />
            the same patterns?
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300 md:text-2xl">
            Discover the unconscious Shadow Loop™ behind your reactions,
            relationships, decisions, self-sabotage, and emotional patterns.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Find My Loop™
            </a>

            <a
              href="/triggered"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Try I Am Triggered™
            </a>
          </div>

          <FoundingCounter />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Start With What Feels Familiar
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Do any of these patterns feel familiar?
          </h2>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4">
            {patterns.map((pattern) => (
              <div
                key={pattern}
                className="rounded-full border border-yellow-300/10 bg-black/30 px-6 py-4 text-base text-stone-300 md:text-lg"
              >
                {pattern}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-400">
            The loop may look different on the surface.
            <br />
            The pattern underneath is often the same.
          </p>

          <a
            href="/assessment"
            className="mt-12 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Find My Loop™
          </a>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            What Is A Shadow Loop™?
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            The Core Of ArcheLoop™
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            A Shadow Loop™ is a recurring unconscious pattern that continues
            repeating despite your best intentions.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-400">
            Most people only see the reaction.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-400">
            ArcheLoop™ helps you discover the hidden fear, protective response,
            nervous system activation, archetypal pattern, and integrated path
            beneath it.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-400">
            Because awareness is the first step toward transformation.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            What You’ll Discover
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Find the loop behind the reaction.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Find My Loop™ helps reveal your Shadow Loop™, archetypal pattern,
            nervous system pattern, and personalised ArcheLoop Report™.
          </p>

          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {discoveries.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-stone-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              How ArcheLoop™ Works
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              A clear path from discovery to integration.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop™ is designed as a step-by-step journey: discover your
              Shadow Loop™, understand why it repeats, notice it in real life,
              and practise becoming your Integrated Self™.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {userJourney.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6 shadow-[0_0_35px_rgba(216,183,120,0.04)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold text-yellow-300">
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-stone-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/assessment"
              className="inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start With Find My Loop™
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              The ArcheLoop™ Path
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              Understand. Interrupt. Integrate.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop™ turns emotional reactions into a clear transformation
              pathway.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-5">
            {archeLoopPath.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-6 shadow-[0_0_35px_rgba(216,183,120,0.04)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold text-yellow-300">
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-stone-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Meet Your Integrated Self™
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            You are not the loop.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Every Shadow Loop™ points toward an integrated state: Healthy
            Visibility, Authentic Expression, Self-Respect, Connected Strength,
            Inner Vitality, and more.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-400">
            Your Integrated Self™ is not someone new. It is who you become when
            the Shadow Loop™ no longer controls your choices.
          </p>

          <a
            href="/integration"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Preview Integration Journeys™
          </a>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Choose Your Path
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-6xl">
              Start where you are.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              Explore ArcheLoop™ for free, discover your Shadow Loop™ with Find
              My Loop™, or continue into ArcheLoop Integration™ for deeper
              transformation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.title}
                className={`rounded-[2.5rem] p-8 shadow-[0_0_55px_rgba(216,183,120,0.06)] ${
                  product.priceType === "founding-report"
                    ? "border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black"
                    : "border border-yellow-300/10 bg-[#0B1018]"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                  {product.label}
                </p>

                <h3 className="mt-4 text-3xl font-bold text-yellow-300">
                  {product.title}
                </h3>

                <PricingBlock type={product.priceType} />

                <ul className="mt-7 space-y-3">
                  {product.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 leading-relaxed text-stone-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={product.href}
                  className={`mt-8 inline-flex rounded-full px-6 py-3 font-semibold transition ${
                    product.priceType === "founding-report"
                      ? "bg-yellow-300 text-black hover:bg-yellow-200"
                      : "border border-yellow-300/20 bg-yellow-300/10 text-yellow-200 hover:border-yellow-300/60"
                  }`}
                >
                  {product.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Founding Access
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            ArcheLoop™ is currently in Founding Access.
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            Find My Loop™ and ArcheLoop Integration™ are temporarily available
            while ArcheLoop™ is being refined, expanded, and tested by early
            users.
          </p>
<div className="mt-10 max-w-3xl mx-auto">
  <p className="uppercase tracking-[0.35em] text-yellow-300/70 mb-6">
    Future Pricing
  </p>

  <div className="space-y-8 text-left">
    <div>
      <h3 className="text-xl font-semibold text-white">
        Find My Loop™
      </h3>

      <p className="mt-2 text-2xl font-bold text-yellow-300">
        £29
      </p>

      <p className="mt-2 text-stone-400">
        Includes the 60-question assessment and your personalised
        ArcheLoop Report™.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-white">
        ArcheLoop Integration™
      </h3>

      <p className="mt-2 text-2xl font-bold text-yellow-300">
        £29/month
      </p>

      <p className="mt-2 text-stone-400">
        Includes Triggered Pro™, Progress Dashboard™, Integration
        Journeys™, My Integrated Vision™, Practices™, Reflection
        Prompts™, and Personal Integration Tracking™.
      </p>
    </div>
  </div>

  <p className="mt-8 text-sm text-stone-500">
    Founding Access members may receive discounted pricing when ArcheLoop™ launches publicly.
  </p>
</div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-yellow-300/10 bg-black/30 p-6 text-left">
  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
    Founding Access Notice
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-400">
    ArcheLoop™ products are temporarily available during Founding Access while
    the platform is being refined with early users.
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-500">
    Future access to Find My Loop™, ArcheLoop Report™, ArcheLoop Integration™,
    Triggered Pro™, Progress Dashboard™, and Integration Journeys™ may require
    an active purchase or subscription after public launch. Founding Access does
    not guarantee free lifetime access.
  </p>
</div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Begin Here
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-6xl">
            Discover the Shadow Loop™ you keep repeating.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            Start with Find My Loop™ and receive your personalised ArcheLoop
            Report™.
          </p>

          <a
            href="/assessment"
            className="mt-10 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
          >
            Find My Loop™
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
function PricingBlock({ type }: { type: string }) {
  if (type === "free") {
    return (
      <div className="mt-4">
        <p className="text-2xl font-semibold text-stone-100">£0</p>
        <p className="mt-2 text-sm text-stone-400">
          Free educational access and basic I Am Triggered™.
        </p>
      </div>
    );
  }

  if (type === "founding-report") {
    return (
      <div className="mt-4">
        <p className="text-lg text-stone-500 line-through">£29</p>

        <p className="text-2xl font-semibold text-yellow-300">
          
        </p>

        <p className="mt-2 text-sm text-stone-400">
          Free during Founding Access.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-lg text-stone-500 line-through">£29/month</p>

      <p className="text-2xl font-semibold text-yellow-300">
       
      </p>

      <p className="mt-2 text-sm text-stone-400">
        Free during Founding Access.
      </p>
    </div>
  );
}