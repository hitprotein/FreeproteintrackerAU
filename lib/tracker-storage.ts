import { trackEvent } from "./analytics";

export type Meal = "Breakfast" | "Lunch" | "Dinner" | "Snacks";
export const MEALS: Meal[] = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export interface Entry { id: string; name: string; protein: number; kcal?: number; meal: Meal; itemId?: string }
export interface TrackerState { target: number; entries: Entry[] }

export const TRACKER_KEY = "fpau_tracker_v1";
export const TRACKER_EVENT = "fpau-tracker-changed";

export function loadTracker(): TrackerState {
  if (typeof window === "undefined") return { target: 150, entries: [] };
  try {
    const p = JSON.parse(window.localStorage.getItem(TRACKER_KEY) ?? "null");
    return { target: p?.target ?? 150, entries: Array.isArray(p?.entries) ? p.entries : [] };
  } catch { return { target: 150, entries: [] }; }
}

export function saveTracker(state: TrackerState) {
  try {
    window.localStorage.setItem(TRACKER_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(TRACKER_EVENT));
  } catch { /* storage full or disabled: tracker still works for this visit */ }
}

export function mealForNow(): Meal {
  const h = new Date().getHours();
  return h < 11 ? "Breakfast" : h < 15 ? "Lunch" : h >= 17 && h < 22 ? "Dinner" : "Snacks";
}

export function addEntry(entry: Omit<Entry, "id">) {
  const state = loadTracker();
  if (state.entries.length === 0) trackEvent("tracker_started");
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
  saveTracker({ ...state, entries: [...state.entries, { ...entry, id }] });
  trackEvent("food_added_to_tracker", { item: entry.itemId ?? "custom", protein: entry.protein });
}
