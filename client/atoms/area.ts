import { atom } from "recoil";

export const areaAtom = atom({
  key: "area",
  default: {
    isVisible: false,
  },
});
