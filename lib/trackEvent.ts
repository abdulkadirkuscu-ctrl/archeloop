export async function trackEvent(eventName: string, eventValue?: string) {
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventValue,
      }),
    });
  } catch {
    // Silent fail — tracking should never break user flow
  }
}