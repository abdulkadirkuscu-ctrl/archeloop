import Nav from "../components/Nav";
import Footer from "../components/Footer";

const freeItems = [
  "Shadow Loops™",
  "Archetypes™",
  "Body Map™",
  "Nervous System™",
  "Relational Dynamics™",
  "Practices™",
  "Basic I Am Triggered™",
];

const reportItems = [
  "60-question Find My Loop™ assessment",
  "Primary & Secondary Shadow Loops™",
  "Archetype & Element",
  "Nervous System Pattern",
  "Integrated Self™",
  "Full ArcheLoop Report™",
];

const integrationItems = [
  "Triggered Pro™",
  "Progress Dashboard™",
  "Integration Journeys™",
  "My Integrated Vision™",
  "Practices & Reflection Prompts™",
  "Personal Integration Tracking™",
];

export default function FoundingAccessPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Founding Access
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            Explore ArcheLoop™ before
            <br />
            public pricing begins.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-stone-300">
            ArcheLoop™ is currently in Founding Access. During this phase, early
            users can explore the system, generate reports, test Integration™,
            and help shape the platform before paid access begins.
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-[2rem] border border-yellow-300/20 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
              Founding Access Code
            </p>

            <p className="mt-4 text-4xl font-bold tracking-widest text-yellow-300">
              FOUNDING50
            </p>

            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Use this code to unlock your ArcheLoop Report™ during the founding
              phase. No payment is required during Founding Access.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
              Product Structure
            </p>

            <h2 className="mt-5 text-4xl font-bold md:text-5xl">
              Free, Report, Integration.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
              ArcheLoop™ has three clear levels: explore the framework for free,
              understand your Shadow Loop™ with Find My Loop™, or continue into
              ArcheLoop Integration™ to practise real-life change.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                Free
              </p>

              <h3 className="mt-4 text-3xl font-bold text-yellow-300">
                Explore ArcheLoop™
              </h3>

              <p className="mt-4 text-3xl font-bold">£0</p>

              <p className="mt-5 leading-relaxed text-stone-300">
                Learn the framework, explore the Shadow Loops™, and use basic I
                Am Triggered™ without payment.
              </p>

              <div className="mt-7 grid gap-3">
                {freeItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <a
                href="/loops"
                className="mt-8 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Explore Free Resources
              </a>
            </div>

            <div className="rounded-[2.5rem] border border-yellow-300/30 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Product 1
              </p>

              <h3 className="mt-4 text-3xl font-bold text-yellow-300">
                Find My Loop™
              </h3>

              <p className="mt-4 text-lg text-stone-500 line-through">£29</p>

              <p className="text-2xl font-semibold text-yellow-300">
                Launch Price: £14.50
              </p>

              <p className="mt-2 text-sm text-stone-400">
                Free during Founding Access
              </p>

              <p className="mt-5 leading-relaxed text-stone-300">
                Complete the 60-question assessment and receive your full
                personalised ArcheLoop Report™.
              </p>

              <div className="mt-7 grid gap-3">
                {reportItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <a
                href="/assessment"
                className="mt-8 inline-flex rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
              >
                Find My Loop™
              </a>
            </div>

            <div className="rounded-[2.5rem] border border-yellow-300/10 bg-[#0B1018] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/60">
                Product 2
              </p>

              <h3 className="mt-4 text-3xl font-bold text-yellow-300">
                ArcheLoop Integration™
              </h3>

              <p className="mt-4 text-lg text-stone-500 line-through">
                £29/month
              </p>

              <p className="text-2xl font-semibold text-yellow-300">
                Launch Price: £14.50/month
              </p>

              <p className="mt-2 text-sm text-stone-400">
                Free during Founding Access
              </p>

              <p className="mt-5 leading-relaxed text-stone-300">
                Continue into real-life trigger tracking, Integration Journeys™,
                progress tracking, and ongoing transformation.
              </p>

              <div className="mt-7 grid gap-3">
                {integrationItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-300/10 bg-black/30 p-4 text-stone-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <a
                href="/integration"
                className="mt-8 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-6 py-3 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
              >
                Explore Integration™
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/60">
            Future Bundle Offer
          </p>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            Report + first month Integration.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-stone-300">
            After Founding Access, new users will be able to unlock Find My
            Loop™ and begin ArcheLoop Integration™ together.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-yellow-300/20 bg-black/40 p-8">
            <p className="text-lg text-stone-500 line-through">£39</p>

            <p className="text-3xl font-bold text-yellow-300">
              Launch Bundle: £19.99
            </p>

            <p className="mt-4 text-stone-400">
              Includes your ArcheLoop Report™ and first month of ArcheLoop
              Integration™. Then £14.50/month during launch pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm leading-relaxed text-stone-500">
            ArcheLoop™ is an educational self-development tool and is not
            medical, psychiatric, psychological, therapeutic, legal, or
            diagnostic advice. Pricing, launch offers, and founding access may
            change as the platform develops.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}