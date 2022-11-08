import { atom } from "recoil";
import { Card } from "~@types/Card";
import { CachedQuery } from "~@types/CachedQuery";
import { MutateLikeFunction } from "~@types/MutateLikeFunction";

export const cardModalAtom = atom({
  key: "cardModal",
  default: {
    card: null as Card,
    cachedQuery: null as CachedQuery,
    onMutate: null as MutateLikeFunction,
  },
});
