import Image from "next/image"

export default function Nav() {
  return (
   <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black text-white px-4 py-4">
  <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">

    <a href="/" className="hover:opacity-80 transition">
      <Image
        src="/images/logo/archeloop-logo.png"
        alt="ArcheLoop Logo"
        width={72}
        height={72}
        className="rounded-full object-contain drop-shadow-[0_0_24px_rgba(255,215,100,0.35)] md:w-[90px] md:h-[90px]"
      />
    </a>

    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-gray-300 text-center">
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
      <a href="/report">Report</a>

      <a href="/about" className="hover:text-yellow-300 transition">
        About
      </a>

      <a
        href="/triggered"
        className="bg-yellow-300 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-200 transition"
      >
        I Am Triggered
      </a>
    </div>
  </div>
</nav>
  )
}