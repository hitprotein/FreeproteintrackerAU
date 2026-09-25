import Link from "next/link";

const NAV = [
  { href: "/#finder", label: "Finder" },
  { href: "/takeaway", label: "Takeaway" },
  { href: "/tracker", label: "Tracker" },
  { href: "/compare", label: "Compare" },
];

// Server component: plain links only, no hover menus or toggles, so it works identically on touch screens.
export default function SiteHeader() {
  return (
    <header className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4">
        <Link href="/" aria-label="FreeProteinTracker.com.au home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Free Protein Tracker Australia" className="h-10 w-auto sm:h-12" />
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ivory/75">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-ivory">{n.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
