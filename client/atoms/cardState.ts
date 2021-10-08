import { atom } from "recoil";

export const cardState = atom({
  key: "cardState",
  default: {
    selectedImg: null,
  },
});
