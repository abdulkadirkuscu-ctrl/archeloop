type ElementScore = {
  element: string;
  percentage: number;
};

export default function ElementalWheel({ scores }: { scores: ElementScore[] }) {
  const order = ["Fire", "Air", "Water", "Earth"];

  const colours: Record<string, string> = {
    Fire: "var(--fire)",
    Air: "var(--air)",
    Water: "var(--water)",
    Earth: "var(--earth)",
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

  return (
    <div className="al-premium-card mx-auto max-w-3xl p-8">
      <div className="text-center">
        <p className="al-kicker">Archetype Compass</p>

        <h2 className="mt-4 text-3xl font-bold text-[var(--al-text)]">
          Your Elemental Balance
        </h2>

        <p className="al-text mx-auto mt-4 max-w-2xl text-sm">
          This compass shows how the four ArcheLoop archetypes are currently
          expressed in your pattern. Higher scores suggest stronger activation;
          lower scores point toward your next integration edge.
        </p>
      </div>

      <div className="al-compass-shell">
        <div
          className="absolute inset-5 rounded-full opacity-90"
          style={{
            background: `
              conic-gradient(
                from -90deg,
                var(--fire) 0deg 90deg,
                var(--air) 90deg 180deg,
                var(--water) 180deg 270deg,
                var(--earth) 270deg 360deg
              )
            `,
          }}
        />

        <div className="absolute inset-8 rounded-full bg-[var(--al-surface)]/70" />
        <div className="absolute inset-14 rounded-full border border-[var(--al-border)] bg-[var(--al-bg)]/90" />
        <div className="absolute inset-28 rounded-full border border-[var(--al-border)] bg-[var(--al-surface)]" />

        <div className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-x-1/2 -translate-y-1/2 bg-[var(--al-border)]" />
        <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 -translate-y-1/2 bg-[var(--al-border)]" />

        {orderedScores.map((score, index) => {
          const positions = [
            { left: "50%", top: "17%" },
            { left: "83%", top: "50%" },
            { left: "50%", top: "83%" },
            { left: "17%", top: "50%" },
          ];

          const colour = colours[score.element];

          return (
            <div
              key={score.element}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={positions[index]}
            >
              <div
                className="al-compass-node"
                style={{
                  outline: `2px solid ${colour}`,
                  outlineOffset: "3px",
                }}
              >
                <div>
                  <p className="text-lg font-bold text-[var(--al-text)]">
                    {score.percentage}%
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--al-text-muted)]">
                    {activityLabel(score.percentage)}
                  </p>
                </div>
              </div>

              <p
                className="text-sm font-bold uppercase tracking-[0.14em]"
                style={{ color: colour }}
              >
                {score.element}
              </p>

              <p className="text-[11px] text-[var(--al-text-muted)]">
                {labels[score.element]} · {themes[score.element]}
              </p>
            </div>
          );
        })}

        <div className="al-compass-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--al-text-muted)]">
            ArcheLoop
          </p>

          <p className="mt-1 text-sm font-semibold text-[var(--al-accent)]">
            Compass
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="al-soft-card p-5">
          <p className="al-kicker">Most Active</p>

          <p className="mt-3 text-2xl font-bold text-[var(--al-accent)]">
            {strongest.element} · {labels[strongest.element]}
          </p>

          <p className="al-text mt-2 text-sm">
            This energy appears most active in your current pattern.
          </p>
        </div>

        <div className="al-soft-card p-5">
          <p className="al-kicker">Integration Edge</p>

          <p className="mt-3 text-2xl font-bold text-[var(--al-accent)]">
            {growthEdge.element} · {labels[growthEdge.element]}
          </p>

          <p className="al-text mt-2 text-sm">
            This may be the archetypal energy asking for more attention,
            support, or integration.
          </p>
        </div>
      </div>

      <p className="al-muted mt-6 text-center text-sm leading-relaxed">
        Your Archetype Compass is not fixed. It reflects your current pattern
        and can shift as you move from awareness into integration.
      </p>
    </div>
  );
}