import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen al-page">
      <Nav />

      <section className="al-section">
        <div className="relative mx-auto max-w-5xl al-premium-card p-10">
          <p className="al-kicker">
            Legal
          </p>

          <h1 className="mt-5 al-heading-xl">
            Terms & Conditions
          </h1>

          <p className="mt-6 al-text">
            Last updated: July 2026
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl space-y-6 al-card p-8">
          <Section title="1. About ArcheLoop">
            ArcheLoop is an educational self-development platform designed to
            help users reflect on emotional patterns, archetypes, Shadow Loops,
            nervous system responses, relational dynamics, and Integration
            Journeys.
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
            ArcheLoop assessments, reports, Shadow Loop descriptions,
            Integration Journeys, and Triggered tools are reflective
            frameworks. Results are based on your responses and should be
            interpreted as self-awareness prompts, not fixed labels or factual
            diagnoses.
          </Section>

          <Section title="5. Products, Purchases and Subscriptions">
            ArcheLoop may offer free resources, paid reports, subscriptions,
            bundles, launch offers, and promotional pricing. Prices, product
            availability, subscription terms, and included features may change
            over time. Any active paid subscription will continue according to
            the terms shown at checkout unless cancelled.
          </Section>

          <Section title="6. Payments and Access">
            Payments are processed securely through third-party payment
            providers such as Stripe. Access to paid products is linked to your
            ArcheLoop account. You are responsible for using the correct account
            when purchasing or accessing paid features.
          </Section>

          <Section title="7. Triggered Pro and Saved Data">
            Some tools may save information in your browser or account, such as
            saved activations, trigger history, report data, Progress
            Dashboard, Monthly Reviews, or integration reflections. If data is
            stored locally on your device, it may not be available on another
            browser or device.
          </Section>

          <Section title="8. Intellectual Property">
            ArcheLoop, Shadow Loops, Integration Journeys, written content,
            frameworks, designs, branding, reports, and related materials belong
            to ArcheLoop unless otherwise stated. You may not copy, reproduce,
            sell, publish, or redistribute ArcheLoop materials without written
            permission.
          </Section>

          <Section title="9. User Responsibility">
            You are responsible for how you interpret and use ArcheLoop content.
            If you are experiencing emotional distress, crisis, or mental health
            concerns, please seek support from a qualified professional or
            emergency service.
          </Section>

          <Section title="10. Cookies and Analytics">
            ArcheLoop may use cookies and similar technologies, including Google
            Analytics, to understand website usage and improve the platform. You
            can accept or reject optional analytics cookies through the cookie
            consent banner.
          </Section>

          <Section title="11. Limitation of Liability">
            ArcheLoop is provided on an "as is" basis. While we strive to
            provide accurate and valuable educational content, we do not
            guarantee that the website, reports, tools, or services will be
            uninterrupted, error-free, or suitable for every individual
            situation.
          </Section>

          <Section title="12. Changes to These Terms">
            We may update these Terms & Conditions from time to time. Continued
            use of ArcheLoop after updates means you accept the revised terms.
          </Section>

          <Section title="13. Contact">
            If you have questions about these Terms & Conditions, please contact
            us through the Contact page on this website.
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
    <section className="al-soft-card p-6">
      <h2 className="text-xl font-semibold text-[var(--al-accent)]">
        {title}
      </h2>

      <p className="mt-4 leading-relaxed al-text">
        {children}
      </p>
    </section>
  );
}