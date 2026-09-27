"""
Import everyday Australian foods from the FSANZ Australian Food Composition Database (Release 3).

1. Download "AFCD Release 3 - Nutrient profiles.xlsx" from foodstandards.gov.au (FSANZ licence: based on
   CC BY-SA, so credit FSANZ and share any redistributed version of the data under the same terms).
2. Put it in ./afcd/
3. pip install pandas openpyxl && python scripts/import-afcd.py
Writes lib/data/foods.generated.ts. Foods are picked by AFCD Public Food Key, so a renamed food can't silently
match the wrong row. Column names are matched loosely and printed, so if FSANZ renames a column the script
stops and tells you what it found instead of writing bad data.

These foods only appear in search and the tracker (no pages): general food pages live on proteintracker.com.au.
Serving sizes are ours, not FSANZ's; every nutrient is FSANZ's per-100g figure scaled to that serving.
"""
import glob, json, math, re, sys
import pandas as pd

# (AFCD Public Food Key, display name, category, serving label, serving grams, extra search words)
WANTED = [
    # Meat
    ("F002590", "Chicken breast, baked", "Meat & fish", "150g", 150, "chook"),
    ("F002804", "Chicken thigh, baked", "Meat & fish", "150g", 150, "chook"),
    ("F009306", "Turkey breast, baked", "Meat & fish", "100g", 100, ""),
    ("F000738", "Rump steak, lean, grilled", "Meat & fish", "200g", 200, "beef"),
    ("F000679", "Beef mince, regular, cooked", "Meat & fish", "100g", 100, "ground"),
    ("F000667", "Beef mince, lean, cooked", "Meat & fish", "100g", 100, "ground"),
    ("F005014", "Lamb leg roast, lean", "Meat & fish", "100g", 100, ""),
    ("F006892", "Pork fillet, baked", "Meat & fish", "150g", 150, "tenderloin"),
    ("F009815", "Kangaroo steak, cooked", "Meat & fish", "150g", 150, "roo"),
    ("F004299", "Ham, leg, lean", "Meat & fish", "50g", 50, ""),
    # Seafood
    ("F007826", "Salmon fillet, grilled", "Meat & fish", "150g", 150, "atlantic"),
    ("F009285", "Tuna in brine, drained", "Meat & fish", "100g", 100, "canned tin"),
    ("F000385", "Barramundi fillet, grilled", "Meat & fish", "150g", 150, "barra fish"),
    ("F007432", "Prawns, cooked", "Meat & fish", "100g", 100, "shrimp prawn"),
    # Eggs & dairy
    ("F003721", "Egg, hard-boiled", "Eggs & dairy", "1 egg (50g)", 50, "eggs boiled"),
    ("F003718", "Egg, fried (no oil)", "Eggs & dairy", "1 egg (50g)", 50, "eggs"),
    ("F003732", "Scrambled eggs", "Eggs & dairy", "2 eggs (120g)", 120, "egg"),
    ("F005634", "Milk, full cream", "Eggs & dairy", "250ml (258g)", 258, "whole"),
    ("F005637", "Milk, skim", "Eggs & dairy", "250ml (258g)", 258, "skinny"),
    ("F009809", "Yoghurt, high protein, flavoured", "Eggs & dairy", "170g", 170, "yogurt"),
    ("F009694", "Yoghurt, natural", "Eggs & dairy", "170g", 170, "yogurt plain"),
    ("F002435", "Cottage cheese", "Eggs & dairy", "100g", 100, ""),
    ("F002488", "Ricotta", "Eggs & dairy", "100g", 100, "cheese"),
    ("F002414", "Cheddar cheese", "Eggs & dairy", "20g", 20, "tasty"),
    ("F002466", "Haloumi", "Eggs & dairy", "50g", 50, "halloumi cheese"),
    ("F007493", "Whey protein powder", "Eggs & dairy", "30g scoop", 30, "shake"),
    # Plant protein
    ("F009176", "Tofu, firm", "Plant protein", "100g", 100, "bean curd"),
    ("F009823", "Plant-based meat, cooked", "Plant protein", "100g", 100, "vegan vegetarian mince"),
    ("F005177", "Lentils, boiled", "Plant protein", "150g", 150, "lentil"),
    ("F002880", "Chickpeas, canned, drained", "Plant protein", "100g", 100, "chickpea"),
    ("F000448", "Kidney beans, canned, drained", "Plant protein", "100g", 100, "bean"),
    ("F000243", "Baked beans", "Plant protein", "210g", 210, "bean"),
    ("F003539", "Hummus", "Plant protein", "40g", 40, "hommus dip"),
    ("F008720", "Soy milk", "Plant protein", "250ml (258g)", 258, "soy"),
    ("F006579", "Peanut butter, no added sugar or salt", "Nuts", "20g", 20, ""),
    ("F006081", "Almonds, raw", "Nuts", "30g", 30, "nut"),
    ("F006110", "Peanuts, roasted", "Nuts", "30g", 30, "nut"),
    # Grains
    ("F006143", "Rolled oats, uncooked", "Grains", "40g", 40, "porridge"),
    ("F001844", "Weet-Bix", "Grains", "30g", 30, "weetbix cereal"),
    ("F001463", "White bread", "Grains", "70g", 70, "toast"),
    ("F001553", "Wholemeal bread", "Grains", "70g", 70, "toast"),
    ("F007661", "White rice, boiled", "Grains", "180g", 180, ""),
    ("F007641", "Brown rice, boiled", "Grains", "180g", 180, ""),
    ("F006456", "Pasta, boiled", "Grains", "180g", 180, ""),
    ("F009835", "Legume pasta, boiled", "Grains", "180g", 180, "chickpea lentil"),
    ("F007596", "Quinoa, cooked", "Grains", "180g", 180, ""),
]

