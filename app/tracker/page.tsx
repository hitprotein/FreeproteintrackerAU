import Tracker from "@/components/Tracker";
import CtaButton from "@/components/CtaButton";

export const metadata = {
  title: "Free Protein Tracker Australia",
  description: "Track your daily protein for free with Australian takeaway built in. Set a target, add meals, see what's left. No account needed.",
  alternates: { canonical: "/tracker" },
};

// Direct App Store link (HitProtein, App Store ID 6784849927). CtaButton fires app_store_clicked for apps.apple.com links.
const APP_STORE = "https://apps.apple.com/au/app/id6784849927";

export default function TrackerPage() {
  return (
    <>
      <section className="bg-ink pb-24 pt-14 text-ivory">
        <div className="mx-auto max-w-3xl px-5">
          <h1 className="text-4xl sm:text-5xl">Free protein tracker</h1>
          <p className="mt-4 max-w-xl text-ivory/70">Search Australian takeaway or quick-add any food. Your day stays in this browser.</p>
        </div>
      </section>
      <section className="mx-auto -mt-14 max-w-3xl px-5"><Tracker /></section>

      <section className="mx-auto mt-16 max-w-3xl px-5">
        <div className="rounded-3xl bg-ink p-8 text-ivory sm:p-10">
          <p className="font-display text-3xl font-bold leading-tight">Want to track your protein properly?</p>
          <p className="mt-3 max-w-xl text-ivory/70">
            This tracker resets with your browser. HitProtein keeps every day on your phone, sets your target for you,
            and can estimate protein from a photo of your meal.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm text-ivory/80">
            <li>Snap a photo, get a protein estimate</li>
            <li>History, streaks and progress over time</li>
            <li>Meal ideas based on what you have left today</li>
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <CtaButton href={APP_STORE} placement="tracker_bottom">Download on the App Store</CtaButton>
            <span className="text-sm text-ivory/50">Free to download on iPhone</span>
          </div>
        </div>
      </section>
    </>
  );
}
