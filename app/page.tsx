import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import DensityBar from "@/components/DensityBar";
import CtaButton from "@/components/CtaButton";
import { ALL_ITEMS, CHAINS, COMING_SOON, chainName, density, itemHref, itemsForChain } from "@/lib/data";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const leanest = [...ALL_ITEMS].filter((i) => i.protein >= 20 && i.category !== "Extras")
    .sort((a, b) => density(b) - density(a)).slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-14 text-ivory sm:pt-20">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border-[10px] border-euc-deep/30" />
        <div aria-hidden className="pointer-events-none absolute -right-8 top-24 h-[260px] w-[260px] rounded-full border-[8px] border-euc/15" />
        <div className="relative mx-auto max-w-3xl px-5">
          <h1 className="text-4xl leading-[1.05] sm:text-6xl">
            How much protein is in the food you <span className="text-euc">actually eat?</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ivory/70">
            Protein, calories and kilojoules for Australian takeaway, straight from each chain&apos;s published figures.
            Add anything to a free daily tracker.
          </p>
          <div className="mt-8"><SearchBox /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl">Takeaway protein</h2>
          <Link href="/takeaway" className="text-sm font-semibold text-euc-deep hover:underline">All chains</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CHAINS.map((c) => {
            const items = itemsForChain(c.slug);
            const top = [...items].sort((a, b) => b.protein - a.protein)[0];
            return (
              <Link key={c.slug} href={`/takeaway/${c.slug}`} className="group rounded-3xl border border-line bg-white p-6 transition hover:border-euc-deep">
                <p className="font-display text-2xl font-bold">{c.name}</p>
                <p className="mt-1 text-sm text-ink/55">{items.length} items</p>
                <p className="mt-6 text-xs text-ink/50">Most protein</p>
                <p className="font-medium">{top.name} <span className="tabular font-display text-xl font-bold text-euc-deep">{top.protein}g</span></p>
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-ink/50">Coming next: {COMING_SOON.join(", ")}.</p>
      </section>

      <section className="border-y border-line bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl">Most protein per calorie</h2>
          <p className="mt-2 max-w-2xl text-ink/60">
            Grams of protein for every 100 Calories, across every meal we cover with at least 20g of protein.
            It&apos;s the quickest way to spot a filling, lean order.
          </p>
          <ol className="mt-8 divide-y divide-line">
            {leanest.map((i, n) => (
              <li key={i.id} className="flex items-center gap-4 py-3">
                <span className="tabular w-6 text-sm text-ink/40">{n + 1}</span>
                <Link href={itemHref(i)} className="min-w-0 flex-1 hover:underline">
                  <span className="block truncate font-medium">{i.name}</span>
                  <span className="text-xs text-ink/50">{chainName(i.chain)} · {i.kcal} Cal</span>
                </Link>
                <div className="hidden sm:block"><DensityBar value={density(i)} /></div>
                <span className="tabular w-16 text-right font-display text-xl font-bold">{i.protein}g</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-16 sm:grid-cols-2">
        <Link href="/tracker" className="rounded-3xl bg-forest p-8 text-ivory transition hover:bg-[#1c4a3f]">
          <p className="font-display text-2xl font-bold">Free protein tracker</p>
          <p className="mt-2 text-ivory/70">Set a target, add meals from the finder, see what&apos;s left. Nothing to sign up for.</p>
        </Link>
        <Link href="/compare" className="rounded-3xl border border-line bg-white p-8 transition hover:border-euc-deep">
          <p className="font-display text-2xl font-bold">Compare meals</p>
          <p className="mt-2 text-ink/60">Put up to three items side by side, then share the comparison with a link.</p>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl bg-ink p-8 text-ivory sm:p-12">
          <p className="font-display text-3xl font-bold">Want tracking to take seconds?</p>
          <p className="mt-3 max-w-xl text-ivory/70">
            HitProtein is the app version: it sets your target, logs meals, and can estimate protein from a photo of your plate.
          </p>
          <div className="mt-6"><CtaButton href="https://hitprotein.com.au" placement="home_bottom">Download HitProtein</CtaButton></div>
        </div>
      </section>
    </>
  );
}
