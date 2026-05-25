type ElementScore = {
  element: string
  percentage: number
}

export default function ElementalWheel({ scores }: { scores: ElementScore[] }) {
  const order = ["Fire", "Air", "Water", "Earth"]

  const colours: Record<string, string> = {
    Fire: "255, 215, 0",
    Air: "59, 130, 246",
    Water: "225, 29, 72",
    Earth: "132, 204, 22",
  }

  const labels: Record<string, string> = {
    Fire: "Visibility",
    Air: "Perception",
    Water: "Connection",
    Earth: "Grounding",
  }

  const orderedScores = order.map((element) => ({
    element,
    percentage:
      scores.find((score) => score.element === element)?.percentage ?? 0,
  }))

  const glowFor = (percentage: number) =>
    Math.min(90, Math.max(22, percentage * 1.1))

  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-square rounded-full border border-zinc-800 bg-black p-4 shadow-2xl overflow-hidden">
      <div
        className="absolute inset-5 rounded-full"
        style={{
          background: `
            conic-gradient(
              from -90deg,
              rgb(${colours.Fire}) 0deg 90deg,
              rgb(${colours.Air}) 90deg 180deg,
              rgb(${colours.Water}) 180deg 270deg,
              rgb(${colours.Earth}) 270deg 360deg
            )
          `,
        }}
      />

      <div className="absolute inset-8 rounded-full bg-black/35" />
      <div className="absolute inset-14 rounded-full bg-black/86 border border-white/10" />
      <div className="absolute inset-28 rounded-full bg-zinc-950 border border-yellow-300/25" />

      <div className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-x-1/2 -translate-y-1/2 bg-white/12" />
      <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-white/12" />

      {orderedScores.map((score, index) => {
        const positions = [
          { left: "50%", top: "18%" },
          { left: "82%", top: "50%" },
          { left: "50%", top: "82%" },
          { left: "18%", top: "50%" },
        ]

        const colour = colours[score.element]
        const glow = glowFor(score.percentage)

        return (
          <div
            key={score.element}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={positions[index]}
          >
            <div
              className="mx-auto mb-2 h-16 w-16 rounded-full border border-white/25 flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, rgb(${colour}) 0%, rgba(0,0,0,0.78) 72%)`,
                boxShadow: `0 0 ${glow}px rgba(${colour},0.75)`,
              }}
            >
              <span className="text-lg font-bold text-white">
                {score.percentage}%
              </span>
            </div>

            <p
              className="text-sm font-bold uppercase tracking-[0.12em]"
              style={{ color: `rgb(${colour})` }}
            >
              {score.element}
            </p>

            <p className="text-[11px] text-gray-400">
              {labels[score.element]}
            </p>
          </div>
        )
      })}

      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-300/30 bg-zinc-950 flex flex-col items-center justify-center text-center shadow-xl">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
          ArcheLoop
        </p>

        <p className="text-sm text-yellow-300 font-semibold">
          Elemental Map
        </p>
      </div>
    </div>
  )
}