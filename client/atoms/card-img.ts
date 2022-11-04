import { atom } from "recoil";

export const cardImgAtom = atom({
  key: "cardImg",
  default: {
    isLoading: false,
  },
});
