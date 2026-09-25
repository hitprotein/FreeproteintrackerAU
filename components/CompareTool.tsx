"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Link2, X } from "lucide-react";
import { searchItems } from "@/lib/search";
import { chainName, density, itemById, type MenuItem } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import AddToTracker from "./AddToTracker";

export default function CompareTool() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const ids = (params.get("items") ?? "").split(",").filter(Boolean).slice(0, 3);
  const items = ids.map(itemById).filter(Boolean) as MenuItem[];
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState(false);
  const results = useMemo(() => searchItems(q, 6).filter((r) => !ids.includes(r.id)), [q, ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (items.length >= 2) trackEvent("comparison_started", { items: ids.join(",") }); }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

  const setIds = (next: string[]) => router.replace(next.length ? `${pathname}?items=${next.join(",")}` : pathname, { scroll: false });
  const best = (f: (i: MenuItem) => number, i: MenuItem) => items.length > 1 && f(i) === Math.max(...items.map(f));

  return (
    <div>
      {items.length < 3 && (
        <div className="relative">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={items.length ? "Add another item to compare" : "Search an item to compare"}
            className="w-full rounded-xl border border-line bg-white px-4 py-3" />
          {q && (
            <ul className="absolute z-10 mt-1 w-full divide-y divide-line rounded-xl border border-line bg-white shadow-lg">
              {results.length === 0 && <li className="px-4 py-3 text-sm text-ink/55">No match.</li>}
              {results.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => { setIds([...ids, r.id]); setQ(""); }}
                    className="flex w-full justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-ink/[0.03]">
                    <span className="truncate">{chainName(r.chain)} · {r.name}</span>
                    <span className="tabular shrink-0 font-semibold">{r.protein}g</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {items.map((i) => (
            <div key={i.id} className="relative rounded-2xl border border-line bg-white p-5">
              <button type="button" aria-label="Remove" onClick={() => setIds(ids.filter((x) => x !== i.id))}
                className="absolute right-3 top-3 text-ink/30 hover:text-ink"><X className="h-4 w-4" /></button>
              <p className="pr-6 text-xs text-ink/50">{chainName(i.chain)}</p>
              <p className="pr-6 font-medium">{i.name}</p>
              <p className={`tabular mt-4 font-display text-4xl font-bold ${best((x) => x.protein, i) ? "text-euc-deep" : ""}`}>{i.protein}g</p>
              <p className="text-xs text-ink/50">protein · {i.serving}</p>
              <dl className="tabular mt-4 space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-ink/55">Calories</dt><dd>{i.kcal} Cal</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Kilojoules</dt><dd>{i.kj} kJ</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Protein per 100 Cal</dt>
                  <dd className={best(density, i) ? "font-semibold text-euc-deep" : ""}>{density(i)}g</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Serving</dt><dd>{i.grams}g</dd></div>
              </dl>
              <div className="mt-4"><AddToTracker itemId={i.id} name={`${chainName(i.chain)} ${i.name}`} protein={i.protein} kcal={i.kcal} /></div>
            </div>
          ))}
        </div>
      )}

      {items.length >= 2 && (
        <button type="button"
          onClick={async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ } }}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-euc-deep hover:underline">
          <Link2 className="h-4 w-4" /> {copied ? "Link copied" : "Copy link to this comparison"}
        </button>
      )}
    </div>
  );
}
