import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative max-w-5xl mx-auto space-y-10">
          <div className="rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              ArcheLoop™
            </p>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Privacy Policy
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
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

            <ul className="space-y-2 text-stone-300">
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

            <ul className="space-y-2 text-stone-300">
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

          <div className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
            <h2 className="text-3xl font-semibold text-yellow-300">
              8. Contact
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-stone-300">
              For privacy-related enquiries:
            </p>

            <p className="mt-4 text-xl font-semibold text-yellow-300">
              info@archeloop.com
            </p>
          </div>

          <PolicySection title="9. Updates">
            This policy may be updated periodically as ArcheLoop evolves.
          </PolicySection>
        </div>
      </section>

      <Footer />
    </main>
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
    <section className="rounded-[2rem] border border-yellow-300/10 bg-[#0B1018] p-8 shadow-[0_0_45px_rgba(216,183,120,0.05)]">
      <h2 className="text-3xl font-semibold text-yellow-300">
        {title}
      </h2>

      <div className="mt-6 text-lg leading-relaxed text-stone-300">
        {children}
      </div>
    </section>
  );
}