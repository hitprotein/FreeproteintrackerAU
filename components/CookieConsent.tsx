"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const KEY = "fpau_cookie_consent";
type Consent = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => { setConsent(localStorage.getItem(KEY) as Consent); setReady(true); }, []);
  const decide = (c: "accepted" | "declined") => { localStorage.setItem(KEY, c); setConsent(c); };

  return (
    <>
      {gaId && consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {ready && consent === null && (
        <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-ivory/10 bg-ink p-5 text-ivory shadow-2xl sm:flex sm:items-center sm:gap-6">
          <p className="text-sm text-ivory/75">
            We use Google Analytics cookies to see which pages help people. Accept to allow them, or decline to browse without analytics.
          </p>
          <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
            <button type="button" onClick={() => decide("declined")} className="rounded-full border border-ivory/25 px-4 py-2 text-sm font-semibold">Decline</button>
            <button type="button" onClick={() => decide("accepted")} className="rounded-full bg-euc px-4 py-2 text-sm font-bold text-ink">Accept</button>
          </div>
        </div>
      )}
    </>
  );
}
