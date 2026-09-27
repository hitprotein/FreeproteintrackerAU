import type { MenuItem } from "./types";

// Source: Subway "Australia Nutrition Information", May 2026 (official web guide).
// Standard builds exactly as Subway describes them. Footlong = double the 6-inch figures (Subway's guidance).
const c = "subway" as const;
type Row = [id: string, category: string, name: string, serving: string, g: number, kj: number, kcal: number, protein: number, featured?: boolean];

const rows: Row[] = [
  ["subway-chicken-bacon-ranch", "6-inch Subs", "Chicken & Bacon Ranch 6-inch", "6-inch sub", 256, 1950, 466, 28.9, true],
  ["subway-rotisserie-chicken", "6-inch Subs", "Rotisserie-Style Chicken 6-inch", "6-inch sub", 252, 2000, 478, 29.0, true],
  ["subway-philly-steak", "6-inch Subs", "Philly-Style Three-Cheese Steak 6-inch", "6-inch sub", 210, 2160, 516, 29.4, true],
  ["subway-chicken-schnitzel", "6-inch Subs", "Chicken Schnitzel 6-inch", "6-inch sub", 268, 2170, 519, 27.0],
  ["subway-chicken-strips", "6-inch Subs", "Chicken Strips 6-inch", "6-inch sub", 239, 1600, 382, 25.8, true],
  ["subway-sweet-onion-chicken-teriyaki", "6-inch Subs", "Sweet Onion Chicken Teriyaki 6-inch", "6-inch sub", 257, 1650, 396, 25.3, true],
  ["subway-chipotle-steak-melt", "6-inch Subs", "Chipotle Steak Melt 6-inch", "6-inch sub", 205, 2030, 485, 25.2],
  ["subway-italian-bmt", "6-inch Subs", "Italian B.M.T. 6-inch", "6-inch sub", 238, 2120, 506, 24.6, true],
  ["subway-italian-meatball", "6-inch Subs", "Italian Meatball 6-inch", "6-inch sub", 290, 2350, 561, 24.0],
  ["subway-turkey-on-rye", "6-inch Subs", "Turkey on Rye 6-inch", "6-inch sub", 236, 1650, 394, 23.9],
  ["subway-chicken-classic", "6-inch Subs", "Chicken Classic 6-inch", "6-inch sub", 248, 2060, 492, 22.3],
  ["subway-tuna-mayo", "6-inch Subs", "Tuna Mayo 6-inch", "6-inch sub", 220, 1580, 377, 21.8],
  ["subway-honey-mustard-ham", "6-inch Subs", "Honey Mustard Leg Ham 6-inch", "6-inch sub", 234, 1630, 391, 21.4],
  ["subway-pizza-melt", "6-inch Subs", "Pizza Melt 6-inch", "6-inch sub", 201, 1880, 450, 21.4],
  ["subway-bbq-southern-chicken", "6-inch Subs", "BBQ Southern-Style Chicken 6-inch", "6-inch sub", 239, 2020, 482, 19.3],
  ["subway-veggie-patty", "6-inch Subs", "Veggie Patty 6-inch", "6-inch sub", 306, 2400, 573, 19.2],
  ["subway-smashed-falafel", "6-inch Subs", "Smashed Falafel 6-inch", "6-inch sub", 256, 2080, 498, 18.7],
  ["subway-veggie-delite-avo", "6-inch Subs", "Veggie Delite with Avo 6-inch", "6-inch sub", 219, 1580, 377, 16.1],
  ["subway-seafood-sensation", "6-inch Subs", "Seafood Sensation 6-inch", "6-inch sub", 222, 1640, 393, 14.5],
  ["subway-wrap-large-chicken-bacon-ranch", "Wraps", "Chicken & Bacon Ranch Wrap (Large)", "1 large wrap", 464, 3350, 800, 50.2, true],
  ["subway-wrap-large-chicken-strips", "Wraps", "Chicken Strips Wrap (Large)", "1 large wrap", 426, 2650, 633, 43.7],
  ["subway-wrap-large-teriyaki", "Wraps", "Sweet Onion Chicken Teriyaki Wrap (Large)", "1 large wrap", 465, 2750, 660, 42.9],
  ["subway-wrap-large-schnitzel", "Wraps", "Chicken Schnitzel Wrap (Large)", "1 large wrap", 464, 3470, 830, 42.4],
  ["subway-salad-large-chicken-bacon-ranch", "Salads", "Chicken & Bacon Ranch Salad (Large)", "1 large salad", 499, 2380, 568, 44.3],
  ["subway-salad-large-chicken-strips", "Salads", "Chicken Strips Salad (Large)", "1 large salad", 447, 1680, 403, 37.8, true],
  ["subway-salad-large-teriyaki", "Salads", "Sweet Onion Chicken Teriyaki Salad (Large)", "1 large salad", 500, 1780, 429, 36.9],
  ["subway-salad-large-steak-melt", "Salads", "Chipotle Steak Melt Salad (Large)", "1 large salad", 453, 2280, 545, 33.5],
  ["subway-salad-chicken-strips", "Salads", "Chicken Strips Salad (Regular)", "1 regular salad", 273, 871, 208, 19.4],
  ["subway-salad-teriyaki", "Salads", "Sweet Onion Chicken Teriyaki Salad (Regular)", "1 regular salad", 300, 921, 222, 18.9],
  ["subway-steak-egg-brekkie", "Breakfast", "Steak & Egg Brekkie 6-inch", "6-inch sub", 284, 2090, 499, 31.6],
  ["subway-ham-egg", "Breakfast", "Classic Ham & Egg 6-inch", "6-inch sub", 180, 1630, 391, 22.0],
  ["subway-bacon-egg-cheese", "Breakfast", "Bacon, Egg & Cheese 6-inch", "6-inch sub", 219, 1820, 434, 19.2],
  ["subway-nachos-rotisserie-chicken", "Snacks", "Nachos with Rotisserie-Style Chicken", "1 serve", 197, 2040, 487, 27.2],
  ["subway-meatball-mozza-pot", "Snacks", "Meatball Mozza Pot", "1 pot", 194, 1350, 322, 17.5],
];

export const subwayItems: MenuItem[] = rows.map(([id, category, name, serving, grams, kj, kcal, protein, featured]) => ({
  id, chain: c, category, name, serving, grams, kj, kcal, protein, featured,
}));
