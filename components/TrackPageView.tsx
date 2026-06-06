"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/trackEvent";

export default function TrackPageView({
  eventName,
  eventValue,
}: {
  eventName: string;
  eventValue?: string;
}) {
  useEffect(() => {
    trackEvent(eventName, eventValue);
  }, [eventName, eventValue]);

  return null;
}