import { AFCD_SOURCE, CHAINS, COMING_SOON, FOODS, formatDate } from "@/lib/data";

export const metadata = {
  title: "About the Data",
  description: "Where FreeProteinTracker.com.au's nutrition figures come from, how protein density is calculated, and how often figures are checked.",
  alternates: { canonical: "/about-the-data" },
};

export default function AboutData() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="text-4xl">About the data</h1>
      <p className="mt-4 text-lg text-ink/70">
        Every number on this site comes from a published source, shown with the date it was current. We don&apos;t test food
        ourselves and we don&apos;t estimate missing figures.
      </p>

      <h2 className="mt-12 text-2xl">Sources</h2>
      <ul className="mt-4 space-y-4">
        {CHAINS.map((c) => (
          <li key={c.slug} className="rounded-2xl border border-line bg-white p-5">
            <p className="font-semibold">{c.name}</p>
            <p className="mt-1 text-sm text-ink/60"><a href={c.source.url} className="underline">{c.source.label}</a>, current {formatDate(c.source.checked)}.</p>
            {c.variantNote && <p className="mt-2 text-sm text-ink/60">{c.variantNote}</p>}
          </li>
        ))}
        <li className="rounded-2xl border border-line bg-white p-5">
          <p className="font-semibold">Everyday foods</p>
          <p className="mt-1 text-sm text-ink/60">
            {FOODS.length} everyday foods (chicken, eggs, milk, Weet-Bix and so on) come from the{" "}
            <a href={AFCD_SOURCE.url} className="underline">{AFCD_SOURCE.label}</a>, published by Food Standards Australia New
            Zealand (FSANZ), imported {formatDate(AFCD_SOURCE.checked)}.
          </p>
          <p className="mt-2 text-sm text-ink/60">
            FSANZ publishes figures per 100g; the serving sizes are ours, and every nutrient is scaled from FSANZ&apos;s per-100g
            figure. This adapted data is shared under the same licence as the original. Everyday foods appear in search and the
            tracker only.
          </p>
        </li>
      </ul>
      <p className="mt-4 text-sm text-ink/60">
        {COMING_SOON.length > 0 && <>Not yet covered: {COMING_SOON.join(", ")}. </>}A chain is only added once its official Australian nutrition figures can be sourced.
      </p>

      <h2 className="mt-12 text-2xl">Protein per 100 Calories</h2>
      <p className="mt-3 text-ink/70">
        Protein density is the grams of protein in a serving divided by its Calories, times 100. It shows how much protein you
        get for the energy you eat, which makes very different meals comparable.
      </p>

      <h2 className="mt-12 text-2xl">Accuracy</h2>
      <p className="mt-3 text-ink/70">
        Published figures are averages for a standard recipe and serve. Customisation, preparation and serve size change the
        real numbers. Where a source looks internally inconsistent, we show it as published and flag it on the item page.
        Figures are reviewed at least every three months and whenever a chain publishes a new guide.
      </p>

      <h2 className="mt-12 text-2xl">Independence</h2>
      <p className="mt-3 text-ink/70">
        FreeProteinTracker.com.au is a HitProtein project. It isn&apos;t affiliated with, endorsed by or paid by any restaurant or brand shown.
        General information only, not medical or dietary advice.
      </p>
    </article>
  );
}
