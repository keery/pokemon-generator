import { atom } from "recoil";

export const HISTORY_DEFAULT_STATE = {
  historyIndex: 0,
  historyLength: 0,
  historyAction: null,
};

export const historyAtom = atom({
  key: "history",
  default: HISTORY_DEFAULT_STATE,
});
