import { integrationJourneys } from "./integrationJourneys"

export type PersonCategory =
  | "Partner / Spouse"
  | "Mother"
  | "Father"
  | "Sibling"
  | "Child"
  | "Friend"
  | "Colleague"
  | "Manager / Boss"
  | "Client / Customer"
  | "Relative"
  | "Stranger"
  | "Myself"

export type EnvironmentCategory =
  | "Work"
  | "Home"
  | "School / University"
  | "Social Gathering"
  | "Party / Celebration"
  | "Family Event"
  | "Relationship / Dating"
  | "Online / Social Media"
  | "Phone / Text"
  | "Public Place"
  | "Travel"
  | "Alone"

export type TriggerEvent =
  | "Criticism"
  | "Comparison"
  | "Being ignored"
  | "Being overlooked"
  | "Change"
  | "Uncertainty"
  | "Decision"
  | "Unexpected situation"
  | "Rejection"
  | "Emotional distance"
  | "Disappointment"
  | "Feeling abandoned"
  | "Boundary challenge"
  | "Conflict"
  | "Responsibility"
  | "Feeling controlled"

export type BodyArea =
  | "Head / Throat"
  | "Chest / Solar Plexus"
  | "Gut / Lower Abdomen"
  | "Legs / Feet / Full Body"

export type EmotionalState =
  | "Inadequate / Exposed"
  | "Confused / Overthinking"
  | "Hurt / Longing"
  | "Defensive / Tense"

export type ResponseStyle = "Collapse" | "Compensate" | "Collide"

export type TriggerLog = {
  id: string
  createdAt: string
  personCategory: PersonCategory
  triggerEvent: TriggerEvent
  environment: EnvironmentCategory
  bodyArea: BodyArea
  emotionalState: EmotionalState
  responseStyle: ResponseStyle
  detectedLoop: string
}

export const personCategories: PersonCategory[] = [
  "Partner / Spouse",
  "Mother",
  "Father",
  "Sibling",
  "Child",
  "Friend",
  "Colleague",
  "Manager / Boss",
  "Client / Customer",
  "Relative",
  "Stranger",
  "Myself",
]

export const environmentCategories: EnvironmentCategory[] = [
  "Work",
  "Home",
  "School / University",
  "Social Gathering",
  "Party / Celebration",
  "Family Event",
  "Relationship / Dating",
  "Online / Social Media",
  "Phone / Text",
  "Public Place",
  "Travel",
  "Alone",
]

export const triggerEvents: TriggerEvent[] = [
  "Criticism",
  "Comparison",
  "Being ignored",
  "Being overlooked",
  "Change",
  "Uncertainty",
  "Decision",
  "Unexpected situation",
  "Rejection",
  "Emotional distance",
  "Disappointment",
  "Feeling abandoned",
  "Boundary challenge",
  "Conflict",
  "Responsibility",
  "Feeling controlled",
]

export function countByField<T extends keyof TriggerLog>(
  logs: TriggerLog[],
  field: T
) {
  return logs.reduce<Record<string, number>>((acc, log) => {
    const value = String(log[field])
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})
}

export function sortCounts(counts: Record<string, number>) {
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
}

export function getJourneyForLoop(loop: string) {
  return integrationJourneys.find((journey) => journey.loop === loop) || null
}

export function analyseTriggerLogs(
  logs: TriggerLog[],
  reportPrimaryLoop?: string
) {
  const loopCounts = sortCounts(countByField(logs, "detectedLoop"))
  const personCounts = sortCounts(countByField(logs, "personCategory"))
  const triggerCounts = sortCounts(countByField(logs, "triggerEvent"))
  const environmentCounts = sortCounts(countByField(logs, "environment"))
  const responseCounts = sortCounts(countByField(logs, "responseStyle"))
  const emotionalStateCounts = sortCounts(countByField(logs, "emotionalState"))
  const bodyAreaCounts = sortCounts(countByField(logs, "bodyArea"))

  const mostActiveLoop = loopCounts[0]?.label || reportPrimaryLoop || null
  const primaryJourney = mostActiveLoop ? getJourneyForLoop(mostActiveLoop) : null

  const reportJourney =
    reportPrimaryLoop && reportPrimaryLoop !== mostActiveLoop
      ? getJourneyForLoop(reportPrimaryLoop)
      : null

  const supportingLoop = loopCounts.length > 1 ? loopCounts[1]?.label : null
  const supportingJourney = supportingLoop ? getJourneyForLoop(supportingLoop) : null

  const topPerson = personCounts[0]?.label || null
  const topTrigger = triggerCounts[0]?.label || null
  const topEnvironment = environmentCounts[0]?.label || null
  const topResponse = responseCounts[0]?.label || null

  return {
    totalLogs: logs.length,
    loopCounts,
    personCounts,
    triggerCounts,
    environmentCounts,
    responseCounts,
    emotionalStateCounts,
    bodyAreaCounts,
    mostActiveLoop,
    primaryJourney,
    reportJourney,
    supportingJourney,
    topPerson,
    topTrigger,
    topEnvironment,
    topResponse,
    insight:
      mostActiveLoop && primaryJourney
        ? `Your most active recent loop is ${mostActiveLoop}. The recommended integration focus is ${primaryJourney.path}.`
        : "Start logging triggers to reveal your most active loop.",
    patternSummary:
      mostActiveLoop && topPerson && topTrigger && topEnvironment
        ? `${mostActiveLoop} appears most often around ${topPerson}, especially around ${topTrigger.toLowerCase()}, usually in ${topEnvironment.toLowerCase()} settings.`
        : null,
  }
}

export const exampleTriggerLogs: TriggerLog[] = [
  {
    id: "1",
    createdAt: "2026-06-01",
    personCategory: "Manager / Boss",
    triggerEvent: "Criticism",
    environment: "Work",
    bodyArea: "Chest / Solar Plexus",
    emotionalState: "Inadequate / Exposed",
    responseStyle: "Collapse",
    detectedLoop: "Dimmed Light",
  },
  {
    id: "2",
    createdAt: "2026-06-02",
    personCategory: "Manager / Boss",
    triggerEvent: "Comparison",
    environment: "Work",
    bodyArea: "Chest / Solar Plexus",
    emotionalState: "Inadequate / Exposed",
    responseStyle: "Compensate",
    detectedLoop: "Paper Crown",
  },
  {
    id: "3",
    createdAt: "2026-06-03",
    personCategory: "Friend",
    triggerEvent: "Boundary challenge",
    environment: "Phone / Text",
    bodyArea: "Legs / Feet / Full Body",
    emotionalState: "Defensive / Tense",
    responseStyle: "Collapse",
    detectedLoop: "Compliance",
  },
  {
    id: "4",
    createdAt: "2026-06-04",
    personCategory: "Myself",
    triggerEvent: "Uncertainty",
    environment: "Alone",
    bodyArea: "Head / Throat",
    emotionalState: "Confused / Overthinking",
    responseStyle: "Compensate",
    detectedLoop: "Mind Maze",
  },
]