import { atom } from "recoil";

export const cardAtom = atom({
  key: "cardState",
  default: {
    selectedImg: null,
    isFlipped: false,
  },
});
