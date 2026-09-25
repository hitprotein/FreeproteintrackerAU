export const metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 text-ink/75">
      <h1 className="text-4xl text-ink">Privacy</h1>
      <p className="mt-6">The tracker stores your entries and target only in your browser (local storage). They are never sent to us, and clearing your browser data removes them.</p>
      <p className="mt-4">With your consent, we use Google Analytics to understand which pages are useful. If you decline, analytics never loads. You can change your choice by clearing this site&apos;s data in your browser.</p>
      <p className="mt-4">There are no accounts, and we don&apos;t collect names, emails or other personal details on this site.</p>
    </article>
  );
}
