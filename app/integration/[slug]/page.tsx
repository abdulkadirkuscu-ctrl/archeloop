import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { integrationJourneys } from "../../data/integrationJourneys";

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

            <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
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

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard title="Core Belief" value={journey.coreBelief} />
            <InfoCard title="Core Fear" value={journey.coreFear} />
            <InfoCard title="Hidden Longing" value={journey.hiddenLonging} />
          </div>

          <PremiumCard title="Loop Structure">
            <div className="grid gap-5 md:grid-cols-2">
              <MiniBlock title="Body Activation" value={journey.bodyActivation} />
              <MiniBlock title="Primary State" value={journey.primaryState} />
              <MiniBlock title="Collapse" value={journey.suppression} />
              <MiniBlock title="Compensate" value={journey.compensation} />
              <MiniBlock title="Collide" value={journey.collision} />
            </div>
          </PremiumCard>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
              Transformation Process
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Integration Stages
            </h2>

            <div className="mt-8 grid gap-8">
              {journey.stages.map((stage, index) => (
                <div
                  key={stage.title}
                  className="rounded-[2rem] border border-yellow-300/10 bg-[#07111f] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-sm font-bold text-black">
                      {index + 1}
                    </span>

                    <h3 className="text-2xl font-semibold text-yellow-300">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="mt-5 text-lg text-stone-200">
                    {stage.objective}
                  </p>

                  <p className="mt-4 rounded-2xl border border-yellow-300/10 bg-black/30 p-4 italic text-stone-300">
                    {stage.realisation}
                  </p>

                  <div className="mt-7 grid gap-6 md:grid-cols-2">
                    <ListBlock title="Practices" items={stage.practices} />
                    <ListBlock title="Reflection Prompts" items={stage.prompts} />
                  </div>

                  <div className="mt-7 rounded-2xl border border-yellow-300/20 bg-yellow-300/5 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/70">
                      Success Marker
                    </p>

                    <p className="mt-3 text-stone-100">
                      {stage.successMarker}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PremiumCard title="Integrated Identity">
            <ul className="grid gap-3 text-stone-300 md:grid-cols-2">
              {journey.integratedIdentity.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </PremiumCard>

          <div className="rounded-[2rem] border border-yellow-300/25 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-[#050814] p-10 shadow-[0_0_80px_rgba(216,183,120,0.12)]">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Final Integration Statement
            </p>

            <p className="mt-5 text-2xl leading-relaxed text-stone-100">
              {journey.finalStatement}
            </p>
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

function PremiumCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <h2 className="text-3xl font-semibold text-yellow-300">
        {title}
      </h2>

      <div className="mt-6">{children}</div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-yellow-300/15 bg-gradient-to-br from-[#0B1018] to-[#050814] p-6 shadow-[0_0_35px_rgba(216,183,120,0.05)]">
      <p className="text-sm uppercase tracking-[0.2em] text-yellow-300/60">
        {title}
      </p>

      <p className="mt-4 leading-relaxed text-stone-100">
        {value}
      </p>
    </div>
  );
}

function MiniBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
      <p className="text-sm text-yellow-300/70">{title}</p>
      <p className="mt-3 leading-relaxed text-stone-300">{value}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-yellow-300">{title}</p>

      <ul className="mt-3 space-y-3 text-stone-300">
        {items.map((item) => (
          <li key={item} className="leading-relaxed">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}