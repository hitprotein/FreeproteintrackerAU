# Adding a chain (McDonald's, KFC, Grill'd)

Their official figures load inside app-style pages that automated tools can't read, so these need copying by hand.

1. Open the item on the chain's official Australian website or app (never a third-party calorie site).
2. Copy one row per item into chain-template.csv: serving grams, protein, Calories and kJ exactly as shown,
   plus the page link. Mark 6 to 8 of the most-searched items "yes" under featured.
3. Aim for 15 to 25 items per chain: the main meals people order, not every sauce.
4. Send the CSV back and it gets converted into lib/data/<chain>.ts with the date you checked it.
