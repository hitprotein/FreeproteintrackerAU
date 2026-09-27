import type { MenuItem } from "./types";

// Source: Red Rooster's official "Nutritional Information" panels on each item page at redrooster.com.au/menu,
// read 27 Sep 2026. Items where Red Rooster shows "No Nutritional Information Available" (e.g. tenders,
// veggie burger) are left out, as are combos, boxes and feeds.
const c = "red-rooster" as const;
type Row = [id: string, category: string, name: string, serving: string, g: number, kj: number, kcal: number, protein: number, featured?: boolean];

const rows: Row[] = [
  ["rr-whole-chicken", "Roast Chicken", "Whole Roast Chicken", "1 whole chicken", 653, 4710, 1120, 139.7],
  ["rr-half-chicken", "Roast Chicken", "Half Roast Chicken", "½ chicken", 327, 2350, 560, 69.8, true],
  ["rr-quarter-chicken", "Roast Chicken", "Quarter Roast Chicken", "¼ chicken", 163, 1180, 280, 34.9, true],
  ["rr-fried-chicken", "Fried Chicken", "Fried Chicken (1 piece)", "1 piece", 84, 1050, 250, 18.1],
  ["rr-hot-honey-fried-chicken", "Fried Chicken", "Hot Honey Fried Chicken", "1 serve", 119, 1380, 330, 18.2],
  ["rr-reds-hot-fried-chicken", "Fried Chicken", "Reds Hot Fried Chicken", "1 serve", 109, 1540, 370, 18.6],
  ["rr-bbq-bacon-burger", "Burgers, Rolls & Wraps", "BBQ Bacon Burger", "1 burger", 243, 2950, 710, 32.9, true],
  ["rr-rooster-roll", "Burgers, Rolls & Wraps", "Rooster Roll", "1 roll", 235, 2550, 610, 28.6, true],
  ["rr-picklebird-burger", "Burgers, Rolls & Wraps", "Picklebird Burger", "1 burger", 267, 2230, 530, 25.7],
  ["rr-reds-burger", "Burgers, Rolls & Wraps", "Reds Burger", "1 burger", 213, 2540, 610, 25.1],
  ["rr-rippa-roll", "Burgers, Rolls & Wraps", "Rippa Roll", "1 roll", 248, 2430, 580, 23.0],
  ["rr-honey-bbq-rippa-roll", "Burgers, Rolls & Wraps", "Honey BBQ Rippa Roll", "1 roll", 272, 2230, 530, 23.0],
  ["rr-chilli-aioli-rippa-roll", "Burgers, Rolls & Wraps", "Chilli Aioli Rippa Roll", "1 roll", 248, 1990, 470, 22.9],
  ["rr-spicy-burger", "Burgers, Rolls & Wraps", "Spicy Burger", "1 burger", 206, 2260, 540, 22.7],
];

export const redRoosterItems: MenuItem[] = rows.map(([id, category, name, serving, grams, kj, kcal, protein, featured]) => ({
  id, chain: c, category, name, serving, grams, kj, kcal, protein, featured,
}));
