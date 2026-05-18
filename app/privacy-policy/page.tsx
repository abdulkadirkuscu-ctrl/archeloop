import Nav from "../components/Nav"
import Footer from "../components/Footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Nav />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <p className="uppercase tracking-[0.3em] text-gray-400 mb-4">
          ArcheLoop™
        </p>

        <h1 className="text-5xl font-bold mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              1. Introduction
            </h2>

            <p>
              ArcheLoop respects your privacy and is committed to protecting
              personal information shared through this website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              2. Information We May Collect
            </h2>

            <p className="mb-4">
              Depending on how you use the website, we may collect:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name and email address</li>
              <li>Messages submitted through contact forms</li>
              <li>Assessment responses and self-development reflections</li>
              <li>Basic website analytics and usage information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              3. How Information Is Used
            </h2>

            <p className="mb-4">
              Information may be used to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to messages or enquiries</li>
              <li>Improve the ArcheLoop experience</li>
              <li>Provide educational or self-development resources</li>
              <li>Send updates if you choose to subscribe</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              4. Educational Purpose
            </h2>

            <p>
              ArcheLoop is an educational self-development framework and does
              not provide medical, psychiatric, psychological, therapeutic,
              legal, or crisis services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              5. Data Protection
            </h2>

            <p>
              Reasonable steps are taken to protect submitted information.
              However, no method of online transmission or storage can be
              guaranteed as completely secure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              6. Third-Party Services
            </h2>

            <p>
              ArcheLoop may use third-party services such as website hosting,
              analytics, form processing, or email tools which may process data
              according to their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              7. Your Rights
            </h2>

            <p>
              You may request access, correction, or deletion of personal
              information by contacting ArcheLoop directly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              8. Contact
            </h2>

            <p>
              For privacy-related enquiries, contact:
            </p>

            <p className="mt-4 text-yellow-300">
              info@archeloop.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              9. Updates
            </h2>

            <p>
              This policy may be updated periodically as ArcheLoop evolves.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}