import PageShell from "./components/PageShell";
import Image from "next/image";

const shadowLoopPreview = [
  {
    element: "Fire",
    loops: [
      { name: "Dimmed Light", image: "/images/loops/dimmed-light.png", slug: "dimmed-light" },
      { name: "Paper Crown", image: "/images/loops/paper-crown.png", slug: "paper-crown" },
      { name: "Stalled Flame", image: "/images/loops/stalled-flame.png", slug: "stalled-flame" },
    ],
  },
  {
    element: "Air",
    loops: [
      { name: "Blank Page", image: "/images/loops/blank-page.png", slug: "blank-page" },
      { name: "Smoky Mirrors", image: "/images/loops/smoky-mirrors.png", slug: "smoky-mirrors" },
      { name: "Mind Maze", image: "/images/loops/mind-maze.png", slug: "mind-maze" },
    ],
  },
  {
    element: "Water",
    loops: [
      { name: "Emotional Lockdown", image: "/images/loops/emotional-lockdown.png", slug: "emotional-lockdown" },
      { name: "Fantasy Fog", image: "/images/loops/fantasy-fog.png", slug: "fantasy-fog" },
      { name: "Flooded Waters", image: "/images/loops/flooded-waters.png", slug: "flooded-waters" },
    ],
  },
  {
    element: "Earth",
    loops: [
      { name: "Compliance", image: "/images/loops/compliance.png", slug: "compliance" },
      { name: "Fortress", image: "/images/loops/fortress.png", slug: "fortress" },
      { name: "Barren Ground", image: "/images/loops/barren-ground.png", slug: "barren-ground" },
    ],
  },
];

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
  "Your Primary Shadow Loop",
  "Your Secondary Shadow Loop",
  "Your Archetype & Element",
  "Your Nervous System Pattern",
  "Your Integrated Self",
  "Your Personalised ArcheLoop Report",
];

const userJourney = [
  {
    number: "1",
    title: "Discover What Keeps Repeating",
    text: "Complete the 60-question assessment and identify the unconscious Shadow Loop driving your reactions, relationships, decisions, and emotional patterns.",
  },
  {
    number: "2",
    title: "Understand Why It Happens",
    text: "Receive your personalised ArcheLoop Report showing what activates the loop, how your nervous system responds, what belief keeps it alive, and what your Integrated Self looks like.",
  },
  {
    number: "3",
    title: "Catch It In Real Life",
    text: "Use I Am Triggered to recognise your Shadow Loop when it appears in real situations, conversations, relationships, and emotional moments.",
  },
  {
    number: "4",
    title: "Interrupt The Pattern",
    text: "Use ArcheLoop Integration to practise new responses before the old loop controls your choices.",
  },
  {
    number: "5",
    title: "Track What Activates You",
    text: "See which people, environments, emotions, and situations trigger your Shadow Loop most often through your Progress Dashboard and Monthly Review.",
  },
  {
    number: "6",
    title: "Become Your Integrated Self",
    text: "Move from unconscious reaction into healthier choices, steadier responses, and the integrated state your loop points toward.",
  },
];

const products = [
  {
    label: "Free",
    title: "Explore ArcheLoop",
    priceType: "free",
    items: [
      "The 12 Shadow Loops",
      "Archetypes, Body Map, Nervous System & Practices",
      "Basic I Am Triggered",
      "Educational self-development pages",
    ],
    href: "/loops",
    cta: "Explore Free Resources",
  },
  {
    label: "Recommended First Step",
    title: "Find My Loop",
    priceType: "launch-report",
    items: [
      "60-question Find My Loop assessment",
      "Primary & Secondary Shadow Loops",
      "Archetype & Element",
      "Nervous System Pattern",
      "Integrated Self",
      "Full ArcheLoop Report",
    ],
    href: "/assessment",
    cta: "Find My Loop",
  },
  {
    label: "Transformation",
    title: "ArcheLoop Integration",
    priceType: "launch-integration",
    items: [
      "Triggered Pro",
      "Progress Dashboard",
      "Integration Journeys",
      "My Integrated Vision",
      "Practices & Reflection Prompts",
      "Personal Integration Tracking",
    ],
    href: "/integration",
    cta: "Explore Integration",
  },
];

