import type { MetadataRoute } from "next";
import { ALL_ITEMS, CHAINS } from "@/lib/data";

const BASE = "https://freeproteintracker.com.au";

// Generated from the data, so new chains and featured items appear automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1 },
    { url: `${BASE}/takeaway`, lastModified: now, priority: 0.9 },
    ...CHAINS.map((c) => ({ url: `${BASE}/takeaway/${c.slug}`, lastModified: new Date(c.source.checked), priority: 0.9 })),
    ...ALL_ITEMS.filter((i) => i.featured).map((i) => ({ url: `${BASE}/takeaway/${i.chain}/${i.id}`, lastModified: now, priority: 0.7 })),
    { url: `${BASE}/tracker`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/compare`, lastModified: now, priority: 0.6 },
    { url: `${BASE}/kilojoules-to-calories`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/about-the-data`, lastModified: now, priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, priority: 0.2 },
  ];
}
