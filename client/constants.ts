import { Element, Rarity, Select } from "~@types/CardGenerator";

export const ROUTE_GENERATOR = "/";
export const ROUTE_CGU = "/general-conditions-use";
export const ROUTE_GALLERY = "/gallery";
export const ROUTE_SITEMAP = "/sitemap";
export const ROUTE_404 = "/404";
export const ROUTE_PORTFOLIO = "https://guillaumeesnault.fr/";

export const LOGO = "/assets/img/pokeball.png";

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

export const RETREAT_CHOICES = [1, 2, 3, 4];
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

export const GRADIENTS: Record<Element, any> = {
  normal:
    "linear-gradient(45deg, rgb(0 0 0 / 31%), rgb(105 108 111 / 28%) 45%, rgb(39 39 39 / 42%) 71%, rgb(61 64 64 / 4%))",
  water:
    "linear-gradient(45deg, rgb(63 128 254 / 37%), rgb(10 121 251 / 30%) 45%, rgb(63 125 254 / 54%) 71%, rgba(74, 210, 202, 0.3))",
  fire: "linear-gradient(45deg, rgb(255 0 0 / 31%), rgb(251 10 10 / 16%) 45%, rgb(254 63 63 / 42%) 71%, rgb(255 140 193 / 30%))",
  grass:
    "linear-gradient(45deg, rgb(76 255 98 / 31%), rgb(0 97 51 / 16%) 45%, rgb(149 255 68 / 42%) 71%, rgb(193 218 54 / 30%))",
  electric:
    "linear-gradient(45deg, rgb(253 219 96), rgb(247 238 194) 45%, rgb(255 241 146) 71%, rgb(255 214 99))",
  psychic:
    "linear-gradient(45deg, rgb(205 170 250), rgb(196 193 251) 45%, rgb(209 151 236) 71%, rgb(157 166 244))",
  fighting:
    "linear-gradient(45deg, rgb(255 176 108), rgb(255 229 181) 45%, rgb(247 155 60 / 88%) 71%, rgb(202 102 17))",
};

export const GRADIENTS_COLOR: Record<Element, any> = {
  water: "#363685",
  psychic: "#3d194f",
  electric: "#6e461d",
  fire: "#5a2626",
  fighting: "#542d13",
  grass: "#1e5529",
  normal: "#000000",
};

export const HEADER_HEIGHT = 82;
