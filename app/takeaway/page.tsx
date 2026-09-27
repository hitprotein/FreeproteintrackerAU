import Link from "next/link";
import { CHAINS, COMING_SOON, bestOrders, formatDate, itemsForChain } from "@/lib/data";

export const metadata = {
  title: "Australian Takeaway Protein: GYG, Nando's and more",
  description: "Protein, calories and kilojoules for Australian takeaway chains, from each chain's published nutrition information.",
  alternates: { canonical: "/takeaway" },
};

export default function TakeawayHub() {
  return (
    <>
      <section className="bg-ink py-16 text-ivory">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="text-4xl sm:text-5xl">Australian takeaway protein</h1>
          <p className="mt-4 max-w-2xl text-ivory/70">
            Every figure comes from the chain&apos;s own published nutrition information, with the date it was current.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHAINS.map((c) => {
            const { mostProtein } = bestOrders(itemsForChain(c.slug));
            return (
              <Link key={c.slug} href={`/takeaway/${c.slug}`} className="rounded-3xl border border-line bg-white p-7 transition hover:border-euc-deep">
                <h2 className="text-2xl">{c.name}</h2>
                <p className="mt-2 text-sm text-ink/60">{c.blurb}</p>
                <p className="mt-6 text-xs font-semibold text-ink/50">Highest protein</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {mostProtein.map((i) => (
                    <li key={i.id} className="flex justify-between gap-3"><span className="truncate">{i.name}</span><span className="tabular font-semibold">{i.protein}g</span></li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-ink/45">Figures current {formatDate(c.source.checked)}</p>
              </Link>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-ink/55">
          Coming next: {COMING_SOON.join(", ")}. We only add a chain once we can source its official Australian figures.
        </p>
      </section>
    </>
  );
}
