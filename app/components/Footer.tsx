import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-yellow-300/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-yellow-300">
              ArcheLoop
            </h2>

            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-stone-500">
              Understand • Interrupt • Integrate
            </p>

            <p className="mt-6 max-w-md leading-relaxed text-stone-300">
              ArcheLoop is an integrative archetypal self-awareness framework
              that helps people recognise recurring Shadow Loops, interrupt
              automatic reactions, and develop a more integrated way of being.
            </p>

            <p className="mt-6 text-lg font-semibold text-yellow-300">
              Helping people live from their Integrated Self.
            </p>
          </div>

          <FooterGroup
            title="Explore"
            links={[
              ["What is ArcheLoop?", "/what-is-archeloop"],
              ["Shadow Loops", "/loops"],
              ["Find My Loop", "/assessment"],
              ["Integration", "/integration"],
              ["I Am Triggered", "/triggered"],
            ]}
          />

          <FooterGroup
            title="Resources"
            links={[
              ["Archetypes", "/archetypes"],
              ["Body Map", "/body-map"],
              ["Nervous System", "/nervous-system"],
              ["Practices", "/practices"],
              ["Relational Dynamics", "/relational-dynamics"],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-yellow-300/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-5 text-sm text-stone-400">
            {[
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms-and-conditions"],
              ["Disclaimer", "/disclaimer"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="transition hover:text-yellow-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-stone-500">
            © 2026 ArcheLoop. All rights reserved.
          </p>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-stone-500">
          ArcheLoop is an educational self-awareness framework and does not
          provide medical, psychological, psychiatric, therapeutic, legal, or
          financial advice.
        </p>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
        {title}
      </h3>

      <div className="mt-5 flex flex-col gap-3 text-stone-300">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="transition hover:text-yellow-300"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}