import Nav from "../components/Nav"
import Footer from "../components/Footer"
import {
  analyseTriggerLogs,
  exampleTriggerLogs,
} from "../data/triggerTracking"

export default function TriggeredProPreviewPage() {
  const analysis = analyseTriggerLogs(exampleTriggerLogs, "Dimmed Light")

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-gray-500">
            I Am Triggered Pro™ Preview
          </p>

          <h1 className="mb-6 text-5xl font-bold">
            Trigger Intelligence Dashboard
          </h1>

          <p className="mb-12 max-w-3xl text-xl leading-relaxed text-gray-300">
            This hidden preview shows how ArcheLoop could analyse trigger logs,
            detect recurring loops, and recommend an integration journey.
          </p>

          <div className="grid gap-6 md:grid-cols-4">
            <Card title="Total Logs" value={analysis.totalLogs} />
            <Card title="Most Active Loop" value={analysis.mostActiveLoop || "—"} />
            <Card title="Top Trigger" value={analysis.topTrigger || "—"} />
            <Card title="Top Person" value={analysis.topPerson || "—"} />
          </div>

          <div className="mt-8 rounded-3xl border border-yellow-300/30 bg-yellow-300/10 p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
              Recommended Journey
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              {analysis.primaryJourney?.path || "No journey yet"}
            </h2>

            <p className="mt-4 text-gray-300">
              {analysis.insight}
            </p>

            {analysis.patternSummary && (
              <p className="mt-4 text-gray-400">
                {analysis.patternSummary}
              </p>
            )}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <List title="Loop Activations" items={analysis.loopCounts} />
            <List title="People" items={analysis.personCounts} />
            <List title="Triggers" items={analysis.triggerCounts} />
            <List title="Environments" items={analysis.environmentCounts} />
            <List title="Responses" items={analysis.responseCounts} />
            <List title="Emotional States" items={analysis.emotionalStateCounts} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
        {title}
      </p>
      <p className="mt-4 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  )
}

function List({
  title,
  items,
}: {
  title: string
  items: { label: string; count: number }[]
}) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="mb-5 text-2xl font-bold">{title}</h3>

      {items.length === 0 ? (
        <p className="text-gray-500">No data yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex justify-between rounded-xl border border-zinc-800 bg-black p-4"
            >
              <span className="text-gray-300">{item.label}</span>
              <span className="font-semibold text-yellow-300">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}