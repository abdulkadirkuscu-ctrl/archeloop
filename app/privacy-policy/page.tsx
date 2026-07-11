import PageShell from "../components/PageShell";

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container space-y-10">
          <div className="al-premium-card p-10">
            <p className="al-kicker">ArcheLoop™</p>

            <h1 className="al-heading-xl">Privacy Policy</h1>

            <p className="al-text-lg mt-8 max-w-3xl">
              This policy explains what information may be collected, how it may
              be used, and the steps taken to protect your privacy while using
              ArcheLoop.
            </p>
          </div>

          <PolicySection title="1. Introduction">
            ArcheLoop respects your privacy and is committed to protecting
            personal information shared through this website.
          </PolicySection>

          <PolicySection title="2. Information We May Collect">
            <p className="mb-4">
              Depending on how you use the website, we may collect:
            </p>

            <ul className="space-y-2">
              <li>• Name and email address</li>
              <li>• Messages submitted through contact forms</li>
              <li>• Assessment responses and self-development reflections</li>
              <li>• Basic website analytics and usage information</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How Information Is Used">
            <p className="mb-4">
              Information may be used to:
            </p>

            <ul className="space-y-2">
              <li>• Respond to messages or enquiries</li>
              <li>• Improve the ArcheLoop experience</li>
              <li>• Provide educational or self-development resources</li>
              <li>• Send updates if you choose to subscribe</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Educational Purpose">
            ArcheLoop is an educational self-development framework and does not
            provide medical, psychiatric, psychological, therapeutic, legal, or
            crisis services.
          </PolicySection>

          <PolicySection title="5. Data Protection">
            Reasonable steps are taken to protect submitted information.
            However, no method of online transmission or storage can be
            guaranteed as completely secure.
          </PolicySection>

          <PolicySection title="6. Third-Party Services">
            ArcheLoop may use third-party services such as website hosting,
            analytics, form processing, or email tools which may process data
            according to their own privacy policies.
          </PolicySection>

          <PolicySection title="7. Your Rights">
            You may request access, correction, or deletion of personal
            information by contacting ArcheLoop directly.
          </PolicySection>

          <div className="al-card p-8">
            <h2 className="text-3xl font-semibold text-[var(--al-accent)]">
              8. Contact
            </h2>

            <p className="al-text-lg mt-5">
              For privacy-related enquiries:
            </p>

            <p className="mt-4 text-xl font-semibold text-[var(--al-accent)]">
              info@archeloop.com
            </p>
          </div>

          <PolicySection title="9. Updates">
            This policy may be updated periodically as ArcheLoop evolves.
          </PolicySection>
        </div>
      </section>
    </PageShell>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="al-card p-8">
      <h2 className="text-3xl font-semibold text-[var(--al-accent)]">
        {title}
      </h2>

      <div className="al-text-lg mt-6">
        {children}
      </div>
    </section>
  );
}