export default function FoundingAccessPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="px-6 py-32">

        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">

            <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
              Founding Access
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Request your
              <br />
              ArcheLoop report.
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              ArcheLoop Founding Edition reports are currently available
              for selected early users helping shape the future system.
            </p>

          </div>

          <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-10">

            <form
  action="https://formspree.io/f/mvzywkkj"
  method="POST"
  className="space-y-8"
>
    <input
  type="text"
  name="name"
  required
  placeholder="Your name"
  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300"
/>
<input
  type="email"
  name="email"
  required
  placeholder="your@email.com"
  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300"
/>
<input
  type="text"
  name="primaryLoop"
  required
  placeholder="Example: Dimmed Light"
  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300"
/>
<textarea
  name="message"
  required
  rows={6}
  placeholder="Describe what resonated with you..."
  className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300 resize-none"
/>

              <button
                type="submit"
                className="w-full bg-yellow-300 text-black py-5 rounded-2xl font-semibold text-lg hover:bg-yellow-200 transition"
              >
                Request Founding Access
              </button>

            </form>

          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            ArcheLoop reports are educational symbolic self-awareness tools
            and are not medical, psychiatric, therapeutic, or diagnostic services.
          </p>

        </div>

      </section>

    </main>
  )
}