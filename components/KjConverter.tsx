"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calToKj, formatEnergy, kjToCal } from "@/lib/energy";

type Field = "kj" | "cal";
const EXAMPLES = [500, 1000, 2000, 8700];

const parse = (s: string) => {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
};

/** Two linked boxes: type in either and the other updates. */
export default function KjConverter() {
  const [kj, setKj] = useState("2000");
  const [cal, setCal] = useState(formatEnergy(kjToCal(2000)));
  const [last, setLast] = useState<Field>("kj");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const fromKj = (s: string) => { setKj(s); setLast("kj"); const n = parse(s); setCal(n === null ? "" : formatEnergy(kjToCal(n))); };
  const fromCal = (s: string) => { setCal(s); setLast("cal"); const n = parse(s); setKj(n === null ? "" : formatEnergy(calToKj(n))); };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => trackEvent("kj_converter_used", { from: last }), 1500);
    return () => clearTimeout(timer.current);
  }, [kj, cal, last]);

  const box = "tabular w-full rounded-2xl border border-ivory/15 bg-ivory/[0.06] py-4 pl-5 pr-16 font-display text-3xl font-bold text-ivory focus:border-euc focus:outline-none";
  return (
    <div>
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <label className="relative block">
          <span className="mb-1.5 block text-sm text-ivory/60">Kilojoules</span>
          <input inputMode="decimal" value={kj} onChange={(e) => fromKj(e.target.value)} aria-label="Kilojoules" className={box} />
          <span className="pointer-events-none absolute bottom-5 right-5 text-sm font-semibold text-ivory/50">kJ</span>
        </label>
        <ArrowLeftRight aria-hidden className="mx-auto mt-6 hidden h-5 w-5 text-ivory/40 sm:block" />
        <label className="relative block">
          <span className="mb-1.5 block text-sm text-ivory/60">Calories</span>
          <input inputMode="decimal" value={cal} onChange={(e) => fromCal(e.target.value)} aria-label="Calories" className={box} />
          <span className="pointer-events-none absolute bottom-5 right-5 text-sm font-semibold text-ivory/50">Cal</span>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((n) => (
          <button key={n} type="button" onClick={() => fromKj(String(n))}
            className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/70 hover:border-euc hover:text-ivory">
            {n.toLocaleString("en-AU")} kJ
          </button>
        ))}
      </div>
    </div>
  );
}
