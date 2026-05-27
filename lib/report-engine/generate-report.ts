import { getLoopProfile } from "./get-loop-profile"

export function generateReport(primarySlug: string, secondarySlug?: string) {
  const primary = getLoopProfile(primarySlug)
  const secondary = secondarySlug ? getLoopProfile(secondarySlug) : undefined

  if (!primary) return null

  return {
    primary,
    secondary,

    structuralSummary: `${primary.dominantElements.join(
      " + "
    )} patterns are active while ${primary.suppressedElements.length > 0
      ? primary.suppressedElements.join(" + ")
      : "another part of the system"
    } may be under-integrated. This creates the ${primary.name}.`,

    integrationSummary: `${primary.integrationElement} energy, expressed through the Healthy ${primary.integrationArchetype}, helps restore balance by supporting ${primary.integrationShift.toLowerCase()}`,

    relationalSummary: `${primary.name} may be activated by ${primary.relationalActivators
      .slice(0, 3)
      .join(", ")}.`,

    nervousSystemSummary: `This pattern is commonly associated with ${primary.nervousSystemPatterns.join(
      " + "
    )} responses.`,

    loopCascade:
      primary.activates.length > 0
        ? `${primary.name} may activate ${primary.activates.join(", ")} under pressure.`
        : "",

    reportSections: [
      {
        title: "Structural Dynamics",
        body: primary.coreDynamic,
      },
      {
        title: "Psychological Mechanism",
        body: primary.psychologicalMechanism,
      },
      {
        title: "Relational Activators",
        body: primary.relationalActivators.join(", "),
      },
      {
        title: "Integration Pathway",
        body: primary.integrationShift,
      },
    ],
  }
}