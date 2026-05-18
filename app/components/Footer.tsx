export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <p className="text-xl font-bold text-yellow-300">ArcheLoop™</p>

          <p className="text-gray-400 mt-2">
            Understand. Interrupt. Integrate.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap text-gray-300">
          <a href="/about" className="hover:text-yellow-300">
            About
          </a>

          <a href="/contact" className="hover:text-yellow-300">
            Contact
          </a>

          <a href="/disclaimer" className="hover:text-yellow-300">
            Disclaimer
          </a>

          <a href="/privacy-policy" className="hover:text-yellow-300">
            Privacy Policy
          </a>

          <a href="/assessment" className="hover:text-yellow-300">
            Assessment
          </a>
        </div>
      </div>

      <p className="max-w-6xl mx-auto text-xs text-gray-500 mt-8">
        ArcheLoop is an educational self-development tool and is not medical,
        psychiatric, psychological, legal, or therapeutic advice.
      </p>
    </footer>
  )
}