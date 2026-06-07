import Link from "next/link";

const navItems = [
  {
    label: "Shadow Loops",
    href: "/loops",
  },
  {
    label: "Find My Loop",
    href: "/assessment",
  },
  {
    label: "Integration",
    href: "/integration",
  },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-yellow-300/10 bg-[#030712]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-stone-100 transition hover:text-yellow-300"
        >
          ArcheLoop™
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-stone-300 transition hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/triggered"
          className="rounded-full bg-yellow-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-200"
        >
          I Am Triggered
        </Link>
        <Link
  href="/account"
  className="text-sm font-medium text-stone-300 transition hover:text-yellow-300"
>
  My Account
</Link>
      </nav>
    </header>
  );
}