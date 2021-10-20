import { Element, Rarity, Select } from "~@types/Card";

export const FIRE = "fire";
export const GRASS = "grass";
export const WATER = "water";
export const ELECTRIC = "electric";
export const PSYCHIC = "psychic";
export const FIGHTING = "fighting";
export const NORMAL = "normal";

export const ELEMENTS: Element[] = [
  FIRE,
  GRASS,
  WATER,
  ELECTRIC,
  PSYCHIC,
  FIGHTING,
  NORMAL,
];

export const ELEMENTS_OPTIONS: Select<string>[] = ELEMENTS.map((el) => ({
  value: el,
  label: el,
}));

export const HP_CHOICES = [
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
  "110",
  "120",
  "130",
  "140",
  "150",
  "160",
  "170",
  "180",
  "190",
  "200",
  "210",
  "220",
  "230",
  "240",
  "250",
];

export const HP_OPTIONS: Select<string>[] = HP_CHOICES.map((el) => ({
  value: el,
  label: `${el} HP`,
}));

export const WEAKNESS_CHOICES = ["+10", "+20", "+30", "+40", "x2"];

export const WEAKNESS_OPTIONS: Select<string>[] = WEAKNESS_CHOICES.map(
  (el) => ({
    value: el,
    label: el,
  })
);

export const RESISTANCE_CHOICES = ["-10", "-20", "-30", "-40"];

export const RESISTANCE_OPTIONS: Select<string>[] = RESISTANCE_CHOICES.map(
  (el) => ({
    value: el,
    label: el,
  })
);

export const DAMAGE_CHOICES = [
  "10",
  "10+",
  "10x",
  "20",
  "20+",
  "20x",
  "30",
  "30+",
  "30x",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
  "120",
  "150",
  "200",
];

export const ATTACK_AMOUNT_CHOICES = ["1", "2", "3", "4"];

export const COMMON = "common";
export const UNCOMMON = "uncommon";
export const RARE = "rare";
export const RARITY_CHOICES: Rarity[] = [COMMON, UNCOMMON, RARE];

export const RARITY_OPTIONS: Select<string>[] = RARITY_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

export const RETREAT_CHOICES = [0, 1, 2, 3, 4];
export const RETREAT_OPTIONS: Select<number>[] = RETREAT_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

/**
 * Local storage keys
 */
export const KEY_CACHE_LNG = "lngPG";

/**
 * Languages
 */
export const LANGUAGES = ["en", "fr", "es"];

export const DEFAULT_LANGUAGES = "en";

export const BASIC = "basic";
export const STAGE_ONE = "stage1";
export const STAGE_TWO = "stage2";

export const STAGE_OPTIONS: Select<string>[] = [
  { value: BASIC, label: "Basic" },
  { value: STAGE_ONE, label: "Stage 1" },
  { value: STAGE_TWO, label: "Stage 2" },
];
