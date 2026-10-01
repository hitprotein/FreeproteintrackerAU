declare global { interface Window { gtag?: (...args: unknown[]) => void } }

export type AnalyticsEvent =
  | "protein_search" | "food_viewed" | "restaurant_viewed" | "tracker_started" | "food_added_to_tracker"
  | "protein_goal_completed" | "comparison_started" | "hitprotein_cta_clicked" | "app_store_clicked"
  | "kj_converter_used";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return; // no-op until GA4 is consented + loaded
  window.gtag("event", event, params);
}
