import type { MenuItem } from "./types";

// Source: Grill'd's official nutrition panels (Grill'd online menu, grilld.com.au/menu), read 27 Sep 2026.
// Burgers use the default bun shown by Grill'd (usually Panini). Grill'd publishes kJ, not Calories:
// Cal = kJ / 4.184, rounded. Serving grams derived from published per-serve and per-100g energy.
// Limited-time Oscar Piastri range and meal packs left out.
const c = "grilld" as const;
type Row = [id: string, category: string, name: string, serving: string, kj: number, kj100: number, protein: number, featured?: boolean];

const rows: Row[] = [
  ["grilld-protein-pro", "High Performance", "Protein Pro", "1 burger (Panini bun)", 3010, 788, 81.0, true],
  ["grilld-cluck-norris", "High Performance", "Cluck Norris", "1 burger (Panini bun)", 2920, 829.5, 79.9, true],
  ["grilld-big-dill-energy", "High Performance", "Big Dill Energy", "1 burger (Panini bun)", 3830, 982.1, 55.7],
  ["grilld-wrap-bacon-club", "Wraps", "Bacon Club Wrap", "1 wrap", 2950, 877, 49.8],
  ["grilld-wrap-cali-green-goddess", "Wraps", "Cali Green Goddess Wrap", "1 wrap", 2050, 615, 42.5, true],
  ["grilld-wrap-golden-caesar", "Wraps", "Golden Caesar Wrap", "1 wrap", 2750, 878, 34.7],
  ["grilld-wrap-classic", "Wraps", "The Classic Wrap", "1 wrap", 2170, 804, 24.2],
  ["grilld-simply-grilld", "Beef Burgers", "Simply Grill'd", "1 burger (Panini bun)", 2530, 996.1, 28.1, true],
  ["grilld-crispy-bacon-cheese", "Beef Burgers", "Crispy Bacon & Cheese", "1 burger (Panini bun)", 2670, 953.6, 30.5],
  ["grilld-mighty-melbourne", "Beef Burgers", "Mighty Melbourne", "1 burger (Panini bun)", 2990, 830.6, 36.0],
  ["grilld-summer-sunset", "Beef Burgers", "Summer Sunset", "1 burger (Panini bun)", 2830, 915.9, 30.2],
  ["grilld-mustard-pickled", "Beef Burgers", "Mustard & Pickled!", "1 burger (Panini bun)", 2250, 789.5, 29.2],
  ["grilld-chilli-addict", "Beef Burgers", "Chilli Addict", "1 burger (Panini bun)", 2400, 848.1, 30.7],
  ["grilld-powerhouse", "Beef Burgers", "Powerhouse", "1 burger (SuperBun)", 3000, 1153.8, 40.0],
  ["grilld-sweet-chilli-chicken", "Chicken Burgers", "Sweet Chilli Chicken", "1 burger (Panini bun)", 2060, 624.2, 43.1],
  ["grilld-zen-hen", "Chicken Burgers", "Zen Hen", "1 burger (Panini bun)", 2080, 729.8, 43.1],
  ["grilld-simon-says", "Chicken Burgers", "Simon Says", "1 burger (Panini bun)", 2140, 764.3, 43.7, true],
  ["grilld-hotbird", "Chicken Burgers", "HotBird", "1 burger (Panini bun)", 1680, 610.9, 42.3, true],
  ["grilld-bird-brie", "Chicken Burgers", "Bird & Brie", "1 burger (Panini bun)", 2250, 818.2, 45.7],
  ["grilld-caesars-palace", "Chicken Burgers", "Caesar's Palace", "1 burger (Panini bun)", 2490, 858.6, 55.0],
  ["grilld-super-nourished", "Chicken Burgers", "Super Nourished", "1 burger (SuperBun)", 2870, 869.7, 53.4],
  ["grilld-sweet-holy-cluck", "Healthy Fried Chicken", "Sweet Holy Cluck", "1 burger (Panini bun)", 2690, 1195.6, 28.4],
  ["grilld-hula-hen", "Healthy Fried Chicken", "Hula Hen", "1 burger (Panini bun)", 2570, 955.4, 26.4],
  ["grilld-hfc-chipotle", "Healthy Fried Chicken", "Chipotle (Healthy Fried Chicken)", "1 burger (Panini bun)", 2420, 964.1, 26.2],
  ["grilld-blat", "Healthy Fried Chicken", "BLAT", "1 burger (Traditional bun)", 2400, 923.1, 26.9],
  ["grilld-bonfire-bbq", "Wagyu & Lamb", "Bonfire BBQ (Wagyu)", "1 burger (Panini bun)", 3100, 1215.7, 40.2],
  ["grilld-grand-brie", "Wagyu & Lamb", "Grand Brie (Wagyu)", "1 burger (Panini bun)", 2910, 1039.3, 38.1],
  ["grilld-wagyu-wunder", "Wagyu & Lamb", "Wagyu Wunder", "1 burger (Panini bun)", 2980, 1216.3, 38.8],
  ["grilld-baa-baa", "Wagyu & Lamb", "Baa Baa (Lamb)", "1 burger (Panini bun)", 2390, 956, 26.3],
  ["grilld-zorba-the-sheep", "Wagyu & Lamb", "Zorba The Sheep (Lamb)", "1 burger (Panini bun)", 2770, 826.9, 29.3],
  ["grilld-beyond-mustard-pickled", "Vegetarian", "Beyond Mustard & Pickled!", "1 burger (Panini bun)", 1750, 605.5, 24.5],
  ["grilld-beyond-garden-goodness", "Vegetarian", "Beyond Garden Goodness", "1 burger (Panini bun)", 2280, 690.9, 25.1],
  ["grilld-garden-goodness", "Vegetarian", "Garden Goodness", "1 burger (Panini bun)", 2080, 650, 16.9],
  ["grilld-chicken-caesar-salad", "Salads", "Chicken Caesar Salad", "1 salad", 2410, 876.4, 51.1, true],
  ["grilld-superpower-salad", "Salads", "Superpower Salad", "1 salad", 1920, 505.3, 42.3],
  ["grilld-honeyd-hen", "Salads", "The Honey'd Hen Salad", "1 salad", 1870, 619.2, 41.2],
  ["grilld-tenders-3", "Chicken Tenders & Bites", "Healthy Fried Chicken Tenders (3 pack)", "3 tenders", 1910, 1157.6, 31.2],
  ["grilld-tenders-5", "Chicken Tenders & Bites", "Healthy Fried Chicken Tenders (5 pack)", "5 tenders", 3190, 1160, 52.0],
  ["grilld-bites-6", "Chicken Tenders & Bites", "Healthy Fried Chicken Bites (6)", "6 bites", 1090, 908.3, 23.9],
  ["grilld-bites-12", "Chicken Tenders & Bites", "Healthy Fried Chicken Bites (12)", "12 bites", 2180, 908.3, 47.8],
];

export const grilldItems: MenuItem[] = rows.map(([id, category, name, serving, kj, kj100, protein, featured]) => ({
  id, chain: c, category, name, serving, grams: Math.round((kj / kj100) * 100), kj, kcal: Math.round(kj / 4.184), protein, featured,
}));
