import type { MenuItem } from "./types";

// Source: KFC Australia Nutrition & Allergen Guide (kfc.com.au/nutrition-allergen), read from each item's
// official nutrition panel on 27 Sep 2026. KFC publishes kJ, not Calories: Cal = kJ / 4.184, rounded.
// Limited-time Pickle range, combos, boxes, feasts and Go Buckets left out (single items only).
const c = "kfc" as const;
type Row = [id: string, category: string, name: string, serving: string, g: number, kj: number, protein: number, featured?: boolean];

const rows: Row[] = [
  ["kfc-zinger-burger", "Burgers", "Zinger Burger", "1 burger", 185, 1874, 26.2, true],
  ["kfc-zinger-bacon-cheese", "Burgers", "Zinger Bacon & Cheese Burger", "1 burger", 219, 2298, 33.1],
  ["kfc-zinger-stacker", "Burgers", "Zinger Stacker Burger", "1 burger", 312, 3082, 51.2, true],
  ["kfc-zinger-crunch-burger", "Burgers", "Zinger Crunch Burger", "1 burger", 244, 2378, 29.7],
  ["kfc-original-crispy-burger", "Burgers", "Original Crispy Burger", "1 burger", 183, 1874, 24.7],
  ["kfc-original-crispy-bacon-cheese", "Burgers", "Original Crispy Bacon & Cheese Burger", "1 burger", 215, 2384, 31.6],
  ["kfc-bbq-bacon-stacker", "Burgers", "Original Crispy BBQ Bacon Stacker Burger", "1 burger", 331, 3526, 55.0, true],
  ["kfc-double-tender-burger", "Burgers", "Double Tender Burger", "1 burger", 169, 1882, 23.3],
  ["kfc-1-piece", "Chicken", "1 Piece of Chicken (Original Recipe)", "1 piece", 87, 984, 20.4],
  ["kfc-3-pieces", "Chicken", "3 Pieces of Chicken (Original Recipe)", "3 pieces", 260, 2951, 61.2, true],
  ["kfc-6-pieces", "Chicken", "6 Pieces of Chicken (Original Recipe)", "6 pieces", 519, 5901, 122.5],
  ["kfc-3-wicked-boneless", "Chicken", "3 Pieces Wicked Boneless", "3 pieces", 144, 1434, 28.2],
  ["kfc-6-wicked-boneless", "Chicken", "6 Pieces Wicked Boneless", "6 pieces", 288, 2868, 56.4],
  ["kfc-original-fillet", "Chicken", "Original Crispy Fillet Piece", "1 fillet", 95, 936, 18.9],
  ["kfc-zinger-fillet", "Chicken", "Zinger Fillet Piece", "1 fillet", 97, 936, 20.4],
  ["kfc-3-original-tenders", "Chicken", "3 Original Tenders", "3 tenders", 138, 1803, 26.2, true],
  ["kfc-5-original-tenders", "Chicken", "5 Original Tenders", "5 tenders", 237, 3194, 43.8],
  ["kfc-3-wicked-wings", "Chicken", "3 Wicked Wings", "3 wings", 124, 1629, 22.6],
  ["kfc-6-wicked-wings", "Chicken", "6 Wicked Wings", "6 wings", 248, 3259, 45.1],
  ["kfc-10-wicked-wings", "Chicken", "10 Wicked Wings", "10 wings", 413, 5431, 75.2],
  ["kfc-snack-popcorn", "Chicken", "Snack Popcorn Chicken", "1 snack", 70, 1009, 11.8],
  ["kfc-regular-popcorn", "Chicken", "Regular Popcorn Chicken", "1 regular", 114, 1644, 19.3],
  ["kfc-maxi-popcorn", "Chicken", "Maxi Popcorn Chicken", "1 maxi", 209, 3014, 35.3],
  ["kfc-6-nuggets", "Chicken", "6 Nuggets", "6 nuggets", 127, 1324, 16.2],
  ["kfc-10-nuggets", "Chicken", "10 Nuggets", "10 nuggets", 223, 2298, 27.0],
  ["kfc-zinger-protein-bowl", "Twisters & Bowls", "Zinger Protein Bowl", "1 bowl", 359, 2309, 44.0, true],
  ["kfc-zinger-crunch-twister", "Twisters & Bowls", "Zinger Crunch Twister", "1 twister", 270, 2435, 27.4],
  ["kfc-original-crunch-twister", "Twisters & Bowls", "Original Crunch Twister", "1 twister", 237, 2164, 23.5],
  ["kfc-zinger-crunch-bowl", "Twisters & Bowls", "Zinger Crunch Bowl", "1 bowl", 278, 1738, 23.2],
  ["kfc-original-tenders-crunch-bowl", "Twisters & Bowls", "Original Tenders Crunch Bowl", "1 bowl", 255, 1687, 20.0],
  ["kfc-pepper-mayo-slider", "Sliders", "Original Pepper Mayo Slider", "1 slider", 96, 1125, 12.1],
  ["kfc-bbq-slider", "Sliders", "Original BBQ Slider", "1 slider", 97, 1012, 12.2],
  ["kfc-supercharged-slider", "Sliders", "Original Supercharged Slider", "1 slider", 97, 1082, 12.1],
];

export const kfcItems: MenuItem[] = rows.map(([id, category, name, serving, grams, kj, protein, featured]) => ({
  id, chain: c, category, name, serving, grams, kj, kcal: Math.round(kj / 4.184), protein, featured,
}));
