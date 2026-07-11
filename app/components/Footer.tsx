import Link from "next/link";

export default function Footer() {
  return (
    <footer className="al-site-footer">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="al-brand-name">
              ArcheLoop
            </h2>

            <p className="al-brand-tagline mt-5">
              <span className="al-understand-word">Understand</span>
              <span className="al-brand-divider">•</span>
              <span className="al-interrupt-word">Interrupt</span>
              <span className="al-brand-divider">•</span>
              <span className="al-integrate-word">Integrate</span>
            </p>

            <p className="al-footer-description mt-7 max-w-lg">
              ArcheLoop is an integrative archetypal self-awareness framework
              that helps people recognise recurring Shadow Loops, interrupt
              automatic reactions, and develop a more integrated way of being.
            </p>

            <p className="al-brand-mission-footer mt-8">
              Helping people <em>live from their Integrated Self.</em>
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

        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--al-footer-border)] pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-5 text-sm">
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
                className="al-footer-link"
              >
                {label}
              </Link>
            ))}
          </div>

          <p className="al-footer-copyright">
            © 2026 ArcheLoop. All rights reserved.
          </p>
        </div>

        <p className="al-footer-disclaimer mt-8">
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
      <h3 className="al-footer-heading">
        {title}
      </h3>

      <div className="mt-5 flex flex-col gap-3">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="al-footer-link"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}