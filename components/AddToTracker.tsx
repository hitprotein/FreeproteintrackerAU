"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { addEntry, mealForNow } from "@/lib/tracker-storage";

export default function AddToTracker({ itemId, name, protein, kcal, size = "sm", tone = "light" }: {
  itemId: string; name: string; protein: number; kcal: number; size?: "sm" | "lg"; tone?: "light" | "dark";
}) {
  const [added, setAdded] = useState(false);
  const base = size === "lg" ? "px-5 py-3 text-sm" : "px-3 py-1.5 text-xs";
  const colour = tone === "dark"
    ? (added ? "bg-euc/20 text-euc" : "bg-ivory/10 text-ivory hover:bg-ivory/20")
    : (added ? "bg-euc-deep/10 text-euc-deep" : "bg-ink text-ivory hover:bg-forest");
  return (
    <button
      type="button"
      aria-label={`Add ${name} to today's tracker`}
      onClick={() => {
        addEntry({ name, protein, kcal, meal: mealForNow(), itemId });
        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
      }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition ${base} ${colour}`}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {added ? "Added" : size === "lg" ? "Add to today's tracker" : "Add"}
    </button>
  );
}
