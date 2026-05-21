import Image from "next/image"

export default function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-5 p-6 border-b border-zinc-800 bg-black text-white sticky top-0 z-50">
     <a href="/" className="flex items-center hover:opacity-80 transition">
  <Image
    src="/images/logo/archeloop-logo.png"
    alt="ArcheLoop Logo"
    width={90}
    height={90}
    className="rounded-full object-contain scale-125 drop-shadow-[0_0_24px_rgba(255,215,100,0.35)]"
  />
</a>
      <a href="/" className="hover:text-yellow-300 transition">Home</a>

<a href="/what-is-archeloop" className="hover:text-yellow-300 transition">
  What Is ArcheLoop
</a>

<a href="/archetypes" className="hover:text-yellow-300 transition">
  Archetypes
</a>

<a href="/loops" className="hover:text-yellow-300 transition">
  Shadow Loops
</a>

<a href="/break-the-loop" className="hover:text-yellow-300 transition">
  Break the Loop
</a>

<a href="/assessment" className="hover:text-yellow-300 transition">
  Assessment
</a>

<a href="/triggered" className="hover:text-yellow-300 transition">
  I Am Triggered
</a>

<a href="/practices" className="hover:text-yellow-300 transition">
  Practices
</a>

<a href="/nervous-system" className="hover:text-yellow-300 transition">
  Nervous System
</a>

<a href="/archetype-interactions" className="hover:text-yellow-300 transition">
  Interactions
</a>

<a href="/about" className="hover:text-yellow-300 transition">
  About
</a>

<a href="/contact" className="hover:text-yellow-300 transition">
  Contact
</a>
    </nav>
  )
}