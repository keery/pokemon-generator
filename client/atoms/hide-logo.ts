import { atom } from "recoil";

export const hideLogoAtom = atom({
  key: "hideLogo",
  default: {
    isHidden: false,
  },
});
