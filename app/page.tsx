import Nav from "./components/Nav";
import Footer from "./components/Footer";

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
    title: "Discover What Keeps Repeating",
    text: "Complete the 60-question assessment and identify the unconscious Shadow Loop™ driving your reactions, relationships, decisions, and emotional patterns.",
  },
  {
    number: "2",
    title: "Understand Why It Happens",
    text: "Receive your personalised ArcheLoop Report™ showing what activates the loop, how your nervous system responds, what belief keeps it alive, and what your Integrated Self™ looks like.",
  },
  {
    number: "3",
    title: "Catch It In Real Life",
    text: "Use I Am Triggered™ to recognise your Shadow Loop™ when it appears in real situations, conversations, relationships, and emotional moments.",
  },
  {
    number: "4",
    title: "Interrupt The Pattern",
    text: "Use ArcheLoop Integration™ to practise new responses before the old loop controls your choices.",
  },
  {
    number: "5",
    title: "Track What Activates You",
    text: "See which people, environments, emotions, and situations trigger your Shadow Loop™ most often through your Progress Dashboard™ and Monthly Review™.",
  },
  {
    number: "6",
    title: "Become Your Integrated Self™",
    text: "Move from unconscious reaction into healthier choices, steadier responses, and the integrated state your loop points toward.",
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
    priceType: "launch-report",
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
   priceType: "launch-integration",
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

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
  Why do certain patterns
  <br />
  keep repeating?
</h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-stone-300 md:text-xl">
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
<div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-5">
  <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
    Launch Offer
  </p>
  <p className="mt-2 text-lg font-semibold text-yellow-200">
    Early members save up to 50% during launch.
  </p>
</div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-10 text-center shadow-[0_0_60px_rgba(216,183,120,0.06)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Start With What Feels Familiar
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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
        What Happens After You Click?
      </p>

      <h2 className="mt-5 text-4xl font-bold md:text-5xl">
        From assessment to real-life change.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
        ArcheLoop™ is not just a quiz. It is a guided path from recognising the
        pattern to understanding it, tracking it, and practising a different
        response.
      </p>
    </div>

    <div className="mt-12 grid gap-5 md:grid-cols-5">
      {[
        ["5–7 min", "Complete Find My Loop™"],
        ["Instant", "Receive your report"],
        ["Daily", "Log real-life triggers"],
        ["Monthly", "Review your patterns"],
        ["Ongoing", "Practise your Integrated Self™"],
      ].map(([label, text]) => (
        <div
          key={label}
          className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6 text-center"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
            {label}
          </p>
          <p className="mt-4 text-lg font-semibold text-stone-100">{text}</p>
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

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              A clear path from discovery to integration.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
             ArcheLoop™ helps you move from “Why does this keep happening?” to
“I can see the pattern, interrupt it, and practise a different way of
responding.”
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
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Meet Your Integrated Self™
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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
                  product.priceType === "launch-report"
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
                  product.priceType === "launch-report"
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


      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Begin Here
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
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

  if (type === "launch-report") {
    return (
      <div className="mt-4">
        <p className="text-sm text-stone-500">
          Regular price <span className="line-through">£29</span>
        </p>

        <p className="mt-1 text-3xl font-bold text-yellow-300">£19</p>

        <p className="mt-2 text-sm text-stone-400">
          Launch offer for early members.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-stone-500">
        Regular price <span className="line-through">£29/month</span>
      </p>

      <p className="mt-1 text-3xl font-bold text-yellow-300">£14.99/month</p>

      <p className="mt-2 text-sm text-stone-400">
        Launch offer for early members.
      </p>
    </div>
  );
}