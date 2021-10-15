import { RgbaColor } from "react-colorful";
import { BASIC, STAGE_ONE, STAGE_TWO } from "~constants";

export type Element =
  | "fire"
  | "grass"
  | "water"
  | "electric"
  | "psychic"
  | "fighting"
  | "normal";

export type Rarity = "common" | "uncommon" | "rare";
export type Stage = "basic" | "stage1" | "stage2";

export interface Select<T> {
  label?: string;
  value?: T;
}

export interface IAttack {
  name: string;
  damage: Select<string>;
  info: string;
  type: Select<Element>;
  amount: Select<number>;
}

export interface Card {
  type: Select<Element>;
  stage: Select<Stage>;
  name: string;
  nameEvolution: string;
  mainImage: string;
  mainImageX: number;
  mainImageY: number;
  mainImageScaleX: number;
  mainImageScaleY: number;
  evolvePicture: string;
  evolvePictureX: number;
  evolvePictureY: number;
  hp: Select<string | number>;
  weaknessType: Select<Element>;
  weaknessAmount: Select<number>;
  resistanceType: Select<Element>;
  resistanceAmount: Select<number>;
  retreat: Select<number>;
  description: string;
  illustrator: string;
  cardNumber: string;
  bgColor: RgbaColor;
  totalCollection: string;
  rarity: Select<Rarity>;
  species: string;
  length: string;
  weight: string;
  attack1Name: string;
  attack1Damage?: Select<string>;
  attack1Info: string;
  attack1Type: Select<Element>;
  attack1Amount: Select<number>;
  attack2Name: string;
  attack2Damage: Select<string>;
  attack2Info: string;
  attack2Type: Select<Element>;
  attack2Amount: Select<number>;
}
