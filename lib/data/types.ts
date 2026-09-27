export type ChainSlug = "guzman-y-gomez" | "nandos" | "mcdonalds" | "subway" | "kfc" | "grilld" | "red-rooster";

export interface Chain {
  slug: ChainSlug;
  name: string;
  aliases: string[]; // extra search words, incl. Aussie shorthand
  blurb: string;
  source: { label: string; url: string; checked: string }; // checked = ISO date the figures were current/verified
  variantNote?: string; // how customisation changes the published figures
}

/** Optional nutrients per serving. Only set where the source publishes them. */
export interface Nutrients {
  fat?: number; // g total fat
  satFat?: number; // g saturated fat
  carbs?: number; // g available carbohydrate
  sugars?: number; // g total sugars
  fibre?: number; // g dietary fibre
  sodium?: number; // mg
}

export interface MenuItem extends Nutrients {
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

/** Everyday food from the FSANZ AFCD. Search and tracker only: no page, not part of any chain. */
export interface Food extends Nutrients {
  id: string;
  name: string;
  category: string;
  serving: string; // our serving label; nutrients are AFCD per-100g figures scaled to `grams`
  grams: number;
  protein: number;
  kcal: number;
  kj: number;
  aliases?: string[];
  afcdKey: string; // AFCD Public Food Key
  afcdName: string; // AFCD food name, for checking the match
}

export const density = (i: { protein: number; kcal: number }) =>
  i.kcal > 0 ? Math.round((i.protein / i.kcal) * 1000) / 10 : 0; // g protein per 100 Cal
