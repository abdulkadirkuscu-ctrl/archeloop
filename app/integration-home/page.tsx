import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { createSupabaseServerClient } from "../../lib/supabaseServerClient";
import { supabaseServer } from "../../lib/supabaseServer";

const steps = [
  {
    number: "1",
    title: "Know your loop",
    description:
      "ArcheLoop Integration works best after completing Find My Loop and unlocking your ArcheLoop Report. Your report identifies your Shadow Loop, Integrated Self, and recommended Integration Journey.",
    href: "/assessment",
    cta: "Complete Find My Loop",
  },
  {
    number: "2",
    title: "Log real-life triggers",
    description:
      "Use Triggered Pro when something triggers you. Track what happened, who was involved, where it happened, and which Shadow Loop was most active.",
    href: "/triggered-intelligence",
    cta: "Open Triggered Pro",
  },
  {
    number: "3",
    title: "Review your patterns",
    description:
      "Use your Progress Dashboard to see recurring loops, triggers, people, environments, and your current integration focus over time.",
    href: "/progress-dashboard",
    cta: "View Progress Dashboard",
  },
  {
    number: "4",
    title: "Follow your Integration Journey",
    description:
      "Move from awareness into interruption, embodiment, reflection, practice, and your Integrated Self through the pathway connected to your loop.",
    href: "/integration",
    cta: "Explore Integration Journeys",
  },
];

const included = [
  "Triggered Pro",
  "Progress Dashboard",
  "Integration Journeys",
  "My Integrated Vision",
  "Meet Your Integrated Self",
  "Practices & Reflection Prompts",
  "Personal Integration Tracking",
];

async function getIntegrationAccess() {
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return false;
  }

  const { data: orders } = await supabaseServer
    .from("archeloop_orders")
    .select("product, status")
    .eq("user_id", user.id)
    .in("status", ["paid", "private_access", "founding_access"]);

  return (
    orders?.some(
      (order) => order.product === "integration" || order.product === "bundle"
    ) || false
  );
}

export default async function IntegrationHomePage() {
  const hasIntegrationAccess = await getIntegrationAccess();

  if (!hasIntegrationAccess) {
    return (
      <main className="al-page">
        <Nav />

        <section className="al-section">
          

          <div className="al-premium-card al-container p-10 text-center">
            <p className="al-kicker">
              ArcheLoop Integration
            </p>

            <h1 className="mt-5 al-heading-lg">
              Integration access is required.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl al-text-lg">
              The Integration Hub is available with ArcheLoop Integration. It
              includes Triggered Pro, Progress Dashboard, Integration
              Journeys, My Integrated Vision, and Monthly Review.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/checkout?product=integration"
                className="al-button-primary"
              >
                Start Integration
              </Link>

              <Link
                href="/checkout?product=bundle"
                className="al-button-secondary"
              >
                Choose Report + Integration
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="al-page">
      <Nav />

      <section className="al-section">
        

        <div className="al-premium-card al-container p-10 text-center">
          <p className="al-kicker">
            ArcheLoop Integration
          </p>

          <h1 className="mt-5 al-heading-lg">
            Your Integration Hub.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl al-text-lg">
            ArcheLoop Integration brings together Triggered Pro, Progress
            Dashboard, Integration Journeys, My Integrated Vision, and your
            Integrated Self into one transformation pathway.
          </p>

          <div className="al-card mx-auto mt-8 max-w-3xl p-6 text-left">
            <p className="al-kicker">
              Important
            </p>

            <p className="al-text mt-3 text-sm">
              ArcheLoop Integration is designed to be used after Find My Loop.
              Your ArcheLoop Report gives the system the pattern, loop, and
              integration pathway that makes the Integration tools personal.
            </p>

            <p className="al-text mt-3 text-sm">
              If you have not completed Find My Loop yet, start there first.
              If you already have your report, continue into Triggered Pro,
              your Dashboard, and your Integration Journey.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/assessment"
              className="al-button-primary"
            >
              Complete Find My Loop
            </Link>

            <Link
              href="/triggered-intelligence"
              className="al-button-primary"
            >
              Start With Triggered Pro
            </Link>
          </div>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-container-wide text-center">
          <p className="al-kicker">
            How Integration Works
          </p>

          <h2 className="mt-5 al-heading-lg">
            From insight into practice.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl al-text-lg">
            Your report explains the pattern. Integration helps you recognise it
            in real life, interrupt it with awareness, and practise the
            integrated response over time.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="al-card p-7 text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--al-accent)] text-white text-lg font-bold">
                  {step.number}
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[var(--al-accent)]">
                  {step.title}
                </h3>

                <p className="mt-4 al-text">
                  {step.description}
                </p>

                <Link
                  href={step.href}
                  className="al-button-secondary mt-6 inline-flex"
                >
                  {step.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-premium-card al-container p-10 text-center">
          <p className="al-kicker">
            Included In Integration
          </p>

          <h2 className="mt-5 al-heading-lg">
            One system for real-life change.
          </h2>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="al-card p-4"
              >
                ✓ {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/triggered-intelligence"
              className="al-button-primary"
            >
              Start With Triggered Pro
            </Link>

            <Link
              href="/progress-dashboard"
              className="al-button-secondary"
            >
              View Progress Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}