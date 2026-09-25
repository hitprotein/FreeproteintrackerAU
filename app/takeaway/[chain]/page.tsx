import { notFound } from "next/navigation";
import Link from "next/link";
import ChainTable from "@/components/ChainTable";
import CtaButton from "@/components/CtaButton";
import TrackView from "@/components/TrackView";
import { CHAINS, bestOrders, chainBySlug, density, formatDate, itemHref, itemsForChain } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => CHAINS.map((c) => ({ chain: c.slug }));

export function generateMetadata({ params }: { params: { chain: string } }) {
  const c = chainBySlug(params.chain);
  if (!c) return {};
  return {
    title: `${c.name} Protein: Every Menu Item Ranked (Australia)`,
    description: `Protein, calories and kilojoules for the ${c.name} Australia menu, sortable by protein and protein per calorie. From ${c.name}'s published figures.`,
    alternates: { canonical: `/takeaway/${c.slug}` },
  };
}

export default function ChainPage({ params }: { params: { chain: string } }) {
  const chain = chainBySlug(params.chain);
  if (!chain) notFound();
  const items = itemsForChain(chain.slug);
  const { mostProtein, mostDense } = bestOrders(items);

  const Pick = ({ title, list, metric }: { title: string; list: typeof items; metric: "protein" | "density" }) => (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-line">
      <p className="text-sm font-semibold text-ink/55">{title}</p>
      <ol className="mt-3 space-y-3">
        {list.map((i) => (
          <li key={i.id} className="flex items-baseline justify-between gap-3">
            <Link href={itemHref(i)} className="min-w-0 truncate hover:underline">{i.name}</Link>
            <span className="tabular shrink-0 font-display text-xl font-bold">
              {metric === "protein" ? `${i.protein}g` : `${density(i)}g`}
              {metric === "density" && <span className="text-xs font-normal text-ink/50"> /100 Cal</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <TrackView event="restaurant_viewed" params={{ chain: chain.slug }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Takeaway", item: "https://freeproteintracker.com.au/takeaway" },
          { "@type": "ListItem", position: 2, name: chain.name, item: `https://freeproteintracker.com.au/takeaway/${chain.slug}` },
        ] }) }} />
      <section className="bg-ink py-14 text-ivory">
        <div className="mx-auto max-w-6xl px-5">
          <Link href="/takeaway" className="text-sm text-ivory/60 hover:text-ivory">Takeaway</Link>
          <h1 className="mt-2 text-4xl sm:text-5xl">{chain.name} protein</h1>
          <p className="mt-4 max-w-2xl text-ivory/70">{chain.blurb}</p>
          <p className="mt-4 text-xs text-ivory/50">
            Source: <a href={chain.source.url} className="underline">{chain.source.label}</a>, current {formatDate(chain.source.checked)}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-2xl">Best high-protein orders</h2>
        <p className="mt-1 text-sm text-ink/55">Calculated from the published figures, excluding sides and extras.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Pick title="Most protein" list={mostProtein} metric="protein" />
          <Pick title="Most protein per calorie (20g+)" list={mostDense} metric="density" />
        </div>
        {chain.variantNote && <p className="mt-4 text-sm text-ink/55">{chain.variantNote}</p>}

        <h2 className="mt-14 text-2xl">Full menu</h2>
        <div className="mt-5"><ChainTable items={items} chainLabel={chain.name} /></div>

        <div className="mt-14 rounded-3xl bg-ink p-8 text-ivory">
          <p className="font-display text-2xl font-bold">Want to track this meal automatically?</p>
          <p className="mt-2 max-w-xl text-ivory/70">Snap a photo with HitProtein and get an AI protein estimate, logged against your daily target.</p>
          <div className="mt-5"><CtaButton href="https://hitprotein.com.au" placement={`chain_${chain.slug}`}>Try HitProtein</CtaButton></div>
        </div>
        <p className="mt-6 text-xs text-ink/45">Not affiliated with or endorsed by {chain.name}. Figures vary with customisation and preparation.</p>
      </section>
    </>
  );
}
