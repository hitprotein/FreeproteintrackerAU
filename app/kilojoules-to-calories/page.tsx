import Link from "next/link";
import KjConverter from "@/components/KjConverter";
import { FOODS, chainName, itemById, itemHref } from "@/lib/data";
import { KJ_PER_CAL, LABEL_REFERENCE_KJ, formatEnergy, kjToCal } from "@/lib/energy";

export const metadata = {
  title: "kJ to Calories Converter (Kilojoule Calculator)",
  description: "Convert kilojoules to Calories and Calories to kilojoules instantly. Australian labels use kJ: see what common foods and takeaway meals come to in both.",
  alternates: { canonical: "/kilojoules-to-calories" },
};

const TABLE_KJ = [100, 250, 500, 1000, 1500, 2000, 3000, 5000, LABEL_REFERENCE_KJ, 10000];

// Real examples from the site's own data, so they stay in step with the published figures.
const EXAMPLE_ITEMS = ["mcd-big-mac", "gyg-burrito-grilled-chicken", "kfc-zinger-burger", "nandos-half-chicken", "subway-rotisserie-chicken"]
  .map(itemById).filter((i) => i !== undefined);
const EXAMPLE_FOODS = ["afcd-chicken-breast-baked", "afcd-egg-hard-boiled", "afcd-weet-bix"]
  .map((id) => FOODS.find((f) => f.id === id)).filter((f) => f !== undefined);

const FAQ = [
  {
    q: "How do I convert kJ to Calories?",
    a: `Divide kilojoules by ${KJ_PER_CAL}. For example, 2,000 kJ ÷ ${KJ_PER_CAL} = ${formatEnergy(kjToCal(2000))} Calories. For a quick estimate in your head, divide by 4.`,
  },
  {
    q: "How do I convert Calories to kJ?",
    a: `Multiply Calories by ${KJ_PER_CAL}. For example, 500 Calories × ${KJ_PER_CAL} = ${formatEnergy(500 * KJ_PER_CAL)} kJ. For a quick estimate, multiply by 4.`,
  },
  {
    q: "Are Calories and kilocalories the same?",
    a: "Yes. A food Calorie (capital C) is a kilocalorie (kcal). So when a label or app says 500 Calories or 500 kcal, it means the same amount of energy.",
  },
  {
    q: "Why do Australian labels use kilojoules?",
    a: "Australia uses metric units, and the kilojoule is the metric unit of energy. Nutrition information panels must show energy in kJ. Some brands also show Calories, but many don't, which is why converting is handy.",
  },
  {
    q: "How many kJ should I eat in a day?",
    a: `It depends on your age, sex, size and how active you are, so there's no single number. The ${LABEL_REFERENCE_KJ.toLocaleString("en-AU")} kJ (about ${formatEnergy(kjToCal(LABEL_REFERENCE_KJ))} Calories) you see on Australian food labels is the reference intake for an average adult, used to work out the % Daily Intake. It isn't a personal target. For an estimate for you, use the Australian Government's Eat for Health calculators or ask a dietitian.`,
  },
];

export default function KilojoulesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <section className="bg-ink py-14 text-ivory">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl sm:text-5xl">kJ to Calories converter</h1>
          <p className="mt-4 max-w-xl text-ivory/70">
            Australian labels show energy in kilojoules. Type into either box to convert. 1 Calorie = {KJ_PER_CAL} kJ.
          </p>
          <div className="mt-8"><KjConverter /></div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-2xl">Quick reference</h2>
        <table className="tabular mt-4 w-full overflow-hidden rounded-2xl border border-line bg-white text-left text-sm">
          <thead className="bg-ink/[0.03] text-ink/60">
            <tr><th className="px-4 py-2.5 font-semibold">Kilojoules</th><th className="px-4 py-2.5 font-semibold">Calories</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {TABLE_KJ.map((kj) => (
              <tr key={kj}>
                <td className="px-4 py-2.5">{kj.toLocaleString("en-AU")} kJ{kj === LABEL_REFERENCE_KJ && <span className="text-ink/50"> (label reference)</span>}</td>
                <td className="px-4 py-2.5 font-semibold">{formatEnergy(kjToCal(kj))} Cal</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-14 text-2xl">Real meals in kJ and Calories</h2>
        <p className="mt-3 text-ink/70">Figures as each chain publishes them, so they can differ from the formula by a few units because of rounding.</p>
        <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
          {EXAMPLE_ITEMS.map((i) => (
            <li key={i.id}>
              <Link href={itemHref(i)} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-ink/[0.02]">
                <span className="min-w-0"><span className="block truncate font-medium">{chainName(i.chain)} {i.name}</span>
                  <span className="text-xs text-ink/50">{i.serving} · {i.protein}g protein</span></span>
                <span className="tabular shrink-0 text-right text-sm"><strong>{i.kj.toLocaleString("en-AU")} kJ</strong><br /><span className="text-ink/55">{i.kcal} Cal</span></span>
              </Link>
            </li>
          ))}
          {EXAMPLE_FOODS.map((f) => (
            <li key={f.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="min-w-0"><span className="block truncate font-medium">{f.name}</span>
                <span className="text-xs text-ink/50">{f.serving} · {f.protein}g protein</span></span>
              <span className="tabular shrink-0 text-right text-sm"><strong>{f.kj.toLocaleString("en-AU")} kJ</strong><br /><span className="text-ink/55">{f.kcal} Cal</span></span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink/60">
          Search any meal on the <Link href="/#finder" className="underline">protein finder</Link> to see both units, or log it in the{" "}
          <Link href="/tracker" className="underline">free tracker</Link>.
        </p>

        <h2 className="mt-14 text-2xl">Questions</h2>
        <div className="mt-4 space-y-6">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-lg font-bold">{f.q}</h3>
              <p className="mt-1.5 text-ink/70">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-ink/45">General information only, not medical or dietary advice.</p>
      </article>
    </>
  );
}
