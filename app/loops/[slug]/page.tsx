import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { loops } from "../../data/loops";
import Image from "next/image";

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function LoopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const loopEntry = Object.entries(loops).find(
    ([name]) => slugify(name) === slug
  );

  if (!loopEntry) {
    return (
      <main className="al-page min-h-screen px-6 py-20">
        <h1 className="al-heading-lg mb-6">Loop not found</h1>
        <a href="/loops" className="al-button-secondary">
          Return to Shadow Loops
        </a>
      </main>
    );
  }

  const [, loop] = loopEntry as [string, any];

  return (
    <main className="al-page min-h-screen">
      <Nav />

      <section className="al-section">
        <div className="al-container space-y-16">
          <div>
            <p className="al-kicker">
              {loop.element} Element • {loop.mechanism}
            </p>

            <h1 className="al-heading-xl">{loop.title}</h1>

            {loop.image && (
              <div className="al-card relative mt-10 h-[420px] w-full overflow-hidden">
                <Image
                  src={loop.image}
                  alt={loop.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                />
              </div>
            )}

            <p className="al-text-lg mt-10 max-w-3xl">
              {loop.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard title="Archetype" text={loop.archetype} />
            <InfoCard title="Core Emotion" text={loop.emotion} />
            <InfoCard title="Body Map" text={loop.body} />
          </div>

          <ContentSection title="Core Belief">
            <p className="text-2xl leading-relaxed text-[var(--al-accent)]">
              “{loop.coreBelief}”
            </p>
          </ContentSection>

          {loop.coreQuestion && (
            <ContentSection title="Core Reflection Question">
              <p className="text-2xl leading-relaxed text-[var(--al-accent)]">
                “{loop.coreQuestion}”
              </p>

              {loop.prompts && (
                <div className="mt-8">
                  <p className="al-kicker mb-4">Additional Prompts</p>

                  <ul className="al-text space-y-3">
                    {loop.prompts.map((prompt: string) => (
                      <li key={prompt}>• {prompt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </ContentSection>
          )}

          {loop.signs && (
            <ContentSection title="This Loop May Appear As">
              <ul className="al-text space-y-3">
                {loop.signs.map((sign: string) => (
                  <li key={sign}>• {sign}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          {loop.nervousSystem && (
            <ContentSection title="Nervous System Pattern">
              <p className="al-text-lg">{loop.nervousSystem}</p>
            </ContentSection>
          )}

          {loop.protection && (
            <ContentSection title="What This Pattern May Be Protecting">
              <p className="al-text-lg">{loop.protection}</p>
            </ContentSection>
          )}

          {loop.relationalActivators && (
            <ContentSection title="Relational Activators">
              <ul className="al-text space-y-3">
                {loop.relationalActivators.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          {loop.secondaryLoops && (
            <ContentSection title="Related Dynamics">
              <p className="al-text mb-4">
                Under pressure, this loop may interact with:
              </p>

              <ul className="al-text space-y-3">
                {loop.secondaryLoops.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </ContentSection>
          )}

          <ContentSection title="Loop Breaker Practice" variant="accent">
            <p className="text-lg leading-relaxed">
              {loop.loopBreaker}
            </p>
          </ContentSection>

          <ContentSection title="Integration Key">
            <p className="al-text-lg mb-3">
              <strong>Restoring Energy:</strong> {loop.integrationKey}
            </p>

            <p className="al-text">{loop.integrationReason}</p>
          </ContentSection>

          <section className="al-premium-card p-8">
            <p className="al-kicker mb-4">Full Profile</p>

            <h2 className="al-heading-md">
              Discover how this loop fits into your wider ArcheLoop profile.
            </h2>

            <p className="al-text-lg mt-6 max-w-3xl">
              The full ArcheLoop report will explore primary and secondary
              loops, nervous system patterns, relational activators, body map,
              and integration pathways.
            </p>

            <a href="/assessment" className="al-button-primary mt-8">
              Find My Loop
            </a>
          </section>

          <div className="flex flex-wrap gap-4">
            <a href="/loops" className="al-button-secondary">
              Back to Shadow Loops
            </a>

            <a
              href={`/archetypes/${loop.archetype.toLowerCase()}`}
              className="al-button-secondary"
            >
              Explore {loop.archetype}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="al-card p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="al-text mt-3">{text}</p>
    </div>
  );
}

function ContentSection({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "accent";
}) {
  return (
    <section
      className={`p-8 ${
        variant === "accent" ? "al-accent-card" : "al-card"
      }`}
    >
      <h2 className="al-heading-md mb-6">{title}</h2>
      {children}
    </section>
  );
}