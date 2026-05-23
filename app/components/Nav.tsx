import Image from "next/image"

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="/" className="flex items-center hover:opacity-80 transition">
          <Image
            src="/images/logo/archeloop-logo.png"
            alt="ArcheLoop Logo"
            width={78}
            height={78}
            className="rounded-full object-contain scale-125 drop-shadow-[0_0_24px_rgba(255,215,100,0.35)]"
          />
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="/what-is-archeloop" className="hover:text-yellow-300 transition">
            What Is ArcheLoop
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

          <a href="/about" className="hover:text-yellow-300 transition">
            About
          </a>
        </div>

        <a
          href="/triggered"
          className="hidden md:inline-flex bg-yellow-300 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-200 transition"
        >
          I Am Triggered
        </a>
      </div>
    </nav>
  )
}