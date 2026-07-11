"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageShell from "../components/PageShell";

function ReportPreviewContent() {
  const searchParams = useSearchParams();
  const selectedLoopName = searchParams.get("loop") || "";

  if (!selectedLoopName) {
    return (
      <PageShell>
        <section className="al-section text-center">
          <div className="al-card mx-auto max-w-3xl p-10">
            <h1 className="al-heading-md">No report data found</h1>

            <p className="al-text mt-5">
              Please complete Find My Loop first to generate your ArcheLoop
              Report.
            </p>

            <a href="/assessment" className="al-button-primary mt-8 inline-flex">
              Start Find My Loop
            </a>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="al-section text-center">
        <div className="al-hero-card">
          <p className="al-kicker">Report Preview</p>

          <h1 className="al-heading-xl">
            Your ArcheLoop Report
            <br />
            is ready.
          </h1>

          <p className="al-text-lg mx-auto mt-8 max-w-3xl">
            Your assessment has identified your primary Shadow Loop and
            generated a personalised ArcheLoop profile. Continue to your full
            report to explore the deeper structure beneath your pattern.
          </p>
        </div>
      </section>

      <section className="al-section-tight">
        <div className="al-premium-card mx-auto max-w-5xl p-10 text-center">
          <p className="al-kicker">Primary Shadow Loop</p>

          <h2 className="mt-5 text-4xl font-bold text-[var(--al-accent)] md:text-6xl">
            {selectedLoopName}
          </h2>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            This is a preview of your ArcheLoop Report. Your full report
            explains why this pattern may have formed, what activates it, how it
            affects your relationships, and the Integration Journey that helps
            you move toward your Integrated Self.
          </p>
        </div>
      </section>

      <section className="al-section">
        <div className="al-container-wide">
          <div className="text-center">
            <p className="al-kicker">Choose Your Next Step</p>

            <h2 className="al-heading-lg">
              Continue to your full report or begin integration.
            </h2>

            <p className="al-text-lg mx-auto mt-6 max-w-3xl">
              Start with your complete personalised report, or choose the bundle
              if you want the report plus your first month of ArcheLoop
              Integration.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <PricingCard
              label="Personal Report"
              title="ArcheLoop Report"
              price="£19"
              regular="£29"
              description="Continue to your full personalised report and understand the deeper structure beneath your Shadow Loop."
              href="/checkout?product=report"
              button="Continue To Full Report"
              items={[
                "Primary & Secondary Shadow Loops",
                "Core belief and core fear",
                "Nervous system pattern",
                "Relationship dynamics",
                "Body map interpretation",
                "Integration blueprint",
              ]}
            />

            <PricingCard
              premium
              label="Most Complete Experience"
              title="Report + First Month Integration"
              price="£29"
              regular="£58"
              description="Everything in the ArcheLoop Report, plus your first month of ArcheLoop Integration to help you recognise patterns, track triggers, and build lasting change."
              href="/checkout?product=bundle"
              button="Choose Report + Integration"
              items={[
                "Full ArcheLoop Report",
                "First month ArcheLoop Integration",
                "Triggered Pro",
                "Progress Dashboard",
                "Integration Journeys",
                "My Integrated Vision",
              ]}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function PricingCard({
  label,
  title,
  price,
  regular,
  description,
  href,
  button,
  items,
  premium = false,
}: {
  label: string;
  title: string;
  price: string;
  regular: string;
  description: string;
  href: string;
  button: string;
  items: string[];
  premium?: boolean;
}) {
  return (
    <div className={premium ? "al-premium-card p-8" : "al-card p-8"}>
      <p className="al-kicker">{label}</p>

      <h3 className="mt-4 text-4xl font-bold text-[var(--al-accent)]">
        {title}
      </h3>

      <div className="mt-4">
        <p className="text-3xl font-semibold text-[var(--al-accent)]">
          {price}
        </p>
        <p className="al-muted mt-1 text-sm">
          Launch price · <span className="line-through">{regular}</span>{" "}
          regular price
        </p>
      </div>

      <p className="al-text mt-5">{description}</p>

      <div className="mt-7 grid gap-3 text-left">
        {items.map((item) => (
          <div key={item} className="al-soft-card p-4 al-text">
            ✓ {item}
          </div>
        ))}
      </div>

      <a href={href} className="al-button-primary mt-8 flex justify-center">
        {button}
      </a>
    </div>
  );
}

export default function ReportPreviewPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <section className="al-section text-center">
            <p className="al-text">Loading your ArcheLoop Report...</p>
          </section>
        </PageShell>
      }
    >
      <ReportPreviewContent />
    </Suspense>
  );
}