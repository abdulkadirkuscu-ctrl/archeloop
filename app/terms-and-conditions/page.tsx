import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.16),transparent_42%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Legal
          </p>

          <h1 className="mt-5 text-5xl font-bold">
            Terms & Conditions
          </h1>

          <p className="mt-6 text-stone-300">
            Last updated: June 2026
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl space-y-6 rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
          <Section title="1. About ArcheLoop">
            ArcheLoop is an educational self-development platform designed to
            help users reflect on emotional patterns, archetypes, Shadow Loops,
            nervous system responses, relational dynamics, and integration
            journeys.
          </Section>

          <Section title="2. Not Medical or Therapeutic Advice">
            ArcheLoop is not medical, psychiatric, psychological,
            psychotherapeutic, legal, financial, or professional advice. It is
            not a diagnostic tool and should not be used as a substitute for
            professional support.
          </Section>

          <Section title="3. Use of the Website">
            By using this website, you agree to use ArcheLoop for lawful,
            personal, educational, and self-reflective purposes only. You must
            not misuse the site, interfere with its operation, or attempt to
            access restricted areas without permission.
          </Section>

          <Section title="4. Assessment and Report Results">
            ArcheLoop assessments, reports, loop descriptions, Integration
            Journeys™, and Triggered tools are reflective frameworks. Results
            are based on your responses and should be interpreted as
            self-awareness prompts, not fixed labels or factual diagnoses.
          </Section>

          <Section title="5. Triggered Pro™ and Local Data">
            Some tools may save information in your browser using local storage,
            such as saved activations, trigger history, or progress dashboard
            data. This data may remain on your device unless you clear it. If
            you use a different browser or device, that local data may not be
            available.
          </Section>

          <Section title="6. Founding Access and Future Features">
            Founding Access, premium reports, early features, or future
            membership options may change, pause, or be discontinued as the
            platform develops. Early access does not guarantee permanent access
            to all future paid products or services unless stated separately.
          </Section>

          <Section title="7. Intellectual Property">
            ArcheLoop™, Shadow Loops, Integration Journeys™, written content,
            frameworks, designs, branding, reports, and related materials belong
            to ArcheLoop unless otherwise stated. You may not copy, reproduce,
            sell, publish, or redistribute ArcheLoop materials without
            permission.
          </Section>

          <Section title="8. User Responsibility">
            You are responsible for how you interpret and use ArcheLoop content.
            If you are experiencing emotional distress, crisis, or mental health
            concerns, please seek support from a qualified professional or
            emergency service.
          </Section>

          <Section title="9. Cookies and Analytics">
            ArcheLoop may use cookies and similar technologies, including Google
            Analytics, to understand website usage and improve the site. You can
            accept or reject optional analytics cookies through the cookie
            consent banner.
          </Section>

          <Section title="10. Limitation of Liability">
            ArcheLoop is provided on an “as is” basis. We do our best to provide
            useful and thoughtful content, but we do not guarantee that the
            website, tools, or content will be error-free, uninterrupted, or
            suitable for every individual situation.
          </Section>

          <Section title="11. Changes to These Terms">
            We may update these Terms & Conditions from time to time. Continued
            use of the website after updates means you accept the revised terms.
          </Section>

          <Section title="12. Contact">
            For questions about these terms, contact us through the Contact page
            on this website.
          </Section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-yellow-300/10 bg-black/30 p-6">
      <h2 className="text-xl font-semibold text-yellow-300">
        {title}
      </h2>

      <p className="mt-4 leading-relaxed text-stone-300">
        {children}
      </p>
    </section>
  );
}