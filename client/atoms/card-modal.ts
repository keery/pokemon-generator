import { atom } from "recoil";
import { Card } from "~@types/Card";

export const cardModalAtom = atom({
  key: "cardModal",
  default: {
    card: null as Card,
    queryKey: null as any[],
    indexPage: null as number,
  },
});
