export type ChainSlug = "guzman-y-gomez" | "nandos" | "mcdonalds" | "subway" | "kfc";

export interface Chain {
  slug: ChainSlug;
  name: string;
  aliases: string[]; // extra search words, incl. Aussie shorthand
  blurb: string;
  source: { label: string; url: string; checked: string }; // checked = ISO date the figures were current/verified
  variantNote?: string; // how customisation changes the published figures
}

export interface MenuItem {
  id: string; // unique across the site, also the URL slug
  chain: ChainSlug;
  name: string;
  category: string;
  serving: string; // human label, e.g. "1 burrito"
  grams: number;
  protein: number; // g per serving, as published
  kcal: number;
  kj: number;
  featured?: boolean; // gets its own indexed page
  sourceUrl?: string; // item-level source, when the chain publishes one page per item
  note?: string; // shown on the item page, e.g. data caveats
}

export const density = (i: { protein: number; kcal: number }) =>
  i.kcal > 0 ? Math.round((i.protein / i.kcal) * 1000) / 10 : 0; // g protein per 100 Cal
