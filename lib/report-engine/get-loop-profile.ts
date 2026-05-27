import { logicMatrix } from "../loops/logic-matrix"

export function getLoopProfile(slug: string) {
  return logicMatrix.find((loop) => loop.slug === slug)
}

export function getLoopProfileByName(name: string) {
  return logicMatrix.find(
    (loop) =>
      loop.name.toLowerCase() === name.toLowerCase() ||
      loop.name.toLowerCase().replace(" loop", "") ===
        name.toLowerCase().replace(" loop", "")
  )
}

export function getRelatedLoopProfiles(slug: string) {
  const loop = getLoopProfile(slug)

  if (!loop) return []

  return loop.relatedDynamics
    .map((name) => getLoopProfileByName(name))
    .filter(Boolean)
}

export function getActivatedLoopProfiles(slug: string) {
  const loop = getLoopProfile(slug)

  if (!loop) return []

  return loop.activates
    .map((name) => getLoopProfileByName(name))
    .filter(Boolean)
}

export function getTriggeredByLoopProfiles(slug: string) {
  const loop = getLoopProfile(slug)

  if (!loop) return []

  return loop.triggeredBy
    .map((name) => getLoopProfileByName(name))
    .filter(Boolean)
}