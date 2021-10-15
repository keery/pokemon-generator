import { Element, Rarity } from "~@types/Card";
/**
 * Pokemon information
 */
export const ELEMENTS: Element[] = [
  "fire",
  "grass",
  "water",
  "electric",
  "psychic",
  "fighting",
  "normal",
];

export const ELEMENTS_OPTIONS = ELEMENTS.map((el) => ({
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

export const HP_OPTIONS = HP_CHOICES.map((el) => ({
  value: el,
  label: `${el} HP`,
}));

export const WEAKNESS_CHOICES = ["+10", "+20", "+30", "+40", "x2"];

export const WEAKNESS_OPTIONS = WEAKNESS_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

export const RESISTANCE_CHOICES = ["-10", "-20", "-30", "-40"];

export const RESISTANCE_OPTIONS = RESISTANCE_CHOICES.map((el) => ({
  value: el,
  label: el,
}));

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

export const RETREAT_CHOICES = [0, 1, 2, 3, 4];
export const RETREAT_OPTIONS = RETREAT_CHOICES.map((el) => ({
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
