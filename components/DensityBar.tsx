// Protein density = grams of protein per 100 Calories. 20 fills the bar (very lean grilled chicken sits near there).
export default function DensityBar({ value, tone = "light" }: { value: number; tone?: "light" | "dark" }) {
  const pct = Math.min(100, (value / 20) * 100);
  const track = tone === "dark" ? "bg-ivory/10" : "bg-ink/10";
  const fill = tone === "dark" ? "bg-euc" : "bg-euc-deep";
  return (
    <div className="flex items-center gap-2" title={`${value}g protein per 100 Cal`}>
      <div className={`h-1.5 w-16 overflow-hidden rounded-full ${track}`}>
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="tabular text-xs opacity-70">{value}g/100 Cal</span>
    </div>
  );
}
