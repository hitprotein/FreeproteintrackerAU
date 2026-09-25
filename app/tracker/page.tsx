import Tracker from "@/components/Tracker";

export const metadata = {
  title: "Free Protein Tracker Australia",
  description: "Track your daily protein for free with Australian takeaway built in. Set a target, add meals, see what's left. No account needed.",
  alternates: { canonical: "/tracker" },
};

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
    </>
  );
}
