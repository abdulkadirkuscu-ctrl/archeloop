import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { integrationJourneys } from "../../data/integrationJourneys";
import { supabaseServer } from "../../../lib/supabaseServer";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function IntegrationJourneyPage({ params }: Props) {
  const { slug } = await params;

  const journey = integrationJourneys.find((item) => item.slug === slug);

  if (!journey) {
    notFound();
  }

  await supabaseServer.from("archeloop_events").insert({
  event_name: "journey_viewed",
  event_value: journey.slug,
});

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <Link
              href="/integration"
              className="text-sm text-yellow-300/70 hover:text-yellow-300"
            >
              ← Back to Integration
            </Link>

            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop Integration™
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              {journey.path}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge>{journey.loop}</Badge>
              <Badge>{journey.archetype}</Badge>
              <Badge>{journey.element}</Badge>
              <Badge>{journey.integratedState}</Badge>
            </div>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
              {journey.overview}
            </p>
          </div>

<div className="rounded-[2.5rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_80px_rgba(216,183,120,0.12)]">
  <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
    ArcheLoop Integration™
  </p>

  <h2 className="mt-5 text-4xl font-bold md:text-5xl">
    Continue into the full {journey.path}
  </h2>

  <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
    This preview shows the direction of your path. The full Integration Journey™
    helps you understand the loop structure, practise interruption, write your
    My Integrated Vision™, and move toward {journey.integratedState}.
  </p>

  <div className="mt-10 grid gap-4 text-left md:grid-cols-2">
    {[
      "Loop structure",
      "Core belief",
      "Core fear",
      "Hidden longing",
      "Awareness stage",
      "Interruption stage",
      "Embodiment stage",
      "Practices & reflection prompts",
      "Meet Your Integrated Self™",
      "My Integrated Vision™",
      "Final integration statement",
      "Triggered Pro™ & Progress Dashboard™",
    ].map((item) => (
      <div
        key={item}
        className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
      >
        ✓ {item}
      </div>
    ))}
  </div>

  <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-yellow-300/20 bg-black/30 p-6">
  <p className="text-lg text-stone-500 line-through">£29/month</p>

  <p className="mt-1 text-3xl font-bold text-yellow-300">
    Free Founding Access
  </p>

  <p className="mt-3 text-sm leading-relaxed text-stone-400">
    ArcheLoop Integration™ is temporarily available while the platform is being
    refined with early users.
  </p>

  <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-5 text-left">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300/70">
      Founding Access Notice
    </p>

    <p className="mt-3 text-sm leading-relaxed text-stone-400">
      This Integration Journey™ is temporarily available during Founding Access
      while ArcheLoop™ is being refined and tested with early users.
    </p>

    <p className="mt-3 text-sm leading-relaxed text-stone-500">
      Future access to ArcheLoop Integration™, Triggered Pro™, Progress
      Dashboard™, and Integration Journeys™ may require an active subscription
      after public launch. Founding Access does not guarantee free lifetime
      access.
    </p>
  </div>

  <p className="mt-5 text-sm text-stone-500">
    Future public pricing: £29/month
  </p>
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
          

         
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-sm text-yellow-200">
      {children}
    </span>
  );
}