files = glob.glob("afcd/*Nutrient*profiles*.xlsx")
if not files: sys.exit("No 'Nutrient profiles' .xlsx in ./afcd/")
df = pd.read_excel(files[0], sheet_name="All solids & liquids per 100 g", header=2)
df.columns = [re.sub(r"\s+", " ", str(c)).strip() for c in df.columns]

def col(*needles, exclude=()):
    for c in df.columns:
        lc = c.lower()
        if all(n in lc for n in needles) and not any(x in lc for x in exclude):
            return c
    sys.exit(f"Couldn't find a column containing {needles}. Columns seen: {list(df.columns)}")

COLS = {
    "key": col("public food key"), "name": col("food name"),
    "kj": col("energy with dietary fibre", "kj"), "protein": col("protein (g)"),
    "fat": col("fat, total (g)"), "satFat": col("total saturated fatty acids", "(g)"),
    "carbs": col("available carbohydrate, with sugar alcohols (g)"), "sugars": col("total sugars (g)"),
    "fibre": col("total dietary fibre (g)"), "sodium": col("sodium", "(mg)"),
}
print("Using columns:", json.dumps(COLS, indent=2))
by_key = df.set_index(COLS["key"])

def num(v):
    try: f = float(v)
    except (TypeError, ValueError): return None
    return None if math.isnan(f) else f

out = []
for key, label, category, serving, grams, words in WANTED:
    if key not in by_key.index: sys.exit(f"Food key {key} ({label}) not in the file. Look it up again.")
    row = by_key.loc[key]
    s = grams / 100
    kj100, p100 = num(row[COLS["kj"]]), num(row[COLS["protein"]])
    if kj100 is None or p100 is None: sys.exit(f"{key} ({label}) is missing energy or protein.")
    food = dict(id="afcd-" + re.sub(r"[^a-z0-9]+", "-", label.lower()).strip("-"), name=label, category=category,
                serving=serving, grams=grams, protein=round(p100 * s, 1), kj=round(kj100 * s),
                kcal=round(kj100 * s / 4.184))
    for field in ("fat", "satFat", "carbs", "sugars", "fibre"):
        v = num(row[COLS[field]])
        if v is not None: food[field] = round(v * s, 1)
    na = num(row[COLS["sodium"]])
    if na is not None: food["sodium"] = round(na * s)
    if words: food["aliases"] = words.split()
    food.update(afcdKey=key, afcdName=str(row[COLS["name"]]).strip())
    out.append(food)
    print(f"{label}: {food['protein']}g protein, {food['kcal']} Cal per {serving}  <- {food['afcdName']}")

open("lib/data/foods.generated.ts", "w").write(
    "// Generated by scripts/import-afcd.py. Do not edit by hand: change WANTED in the script and re-run.\n"
    "// Source: Food Standards Australia New Zealand (FSANZ), Australian Food Composition Database Release 3,\n"
    "// licensed under FSANZ's CC BY-SA based licence. Serving sizes are ours; nutrients are FSANZ's per-100g\n"
    "// figures scaled to the serving. This adapted data is shared under the same licence.\n"
    'import type { Food } from "./types";\n\n'
    "export const afcdFoods: Food[] = " + json.dumps(out, indent=2, ensure_ascii=False) + ";\n")
print(f"Wrote {len(out)} foods.")
