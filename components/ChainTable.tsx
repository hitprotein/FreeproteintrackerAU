"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { density, type MenuItem } from "@/lib/data";
import DensityBar from "./DensityBar";
import AddToTracker from "./AddToTracker";

type SortKey = "protein" | "density" | "kcal";

export default function ChainTable({ items, chainLabel }: { items: MenuItem[]; chainLabel: string }) {
  const [sort, setSort] = useState<SortKey>("protein");
  const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const rows = useMemo(() => {
    const list = cat === "All" ? items : items.filter((i) => i.category === cat);
    const key = (i: MenuItem) => (sort === "density" ? density(i) : sort === "kcal" ? -i.kcal : i.protein);
    return [...list].sort((a, b) => key(b) - key(a));
  }, [items, cat, sort]);

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-ink text-ivory" : "bg-ink/5 text-ink/70 hover:bg-ink/10"}`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {cats.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-ink/60">
        Sort by
        {(["protein", "density", "kcal"] as SortKey[]).map((k) => (
          <button key={k} type="button" onClick={() => setSort(k)} className={chip(sort === k)}>
            {k === "protein" ? "Most protein" : k === "density" ? "Protein per Cal" : "Fewest Cal"}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
        {rows.map((i) => (
          <li key={i.id} id={i.id} className="flex scroll-mt-24 items-center gap-4 px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1">
              {i.featured
                ? <Link href={`/takeaway/${i.chain}/${i.id}`} className="font-medium underline-offset-2 hover:underline">{i.name}</Link>
                : <p className="font-medium">{i.name}</p>}
              <p className="mt-0.5 text-xs text-ink/55">{i.serving} · {i.grams}g · {i.kcal} Cal · {i.kj} kJ</p>
              <div className="mt-2"><DensityBar value={density(i)} /></div>
            </div>
            <p className="tabular font-display text-2xl font-bold">{i.protein}g</p>
            <AddToTracker itemId={i.id} name={`${chainLabel} ${i.name}`} protein={i.protein} kcal={i.kcal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
