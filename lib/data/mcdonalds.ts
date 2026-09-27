import type { MenuItem } from "./types";

// Source: McDonald's Australia "Main Food Menu – Allergen, Ingredients, Nutrition Information",
// information correct as at January 2026 (revision 113). Per-serve figures as published; serving
// grams derived from the published per-serve and per-100g energy. Items whose table mapping in the
// PDF was ambiguous (McWraps, McWings, McGriddles, Chicken 'n' Cheese, Triple Cheeseburger) are left out.
const c = "mcdonalds" as const;
type Row = [id: string, category: string, name: string, serving: string, g: number, kj: number, kcal: number, protein: number, featured?: boolean];

const rows: Row[] = [
  ["mcd-big-mac", "Burgers", "Big Mac", "1 burger", 233, 2330, 557, 24.6, true],
  ["mcd-double-big-mac", "Burgers", "Double Big Mac", "1 burger", 310, 3190, 762, 39.7],
  ["mcd-big-arch", "Burgers", "Big Arch", "1 burger", 404, 4480, 1071, 55.8, true],
  ["mcd-quarter-pounder", "Burgers", "Quarter Pounder", "1 burger", 212, 2230, 532, 30.2, true],
  ["mcd-double-quarter-pounder", "Burgers", "Double Quarter Pounder", "1 burger", 314, 3370, 804, 52.3, true],
  ["mcd-bbq-bacon-angus", "Burgers", "BBQ Bacon Angus", "1 burger", 296, 3320, 794, 48.1],
  ["mcd-classic-angus", "Burgers", "Classic Angus", "1 burger", 312, 2950, 706, 40.1],
  ["mcd-cheeseburger", "Burgers", "Cheeseburger", "1 burger", 120, 1280, 306, 14.5],
  ["mcd-double-cheeseburger", "Burgers", "Double Cheeseburger", "1 burger", 177, 1910, 457, 24.9],
  ["mcd-hamburger", "Burgers", "Hamburger", "1 burger", 105, 1080, 257, 11.6],
  ["mcd-mcchicken", "Chicken & Fish", "McChicken", "1 burger", 196, 1820, 435, 16.7, true],
  ["mcd-double-mcchicken", "Chicken & Fish", "Double McChicken", "1 burger", 301, 2890, 690, 28.3],
  ["mcd-mccrispy", "Chicken & Fish", "McCrispy", "1 burger", 230, 2480, 634, 26.2, true],
  ["mcd-mccrispy-deluxe", "Chicken & Fish", "McCrispy Chicken Deluxe", "1 burger", 294, 2720, 690, 29.5],
  ["mcd-mcspicy", "Chicken & Fish", "McSpicy", "1 burger", 245, 2440, 584, 30.0],
  ["mcd-nuggets-6", "Chicken & Fish", "Chicken McNuggets (6 pc)", "6 nuggets", 97, 905, 216, 12.1],
  ["mcd-nuggets-10", "Chicken & Fish", "Chicken McNuggets (10 pc)", "10 nuggets", 162, 1510, 360, 20.1, true],
  ["mcd-nuggets-20", "Chicken & Fish", "Chicken McNuggets (20 pc)", "20 nuggets", 324, 3020, 721, 40.2],
  ["mcd-filet-o-fish", "Chicken & Fish", "Filet-O-Fish", "1 burger", 141, 1420, 339, 14.6],
  ["mcd-double-filet-o-fish", "Chicken & Fish", "Double Filet-O-Fish", "1 burger", 231, 2250, 537, 25.4],
  ["mcd-chicken-snack-wrap", "Wraps", "Chicken Snack Wrap", "1 wrap", 123, 1180, 309, 14.0],
  ["mcd-bacon-egg-mcmuffin", "Breakfast", "Bacon & Egg McMuffin", "1 muffin", 134, 1210, 290, 17.3, true],
  ["mcd-double-bacon-egg-mcmuffin", "Breakfast", "Double Bacon & Egg McMuffin", "1 muffin", 148, 1330, 318, 20.7],
  ["mcd-sausage-mcmuffin", "Breakfast", "Sausage McMuffin", "1 muffin", 112, 1260, 300, 16.0],
  ["mcd-double-sausage-mcmuffin", "Breakfast", "Double Sausage McMuffin", "1 muffin", 150, 1720, 412, 24.2],
  ["mcd-sausage-egg-mcmuffin", "Breakfast", "Sausage & Egg McMuffin", "1 muffin", 159, 1560, 374, 22.1],
  ["mcd-double-sausage-egg-mcmuffin", "Breakfast", "Double Sausage & Egg McMuffin", "1 muffin", 199, 2030, 485, 30.2],
  ["mcd-chicken-mcmuffin", "Breakfast", "Chicken McMuffin", "1 muffin", 166, 1710, 410, 19.5],
  ["mcd-chicken-bacon-mcmuffin", "Breakfast", "Chicken & Bacon McMuffin", "1 muffin", 180, 1930, 461, 23.6],
  ["mcd-mighty-mcmuffin", "Breakfast", "Mighty McMuffin", "1 muffin", 205, 1880, 449, 29.1],
  ["mcd-big-brekkie-burger", "Breakfast", "Big Brekkie Burger", "1 burger", 311, 3070, 735, 38.9],
  ["mcd-brekkie-wrap", "Breakfast", "Brekkie Wrap", "1 wrap", 192, 1880, 449, 17.9],
  ["mcd-mega-brekkie-wrap", "Breakfast", "Mega Brekkie Wrap", "1 wrap", 344, 3680, 861, 45.8],
  ["mcd-fries-medium", "Sides", "Fries (Medium)", "1 medium", 104, 1320, 316, 5.0],
  ["mcd-fries-large", "Sides", "Fries (Large)", "1 large", 128, 1630, 389, 6.1],
];

export const mcdonaldsItems: MenuItem[] = rows.map(([id, category, name, serving, grams, kj, kcal, protein, featured]) => ({
  id, chain: c, category, name, serving, grams, kj, kcal, protein, featured,
}));
