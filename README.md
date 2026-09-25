# FreeProteinTracker.com.au

Australian protein finder + free tracker. Static Next.js site, no backend: all data lives in lib/data/.

## Rules for this site (read before adding anything)
- Every figure must come from an official source, recorded with its date. No third-party calorie sites.
- No general "protein in chicken breast" style pages: those live on proteintracker.com.au.
- Only "featured" items get their own page; everything else is a row on its chain page.
- Always run `npm run build` (not just tsc) before pushing. It catches client/server mistakes tsc can't.

## Updating data
- GYG: lib/data/gyg.ts (source: GYG nutrition guide PDF, current 18 Aug 2026)
- Nando's: lib/data/nandos.ts (source: nandos.com.au/menu-item pages)
- Update the `checked` date in lib/data/index.ts whenever figures are re-verified. Review every 3 months.
- New chains: see data-templates/README.md. Sitemap updates automatically from the data.

## Deploy
Same as the other sites: new GitHub repo, import into Vercel, add freeproteintracker.com.au in
Settings → Domains, update GoDaddy A + CNAME records. Then GA4 (NEXT_PUBLIC_GA_ID, type Config) and
Search Console (submit sitemap.xml). Analytics only loads after the visitor accepts the cookie banner.

## Analytics events
protein_search, food_viewed, restaurant_viewed, tracker_started, food_added_to_tracker,
protein_goal_completed, comparison_started, hitprotein_cta_clicked, app_store_clicked
