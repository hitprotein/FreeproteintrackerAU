"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchWithFoods } from "@/lib/search";
import { CHAINS, density, isFood, itemHref, nutrientLine, sourceName, trackerName } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import AddToTracker from "./AddToTracker";

const EXAMPLES = ["Big Mac", "GYG chicken burrito", "Nando's half chicken", "McMuffin", "chicken breast", "Weet-Bix"];

export default function SearchBox() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchWithFoods(q, 8), [q]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (q.trim().length < 3) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => trackEvent("protein_search", { query: q.trim().toLowerCase(), results: results.length }), 900);
    return () => clearTimeout(timer.current);
  }, [q, results.length]);

  const max = Math.max(60, ...results.map((r) => r.protein));

  return (
    <div id="finder" className="w-full">
      <label className="relative block">
        <span className="sr-only">Search Australian takeaway and foods</span>
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ivory/50" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Try "Big Mac" or "chicken breast"`}
          autoComplete="off"
          className="w-full rounded-2xl border border-ivory/15 bg-ivory/[0.06] py-4 pl-14 pr-4 text-lg text-ivory placeholder:text-ivory/40 focus:border-euc focus:outline-none"
        />
      </label>

      {!q && (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => setQ(ex)}
              className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/70 hover:border-euc hover:text-ivory">
              {ex}
            </button>
          ))}
        </div>
      )}

      {q && (
        <ul className="mt-3 divide-y divide-ivory/10 overflow-hidden rounded-2xl border border-ivory/10 bg-ink/60 text-left">
          {results.length === 0 && (
            <li className="px-5 py-4 text-sm text-ivory/60">
              No match yet. We currently cover {CHAINS.map((c) => c.name).join(", ")} and everyday foods, with more chains on the way.
            </li>
          )}
          {results.map((r) => {
            const summary = (
              <>
                <p className="truncate font-medium text-ivory">{r.name}</p>
                <p className="text-xs text-ivory/50">{sourceName(r)} · {r.serving} · {r.kcal} Cal</p>
                {nutrientLine(r) && <p className="text-[11px] text-ivory/40">{nutrientLine(r)}</p>}
                <div className="mt-1.5 h-1 w-full max-w-[220px] overflow-hidden rounded-full bg-ivory/10">
                  <div className="h-full rounded-full bg-euc" style={{ width: `${(r.protein / max) * 100}%` }} />
                </div>
              </>
            );
            return (
              <li key={r.id} className="flex items-center gap-4 px-5 py-3">
                {/* Everyday foods have no page of their own (those live on proteintracker.com.au). */}
                {isFood(r)
                  ? <div className="min-w-0 flex-1">{summary}</div>
                  : <Link href={itemHref(r)} className="min-w-0 flex-1">{summary}</Link>}
                <div className="text-right">
                  <p className="tabular font-display text-2xl font-bold text-ivory">{r.protein}g</p>
                  <p className="tabular text-[11px] text-ivory/50">{density(r)}g/100 Cal</p>
                </div>
                <AddToTracker itemId={r.id} name={trackerName(r)} protein={r.protein} kcal={r.kcal} tone="dark" />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
