export function generateInsight(
  loop: string,
  journey: string,
  identity: string
) {
  const insights: Record<string, string> = {
    "Dimmed Light":
      "Your results suggest that visibility may feel emotionally unsafe. When criticism, comparison, or exposure appear, you may instinctively reduce your presence, hide your needs, or question your worth.",

    "Paper Crown":
      "Your results suggest a tendency to seek validation externally. Approval and recognition may temporarily soothe insecurity while reinforcing dependence on outside confirmation.",

    "Stalled Flame":
      "Your results suggest that discouragement and self-doubt may be reducing your natural momentum. The challenge is not capability, but reconnecting to direction and purpose.",

    "Blank Page":
      "Your results suggest uncertainty may create paralysis. The desire for clarity can sometimes prevent movement altogether.",

    "Smoky Mirrors":
      "Your results suggest difficulty trusting your own perception. Self-doubt may become stronger than your direct experience.",

    "Mind Maze":
      "Your results suggest overthinking may be replacing action. The search for certainty can create more confusion rather than less.",

    "Emotional Lockdown":
      "Your results suggest emotional protection through withdrawal. Feelings may remain unexpressed even when connection is desired.",

    "Fantasy Fog":
      "Your results suggest idealization may be replacing reality. Expectations can become more powerful than what is actually happening.",

    "Flooded Waters":
      "Your results suggest emotions may become overwhelming during activation. Strong feelings can temporarily reduce perspective and regulation.",

    "Compliance":
      "Your results suggest self-abandonment in service of harmony. Boundaries may be sacrificed to avoid discomfort or disapproval.",

    "Fortress":
      "Your results suggest protection through emotional armor. Independence may feel safer than vulnerability.",

    "Barren Ground":
      "Your results suggest depletion rather than weakness. Constant responsibility may have exhausted available resources."
  };

  return `
${insights[loop] || ""}

Current Integration Journey:
${journey}

Emerging Integrated Identity:
${identity}
`;
}