export default function Home() {
  return (
<PageShell>

      <section className="al-hero">
        <div className="al-hero-card al-fade-in">
        <p className="al-brand-tagline justify-center">
  <span className="al-understand-word">Understand</span>

  <span className="al-brand-divider">•</span>

  <span className="al-interrupt-word">Interrupt</span>

  <span className="al-brand-divider">•</span>

  <span className="al-integrate-word">Integrate</span>
</p>

          <h1 className="al-heading-xl">
  Why do certain{" "}
  <span className="al-serif-italic al-secondary">patterns</span>
  <br />
  keep repeating?
</h1>

         <p className="al-text-lg mx-auto mt-8 max-w-2xl">
  Discover why the same patterns keep repeating.
</p>

          <div className="al-actions">
            <a href="/assessment" className="al-button-primary">
              Find My Loop
            </a>

            <a href="/triggered" className="al-button-secondary">
              Try I Am Triggered
            </a>
          </div>
        </div>
      </section>


     <section className="al-section-tight">
  <div className="al-philosophy-strip">
    <p className="al-kicker">What ArcheLoop Does</p>

    <p className="al-text-lg mx-auto mt-7 max-w-3xl">
      ArcheLoop is an integrative archetypal self-awareness framework that
      helps people recognise recurring{" "}
      <span className="al-shadow-word">Shadow Loops</span>, interrupt automatic
      reactions, and develop a more integrated way of being.
    </p>

    <div className="al-accent-rule mx-auto mt-8" />

    <div className="al-slogan-band">
      <p className="al-slogan-line">
        Helping people live from their{" "}
        <em className="al-integration-word">Integrated Self.</em>
      </p>
    </div>
  </div>
</section>

      <section className="al-section">
        <div className="al-container al-premium-card p-10 text-center">
          <p className="al-kicker">Start With What Feels Familiar</p>

          <h2 className="al-heading-md">
            Do any of these patterns feel familiar?
          </h2>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4">
            {patterns.map((pattern) => (
              <div key={pattern} className="al-pill">
                {pattern}
              </div>
            ))}
          </div>

          <p className="al-text mx-auto mt-8 max-w-3xl">
            These experiences may look different on the surface, but they often
            reflect the same underlying protective pattern. ArcheLoop organises
            these recurring patterns into twelve Shadow Loops so they become
            easier to recognise and understand.
          </p>

          <a href="/assessment" className="al-button-primary mt-12">
            Find My Loop
          </a>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container al-card p-10 text-center">
          <p className="al-kicker">What Is A Shadow Loop?</p>

          <p className="al-text-lg mx-auto mt-8 max-w-3xl">
            A Shadow Loop is a recurring pattern of emotion, behaviour, and
            nervous system activation that emerges when archetypal energies
            collapse, compensate, or collide under pressure.
          </p>

       <div className="al-slogan-band">
 <p className="al-slogan-line">
  You are not the{" "}
  <em className="al-shadow-word">loop.</em>
</p>

  <p className="al-slogan-support">
    A Shadow Loop is a protective pattern, not your identity.
  </p>

  <p className="al-text mx-auto mt-4 max-w-3xl">
    It is an adaptive response that once helped you survive, protect, or cope
    under pressure.
  </p>
</div>

          <p className="al-text mx-auto mt-4 max-w-3xl">
            ArcheLoop helps you recognise those patterns so you can understand
            them, interrupt automatic reactions, and move toward your Integrated
            Self.
          </p>

     <div className="al-slogan-band">
  <p className="al-slogan-line">
  Awareness is the beginning of{" "}
  <span className="al-integration-word al-serif-italic">
    integration.
  </span>
</p>

  <div className="al-accent-rule" />
</div>
        </div>
      </section>

     <section className="al-section">
  <div className="al-container-wide al-premium-card p-10 text-center">
    <p className="al-kicker">Discover the 12 Shadow Loops</p>

    <h2 className="al-heading-md">
      Every recurring pattern has a name.
    </h2>

    <p className="al-text-lg mx-auto mt-6 max-w-3xl">
      ArcheLoop organises recurring protective patterns into twelve Shadow
      Loops, making them easier to recognise, understand, and work with.
    </p>

    <div className="mt-12 grid gap-5 lg:grid-cols-4">
      {shadowLoopPreview.map((group) => (
        <div key={group.element} className="al-card al-loop-group">
          <p className="al-kicker mb-4 text-center">{group.element}</p>

          <div className="grid gap-3">
            {group.loops.map((loop) => (
              <a
                key={loop.slug}
                href={`/loops/${loop.slug}`}
                className="al-loop-card group"
              >
                <div className="al-loop-image">
                  <Image
                    src={loop.image}
                    alt={loop.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover opacity-90 transition duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="al-loop-card-title">
                  {loop.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>

    <a href="/loops" className="al-button-secondary mt-10">
      Explore All Shadow Loops
    </a>
  </div>
</section>

      <section className="al-section">
        <div className="al-container al-card p-10 text-center">
          <p className="al-kicker">What You’ll Discover</p>

          <h2 className="al-heading-md">What Find My Loop reveals.</h2>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Your assessment reveals the structure of your current pattern and
            gives you a personalised ArcheLoop Report.
          </p>

          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {discoveries.map((item) => (
              <div key={item} className="al-feature-item">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide al-premium-card p-10">
          <div className="text-center">
            <p className="al-kicker">How ArcheLoop Works</p>

          <h2 className="al-heading-md">
  A clear path from{" "}
  <span className="al-shadow-word">Shadow Loop</span>
  {" "}to{" "}
  <span className="al-integration-word al-serif-italic">
    Integrated Self.
  </span>
</h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              ArcheLoop helps you move from “Why does this keep happening?” to
              “I understand the pattern, I can interrupt it, and I can live from
              my Integrated Self.”
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {userJourney.map((step) => (
              <div key={step.number} className="al-journey-card">
              <div className="al-number-badge">
  {step.number}
</div>

                <h3 className="al-journey-title">
  {step.title}
</h3>

                <p className="al-text mt-3">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/assessment" className="al-button-primary">
              Start With Find My Loop
            </a>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container al-premium-card p-10 text-center">
          <p className="al-kicker">Meet Your Integrated Self</p>

         <p className="al-text-lg mx-auto mt-6 max-w-3xl">
  Every{" "}
  <span className="al-shadow-word">Shadow Loop</span>
  {" "}points toward an{" "}
  <span className="al-integration-word">
    integrated state
  </span>
  : Healthy Visibility,
  Clear Thinking,
  Emotional Flow,
  Connected Strength,
  and more.
</p>

<p className="al-text mx-auto mt-6 max-w-3xl">
  The goal is not to eliminate every{" "}
  <span className="al-shadow-word">
    Shadow Loop
  </span>.
</p>

<p className="al-text mx-auto mt-4 max-w-3xl">
  The goal is to recognise the pattern,
  strengthen your{" "}
  <span className="al-integration-word">
    Integrated Self
  </span>,
  and spend more of your life living from it.
</p>

<div className="al-slogan-band">
  <p className="al-mission-line">
  Helping people live from their{" "}
  <em className="al-integration-word">Integrated Self.</em>
</p>
</div>

          <a href="/integration" className="al-button-secondary mt-10">
            Preview Integration Journeys
          </a>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide">
          <div className="text-center">
            <p className="al-kicker">Choose Your Path</p>

            <h2 className="al-heading-md">Start where you are.</h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Explore ArcheLoop for free, discover your Shadow Loop with Find My
              Loop, or continue into ArcheLoop Integration for deeper
              transformation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
             <div
  key={product.title}
 className={`al-pricing-card p-8 ${
  product.priceType === "launch-report"
    ? "al-premium-card"
    : "al-card"
}`}
>

                <p className="al-kicker">{product.label}</p>

              <h3 className="al-product-title">
  {product.title}
</h3>

                <PricingBlock type={product.priceType} />

                <ul className="mt-7 space-y-3">
                  {product.items.map((item) => (
                    <li key={item} className="al-soft-card p-4">
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={product.href}
                  className={`mt-8 ${
                    product.priceType === "launch-report"
                      ? "al-button-primary"
                      : "al-button-secondary"
                  }`}
                >
                  {product.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section text-center">
        <div className="al-container al-cta-panel">
          <p className="al-kicker">Begin Here</p>

          <h2 className="al-heading-md">
  Discover the pattern behind what keeps repeating.
</h2>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Start with Find My Loop and receive your personalised ArcheLoop
            Report.
          </p>

          <a href="/assessment" className="al-button-primary mt-10">
            Find My Loop
          </a>
        </div>
      </section>

    </PageShell>
  );
}
function PricingBlock({ type }: { type: string }) {
  if (type === "free") {
    return (
      <div className="al-pricing-block">
        <p className="al-price-current">£0</p>

        <p className="al-price-note">
          Free educational access and basic I Am Triggered.
        </p>
      </div>
    );
  }

  if (type === "launch-report") {
    return (
      <div className="al-pricing-block">
        <p className="al-price-old">
          Regular price <span>£29</span>
        </p>

        <p className="al-price-current">£19</p>

        <p className="al-price-note">
          Launch offer for early members.
        </p>
      </div>
    );
  }

  return (
    <div className="al-pricing-block">
      <p className="al-price-old">
        Regular price <span>£29/month</span>
      </p>

      <p className="al-price-current">£14.99/month</p>

      <p className="al-price-note">
        Launch offer for early members.
      </p>
    </div>
  );
}