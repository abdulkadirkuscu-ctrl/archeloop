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
      "ArcheLoop Integration™ works best after completing Find My Loop™ and unlocking your ArcheLoop Report™. Your report identifies your Shadow Loop™, Integrated Self™, and recommended Integration Journey™.",
    href: "/assessment",
    cta: "Complete Find My Loop™",
  },
  {
    number: "2",
    title: "Log real-life triggers",
    description:
      "Use Triggered Pro™ when something triggers you. Track what happened, who was involved, where it happened, and which Shadow Loop™ was most active.",
    href: "/triggered-intelligence",
    cta: "Open Triggered Pro™",
  },
  {
    number: "3",
    title: "Review your patterns",
    description:
      "Use your Progress Dashboard™ to see recurring loops, triggers, people, environments, and your current integration focus over time.",
    href: "/progress-dashboard",
    cta: "View Progress Dashboard™",
  },
  {
    number: "4",
    title: "Follow your Integration Journey™",
    description:
      "Move from awareness into interruption, embodiment, reflection, practice, and your Integrated Self™ through the pathway connected to your loop.",
    href: "/integration",
    cta: "Explore Integration Journeys™",
  },
];

const included = [
  "Triggered Pro™",
  "Progress Dashboard™",
  "Integration Journeys™",
  "My Integrated Vision™",
  "Meet Your Integrated Self™",
  "Practices & Reflection Prompts™",
  "Personal Integration Tracking™",
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
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />

        <section className="relative overflow-hidden px-6 py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

          <div className="relative mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop Integration™
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Integration access is required.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
              The Integration Hub is available with ArcheLoop Integration™. It
              includes Triggered Pro™, Progress Dashboard™, Integration
              Journeys™, My Integrated Vision™, and Monthly Review™.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/checkout?product=integration"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Start Integration™
              </Link>

              <Link
                href="/checkout?product=bundle"
                className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Choose Report + Integration™
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            ArcheLoop Integration™
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Your Integration Hub.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            ArcheLoop Integration™ brings together Triggered Pro™, Progress
            Dashboard™, Integration Journeys™, My Integrated Vision™, and your
            Integrated Self™ into one transformation pathway.
          </p>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-yellow-300/10 bg-black/30 p-6 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
              Important
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              ArcheLoop Integration™ is designed to be used after Find My Loop™.
              Your ArcheLoop Report™ gives the system the pattern, loop, and
              integration pathway that makes the Integration tools personal.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              If you have not completed Find My Loop™ yet, start there first.
              If you already have your report, continue into Triggered Pro™,
              your Dashboard™, and your Integration Journey™.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/assessment"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Complete Find My Loop™
            </Link>

            <Link
              href="/triggered-intelligence"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              Start With Triggered Pro™
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            How Integration Works
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            From insight into practice.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            Your report explains the pattern. Integration helps you recognise it
            in real life, interrupt it with awareness, and practise the
            integrated response over time.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-7 text-left"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-300 text-lg font-bold text-black">
                  {step.number}
                </div>

                <h3 className="mt-5 text-2xl font-bold text-yellow-300">
                  {step.title}
                </h3>

                <p className="mt-4 leading-relaxed text-stone-300">
                  {step.description}
                </p>

                <Link
                  href={step.href}
                  className="mt-6 inline-flex rounded-full border border-yellow-300/20 bg-black/30 px-5 py-3 text-sm font-semibold text-yellow-200 transition hover:border-yellow-300/60"
                >
                  {step.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Included In Integration
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            One system for real-life change.
          </h2>

          <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
              >
                ✓ {item}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/triggered-intelligence"
              className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
            >
              Start With Triggered Pro™
            </Link>

            <Link
              href="/progress-dashboard"
              className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 text-lg font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
            >
              View Progress Dashboard™
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}