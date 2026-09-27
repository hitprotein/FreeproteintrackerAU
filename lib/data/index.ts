import { gygItems } from "./gyg";
import { nandosItems } from "./nandos";
import { mcdonaldsItems } from "./mcdonalds";
import { subwayItems } from "./subway";
import { kfcItems } from "./kfc";
import { grilldItems } from "./grilld";
import { density, type Chain, type ChainSlug, type MenuItem } from "./types";

export * from "./types";

export const CHAINS: Chain[] = [
  {
    slug: "mcdonalds",
    name: "McDonald's",
    aliases: ["mcdonalds", "maccas", "macca", "mcdonald"],
    blurb: "Burgers, chicken, McMuffins and more. Figures are for the standard build as McDonald's Australia publishes them.",
    source: {
      label: "McDonald's Australia Main Food Menu nutrition guide",
      url: "https://www.mcdonalds.com/content/dam/sites/au/nfl/nutrition/PDFs/Aus%20Core%20Food%20Menu_January%202026.pdf",
      checked: "2026-01-13",
    },
    variantNote: "Figures are for the standard build. Removing sauce or cheese, or adding extras, changes them. Limited-time menu items aren't included.",
  },
  {
    slug: "kfc",
    name: "KFC",
    aliases: ["kfc", "kentucky"],
    blurb: "Chicken, burgers, twisters and bowls, as KFC Australia publishes them. Single items only, not combos or boxes.",
    source: {
      label: "KFC Australia Nutrition & Allergen Guide",
      url: "https://www.kfc.com.au/nutrition-allergen",
      checked: "2026-09-27",
    },
    variantNote: "KFC publishes kilojoules; Calories are converted from them. KFC's guide states its information is correct as at September 2023. Limited-time items aren't included.",
  },
  {
    slug: "grilld",
    name: "Grill'd",
    aliases: ["grilld", "grill d", "grill'd"],
    blurb: "Burgers, wraps, salads and Healthy Fried Chicken, as Grill'd publishes them. Burgers are on their default bun.",
    source: { label: "Grill'd online menu nutrition panels", url: "https://grilld.com.au/menu", checked: "2026-09-27" },
    variantNote: "Burgers are shown on Grill'd's default bun (usually Panini). A different bun changes the figures. Grill'd publishes kilojoules; Calories are converted from them.",
  },
  {
    slug: "subway",
    name: "Subway",
    aliases: ["subway", "sub", "subs", "footlong"],
    blurb: "Subs, wraps and salads in their standard builds, as Subway Australia publishes them.",
    source: {
      label: "Subway Australia Nutrition Information guide",
      url: "https://www.subway.com/-/media/Australia/Documents/Nutritionals/Nutrition/AUS-Nutritional-Web-Guide-May-2026.pdf",
      checked: "2026-05-01",
    },
    variantNote: "Subs are 6-inch. Subway advises doubling the figures for a Footlong. Changing the bread, cheese or sauce changes them.",
  },
  {
    slug: "guzman-y-gomez",
    name: "Guzman y Gomez",
    aliases: ["gyg", "guzman", "gomez", "mexican"],
    blurb: "Burritos, bowls, nachos and more. Figures are for the mild version as GYG publishes them.",
    source: {
      label: "GYG Allergen, Ingredient & Nutritional Information guide",
      url: "https://www.guzmanygomez.com.au/nutrition/",
      checked: "2026-08-18",
    },
    variantNote: "Spicy adds about 17 Cal and 0.3g protein to a burrito or bowl. Swapping black beans for pinto beans adds about 2.8g protein.",
  },
  {
    slug: "nandos",
    name: "Nando's",
    aliases: ["nandos", "peri peri", "periperi", "portuguese"],
    blurb: "Flame-grilled PERi-PERi chicken. Figures as Nando's Australia publishes them for each item.",
    source: { label: "Nando's Australia nutritional information pages", url: "https://www.nandos.com.au/menu-item", checked: "2026-09-24" },
    variantNote: "Nando's notes the recipe used in South Australia may vary.",
  },
];

export const COMING_SOON = ["Red Rooster"];

export const ALL_ITEMS: MenuItem[] = [...mcdonaldsItems, ...kfcItems, ...grilldItems, ...subwayItems, ...gygItems, ...nandosItems];

export const chainBySlug = (slug: string) => CHAINS.find((c) => c.slug === slug);
export const itemById = (id: string) => ALL_ITEMS.find((i) => i.id === id);
export const itemsForChain = (slug: ChainSlug) => ALL_ITEMS.filter((i) => i.chain === slug);
export const chainName = (slug: ChainSlug) => chainBySlug(slug)?.name ?? slug;

/** "Best orders" are computed from data, never hand-picked. */
export function bestOrders(items: MenuItem[]) {
  const mains = items.filter((i) => i.category !== "Sides" && i.category !== "Extras");
  return {
    mostProtein: [...mains].sort((a, b) => b.protein - a.protein).slice(0, 3),
    mostDense: [...mains].filter((i) => i.protein >= 20).sort((a, b) => density(b) - density(a)).slice(0, 3),
  };
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

/** Featured items have their own page; the rest link to their row on the chain page. */
export const itemHref = (i: MenuItem) => (i.featured ? `/takeaway/${i.chain}/${i.id}` : `/takeaway/${i.chain}#${i.id}`);
