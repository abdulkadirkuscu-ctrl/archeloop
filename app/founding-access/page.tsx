export default function FoundingAccessPage() {
return ( <main className="min-h-screen bg-black text-white">

  <section className="px-6 py-32">

    <div className="max-w-6xl mx-auto">

      <div className="text-center mb-20">

        <p className="uppercase tracking-[0.35em] text-gray-500 mb-5">
          Founding Access
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
          Become one of the first
          <br />
          ArcheLoop members.
        </h1>

        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Receive your full premium ArcheLoop report before public launch
          and help shape the future of the platform through real-world
          feedback and testing.
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">

        <div className="border border-zinc-800 rounded-[2rem] bg-zinc-950 p-10">

          <p className="uppercase tracking-[0.25em] text-gray-500 text-sm mb-8">
            What You Receive
          </p>

          <div className="space-y-5 text-gray-300">

            <p>✓ Full Premium ArcheLoop Report</p>

            <p>✓ Loop Landscape Analysis</p>

            <p>✓ Archetype Score Map</p>

            <p>✓ Healthy Expression & Shadow Pressure Mapping</p>

            <p>✓ Nervous System Pattern Analysis</p>

            <p>✓ Relational Activators & Emotional Triggers</p>

            <p>✓ Body Map Interpretation</p>

            <p>✓ Core Fear & Protection Pattern Analysis</p>

            <p>✓ Integration Blueprint</p>

            <p>✓ Personalised Loop Breakers</p>

            <p>✓ Priority Access To Future Features</p>

            <p>✓ Early Access To I Am Triggered™</p>

          </div>

        </div>

        <div className="border border-yellow-300/30 rounded-[2rem] bg-gradient-to-b from-yellow-300/10 to-black p-10">

          <p className="uppercase tracking-[0.25em] text-yellow-300 text-sm mb-8">
  Founding Access Programme
</p>

          <h2 className="text-3xl font-bold mb-6">
  First 50 Reports Free.
</h2>

         <p className="text-gray-300 leading-relaxed mb-8">
  The first 50 ArcheLoop reports are currently available free as part of the
  Founding Access programme.
</p>

<p className="text-gray-300 leading-relaxed mb-8">
  In exchange, we ask for honest feedback about what felt accurate,
  what felt missing, and how the experience can be improved.
</p>

          <div className="space-y-4 text-gray-300">

            <p>✓ Full Premium Report</p>

            <p>✓ Free Founding Access</p>

            <p>✓ Opportunity To Provide Feedback</p>

            <p>✓ Help Improve ArcheLoop</p>

          </div>

        </div>

      </div>

      <div className="border border-zinc-800 rounded-[2rem] bg-gradient-to-b from-zinc-950 to-black p-10">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Request Founding Access
        </h2>

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
            placeholder="What was your primary loop?"
            className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-300"
          />

          <textarea
            name="message"
            required
            rows={6}
            placeholder="What felt most accurate? What felt missing? Any feedback?"
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

      <p className="text-center text-sm text-gray-500 mt-10 max-w-3xl mx-auto">
        ArcheLoop reports are educational self-development tools and are
        not medical, psychiatric, psychological, therapeutic, legal, or
        diagnostic services.
      </p>

    </div>

  </section>

</main>

)
}