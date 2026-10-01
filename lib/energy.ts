/** 1 Calorie (kcal) = 4.184 kilojoules. The same factor the chain data uses when a chain publishes kJ only. */
export const KJ_PER_CAL = 4.184;

/** Reference energy intake for an average adult on Australian food labels (% Daily Intake), in kJ. */
export const LABEL_REFERENCE_KJ = 8700;

export const kjToCal = (kj: number) => kj / KJ_PER_CAL;
export const calToKj = (cal: number) => cal * KJ_PER_CAL;

/** Whole numbers from 100 up, one decimal below that (e.g. 23.9 Cal, 418 kJ). */
export const formatEnergy = (n: number) =>
  (Math.abs(n) >= 100 ? Math.round(n) : Math.round(n * 10) / 10).toLocaleString("en-AU");
