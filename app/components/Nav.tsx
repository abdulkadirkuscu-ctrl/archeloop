import Link from "next/link"

const navItems = [
  {
    label: "How It Works",
    href: "/#how-it-works",
  },
  {
  label: "Shadow Loops",
  href: "/loops",
},
  {
    label: "Assessment",
    href: "/assessment",
  },
  {
    label: "Report",
    href: "/report",
  },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ArcheLoop™
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-300 transition hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/triggered"
          className="rounded-full border border-yellow-300 px-5 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
        >
          I Am Triggered
        </Link>
      </nav>
    </header>
  )
}