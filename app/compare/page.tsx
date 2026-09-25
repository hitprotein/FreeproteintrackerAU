import { Suspense } from "react";
import CompareTool from "@/components/CompareTool";

export const metadata = {
  title: "Compare Protein in Australian Takeaway",
  description: "Compare protein, calories and kilojoules for up to three Australian takeaway items side by side, and share the comparison.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <>
      <section className="bg-ink py-14 text-ivory">
        <div className="mx-auto max-w-5xl px-5">
          <h1 className="text-4xl sm:text-5xl">Compare protein</h1>
          <p className="mt-4 max-w-xl text-ivory/70">Pick up to three items. The winner on protein and protein per calorie is highlighted.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-10">
        <Suspense fallback={<p className="text-ink/50">Loading…</p>}><CompareTool /></Suspense>
      </section>
    </>
  );
}
