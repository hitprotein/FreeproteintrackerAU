"use client";

import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function CtaButton({ href, children, variant = "solid", placement }: {
  href: string; children: React.ReactNode; variant?: "solid" | "outline"; placement: string;
}) {
  const styles = variant === "solid"
    ? "bg-euc text-ink hover:bg-[#82BFA0]"
    : "border border-euc/60 text-ivory hover:bg-euc/10";
  return (
    <a
      href={href}
      onClick={() => trackEvent(href.includes("apps.apple.com") ? "app_store_clicked" : "hitprotein_cta_clicked", { placement })}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold tracking-wide transition ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}
