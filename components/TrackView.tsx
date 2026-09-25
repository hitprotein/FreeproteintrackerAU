"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export default function TrackView({ event, params }: { event: AnalyticsEvent; params: Record<string, unknown> }) {
  useEffect(() => { trackEvent(event, params); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
