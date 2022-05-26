import { atom } from "recoil";
import { Card } from "~@types/Card";
import { CachedQuery } from "~@types/CachedQuery";

export const cardModalAtom = atom({
  key: "cardModal",
  default: {
    card: null as Card,
    cachedQuery: null as CachedQuery,
  },
});
