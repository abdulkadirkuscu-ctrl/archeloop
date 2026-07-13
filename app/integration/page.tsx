import Nav from "../components/Nav";
import Link from "next/link";
import Footer from "../components/Footer";
import TrackPageView from "../../components/TrackPageView";

const journeyGroups = [
  {
    element: "Fire",
    archetype: "Sovereign",
    theme: "Visibility, worth, and action",
    journeys: [
      ["Dimmed Light", "Visibility Path", "Healthy Visibility"],
      ["Paper Crown", "Authentic Sovereignty Path", "Authentic Leadership"],
      ["Stalled Flame", "Action Path", "Purposeful Action"],
    ],
  },
  {
    element: "Air",
    archetype: "Magician",
    theme: "Expression, truth, and clarity",
    journeys: [
      ["Blank Page", "Creative Expression Path", "Authentic Expression"],
      ["Smoky Mirrors", "Truth Path", "Self-Honesty"],
      ["Mind Maze", "Clarity Path", "Clear Thinking"],
    ],
  },
  {
    element: "Water",
    archetype: "Lover",
    theme: "Feeling, connection, and regulation",
    journeys: [
      ["Emotional Lockdown", "Vulnerability Path", "Emotional Openness"],
      ["Fantasy Fog", "Connection Path", "Genuine Connection"],
      ["Flooded Waters", "Emotional Regulation Path", "Emotional Flow"],
    ],
  },
  {
    element: "Earth",
    archetype: "Warrior",
    theme: "Boundaries, trust, and vitality",
    journeys: [
      ["Compliance", "Boundaries Path", "Self-Respect"],
      ["Fortress", "Trust Path", "Connected Strength"],
      ["Barren Ground", "Vitality Path", "Inner Vitality"],
    ],
  },
];

const features = [
  "Triggered Pro",
  "Progress Dashboard",
  "Full Integration Journeys",
  "My Integrated Vision",
  "Meet Your Integrated Self",
  "Practices & Reflection Prompts",
  "Trigger History",
  "Personal Integration Tracking",
];

const transformationSteps = [
  {
    title: "Recognise the loop",
    text: "Use Triggered Pro to log real-life triggers and identify which Shadow Loops are repeating most often.",
  },
  {
    title: "Understand the pattern over time",
    text: "Use the Progress Dashboard to see recurring triggers, people, environments, loops, and integration focus.",
  },
  {
    title: "Practise your Integration Journey",
    text: "Follow the path from your Shadow Loop toward your Integrated Self through practices, prompts, and reflection.",
  },
];

