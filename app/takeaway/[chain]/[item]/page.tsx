import { notFound } from "next/navigation";
import Link from "next/link";
import AddToTracker from "@/components/AddToTracker";
import CtaButton from "@/components/CtaButton";
import DensityBar from "@/components/DensityBar";
import TrackView from "@/components/TrackView";
import { ALL_ITEMS, chainBySlug, density, formatDate, itemById, itemHref, itemsForChain } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () =>
  ALL_ITEMS.filter((i) => i.featured).map((i) => ({ chain: i.chain, item: i.id }));

export function generateMetadata({ params }: { params: { chain: string; item: string } }) {
  const i = itemById(params.item);
  const c = chainBySlug(params.chain);
  if (!i || !c) return {};
  return {
    title: `${c.name} ${i.name} Protein: ${i.protein}g`,
    description: `The ${c.name} ${i.name} has ${i.protein}g protein, ${i.kcal} Cal (${i.kj} kJ) per ${i.serving}, from ${c.name}'s published Australian figures.`,
    alternates: { canonical: `/takeaway/${c.slug}/${i.id}` },
  };
}

export default function ItemPage({ params }: { params: { chain: string; item: string } }) {
  const item = itemById(params.item);
  const chain = chainBySlug(params.chain);
  if (!item || !chain || item.chain !== chain.slug || !item.featured) notFound();

  const per100 = Math.round((item.protein / item.grams) * 1000) / 10;
  const alternatives = itemsForChain(chain.slug)
    .filter((i) => i.id !== item.id && i.category !== "Sides" && i.category !== "Extras")
    .sort((a, b) => Math.abs(a.kcal - item.kcal) - Math.abs(b.kcal - item.kcal))
    .slice(0, 5)
    .sort((a, b) => b.protein - a.protein);

  return (
    <>
      <TrackView event="food_viewed" params={{ item: item.id }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Takeaway", item: "https://freeproteintracker.com.au/takeaway" },
          { "@type": "ListItem", position: 2, name: chain.name, item: `https://freeproteintracker.com.au/takeaway/${chain.slug}` },
          { "@type": "ListItem", position: 3, name: item.name, item: `https://freeproteintracker.com.au/takeaway/${chain.slug}/${item.id}` },
        ] }) }} />

      <section className="bg-ink pb-14 pt-10 text-ivory">
        <div className="mx-auto max-w-3xl px-5">
          <nav className="text-sm text-ivory/55">
            <Link href="/takeaway" className="hover:text-ivory">Takeaway</Link> /{" "}
            <Link href={`/takeaway/${chain.slug}`} className="hover:text-ivory">{chain.name}</Link>
          </nav>
          <h1 className="mt-3 text-3xl sm:text-5xl">{chain.name} {item.name}</h1>
          <p className="tabular mt-8 font-display text-7xl font-extrabold leading-none text-euc sm:text-8xl">{item.protein}g</p>
          <p className="mt-2 text-ivory/70">protein per {item.serving} ({item.grams}g)</p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-ivory/[0.06] p-4"><p className="text-ivory/50">Calories</p><p className="tabular mt-1 font-display text-2xl font-bold">{item.kcal}</p></div>
            <div className="rounded-2xl bg-ivory/[0.06] p-4"><p className="text-ivory/50">Kilojoules</p><p className="tabular mt-1 font-display text-2xl font-bold">{item.kj}</p></div>
            <div className="rounded-2xl bg-ivory/[0.06] p-4"><p className="text-ivory/50">Per 100g</p><p className="tabular mt-1 font-display text-2xl font-bold">{per100}g</p></div>
          </div>
          <div className="mt-5 text-ivory"><DensityBar value={density(item)} tone="dark" /></div>
          <div className="mt-8 flex flex-wrap gap-3">
            <AddToTracker itemId={item.id} name={`${chain.name} ${item.name}`} protein={item.protein} kcal={item.kcal} size="lg" tone="dark" />
            <Link href={`/compare?items=${item.id}`} className="rounded-full border border-ivory/25 px-5 py-3 text-sm font-semibold hover:border-euc">Compare with…</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        {item.note && <p className="rounded-2xl bg-sand/30 p-4 text-sm">{item.note}</p>}
        {chain.variantNote && <p className="mt-4 text-sm text-ink/60">{chain.variantNote}</p>}

        <h2 className="mt-10 text-2xl">Similar-calorie options at {chain.name}</h2>
        <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
          {alternatives.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <Link href={itemHref(a)} className="min-w-0 truncate hover:underline">{a.name}</Link>
              <span className="tabular shrink-0 text-sm text-ink/55">{a.kcal} Cal · <strong className="text-ink">{a.protein}g</strong></span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-ink/60">
          Source: <a href={item.sourceUrl ?? chain.source.url} className="underline">{chain.source.label}</a>, current {formatDate(chain.source.checked)}.
          Published figures are averages for the standard recipe; your meal may differ.
        </p>

        <div className="mt-10 rounded-3xl bg-ink p-8 text-ivory">
          <p className="font-display text-2xl font-bold">Eating this today?</p>
          <p className="mt-2 max-w-xl text-ivory/70">HitProtein can log it from a photo and show what&apos;s left of your daily protein target.</p>
          <div className="mt-5"><CtaButton href="https://hitprotein.com.au" placement="item_page">Try HitProtein</CtaButton></div>
        </div>
      </section>
    </>
  );
}
