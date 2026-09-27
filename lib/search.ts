import { ALL_ITEMS, CHAINS, type MenuItem } from "./data";

// Aussie shorthand → canonical words, applied to the query before matching.
const SYNONYMS: Record<string, string> = {
  maccas: "mcdonalds", macca: "mcdonalds", "macca's": "mcdonalds", "mcdonald's": "mcdonalds",
  hj: "hungry jacks", hjs: "hungry jacks", "nando's": "nandos", brekky: "brekkie", breakfast: "brekkie",
  chook: "chicken", snag: "sausage",
};

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9$ ]/g, " ").replace(/\s+/g, " ").trim();

function editDistanceAtMost1(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

const INDEX = ALL_ITEMS.map((item) => {
  const chain = CHAINS.find((c) => c.slug === item.chain)!;
  const text = norm([item.name, item.category, chain.name, ...chain.aliases].join(" "));
  return { item, text, words: text.split(" "), name: norm(item.name) };
});

/** Every query word must match (exactly, as a prefix, or within one typo). Ranked by match quality, then protein. */
export function searchItems(query: string, limit = 12): MenuItem[] {
  const tokens = norm(query).split(" ").filter(Boolean).map((t) => norm(SYNONYMS[t] ?? t)).join(" ").split(" ");
  if (!tokens.length || !tokens[0]) return [];
  const scored: { item: MenuItem; score: number }[] = [];
  const phrase = tokens.join(" ");
  for (const { item, text, words, name } of INDEX) {
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (words.includes(t)) score += 3;
      else if (words.some((w) => w.startsWith(t))) score += 2;
      else if (t.length >= 4 && words.some((w) => editDistanceAtMost1(w, t))) score += 1;
      else if (text.includes(t)) score += 1;
      else { ok = false; break; }
    }
    if (ok) {
      if (name === phrase) score += 10; // exact item name wins ("big mac" -> Big Mac, not Double Big Mac)
      else if (name.startsWith(phrase)) score += 4;
      scored.push({ item, score });
    }
  }
  return scored.sort((a, b) => b.score - a.score || b.item.protein - a.item.protein).slice(0, limit).map((s) => s.item);
}