export default function IntegrationPage() {
  return (
    <main className="al-page min-h-screen">
      <Nav />
      <TrackPageView eventName="integration_opened" eventValue="integration_page" />

      <section className="al-section">
        <div className="al-container al-hero-card text-center">
          <p className="al-kicker">ArcheLoop Integration</p>

         <p className="al-brand-tagline mt-4 justify-center">
  <span className="al-understand-word">
    Understand
  </span>

  <span className="al-brand-divider">•</span>

  <span className="al-interrupt-word">
    Interrupt
  </span>

  <span className="al-brand-divider">•</span>

  <span className="al-integrate-word">
    Integrate
  </span>
</p>

          <h1 className="al-heading-xl">
            The report shows the loop.
            <br />
            Integration helps you change it.
          </h1>

          <p className="al-text-lg mx-auto mt-8 max-w-3xl">
            ArcheLoop Integration is your ongoing practice for recognising
            Shadow Loops, interrupting automatic reactions, and developing a
            more integrated way of being.
          </p>

          <p className="al-text mx-auto mt-6 max-w-3xl">
            It helps you move from understanding the pattern to living from your
            Integrated Self.
          </p>

          <div className="al-soft-card mx-auto mt-10 max-w-md p-6">
            <p className="al-muted text-lg line-through">£29/month</p>

            <p className="mt-1 text-3xl font-bold text-[var(--al-accent)]">
              £15/month
            </p>

            <p className="al-text mt-3 text-sm">
              Includes Triggered Pro, Progress Dashboard, Integration Journeys,
              My Integrated Vision, reflection tools, and personal integration
              tracking.
            </p>

            <p className="al-muted mt-5 text-sm">
              Cancel anytime. Subscription renews monthly.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/checkout?product=integration" className="al-button-primary">
              Start Integration
            </a>

            <a href="#journeys" className="al-button-secondary">
              Preview Integration Journeys
            </a>
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container al-card p-10 text-center">
          <p className="al-kicker">How Integration Works</p>

          <p className="al-brand-tagline mt-4 justify-center">
  <span className="al-understand-word">
    Understand
  </span>

  <span className="al-brand-divider">•</span>

  <span className="al-interrupt-word">
    Interrupt
  </span>

  <span className="al-brand-divider">•</span>

  <span className="al-integrate-word">
    Integrate
  </span>
</p>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Your ArcheLoop Report helps you understand the pattern. ArcheLoop
            Integration helps you recognise it in everyday life, interrupt
            automatic reactions, and practise living from your Integrated Self.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {transformationSteps.map((step) => (
              <div key={step.title} className="al-soft-card p-6 text-left">
                <h3 className="text-2xl font-bold text-[var(--al-accent)]">
                  {step.title}
                </h3>

                <p className="al-text mt-4">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container al-premium-card p-10 text-center">
          <p className="al-kicker">What Integration Includes</p>

          <h2 className="al-heading-lg">
            One system for real-life pattern change.
          </h2>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Everything inside ArcheLoop Integration is designed to help you
            recognise recurring Shadow Loops, interrupt automatic reactions, and
            practise living from your Integrated Self.
          </p>

          <div className="mt-12 grid gap-5 text-left md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="al-soft-card p-5">
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journeys" className="al-section">
        <div className="al-container-wide">
          <div className="mb-16 text-center">
            <p className="al-kicker">Integration Journeys</p>

            <h2 className="al-heading-lg">
              Every Shadow Loop points toward your Integrated Self.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Preview the journey from protective pattern to healthier
              expression.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {journeyGroups.map((group) => (
              <div key={group.element} className="al-card p-6">
                <p className="al-kicker">{group.archetype}</p>

                <h3 className="mt-2 text-3xl font-bold text-[var(--al-accent)]">
                  {group.element}
                </h3>

                <p className="al-text mt-2 text-sm">{group.theme}</p>

               <div className="mt-6 space-y-3">
  {group.journeys.map(([loop, path, state]) => {
    const slug = path.toLowerCase().replaceAll(" ", "-");

    return (
      <Link
        key={loop}
        href={`/integration/${slug}`}
        className="al-integration-preview-card"
      >
        <p className="al-loop-name">
          {loop}
        </p>

        <div className="al-path-block">
          <p className="al-path-label">
            Integration Path
          </p>

          <p className="al-path-name">
            {path}
          </p>
        </div>

        <div className="al-integration-divider" />

        <div>
          <p className="al-integrated-label">
            Integrated Self
          </p>

          <p className="al-integrated-state">
            {state}
          </p>
        </div>

        <span className="al-journey-link">
          Preview Journey
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    );
  })}
</div>
                  
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container al-premium-card p-10 text-center">
          <p className="al-kicker">Begin Integration</p>

          <h2 className="al-heading-lg">
            Begin living from your Integrated Self.
          </h2>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Start by logging your first trigger, then use your Progress
            Dashboard and Integration Journey to recognise recurring patterns,
            interrupt automatic reactions, and gradually live more often from
            your Integrated Self.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/checkout?product=integration" className="al-button-primary">
              Start Integration
            </a>

            <a href="/checkout?product=bundle" className="al-button-secondary">
              Choose Report + Integration
            </a>
          </div>

          <p className="al-muted mx-auto mt-8 max-w-3xl text-sm">
            ArcheLoop Integration is an educational self-awareness tool and is
            not a medical, psychiatric, therapeutic, or diagnostic service.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}