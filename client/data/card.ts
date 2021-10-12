import { BASIC } from "~constants";
import { Card } from "~@types/Card";

export const CARD_DEFAULT_STATE: Card = {
  type: {
    label: "water",
    value: "water",
  },
  stage: {
    label: BASIC,
    value: BASIC,
  },
  name: "",
  nameEvolution: "",
  mainImage: null,
  mainImageX: -2,
  mainImageY: 0,
  mainImageScaleX: 1,
  mainImageScaleY: 1,
  evolvePicture: null,
  evolvePictureX: 0,
  evolvePictureY: 0,
  hp: {
    label: "30 HP",
    value: 30,
  },
  weaknessType: null,
  weaknessAmount: null,
  resistanceType: null,
  resistanceAmount: null,
  retreat: null,
  description: "",
  illustrator: "",
  cardNumber: "",
  totalCollection: "",
  rarity: null,
  species: "",
  length: "",
  weight: "",
  bgColor: { r: 255, g: 255, b: 255, a: 0 },
  attack1: {
    name: "",
    damage: null,
    info: "",
    type: null,
    amount: {
      label: "1",
      value: 1,
    },
  },
  attack2: {
    name: "",
    damage: null,
    info: "",
    type: null,
    amount: {
      label: "1",
      value: 1,
    },
  },
};
