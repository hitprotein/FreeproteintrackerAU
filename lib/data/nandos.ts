import type { MenuItem } from "./types";

// Source: individual item pages at nandos.com.au/menu-item, checked September 2026.
const c = "nandos" as const;
const base = "https://www.nandos.com.au/menu-item/";

export const nandosItems: MenuItem[] = [
  { id: "nandos-half-chicken", chain: c, category: "Chicken", name: "Half PERi-PERi Chicken", serving: "½ chicken", grams: 460, kj: 2990, kcal: 715, protein: 108, featured: true, sourceUrl: base + "half-chicken" },
  { id: "nandos-4-grilled-tenders", chain: c, category: "Chicken", name: "4 PERi-PERi Grilled Tenders", serving: "4 tenders", grams: 160, kj: 922, kcal: 220, protein: 39.6, featured: true, sourceUrl: base + "tenders" },
  { id: "nandos-supremo-chicken-wrap", chain: c, category: "Burgers, Wraps & Pitas", name: "Supremo Chicken Wrap", serving: "1 wrap", grams: 332, kj: 2710, kcal: 648, protein: 41.9, featured: true, sourceUrl: base + "supremo" },
  { id: "nandos-double-cheese-bacon", chain: c, category: "Burgers, Wraps & Pitas", name: "Double Cheese & Bacon (Chicken, Portuguese Roll)", serving: "1 burger", grams: 327, kj: 2790, kcal: 667, protein: 47.2, featured: true, sourceUrl: base + "double-cheese-and-bacon" },
  { id: "nandos-paella-chicken", chain: c, category: "Salads & Bowls", name: "Paella with Chicken", serving: "1 serve", grams: 395, kj: 2330, kcal: 557, protein: 31, featured: true, sourceUrl: base + "paella" },
  { id: "nandos-mediterranean-salad-chicken", chain: c, category: "Salads & Bowls", name: "Mediterranean Salad with Chicken", serving: "1 salad (3 tenders)", grams: 485, kj: 2430, kcal: 581, protein: 37.8, sourceUrl: base + "mediterranean-salad-with-chicken" },
  { id: "nandos-great-pretender-patty", chain: c, category: "Plant-based", name: "Great Pretender Protein (patty only)", serving: "1 patty", grams: 120, kj: 1240, kcal: 297, protein: 17.4, sourceUrl: base + "the-great-pretender-protein",
    note: "Shown exactly as Nando's publishes it. The published energy looks high relative to the published fat, carbs and protein, so the calorie figure may be revised." },
];
