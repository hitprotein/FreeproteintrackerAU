import Link from "next/link";

// Our other sites, the same list (minus this one) on every site.
const OTHER_SITES = [
  { name: "HitProtein", description: "The protein tracking app", href: "https://www.hitprotein.com.au" },
  { name: "ProteinTracker", description: "Protein in Australian foods", href: "https://proteintracker.com.au" },
  { name: "Free Protein Tracker", description: "Free online protein tracker and calculator", href: "https://freeproteintracker.com" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink py-14 text-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">FreeProteinTracker.com.au</p>
          <p className="mt-1 text-sm text-ivory/60">Australian protein tracking and food tools.</p>
          <p className="mt-4 text-sm text-ivory/60">A <a href="https://hitprotein.com.au" className="text-euc hover:underline">HitProtein</a> project.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-ivory/70">
            <li><Link href="/takeaway" className="hover:text-ivory">Takeaway protein</Link></li>
            <li><Link href="/tracker" className="hover:text-ivory">Free tracker</Link></li>
            <li><Link href="/compare" className="hover:text-ivory">Compare</Link></li>
            <li><Link href="/kilojoules-to-calories" className="hover:text-ivory">kJ to Calories converter</Link></li>
            <li><Link href="/about-the-data" className="hover:text-ivory">About the data</Link></li>
            <li><Link href="/privacy" className="hover:text-ivory">Privacy</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Our other sites</p>
          <ul className="mt-3 space-y-3 text-ivory/70">
            {OTHER_SITES.map((site) => (
              <li key={site.href}>
                <a href={site.href} className="text-ivory/85 hover:text-ivory">{site.name}</a>
                <span className="block text-ivory/55">{site.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs leading-relaxed text-ivory/45">
        Not affiliated with or endorsed by any restaurant or brand shown. Nutrition figures are as published by each
        company on the date shown, and actual meals vary. General information only, not medical or dietary advice.
      </p>
    </footer>
  );
}
