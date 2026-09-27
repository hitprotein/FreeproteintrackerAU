"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, RotateCcw, X } from "lucide-react";
import { searchWithFoods } from "@/lib/search";
import { sourceName, trackerName } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { MEALS, TRACKER_EVENT, addEntry, loadTracker, mealForNow, saveTracker, type Meal, type TrackerState } from "@/lib/tracker-storage";
import CtaButton from "./CtaButton";

export default function Tracker() {
  const [state, setState] = useState<TrackerState>({ target: 150, entries: [] });
  const [ready, setReady] = useState(false);
  const [q, setQ] = useState("");
  const [quick, setQuick] = useState("");
  const [quickLabel, setQuickLabel] = useState("");
  const [meal, setMeal] = useState<Meal>("Lunch");

  useEffect(() => {
    const sync = () => setState(loadTracker());
    sync(); setMeal(mealForNow()); setReady(true);
    window.addEventListener(TRACKER_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(TRACKER_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);

  const total = Math.round(state.entries.reduce((s, e) => s + e.protein, 0) * 10) / 10;
  const remaining = Math.max(0, Math.round((state.target - total) * 10) / 10);
  const pct = state.target > 0 ? Math.min(100, (total / state.target) * 100) : 0;
  const results = useMemo(() => searchWithFoods(q, 6), [q]);

  const update = (next: TrackerState) => { setState(next); saveTracker(next); };

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-ink/55">Today&apos;s protein</p>
          <p className="tabular font-display text-5xl font-bold leading-none sm:text-6xl">
            {ready ? total : 0}g<span className="text-2xl text-ink/35"> / {state.target}g</span>
          </p>
        </div>
        <label className="text-right text-xs text-ink/55">
          Daily target (g)
          <input
            type="number" min={20} max={400} value={state.target}
            onChange={(e) => update({ ...state, target: Math.max(0, parseInt(e.target.value || "0", 10)) })}
            onBlur={() => trackEvent("protein_goal_completed", { target: state.target, source: "manual" })}
            className="tabular mt-1 block w-24 rounded-lg border border-line px-3 py-2 text-right text-base font-semibold text-ink"
          />
        </label>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-ink/5">
        <div className="h-full rounded-full bg-euc-deep transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-sm text-ink/60">
        <span>{remaining > 0 ? `${remaining}g to go` : "Target hit"}</span>
        <a href="https://freeproteintracker.com/protein-calculator" className="underline underline-offset-2 hover:text-ink">
          Not sure of your target? Calculate it
        </a>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {MEALS.map((m) => (
            <button key={m} type="button" onClick={() => setMeal(m)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${meal === m ? "bg-ink text-ivory" : "bg-ink/5 text-ink/70"}`}>
              {m}
            </button>
          ))}
        </div>
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search takeaway or foods to add (e.g. GYG bowl, eggs)"
          className="mt-3 w-full rounded-xl border border-line px-4 py-3"
        />
        {q && (
          <ul className="mt-2 divide-y divide-line rounded-xl border border-line">
            {results.length === 0 && <li className="px-4 py-3 text-sm text-ink/55">No match. Use quick add below.</li>}
            {results.map((r) => (
              <li key={r.id}>
                <button type="button"
                  onClick={() => { addEntry({ name: trackerName(r), protein: r.protein, kcal: r.kcal, meal, itemId: r.id }); setQ(""); }}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-ink/[0.03]">
                  <span className="min-w-0"><span className="block truncate text-sm font-medium">{r.name}</span>
                    <span className="text-xs text-ink/50">{sourceName(r)} · {r.serving}</span></span>
                  <span className="tabular shrink-0 font-display text-lg font-bold">{r.protein}g <Plus className="inline h-4 w-4" /></span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <input type="number" min={0} value={quick} onChange={(e) => setQuick(e.target.value)} placeholder="Protein g"
            className="tabular w-28 rounded-xl border border-line px-3 py-2.5" />
          <input value={quickLabel} onChange={(e) => setQuickLabel(e.target.value)} placeholder="Label (optional)"
            className="min-w-0 flex-1 rounded-xl border border-line px-3 py-2.5" />
          <button type="button"
            onClick={() => { const p = parseFloat(quick); if (p > 0) { addEntry({ name: quickLabel.trim() || "Quick add", protein: p, meal }); setQuick(""); setQuickLabel(""); } }}
            className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-ivory hover:bg-forest">
            Quick add
          </button>
        </div>
      </div>

      {state.entries.length > 0 && (
        <div className="mt-8 space-y-5">
          {MEALS.filter((m) => state.entries.some((e) => e.meal === m)).map((m) => (
            <div key={m}>
              <p className="text-xs font-semibold text-ink/50">{m}</p>
              <ul className="mt-1">
                {state.entries.filter((e) => e.meal === m).map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 border-b border-line py-2 text-sm last:border-0">
                    <span className="min-w-0 truncate">{e.name}</span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="tabular font-semibold">{e.protein}g</span>
                      <button type="button" aria-label={`Remove ${e.name}`} onClick={() => update({ ...state, entries: state.entries.filter((x) => x.id !== e.id) })}
                        className="text-ink/30 hover:text-ink"><X className="h-4 w-4" /></button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button type="button"
            onClick={() => { if (window.confirm("Clear today's entries?")) update({ ...state, entries: [] }); }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 hover:text-ink">
            <RotateCcw className="h-3.5 w-3.5" /> Reset day
          </button>
        </div>
      )}

      {ready && total >= state.target && state.target > 0 && (
        <div className="mt-8 rounded-2xl bg-ink p-6 text-ivory">
          <p className="font-display text-xl font-bold">Target hit. Nice work.</p>
          <p className="mt-1 text-sm text-ivory/70">
            HitProtein does this on your phone, and can estimate protein from a photo of your meal.
          </p>
          <div className="mt-4"><CtaButton href="https://hitprotein.com.au" placement="tracker_target_hit">Try HitProtein</CtaButton></div>
        </div>
      )}
      <p className="mt-6 text-xs text-ink/45">Stored only in this browser. No account, nothing sent to us.</p>
    </div>
  );
}
