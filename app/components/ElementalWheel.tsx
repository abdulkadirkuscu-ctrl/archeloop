type ElementScore = {
  element: string;
  percentage: number;
};

export default function ElementalWheel({ scores }: { scores: ElementScore[] }) {
  const order = ["Fire", "Air", "Water", "Earth"];

  const colours: Record<string, string> = {
    Fire: "216, 183, 120",
    Air: "147, 197, 253",
    Water: "251, 113, 133",
    Earth: "163, 230, 53",
  };

  const labels: Record<string, string> = {
    Fire: "Sovereign",
    Air: "Magician",
    Water: "Lover",
    Earth: "Warrior",
  };

  const themes: Record<string, string> = {
    Fire: "Visibility",
    Air: "Perception",
    Water: "Connection",
    Earth: "Grounding",
  };

  const orderedScores = order.map((element) => ({
    element,
    percentage:
      scores.find((score) => score.element === element)?.percentage ?? 0,
  }));

  const strongest = [...orderedScores].sort(
    (a, b) => b.percentage - a.percentage
  )[0];

  const growthEdge = [...orderedScores].sort(
    (a, b) => a.percentage - b.percentage
  )[0];

  function activityLabel(percentage: number) {
    if (percentage >= 70) return "Very Active";
    if (percentage >= 50) return "Active";
    if (percentage >= 30) return "Developing";
    return "Growth Edge";
  }

  function glowFor(percentage: number) {
    return Math.min(95, Math.max(24, percentage * 1.15));
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-8 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
          Archetype Compass™
        </p>

        <h2 className="mt-4 text-3xl font-bold text-stone-100">
          Your Elemental Balance
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-stone-400">
          This compass shows how the four ArcheLoop archetypes are currently
          expressed in your pattern. Higher scores suggest stronger activation;
          lower scores point toward your next integration edge.
        </p>
      </div>

      <div className="relative mx-auto mt-10 aspect-square w-full max-w-[520px] overflow-hidden rounded-full border border-yellow-300/20 bg-black p-4 shadow-[inset_0_0_60px_rgba(216,183,120,0.08),0_0_80px_rgba(216,183,120,0.08)]">
        <div
          className="absolute inset-5 rounded-full opacity-90"
          style={{
            background: `
              conic-gradient(
                from -90deg,
                rgba(${colours.Fire},0.92) 0deg 90deg,
                rgba(${colours.Air},0.82) 90deg 180deg,
                rgba(${colours.Water},0.82) 180deg 270deg,
                rgba(${colours.Earth},0.82) 270deg 360deg
              )
            `,
          }}
        />

        <div className="absolute inset-8 rounded-full bg-black/40" />
        <div className="absolute inset-14 rounded-full border border-white/10 bg-black/80" />
        <div className="absolute inset-28 rounded-full border border-yellow-300/30 bg-[#0B1018] shadow-[0_0_45px_rgba(216,183,120,0.18)]" />

        <div className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-x-1/2 -translate-y-1/2 bg-white/10" />
        <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-white/10" />

        {orderedScores.map((score, index) => {
          const positions = [
            { left: "50%", top: "17%" },
            { left: "83%", top: "50%" },
            { left: "50%", top: "83%" },
            { left: "17%", top: "50%" },
          ];

          const colour = colours[score.element];
          const glow = glowFor(score.percentage);

          return (
            <div
              key={score.element}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={positions[index]}
            >
              <div
                className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full border border-white/20"
                style={{
                  background: `radial-gradient(circle, rgba(${colour},0.95) 0%, rgba(0,0,0,0.86) 72%)`,
                  boxShadow: `0 0 ${glow}px rgba(${colour},0.55)`,
                }}
              >
                <div>
                  <p className="text-lg font-bold text-white">
                    {score.percentage}%
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/70">
                    {activityLabel(score.percentage)}
                  </p>
                </div>
              </div>

              <p
                className="text-sm font-bold uppercase tracking-[0.14em]"
                style={{ color: `rgb(${colour})` }}
              >
                {score.element}
              </p>

              <p className="text-[11px] text-stone-400">
                {labels[score.element]} · {themes[score.element]}
              </p>
            </div>
          );
        })}

        <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-yellow-300/30 bg-gradient-to-br from-[#15100A] via-[#0B1018] to-black text-center shadow-[0_0_55px_rgba(216,183,120,0.22)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
            ArcheLoop
          </p>

          <p className="mt-1 text-sm font-semibold text-yellow-300">
            Compass
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
            Most Active
          </p>

          <p className="mt-3 text-2xl font-bold text-yellow-300">
            {strongest.element} · {labels[strongest.element]}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            This energy appears most active in your current pattern.
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
            Integration Edge
          </p>

          <p className="mt-3 text-2xl font-bold text-yellow-300">
            {growthEdge.element} · {labels[growthEdge.element]}
          </p>

          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            This may be the archetypal energy asking for more attention,
            support, or integration.
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-stone-500">
        Your Archetype Compass is not fixed. It reflects your current pattern
        and can shift as you move from awareness into integration.
      </p>
    </div>
  );
}